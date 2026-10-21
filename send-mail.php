<?php
/**
 * Orbix Solutions: contact form + chatbot lead mailer.
 * Receives JSON {name, email, company, service, message} and emails it to the team.
 * Replies {"status":"success"} or {"status":"error","message":"..."}.
 */

$TO_EMAIL   = 'info@orbixsolutions.net';   // where enquiries are sent
$FROM_EMAIL = 'info@orbixsolutions.net';   // must be a mailbox on this domain (Hostinger requires it)
$SITE_NAME  = 'Orbix Solutions';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function reply($code, $data) { http_response_code($code); echo json_encode($data); exit; }

if ($_SERVER['REQUEST_METHOD'] !== 'POST') reply(405, ['status' => 'error', 'message' => 'Method not allowed']);

// Accept JSON (the website) or a normal form post
$raw = file_get_contents('php://input');
$in = json_decode($raw, true);
if (!is_array($in)) $in = $_POST;

$clean = function ($v, $max) {
  $v = trim(strip_tags((string)$v));
  $v = str_replace(["\r", "\0"], '', $v);
  return mb_substr($v, 0, $max);
};
$name    = $clean($in['name'] ?? '', 100);
$email   = $clean($in['email'] ?? '', 150);
$company = $clean($in['company'] ?? '', 150);
$service = $clean($in['service'] ?? '', 100);
$message = $clean($in['message'] ?? '', 5000);

if ($name === '' || $email === '' || $message === '') reply(400, ['status' => 'error', 'message' => 'Please fill in your name, email and message.']);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) reply(400, ['status' => 'error', 'message' => 'Please enter a valid email address.']);
if (preg_match('/[\r\n]/', $name . $email)) reply(400, ['status' => 'error', 'message' => 'Invalid input.']);

// Simple rate limit: 5 messages per IP per 10 minutes
$ip = $_SERVER['REMOTE_ADDR'] ?? 'x';
$rl = sys_get_temp_dir() . '/ox_mail_' . md5($ip);
$now = time();
$hits = is_file($rl) ? array_filter(explode(',', (string)@file_get_contents($rl)), function ($t) use ($now) { return $t && $now - (int)$t < 600; }) : [];
if (count($hits) >= 5) reply(429, ['status' => 'error', 'message' => 'Too many messages. Please try again in a few minutes.']);
$hits[] = $now; @file_put_contents($rl, implode(',', $hits));

$subject = "New enquiry: " . ($service ?: 'Website') . " - $name";
$body  = "New enquiry from the $SITE_NAME website\n";
$body .= "----------------------------------------\n";
$body .= "Name:    $name\n";
$body .= "Email:   $email\n";
$body .= "Company: " . ($company ?: '-') . "\n";
$body .= "Service: " . ($service ?: '-') . "\n\n";
$body .= "Message:\n$message\n\n";
$body .= "----------------------------------------\n";
$body .= "Sent " . date('Y-m-d H:i') . " from IP $ip\n";

$headers  = "From: $SITE_NAME <$FROM_EMAIL>\r\n";
$headers .= "Reply-To: $name <$email>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$ok = @mail($TO_EMAIL, $encodedSubject, $body, $headers, '-f' . $FROM_EMAIL);

if ($ok) reply(200, ['status' => 'success', 'message' => 'Message sent']);
reply(500, ['status' => 'error', 'message' => 'Mail server error']);
