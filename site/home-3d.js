import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const S = await window.SIX.ready;
const MANGA = (window.QS && (window.QS.get('style') === 'manga' || !!window.QS.get('day'))); window.__styleManga = MANGA;
{ const lowEnd = (navigator.connection && navigator.connection.saveData) || (navigator.deviceMemory && navigator.deviceMemory <= 2);
  const lite = document.querySelector('#lite'); lite.textContent = S.T('lite');
  lite.addEventListener('click', () => { document.querySelector('#stagewrap').classList.add('off'); if (window.__six3dStop) window.__six3dStop(); });
  if (lowEnd) {
    const g = document.querySelector('#gate'); document.querySelector('#gatep').textContent = S.T('gatep'); const b = document.querySelector('#gateb'); b.textContent = S.T('gateb'); g.hidden = false;
    await new Promise(r => b.addEventListener('click', () => { g.hidden = true; r(); }, { once: true }));
  } }
const { D, BY, T, fmt, KEY } = S;
const m = D.meta, W = m.W, H = m.H;
const $ = s => document.querySelector(s);
const coarse = matchMedia('(pointer: coarse)').matches;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const stage = $('#stage'), canvas = $('#cv');

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: !coarse, powerPreference: 'high-performance' });
} catch (e) {
  $('#nogl').textContent = T('nogl'); $('#nogl').hidden = false; $('#clock').hidden = true; $('#modes').hidden = true; $('#reset').hidden = true;
  throw e;
}
const TD = await fetch(window.DATA_BASE + 'time.json').then(r => r.json());
renderer.setPixelRatio(Math.min(devicePixelRatio, coarse ? 1.5 : 2));
renderer.shadowMap.enabled = !coarse && !MANGA;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(26, 1, 10, 9000);
const HOME = { pos: new THREE.Vector3(-60, 1650, 1500), tgt: new THREE.Vector3(10, 0, 70) };
const HOME_DIR = HOME.pos.clone().sub(HOME.tgt).normalize();
let touched = false;
function fitHome() {
  const vf = THREE.MathUtils.degToRad(camera.fov), hf = 2 * Math.atan(Math.tan(vf / 2) * camera.aspect);
  const d = Math.max((W * 0.54) / Math.tan(hf / 2), (H * 0.40) / Math.tan(vf / 2));
  HOME.pos.copy(HOME.tgt).add(HOME_DIR.clone().multiplyScalar(d));
}
camera.position.copy(HOME.pos);
const controls = new OrbitControls(camera, canvas);
controls.target.copy(HOME.tgt);
controls.enableDamping = true; controls.dampingFactor = 0.08;
controls.minDistance = 260; controls.maxDistance = 5200;
controls.minPolarAngle = 0.2; controls.maxPolarAngle = 1.18; controls.autoRotateSpeed = 0.35;
controls.screenSpacePanning = false;
if (coarse) { controls.enableRotate = false; controls.enablePan = false; controls.enableZoom = true; }
controls.update();

const hemi = new THREE.HemisphereLight(0xfff8ec, 0x8a8170, 1.0); scene.add(hemi);
const sun = new THREE.DirectionalLight(0xfff1dc, 2.0);
sun.castShadow = !coarse; sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -W * 0.72, right: W * 0.72, top: H * 0.72, bottom: -H * 0.72, near: 50, far: 5000 });
sun.shadow.bias = -0.0006; sun.shadow.normalBias = 0.6;
scene.add(sun); scene.add(sun.target);

const board = new THREE.Mesh(new THREE.PlaneGeometry(W * 7, H * 7), new THREE.MeshLambertMaterial({ color: 0xcdc4b2 }));
board.rotation.x = -Math.PI / 2; board.position.y = -0.2; board.receiveShadow = !coarse; scene.add(board);

