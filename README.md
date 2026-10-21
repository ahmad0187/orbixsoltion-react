# Orbix Solutions: Agency Website

The website for **Orbix Solutions**, an AI-first digital studio offering AI chatbots, AI voice agents, automation, websites and web and mobile apps.

It's a fast, static site with no build step: plain HTML, CSS and JavaScript. It's ready for any PHP host, such as Hostinger.

## Features
- **Motion:**
  - an animated WebGL hero, a custom cursor and magnetic buttons;
  - smooth scrolling (Lenis) and GSAP scroll animations;
  - a pinned horizontal project gallery with filters.
- **Live demos:** a chatbot conversation, a voice sales call and an automation run.
- **Nova, the website chatbot:**
  - answers questions about services, prices, timelines and the team's work;
  - collects leads and emails them through `send-mail.php`;
  - can optionally use ChatGPT via `chat-ai.php`.
- **"Talk to our AI":** a live browser voice call with a Vapi voice agent. See `docs/VOICE-AGENT-SETUP.md`.
- **WhatsApp:** a floating button plus links throughout the site.
- **Contact form:** posts JSON (`name, email, company, service, message`) to `/send-mail.php`.
- **Responsive:** works from 320px phones to large desktops, and honours reduced-motion settings.
- **Privacy:** fonts are self-hosted and there are no tracking cookies.

## Files
| Path | What it is |
|---|---|
| `index.html` | The page, plus the **SITE SETTINGS** block at the top: WhatsApp number, Vapi keys, AI chat switch |
| `assets/orbix.css`, `assets/orbix.js` | Site styles and code |
| `assets/orbix-vendor.js` | GSAP + ScrollTrigger + Lenis |
| `assets/vapi-sdk.js` | Vapi web SDK. It loads only when someone starts a voice call |
| `assets/fonts/` | Self-hosted Geist, Geist Mono and Instrument Serif |
| `work-*.webp`, `web-*.webp`, `og-image.jpg` | Project covers and the social share image |
| `chat-ai.php` | Optional ChatGPT brain for the chatbot. Add the key on the server |
| `.htaccess` | Routes old URLs to the page, compression and caching |

## Files that live only on the server (not in this repo)
- `send-mail.php`: the contact form and chatbot lead mailer.
- nothing else (logo and favicon are included).

Add it to the repo, or keep them in `public_html`, depending on how you deploy (see below).

## Deploying on Hostinger with Git
1. In hPanel, open **Websites → Manage → Advanced → GIT**.
2. Repository: `https://github.com/ahmad0187/orbixsoltion-react.git`, branch `main`. Leave the install path empty to deploy to `public_html`.
3. Hostinger requires the target folder to be **empty** for the first deploy. Back up `public_html` (especially `send-mail.php`, nothing else (logo and favicon are included)), empty it, deploy, then upload `send-mail.php` back.
4. Optional: enable **Auto Deployment** and add the webhook URL Hostinger gives you under GitHub → Settings → Webhooks. After that, every push goes live automatically.

## Settings
Edit the `window.AC_CONFIG` block near the top of `index.html`:
```js
whatsapp: '923374672612',
vapiPublicKey: 'PASTE_VAPI_PUBLIC_KEY',
vapiAssistantId: 'PASTE_VAPI_ASSISTANT_ID',
aiChat: false
```
Never commit secret keys. The Vapi **public** key is designed to sit in the browser. The OpenAI key belongs only in `chat-ai.php` on the server, so add it there through the File Manager rather than committing it.
