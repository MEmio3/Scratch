(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const B = (s, cat, t, o) => Object.assign({ s, cat, t }, o || {});
  const SV = (l, k, c, a) => SB.svg(l, k, c, a);
  const bn = n => String(n).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]);
  const CUR = '<svg viewBox="0 0 24 30" width="22" height="28"><path d="M3 2v22l5.5-5.2 3.6 8.3 3.6-1.6-3.6-8.1H20z" fill="#fff" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  const CAT = 'img/cat.png';
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches || /still/.test(location.search);
  let INSTANT = false, T = [], SCALE = 1;
  const at = (t, f) => T.push(setTimeout(f, t));
  const every = (ms, f) => T.push(setInterval(f, ms));
  function el(tag, cls, html) { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function put(e, x, y, w, h) { e.style.left = x + 'px'; e.style.top = y + 'px'; if (w != null) e.style.width = w + 'px'; if (h != null) e.style.height = h + 'px'; return e; }
  const on = (e, b) => { e.classList.toggle('on', !!b); return e; };

  /* ---------- extra styles for demos ---------- */
  document.head.appendChild(el('style', null, `
  .pace{animation:pace 5s linear infinite}
  @keyframes pace{0%{transform:translateX(-180px)}48%{transform:translateX(190px)}50%{transform:translateX(190px) scaleX(-1)}98%{transform:translateX(-180px) scaleX(-1)}100%{transform:translateX(-180px)}}
  .grid{box-sizing:border-box;opacity:0;transition:opacity .8s;background:linear-gradient(#4C97FF,#4C97FF) 240px 0/2px 100% no-repeat,linear-gradient(#4C97FF,#4C97FF) 0 179px/100% 2px no-repeat,repeating-linear-gradient(90deg,rgba(0,0,0,.09) 0 1px,transparent 1px 40px),repeating-linear-gradient(rgba(0,0,0,.09) 0 1px,transparent 1px 40px) 0 20px}
  .grid.on{opacity:1}
  .grid span{position:absolute;font:700 13px "Helvetica Neue",Helvetica,Arial,sans-serif;color:#2F6FD6;background:rgba(255,255,255,.9);padding:1px 5px;border-radius:4px}
  .gd{opacity:0;transition:all 1.2s cubic-bezier(.6,0,.3,1)} .gd.on{opacity:1}
  .mv12{transition:left 1.2s cubic-bezier(.6,0,.3,1),top 1.2s cubic-bezier(.6,0,.3,1)}
  .recol{opacity:0;transition:opacity .5s;filter:hue-rotate(190deg) saturate(1.15);-webkit-mask:url(img/cat.png) 0 0/100% 100% no-repeat;mask:url(img/cat.png) 0 0/100% 100% no-repeat}
  .recol.on{opacity:1}
  .picker{z-index:32;width:250px;box-sizing:border-box;background:#fff;border:1px solid #D9D9D9;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,.18);padding:12px 14px;font:600 12px "Helvetica Neue",Helvetica,Arial,sans-serif;color:#575E75;opacity:0;transform:translateY(-6px);transition:opacity .25s,transform .25s}
  .picker.on{opacity:1;transform:none}
  .picker .r{margin:2px 0 10px}.picker .r div{position:relative;height:20px;border-radius:10px;margin-top:5px}
  .picker .k{position:absolute;top:-2px;width:20px;height:20px;border-radius:50%;background:#fff;border:2px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.3);transition:left 1s cubic-bezier(.5,0,.3,1),background 1s}
  .tool{box-sizing:border-box;width:40px;height:40px;border-radius:5px;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .25s}
  .tool.on{opacity:1}
  .demo .scr2{position:absolute;inset:0}
  #mk-game{background:linear-gradient(#9BD8FF,#DDF3FF)}
  #mk-game .gr{position:absolute;left:0;top:252px;width:390px;height:52px;background:repeating-linear-gradient(90deg,#5DB84A 0 30px,#4FA83E 30px 60px);border-top:4px solid #3E8E2F;animation:scroll 1s linear infinite}
  @keyframes scroll{to{background-position:-60px 0}}
  #mk-game .cat{position:absolute;left:52px;top:178px;width:72px;animation:jp 2s infinite}
  @keyframes jp{0%,48%{transform:translateY(0);animation-timing-function:ease-out}64%{transform:translateY(-118px) rotate(-8deg);animation-timing-function:ease-in}80%,100%{transform:translateY(0)}}
  #mk-game .ob{position:absolute;top:210px;left:400px;width:34px;height:44px;background:#2DA44E;border:3px solid #1E7A37;border-radius:6px 6px 0 0;animation:mv 2s linear infinite}
  #mk-game .coin{position:absolute;left:400px;top:92px;width:26px;height:26px;border-radius:50%;background:#FFD43B;border:3px solid #E6A700;animation:mv 2s linear infinite}
  #mk-game .cl{position:absolute;top:40px;left:390px;width:74px;height:24px;border-radius:14px;background:#fff;opacity:.9;animation:mv 6s linear infinite}
  @keyframes mv{to{transform:translateX(-480px)}}
  #mk-art{background:#fff;box-shadow:inset 0 0 0 2px #E3DDF7}
  #mk-art .pen{position:absolute;left:0;top:0;width:34px;offset-path:path('M215 250 C80 168 92 60 215 120 C338 60 350 168 215 250');offset-rotate:0deg;offset-anchor:3px 30px;animation:pp 6s ease-in-out infinite}
  #mk-art .ln{stroke-dasharray:900;stroke-dashoffset:900;animation:dr 6s ease-in-out infinite}
  @keyframes dr{0%{stroke-dashoffset:900;opacity:1}55%,85%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:0;opacity:0}}
  @keyframes pp{0%{offset-distance:0%;opacity:1}55%,85%{offset-distance:100%;opacity:1}100%{offset-distance:100%;opacity:0}}
  #mk-story{animation:sky 8s infinite}
  @keyframes sky{0%,45%{background:linear-gradient(#9BD8FF 0 70%,#7CC96A 70%)}55%,95%{background:linear-gradient(#1B1F4A 0 70%,#2F5A3A 70%)}100%{background:linear-gradient(#9BD8FF 0 70%,#7CC96A 70%)}}
  #mk-story .sun{position:absolute;right:30px;top:24px;width:46px;height:46px;border-radius:50%;animation:sun 8s infinite}
  @keyframes sun{0%,45%{background:#FFE066;box-shadow:0 0 22px #FFE066}55%,95%{background:#F4F1FF;box-shadow:0 0 14px #fff}100%{background:#FFE066}}
  #mk-story .b1{animation:b1 8s infinite}#mk-story .b2{animation:b2 8s infinite}
  @keyframes b1{0%,5%{opacity:0;transform:scale(.4)}10%,35%{opacity:1;transform:none}40%,100%{opacity:0}}
  @keyframes b2{0%,22%{opacity:0;transform:scale(.4)}27%,48%{opacity:1;transform:none}53%,100%{opacity:0}}
  #mk-sim{background:linear-gradient(#F5F9FF,#E3EEFF)}
  #mk-sim .ball{position:absolute;left:180px;top:20px;width:46px;height:46px;border-radius:50%;background:conic-gradient(#FF6680 0 25%,#FFBF00 0 50%,#4C97FF 0 75%,#59C059 0);border:3px solid #fff;box-shadow:0 0 0 2px #575E75;transform-origin:50% 100%;animation:bo 4s infinite}
  @keyframes bo{0%{top:20px;animation-timing-function:ease-in}24%{top:208px;transform:scale(1.15,.8);animation-timing-function:ease-out}40%{top:90px;transform:none;animation-timing-function:ease-in}55%{top:208px;transform:scale(1.1,.85);animation-timing-function:ease-out}66%{top:146px;transform:none;animation-timing-function:ease-in}76%{top:208px;transform:scale(1.05,.92);animation-timing-function:ease-out}83%{top:184px;transform:none;animation-timing-function:ease-in}90%,100%{top:208px}}
  #mk-sim .sh{position:absolute;left:182px;top:256px;width:44px;height:10px;border-radius:50%;background:rgba(0,0,0,.18);animation:sh 4s infinite}
  @keyframes sh{0%{transform:scale(.3)}24%,55%,76%,100%{transform:scale(1)}40%{transform:scale(.6)}66%{transform:scale(.8)}}
  `));

  /* ---------- screenshot viewer ---------- */
  function Shot(host, base, alts) {
    const W = 1362, H = 646;
    host.classList.add('shot');
    host.innerHTML = `<div class="cam"><img class="scr" src="${base}" alt="স্ক্র্যাচ এডিটরের স্ক্রিনশট">${(alts || []).map((a, i) => `<img class="scr alt" data-i="${i}" src="${a}" alt="">`).join('')}<div class="ov"></div><div class="hl"></div><div class="cur">${CUR}</div></div>`;
    const cam = host.firstChild, ov = $('.ov', cam), cur = $('.cur', cam), hl = $('.hl', cam);
    const o = {
      host, cam, ov, W, H,
      zoom(r, p) {
        let z = 1, tx = 0, ty = 0;
        if (r) {
          z = Math.min(W / r[2], H / r[3]) * (p || 0.92);
          tx = W / 2 - (r[0] + r[2] / 2) * z; ty = H / 2 - (r[1] + r[3] / 2) * z;
          tx = Math.min(0, Math.max(W - W * z, tx)); ty = Math.min(0, Math.max(H - H * z, ty));
        }
        cam.style.transform = `scale(${host.clientWidth / W}) translate(${tx}px,${ty}px) scale(${z})`;
        cam.style.setProperty('--iz', 1 / z);
      },
      mv(x, y) { cur.style.left = x + 'px'; cur.style.top = y + 'px'; },
      ck(x, y) {
        if (INSTANT) return;
        const d = el('div', 'rp'); put(d, x, y); cam.appendChild(d); setTimeout(() => d.remove(), 700);
        cur.classList.remove('press'); void cur.offsetWidth; cur.classList.add('press');
      },
      hl(r) { if (!r) { hl.classList.remove('on'); return; } put(hl, r[0], r[1], r[2], r[3]); hl.classList.add('on'); },
      tag(id, x, y, html, col) {
        let t = $(`[data-t="${id}"]`, ov);
        if (!t) { t = el('div', 'tag'); t.dataset.t = id; ov.appendChild(t); }
        put(t, x, y); if (col) t.style.setProperty('--tc', col); t.innerHTML = html;
        void t.offsetWidth; t.classList.add('on');
      },
      alt(i) { $$('.alt', cam).forEach(a => a.classList.toggle('on', +a.dataset.i === i)); },
      cursor(v) { cur.style.opacity = v ? 1 : 0; },
      add(cls, x, y, w, h, html) { const e = el('div', cls, html); put(e, x, y, w, h); ov.appendChild(e); return e; },
      reset() { o.zoom(); o.hl(); $$('.tag', ov).forEach(t => t.classList.remove('on')); o.alt(-1); o.mv(700, 560); o.cursor(1); }
    };
    o.zoom();
    return o;
  }

  /* ---------- category data ---------- */
  const CATS = [
    { id: 'motion', en: 'Motion', bn: 'মোশন', dark: '#2F6FD6', short: 'নড়াচড়া, ঘোরা ও অবস্থান',
      desc: 'স্প্রাইটকে নড়াচড়া করানো, ঘোরানো আর স্টেজের নির্দিষ্ট জায়গায় পাঠানোর ব্লক।',
      pal: [['stack', 'move (10) steps'], ['stack', 'turn @cw (15) degrees'], ['stack', 'turn @ccw (15) degrees'], ['stack', 'go to [random position]'], ['stack', 'go to x: (0) y: (0)'], ['stack', 'glide (1) secs to [random position]'], ['stack', 'glide (1) secs to x: (0) y: (0)'], ['stack', 'point in direction (90)'], ['stack', 'point towards [mouse-pointer]'], ['stack', 'change x by (10)']],
      rows: [['stack', 'move (10) steps', 'সামনের দিকে ১০ ধাপ এগিয়ে যায়'], ['stack', 'turn @cw (15) degrees', 'ডান দিকে ১৫ ডিগ্রি ঘোরে'], ['stack', 'go to x: (0) y: (0)', 'স্টেজের নির্দিষ্ট জায়গায় চলে যায়'], ['stack', 'if on edge, bounce', 'কিনারায় লাগলে ধাক্কা খেয়ে ফিরে আসে']],
      ex: ['stack', 'move (10) steps'] },
    { id: 'looks', en: 'Looks', bn: 'লুকস', dark: '#7044D6', short: 'চেহারা, কথা বলা ও কস্টিউম',
      desc: 'স্প্রাইটের চেহারা, কথা বলা, কস্টিউম আর ইফেক্ট বদলানোর ব্লক।',
      pal: [['stack', 'say (Hello!) for (2) seconds'], ['stack', 'say (Hello!)'], ['stack', 'think (Hmm...) for (2) seconds'], ['stack', 'think (Hmm...)'], ['stack', 'switch costume to [costume2]'], ['stack', 'next costume'], ['stack', 'switch backdrop to [backdrop1]'], ['stack', 'next backdrop'], ['stack', 'change size by (10)'], ['stack', 'set size to (100) %']],
      rows: [['stack', 'say (Hello!) for (2) seconds', '২ সেকেন্ড কথার বেলুনে লেখা দেখায়'], ['stack', 'next costume', 'পরের কস্টিউমে যায় — অ্যানিমেশনের চাবি'], ['stack', 'switch backdrop to [backdrop1]', 'স্টেজের ব্যাকগ্রাউন্ড বদলায়'], ['stack', 'change size by (10)', 'স্প্রাইটকে বড় বা ছোট করে']],
      ex: ['stack', 'say (Hello!)'] },
    { id: 'sound', en: 'Sound', bn: 'সাউন্ড', dark: '#A83FA8', short: 'শব্দ বাজানো ও ভলিউম',
      desc: 'শব্দ বাজানো, থামানো আর ভলিউম ও সাউন্ড ইফেক্ট নিয়ন্ত্রণের ব্লক।',
      pal: [['stack', 'play sound [Meow] until done'], ['stack', 'start sound [Meow]'], ['stack', 'stop all sounds'], ['stack', 'change [pitch] effect by (10)'], ['stack', 'set [pitch] effect to (100)'], ['stack', 'clear sound effects'], ['stack', 'change volume by (-10)'], ['stack', 'set volume to (100) %'], ['rep', 'volume', { chk: 1 }]],
      rows: [['stack', 'play sound [Meow] until done', 'শব্দ শেষ না হওয়া পর্যন্ত বাজায়'], ['stack', 'start sound [Meow]', 'শব্দ শুরু করেই পরের কাজে যায়'], ['stack', 'stop all sounds', 'সব শব্দ একসাথে বন্ধ করে'], ['stack', 'change volume by (-10)', 'আওয়াজ কমায় বা বাড়ায়']],
      ex: ['stack', 'play sound [Meow] until done'] },
    { id: 'events', en: 'Events', bn: 'ইভেন্টস', dark: '#8F6800', short: 'কখন কোড শুরু হবে',
      desc: 'কখন কোড চালু হবে তা ঠিক করে — প্রায় প্রতিটি স্ক্রিপ্ট এই “হ্যাট” ব্লক দিয়েই শুরু হয়।',
      pal: [['hat', 'when @flag clicked'], ['hat', 'when [space] key pressed'], ['hat', 'when this sprite clicked'], ['hat', 'when backdrop switches to [backdrop1]'], ['hat', 'when [loudness] > (10)'], ['hat', 'when I receive [message1]'], ['stack', 'broadcast [message1]'], ['stack', 'broadcast [message1] and wait']],
      rows: [['hat', 'when @flag clicked', 'সবুজ পতাকায় ক্লিক করলে শুরু'], ['hat', 'when [space] key pressed', 'কীবোর্ডের বোতাম চাপলে শুরু'], ['hat', 'when this sprite clicked', 'স্প্রাইটে ক্লিক করলে শুরু'], ['stack', 'broadcast [message1]', 'অন্য স্প্রাইটকে বার্তা পাঠায়']],
      ex: ['hat', 'when @flag clicked'] },
    { id: 'control', en: 'Control', bn: 'কন্ট্রোল', dark: '#A35F00', short: 'লুপ, অপেক্ষা, if / else',
      desc: 'লুপ, অপেক্ষা আর শর্ত (if / else) — প্রোগ্রাম কোন পথে চলবে তা নিয়ন্ত্রণ করে।',
      pal: [['stack', 'wait (1) seconds'], ['c', 'repeat (10)'], ['cf', 'forever'], ['c', 'if <> then'], ['ce', 'if <> then'], ['stack', 'wait until <>'], ['cap', 'stop [all]']],
      rows: [['stack', 'wait (1) seconds', '১ সেকেন্ড থেমে থাকে'], ['c', 'repeat (10)', 'ভেতরের ব্লক ১০ বার চালায় — লুপ'], ['cf', 'forever', 'থামানো না পর্যন্ত বারবার চালায়'], ['c', 'if <> then', 'শর্ত সত্য হলে তবেই ভেতরের কাজ করে']],
      ex: ['c', 'repeat (10)'] },
    { id: 'sensing', en: 'Sensing', bn: 'সেন্সিং', dark: '#23799E', short: 'ছোঁয়া, মাউস ও কীবোর্ড বোঝা',
      desc: 'স্প্রাইট কী ছুঁয়েছে, মাউস কোথায়, কোন বোতাম চাপা হলো — চারপাশের খবর জানায়।',
      pal: [['bool', 'touching [mouse-pointer] ?'], ['bool', 'touching color {#E6409A} ?'], ['rep', 'distance to [mouse-pointer]'], ['stack', 'ask (What’s your name?) and wait'], ['rep', 'answer', { chk: 1 }], ['bool', 'key [space] pressed?'], ['bool', 'mouse down?'], ['rep', 'mouse x'], ['rep', 'timer', { chk: 1 }], ['stack', 'reset timer']],
      rows: [['bool', 'touching [mouse-pointer] ?', 'কিছু ছুঁয়েছে কি না — সত্য / মিথ্যা'], ['stack', 'ask (What’s your name?) and wait', 'প্রশ্ন করে উত্তরের অপেক্ষা করে'], ['bool', 'key [space] pressed?', 'নির্দিষ্ট বোতাম চাপা আছে কি না'], ['rep', 'mouse x', 'মাউসের X অবস্থান — একটি সংখ্যা']],
      ex: ['bool', 'touching [mouse-pointer] ?'] },
    { id: 'operators', en: 'Operators', bn: 'অপারেটরস', dark: '#2E7D32', short: 'গণিত, তুলনা ও যুক্তি',
      desc: 'যোগ-বিয়োগ, তুলনা, র‍্যান্ডম সংখ্যা আর and / or / not — গণিত ও যুক্তির ব্লক।',
      pal: [['rep', '( ) + ( )'], ['rep', '( ) - ( )'], ['rep', '( ) * ( )'], ['rep', '( ) / ( )'], ['rep', 'pick random (1) to (10)'], ['bool', '( ) > (50)'], ['bool', '( ) < (50)'], ['bool', '( ) = (50)'], ['bool', '<> and <>'], ['bool', '<> or <>'], ['bool', 'not <>'], ['rep', 'join (apple) (banana)']],
      rows: [['rep', '( ) + ( )', 'দুটি সংখ্যা যোগ করে'], ['rep', 'pick random (1) to (10)', '১ থেকে ১০ এর মধ্যে যেকোনো সংখ্যা'], ['bool', '( ) > (50)', 'বড় কি না তুলনা করে — সত্য / মিথ্যা'], ['bool', '<> and <>', 'দুটো শর্তই সত্য হলে তবেই সত্য']],
      ex: ['rep', 'pick random (1) to (10)'] },
    { id: 'variables', en: 'Variables', bn: 'ভেরিয়েবলস', dark: '#B35400', short: 'স্কোরের মতো তথ্য মনে রাখা',
      desc: 'স্কোর, লাইফ বা সময়ের মতো তথ্য মনে রাখার “বাক্স” — গেমে পয়েন্ট গোনার জন্য সবচেয়ে দরকারি।',
      pal: [['btn', 'Make a Variable'], ['rep', 'my variable', { chk: 1 }], ['rep', 'score', { chk: 1 }], ['stack', 'set [my variable] to (0)'], ['stack', 'change [my variable] by (1)'], ['stack', 'show variable [my variable]'], ['stack', 'hide variable [my variable]'], ['btn', 'Make a List']],
      rows: [['btn', 'Make a Variable', 'নতুন ভেরিয়েবল (যেমন score) তৈরির বোতাম'], ['stack', 'set [score] to (0)', 'গেমের শুরুতে স্কোর ০ করে দেয়'], ['stack', 'change [score] by (1)', 'পয়েন্ট পেলে স্কোর ১ বাড়ায়'], ['rep', 'score', 'স্কোরের এখনকার মান']],
      ex: ['stack', 'change [score] by (1)'] },
    { id: 'myblocks', en: 'My Blocks', bn: 'মাই ব্লকস', dark: '#C72A4F', short: 'নিজের বানানো ব্লক',
      desc: 'নিজের বানানো ব্লক! একই কাজ বারবার না লিখে একবার define করো, তারপর যতবার খুশি ব্যবহার করো।',
      pal: [['btn', 'Make a Block'], ['stack', 'jump'], ['stack', 'spin (360) degrees']],
      rows: [['btn', 'Make a Block', 'নতুন ব্লক বানানোর বোতাম'], ['def', 'jump', 'এর নিচে “jump” এর কাজগুলো একবার লিখে দাও'], ['stack', 'jump', 'যেকোনো জায়গায় এক ব্লকেই পুরো লাফ']],
      ex: ['def', 'jump'] },
    { id: 'pen', en: 'Pen', bn: 'পেন', dark: '#0A7A5A', short: 'স্টেজে আঁকা (এক্সটেনশন)',
      desc: 'এটি এক্সটেনশন — নিচের বাঁ কোণের “Add Extension” বোতাম থেকে যোগ করতে হয়। স্প্রাইট চলার পথে দাগ এঁকে ছবি বানায়।',
      pal: [['stack', 'erase all'], ['stack', 'stamp'], ['stack', 'pen down'], ['stack', 'pen up'], ['stack', 'set pen color to {#4C97FF}'], ['stack', 'change pen [color] by (10)'], ['stack', 'set pen [color] to (50)'], ['stack', 'change pen size by (1)'], ['stack', 'set pen size to (1)']],
      rows: [['stack', 'pen down', 'আঁকা শুরু — স্প্রাইট যেখানে যাবে, দাগ পড়বে'], ['stack', 'pen up', 'আঁকা বন্ধ'], ['stack', 'set pen color to {#4C97FF}', 'কলমের রং ঠিক করে'], ['stack', 'erase all', 'স্টেজের সব আঁকা মুছে ফেলে']],
      ex: ['stack', 'pen down'] }
  ];
  function blockOf(cat, shape, text) {
    if (shape === 'def') return B('def', cat, ['define', { k: 'x', b: B('proto', cat, text) }]);
    const b = B(shape, cat, text);
    if (cat === 'pen') b.ext = 'pen';
    return b;
  }
  const BTN = (t, big) => `<div class="pbtn"${big ? ' style="font-size:20px;padding:10px 18px;border-radius:8px"' : ''}>${t}</div>`;
  const PENI = '<svg width="13" height="13" viewBox="0 0 24 24"><path d="M5 19l1.4-4.6L15.6 5.2l3.2 3.2-9.2 9.2z" fill="#fff"/></svg>';
  const EXTI = '<svg width="28" height="24" viewBox="0 0 28 24"><rect x="3" y="11" width="15" height="9" rx="2" fill="#fff"/><rect x="3" y="3" width="10" height="6" rx="2" fill="#fff"/><path d="M22 3v8M18 7h8" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></svg>';

  function panelHTML(withPen) {
    const items = CATS.slice(0, withPen ? 10 : 9).map((c, i) => {
      const col = SB.COL[c.id];
      return `<div class="pk" data-i="${i}"><i style="background:${col[0]};border-color:${col[2]};display:flex;align-items:center;justify-content:center">${c.id === 'pen' ? PENI : ''}</i>${c.en}</div>`;
    }).join('');
    return `<div class="pnl"><div class="pcol">${items}<div class="pext">${EXTI}</div></div><div class="pfly"><h5></h5><div class="phint">← একটি ক্যাটাগরি বেছে নাও</div><div class="plist"></div></div><div class="cur">${CUR}</div></div>`;
  }
  function fillPal(pnl, c, anim) {
    $('h5', pnl).textContent = c.en;
    $('.phint', pnl).style.opacity = 0;
    const list = $('.plist', pnl);
    list.innerHTML = c.pal.map((p, i) => {
      const inner = p[0] === 'btn' ? BTN(p[1]) : ((p[2] && p[2].chk ? '<span class="chk"></span>' : '') + SV(blockOf(c.id, p[0], p[1]), 0.675));
      return `<div class="prow" style="animation-delay:${(i * 0.07).toFixed(2)}s">${inner}</div>`;
    }).join('');
    list.classList.toggle('pin', !!anim);
    $$('.pk', pnl).forEach(k => k.classList.toggle('on', +k.dataset.i === CATS.indexOf(c)));
  }
  function clearPal(pnl) { $('h5', pnl).textContent = ''; $('.plist', pnl).innerHTML = ''; $('.phint', pnl).style.opacity = 1; $$('.pk', pnl).forEach(k => k.classList.remove('on')); }

  /* ---------- build generated slides ---------- */
  const holder = $('#cat-slides');
  holder.outerHTML = CATS.map((c, i) => {
    const col = SB.COL[c.id];
    const rows = c.rows.map((r, j) => `<div style="--d:${j}">${r[0] === 'btn' ? BTN(r[1], 1) : SV(blockOf(c.id, r[0], r[1]), 1.15)}</div><p style="--d:${j}">${r[2]}</p>`).join('');
    return `<section class="slide light" id="s-k-${c.id}" data-k="${i}">
      <div class="a kpanel" style="overflow:hidden">${panelHTML(c.id === 'pen')}</div>
      <div class="a kright"><p class="eb" style="color:#4E4870"><span class="kdot" style="background:${col[0]};border-color:${col[2]}"></span>ব্লক ক্যাটাগরি ${bn(String(i + 1).padStart(2, '0'))} / ১০${c.id === 'pen' ? ' · এক্সটেনশন' : ''}</p>
      <h2 class="h" style="font-size:84px;color:${c.dark};margin-top:18px">${c.en} · ${c.bn}</h2>
      <p class="p" style="font-size:31px;margin-top:18px;max-width:1080px">${c.desc}</p>
      <div class="krows">${rows}</div></div></section>`;
  }).join('');
  $$('.kpanel .pnl').forEach(p => p.style.transform = 'scale(1.55)');

  /* category overview cards */
  $('#kc-cards').innerHTML = CATS.map((c, i) => {
    const col = SB.COL[c.id], x = 420 + (i % 2) * 714, y = 206 + Math.floor(i / 2) * 154;
    return `<div class="kcard" style="left:${x}px;top:${y}px;--d:${i}"><span class="dot" style="background:${col[0]};border-color:${col[2]}"></span><div class="tx"><h3>${c.en} · ${c.bn}</h3><p>${c.short}</p></div><div class="ex">${SV(blockOf(c.id, c.ex[0], c.ex[1]), c.ex[0] === 'c' ? 0.72 : 0.95)}</div></div>`;
  }).join('');

  /* cover floating blocks */
  const fbs = [[B('hat', 'events', 'when @flag clicked'), 110, 70], [B('stack', 'motion', 'move (10) steps'), 1490, 60], [B('c', 'control', 'repeat (10)'), 60, 470], [B('stack', 'looks', 'say (Hello!)'), 1560, 560], [B('stack', 'sound', 'play sound [Meow] until done'), 120, 880], [B('rep', 'operators', 'pick random (1) to (10)'), 1420, 900]];
  $('#cv-fb').innerHTML = fbs.map((f, i) => `<div class="fb" style="left:${f[1]}px;top:${f[2]}px;--d:${i}">${SV(f[0], 1.15)}</div>`).join('');

  /* ============ slide timelines ============ */
  const SL = {};

  /* --- LEGO → blocks --- */
  (function () {
    const C = ['#F7C51E', '#2F6FE0', '#1FA2E0', '#8A5CD6', '#D64CC3', '#E3342F'];
    const P = [[180, 700], [405, 700], [630, 700], [292, 618], [517, 618], [405, 536]];
    const script = [B('hat', 'events', 'when @flag clicked'), B('stack', 'motion', 'move (10) steps'), B('stack', 'motion', 'turn @cw (15) degrees'), B('stack', 'looks', 'say (Hello!) for (2) seconds'), B('stack', 'sound', 'play sound [Meow] until done'), B('stack', 'looks', 'next costume')];
    const k = 1.3, st = SB.stack(script), SX = 90, SY = 170;
    $('#lg-svg').innerHTML = SV(script, k);
    const BC = script.map(b => SB.COL[b.cat][0]);
    const holderB = $('#lg-bricks');
    const bricks = C.map(c => { const d = el('div', 'brick', '<i style="left:16px"></i><i style="left:68px"></i><i style="left:120px"></i><i style="left:172px"></i>'); holderB.appendChild(d); return d; });
    const cap = $('#lg-cap'), c1 = 'ছোট ছোট ব্রিক জুড়ে বড় কিছু তৈরি…', c2 = '…স্ক্র্যাচে ঠিক এভাবেই ব্লক জোড়া লাগে!';
    SL['s-lego'] = {
      reset() {
        bricks.forEach((d, i) => { d.className = 'brick'; Object.assign(d.style, { left: P[i][0] + 'px', top: '-300px', width: '220px', height: '80px', backgroundColor: C[i], zIndex: i, opacity: 1 }); });
        $('#lg-plate').style.opacity = 1; cap.style.opacity = 0; cap.textContent = c1;
        const s = $('#lg-svg'); s.style.opacity = 0; s.firstChild.classList.remove('glow');
        on($('#lg-stg'), 0); const cat = $('#lg-cat'); cat.style.left = '90px'; cat.style.transform = ''; on($('#lg-bub'), 0); on($('#lg-eq'), 0);
      },
      steps: [
        [200, () => cap.style.opacity = 1],
        ...bricks.map((d, i) => [500 + i * 430, () => d.style.top = P[i][1] + 'px']),
        [3400, () => cap.style.opacity = 0],
        [3900, () => { cap.textContent = c2; cap.style.opacity = 1; $('#lg-plate').style.opacity = 0; }],
        ...bricks.map((d, i) => [3900 + i * 130, () => {
          const p = st.pos[i]; d.className = 'brick m';
          Object.assign(d.style, { left: SX + 2 * k + 'px', top: SY + (st.top + 2 + p.y) * k + 'px', width: p.w * k + 'px', height: p.h * k + 'px', backgroundColor: BC[i], zIndex: 10 - i });
        }]),
        [5300, () => { $('#lg-svg').style.opacity = 1; bricks.forEach(d => d.style.opacity = 0); }],
        [6000, () => on($('#lg-stg'), 1)],
        [6800, () => $('#lg-svg').firstChild.classList.add('glow')],
        [7100, () => $('#lg-cat').style.left = '150px'],
        [7700, () => $('#lg-cat').style.transform = 'rotate(15deg)'],
        [8300, () => on($('#lg-bub'), 1)],
        [10200, () => $('#lg-svg').firstChild.classList.remove('glow')],
        [10400, () => on($('#lg-eq'), 1)]
      ]
    };
  })();

  /* --- Cat guide --- */
  (function () {
    const cat = $('#ct-cat'), bub = $('#ct-bub'), win = $('#ct-win');
    const B1 = 'হ্যালো! আমি স্ক্র্যাচ ক্যাট<small>চলো, একসাথে স্ক্র্যাচ এডিটরের ভেতরটা ঘুরে দেখি!</small>';
    const B2 = 'আমার সাথে লাফ দাও!<small>এই যে, এটাই স্ক্র্যাচ এডিটর…</small>';
    SL['s-cat'] = {
      reset() { cat.getAnimations().forEach(a => a.cancel()); cat.className = 'a'; cat.style.left = '-380px'; cat.style.opacity = 1; bub.className = 'a'; bub.innerHTML = B1; win.className = 'a'; },
      steps: [
        [300, () => { cat.className = 'a walk'; cat.style.left = '300px'; }],
        [2700, () => { cat.className = 'a hop'; on(bub, 1); }],
        [3800, () => on(win, 1)],
        [5400, () => { bub.innerHTML = B2; cat.className = 'a'; }],
        [6600, () => {
          on(bub, 0); if (INSTANT) return;
          // land exactly on the cat drawn on the stage inside the screenshot
          const s = 860 / 1362, tx = 980 + 1066 * s - 300, ty = 250 + 34 + 223 * s - 520, sc = (95 * s) / 320;
          cat.animate([{ transform: 'none' }, { transform: `translate(${tx * 0.5}px,${ty - 380}px) scale(.6) rotate(-12deg)`, offset: 0.5 }, { transform: `translate(${tx}px,${ty}px) scale(${sc})` }], { duration: 1100, easing: 'ease-in-out', fill: 'forwards' });
        }],
        [7700, () => { if (!INSTANT) cat.style.opacity = 0; }],
        [8300, () => { if (!INSTANT) win.className = 'a zm'; }]
      ]
    };
  })();

  /* --- Editor overview --- */
  (function () {
    const sh = Shot($('#ui-shot'), 'img/ui-code.png');
    const RG = [
      ['মেনু বার', 'Menu bar', [0, 0, 1362, 48], [98, 24], '#FFAB19'],
      ['ট্যাব', 'Code · Costumes · Sounds', [0, 52, 302, 42], [318, 72], '#FF8C1A'],
      ['ব্লক ক্যাটাগরি', 'Categories', [0, 92, 58, 465], [29, 532], '#4C97FF'],
      ['ব্লক প্যালেট', 'Block palette', [58, 92, 252, 518], [284, 118], '#9966FF'],
      ['কোড এরিয়া', 'Code area', [310, 92, 556, 518], [344, 120], '#59C059'],
      ['স্টেজ', 'Stage', [873, 93, 482, 361], [900, 122], '#CF63CF'],
      ['স্প্রাইট প্যানেল', 'Sprite pane', [873, 462, 404, 184], [1010, 604], '#5CB1D6'],
      ['স্টেজ ও ব্যাকড্রপ', 'Stage & backdrops', [1283, 462, 73, 184], [1338, 474], '#FF6680']
    ];
    const lg = $('#ui-lgd');
    lg.innerHTML = RG.map((r, i) => `<div class="lgd"><i style="background:${r[4]}">${bn(i + 1)}</i><p>${r[0]}<small>${r[1]}</small></p></div>`).join('');
    const rg = RG.map(r => { const e = sh.add('rgn', r[2][0] + 2, r[2][1] + 2, r[2][2] - 4, r[2][3] - 4); e.style.borderColor = r[4]; return e; });
    const bd = RG.map((r, i) => { const e = sh.add('badge', r[3][0], r[3][1], null, null, bn(i + 1)); e.style.background = r[4]; return e; });
    SL['s-ui'] = {
      reset() { sh.reset(); rg.forEach(e => on(e, 0)); bd.forEach(e => on(e, 0)); $$('.lgd', lg).forEach(e => on(e, 0)); },
      steps: RG.flatMap((r, i) => { const c = [r[2][0] + r[2][2] / 2, r[2][1] + r[2][3] / 2]; return [[400 + i * 1300, () => sh.mv(c[0], c[1])], [1250 + i * 1300, () => { sh.ck(c[0], c[1]); on(rg[i], 1); on(bd[i], 1); on($$('.lgd', lg)[i], 1); }]]; }).concat([[11200, () => sh.cursor(0)]])
    };
  })();

  /* --- Sprite first --- */
  (function () {
    const sh = Shot($('#sp-shot'), 'img/ui-code.png');
    const BALL = '<div style="width:40px;height:40px;border-radius:50%;background:conic-gradient(#FF6680 0 25%,#FFBF00 0 50%,#4C97FF 0 75%,#59C059 0);box-shadow:0 0 0 2px #fff,0 0 0 3.5px #575E75"></div>';
    const DEL = '<svg width="12" height="12" viewBox="0 0 12 12"><path d="M3 3l6 6M9 3l-6 6" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>';
    sh.add('', 1236, 352, 50, 50, BALL);
    const t1 = sh.add('sprtile', 880, 568, 76, 70, `<span class="im"><img src="${CAT}" alt="" style="height:36px"></span><span class="nm">Sprite1</span><span class="del">${DEL}</span>`);
    const t2 = sh.add('sprtile', 964, 568, 76, 70, `<span class="im" style="transform:scale(.8)">${BALL}</span><span class="nm">Ball</span><span class="del">${DEL}</span>`);
    const name = sh.add('fld', 922, 478, 128, 30); name.style.textAlign = 'left'; name.style.paddingLeft = '14px';
    const fx = sh.add('fld', 1108, 478, 48, 30), fy = sh.add('fld', 1214, 478, 48, 30);
    const ghost = sh.add('', 790, 100, 70, 70); ghost.style.background = '#F9F9F9';
    const sA = sh.add('', 350, 130, null, null, SV([B('hat', 'events', 'when @flag clicked'), B('stack', 'motion', 'move (10) steps'), B('stack', 'looks', 'say (Hello!) for (2) seconds')], 0.675));
    const sB = sh.add('', 350, 130, null, null, SV([B('hat', 'events', 'when @flag clicked'), B('cf', 'control', 'forever', { in: [B('stack', 'motion', 'change y by (5)'), B('stack', 'motion', 'if on edge, bounce')] })], 0.675));
    function sel(n) {
      on(t1, !n); on(t2, n); sA.style.display = n ? 'none' : ''; sB.style.display = n ? '' : 'none';
      name.textContent = n ? 'Ball' : 'Sprite1'; fx.textContent = n ? 120 : 0; fy.textContent = n ? -100 : 0;
      ghost.innerHTML = n ? `<div style="opacity:.35;margin:14px 0 0 14px">${BALL}</div>` : `<img src="${CAT}" alt="" style="opacity:.35;width:44px;margin:12px 0 0 12px">`;
    }
    SL['s-sprite'] = {
      reset() { sh.reset(); sel(0); },
      steps: [
        [400, () => sh.mv(1002, 600)], [1300, () => { sh.ck(1002, 600); sel(1); sh.tag('c', 600, 140, '<i>⚽</i>বলের নিজস্ব কোড', '#4C97FF'); }],
        [2900, () => sh.mv(918, 600)], [3800, () => { sh.ck(918, 600); sel(0); sh.tag('c', 600, 140, '<i>🐱</i>বিড়ালের নিজস্ব কোড', '#FF8C1A'); }],
        [5000, () => { sh.hl([875, 563, 400, 82]); sh.tag('s', 1046, 586, 'বেগুনি বর্ডার = যে স্প্রাইটে কাজ করছি', '#855CD6'); }],
        [5600, () => sh.zoom([868, 455, 494, 195])], [6300, () => sh.cursor(0)]
      ]
    };
  })();

  /* --- Menu & tabs --- */
  (function () {
    const sh = Shot($('#mn-shot'), 'img/ui-code.png', ['img/ui-costumes.png']);
    const m = sh.add('menu', 232, 48, 240, null, '<div>New</div><div>Load from your computer</div><div id="mn-save">Save to your computer</div>');
    SL['s-menu'] = {
      reset() { sh.reset(); on(m, 0); $('#mn-save').classList.remove('hv'); },
      steps: [
        [200, () => sh.zoom([0, 0, 760, 360])], [1500, () => sh.mv(265, 24)],
        [2400, () => { sh.ck(265, 24); on(m, 1); sh.tag('f', 420, 116, '<i>১</i>File: নতুন, ওপেন ও সেভ', '#FFAB19'); }],
        [3200, () => sh.mv(330, 158)], [3700, () => $('#mn-save').classList.add('hv')],
        [4600, () => { on(m, 0); sh.mv(148, 74); }],
        [5400, () => { sh.ck(148, 74); sh.alt(0); sh.tag('t', 312, 58, '<i>২</i>ট্যাব: Code · Costumes · Sounds', '#FF8C1A'); }],
        [7200, () => sh.mv(45, 74)], [8000, () => { sh.ck(45, 74); sh.alt(-1); }], [8900, () => sh.cursor(0)]
      ]
    };
  })();

  /* --- Palette → drag --- */
  (function () {
    const sh = Shot($('#pl-shot'), 'img/ui-code.png');
    const col = sh.add('', 0, 92, 57, 465, CATS.slice(0, 9).map((c, i) => `<div class="pk" data-i="${i}"><i style="background:${SB.COL[c.id][0]};border-color:${SB.COL[c.id][2]}"></i>${c.en}</div>`).join(''));
    col.style.background = '#fff';
    const fly = sh.add('', 58, 92, 251, 518, '<div class="pfly" style="left:0;width:251px;height:518px"><h5>Looks</h5><div class="plist"></div></div>');
    const k = 0.675, base = [B('hat', 'events', 'when @flag clicked'), B('stack', 'motion', 'move (10) steps')], say = B('stack', 'looks', 'say (Hello!) for (2) seconds');
    const SX = 360, SY = 140, scr = sh.add('', SX, SY);
    const drag = sh.add('', 0, 0, null, null, SV(say, k)); drag.classList.add('mv12'); drag.style.filter = 'drop-shadow(0 8px 6px rgba(0,0,0,.25))'; drag.style.zIndex = 20;
    const LOOKS = CATS[1];
    SL['s-palette'] = {
      reset() {
        sh.reset(); col.style.display = 'none'; fly.style.display = 'none'; scr.innerHTML = SV(base, k); drag.style.display = 'none';
        $$('.pk', col).forEach(p => on(p, +p.dataset.i === 0));
      },
      steps: [
        [200, () => sh.zoom([0, 48, 700, 420])], [1500, () => sh.mv(28, 153)],
        [2400, () => {
          sh.ck(28, 153); col.style.display = ''; $$('.pk', col).forEach(p => on(p, +p.dataset.i === 1));
          fly.style.display = ''; const l = $('.plist', fly);
          l.innerHTML = LOOKS.pal.map((p, i) => `<div class="prow" style="animation-delay:${(i * 0.06).toFixed(2)}s">${SV(B(p[0], 'looks', p[1]), k)}</div>`).join('');
          l.classList.toggle('pin', !INSTANT);
          sh.tag('a', 330, 102, '<i>১</i>ক্যাটাগরিতে ক্লিক → ব্লক বদলে যায়', '#9966FF');
        }],
        [3500, () => sh.mv(100, 138)],
        [4400, () => { sh.ck(100, 138); drag.style.transition = 'none'; put(drag, 66, 121); drag.style.display = ''; void drag.offsetWidth; drag.style.transition = ''; }],
        [4600, () => { const s = SB.stack(base.concat([say])); const ty = SY + (s.top + 2 + s.pos[2].y) * k - 2 * k - 20 * k; put(drag, SX, ty + 20 * k); sh.mv(SX + 40, ty + 20 * k + 16); }],
        [5800, () => { drag.style.display = 'none'; scr.innerHTML = SV(base.concat([say]), k); sh.tag('b', 560, 250, '<i>২</i>টেনে এনে জোড়া লাগাও!', '#59C059'); }],
        [6900, () => sh.cursor(0)]
      ]
    };
  })();

  /* --- Scripts running together --- */
  (function () {
    const sh = Shot($('#cd-shot'), 'img/ui-code.png');
    const k = 0.675;
    const sA = sh.add('', 340, 112, null, null, SV([B('hat', 'events', 'when @flag clicked'), B('cf', 'control', 'forever', { in: [B('stack', 'motion', 'move (5) steps'), B('stack', 'motion', 'if on edge, bounce')] })], k));
    const sB = sh.add('', 340, 300, null, null, SV([B('hat', 'events', 'when @flag clicked'), B('stack', 'variables', 'set [score] to (0)'), B('cf', 'control', 'forever', { in: [B('stack', 'control', 'wait (1) seconds'), B('stack', 'variables', 'change [score] by (1)')] })], k));
    const fl = sh.add('', 875, 57, 27, 27); fl.style.borderRadius = '4px';
    const patch = sh.add('patch', 1058, 216, 112, 114);
    const cat = sh.add('', 1066, 223, 95, null, `<img src="${CAT}" alt="" style="width:95px;display:block">`);
    const mon = sh.add('mon', 880, 100, null, null, 'score <b>0</b>');
    let n = 0;
    SL['s-code'] = {
      reset() { sh.reset(); [sA, sB].forEach(s => s.firstChild.classList.remove('glow')); fl.style.background = 'transparent'; cat.classList.remove('pace'); n = 0; $('b', mon).textContent = 0; },
      steps: [
        [400, () => sh.mv(888, 70)],
        [1300, () => {
          sh.ck(888, 70); fl.style.background = 'rgba(77,151,255,.25)'; [sA, sB].forEach(s => s.firstChild.classList.add('glow')); cat.classList.add('pace');
          if (INSTANT) $('b', mon).textContent = 7; else every(1000, () => $('b', mon).textContent = ++n);
        }],
        [2300, () => sh.tag('a', 560, 130, '<i>১</i>স্ক্রিপ্ট ১: নড়াচড়া করে', '#4C97FF')],
        [3000, () => sh.tag('b', 560, 330, '<i>২</i>স্ক্রিপ্ট ২: স্কোর গোনে', '#FF8C1A')],
        [3800, () => { sh.zoom([310, 48, 1052, 450]); sh.cursor(0); }],
        [5000, () => sh.tag('c', 950, 405, 'দুটো স্ক্রিপ্ট একসাথে চলছে!', '#59C059')]
      ]
    };
  })();

  /* --- Stage coordinates --- */
  (function () {
    const sh = Shot($('#sg-shot'), 'img/ui-code.png');
    sh.add('patch', 1058, 216, 112, 114);
    const grid = sh.add('grid', 874, 94, 480, 358, '<span style="left:4px;top:186px">x: −240</span><span style="right:4px;top:186px">x: 240</span><span style="left:246px;top:4px">y: 180</span><span style="left:246px;bottom:4px">y: −180</span><span style="left:246px;top:186px">(0, 0)</span>');
    const gv = sh.add('gd', 0, 0); gv.style.borderLeft = '2px dashed #E6409A';
    const gh = sh.add('gd', 0, 0); gh.style.borderTop = '2px dashed #E6409A';
    const dot = sh.add('gd', 0, 0, 12, 12); dot.style.cssText += ';border-radius:50%;background:#E6409A;margin:-6px 0 0 -6px';
    const cat = sh.add('mv12', 1066, 223, 95, null, `<img src="${CAT}" alt="" style="width:95px;display:block">`);
    const fx = sh.add('fld', 1108, 478, 48, 30), fy = sh.add('fld', 1214, 478, 48, 30);
    const blk = sh.add('', 884, 104);
    function to(x, y) {
      const px = 1114 + x, py = 273 - y;
      put(cat, px - 47, py - 50);
      put(gv, px, Math.min(py, 273), 0, Math.abs(273 - py)); put(gh, Math.min(px, 1114), py, Math.abs(px - 1114), 0); put(dot, px, py);
      fx.textContent = x; fy.textContent = y; return [px, py];
    }
    SL['s-stage'] = {
      reset() { sh.reset(); sh.cursor(0); on(grid, 0); [gv, gh, dot].forEach(e => on(e, 0)); to(0, 0); blk.innerHTML = ''; },
      steps: [
        [200, () => sh.zoom([866, 56, 496, 520])],
        [1400, () => { on(grid, 1); sh.tag('g', 1210, 104, '৪৮০ × ৩৬০', '#4C97FF'); }],
        [2600, () => blk.innerHTML = SV(B('stack', 'motion', 'go to x: (100) y: (50)'), 0.9)],
        [3400, () => { const p = to(100, 50); [gv, gh, dot].forEach(e => on(e, 1)); sh.tag('r', p[0] + 14, p[1] + 10, 'x: 100, y: 50', '#E6409A'); }],
        [6000, () => blk.innerHTML = SV(B('stack', 'motion', 'go to x: (-150) y: (-100)'), 0.9)],
        [6800, () => { const p = to(-150, -100); sh.tag('r', p[0] + 14, p[1] - 44, 'x: −150, y: −100', '#E6409A'); }]
      ]
    };
  })();

  /* --- Block logic (snap) --- */
  (function () {
    const k = 1.45, root = $('#lo');
    const hat = B('hat', 'events', 'when @flag clicked');
    const bool = B('bool', 'sensing', 'touching [edge] ?');
    const turn = B('stack', 'motion', 'turn @cw (15) degrees');
    const S0 = [hat, B('cf', 'control', 'forever', { in: [B('c', 'control', 'if <> then')] })];
    const S1 = [hat, B('cf', 'control', 'forever', { in: [B('c', 'control', ['if ', { k: 'x', b: Object.assign({}, bool, { id: 'lo-b1' }) }, ' then'])] })];
    const S2 = [hat, B('cf', 'control', 'forever', { in: [B('c', 'control', ['if ', { k: 'x', b: bool }, ' then'], { in: [Object.assign({}, turn, { id: 'lo-t2' })] })] })];
    $('#lo-s0').innerHTML = SV(S0, k); $('#lo-s1').innerHTML = SV(S1, k); $('#lo-s2').innerHTML = SV(S2, k);
    const pcs = [$('#lo-p0'), $('#lo-p1'), $('#lo-p2')], O = [[660, 110], [620, 260], [620, 420]];
    pcs[0].innerHTML = SV(B('rep', 'motion', 'x position'), k); pcs[1].innerHTML = SV(bool, k); pcs[2].innerHTML = SV(turn, k);
    const cur = $('#lo-cur'); cur.innerHTML = CUR.replace('width="22" height="28"', 'width="30" height="38"');
    const mark = $('#lo-mark'), cap = $('#lo-cap');
    function rel(e) { const r = e.getBoundingClientRect(), q = root.getBoundingClientRect(); return [(r.left - q.left) / SCALE, (r.top - q.top) / SCALE, r.width / SCALE, r.height / SCALE]; }
    const mv = (x, y) => put(cur, x, y);
    function ck(e) { if (INSTANT) return; const r = rel(e), d = el('div', 'lo-rp'); put(d, r[0] + 30, r[1] + r[3] / 2); root.appendChild(d); setTimeout(() => d.remove(), 650); }
    const at0 = e => { const r = rel(e); mv(r[0] + 30, r[1] + r[3] / 2); };
    function state(n) { [0, 1, 2].forEach(i => on($('#lo-s' + i), i === n)); }
    function markAt(ok, r) { mark.textContent = ok ? '✓' : '✗'; mark.style.background = ok ? '#2DA44E' : '#E5484D'; put(mark, r[0] + r[2] + 14, r[1] - 40); on(mark, 1); }
    // body of a piece sits 2 viewBox units in from its svg edge
    const into = (p, r) => { put(p, r[0] - 2 * k, r[1] - 2 * k); mv(r[0] + 30, r[1] + r[3] / 2); };
    SL['s-logic'] = {
      reset() { state(0); pcs.forEach((p, i) => { p.className = 'a pc'; p.style.display = ''; put(p, O[i][0], O[i][1]); }); on(mark, 0); cap.textContent = 'আকার মিললেই কেবল ব্লক জোড়া লাগে'; mv(520, 600); cur.style.opacity = 1; $('#lo-s2 svg').classList.remove('glow'); },
      steps: [
        [700, () => at0(pcs[0])], [1600, () => { ck(pcs[0]); pcs[0].classList.add('dr'); }],
        [1800, () => { const s = rel($('#lo-s0 .slot')), r = rel(pcs[0]); put(pcs[0], s[0] - 4, s[1] + s[3] / 2 - r[3] / 2); mv(s[0] + 26, s[1] + s[3] / 2); }],
        [2900, () => { markAt(0, rel($('#lo-s0 .slot'))); pcs[0].classList.add('shk'); cap.textContent = '✗ গোল ব্লক ষড়ভুজ ঘরে বসে না!'; }],
        [3600, () => { pcs[0].className = 'a pc'; put(pcs[0], O[0][0], O[0][1]); mv(O[0][0] + 30, O[0][1] + 30); }],
        [4300, () => on(mark, 0)],
        [4500, () => at0(pcs[1])], [5400, () => { ck(pcs[1]); pcs[1].classList.add('dr'); }],
        [5600, () => into(pcs[1], rel($('#lo-b1')))],
        [6700, () => { state(1); pcs[1].style.display = 'none'; markAt(1, rel($('#lo-b1'))); cap.textContent = '✓ ষড়ভুজ ব্লক ষড়ভুজ ঘরে — ঠিকঠাক!'; }],
        [7500, () => { on(mark, 0); at0(pcs[2]); }], [8400, () => { ck(pcs[2]); pcs[2].classList.add('dr'); }],
        [8600, () => into(pcs[2], rel($('#lo-t2')))],
        [9700, () => { state(2); pcs[2].style.display = 'none'; cap.textContent = '✓ সেমিকোলন বা ব্র্যাকেট ভুলের ভয় নেই!'; }],
        [10600, () => { $('#lo-s2 svg').classList.add('glow'); cur.style.opacity = 0; }]
      ]
    };
    // shape legend under the text
    $('#lo-shapes').innerHTML = [[B('hat', 'events', 'when @flag clicked'), 'হ্যাট — স্ক্রিপ্টের শুরু'], [B('stack', 'motion', 'move (10) steps'), 'স্ট্যাক — একটার পর একটা কাজ'], [B('rep', 'variables', 'score'), 'গোল — একটি মান দেয়'], [B('bool', 'operators', '<> and <>'), 'ষড়ভুজ — সত্য / মিথ্যা']]
      .map(r => `<div style="display:flex;align-items:center;gap:20px"><div style="width:250px">${SV(r[0], 0.85)}</div><p class="p" style="font-size:25px;margin:0">${r[1]}</p></div>`).join('');
  })();

  /* --- Category slides --- */
  CATS.forEach((c, i) => {
    const s = $('#s-k-' + c.id), pnl = $('.pnl', s), cur = $('.cur', pnl);
    const cy = i * 45 + 18;
    SL[s.id] = {
      reset() { clearPal(pnl); put(cur, 150, 470); },
      steps: [
        [500, () => put(cur, 29, cy)],
        [1400, () => { if (!INSTANT) { const d = el('div', 'rp'); put(d, 29, cy); pnl.appendChild(d); setTimeout(() => d.remove(), 650); } fillPal(pnl, c, !INSTANT); }],
        [2300, () => put(cur, 170, 520)]
      ]
    };
  });

  /* --- Costumes --- */
  (function () {
    const sh = Shot($('#cs-shot'), 'img/ui-code.png', ['img/ui-costumes.png']);
    const AW = 'background:url(img/ui-costumes.png) no-repeat;background-size:1362px 646px';
    const rc1 = sh.add('recol', 464, 290, 205, 216); rc1.style.cssText += ';' + AW + ';background-position:-464px -290px';
    const rc2 = sh.add('recol', 1066, 223, 95, 100); rc2.style.cssText += ';' + AW + ';background-position:-1066px -223px';
    const sw = sh.add('', 185, 171, 33, 25); sw.style.cssText += ';border-radius:4px;transition:background 1s;box-shadow:inset 0 0 0 1px rgba(0,0,0,.15)';
    const pk = sh.add('picker', 120, 206, null, null, '<div class="r">Color<div style="background:linear-gradient(90deg,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)"><span class="k" id="cs-k1"></span></div></div><div class="r">Saturation<div style="background:linear-gradient(90deg,#fff,#4C97FF)"><span class="k" style="left:170px"></span></div></div><div class="r" style="margin-bottom:2px">Brightness<div style="background:linear-gradient(90deg,#000,#4C97FF)"><span class="k" style="left:196px"></span></div></div>');
    const sel0 = sh.add('tool', 165, 240, 40, 40, '<svg width="22" height="22" viewBox="0 0 24 24"><path d="M6 3l12 10-6 .8 3.4 6.4-2.2 1.2L9.8 15 6 19z" fill="#575E75"/></svg>'); sel0.style.background = '#fff';
    const sel1 = sh.add('tool', 163, 335, 40, 40, '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M4 11l7-7 8 8-7 7z" fill="#fff"/><path d="M19 13c1.5 2 2 3.2 2 4a2 2 0 0 1-4 0c0-.8.5-2 2-4z" fill="#fff"/></svg>'); sel1.style.background = '#855CD6';
    const fab = sh.add('fab', 53, 372, 40, null, ['M12 16V5M7 10l5-5 5 5M5 19h14', 'M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z', 'M4 20l3-1 11-11-2-2L5 17zM14 6l2 2', 'M10.5 17a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13zM15.5 15.5L20 20'].map(d => `<span><svg width="20" height="20" viewBox="0 0 24 24"><path d="${d}" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`).join(''));
    const tip = sh.add('tooltip', 104, 564, null, null, 'Choose a Costume');
    SL['s-costumes'] = {
      reset() { sh.reset(); [rc1, rc2, pk, sel0, sel1, fab, tip].forEach(e => on(e, 0)); sw.style.background = 'transparent'; $('#cs-k1').style.left = '20px'; $('#cs-k1').style.background = '#FF7A00'; },
      steps: [
        [300, () => sh.mv(148, 74)], [1200, () => { sh.ck(148, 74); sh.alt(0); sw.style.background = '#9966FF'; }],
        [2100, () => sh.zoom([0, 90, 860, 530])],
        [3300, () => { sh.hl([22, 96, 92, 184]); sh.tag('a', 128, 222, '<i>১</i>costume1, costume2 — একই স্প্রাইটের দুটো চেহারা', '#855CD6'); }],
        [4900, () => { sh.hl(); sh.mv(200, 183); }],
        [5700, () => { sh.ck(200, 183); on(pk, 1); }],
        [6400, () => { $('#cs-k1').style.left = '132px'; $('#cs-k1').style.background = '#4C97FF'; sw.style.background = '#4C97FF'; }],
        [7700, () => { on(pk, 0); sh.mv(183, 355); }],
        [8500, () => { sh.ck(183, 355); on(sel0, 1); on(sel1, 1); }],
        [9300, () => sh.mv(560, 450)],
        [10100, () => { sh.ck(560, 450); on(rc1, 1); on(rc2, 1); sh.tag('b', 690, 300, '<i>২</i>Fill টুল দিয়ে ক্লিক → রং বদলে গেল!', '#4C97FF'); }],
        [11600, () => sh.mv(73, 578)], [12300, () => { on(fab, 1); on(tip, 1); }], [13800, () => sh.cursor(0)]
      ]
    };
  })();

  /* --- Costume animation --- */
  (function () {
    const k = 1.25, script = [B('hat', 'events', 'when @flag clicked'), B('cf', 'control', 'forever', { in: [B('stack', 'looks', 'next costume'), B('stack', 'motion', 'move (14) steps'), B('stack', 'motion', 'if on edge, bounce'), B('stack', 'control', 'wait (0.2) seconds')] })];
    $('#ca-code').innerHTML = SV(script, k);
    const cat = $('#ca-cat'), img = $('img', cat), t1 = $('#ca-t1'), t2 = $('#ca-t2');
    let x = 40, d = 1, p = 1;
    function draw() { cat.style.left = x + 'px'; cat.style.transform = d < 0 ? 'scaleX(-1)' : ''; img.style.transform = p === 2 ? 'rotate(-12deg) translateY(-4px)' : ''; on(t1, p === 1); on(t2, p === 2); }
    SL['s-canim'] = {
      reset() { x = 40; d = 1; p = 1; draw(); $('#ca-code svg').classList.remove('glow'); },
      steps: [[800, () => {
        $('#ca-code svg').classList.add('glow');
        if (INSTANT) { x = 200; p = 2; draw(); return; }
        every(260, () => { p = 3 - p; x += 16 * d; if (x > 370 || x < 10) { d = -d; x = Math.max(10, Math.min(370, x)); } draw(); });
      }]]
    };
  })();

  /* --- Backdrops --- */
  (function () {
    const sh = Shot($('#bd-shot'), 'img/ui-code.png', ['img/ui-backdrops.jpg']);
    const selB = sh.add('', 1283, 462, 73, 184); selB.style.cssText += ';box-sizing:border-box;border:2px solid #855CD6;border-radius:8px;opacity:0;transition:opacity .3s';
    const tab = sh.add('', 104, 63, 92, 24, '<span style="font:500 13px Helvetica,Arial,sans-serif;color:#575E75">Backdrops</span>'); tab.style.cssText += ';background:#D9E3F2;padding-left:22px;box-sizing:border-box;display:flex;align-items:center;opacity:0;transition:opacity .3s';
    const fab = sh.add('fab', 53, 372, 40, null, ['M12 16V5M7 10l5-5 5 5M5 19h14', 'M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z', 'M4 20l3-1 11-11-2-2L5 17zM14 6l2 2', 'M10.5 17a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13zM15.5 15.5L20 20'].map(d => `<span><svg width="20" height="20" viewBox="0 0 24 24"><path d="${d}" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`).join(''));
    const tip = sh.add('tooltip', 104, 564, null, null, 'Choose a Backdrop');
    const blk = sh.add('', 345, 500);
    SL['s-backdrop'] = {
      reset() { sh.reset(); selB.style.opacity = 0; tab.style.opacity = 0; on(fab, 0); on(tip, 0); blk.innerHTML = ''; },
      steps: [
        [300, () => sh.mv(1319, 535)],
        [1200, () => { sh.ck(1319, 535); selB.style.opacity = 1; tab.style.opacity = 1; sh.tag('a', 1040, 420, '<i>১</i>Stage সিলেক্ট', '#855CD6'); }],
        [2400, () => sh.mv(148, 74)],
        [3200, () => { sh.ck(148, 74); sh.alt(0); selB.style.opacity = 0; tab.style.opacity = 0; }],
        [4200, () => { sh.hl([22, 96, 92, 186]); sh.tag('b', 128, 222, '<i>২</i>লাইব্রেরি থেকে বাছাই করা ব্যাকড্রপ: Stars', '#FFAB19'); }],
        [5700, () => { sh.hl(); sh.tag('a', 900, 412, '<i>৩</i>স্টেজের পটভূমি বদলে গেল!', '#5CB1D6'); }],
        [6700, () => sh.mv(73, 578)], [7400, () => { on(fab, 1); on(tip, 1); }],
        [8800, () => { blk.innerHTML = SV(B('stack', 'looks', 'switch backdrop to [Stars]'), 1); sh.cursor(0); }]
      ]
    };
  })();

  /* --- Make: mini demos --- */
  $('#mk-game').innerHTML = `<div class="cl"></div><div class="cl" style="top:84px;animation-delay:-3s"></div><div class="gr"></div><div class="ob"></div><div class="coin"></div><img class="cat" src="${CAT}" alt=""><div class="mon" style="position:absolute;right:12px;top:12px">score <b id="mk-n">0</b></div>`;
  $('#mk-art').innerHTML = `<svg width="390" height="304" style="position:absolute;left:0;top:0"><defs><linearGradient id="mkg" x1="0" x2="1"><stop offset="0" stop-color="#E6409A"/><stop offset=".5" stop-color="#9966FF"/><stop offset="1" stop-color="#4C97FF"/></linearGradient></defs><path class="ln" d="M215 250 C80 168 92 60 215 120 C338 60 350 168 215 250" fill="none" stroke="url(#mkg)" stroke-width="9" stroke-linecap="round"/></svg><img class="pen" src="${CAT}" alt=""><div style="position:absolute;left:12px;top:12px">${SV(B('stack', 'pen', 'pen down', { ext: 'pen' }), 0.6)}</div><div class="mon" style="position:absolute;right:12px;bottom:12px">7 + 5 = <b>12</b></div>`;
  $('#mk-story').innerHTML = `<div class="sun"></div><img src="${CAT}" alt="" style="position:absolute;left:36px;top:140px;width:96px"><img src="${CAT}" alt="" style="position:absolute;left:250px;top:146px;width:88px;transform:scaleX(-1);filter:hue-rotate(160deg)"><div class="bubble b1" style="position:absolute;left:84px;top:86px">হ্যালো বন্ধু!</div><div class="bubble b2" style="position:absolute;left:220px;top:96px">চলো খেলি!</div><div style="position:absolute;left:12px;bottom:12px">${SV(B('hat', 'events', 'when this sprite clicked'), 0.55)}</div>`;
  $('#mk-sim').innerHTML = `<div style="position:absolute;left:0;top:254px;width:390px;height:50px;background:#B9C8DD"></div><div class="sh"></div><div class="ball"></div><div style="position:absolute;left:12px;top:12px">${SV(B('stack', 'variables', 'change [speed] by (-1)'), 0.6)}</div><div style="position:absolute;left:12px;top:56px">${SV(B('stack', 'motion', 'change y by ([speed])'.replace('([speed])', '(speed)')), 0.6)}</div>`;
  SL['s-make'] = { reset() { $('#mk-n').textContent = 0; }, steps: [[1500, () => { if (INSTANT) return; let n = 0; every(2000, () => $('#mk-n').textContent = ++n); }]] };

  /* --- Outro: blocks → Python --- */
  (function () {
    const OR = 'control';
    const R = [
      [B('cf', OR, 'forever'), 'while True:', '<span class="k">while</span> <span class="t">True</span>:', 70],
      [B('c', OR, 'repeat (10)'), 'for i in range(10):', '<span class="k">for</span> <span class="v">i</span> <span class="k">in</span> <span class="f">range</span>(<span class="n">10</span>):', 230],
      [B('c', OR, ['if ', { k: 'x', b: B('bool', 'operators', [{ k: 'x', b: B('rep', 'variables', 'score') }, ' > (10)']) }, ' then']), 'if score > 10:', '<span class="k">if</span> <span class="v">score</span> &gt; <span class="n">10</span>:', 390],
      [B('stack', 'variables', 'set [score] to (0)'), 'score = 0', '<span class="v">score</span> = <span class="n">0</span>', 570],
      [B('bool', 'operators', '<> and <>'), 'a and b', '<span class="v">a</span> <span class="k">and</span> <span class="v">b</span>', 680]
    ];
    const box = $('#ou-rows');
    box.innerHTML = R.map((r, i) => `<div class="orow" id="ou-r${i}" style="top:${r[3]}px"><div class="lf">${SV(r[0], 1.15)}</div><div class="ar">→</div><div class="code" id="ou-c${i}"></div></div>`).join('');
    const es = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    function type(i) { const e = $('#ou-c' + i), p = R[i][1]; let n = 0; const t = setInterval(() => { n++; e.innerHTML = es(p.slice(0, n)) + '<span class="cu"></span>'; if (n >= p.length) { clearInterval(t); e.innerHTML = R[i][2]; } }, 55); T.push(t); }
    SL['s-outro'] = {
      reset() { R.forEach((r, i) => { on($('#ou-r' + i), 0); $('#ou-c' + i).innerHTML = ''; }); $('#ou-cap').style.opacity = 0; },
      steps: R.flatMap((r, i) => [[400 + i * 1700, () => on($('#ou-r' + i), 1)], [900 + i * 1700, () => { if (INSTANT) $('#ou-c' + i).innerHTML = R[i][2]; else type(i); }]]).concat([[9400, () => $('#ou-cap').style.opacity = 1]])
    };
  })();

  /* --- Thanks --- */
  (function () {
    const pool = [B('stack', 'motion', 'move (10) steps'), B('stack', 'looks', 'next costume'), B('rep', 'operators', 'pick random (1) to (10)'), B('hat', 'events', 'when @flag clicked'), B('stack', 'sound', 'start sound [Meow]'), B('bool', 'sensing', 'mouse down?'), B('stack', 'variables', 'change [score] by (1)'), B('stack', 'myblocks', 'jump'), B('stack', 'control', 'wait (1) seconds')];
    let h = '';
    for (let i = 0; i < 22; i++) {
      const b = pool[i % pool.length];
      h += `<div class="conf" style="left:${(i * 89) % 1860}px;--r:${(i % 2 ? 1 : -1) * (90 + i * 12)}deg;animation-duration:${7 + (i * 7) % 6}s;animation-delay:${-((i * 1.3) % 11).toFixed(1)}s;opacity:.55">${SV(b, 0.5 + (i % 3) * 0.12)}</div>`;
    }
    $('#th-conf').innerHTML = h;
    $('#th-blocks').innerHTML = SV([B('hat', 'events', 'when @flag clicked'), B('stack', 'looks', 'say (Imagine · Program · Share!)')], 1.3);
  })();

  /* ============ engine ============ */
  const stage = $('#stage'), slides = $$('.slide', stage);
  let cur = -1;
  function fit() {
    SCALE = Math.min(innerWidth / 1920, innerHeight / 1080);
    stage.style.transform = `translate(${(innerWidth - 1920 * SCALE) / 2}px,${(innerHeight - 1080 * SCALE) / 2}px) scale(${SCALE})`;
  }
  function enter(i) {
    T.forEach(t => { clearTimeout(t); clearInterval(t); }); T = [];
    const s = slides[i], d = SL[s.id] || {};
    s.classList.add('nt'); s.classList.remove('run');
    d.reset && d.reset(); void s.offsetWidth;
    if (RM) { INSTANT = true; (d.steps || []).forEach(x => x[1]()); INSTANT = false; void s.offsetWidth; s.classList.remove('nt'); return; }
    s.classList.remove('nt'); void s.offsetWidth; s.classList.add('run');
    (d.steps || []).forEach(([t, f]) => at(t, f));
  }
  function show(i) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    if (cur >= 0 && cur !== i) slides[cur].classList.remove('on');
    cur = i; slides[i].classList.add('on'); enter(i);
    $('#b-ct').textContent = bn(i + 1) + ' / ' + bn(slides.length);
    $('#bar').style.width = ((i + 1) / slides.length * 100) + '%';
    try { history.replaceState(null, '', '#' + (i + 1)); } catch (e) { /* ignore */ }
  }
  fit();
  // Prepare every slide in its finished state, so any frame you land on is complete.
  slides.forEach((s, i) => { const d = SL[s.id]; if (!d) return; INSTANT = true; s.classList.add('nt'); d.reset && d.reset(); (d.steps || []).forEach(x => x[1]()); INSTANT = false; T.forEach(t => { clearTimeout(t); clearInterval(t); }); T = []; });
  slides.forEach(s => s.classList.remove('nt'));

  fit(); addEventListener('resize', () => { fit(); });
  const next = () => show(cur + 1), prev = () => show(cur - 1);
  addEventListener('keydown', e => {
    if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(e.key)) { e.preventDefault(); next(); }
    else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(e.key)) { e.preventDefault(); prev(); }
    else if (e.key === 'Home') show(0); else if (e.key === 'End') show(slides.length - 1);
    else if (e.key === 'r' || e.key === 'R') enter(cur);
    else if (e.key === 'f' || e.key === 'F') full();
  });
  stage.addEventListener('click', next);
  function full() { const d = document; if (!d.fullscreenElement) { (d.documentElement.requestFullscreen || function () {}).call(d.documentElement); } else d.exitFullscreen(); }
  $('#b-next').onclick = next; $('#b-prev').onclick = prev; $('#b-replay').onclick = () => enter(cur); $('#b-full').onclick = full;
  const hud = $('#hud'); let idle;
  const wake = () => { hud.classList.remove('idle'); clearTimeout(idle); idle = setTimeout(() => hud.classList.add('idle'), 2600); };
  addEventListener('mousemove', wake); wake();
  const start = parseInt((location.hash || '').slice(1), 10);
  document.fonts && document.fonts.ready.then(() => {}).catch(() => {});
  show(start > 0 ? start - 1 : 0);
})();