function rings(path) {
  const out = [];
  for (const seg of path.split('M').filter(Boolean)) {
    const s = seg.replace(/[zZ]/g, '').trim(); const [head, rest] = s.split('l');
    let [x, y] = head.split(',').map(Number); const ring = [[x, y]];
    if (rest) for (const p of rest.trim().split(/\s+/)) { const [dx, dy] = p.split(',').map(Number); x += dx; y += dy; ring.push([x, y]); }
    out.push(ring);
  }
  return out;
}
const BASE = 3, RAISE = 26, RAISE_HI = 42, SEL_H = 12;
const mats = {
  base: new THREE.MeshLambertMaterial({ color: 0xece5d6 }),
  raise: new THREE.MeshLambertMaterial({ color: 0xb5452c }),
  nh: new THREE.MeshLambertMaterial({ color: 0x9c9485 }),
  sel: new THREE.MeshLambertMaterial({ color: 0x1d1b17 }),
};
const edgeMat = new THREE.LineBasicMaterial({ color: 0x9a907e, transparent: true, opacity: 0.6 });
if (MANGA) { mats.base.color.set(0xfbf9f3); mats.nh.color.set(0xd9d4c9); edgeMat.color.set(0x1d1b17); edgeMat.opacity = 0.9; }
const V = [];
const villages = new THREE.Group(); scene.add(villages);
for (const r of D.li) {
  const shapes = rings(r.path).filter(g => g.length >= 3).map(g => new THREE.Shape(g.map(([x, y]) => new THREE.Vector2(x - W / 2, -(y - H / 2)))));
  const geo = new THREE.ExtrudeGeometry(shapes, { depth: 1, bevelEnabled: false });
  geo.rotateX(-Math.PI / 2);
  const mesh = new THREE.Mesh(geo, mats.base);
  mesh.castShadow = !coarse; mesh.receiveShadow = !coarse; mesh.scale.y = BASE; mesh.userData.c = r.c;
  if (!coarse || MANGA) mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo, 25), edgeMat));
  villages.add(mesh); V.push({ r, mesh, h: BASE, target: BASE });
}
const heightOf = i => (i >= 0 ? V[i].h : 0);

function inst(geo, color, n, emissive) {
  const mat = new THREE.MeshLambertMaterial({ color, emissive: emissive || 0x000000 });
  const im = new THREE.InstancedMesh(geo, mat, n); im.count = 0; im.castShadow = !coarse; im.frustumCulled = false; scene.add(im); return im;
}
const busGeo = new THREE.BoxGeometry(9, 4.2, 3.6); busGeo.translate(0, 2.1, 0);
const truckGeo = new THREE.BoxGeometry(7, 5, 5); truckGeo.translate(0, 2.5, 0);
const bodyGeo = new THREE.CylinderGeometry(1.3, 1.6, 6, 6); bodyGeo.translate(0, 3, 0);
const headGeo = new THREE.SphereGeometry(1.5, 8, 6); headGeo.translate(0, 7.4, 0);
const cupGeo = new THREE.CylinderGeometry(0.8, 0.6, 2.2, 6); cupGeo.translate(2, 4.6, 0);
const buses = inst(busGeo, 0x1d1b17, 2400);
const trucks = inst(truckGeo, 0x3d7a4d, 4010);
const people = [inst(bodyGeo, 0x1d1b17, 2000), inst(headGeo, 0x1d1b17, 2000), inst(cupGeo, 0xffffff, 2000)];
const pin = new THREE.Group();
{ const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 70, 6), mats.sel); pole.position.y = 35; pin.add(pole);
  const flag = new THREE.Mesh(new THREE.BoxGeometry(22, 13, 1.2), mats.raise); flag.position.set(11, 63, 0); pin.add(flag); }
pin.visible = false; scene.add(pin);

const SN = TD.buses.map(s => { const mp = new Map(); for (let k = 0; k < s.p.length; k += 4) mp.set(s.p[k], [s.p[k + 1], s.p[k + 2], s.p[k + 3]]); return { t: s.t, label: s.label, on: s.on, mp }; });
const busT = t => (t < 12 * 60 ? t + 1440 : t);
const red = D.stops.filter(s => s[2] === 0);
const tmp = new THREE.Object3D();
const VS = MANGA && coarse ? 1.5 : 1;
const wx = x => x - W / 2, wz = y => y - H / 2;

let MODE = 5, TM = 21 * 60 + 50, playing = false, sel = null, AUTO = !reduce;

const CH = S.CH; let ci = 0, ct = 0;
let lastSlot = -1, lastHour = -1, busInfo = null, truckN = 0;

