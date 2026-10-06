/* Scratch 3.0 block renderer.
   Geometry follows scratch-blocks (vertical renderer): 4px grid, 48-unit stack height,
   36-unit notch starting 12 units in, 16-unit C-arm, 96-unit hat cap, 12pt Helvetica text.
   Spec mini-language for block text:
     (10)  white number/text input      [space]  dropdown pill
     <>    empty boolean slot           {#E6409A} colour swatch
     @flag @cw @ccw  icons              nested blocks: pass an array with {k:'x', b:{...}} items  */
window.SB = (function () {
  const COL = {
    motion: ['#4C97FF', '#4280D7', '#3373CC'],
    looks: ['#9966FF', '#855CD6', '#774DCB'],
    sound: ['#CF63CF', '#C94FC9', '#BD42BD'],
    events: ['#FFBF00', '#E6AC00', '#CC9900'],
    control: ['#FFAB19', '#EC9C13', '#CF8B17'],
    sensing: ['#5CB1D6', '#47A8D1', '#2E8EB8'],
    operators: ['#59C059', '#46B946', '#389438'],
    variables: ['#FF8C1A', '#FF8000', '#DB6E00'],
    myblocks: ['#FF6680', '#FF4D6A', '#FF3355'],
    pen: ['#0FBD8C', '#0DA57A', '#0B8E69']
  };
  const FF = '"Helvetica Neue", Helvetica, Arial, sans-serif';
  const ctx = document.createElement('canvas').getContext('2d');
  function tw(t) { ctx.font = '500 16px ' + FF; return Math.ceil(ctx.measureText(t).width); }

  const NL = 'c2,0 3,1 4,2 l4,4 c1,1 2,2 4,2 h12 c2,0 3,-1 4,-2 l4,-4 c1,-1 2,-2 4,-2';
  const NR = 'c-2,0 -3,1 -4,2 l-4,4 c-1,1 -2,2 -4,2 h-12 c-2,0 -3,-1 -4,-2 l-4,-4 c-1,-1 -2,-2 -4,-2';
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

  function parse(t) {
    if (Array.isArray(t)) return t.flatMap(x => (typeof x === 'string' ? parse(x) : [Object.assign({}, x)]));
    const out = [], re = /\(([^)]*)\)|\[([^\]]*)\]|<>|\{(#[0-9a-fA-F]{6})\}|@(\w+)/g;
    let m, last = 0;
    const txt = s => { s = s.trim(); if (s) out.push({ k: 't', v: s }); };
    while ((m = re.exec(t))) {
      txt(t.slice(last, m.index));
      if (m[1] !== undefined) out.push({ k: 'n', v: m[1] });
      else if (m[2] !== undefined) out.push({ k: 'd', v: m[2] });
      else if (m[3]) out.push({ k: 'c', v: m[3] });
      else if (m[4]) out.push({ k: 'i', v: m[4] });
      else out.push({ k: 'b' });
      last = re.lastIndex;
    }
    txt(t.slice(last));
    return out;
  }

  function size(it) {
    switch (it.k) {
      case 't': it.w = tw(it.v); it.h = 20; break;
      case 'n': it.w = Math.max(40, tw(it.v) + 22); it.h = 32; break;
      case 'd': it.w = tw(it.v) + 46; it.h = 32; break;
      case 'b': it.w = 48; it.h = 32; break;
      case 'c': it.w = 40; it.h = 32; break;
      case 'i': it.w = 24; it.h = 24; break;
      case 's': it.w = 1; it.h = 40; break;
      case 'x': it.r = draw(it.b); it.w = it.r.w; it.h = it.r.h; break;
    }
  }

  const FLAG = '<path d="M20.8 3.7c-.4-.2-.9-.1-1.2.2-2 1.6-4.8 1.6-6.8 0-2.3-1.9-5.6-2.3-8.3-1v-.4c0-.6-.5-1-1-1s-1 .4-1 1v18.8c0 .5.5 1 1 1h.1c.5 0 1-.5 1-1v-6.4c1-.7 2.1-1.2 3.4-1.3 1.2 0 2.4.4 3.4 1.2 2.9 2.3 7 2.3 9.8 0 .3-.2.4-.5.4-.9V4.7c0-.5-.3-.9-.8-1zm-.3 10.2C18 16 14.4 16 11.9 14c-1.1-.9-2.5-1.4-4-1.4-1.2.1-2.3.5-3.4 1.1V4c2.5-1.4 5.5-1.1 7.7.6 2.4 1.9 5.7 1.9 8.1 0h.2l.1.1-.1 9.2z" fill="#45993D"/><path d="M20.6 4.8l-.1 9.1v.1c-2.5 2-6.1 2-8.6 0-1.1-.9-2.5-1.4-4-1.4-1.2.1-2.3.5-3.4 1.1V4c2.5-1.4 5.5-1.1 7.7.6 2.4 1.9 5.7 1.9 8.1 0h.2c0 .1.1.1.1.2z" fill="#4CBF56"/>';
  function rot(c) {
    const a = 'M17.6 9.2A7 7 0 1 0 18.9 14', b = 'M13.4 9.6h4.6V5';
    return `<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${a}" stroke="${c[2]}" stroke-width="5"/><path d="${b}" stroke="${c[2]}" stroke-width="5"/><path d="${a}" stroke="#fff" stroke-width="2.4"/><path d="${b}" stroke="#fff" stroke-width="2.4"/></g>`;
  }
  const PEN = '<rect x="0" y="0" width="24" height="24" rx="4" fill="#fff" fill-opacity=".9"/><path d="M5 19l1.4-4.6L15.6 5.2l3.2 3.2-9.2 9.2z" fill="#0FBD8C" stroke="#0B8E69" stroke-width="1.2" stroke-linejoin="round"/><path d="M5 19l1.4-4.6 3.2 3.2z" fill="#575E75"/>';
  function icon(v, x, cy, c) {
    const y = cy - 12;
    if (v === 'flag') return `<g transform="translate(${x},${y})">${FLAG}</g>`;
    if (v === 'cw') return `<g transform="translate(${x},${y})">${rot(c)}</g>`;
    if (v === 'ccw') return `<g transform="translate(${x + 24},${y}) scale(-1,1)">${rot(c)}</g>`;
    if (v === 'pen') return `<g transform="translate(${x},${y})">${PEN}</g>`;
    return '';
  }

  function item(it, x, h, c) {
    const cy = h / 2;
    switch (it.k) {
      case 't': return `<text x="${x}" y="${cy}" class="sbt">${esc(it.v)}</text>`;
      case 'n': return `<rect x="${x}" y="${cy - 16}" width="${it.w}" height="32" rx="16" fill="#fff" stroke="${c[2]}" stroke-opacity=".55"/><text x="${x + it.w / 2}" y="${cy}" class="sbn">${esc(it.v)}</text>`;
      case 'd': return `<rect x="${x}" y="${cy - 16}" width="${it.w}" height="32" rx="16" fill="${c[1]}" stroke="${c[2]}"/><text x="${x + 12}" y="${cy}" class="sbt">${esc(it.v)}</text><path d="M${x + it.w - 22} ${cy - 2.5} l5 5 l5 -5" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
      case 'b': return `<path d="M${x + 16} ${cy - 16} h16 l16 16 l-16 16 h-16 l-16 -16 z" fill="${c[2]}" class="slot"/>`;
      case 'c': return `<rect x="${x}" y="${cy - 16}" width="40" height="32" rx="16" fill="${it.v}" stroke="#fff" stroke-width="2"/>`;
      case 'i': return icon(it.v, x, cy, c);
      case 's': return `<line x1="${x}" x2="${x}" y1="0" y2="${h}" stroke="${c[2]}" stroke-opacity=".35"/>`;
      case 'x': return `<g transform="translate(${x},${cy - it.h / 2})">${it.r.g}</g>`;
    }
    return '';
  }

  const pStack = (w, h, bump) => `M0,4 A4,4 0 0,1 4,0 H12 ${NL} H${w - 4} A4,4 0 0,1 ${w},4 V${h - 4} A4,4 0 0,1 ${w - 4},${h} ` + (bump ? `H48 ${NR} ` : '') + `H4 A4,4 0 0,1 0,${h - 4} Z`;
  const pHat = (w, h) => `M0,0 c25,-22 71,-22 96,0 H${w - 4} A4,4 0 0,1 ${w},4 V${h - 4} A4,4 0 0,1 ${w - 4},${h} H48 ${NR} H4 A4,4 0 0,1 0,${h - 4} Z`;
  const pDef = (w, h) => `M0,20 A20,20 0 0,1 20,0 H${w - 20} A20,20 0 0,1 ${w},20 V${h - 4} A4,4 0 0,1 ${w - 4},${h} H48 ${NR} H4 A4,4 0 0,1 0,${h - 4} Z`;
  const pRep = (w, h) => `M${h / 2},0 H${w - h / 2} A${h / 2},${h / 2} 0 0,1 ${w - h / 2},${h} H${h / 2} A${h / 2},${h / 2} 0 0,1 ${h / 2},0 Z`;
  const pBool = (w, h) => `M${h / 2},0 H${w - h / 2} L${w},${h / 2} L${w - h / 2},${h} H${h / 2} L0,${h / 2} Z`;
  function pC(w, parts, bump) {
    let y = 0, d = `M0,4 A4,4 0 0,1 4,0 H12 ${NL} H${w - 4} A4,4 0 0,1 ${w},4`;
    parts.forEach((p, i) => {
      if (p.bar) {
        y += p.bar;
        if (i === parts.length - 1) d += ` V${y - 4} A4,4 0 0,1 ${w - 4},${y} ` + (bump ? `H48 ${NR} ` : '') + `H4 A4,4 0 0,1 0,${y - 4} Z`;
        else d += ` V${y - 4} A4,4 0 0,1 ${w - 4},${y} H64 ${NR} H20 A4,4 0 0,0 16,${y + 4}`;
      } else {
        y += p.mouth;
        d += ` V${y - 4} A4,4 0 0,0 20,${y} H28 ${NL} H${w - 4} A4,4 0 0,1 ${w},${y + 4}`;
      }
    });
    return d;
  }

  function row(its, h, c, padL, padR) {
    let x = padL, g = '';
    its.forEach((it, i) => { if (i) x += 8; g += item(it, x, h, c); x += it.w; });
    return { g, w: x + padR };
  }

  const wrap = (b, g) => (b.id ? `<g id="${b.id}">${g}</g>` : g);

  function draw(b) {
    const c = COL[b.cat] || COL.motion;
    if (b.s === 'c' || b.s === 'cf' || b.s === 'ce') return drawC(b, c);
    const its = parse(b.t || '');
    if (b.ext) its.unshift({ k: 'i', v: b.ext }, { k: 's' });
    its.forEach(size);
    const R = b.s === 'rep', Bo = b.s === 'bool', P = b.s === 'proto';
    const mh = Math.max(0, ...its.map(i => i.h));
    const h = (R || Bo || P) ? Math.max(40, mh + 8) : Math.max(48, mh + 16);
    const side = it => Bo ? (it && it.k === 't' ? 20 : 12) : R ? (it && it.k === 't' ? 12 : 4) : 8;
    const r = row(its, h, c, side(its[0]), side(its[its.length - 1]));
    const w = Math.max(r.w, { hat: 100, stack: 64, cap: 64, def: 120 }[b.s] || 40);
    let d, top = 0, bot = 8, fill = c[0];
    if (b.s === 'hat') { d = pHat(w, h); top = 20; }
    else if (b.s === 'def') { d = pDef(w, h); }
    else if (b.s === 'cap') { d = pStack(w, h, 0); bot = 0; }
    else if (R) { d = pRep(w, h); bot = 0; }
    else if (Bo) { d = pBool(w, h); bot = 0; }
    else { d = pStack(w, h, 1); if (P) fill = c[1]; }
    return { w, h, top, bot, g: wrap(b, `<path d="${d}" fill="${fill}" stroke="${c[2]}"/>` + r.g) };
  }

  function drawC(b, c) {
    const its = parse(b.t || ''); its.forEach(size);
    const mh = Math.max(0, ...its.map(i => i.h)), th = Math.max(48, mh + 16);
    const head = row(its, th, c, 8, 8);
    const w = Math.max(160, head.w);
    const s1 = stack(b.in || []), parts = [{ bar: th }];
    let ext = Math.max(w, 16 + s1.w);
    let y = th, inner = `<g transform="translate(16,${y})">${s1.g}</g>`, extra = '';
    const m1 = Math.max(24, s1.h); parts.push({ mouth: m1 }); y += m1;
    if (b.s === 'ce') {
      const eh = 40; extra = `<text x="8" y="${y + eh / 2}" class="sbt">else</text>`;
      parts.push({ bar: eh }); y += eh;
      const s2 = stack(b.in2 || []), m2 = Math.max(24, s2.h); ext = Math.max(ext, 16 + s2.w);
      inner += `<g transform="translate(16,${y})">${s2.g}</g>`; parts.push({ mouth: m2 }); y += m2;
    }
    parts.push({ bar: 24 }); y += 24;
    const bump = b.s !== 'cf';
    return { w, ext, h: y, top: 0, bot: bump ? 8 : 0, g: wrap(b, `<path d="${pC(w, parts, bump)}" fill="${c[0]}" stroke="${c[2]}"/>` + head.g + extra + inner) };
  }

  function stack(list) {
    let y = 0, w = 0, g = '', top = 0, bot = 0; const pos = [];
    list.forEach((b, i) => {
      const r = draw(b);
      if (i === 0) top = r.top;
      pos.push({ y, h: r.h, w: r.w });
      g += `<g transform="translate(0,${y})">${r.g}</g>`;
      y += r.h; w = Math.max(w, r.ext || r.w); bot = r.bot;
    });
    return { g, w, h: y, top, bot, pos };
  }

  function svg(list, k, cls, attrs) {
    k = k || 1;
    const s = stack(Array.isArray(list) ? list : [list]);
    const W = s.w + 4, H = s.h + s.top + s.bot + 4;
    return `<svg class="sb ${cls || ''}" ${attrs || ''} width="${(W * k).toFixed(1)}" height="${(H * k).toFixed(1)}" viewBox="-2 ${-s.top - 2} ${W} ${H}">${s.g}</svg>`;
  }

  return { COL, svg, stack, draw, tw };
})();
