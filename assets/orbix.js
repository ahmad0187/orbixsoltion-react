/* Orbix Solutions · website · 2026 */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var hasGsap = typeof window.gsap !== 'undefined';
  var gsap = window.gsap;
  var isDesktop = function () { return window.innerWidth > 900; };
  var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };

  /* ------------------------------------------------------------------ */
  /* Projects                                                            */
  /* ------------------------------------------------------------------ */
  var PROJECTS = [
    { type: 'ai', img: '/work-voice-sales-agent.webp', cat: 'Voice AI · Outbound sales', title: 'Sarah, the AI sales caller',
      desc: 'Calls leads, opens by admitting she is an AI, handles objections and books demos straight into the CRM.',
      problem: 'Sales teams cannot call every lead fast enough, and cold calling burns out good people. Most leads go cold before anyone picks up the phone.',
      built: ['Natural-voice agent with a full sales script and five objection playbooks', 'Books 15-minute demos and reads back day, time and email', 'Every call recorded, transcribed, summarised and logged', 'Instant Slack alert when a lead is interested', 'Honours "remove me" with an automatic do-not-call list'],
      stack: ['Vapi', 'OpenAI', 'n8n', 'Twilio', 'Google Sheets', 'Slack'] },
    { type: 'ai', img: '/work-ai-receptionist.webp', cat: 'Voice AI · Receptionist', title: 'Emma, the AI receptionist',
      desc: 'Answers a clinic’s phone 24/7, checks the live calendar and books appointments while staff focus on patients.',
      problem: 'Every missed call is a lost booking, and most calls come in when the front desk is busy or closed.',
      built: ['Answers prices, opening hours and common questions', 'Checks Google Calendar live and offers only real free slots', 'Books, reschedules and takes messages, flagging urgent ones', 'Summary of every call sent to Slack, email and Sheets'],
      stack: ['Vapi', 'Claude', 'n8n', 'Google Calendar', 'Gmail', 'Slack'] },
    { type: 'ai', img: '/work-docchat.webp', cat: 'RAG · Knowledge assistant', title: 'DocChat',
      desc: 'Chat with your PDFs. Every answer shows the document and page it came from, and it says "I don’t know" instead of guessing.',
      problem: 'Staff waste hours searching handbooks, policies and price lists, and generic chatbots make answers up.',
      built: ['PDF upload with page-aware chunking and vector search', 'Answers cite the exact document and page, one click to open it', 'Refuses to answer when the documents do not say', 'Private workspace per customer plus a public demo'],
      stack: ['Node.js', 'Supabase', 'pgvector', 'Embeddings', 'LLM', 'pdf.js'] },
    { type: 'ai', img: '/work-homefinder-ai.webp', cat: 'AI chatbot · Real estate', title: 'HomeFinder AI',
      desc: 'A property assistant that reads a housebuilder’s website by itself and turns a conversation into a shortlist of homes.',
      problem: 'Buyers give up on long search filters. Agents get the same questions about rooms, offers and areas all day.',
      built: ['Reads the whole website from its sitemap every night, no API needed', 'Understands requests like "3 bed under £350k near Rugby"', 'Answers room sizes, offers, energy features and area questions', 'Drop-in chat widget for any website'],
      stack: ['Node.js', 'Claude', 'Web crawler', 'Embeddable widget'] },
    { type: 'ai', img: '/work-lead-responder.webp', cat: 'Automation · Sales', title: 'AI Lead Responder',
      desc: 'Every website lead scored, answered personally and logged in under 60 seconds, day or night.',
      problem: 'Leads contacted within five minutes convert far better, yet most businesses reply hours or days later.',
      built: ['Spam and bots filtered before any AI call, so junk costs nothing', 'AI scores each lead 1–10 and extracts need, budget and urgency', 'Personal reply sent from your own inbox', 'Every lead logged with its score and AI cost, hot leads alerted in Slack'],
      stack: ['n8n', 'Claude', 'Gmail', 'Google Sheets', 'Slack'] },
    { type: 'ai', img: '/work-invoiceiq.webp', cat: 'Document AI · Finance', title: 'InvoiceIQ',
      desc: 'Turns invoice PDFs into clean, checked data and catches billing errors before you pay.',
      problem: 'Finance teams retype invoices by hand, and mistakes in totals or tax slip through.',
      built: ['Extracts vendor, dates, totals, tax and every line item', 'Checks that the numbers add up and flags anything odd', 'Human review queue for low-confidence invoices', 'One-click Excel and CSV export'],
      stack: ['Python', 'FastAPI', 'LLM extraction', 'Docker'] },
    { type: 'ai', img: '/work-leadflow-crm.webp', cat: 'AI SaaS · CRM', title: 'LeadFlow CRM',
      desc: 'A sales pipeline that tells you which lead to call next, and drafts what to say.',
      problem: 'Salespeople spend more time updating the CRM than selling, and good leads get forgotten.',
      built: ['Drag-and-drop pipeline with an activity timeline', 'AI lead scoring that explains its reasoning', 'One-click personalised follow-up emails', 'Live analytics dashboard and CSV import/export'],
      stack: ['MongoDB', 'Express', 'React', 'Node.js', 'OpenAI'] },
    { type: 'ai', img: '/work-prospectscan.webp', cat: 'AI agent · Lead generation', title: 'ProspectScan',
      desc: 'Audits small-business websites, scores the sales opportunity and writes the first cold email for you.',
      problem: 'Finding prospects who really need your service, and writing a relevant first message, takes hours per lead.',
      built: ['Checks speed, mobile, SEO, online booking, chat and broken links', 'Scores each business 0–100 as a sales opportunity', 'Drafts a short email that mentions the real problems found', 'Polite crawling that respects robots.txt, CSV export'],
      stack: ['TypeScript', 'Node.js', 'LLM', 'Vitest'] }
  ];
  var WEB = [
    { type: 'web', img: '/web-startx-studio.webp', url: 'https://startxstudio.com/', cat: 'Startup studio · Web design', title: 'StartX Studio',
      desc: 'A bold, high-energy website for a startup studio, with a sharp layout, strong typography and a smooth path from landing to contact.',
      problem: 'A studio that builds startups needed a website as ambitious and fast-moving as the founders it works with.',
      built: ['Custom responsive design and front-end build', 'Motion and page transitions with Framer Motion', 'Clear, conversion-focused journey to the contact form'],
      stack: ['React', 'CSS', 'Framer Motion'] },
    { type: 'web', img: '/web-fynech.webp', url: 'https://fynech.com/', cat: 'Fintech · Web platform', title: 'Fynech',
      desc: 'A fintech platform with a polished, trustworthy design, clear data presentation and strong conversion flows.',
      problem: 'Financial products only convert when people trust them, so clarity and polish had to come first.',
      built: ['Trust-first interface with clear data presentation', 'React front-end with a Node.js REST API', 'Conversion flows designed around sign-ups'],
      stack: ['React', 'Node.js', 'REST API'] },
    { type: 'web ai', img: '/web-magiclisten.webp', cat: 'EdTech PWA · AI marking', title: 'MagicListen',
      desc: 'A Duolingo-style English learning app for exam students, with AI that reads photos of homework and finds mistakes.',
      problem: 'Teachers were marking hundreds of handwritten worksheets by hand and students waited days for feedback.',
      built: ['Installable PWA with lessons, streaks and progress', 'Photo upload with AI transcription and error detection (Gemini)', 'Automatic diagnostic reports per group of lessons', 'Membership system and admin dashboard', 'First version delivered in 3 weeks'],
      stack: ['WordPress', 'PHP', 'REST API', 'PWA', 'Gemini AI'] },
    { type: 'web', img: '/web-dubai-day-out.webp', url: 'https://dubaidayout.com', cat: 'Travel & lifestyle · UAE', title: 'Dubai Day Out',
      desc: 'A mobile-first travel and activities platform listing experiences, tours and events with rich local content.',
      problem: 'Visitors plan on their phones, so finding and comparing experiences had to be effortless on mobile.',
      built: ['Mobile-first listings for tours, experiences and events', 'Custom WordPress plugin for listings', 'Maps integration for locations'],
      stack: ['WordPress', 'Custom plugin', 'Maps API'] },
    { type: 'web', img: '/web-fihf.webp', url: 'https://fihf.org/', cat: 'Non-profit · Foundation', title: 'FIHF',
      desc: 'A full website for an international humanitarian foundation, built to be accessible and to tell its mission clearly.',
      problem: 'A global charity needed a site that anyone, anywhere, could use to understand its work and get involved.',
      built: ['Accessible, easy-to-navigate structure', 'Flexible content blocks the team edits themselves (ACF)', 'Clear mission storytelling and calls to action'],
      stack: ['WordPress', 'PHP', 'ACF'] },
    { type: 'web', img: '/web-high-performance-life.webp', url: 'https://thehighperformancelife.net', cat: 'Coaching · WordPress', title: 'The High Performance Life',
      desc: 'A coaching and personal development platform with course content, lead capture and a conversion-focused layout.',
      problem: 'A coaching brand needed one place to sell courses, capture leads and build trust.',
      built: ['Course and content pages', 'WooCommerce for selling programmes', 'Lead capture built into the layout'],
      stack: ['WordPress', 'WooCommerce', 'PHP'] },
    { type: 'web', img: '/web-zedd-haytch.webp', url: 'https://zeddhaytch.com', cat: 'Music artist · Portfolio', title: 'Zedd Haytch',
      desc: 'A dark-aesthetic artist portfolio with a music showcase, media embeds and a strong visual identity.',
      problem: 'An artist needed a home online that felt like the music, not like a template.',
      built: ['Custom dark visual design', 'Music and video showcase with embeds', 'Hand-crafted animations'],
      stack: ['HTML/CSS', 'JavaScript', 'Animation'] },
    { type: 'web', img: '/web-laftas-projects.webp', url: 'https://laftasprojects.nl', cat: 'Business · Netherlands', title: 'Laftas Projects',
      desc: 'A professional portfolio and business website for a Netherlands-based company, with bilingual content and strong branding.',
      problem: 'The company needed to win clients in two languages with one consistent brand.',
      built: ['Bilingual (Dutch/English) content structure', 'Project portfolio pages', 'Brand-led custom design'],
      stack: ['WordPress', 'PHP', 'CSS'] },
    { type: 'web', img: '/web-major-tom.webp', url: 'https://majortom.se', cat: 'Digital agency · Sweden', title: 'Major Tom',
      desc: 'A Swedish digital agency website with a bold aesthetic, smooth page transitions and clean service presentation.',
      problem: 'An agency site has to prove the agency\u2019s taste in seconds.',
      built: ['Bold custom design', 'Smooth page transitions', 'Clear service presentation'],
      stack: ['React', 'CSS', 'Motion'] }
  ];
  // Interleave AI and web work for the "All" view
  PROJECTS = (function () {
    var out = [], ai = PROJECTS.slice(), w = WEB.slice();
    while (ai.length || w.length) { if (ai.length) out.push(ai.shift()); if (w.length) out.push(w.shift()); }
    return out;
  })();
  var workFilter = 'all';

  function renderWork() {
    var track = $('#workTrack');
    if (!track) return;
    var list = PROJECTS.map(function (p, i) { return { p: p, i: i }; }).filter(function (o) { return workFilter === 'all' || o.p.type.indexOf(workFilter) > -1; });
    var html = list.map(function (o, n) {
      var p = o.p, i = o.i;
      return '<button class="proj" data-i="' + i + '" data-cursor="label" data-label="View">' +
        '<div class="proj__media"><span class="proj__idx">' + String(n + 1).padStart(2, '0') + ' / ' + String(list.length).padStart(2, '0') + '</span>' +
        '<img src="' + p.img + '" alt="' + p.title + ' preview" loading="lazy" decoding="async" width="1600" height="1000"></div>' +
        '<div class="proj__body"><span class="proj__cat mono">' + p.cat + '</span><h3>' + p.title + '</h3><p>' + p.desc + '</p>' +
        '<div class="proj__tags">' + p.stack.slice(0, 4).map(function (s) { return '<span>' + s + '</span>'; }).join('') + '</div></div></button>';
    }).join('');
    html += '<div class="proj proj--end"><h3>' + (workFilter === 'web' ? 'Your website<br>could be next.' : workFilter === 'ai' ? 'Your AI agent<br>could be next.' : 'Your project<br>could be next.') + '</h3><a href="#contact" class="btn magnetic" data-cursor="hover"><span>Start a project</span><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></div>';
    track.innerHTML = html;
  }

  /* ------------------------------------------------------------------ */
  /* Text splitting                                                      */
  /* ------------------------------------------------------------------ */
  function splitInto(el, wrapFn) {
    var nodes = Array.prototype.slice.call(el.childNodes);
    nodes.forEach(function (n) {
      if (n.nodeType === 3) {
        var frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(' '));
          else frag.appendChild(wrapFn(part));
        });
        el.replaceChild(frag, n);
      } else if (n.nodeType === 1 && n.tagName !== 'BR') {
        splitInto(n, wrapFn);
      }
    });
  }
  function splitWords(el) {
    splitInto(el, function (t) { var s = document.createElement('span'); s.className = 'w'; s.textContent = t; return s; });
  }
  function splitMasked(el) {
    splitInto(el, function (t) {
      var o = document.createElement('span'); o.className = 'ln';
      var i = document.createElement('span'); i.textContent = t; o.appendChild(i); return o;
    });
  }

  /* ------------------------------------------------------------------ */
  /* Smooth scroll                                                       */
  /* ------------------------------------------------------------------ */
  var lenis = null;
  function initScroll() {
    if (hasGsap && window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);
    if (!reduce && typeof window.Lenis !== 'undefined') {
      lenis = new window.Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
      if (hasGsap) {
        lenis.on('scroll', window.ScrollTrigger.update);
        gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
        gsap.ticker.lagSmoothing(0);
      } else {
        var raf = function (t) { lenis.raf(t); requestAnimationFrame(raf); };
        requestAnimationFrame(raf);
      }
    }
    // anchor links
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute('href');
      if (id.length < 2 && id !== '#') return;
      var target = id === '#top' || id === '#' ? 0 : $(id);
      if (target === null) return;
      e.preventDefault();
      closeMenu();
      scrollToTarget(target);
      if (history.replaceState) history.replaceState(null, '', id === '#top' ? location.pathname : id);
    });
  }
  function scrollToTarget(target, immediate) {
    if (lenis) lenis.scrollTo(target, { offset: target === 0 ? 0 : -20, duration: immediate ? 0 : 1.4, immediate: !!immediate });
    else if (target === 0) window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
    else target.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth' });
  }

  /* Old site routes (/services/..., /work, /contact) land on the matching section */
  function deepLink() {
    var map = { '/services': '#services', '/work': '#work', '/contact': '#contact', '/about': '#process' };
    var path = location.pathname.replace(/\/+$/, '');
    var key = Object.keys(map).find(function (k) { return path === k || path.indexOf(k + '/') === 0; });
    var hash = location.hash && location.hash.length > 1 ? location.hash : (key ? map[key] : null);
    if (!hash) return;
    var el = $(hash);
    if (el) setTimeout(function () { scrollToTarget(el, true); }, 60);
  }

  /* ------------------------------------------------------------------ */
  /* Cursor                                                              */
  /* ------------------------------------------------------------------ */
  function initCursor() {
    if (!fine || reduce) return;
    document.documentElement.classList.add('has-cursor');
    var c = $('.cursor'), dot = $('.cursor__dot'), ring = $('.cursor__ring'), label = $('.cursor__label'), spot = $('.spot');
    var mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, sx = mx, sy = my;
    window.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; c.classList.remove('is-hidden'); }, { passive: true });
    document.addEventListener('mouseleave', function () { c.classList.add('is-hidden'); });
    window.addEventListener('mousedown', function () { c.classList.add('is-down'); });
    window.addEventListener('mouseup', function () { c.classList.remove('is-down'); });
    (function loop() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      sx += (mx - sx) * 0.06; sy += (my - sy) * 0.06;
      dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)';
      ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
      spot.style.transform = 'translate3d(' + sx + 'px,' + sy + 'px,0)';
      requestAnimationFrame(loop);
    })();
    document.addEventListener('mouseover', function (e) {
      var t = e.target.closest('[data-cursor], a, button, summary, input, textarea, label');
      c.classList.remove('is-hover', 'is-label', 'is-text');
      if (!t) return;
      var kind = t.getAttribute('data-cursor');
      if (kind === 'label') { label.textContent = t.getAttribute('data-label') || 'View'; c.classList.add('is-label'); }
      else if (t.matches('input:not([type=radio]):not([type=checkbox]), textarea')) c.classList.add('is-text');
      else c.classList.add('is-hover');
    });
  }

  /* Magnetic buttons */
  function initMagnetic() {
    if (!fine || reduce || !hasGsap) return;
    $$('.magnetic').forEach(function (el) {
      var xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1,0.4)' });
      var yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1,0.4)' });
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var s = el.classList.contains('cta__btn') ? 0.45 : 0.3;
        xTo((e.clientX - r.left - r.width / 2) * s);
        yTo((e.clientY - r.top - r.height / 2) * s);
      });
      el.addEventListener('mouseleave', function () { xTo(0); yTo(0); });
    });
  }

  /* Scramble text on nav hover */
  function initScramble() {
    var chars = '!<>-_\\/[]{}=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $$('[data-scramble]').forEach(function (el) {
      var original = el.textContent, raf = null;
      el.addEventListener('mouseenter', function () {
        var frame = 0, total = original.length * 2.4;
        cancelAnimationFrame(raf);
        (function tick() {
          var out = '';
          for (var i = 0; i < original.length; i++) {
            if (original[i] === ' ') { out += ' '; continue; }
            out += i < frame / 2.4 ? original[i] : chars[Math.floor(Math.random() * chars.length)];
          }
          el.textContent = out;
          frame++;
          if (frame <= total) raf = requestAnimationFrame(tick); else el.textContent = original;
        })();
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Nav, menu, progress                                                 */
  /* ------------------------------------------------------------------ */
  function closeMenu() {
    document.body.classList.remove('menu-open');
    var b = $('#burger'); if (b) b.setAttribute('aria-expanded', 'false');
    $('#menu').setAttribute('aria-hidden', 'true');
    if (lenis) lenis.start();
  }
  function initNav() {
    var nav = $('#nav'), bar = $('.progress i'), last = 0;
    var burger = $('#burger');
    burger.addEventListener('click', function () {
      var open = !document.body.classList.contains('menu-open');
      if (!open) return closeMenu();
      document.body.classList.add('menu-open');
      burger.setAttribute('aria-expanded', 'true');
      $('#menu').setAttribute('aria-hidden', 'false');
      if (lenis) lenis.stop();
    });
    var onScroll = function () {
      var y = window.scrollY, h = document.documentElement.scrollHeight - innerHeight;
      nav.classList.toggle('is-scrolled', y > 40);
      last = y;
      bar.style.transform = 'scaleX(' + (h > 0 ? y / h : 0) + ')';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    // active link
    var links = $$('.nav__links a');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (l) { l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id); });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      ['services', 'demo', 'work', 'process', 'faq'].forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
    }
  }

  /* ------------------------------------------------------------------ */
  /* WebGL orb                                                           */
  /* ------------------------------------------------------------------ */
  function initOrb() {
    var canvas = $('#orb');
    if (!canvas) return;
    var gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'high-performance' });
    if (!gl) return;
    var vs = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
    var fs = [
      'precision highp float;uniform vec2 r;uniform float t;uniform vec2 m;uniform vec2 c;uniform float s;',
      'vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}',
      'vec4 perm(vec4 x){return mod289(((x*34.)+1.)*x);}vec4 tis(vec4 r){return 1.79284291400159-.85373472095314*r;}',
      'float sn(vec3 v){const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);',
      'vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;',
      'i=mod289(i);vec4 p=perm(perm(perm(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));',
      'float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);',
      'vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);',
      'vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;',
      'vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);vec4 nm=tis(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));',
      'p0*=nm.x;p1*=nm.y;p2*=nm.z;p3*=nm.w;vec4 mm=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);mm=mm*mm;',
      'return 42.*dot(mm*mm,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}',
      'void main(){vec2 uv=gl_FragCoord.xy/r;float a=r.x/r.y;vec2 q=(uv-c)*vec2(a,1.);',
      'vec2 mo=(m-c)*vec2(a,1.);q-=mo*.06;float d0=length(q);',
      'float n1=sn(vec3(q*1.7,t*.16));float n2=sn(vec3(q*3.2+n1*.8,t*.27));',
      'float R=s*(1.+.13*n1+.06*n2+.05*exp(-length(q-mo*.5)*4.));float d=d0;',
      'vec3 cV=vec3(.48,.38,1.);vec3 cC=vec3(.24,.9,1.);vec3 cP=vec3(1.,.36,.82);',
      'float f=n2*.5+.5;vec3 col=mix(cV,cC,smoothstep(.15,.85,f+q.y*1.4+q.x*.6));',
      'col=mix(col,cP,smoothstep(.45,.95,sn(vec3(q*2.2,t*.2+7.))*.5+.5)*.65);',
      'float fr=smoothstep(R*.05,R,d);col*=.18+.95*pow(fr,1.6);col+=pow(fr,9.)*.55*cC;',
      'float inside=smoothstep(R+.006,R-.006,d);',
      'float glow=exp(-max(d-R,0.)*7.)*.42+exp(-max(d-R,0.)*28.)*.35;vec3 gcol=mix(cV,cC,.5+.5*sin(t*.4+atan(q.y,q.x)*2.));',
      'vec3 o=col*inside+gcol*glow*(1.-inside);',
      'float ring=smoothstep(.0022,.0,abs(d-(R+.11*s/.3+.012*sin(t*.8))));o+=ring*.28*cC*(1.-inside);',
      'float ring2=smoothstep(.0016,.0,abs(d-(R+.24*s/.3)));o+=ring2*.12*cV*(1.-inside);',
      'o+=vec3(.02,.02,.04);o+=(fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453)-.5)*.025;',
      'gl_FragColor=vec4(o,1.);}'
    ].join('\n');
    function sh(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; } return s; }
    var v = sh(gl.VERTEX_SHADER, vs), f = sh(gl.FRAGMENT_SHADER, fs);
    if (!v || !f) return;
    var pr = gl.createProgram(); gl.attachShader(pr, v); gl.attachShader(pr, f); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
    gl.useProgram(pr);
    var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    var uR = gl.getUniformLocation(pr, 'r'), uT = gl.getUniformLocation(pr, 't'), uM = gl.getUniformLocation(pr, 'm'), uC = gl.getUniformLocation(pr, 'c'), uS = gl.getUniformLocation(pr, 's');
    var W, H, cx, cy, size, tm = { x: 0.7, y: 0.55 }, cm = { x: 0.7, y: 0.55 }, visible = true, start = performance.now(), intro = 0;
    function resize() {
      var q = Math.min(window.devicePixelRatio || 1, 1.5) * (innerWidth < 700 ? 0.7 : 0.8);
      W = canvas.width = Math.round(canvas.clientWidth * q); H = canvas.height = Math.round(canvas.clientHeight * q);
      gl.viewport(0, 0, W, H);
      var mobile = innerWidth < 900;
      cx = mobile ? 0.8 : 0.7; cy = mobile ? 0.86 : 0.56; size = mobile ? 0.2 : 0.3;
    }
    resize(); window.addEventListener('resize', resize);
    window.addEventListener('mousemove', function (e) { tm.x = e.clientX / innerWidth; tm.y = 1 - e.clientY / innerHeight; }, { passive: true });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { visible = e[0].isIntersecting; if (visible) loop(); }, {}).observe(canvas);
    document.documentElement.classList.add('gl-ok');
    var running = false;
    function loop() {
      if (running) return; running = true;
      (function frame() {
        if (!visible) { running = false; return; }
        var t = (performance.now() - start) / 1000;
        intro += (1 - intro) * 0.03;
        cm.x += (tm.x - cm.x) * 0.04; cm.y += (tm.y - cm.y) * 0.04;
        gl.uniform2f(uR, W, H); gl.uniform1f(uT, reduce ? 3 : t); gl.uniform2f(uM, cm.x, cm.y);
        gl.uniform2f(uC, cx, cy); gl.uniform1f(uS, size * (0.6 + 0.4 * intro));
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        if (reduce) { running = false; return; }
        requestAnimationFrame(frame);
      })();
    }
    loop();
  }

  /* ------------------------------------------------------------------ */
  /* Hero                                                                */
  /* ------------------------------------------------------------------ */
  function heroIntro() {
    if (!hasGsap) return;
    var tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.to('.hero__title .word, .rotator__track', { y: 0, duration: 1.4, stagger: 0.08 })
      .to('.reveal-up', { opacity: 1, y: 0, duration: 1.2, stagger: 0.1 }, 0.35)
      .from('.chip-f', { opacity: 0, y: 40, scale: 0.9, duration: 1.2, stagger: 0.15 }, 0.7);
    // rotating words
    var track = $('#rotator'), items = $$('em', track), idx = 0;
    setTimeout(function cycle() {
      idx++;
      gsap.to(track, { yPercent: -100 * idx / items.length, duration: 0.9, ease: 'expo.inOut', onComplete: function () {
        if (idx === items.length - 1) { idx = 0; gsap.set(track, { yPercent: 0 }); }
      } });
      setTimeout(cycle, 2300);
    }, 2600);
    // chips follow mouse
    if (fine) {
      var chips = $$('.chip-f');
      window.addEventListener('mousemove', function (e) {
        var dx = e.clientX / innerWidth - 0.5, dy = e.clientY / innerHeight - 0.5;
        chips.forEach(function (c) { var d = +c.dataset.depth || 1; gsap.to(c, { x: dx * 50 * d, y: dy * 40 * d, duration: 1.2, ease: 'power3.out' }); });
      }, { passive: true });
    }
    // parallax out
    gsap.to('.hero__content', { yPercent: 25, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero__gl', { yPercent: 18, scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  }

  /* ------------------------------------------------------------------ */
  /* Scroll animations                                                   */
  /* ------------------------------------------------------------------ */
  function initReveals() {
    if (!hasGsap) return;
    var ST = window.ScrollTrigger;

    // Marquee with scroll velocity
    var mq = $('#marquee');
    if (mq) {
      var mqTween = gsap.to(mq, { xPercent: -50, duration: 38, ease: 'none', repeat: -1 });
      var ctaTween = gsap.to('#ctaTrack', { xPercent: -50, duration: 26, ease: 'none', repeat: -1 });
      var boost = { v: 1 };
      ST.create({ onUpdate: function (self) {
        var v = self.getVelocity() / 300, dir = self.direction;
        gsap.to(boost, { v: dir * Math.max(1, Math.min(6, Math.abs(v))), duration: 0.2, overwrite: true, onUpdate: function () { mqTween.timeScale(boost.v); ctaTween.timeScale(boost.v); } });
        gsap.to(boost, { v: dir, duration: 1.4, delay: 0.25, overwrite: false, onUpdate: function () { mqTween.timeScale(boost.v); ctaTween.timeScale(boost.v); } });
      } });
    }

    // Intro paragraph word-by-word light-up
    $$('.split-words').forEach(function (el) {
      splitWords(el);
      gsap.to($$('.w', el), { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true } });
    });

    // Headings
    $$('.split-lines').forEach(function (el) {
      splitMasked(el);
      gsap.to($$('.ln > span', el), { y: 0, duration: 1.2, ease: 'expo.out', stagger: 0.045, scrollTrigger: { trigger: el, start: 'top 85%' } });
    });

    // Counters
    $$('[data-count]').forEach(function (el) {
      var to = +el.dataset.count, o = { v: 0 };
      gsap.to(o, { v: to, duration: 2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' }, onUpdate: function () { el.textContent = Math.round(o.v); } });
    });
    gsap.from('.stat', { y: 40, opacity: 0, duration: 1.1, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: '.stats', start: 'top 85%' } });

    // Bento cards
    gsap.from('.card', { y: 80, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: { each: 0.07 }, scrollTrigger: { trigger: '.bento', start: 'top 82%' } });
    gsap.from('.eu__card', { y: 60, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08, scrollTrigger: { trigger: '.eu__grid', start: 'top 85%' } });
    gsap.from('.qa', { y: 30, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.06, scrollTrigger: { trigger: '.faq__list', start: 'top 85%' } });
    gsap.from('.demo__tabs, .demo__stage', { y: 50, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: 0.12, scrollTrigger: { trigger: '.demo__tabs', start: 'top 88%' } });
    gsap.from('.form', { y: 60, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.form', start: 'top 88%' } });
    gsap.from('.contact__list li', { x: -30, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.07, scrollTrigger: { trigger: '.contact__list', start: 'top 90%' } });

    // Process steps
    $$('.step').forEach(function (s) {
      ST.create({ trigger: s, start: 'top 62%', end: 'bottom 40%', onToggle: function (self) { s.classList.toggle('is-on', self.isActive); } });
      gsap.from(s, { opacity: 0.25, y: 40, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: s, start: 'top 85%' } });
    });

    // CTA circle
    gsap.from('.cta__btn', { scale: 0.4, rotate: -40, opacity: 0, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: '.cta', start: 'top 70%' } });

    // Footer giant letters
    $$('.foot__giant span').forEach(function (sp) {
      var txt = sp.textContent; sp.textContent = '';
      txt.split('').forEach(function (ch) { var i = document.createElement('i'); i.textContent = ch; i.style.display = 'inline-block'; i.style.fontStyle = 'inherit'; sp.appendChild(i); });
    });
    gsap.from('.foot__giant i', { yPercent: 100, opacity: 0, duration: 1.4, ease: 'expo.out', stagger: 0.035, scrollTrigger: { trigger: '.foot__giant', start: 'top 95%' } });
  }

  /* Work: pinned horizontal scroll on desktop */
  function initWork() {
    if (!hasGsap) return;
    var track = $('#workTrack'), bar = $('#workBar');
    var mm = gsap.matchMedia();
    mm.add('(min-width: 901px)', function () {
      var dist = function () { return Math.max(0, track.scrollWidth - innerWidth); };
      var tw = gsap.to(track, { x: function () { return -dist(); }, ease: 'none',
        scrollTrigger: { trigger: '.work__pin', start: 'top top', end: function () { return '+=' + dist(); }, pin: true, scrub: 1, invalidateOnRefresh: true,
          onUpdate: function (self) { bar.style.transform = 'scaleX(' + self.progress + ')'; } } });
      return function () { gsap.set(track, { clearProps: 'x' }); };
    });
    // Filter buttons
    $$('.filter button').forEach(function (b) {
      b.addEventListener('click', function () {
        if (b.classList.contains('is-on')) return;
        $$('.filter button').forEach(function (x) { x.classList.toggle('is-on', x === b); });
        workFilter = b.dataset.filter;
        gsap.to('#workTrack .proj', { opacity: 0, y: 30, duration: 0.3, stagger: 0.02, onComplete: function () {
          renderWork();
          if (isDesktop()) gsap.set(track, { x: 0 });
          window.ScrollTrigger.refresh();
          var w = $('#work'); if (isDesktop() && w) scrollToTarget($('.work__pin'));
          gsap.from('#workTrack .proj', { opacity: 0, y: 40, duration: 0.8, stagger: 0.05, ease: 'expo.out' });
        } });
      });
    });
  }

  /* Cards: tilt + spotlight */
  function initCards() {
    $$('.tilt, .eu__card').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        card.style.setProperty('--mx', x + 'px'); card.style.setProperty('--my', y + 'px');
        if (fine && !reduce && hasGsap && card.classList.contains('tilt')) {
          gsap.to(card, { rotateY: (x / r.width - 0.5) * 7, rotateX: -(y / r.height - 0.5) * 7, transformPerspective: 900, duration: 0.6, ease: 'power3.out' });
        }
      });
      card.addEventListener('pointerleave', function () { if (hasGsap) gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.9, ease: 'elastic.out(1,0.5)' }); });
    });
    var wave = $('.mini-wave');
    if (wave) for (var i = 0; i < 28; i++) {
      var b = document.createElement('b');
      b.style.setProperty('--h', (25 + Math.abs(Math.sin(i * 0.7)) * 70) + '%');
      b.style.animationDelay = (i * 0.06) + 's';
      b.style.animationDuration = (0.7 + (i % 5) * 0.12) + 's';
      wave.appendChild(b);
    }
  }

  /* FAQ smooth open */
  function initFaq() {
    $$('.qa').forEach(function (d) {
      var sum = $('summary', d), body = $('.qa__a', d);
      sum.addEventListener('click', function (e) {
        if (!hasGsap || reduce) return;
        e.preventDefault();
        if (d.open) {
          gsap.to(body, { height: 0, opacity: 0, duration: 0.5, ease: 'expo.out', onComplete: function () { d.open = false; gsap.set(body, { clearProps: 'all' }); refreshST(); } });
        } else {
          $$('.qa[open]').forEach(function (o) { if (o !== d) { var b2 = $('.qa__a', o); gsap.to(b2, { height: 0, opacity: 0, duration: 0.4, ease: 'expo.out', onComplete: function () { o.open = false; gsap.set(b2, { clearProps: 'all' }); } }); } });
          d.open = true;
          gsap.fromTo(body, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.7, ease: 'expo.out', onComplete: refreshST });
        }
      });
    });
  }
  function refreshST() { if (hasGsap && window.ScrollTrigger) window.ScrollTrigger.refresh(); }

  /* ------------------------------------------------------------------ */
  /* Live demo                                                           */
  /* ------------------------------------------------------------------ */
  var demoState = { chatStarted: false, flowRun: 0, voiceRun: 0 };
  function initDemo() {
    var tabs = $$('.demo__tab'), pill = $('.demo__pill'), panes = $$('.pane');
    function placePill(t) { pill.style.left = t.offsetLeft + 'px'; pill.style.width = t.offsetWidth + 'px'; }
    function activate(name) {
      tabs.forEach(function (t) { var on = t.dataset.tab === name; t.classList.toggle('is-on', on); t.setAttribute('aria-selected', on); if (on) placePill(t); });
      panes.forEach(function (p) { p.classList.toggle('is-on', p.dataset.pane === name); });
      if (name === 'flow') runFlow();
      if (name === 'chat' && !demoState.chatStarted) startChat();
      refreshST();
    }
    tabs.forEach(function (t) { t.addEventListener('click', function () { activate(t.dataset.tab); }); });
    window.addEventListener('resize', function () { var on = $('.demo__tab.is-on'); if (on) placePill(on); });
    setTimeout(function () { placePill($('.demo__tab.is-on')); }, 50);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { placePill($('.demo__tab.is-on')); });

    // Start the chat when the section comes into view
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (e) { if (e[0].isIntersecting && !demoState.chatStarted && $('[data-pane=chat]').classList.contains('is-on')) { startChat(); io.disconnect(); } }, { threshold: 0.35 });
      io.observe($('#demo .demo__stage'));
    } else startChat();

    initChat(); initVoice();
    $('#flowRun').addEventListener('click', runFlow);
  }

  /* Chatbot */
  var chatBody, chatBusy = false;
  var CHAT = {
    price: { q: 'How much is teeth whitening?', a: ['In-clinic whitening is <b>€290</b> and takes about 60 minutes. We also offer a take-home kit for €180.', 'Would you like me to book a free 15-minute consultation first?'] },
    book: { q: 'Book me in Thursday', a: ['__slots__'], follow: { q: '14:30 please', a: ['Done ✓ You’re booked for <b>Thursday at 14:30</b> with Dr. Costa. A confirmation is on its way to your email, and I’ll send a reminder the day before.'] } },
    lang: { q: '¿Hablas español?', a: ['¡Claro que sí! Puedo atenderte en español, portugués, inglés, francés o alemán. ¿En qué te puedo ayudar hoy?'] }
  };
  function addMsg(html, who) {
    var m = document.createElement('div');
    m.className = 'msg msg--' + who; m.innerHTML = html; chatBody.appendChild(m);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
    return m;
  }
  function typingBubble(ms) {
    var t = addMsg('<span class="typing"><i></i><i></i><i></i></span>', 't');
    return sleep(ms).then(function () { t.remove(); });
  }
  async function botSay(lines) {
    for (var i = 0; i < lines.length; i++) {
      await typingBubble(700 + Math.min(lines[i].length * 12, 1100));
      if (lines[i] === '__slots__') {
        addMsg('Let me check the calendar… Thursday I have these times free:<div class="slots"><span>10:00</span><span class="on">14:30</span><span>17:00</span></div>', 'a');
      } else addMsg(lines[i], 'a');
    }
  }
  async function ask(key) {
    if (chatBusy) return; chatBusy = true;
    var item = CHAT[key];
    $$('#chatChips button').forEach(function (b) { b.disabled = true; });
    var btn = $('#chatChips [data-q="' + key + '"]'); if (btn) btn.style.display = 'none';
    addMsg(item.q, 'u');
    await botSay(item.a);
    if (item.follow) { await sleep(900); addMsg(item.follow.q, 'u'); await botSay(item.follow.a); }
    $$('#chatChips button').forEach(function (b) { b.disabled = false; });
    chatBusy = false;
  }
  function initChat() {
    chatBody = $('#chatBody');
    $$('#chatChips button').forEach(function (b) { b.addEventListener('click', function () { demoState.chatStarted = true; if (!chatBody.children.length) addMsg('Hi! I’m Aria, Clínica Sol’s assistant. I can answer questions or book you in, any time of day. How can I help?', 'a'); ask(b.dataset.q); }); });
    $('#chatReplay').addEventListener('click', function () { if (chatBusy) return; demoState.chatStarted = false; startChat(); });
  }
  async function startChat() {
    if (demoState.chatStarted) return;
    demoState.chatStarted = true;
    chatBody.innerHTML = '';
    $$('#chatChips button').forEach(function (b) { b.style.display = ''; });
    await sleep(300);
    chatBusy = true;
    await botSay(['Hi! I’m Aria, Clínica Sol’s assistant. I can answer questions or book you in, any time of day. How can I help?']);
    chatBusy = false;
    await sleep(1200);
    if (!chatBody.querySelector('.msg--u')) ask('book');
  }

  /* Voice agent */
  var VOICE = [
    ['Sarah', 'Hi John, quick question before I tell you why I’m calling. Can you tell I’m not a real person?'],
    ['Owner', 'Wait, seriously? No, I couldn’t tell. Who is this?'],
    ['Sarah', 'I’m Sarah, an AI from Orbix Solutions. Businesses like yours use agents like me to answer every call, even at 2 a.m., and book the job on the spot.'],
    ['Owner', 'Sounds expensive. What does it cost?'],
    ['Sarah', 'Less than one missed job a month, usually. The easiest way to see if it fits is a 15-minute demo. Would Thursday or Friday work better?'],
    ['Owner', 'Thursday afternoon, maybe three?'],
    ['Sarah', 'Perfect. Thursday at 3 p.m. And the best email for the invite?'],
    ['Owner', 'john at smith hvac dot com.'],
    ['Sarah', 'Great. That’s john@smithhvac.com, Thursday at 3 p.m. You’ll get the invite in a minute. Thanks, John!']
  ];
  var voiceTimer = null, barsTimer = null, voiceSecs = 0, voicePlaying = false;
  function initVoice() {
    var bars = $('#voiceBars');
    for (var i = 0; i < 40; i++) bars.appendChild(document.createElement('i'));
    $('#voicePlay').addEventListener('click', function () { if (voicePlaying) stopVoice(); else playVoice(); });
  }
  function setBars(active) {
    var bars = $$('#voiceBars i');
    clearInterval(barsTimer);
    if (!active) { bars.forEach(function (b) { b.style.height = '6%'; }); return; }
    barsTimer = setInterval(function () { bars.forEach(function (b, i) { b.style.height = (10 + Math.random() * 80 * Math.abs(Math.sin(i * 0.4 + Date.now() / 300))) + '%'; }); }, 110);
  }
  function speak(text, who) {
    return new Promise(function (resolve) {
      var sound = $('#voiceSound').checked && 'speechSynthesis' in window;
      if (!sound) return setTimeout(resolve, 900 + text.length * 42);
      var u = new SpeechSynthesisUtterance(text.replace('john@smithhvac.com', 'john at smith h v a c dot com'));
      var voices = speechSynthesis.getVoices().filter(function (v) { return /^en/i.test(v.lang); });
      var female = voices.find(function (v) { return /female|samantha|victoria|zira|aria|jenny|libby|sonia|google uk english female/i.test(v.name); });
      var male = voices.find(function (v) { return /male|daniel|alex|david|guy|ryan|google uk english male/i.test(v.name) && v !== female; });
      u.voice = (who === 'Sarah' ? female : male) || voices[0] || null;
      u.rate = 1.04; u.pitch = who === 'Sarah' ? 1.1 : 0.9;
      var done = false, fin = function () { if (!done) { done = true; resolve(); } };
      u.onend = fin; u.onerror = fin; setTimeout(fin, 2000 + text.length * 90);
      speechSynthesis.speak(u);
    });
  }
  function stopVoice() {
    voicePlaying = false; demoState.voiceRun++;
    clearInterval(voiceTimer); setBars(false);
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    $('#voiceOrb').classList.remove('is-talking');
    $('#voicePlay span').textContent = '▶ Play the call';
  }
  async function playVoice() {
    var run = ++demoState.voiceRun, tr = $('#transcript');
    voicePlaying = true; voiceSecs = 0; tr.innerHTML = '';
    $('#voicePlay span').textContent = '■ Stop the call';
    clearInterval(voiceTimer);
    voiceTimer = setInterval(function () { voiceSecs++; $('#voiceTime').textContent = '00:' + String(voiceSecs).padStart(2, '0'); }, 1000);
    var ring = document.createElement('div'); ring.className = 'tl sys'; ring.innerHTML = '<p>☎ Calling Smith Heating &amp; Cooling…</p>'; tr.appendChild(ring);
    await sleep(1400);
    for (var i = 0; i < VOICE.length; i++) {
      if (run !== demoState.voiceRun) return;
      var who = VOICE[i][0], line = document.createElement('div');
      line.className = 'tl' + (who === 'Sarah' ? '' : ' u');
      line.innerHTML = '<b>' + who + '</b><p>' + VOICE[i][1] + '</p>';
      tr.appendChild(line); tr.scrollTo({ top: tr.scrollHeight, behavior: 'smooth' });
      $('#voiceOrb').classList.toggle('is-talking', who === 'Sarah');
      setBars(true);
      await speak(VOICE[i][1], who);
      setBars(false);
      await sleep(250);
    }
    if (run !== demoState.voiceRun) return;
    var done = document.createElement('div'); done.className = 'tl sys';
    done.innerHTML = '<p>✓ Demo booked · Thu 15:00 · logged to CRM · Slack alert sent</p>';
    tr.appendChild(done); tr.scrollTo({ top: tr.scrollHeight, behavior: 'smooth' });
    clearInterval(voiceTimer); voicePlaying = false;
    $('#voiceOrb').classList.remove('is-talking');
    $('#voicePlay span').textContent = '↻ Play again';
  }

  /* Automation flow */
  var FLOW_LOG = [
    [0, '<span class="t">10:42:01</span> POST /webhook/new-lead · Laura Méndez · Clínica Sol, Valencia'],
    [1, '<span class="t">10:42:01</span> <span class="ok">✓</span> Passed spam filter (honeypot, rate limit, disposable email)'],
    [2, '<span class="t">10:42:03</span> <span class="ai">✦ AI</span> score <b>9/10</b> · need: booking chatbot · budget: ~€6k · urgency: high'],
    [3, '<span class="t">10:42:04</span> <span class="ok">✓</span> Personal reply sent to laura@clinicasol.es'],
    [4, '<span class="t">10:42:04</span> <span class="ok">✓</span> CRM updated · stage "Hot" · notes added'],
    [5, '<span class="t">10:42:05</span> <span class="ok">✓</span> Slack #hot-leads alerted'],
    [-1, '<span class="ok">Done in 4.1 s · AI cost €0.0006</span>']
  ];
  async function runFlow() {
    var run = ++demoState.flowRun, nodes = $$('.flow__node'), edges = $$('.flow__edge'), log = $('#flowLog');
    nodes.forEach(function (n) { n.classList.remove('is-on'); }); edges.forEach(function (e) { e.classList.remove('is-on'); });
    log.innerHTML = '';
    await sleep(400);
    for (var i = 0; i < FLOW_LOG.length; i++) {
      if (run !== demoState.flowRun) return;
      var step = FLOW_LOG[i][0];
      if (step >= 0) {
        if (step > 0 && step <= 3 && edges[step - 1]) edges[step - 1].classList.add('is-on');
        nodes[step].classList.add('is-on');
      }
      var l = document.createElement('div'); l.innerHTML = FLOW_LOG[i][1]; log.appendChild(l);
      if (hasGsap) gsap.from(l, { opacity: 0, x: -10, duration: 0.4 });
      await sleep(step === 2 ? 1300 : 650);
    }
  }

  /* ------------------------------------------------------------------ */
  /* Modal                                                               */
  /* ------------------------------------------------------------------ */
  var lastFocus = null;
  function openModal(i) {
    var p = PROJECTS[i], m = $('#modal');
    $('#modalImg').src = p.img; $('#modalImg').alt = p.title;
    $('#modalCat').textContent = p.cat; $('#modalTitle').textContent = p.title;
    $('#modalLead').textContent = p.desc; $('#modalProblem').textContent = p.problem;
    $('#modalBuilt').innerHTML = p.built.map(function (b) { return '<li>' + b + '</li>'; }).join('');
    $('#modalStack').innerHTML = p.stack.map(function (s) { return '<span>' + s + '</span>'; }).join('');
    var live = $('#modalLive'); if (p.url) { live.href = p.url; live.hidden = false; } else live.hidden = true;
    lastFocus = document.activeElement;
    m.classList.add('is-open'); m.setAttribute('aria-hidden', 'false');
    $('.modal__box', m).scrollTop = 0;
    if (lenis) lenis.stop();
    setTimeout(function () { $('.modal__x', m).focus(); }, 50);
  }
  function closeModal() {
    var m = $('#modal'); if (!m.classList.contains('is-open')) return;
    m.classList.remove('is-open'); m.setAttribute('aria-hidden', 'true');
    if (lenis) lenis.start();
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  function initModal() {
    document.addEventListener('click', function (e) {
      var card = e.target.closest('.proj[data-i]');
      if (card) return openModal(+card.dataset.i);
      if (e.target.closest('#modal [data-close]')) closeModal();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeModal(); closeMenu(); } });
  }

  /* ------------------------------------------------------------------ */
  /* Contact form → /send-mail.php                                       */
  /* ------------------------------------------------------------------ */
  function toast(msg) {
    var t = $('#toast'); t.textContent = msg; t.classList.add('is-on');
    clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.remove('is-on'); }, 4200);
  }
  function initForm() {
    var form = $('#contactForm'), err = $('#formErr'), btnText = $('#formBtnText');
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      var data = { name: form.name.value.trim(), email: form.email.value.trim(), company: form.company.value.trim(), service: (form.querySelector('input[name=service]:checked') || {}).value || '', message: form.message.value.trim() };
      var bad = [];
      $$('.field', form).forEach(function (f) { f.classList.remove('is-bad'); });
      if (!data.name) bad.push(['name', 'Please tell us your name.']);
      if (!data.email) bad.push(['email', 'Email is required.']);
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) bad.push(['email', 'Please enter a valid email address.']);
      if (!data.message) bad.push(['message', 'Please tell us a little about your project.']);
      else if (data.message.length < 10) bad.push(['message', 'Message must be at least 10 characters.']);
      if (bad.length) {
        bad.forEach(function (b) { form[b[0]].closest('.field').classList.add('is-bad'); });
        err.textContent = bad[0][1]; form[bad[0][0]].focus();
        if (hasGsap) gsap.fromTo(form, { x: -8 }, { x: 0, duration: 0.6, ease: 'elastic.out(1,0.3)' });
        return;
      }
      err.textContent = '';
      form.classList.add('is-sending'); btnText.textContent = 'Sending…';
      try {
        var res = await fetch('/send-mail.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        var json = await res.json().catch(function () { return {}; });
        if (res.ok && json.status === 'success') {
          $('#formDone').hidden = false; form.reset();
          toast('Message sent. We’ll be in touch within 24 hours.');
          setTimeout(function () { $('#formDone').hidden = true; }, 9000);
        } else throw new Error(json.message || 'Something went wrong');
      } catch (ex) {
        err.textContent = 'Oops! We couldn’t send your message. Please try again, or email info@orbixsolutions.net.';
      } finally {
        form.classList.remove('is-sending'); btnText.textContent = 'Send message';
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Nova: website chatbot                                               */
  /* ------------------------------------------------------------------ */
  var CFG = window.AC_CONFIG || {};
  var WA_NUM = (CFG.whatsapp || '923374672612').replace(/\D/g, '');
  function waLink(text) { return 'https://wa.me/' + WA_NUM + (text ? '?text=' + encodeURIComponent(text) : ''); }
  function esc(t) { return String(t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  var KB = [
    { id: 'greet', k: ['hi', 'hello', 'hey', 'salam', 'assalam', 'hola', 'ola', 'good morning', 'good evening', 'yo'],
      a: 'Hi! I’m Nova, Orbix Solutions’ AI assistant. I can tell you about our AI agents, websites and apps, show you our work, or get you a quote. What are you working on?',
      q: ['Your services', 'See your work', 'Get a quote', 'Talk to a human'] },
    { id: 'services', k: ['services', 'service', 'what do you do', 'what you do', 'offer', 'help me with', 'what can you build', 'capabilities', 'solutions'],
      a: 'We’re an AI-first studio. Our main services:<ul><li><b>AI chatbots</b> for your website, WhatsApp and Instagram</li><li><b>AI voice agents</b> that answer and make calls</li><li><b>Workflow automation</b> with n8n and Make</li><li><b>Websites</b>: design and development</li><li><b>Web &amp; mobile apps</b>: SaaS, dashboards, PWAs, iOS/Android</li><li><b>WordPress &amp; e-commerce</b>, UI/UX design and custom AI apps</li></ul>Which one interests you?',
      q: ['AI chatbots', 'Voice agents', 'Websites', 'Mobile apps'] },
    { id: 'chatbot', k: ['chatbot', 'chat bot', 'chatbots', 'bot', 'assistant', 'whatsapp bot', 'customer support', 'live chat', 'faq', 'instagram', 'messenger', 'gpt', 'chatgpt'],
      a: 'We build AI chatbots like me, trained on <b>your</b> services, prices and FAQs. They answer customers 24/7 on your website, WhatsApp or Instagram, book appointments, capture leads into your CRM and hand over to a human when needed. Most chatbots go live in 1–3 weeks.',
      q: ['How much does it cost?', 'Voice agents', 'Get a quote'] },
    { id: 'voice', k: ['voice', 'call', 'calls', 'phone', 'receptionist', 'calling', 'cold call', 'outbound', 'inbound', 'telephone', 'vapi', 'speak'],
      a: 'Our AI voice agents sound natural and work around the clock. <b>Inbound:</b> answer every call, answer questions and book into your calendar. <b>Outbound:</b> call leads, handle objections and set meetings. Every call is recorded, summarised and logged. Want to hear one? Tap <b>Talk to our AI</b> to speak with our voice agent right now.',
      q: ['Talk to the voice AI', 'Get a quote', 'Your services'] },
    { id: 'automation', k: ['automation', 'automate', 'automations', 'n8n', 'zapier', 'make.com', 'workflow', 'workflows', 'integrate', 'integration', 'crm', 'hubspot', 'google sheets', 'repetitive', 'manual work'],
      a: 'We automate the repetitive work: new leads scored and answered in under a minute, invoices processed, CRMs updated, reports sent, Slack and email alerts. We build with n8n, Make and custom code, and add AI where decisions are needed.',
      q: ['See examples', 'Get a quote', 'AI chatbots'] },
    { id: 'docs', k: ['pdf', 'document', 'documents', 'invoice', 'invoices', 'contract', 'knowledge base', 'rag', 'wiki', 'ocr', 'extract'],
      a: 'We build document AI: private assistants that answer from your PDFs and wikis (with the exact page as source), and tools that turn invoices, contracts and forms into clean, checked data for your accounting or ERP. See DocChat and InvoiceIQ in our work.',
      q: ['See your work', 'Get a quote'] },
    { id: 'website', k: ['website', 'websites', 'web site', 'landing page', 'landing', 'site', 'redesign', 'web design', 'web development', 'webflow', 'portfolio site', 'homepage', 'business website'],
      a: 'Yes, we design and build websites: fast, animated, mobile-first sites and landing pages made to turn visitors into enquiries. Custom code or WordPress, with SEO basics, speed optimisation and analytics included. A marketing website usually takes 2–4 weeks. We can also add an AI chatbot so it answers visitors 24/7.',
      q: ['Website examples', 'How much does it cost?', 'Get a quote'] },
    { id: 'apps', k: ['app', 'apps', 'mobile', 'ios', 'android', 'react native', 'pwa', 'saas', 'dashboard', 'web app', 'webapp', 'mvp', 'platform', 'portal', 'software', 'application'],
      a: 'We build web and mobile apps: SaaS platforms, dashboards, client portals, PWAs and React Native apps for iOS and Android, from MVP to scale. Typical apps take 6–12 weeks depending on features. Tell me about your idea and I’ll get you a quote.',
      q: ['Get a quote', 'See your work', 'Tech stack'] },
    { id: 'wordpress', k: ['wordpress', 'woocommerce', 'shopify', 'ecommerce', 'e-commerce', 'online store', 'shop', 'store', 'plugin', 'elementor', 'theme', 'wix'],
      a: 'We do a lot of WordPress: custom themes and plugins, Elementor builds, WooCommerce and Shopify stores, speed fixes and REST API integrations. We also rescue and maintain existing sites.',
      q: ['Website examples', 'Get a quote'] },
    { id: 'uiux', k: ['design', 'designer', 'figma', 'ui', 'ux', 'ui/ux', 'prototype', 'mockup', 'branding'],
      a: 'We design interfaces in Figma (websites, apps and dashboards), you approve them, then we build them pixel-perfect. Design and development under one roof means nothing gets lost in handover.',
      q: ['Websites', 'Mobile apps', 'Get a quote'] },
    { id: 'seo', k: ['seo', 'google', 'ranking', 'rank', 'marketing', 'ads', 'traffic', 'speed', 'pagespeed', 'slow'],
      a: 'Every site we build includes technical SEO, fast loading and analytics setup. We can also speed up and fix an existing site, and support ongoing SEO on request.',
      q: ['Websites', 'Get a quote'] },
    { id: 'price', k: ['price', 'pricing', 'cost', 'costs', 'how much', 'budget', 'rate', 'rates', 'expensive', 'cheap', 'charge', 'fee', 'fees', 'package', 'packages', 'hourly'],
      a: 'Every project gets a <b>fixed quote in writing</b> after a free discovery call, so there are no surprises. The price depends on scope: a landing page, a full website, an AI chatbot, a voice agent or an app are very different jobs. AI running costs are usually a few cents per conversation. Want me to get you a quote? It takes 30 seconds.',
      q: ['Get a quote', 'Talk to a human'] },
    { id: 'time', k: ['how long', 'timeline', 'deadline', 'weeks', 'turnaround', 'when can', 'how fast', 'urgent', 'asap', 'delivery'],
      a: 'Typical timelines: AI chatbot or voice agent <b>1–3 weeks</b>, marketing website <b>2–4 weeks</b>, web or mobile app <b>6–12 weeks</b>. You get a clear timeline before we start, and weekly progress you can click through.',
      q: ['Get a quote', 'Our process'] },
    { id: 'process', k: ['process', 'how do you work', 'how does it work', 'steps', 'workflow with you', 'start', 'get started', 'onboarding', 'our process'],
      a: '<ol><li><b>Free discovery call</b> (30 min) about your goals</li><li><b>Design &amp; prototype</b>: Figma designs or a working AI agent you can test</li><li><b>Build &amp; integrate</b> with your tools</li><li><b>Launch &amp; grow</b> with optional care plans</li></ol>You approve each step before we move on.',
      q: ['Get a quote', 'How long does it take?'] },
    { id: 'work', k: ['portfolio', 'projects', 'project', 'examples', 'example', 'case study', 'case studies', 'work', 'clients', 'previous', 'past work', 'see your work', 'website examples', 'see examples', 'demo'],
      a: 'Some of our work: <b>Sarah</b> (AI sales caller), <b>Emma</b> (AI receptionist), <b>DocChat</b> (chat with PDFs), <b>MagicListen</b> (AI-marked learning app), plus websites like <b>StartX Studio</b>, <b>Fynech</b>, <b>FIHF</b> and <b>Dubai Day Out</b>.',
      q: ['Show me the work', 'Get a quote'], go: '#work' },
    { id: 'tech', k: ['tech', 'stack', 'technology', 'technologies', 'framework', 'react', 'next.js', 'nextjs', 'laravel', 'python', 'node', 'nodejs', 'openai', 'claude', 'gemini', 'llm', 'model', 'models', 'mistral', 'langchain', 'php', 'tech stack'],
      a: 'Our stack: <b>AI</b>: OpenAI, Claude, Gemini, Mistral, LangChain, Vapi, n8n. <b>Web &amp; apps</b>: React, Next.js, Node.js, Laravel/PHP, Python, React Native, WordPress, Supabase and MySQL. We pick what fits your project and budget, and we’re not tied to one AI vendor.',
      q: ['Get a quote', 'Your services'] },
    { id: 'privacy', k: ['gdpr', 'privacy', 'data', 'secure', 'security', 'safe', 'hipaa', 'confidential', 'nda', 'compliance', 'ai act'],
      a: 'Privacy is built in: GDPR-ready data handling, data hosted in your region where available, access controls, and no training on your data. Our AI agents say they’re AI. We’re happy to sign an NDA before you share details.',
      q: ['Get a quote', 'Talk to a human'] },
    { id: 'support', k: ['maintenance', 'support', 'hosting', 'host', 'update', 'updates', 'care plan', 'after launch', 'maintain', 'fix', 'bug', 'broken'],
      a: 'After launch we offer care plans: hosting help, updates, backups, security, small changes and monthly AI tuning. We also take over and fix existing websites and apps.',
      q: ['Get a quote', 'Talk to a human'] },
    { id: 'location', k: ['where are you', 'located', 'location', 'based', 'country', 'office', 'timezone', 'time zone', 'address'],
      a: 'We’re based in Lahore, Pakistan, and work remotely with clients worldwide, across Europe, the Middle East and North America. We always overlap with your working hours for calls.',
      q: ['Talk to a human', 'Get a quote'] },
    { id: 'language', k: ['language', 'languages', 'spanish', 'portuguese', 'german', 'french', 'arabic', 'urdu', 'italian', 'dutch', 'multilingual', 'translate'],
      a: 'The AI agents we build can speak 30+ languages and switch mid-conversation. Our team works with you in English.',
      q: ['AI chatbots', 'Voice agents'] },
    { id: 'contact', k: ['contact', 'human', 'person', 'real person', 'someone', 'talk to a human', 'email', 'phone number', 'whatsapp', 'call you', 'reach', 'speak to', 'agent please', 'representative', 'sales'],
      a: function () { return 'Of course. You can reach our team on <a href="' + waLink('Hi Orbix Solutions, I’d like to talk about a project.') + '" target="_blank" rel="noopener">WhatsApp</a>, by email at <a href="mailto:' + (CFG.email || 'info@orbixsolutions.net') + '">' + (CFG.email || 'info@orbixsolutions.net') + '</a>, or I can take your details and someone will get back to you within one business day.'; },
      q: ['Open WhatsApp', 'Leave my details'] },
    { id: 'about', k: ['who are you', 'about', 'company', 'team', 'orbix', 'orbix solutions', 'orbixel', 'who is behind', 'experience', 'years'],
      a: 'Orbix Solutions is an AI-first digital studio. We started building websites and apps, and today we combine that with AI agents, voice AI and automation, so one team can take you from idea to launch.',
      q: ['Your services', 'See your work'] },
    { id: 'bot', k: ['are you ai', 'are you a bot', 'are you human', 'are you real', 'robot', 'who made you', 'how do you work nova', 'nova'],
      a: 'I’m an AI assistant built by Orbix Solutions, the same kind of chatbot we build for clients. If you’d like one like me on your website, I can get you a quote.',
      q: ['Get a quote', 'AI chatbots'] },
    { id: 'thanks', k: ['thanks', 'thank you', 'thx', 'great', 'awesome', 'cool', 'perfect', 'nice', 'ok thanks'],
      a: 'You’re welcome! Anything else I can help with?', q: ['Get a quote', 'Your services'] },
    { id: 'bye', k: ['bye', 'goodbye', 'see you', 'later', 'cya'],
      a: 'Thanks for stopping by! If you think of anything, I’m here, or message us on WhatsApp.', q: ['Open WhatsApp'] }
  ];
  var QUICK_MAP = {
    'your services': 'services', 'see your work': 'work', 'show me the work': 'work', 'see examples': 'work', 'website examples': 'work',
    'ai chatbots': 'chatbot', 'voice agents': 'voice', 'websites': 'website', 'mobile apps': 'apps', 'tech stack': 'tech',
    'how much does it cost?': 'price', 'how long does it take?': 'time', 'our process': 'process'
  };

  function normalize(t) { return ' ' + String(t).toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9.+\/\s-]/g, ' ').replace(/\s+/g, ' ').trim() + ' '; }
  function matchIntent(text) {
    var t = normalize(text), best = null, bestScore = 0;
    KB.forEach(function (it) {
      var score = 0;
      it.k.forEach(function (kw) {
        var k = kw.toLowerCase();
        if (k.indexOf(' ') > -1) { if (t.indexOf(' ' + k + ' ') > -1 || t.indexOf(k) > -1) score += 3; }
        else if (t.indexOf(' ' + k + ' ') > -1) score += 2;
        else if (k.length >= 5 && t.indexOf(' ' + k) > -1) score += 1; // simple stem match
      });
      if (it.id === 'greet' && score && t.split(' ').length > 6) score -= 1; // "hi, I need an app" → not just a greeting
      if (score > bestScore) { bestScore = score; best = it; }
    });
    return bestScore > 0 ? best : null;
  }

  var bot = { open: false, started: false, lead: null, history: [], busy: false };
  function botMsg(html, who) {
    var body = $('#botBody'), m = document.createElement('div');
    m.className = 'bmsg bmsg--' + who; m.innerHTML = html; body.appendChild(m);
    body.scrollTop = body.scrollHeight;
    return m;
  }
  function botQuick(list) {
    var q = $('#botQuick'); q.innerHTML = '';
    (list || []).forEach(function (label) { var b = document.createElement('button'); b.type = 'button'; b.textContent = label; b.setAttribute('data-cursor', 'hover'); q.appendChild(b); });
  }
  function botTyping(ms) {
    var t = botMsg('<span class="typing"><i></i><i></i><i></i></span>', 'typing');
    return sleep(ms).then(function () { t.remove(); });
  }
  async function botReply(html, quick, delay) {
    bot.busy = true;
    await botTyping(delay || Math.min(1400, 450 + html.replace(/<[^>]+>/g, '').length * 6));
    botMsg(html, 'bot'); botQuick(quick);
    bot.history.push({ role: 'assistant', content: html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() });
    bot.busy = false;
  }

  function startLead(reason) {
    bot.lead = { step: 'name', data: {}, reason: reason || '' };
    botReply('Great, let’s get you a quote. What’s your name?', ['Cancel']);
  }
  async function leadStep(text) {
    var L = bot.lead;
    if (/^cancel$/i.test(text.trim())) { bot.lead = null; return botReply('No problem. What else can I help with?', ['Your services', 'See your work']); }
    if (L.step === 'name') { L.data.name = text.trim().slice(0, 80); L.step = 'email'; return botReply('Nice to meet you, ' + esc(L.data.name.split(' ')[0]) + '! What’s the best email to reach you?', ['Cancel']); }
    if (L.step === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.trim())) return botReply('Hmm, that doesn’t look like an email address. Could you check it?', ['Cancel']);
      L.data.email = text.trim(); L.step = 'need';
      return botReply('Thanks! In a sentence or two, what would you like us to build?', ['AI chatbot', 'Voice agent', 'Website', 'Mobile app', 'Automation']);
    }
    if (L.step === 'need') {
      L.data.message = text.trim().slice(0, 1500);
      bot.busy = true;
      await botTyping(700);
      var transcript = bot.history.slice(-12).map(function (h) { return (h.role === 'user' ? 'Visitor: ' : 'Nova: ') + h.content; }).join('\n');
      var payload = { name: L.data.name, email: L.data.email, company: '', service: 'Website chatbot (Nova)', message: L.data.message + (transcript ? '\n\n--- Chat transcript ---\n' + transcript : '') };
      var ok = false;
      try {
        var res = await fetch('/send-mail.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        var j = await res.json().catch(function () { return {}; });
        ok = res.ok && j.status === 'success';
      } catch (e) {}
      bot.lead = null; bot.busy = false;
      if (ok) botReply('Done ✅ Thanks, ' + esc(L.data.name.split(' ')[0]) + '! Our team will email you within one business day. If it’s urgent, you can also <a href="' + waLink('Hi! I just sent a project request through your website chat. My name is ' + L.data.name + '.') + '" target="_blank" rel="noopener">message us on WhatsApp</a>.', ['See your work', 'Talk to the voice AI'], 300);
      else botReply('Sorry, I couldn’t send that just now. Please <a href="' + waLink('Hi! My name is ' + L.data.name + ' (' + L.data.email + '). I’d like: ' + L.data.message) + '" target="_blank" rel="noopener">send it on WhatsApp</a> or email <a href="mailto:' + (CFG.email || 'info@orbixsolutions.net') + '">' + (CFG.email || 'info@orbixsolutions.net') + '</a>.', ['Open WhatsApp'], 300);
    }
  }

  async function aiAnswer(text) {
    // Optional: real AI answers through /chat-ai.php (set aiChat: true in AC_CONFIG)
    if (!CFG.aiChat) return null;
    try {
      var ctrl = new AbortController(); setTimeout(function () { ctrl.abort(); }, 15000);
      var res = await fetch('/chat-ai.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: bot.history.slice(-10) }), signal: ctrl.signal });
      if (!res.ok) return null;
      var j = await res.json();
      return j && j.reply ? esc(j.reply).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>') : null;
    } catch (e) { return null; }
  }

  async function botHandle(text) {
    text = String(text || '').trim();
    if (!text || bot.busy) return;
    botMsg(esc(text), 'user'); botQuick([]);
    bot.history.push({ role: 'user', content: text.slice(0, 500) });
    if (bot.lead) return leadStep(text);
    var low = text.toLowerCase();
    if (/^(talk to the voice ai|talk to our ai)$/.test(low)) { openVoice(); return botReply('Opening the voice line now. Allow your microphone and say hello!', ['Your services']); }
    if (/^(open whatsapp)$/.test(low)) { window.open(waLink('Hi Orbix Solutions, I’d like to talk about a project.'), '_blank', 'noopener'); return botReply('I’ve opened WhatsApp in a new tab. Our team will reply there.', ['Your services']); }
    if (/^(get a quote|leave my details|ai chatbot|voice agent|website|mobile app|automation)$/.test(low) && /quote|details/.test(low)) return startLead();
    if (/\b(quote|estimate|hire you|hire|book a call|book a meeting|schedule|proposal|start a project|lets talk|let’s talk)\b/.test(low)) return startLead();
    var mapped = QUICK_MAP[low];
    var it = mapped ? KB.filter(function (k) { return k.id === mapped; })[0] : matchIntent(text);
    if (it) {
      var ans = typeof it.a === 'function' ? it.a() : it.a;
      if (it.go) { var target = $(it.go); if (target && /show me/.test(low)) { closeBot(); scrollToTarget(target); } }
      return botReply(ans, it.q);
    }
    bot.busy = true;
    var ai = await aiAnswer(text);
    bot.busy = false;
    if (ai) return botReply(ai, ['Get a quote', 'Talk to a human'], 200);
    botReply('Good question. I’m not 100% sure, so I don’t want to guess. Our team can answer that properly: <a href="' + waLink('Hi! Question from your website: ' + text) + '" target="_blank" rel="noopener">ask on WhatsApp</a>, or leave your details and we’ll get back to you.', ['Leave my details', 'Your services']);
  }

  function openBot() {
    var el = $('#bot'); bot.open = true;
    el.classList.add('is-open'); el.setAttribute('aria-hidden', 'false');
    $('#dockChat').classList.add('is-open'); $('#dockChat').setAttribute('aria-expanded', 'true');
    var badge = $('.dock__badge'); if (badge) badge.remove();
    if (!bot.started) { bot.started = true; botReply(KB[0].a, KB[0].q, 600); }
    if (fine) setTimeout(function () { $('#botText').focus(); }, 300);
  }
  function closeBot() {
    var el = $('#bot'); bot.open = false;
    el.classList.remove('is-open'); el.setAttribute('aria-hidden', 'true');
    $('#dockChat').classList.remove('is-open'); $('#dockChat').setAttribute('aria-expanded', 'false');
  }
  function initBot() {
    $$('.wa-link').forEach(function (a) { a.href = waLink(a.getAttribute('data-wa-text') || 'Hi Orbix Solutions, I’d like to talk about a project.'); });
    $('#dockChat').addEventListener('click', function () { bot.open ? closeBot() : openBot(); });
    $('#botClose').addEventListener('click', closeBot);
    $('#botForm').addEventListener('submit', function (e) { e.preventDefault(); var i = $('#botText'); botHandle(i.value); i.value = ''; });
    $('#botQuick').addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) botHandle(b.textContent); });
    $$('[data-open-chat]').forEach(function (b) { b.addEventListener('click', function (e) { e.preventDefault(); openBot(); }); });
    // Gentle nudge after 12 s
    setTimeout(function () { if (!bot.open && !bot.started) { var n = $('.dock__nudge'); if (n) n.classList.add('is-on'); } }, 12000);
    var nudge = $('.dock__nudge'); if (nudge) nudge.addEventListener('click', function () { nudge.classList.remove('is-on'); openBot(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && bot.open) closeBot(); });
  }

  /* ------------------------------------------------------------------ */
  /* Live voice agent (Vapi web call)                                    */
  /* ------------------------------------------------------------------ */
  var vapi = null, vState = 'idle', vTimer = null, vSecs = 0, vPartial = null;
  function voiceReady() { return CFG.vapiPublicKey && CFG.vapiAssistantId && CFG.vapiPublicKey.indexOf('PASTE_') !== 0 && CFG.vapiAssistantId.indexOf('PASTE_') !== 0; }
  function vSet(state, msg) {
    vState = state;
    var box = $('#vcall'); box.dataset.state = state;
    if (msg) $('#vStatus').innerHTML = msg;
    $('#vStart span').textContent = state === 'live' ? 'End call' : state === 'connecting' ? 'Connecting…' : 'Start call';
    $('#vMute').hidden = state !== 'live';
    $('#vOrb').classList.toggle('is-talking', state === 'live');
  }
  function openVoice() {
    var m = $('#vcall'); m.classList.add('is-open'); m.setAttribute('aria-hidden', 'false');
    if (lenis) lenis.stop();
    if (!voiceReady()) {
      vSet('off', 'Our live voice line is being set up right now. Meanwhile you can <b>hear a recorded call</b> in the Live demo, or message us on WhatsApp.');
      $('#vOff').hidden = false; $('#vStart').hidden = true;
    } else if (vState === 'idle' || vState === 'off') { $('#vOff').hidden = true; $('#vStart').hidden = false; vSet('idle', 'Tap <b>Start call</b> and allow your microphone. Ask Nova anything about our services.'); }
    setTimeout(function () { $('.vcall__box .modal__x').focus(); }, 60);
  }
  function closeVoice() {
    if (vState === 'live' || vState === 'connecting') endVoice();
    var m = $('#vcall'); m.classList.remove('is-open'); m.setAttribute('aria-hidden', 'true');
    if (lenis && !$('#modal').classList.contains('is-open')) lenis.start();
  }
  function loadVapi() {
    return new Promise(function (resolve, reject) {
      if (typeof window.Vapi === 'function') return resolve();
      var s = document.createElement('script'); s.src = '/assets/vapi-sdk.js?v=1'; s.onload = resolve; s.onerror = reject; document.head.appendChild(s);
    });
  }
  function vLog(role, text, partial) {
    var log = $('#vLog');
    if (vPartial && vPartial.dataset.role === role) { vPartial.querySelector('p').textContent = text; if (!partial) vPartial = null; log.scrollTop = log.scrollHeight; return; }
    var el = document.createElement('div'); el.className = 'tl' + (role === 'user' ? ' u' : ''); el.dataset.role = role;
    el.innerHTML = '<b>' + (role === 'user' ? 'You' : 'Nova') + '</b><p></p>'; el.querySelector('p').textContent = text;
    log.appendChild(el); log.scrollTop = log.scrollHeight;
    vPartial = partial ? el : null;
  }
  function vWave(level) { $$('#vWave i').forEach(function (b, i) { b.style.height = (8 + level * 90 * (0.4 + 0.6 * Math.abs(Math.sin(i * 0.5 + Date.now() / 200)))) + '%'; }); }
  async function startVoice() {
    try {
      vSet('connecting', 'Connecting… allow microphone access if your browser asks.');
      await loadVapi();
      if (!vapi) {
        vapi = new window.Vapi(CFG.vapiPublicKey);
        vapi.on('call-start', function () { vSet('live', 'You’re live with <b>Nova</b>. Just talk naturally.'); vSecs = 0; clearInterval(vTimer); vTimer = setInterval(function () { vSecs++; $('#vTime').textContent = String(Math.floor(vSecs / 60)).padStart(2, '0') + ':' + String(vSecs % 60).padStart(2, '0'); }, 1000); });
        vapi.on('call-end', function () { clearInterval(vTimer); vWave(0); vSet('idle', 'Call ended. Thanks for talking to Nova! Want a quote? Use the chat or the contact form.'); });
        vapi.on('speech-start', function () { $('#vOrb').classList.add('is-speaking'); });
        vapi.on('speech-end', function () { $('#vOrb').classList.remove('is-speaking'); });
        vapi.on('volume-level', function (v) { if (vState === 'live') vWave(Math.min(1, Number(v) || 0)); });
        vapi.on('message', function (m) { if (m && m.type === 'transcript') vLog(m.role, m.transcript, m.transcriptType === 'partial'); });
        vapi.on('error', function (e) { console.warn('Voice error', e); clearInterval(vTimer); vSet('idle', 'Sorry, the call couldn’t connect. Check your microphone permission and try again, or message us on WhatsApp.'); });
      }
      $('#vLog').innerHTML = '';
      await vapi.start(CFG.vapiAssistantId, { maxDurationSeconds: 300 });
    } catch (e) {
      console.warn(e);
      vSet('idle', 'Sorry, the call couldn’t start. Please allow microphone access and try again.');
    }
  }
  function endVoice() { try { if (vapi) vapi.stop(); } catch (e) {} clearInterval(vTimer); vSet('idle'); }
  function initVoiceAgent() {
    var w = $('#vWave'); for (var i = 0; i < 32; i++) w.appendChild(document.createElement('i'));
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-voice]');
      if (t) { e.preventDefault(); closeMenu(); openVoice(); return; }
      if (e.target.closest('[data-vclose]')) closeVoice();
    });
    $('#vStart').addEventListener('click', function () { if (vState === 'live' || vState === 'connecting') endVoice(); else startVoice(); });
    $('#vMute').addEventListener('click', function () { if (!vapi) return; var m = !vapi.isMuted(); vapi.setMuted(m); $('#vMute span').textContent = m ? 'Unmute' : 'Mute'; });
    $('#vDemo').addEventListener('click', function () {
      closeVoice();
      var tab = $('.demo__tab[data-tab="voice"]'); if (tab) tab.click();
      scrollToTarget($('#demo'));
      setTimeout(function () { var p = $('#voicePlay'); if (p && !voicePlaying) p.click(); }, 1500);
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && $('#vcall').classList.contains('is-open')) closeVoice(); });
  }

  /* ------------------------------------------------------------------ */
  /* Loader & boot                                                       */
  /* ------------------------------------------------------------------ */
  function runLoader() {
    return new Promise(function (resolve) {
      var loader = $('#loader'), num = $('#loaderNum'), bar = $('#loaderBar');
      if (!loader) return resolve();
      try { if (sessionStorage.getItem('ox-seen')) { loader.remove(); return resolve(); } sessionStorage.setItem('ox-seen', '1'); } catch (e) {}
      if (!hasGsap || reduce) { loader.remove(); return resolve(); }
      var o = { v: 0 }, loaded = document.readyState === 'complete';
      window.addEventListener('load', function () { loaded = true; });
      gsap.to(o, { v: 100, duration: 1.7, ease: 'power2.inOut',
        onUpdate: function () { num.textContent = String(Math.round(o.v)).padStart(3, '0'); bar.style.transform = 'scaleX(' + o.v / 100 + ')'; },
        onComplete: function () {
          var wait = loaded ? 0 : 600;
          setTimeout(function () {
            gsap.to(loader, { yPercent: -100, duration: 1.1, ease: 'expo.inOut', onComplete: function () { loader.remove(); } });
            setTimeout(resolve, 450);
          }, wait);
        } });
    });
  }

  function boot() {
    var y = $('#year'); if (y) y.textContent = new Date().getFullYear();
    renderWork();
    initScroll();
    initNav();
    initCursor();
    initScramble();
    initOrb();
    initCards();
    initFaq();
    initDemo();
    initModal();
    initForm();
    initBot();
    initVoiceAgent();
    if (!hasGsap || reduce) {
      document.documentElement.classList.remove('js');
      $$('.split-words .w').forEach(function (w) { w.style.opacity = 1; });
      var l = $('#loader'); if (l) l.remove();
      deepLink();
      return;
    }
    initReveals();
    initWork();
    initMagnetic();
    runLoader().then(function () { heroIntro(); deepLink(); refreshST(); });
    window.addEventListener('load', refreshST);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