function targets() {
  const hour = Math.floor(TM / 60);
  for (const v of V) {
    const r = v.r; let h = BASE, mat = mats.base;
    if (MODE === 1 && r.q1.short) { h = RAISE; mat = mats.raise; }
    else if (MODE === 3 && r.q3.in58) { h = RAISE; mat = mats.raise; }
    else if (MODE === 4 && r.q4.neihu) { h = 9; mat = mats.nh; }
    else if (MODE === 5 && TD.q5h[r.i][hour] === 'C') { h = RAISE; mat = mats.raise; }
    else if (MODE === 6 && r.q6.top33) { h = r.q6.pri ? RAISE_HI : RAISE; mat = mats.raise; }
    if (MODE === 0 && window.__raiseSet && window.__raiseSet.has(r.c)) { h = RAISE; mat = mats.raise; }
    if (sel === r.c) { mat = mats.sel; h = Math.max(h, SEL_H); }
    v.target = h; v.mesh.material = mat;
    if (reduce) { v.h = h; v.mesh.scale.y = h; }
  }
}

function placeTrucks() {
  const slot = Math.floor(TM / 30); const a = slot * 30, b = a + 30; let n = 0;
  for (const [x, y, t, f, vi] of TD.trucks) {
    if (t < a || t >= b) continue;
    tmp.position.set(wx(x), heightOf(vi), wz(y)); tmp.rotation.set(0, 0, 0); tmp.scale.setScalar((MODE === 3 ? 1.5 : 1) * VS); tmp.updateMatrix();
    trucks.setMatrixAt(n++, tmp.matrix);
  }
  trucks.count = n; trucks.instanceMatrix.needsUpdate = true; truckN = n;
}

function placeBuses() {
  const tb = busT(TM);
  if (tb < SN[0].t - 5 || tb > SN[SN.length - 1].t + 5) { buses.count = 0; busInfo = null; return; }
  let k = 0; while (k < SN.length - 1 && SN[k + 1].t <= tb) k++;
  const A = SN[k], B = SN[Math.min(k + 1, SN.length - 1)];
  const f = B.t > A.t ? Math.min(1, Math.max(0, (tb - A.t) / (B.t - A.t))) : 0;
  let n = 0;
  const put = (x, y, vi, ang) => { tmp.position.set(wx(x), heightOf(vi), wz(y)); tmp.rotation.set(0, ang, 0); tmp.scale.setScalar(VS); tmp.updateMatrix(); buses.setMatrixAt(n++, tmp.matrix); };
  for (const [id, a] of A.mp) {
    const b = B.mp.get(id);
    if (b) { const x = a[0] + (b[0] - a[0]) * f, y = a[1] + (b[1] - a[1]) * f; put(x, y, f < 0.5 ? a[2] : b[2], Math.atan2(-(b[1] - a[1]), b[0] - a[0])); }
    else if (f < 0.5) put(a[0], a[1], a[2], 0);
  }
  if (f >= 0.5) for (const [id, b] of B.mp) if (!A.mp.has(id)) put(b[0], b[1], b[2], 0);
  buses.count = n; buses.instanceMatrix.needsUpdate = true;
  const near = f < 0.5 ? A : B; busInfo = { n, label: near.label };
}

function placePeople(time) {
  if (MODE !== 2) { for (const p of people) p.count = 0; return; }
  let n = 0;
  for (let i = 0; i < red.length; i++) {
    const [x, y] = red[i]; const bob = reduce ? 0 : Math.sin(time * 2.2 + i * 1.7) * 0.6;
    tmp.position.set(wx(x), BASE + bob, wz(y)); tmp.rotation.set(0, (i * 2.399) % 6.283, 0); tmp.scale.setScalar(1); tmp.updateMatrix();
    for (const p of people) p.setMatrixAt(n, tmp.matrix);
    n++;
  }
  for (const p of people) { p.count = n; p.instanceMatrix.needsUpdate = true; }
}

const C = (a, b, t) => new THREE.Color(a).lerp(new THREE.Color(b), t);
function light() {
  const rise = 5 * 60 + 55, set = 17 * 60 + 25;
  let el, az;
  if (TM > rise && TM < set) { const u = (TM - rise) / (set - rise); el = Math.sin(Math.PI * u) * 52; az = 100 + u * 160; }
  else { el = -8; az = 0; }
  const day = Math.max(0, Math.min(1, (el + 4) / 18));
  const r = THREE.MathUtils.degToRad;
  const dir = new THREE.Vector3(Math.sin(r(az)) * Math.cos(r(Math.max(el, 6))), Math.sin(r(Math.max(el, 6))), -Math.cos(r(az)) * Math.cos(r(Math.max(el, 6))));
  sun.position.copy(dir.multiplyScalar(2200)); sun.intensity = 2.3 * day;
  hemi.intensity = 1.05 + 0.05 * day;
  hemi.color.copy(C(0x8e98b8, 0xfff8ec, day)); hemi.groundColor.copy(C(0x3c4152, 0x8a8170, day));
  mats.raise.emissive.copy(C(0x5a1e12, 0x000000, day));
  const warm = el > 0 && el < 14 ? (14 - el) / 14 : 0;
  sun.color.copy(C(0xfff1dc, 0xffc59a, warm));
  const bg = MANGA ? C(0x3a4358, 0xe9e5dc, day) : C(0x3b4050, 0xcdc4b2, day); board.material.color.copy(bg);
  if (MANGA) { mats.base.color.copy(C(0x67708a, 0xfbf9f3, day)); edgeMat.color.copy(C(0xf3efe6, 0x1d1b17, day));
    hemi.intensity = 1.7 + 0.6 * day; hemi.color.copy(C(0xb8c0d8, 0xffffff, day)); hemi.groundColor.copy(C(0x30364a, 0xa9a69e, day)); sun.color.set(0xffffff); sun.intensity = 1.0 * day; }
  renderer.setClearColor(bg); stage.style.background = '#' + bg.getHexString();
  buses.material.emissive.copy(C(0xffd27a, 0x000000, day)); buses.material.emissiveIntensity = 1 - day * 0.9;
  trucks.material.emissive.copy(C(0x5fd07a, 0x000000, day)); trucks.material.emissiveIntensity = 0.55 * (1 - day);
}

function captions() {
  const L = m.lists, hour = Math.floor(TM / 60), hh = String(hour).padStart(2, '0'), mm = String(TM % 60).padStart(2, '0');
  $('#tnow').textContent = `${hh}:${mm}`;
  let c1 = T('c0');
  if (MODE === 1) c1 = `${T('cap1l')}　${T('capn', { n: L['1'].n, p: fmt(L['1'].pop) })}`;
  if (MODE === 2) c1 = `${T('cap2l')}　${T('cap2n', { n: fmt(m.q2_none100), t: fmt(m.q2_stops) })}；${T('c2b')}`;
  if (MODE === 3) { const a = Math.floor(TM / 30) * 30, b = a + 30, f = x => `${String(Math.floor(x / 60) % 24).padStart(2, '0')}:${String(x % 60).padStart(2, '0')}`;
    const n58 = TD.trucks.filter(t => t[2] >= a && t[2] < b && t[3]).length; c1 = T('c3t', { a: f(a), b: f(b), n: fmt(truckN), m: fmt(n58) }); }
  if (MODE === 4) c1 = T('cap4l');
  if (MODE === 5) c1 = T('c5t', { h: hh, n: fmt(TD.q5h.filter(s => s[hour] === 'C').length) });
  if (MODE === 6) c1 = `${T('cap6l')}　${T('capp', { p: fmt(L['6'].pop) })}；${T('c6b')}`;
  $('#cap1').textContent = c1;
  const sw = c => `<span class="sw" style="background:${c}"></span>`;
  let c2 = busInfo ? sw('#1d1b17') + S.esc(T('bus', { n: fmt(busInfo.n), d: busInfo.label })) : S.esc(T('busno'));
  if (MODE !== 3 && truckN) c2 += '　' + sw('#3d7a4d') + S.esc(T('trk', { n: fmt(truckN) }));
  $('#cap2').innerHTML = c2;
}

function setTime(t) {
  TM = ((Math.round(t) % 1440) + 1440) % 1440; $('#t').value = TM;
  const slot = Math.floor(TM / 30), hour = Math.floor(TM / 60);
  if (slot !== lastSlot) { lastSlot = slot; }
  if (hour !== lastHour) { lastHour = hour; targets(); }
  placeBuses(); placeTrucks(); light(); captions();
}

const modes = $('#modes');
modes.innerHTML = `<span class="ml">${S.esc(T('modesl'))}</span>` + [1, 2, 3, 4, 5, 6].map(k => `<button type="button" data-k="${k}" aria-pressed="${k === MODE}">${S.esc(T('m' + k))}</button>`).join('');
modes.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return; const k = +b.dataset.k;
  const i = CH.findIndex(c => c.k === k); setAuto(true); startChapter(i);
});
const play = $('#play'), autoB = $('#auto');
const setPlay = p => { playing = p; play.textContent = T(p ? 'pause' : 'play'); };
function setMode(k) { if (MODE === k) return; MODE = k; modes.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(+x.dataset.k === MODE))); targets(); placeTrucks(); placePeople(0); captions(); }
function chapterCam(c) {
  const sel_ = D.li.filter(r => c.k === 4 ? r.q4.neihu : c.k === 2 ? r.q2.none > 0 : KEY[c.k](r));
  let x = 0, z = 0; for (const r of sel_) { x += wx(r.cx); z += wz(r.cy); } x /= sel_.length; z /= sel_.length;
  const near = { 6: 0.62, 1: 0.78, 2: 0.66, 4: 0.5, 3: 0.6, 5: 0.95 }[c.k];
  const az = { 6: -0.35, 1: 0.25, 2: -0.15, 4: 0.45, 3: -0.3, 5: 0.1 }[c.k];
  const dir = HOME_DIR.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), az);
  const d = HOME.pos.distanceTo(HOME.tgt) * near, tgt = new THREE.Vector3(x * (c.k === 5 ? 0.3 : 1), 0, z * (c.k === 5 ? 0.3 : 1));
  return [tgt.clone().add(dir.multiplyScalar(d)), tgt];
}
function startChapter(i) { ci = (i + CH.length) % CH.length; ct = 0; const c = CH[ci];
  setMode(c.k); setTime(c.t0); const [p, tg] = chapterCam(c); fly(p, tg); S.showChapter(ci); }
function setAuto(a) { AUTO = a; autoB.setAttribute('aria-pressed', String(a)); autoB.textContent = T('auto'); controls.autoRotate = a && !reduce;
  S.pauseStory(!a); if (a) setPlay(true); }
autoB.addEventListener('click', () => setAuto(!AUTO));
play.addEventListener('click', () => { setPlay(!playing); if (!playing) setAuto(false); });
$('#t').addEventListener('input', e => { setAuto(false); setPlay(false); setTime(+e.target.value); });
$('#reset').textContent = T('reset');
$('#reset').addEventListener('click', () => fly(HOME.pos, HOME.tgt));
$('#dhint').textContent = T(coarse ? 'hintm' : 'hintd');
const pct = x => (x / 1440 * 100) + '%';
Object.assign($('#band1').style, { left: '0%', width: pct(7 * 60 + 17) });
Object.assign($('#band2').style, { left: pct(21 * 60 + 45), width: pct(1440 - (21 * 60 + 45)) });
$('#band1').title = $('#band2').title = T('band');

const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(); let down = null;
canvas.addEventListener('pointerdown', e => { down = [e.clientX, e.clientY]; touched = true; if (AUTO) setAuto(false); });
canvas.addEventListener('pointerup', e => {
  if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6) return;
  const hit = pick(e); if (hit) { S.select(hit, false, true); }
});
const tip = $('#tip');
canvas.addEventListener('pointermove', e => {
  if (e.pointerType !== 'mouse') return; const hit = pick(e);
  if (!hit) { tip.hidden = true; canvas.style.cursor = ''; return; }
  const r = BY[hit]; tip.textContent = `${r.d} ${r.n}`; tip.hidden = false; tip.style.left = (e.clientX + 12) + 'px'; tip.style.top = (e.clientY + 12) + 'px'; canvas.style.cursor = 'pointer';
});
canvas.addEventListener('pointerleave', () => { tip.hidden = true; });
function pick(e) {
  const b = canvas.getBoundingClientRect(); ndc.set(((e.clientX - b.left) / b.width) * 2 - 1, -((e.clientY - b.top) / b.height) * 2 + 1);
  ray.setFromCamera(ndc, camera); const h = ray.intersectObjects(villages.children, false)[0];
  return h ? h.object.userData.c : null;
}

let flight = null;
function fly(pos, tgt) {
  if (reduce) { camera.position.copy(pos); controls.target.copy(tgt); controls.update(); return; }
  flight = { t0: performance.now(), p0: camera.position.clone(), q0: controls.target.clone(), p1: pos.clone(), q1: tgt.clone() };
}
S.on3d = (c, from3d) => {
  if (c && AUTO) setAuto(false);
  sel = c; targets();
  $('#dhint').hidden = !!c;
  if (!c) { pin.visible = false; $('#seecard').hidden = true; return; }
  const r = BY[c]; const tgt = new THREE.Vector3(wx(r.cx), 0, wz(r.cy));
  pin.position.set(tgt.x, 0, tgt.z); pin.visible = true;
  const off = new THREE.Vector3(-40, 760, 640); fly(tgt.clone().add(off), tgt);
  const sc = $('#seecard'); sc.textContent = T('seecard', { n: `${r.d} ${r.n}` }); sc.hidden = !(from3d && innerWidth < 1000);
};
$('#seecard').addEventListener('click', () => { $('#card').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); $('#seecard').hidden = true; });

function resize() { const w = stage.clientWidth, h = stage.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); fitHome(); if (!touched && !sel && !flight) { camera.position.copy(HOME.pos); controls.target.copy(HOME.tgt); controls.update(); } }
new ResizeObserver(resize).observe(stage); resize();
targets(); setTime(TM); placePeople(0); setAuto(AUTO); if (AUTO) startChapter(0);
const clock = new THREE.Clock(); let acc = 0;
renderer.setAnimationLoop(() => {
  const dt = Math.min(0.05, clock.getDelta()), el = clock.elapsedTime;
  if (AUTO && playing) { ct += dt; const c = CH[ci]; const tm = Math.round(c.t0 + (c.t1 - c.t0) * Math.min(1, ct / c.dur)); if (tm !== TM) setTime(tm); S.storyTick(ci, ct); if (ct >= c.dur) startChapter(ci + 1); }
  else if (playing) { acc += dt * 24; if (acc >= 1) { const s = Math.floor(acc); acc -= s; setTime(TM + s); } }
  let moving = false;
  for (const v of V) { const d = v.target - v.h; if (Math.abs(d) > 0.05) { v.h += d * Math.min(1, dt * 7); v.mesh.scale.y = v.h; moving = true; } }
  if (moving) { placeTrucks(); placeBuses(); }
  if (sel) { const r = BY[sel]; pin.position.y = V[r.i].h; }
  if (MODE === 2) placePeople(el);
  if (flight) { const u = Math.min(1, (performance.now() - flight.t0) / 900), e = 1 - Math.pow(1 - u, 3);
    camera.position.lerpVectors(flight.p0, flight.p1, e); controls.target.lerpVectors(flight.q0, flight.q1, e); if (u >= 1) flight = null; }
  controls.update(); renderer.render(scene, camera);
});
window.__q5n22 = TD.q5h.filter(s => s[22] === 'C').length;
window.__six3dProject = (x, y, h = 0) => { const v = new THREE.Vector3(wx(x), h, wz(y)).project(camera); const r = canvas.getBoundingClientRect(); return { x: (v.x + 1) / 2 * r.width, y: (1 - v.y) / 2 * r.height }; };
window.__six3dLi = c => { const r = BY[c]; return window.__six3dProject(r.cx, r.cy, V[r.i].h); };
window.__six3dCam = (tx, ty, near, az) => { const tgt = new THREE.Vector3(wx(tx), 0, wz(ty)); const dir = HOME_DIR.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), az || 0);
  camera.position.copy(tgt.clone().add(dir.multiplyScalar(HOME.pos.distanceTo(HOME.tgt) * near))); controls.target.copy(tgt); controls.update(); flight = null; };
window.__six3dStop = () => { renderer.setAnimationLoop(null); renderer.dispose(); };
window.__six3d = { refresh: () => { targets(); placeTrucks(); placeBuses(); }, setPlay, setTime, setMode: k => { setAuto(false); setMode(k); }, setAuto, startChapter, state: () => ({ AUTO, MODE, TM, playing, ci, ct: Math.round(ct * 10) / 10, buses: buses.count, trucks: trucks.count, busInfo }), ready: true };
