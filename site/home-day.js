const wait = async f => { for (let i = 0; i < 900 && !f(); i++) await new Promise(r => setTimeout(r, 100)); };
const lite = () => { const g = document.getElementById('gate'), ng = document.getElementById('nogl'); return (g && !g.hidden) || (ng && !ng.hidden); };
const TX = []; window.__dayTexts = TX;
const V = (k, s) => (TX.push([k, s]), s), N = s => (TX.push([0, s]), s);

const RC = { tag: N('回顧'), link: N('到部落格讀這篇'), note: N('個人作品，不是臺北市政府或活動主辦單位的網站。') };
const RECAP_CSS = `.recap{background:#fbf9f3;color:#1d1b17;border-top:3px solid #1d1b17;padding-inline:16px;padding-block:40px 72px}
.recap .rc-in{max-width:680px;margin:0 auto;font-size:17px;line-height:1.85}
.recap .rc-k{display:inline-block;margin:0;background:#b5452c;color:#fff;font-size:13px;font-weight:800;padding:2px 9px;letter-spacing:.06em}
.recap h2{font-size:clamp(24px,5vw,32px);line-height:1.35;margin:12px 0 22px;text-wrap:balance}
.recap h3{font-size:20px;margin:40px 0 10px;padding-top:12px;border-top:2px solid #1d1b17}
.recap p{margin:0 0 14px}
.recap blockquote{margin:0 0 16px;padding:10px 16px;border-left:5px solid #b5452c;background:#f1ece2;font-weight:700}
.recap blockquote p{margin:0}
.recap ul,.recap ol{margin:0 0 16px;padding-left:1.4em}
.recap li{margin:0 0 6px}
.recap .dy-link{display:inline-block;margin-top:8px;color:#1d1b17;font-weight:700;font-size:14px;text-underline-offset:3px}
.recap .rc-note{margin:36px 0 0;padding-top:14px;border-top:1px solid #d6d0c4;font-size:13px;line-height:1.6;color:#6b665c}`;
function mountRecap(place, esc) {
  const st = document.createElement('style'); st.textContent = RECAP_CSS; document.head.appendChild(st);
  const el = document.createElement('section'); el.className = 'recap'; el.id = 'recap';
  el.innerHTML = `<div class="rc-in"><p class="rc-k">${esc(RC.tag)}</p><div class="rc-body"></div>${window.RECAP_URL ? `<p><a class="dy-link" href="${window.RECAP_URL}">${esc(RC.link)} →</a></p>` : ''}${(window.MORE_LINKS || []).map(l => `<p><a class="dy-link" href="${l.url}">${esc(l.text)} →</a></p>`).join('')}<p class="rc-note">${esc(RC.note)}</p></div>`;
  place(el);
  fetch(window.DATA_BASE + 'recap.html').then(r => r.ok ? r.text() : '').then(h => { el.querySelector('.rc-body').innerHTML = h; }).catch(() => {});
  return el;
}
await wait(() => (window.__six3d && window.__six3dProject && window.SIX && window.SIX.D && window.SIX.relation) || lite());
if (lite() || !window.__six3d) { document.documentElement.classList.remove('day'); mountRecap(el => document.querySelector('main').after(el), window.SIX.esc); await new Promise(() => {}); }
const S = window.SIX, D = S.D, BY = S.BY, fmt = S.fmt, esc = S.esc, six = window.__six3d, QS = window.QS;
const AB = window.ASSET_BASE || '', DEV = !window.PUBLIC_BUILD;
six.setAuto(false); six.setPlay(false);
const ART = !!window.ARTIFACT;

const PAGE = { 1: 'https://yojuhsu.com/2026-taipei-debug-trees', 2: 'https://yojuhsu.com/2026-taipei-debug-bins', 3: 'https://yojuhsu.com/2026-taipei-debug-rats',
  4: 'https://yojuhsu.com/2026-taipei-debug-traffic', 5: 'https://yojuhsu.com/2026-taipei-debug-bus', 6: 'https://yojuhsu.com/2026-taipei-debug-aging' };
const A6 = '63000020006', A13 = '63000030014', A25 = '63000110021', A4 = '63000100011';
const NAME = { 1: N('種樹'), 2: N('垃圾桶'), 3: N('鼠患'), 4: N('內湖塞車'), 5: N('公車'), 6: N('危老') };
const L_ASK = N('題目'), L_DATA = N('用了什麼資料'), L_ONE = N('一句話結論');
const CHS = [
  { k: 6, at: '09:00', t0: 8 * 60 + 40, t1: 9 * 60 + 40, li: A6, chars: [['girl_1', -0.78], ['elder_1', 0.78]], v: AB + 'media/q6.mp4', poster: AB + 'media/q6_poster.jpg',
    rows: [[L_ASK, V(6, '台北面臨「人老＋屋老」的雙老困境。')], [L_DATA, V(6, '用內政部銀髮安居指數（每個里裡住老公寓、獨居、行動不便、住液化區的老人各幾人）')], [L_ONE, V(6, '地會液化、老公寓多的 33 個里，住了全市七分之一的老公寓老人，危老核准只有三十一分之一；市府要先去敲門')]],
    hl: [V(6, '先去查這 7 個里：房子與人兩面都高')],
    rel: N('跟鼠患重疊：6 個里同時在兩題的名單上') },
  { k: 1, at: '12:00', t0: 11 * 60 + 40, t1: 12 * 60 + 40, li: A13, chars: [['trees_2', -0.6]], v: AB + 'media/q1.mp4', poster: AB + 'media/q1_poster.jpg',
    rows: [[L_ASK, V(1, '台北一年移除三千棵樹，我們要如何找出城市空間把樹種回來，達到樹蔭公平？')], [L_DATA, V(1, 'Meta 樹冠高度圖 v2，約 1.2 公尺一格，影像 2005 到 2020 年')], [L_ONE, V(1, '把三千棵樹種回來，先看這 499 個樹穴')]],
    rel: N('跟鼠患重疊：21 個里同時在兩題的名單上，住 124,893 人') },
  { k: 2, at: '15:00', t0: 14 * 60 + 40, t1: 15 * 60 + 40, li: A25, chars: [['drink_1', -0.6]], v: AB + 'media/q2.mp4', poster: AB + 'media/q2_poster.jpg',
    rows: [[L_ASK, V(2, '台北行人專用垃圾桶從全盛時期近 3,000 組，縮減到約 800 組。')], [L_DATA, [V(2, '公運處站位資料，2026-10-20'), V(2, '環保局位置資料，2026-09-30 更新')]], [L_ONE, V(2, '「找回消失的垃圾桶」這個題目，先要知道消失在哪裡。')]],
    stat: [V(2, '1,830'), V(2, '站牌 100 m 內什麼都沒有（53%）'), V(2, '共 3,460 個站牌')],
    rel: N('跟公車重疊：公車那 67 個交通不便的里，有 1,125 個站牌，891 個（79%）100 公尺內沒有垃圾桶也沒有超商；全市是 53%') },
  { k: 4, at: '17:30', t0: 17 * 60 + 10, t1: 18 * 60 + 10, li: A4, chars: [['princess_p3', -0.6]], v: AB + 'media/q4.mp4', poster: AB + 'media/q4_poster.jpg',
    rows: [[V(4, '為什麼看下班'), V(4, '題目問的是早上。這兩天，整段掉到最塞一級的時間，早上進內湖合計 2 分鐘，傍晚出內湖 415 分鐘')], [L_DATA, V(4, '捷運用班表與班距算；開車用交通局車流資料實測，10/21')],
      [L_ONE, V(4, '內科下班去市區：一樣約 7 點到松菸、直線距離差不多，搭捷運要比北車早 15 到 23 分鐘出發；開車不同時段離開，下堤頂的時間差超過 10 分鐘')]],
    rel: N('跟公車重疊：內湖區 39 個里當中，有 7 個也在「交通不便」的名單上') },
  { k: 3, at: '21:00', t0: 20 * 60 + 50, t1: 21 * 60 + 40, li: A13, chars: [['girl_4', -0.6]], v: AB + 'media/q3.mp4', poster: AB + 'media/q3_poster.jpg',
    rows: [[L_ASK, V(3, '傳統市場、夜市與餐飲聚落周邊的鼠患長年困擾市民，現行做法多停留在投藥與被動稽查。')], [L_DATA, V(3, '餐飲是開放街圖（OpenStreetMap）標記的店家，停靠點是環保局垃圾車點位路線（家戶收運），人孔是工務局水利工程處的雨水下水道人孔資料；夜市是市場處的夜市名單。')], [L_ONE, V(3, '這 21 個里，餐飲多、垃圾車停靠點少，下水道又是舊圖。是處理鼠患的高優先區，先做。')]],
    hl: [V(3, '58 個里，住了 33 萬人'), V(3, '垃圾清運的優先區域')],
    rel: N('跟種樹重疊：21 個里同時在兩題的名單上；跟危老重疊：6 個里') },
  { k: 5, at: '22:00', t0: 21 * 60 + 50, t1: 22 * 60 + 40, li: A25, chars: [['girl_5', -0.6]], v: AB + 'media/q5.mp4', poster: AB + 'media/q5_poster.jpg',
    rows: [[L_ASK, V(5, '台北公車路線長年疊床架屋，許多幹道路線與捷運高度重疊、互相競逐。')], [L_DATA, V(5, '一個里算交通便利：從這個里出發，搭公車或捷運，一小時內到得了全市八成的里（其他 455 個里裡的 364 個以上）。這一小時走路、等車都算在內，最多轉兩次車（搭三段車）。早上六點到晚上十點，每小時算一次。')], [L_ONE, V(5, '台北 35.4 萬人住在交通不便的里')]],
    reveal: V(5, '晚上九點，交通不便的里有 78 個；十點變 205 個；十一點以後，全市 456 個里都交通不便。'),
    rel: N('跟垃圾桶重疊：這 67 個里有 1,125 個站牌，891 個（79%）100 公尺內沒有垃圾桶也沒有超商；全市是 53%') },
];

const BADGES = [{ from: 4, li: A13, s: N('種樹 × 鼠患｜重疊 21 個里') }, { from: 4, li: A6, s: N('鼠患 × 危老｜重疊 6 個里') },
  { from: 5, li: A25, s: N('垃圾桶 × 公車｜重疊 891 個站牌') }, { from: 5, li: A4, s: N('內湖塞車 × 公車｜內湖區有 7 個里重疊') }];
const RT = []; window.__dayArticle = RT; const A = s => (RT.push(s), s);
const RECAP = { title: A('6題分析、13支影片，花了58小時、33.7億Token，我怎麼做，踩到哪些坑，一次給你看'),
  pts: [A('AI 很會算出對的答案，我負責問：這個答案對誰有用？'), A('驗證的門檻在算之前就寫死。沒過就不放，不回頭改門檻。'), A('六題裡有四題的預設被推翻或改寫。'), A('我只決定兩件事，要的方向，以及每一條能不能公開。'), A('做對的第一件，是規則先寫成文件和程式。')],
  imgs: [[6, 'media/q6_info.svg'], [1, 'media/q1_info.svg'], [2, 'media/q2_info.png'], [4, 'media/q4_info.webp'], [3, 'media/q3_info.png'], [5, 'media/q5_info.webp']],

  bots: [A('統籌'), A('種樹'), A('鼠患'), A('內湖塞車'), A('公車'), A('做影片'), A('網站上架'), A('中文校稿'), A('讀者審稿'), A('論述審稿'), A('插圖'), A('資料備份與監看')], cap: A('這 58 小時裡一起跑的 AI 有 12 個。5 個做專案：1 個統籌，自己做垃圾桶和危老；種樹、鼠患、內湖塞車、公車各一個。7 個協助：做影片、網站上架、中文校稿、讀者審稿、論述審稿、插圖、資料備份與監看。') };
const TXT = { brand: N('臺北市 市政Debug松｜六題總覽'), intro: N('從早上走到深夜，看市政Debug松的六題落在台北哪裡。地圖上紅色的，是每一題名單上的里。'),
  recapTag: RC.tag, recapRead: N('讀完整回顧 ↓'),
  link: N('看這題的完整頁面'), play: N('播放影片'), pause: N('暫停'), go: N('繼續'), done: N('6 / 6 看完了'), endQ: N('你住的里，跟哪幾題有關？'), ph: N('輸入里名，例如：中正里'),
  dl: N('下載這個里的圖卡'), share: N('分享首頁'), again: N('再看一次'), shareLine: N('六題看的是同一座城市，有幾個里會在不同題裡重複出現。'), copied: N('網址已複製'), notfound: N('找不到這個里。輸入里名就好，不用加區名，例如：中正里'),
  pick: N('有好幾個同名的里，請選哪一區的：'),
  rel0: N('這個里不在種樹、鼠患、公車、危老任何一份名單上。全市有 {n} 個里是這樣。'), rel1: N('這個里在{a}那題的名單上。全市有 {n} 個里只在一份名單上。'),
  rel2: N('這個里在{a}和{b}兩題的名單上都有。全市有 {n} 個里這樣，住 {p} 人。'), rel2one: N('這個里在{a}和{b}兩題的名單上都有，全市只有這一個里這樣。'), recapBtn: N('回顧 ↓'), sound: N('有聲播放'), recapLink: RC.link, showCard: N('看這個里的圖卡'), hold: N('長按圖卡可以存下來') };

const T_INTRO = 6, CHD = 15, T_RECAP = T_INTRO + CHS.length * CHD, RD = 24, T_END = T_RECAP + RD;
const RI = CHS.length, EI = CHS.length + 1;
const chStart = i => i === RI ? T_RECAP : T_INTRO + i * CHD, chAt = t => t < T_INTRO ? -1 : t < T_RECAP ? Math.floor((t - T_INTRO) / CHD) : t < T_END ? RI : EI;

const stage = document.getElementById('stage'), cv = document.getElementById('cv');
const css = document.createElement('style'); css.textContent = `
.dy{position:absolute;inset:0;pointer-events:none;font-family:"PingFang TC","Noto Sans TC",sans-serif;color:#1d1b17;z-index:4}
.dy *{box-sizing:border-box}
.dy button,.dy input{font-family:inherit}
.dy button,.dy input,.dy a,.dy video,.dy .dy-card,.dy .dy-end,.dy .dy-rs{pointer-events:auto}
.dy-svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.dy-route{fill:none;stroke:#1d1b17;stroke-width:3;stroke-dasharray:9 7}
.dy-lead{stroke:#1d1b17;stroke-width:1.5}
.dy-pin{fill:#b5452c;stroke:#1d1b17;stroke-width:2.5}
.dy-lab{position:absolute;transform:translate(-50%,0);background:#1d1b17;color:#fbf9f3;font-size:12px;font-weight:700;padding:2px 7px;white-space:nowrap}
.dy-badge{position:absolute;background:#fbf9f3;border:2px solid #1d1b17;box-shadow:3px 3px 0 #1d1b17;font-size:13px;font-weight:700;padding:3px 8px;white-space:nowrap;transition:opacity .4s}
.dy-badge b{color:#b5452c}
.dy-chr{position:absolute;height:var(--ch);transform:translate(-50%,-100%);transition:opacity .35s;filter:drop-shadow(0 2px 0 rgba(0,0,0,.08))}
.dy-top{position:absolute;left:12px;right:12px;top:10px;display:flex;flex-wrap:wrap;gap:8px;align-items:flex-start}
.dy-pill{background:#b5452c;color:#fff;font-size:13px;font-weight:700;padding:3px 9px}
.dy-clockw{margin-left:auto;display:flex;gap:6px;align-items:center}
.dy-clock{background:#1d1b17;color:#fbf9f3;font:800 22px/1.15 "PingFang TC",sans-serif;padding:3px 9px;font-variant-numeric:tabular-nums}
.dy-pp{font:inherit;font-size:13px;font-weight:700;padding:5px 10px;border:2px solid #1d1b17;background:#fbf9f3;color:#1d1b17;cursor:pointer}
.dy-stamps{flex-basis:100%;display:flex;gap:6px}
.dy-st{flex:1;max-width:96px;height:36px;border:2px solid #1d1b17;background:#fbf9f3;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:10px;line-height:1.15;font-weight:700;cursor:pointer;padding:0;color:#1d1b17}
.dy-st b{font-size:12px}
.dy-st.done{background:#b5452c;border-color:#b5452c;color:#fff}
.dy-st.now{outline:3px solid #b5452c;outline-offset:1px}
.dy-card,.dy-end,.dy-rs{position:absolute;background:#fbf9f3;border:2px solid #1d1b17;box-shadow:4px 4px 0 #1d1b17;padding:12px 14px;overflow:auto;transition:transform .45s cubic-bezier(.2,.8,.2,1),opacity .3s}
.dy-card.off,.dy-end.off,.dy-rs.off{opacity:0;pointer-events:none}
.dy-prog{height:3px;background:#e2dbcd;margin:-12px -14px 10px}
.dy-prog i{display:block;height:100%;width:0;background:#b5452c}
.dy-tag{display:inline-block;background:#b5452c;color:#fff;font-weight:800;font-size:13px;padding:1px 8px;margin-right:6px}
.dy-ct{font-size:17px;font-weight:800;line-height:1.4}
.dy-media{position:relative;margin:10px 0 8px;border:2px solid #1d1b17;background:#ece6da;display:flex;justify-content:center;align-items:center;overflow:hidden}
.dy-media img,.dy-media video{display:block;max-width:100%;max-height:100%;object-fit:contain}
.dy-play{position:absolute;inset:0;margin:auto;width:64px;height:64px;border-radius:50%;border:3px solid #1d1b17;background:#fbf9f3;font-size:0;cursor:pointer}
.dy-snd{position:absolute;right:8px;bottom:8px;font:inherit;font-size:13px;font-weight:800;padding:4px 10px;border:2px solid #1d1b17;background:#fbf9f3;color:#1d1b17;cursor:pointer}
.dy-play::after{content:"";position:absolute;left:24px;top:17px;border-left:20px solid #1d1b17;border-top:13px solid transparent;border-bottom:13px solid transparent}
.dy-rows{margin:6px 0 0;padding:0;list-style:none;font-size:14px;line-height:1.55}
.dy-rows li{display:grid;grid-template-columns:7.2em 1fr;gap:8px;border-top:1px solid #d6d0c4;padding:6px 0}
.dy-rows li>span:first-child{font-weight:800;color:#b5452c}
.dy-rows .one{font-weight:700}
.dy-stat{display:flex;align-items:baseline;gap:8px;margin:2px 0 4px}
.dy-stat b{font-size:30px;color:#b5452c;font-variant-numeric:tabular-nums}
.dy-stat small{font-size:12px;color:#6b665d}
.dy-hl{margin:4px 0 4px;font-size:15px;line-height:1.5}
.dy-hl b{color:#b5452c}
.dy-hl span{display:block;font-size:12px;color:#6b665d}
.dy-rev{margin:8px 0 0;padding:8px 10px;background:#1d1b17;color:#fbf9f3;font-size:14px;line-height:1.55}
.dy-rev .g{display:inline-block;margin-top:4px;background:#b5452c;color:#fff;font-weight:700;padding:0 6px}
.dy-rel{margin-top:10px;border:2px dashed #1d1b17;padding:7px 10px;font-weight:700;font-size:14px;line-height:1.5}
.dy-link{display:inline-block;margin-top:8px;color:#1d1b17;font-weight:700;font-size:14px;text-underline-offset:3px}
.dy-end .q{font-size:21px;font-weight:800;line-height:1.4;margin:8px 0 10px}
.dy-opts{display:grid;gap:8px}
.dy-opt{font:inherit;font-size:17px;font-weight:700;text-align:left;padding:10px 12px;border:2px solid #1d1b17;background:#fff;color:#1d1b17;cursor:pointer}
.dy-opt:hover{background:#f1ece2}
.dy-hint{color:#6b665d;font-size:14px;margin:10px 0 0;display:flex;justify-content:space-between;align-items:center;gap:8px}
.dy-skip{font:inherit;font-size:13px;background:none;border:none;text-decoration:underline;cursor:pointer;color:#1d1b17}
.dy-in{width:100%;font:inherit;font-size:18px;padding:9px 11px;border:2px solid #1d1b17;background:#fff;color:#1d1b17;border-radius:0}
.dy-res{margin:10px 0 0;font-size:15px;line-height:1.6;font-weight:700;min-height:1em}
.dy-note{margin:6px 0 0;font-size:12.5px;line-height:1.55;color:#6b665d}
.dy-facts{margin:10px 0 0;border-top:2px solid #1d1b17}
.dy-facts summary{cursor:pointer;font-weight:800;font-size:15px;padding:8px 0}
.dy-facts summary small{font-weight:400;color:#6b665d;margin-left:6px}
.dy-facts ul{list-style:none;margin:0;padding:0}
.dy-facts li{padding:8px 0;border-top:1px solid #d6d0c4;font-size:14px;line-height:1.55;overflow-wrap:anywhere}
.dy-facts li b{display:block;color:#b5452c;font-size:12px;letter-spacing:.04em}
.dy-facts li .t{display:block;font-weight:700}
.dy-facts .chip{display:inline-block;margin:4px 6px 0 0;padding:1px 7px;font-size:12px;font-weight:700;background:#b5452c;color:#fff}
.dy-facts .chip.sub{background:none;color:#b5452c;border:1px solid #b5452c}
.dy-intro{position:absolute;left:16px;right:16px;bottom:20px;margin:0 auto;max-width:560px;background:#fffdf8;border:2px solid #1d1b17;box-shadow:4px 4px 0 #1d1b17;padding:10px 14px;font-size:16px;line-height:1.65;font-weight:700;opacity:0;transform:translateY(8px);transition:opacity .45s,transform .45s;pointer-events:none}
.dy-intro.on{opacity:1;transform:none}
.dy-picks{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.dy-picks button{font:inherit;font-size:14px;padding:3px 9px;border:1.5px solid #1d1b17;background:#fff;cursor:pointer}
.dy-acts{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.dy-acts button{font:inherit;font-size:15px;font-weight:800;padding:9px 14px;border:2px solid #1d1b17;background:#fff;color:#1d1b17;cursor:pointer}
.dy-acts .pri{background:#1d1b17;color:#fbf9f3}
.dy-acts button[disabled]{opacity:.35;cursor:default}
.dy-line{color:#6b665d;font-size:14px;margin:10px 0 0}
@media(min-width:900px){
  .dy-card{right:16px;top:96px;width:420px;max-height:calc(100% - 152px)}
  .dy-card.off{transform:translateX(40px)}
  .dy-media{height:220px}
  .dy-rs,.dy-end{right:16px;top:96px;width:420px;max-height:calc(100% - 152px)}
  .dy-rs.off,.dy-end.off{transform:translateX(40px)}
  .dy-rs figure img{height:110px}
  .dy .dy-rs .rs-bot{height:58px}
  .dy .dy-rs .rs-b span{font-size:11px}
  .dy{--ch:190px}
}
@media(max-width:600px){.dy-card,.dy-rs,.dy-end{bottom:26px}.dy-intro{bottom:30px}}
@media(max-width:899px){
  .dy-card,.dy-rs,.dy-end{left:8px;right:8px;bottom:54px;max-height:56%}
  .dy-rs{max-height:80%}
  .dy-card.off,.dy-rs.off,.dy-end.off{transform:translateY(40px)}
  .dy-media{height:150px}
  .dy{--ch:120px}
  .dy-ct{font-size:16px}
  .dy-rows{font-size:13px}
  .dy-rows li{grid-template-columns:6.4em 1fr}
  .dy-badge{font-size:12px;padding:2px 6px}
  .dy-stamps{gap:4px}
  .dy-st{font-size:9px;letter-spacing:-.02em}
  .dy-st b{font-size:10px;white-space:nowrap}
}
@media(prefers-reduced-motion:reduce){.dy-card,.dy-end,.dy-rs{transition:none}}
.dy-rs .rs-t{font-size:17px;font-weight:800;line-height:1.45;margin:6px 0 10px;text-wrap:balance}
.dy-rs .rs-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.dy-rs figure{margin:0;border:2px solid #1d1b17;background:#fff;display:flex;flex-direction:column;opacity:0;transform:translateY(8px);transition:opacity .35s,transform .35s}
.dy-rs figure.on{opacity:1;transform:none}
.dy-rs figure img{display:block;width:100%;height:84px;object-fit:contain;background:#fff}
.dy-rs figcaption{font-size:12px;font-weight:800;text-align:center;padding:2px 0;border-top:1.5px solid #1d1b17;background:#fbf9f3}
.dy-rs .rs-bots{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:6px 2px;margin:12px 0 0;align-items:end}
.dy-rs .rs-b{display:flex;flex-direction:column;align-items:center;opacity:0;transform:translateY(10px) scale(.6);transition:opacity .3s,transform .35s cubic-bezier(.3,1.6,.5,1)}
.dy-rs .rs-b.on{opacity:1;transform:none}
.dy-rs .rs-b span{font-size:10px;font-weight:800;line-height:1.2;text-align:center;min-height:2.4em;display:flex;align-items:flex-end;justify-content:center;word-break:break-all}
.dy-rs .rs-bot{display:block;height:52px;width:auto;max-width:100%;object-fit:contain}
.dy-rs .rs-cap{font-size:13px;line-height:1.6;color:#1d1b17;margin:12px 0 0}
.dy-rs .rs-pts{list-style:none;margin:0;padding:0;font-size:14px;line-height:1.6}
.dy-rs .rs-pts li{border-top:1px solid #d6d0c4;padding:6px 0;opacity:0;transition:opacity .4s}
.dy-rs .rs-pts li.on{opacity:1}
.dy-rs .rs-pts li:first-child{font-weight:800}`;
document.head.appendChild(css);
const root = document.createElement('div'); root.className = 'dy'; stage.appendChild(root);
const ORDER = CHS.map(c => [c.k, c.at]);
root.innerHTML = `<svg class="dy-svg" aria-hidden="true"><g id="dyLeads"></g><path class="dy-route" id="dyRoute"/><g id="dyPins"></g></svg>
<div id="dyChars"></div><div id="dyLabs"></div><div id="dyBadges"></div>
<div class="dy-top"><span class="dy-pill">${esc(TXT.brand)}</span><span class="dy-clockw">${window.FIND_ALWAYS ? `<button type="button" class="dy-pp" id="dyFindBtn">${esc(S.T('findl'))}</button>` : ''}<button type="button" class="dy-pp" id="dyRecapBtn">${esc(TXT.recapBtn)}</button><button type="button" class="dy-pp" id="dyPP"></button><span class="dy-clock" id="dyClock">07:10</span></span>
  <div class="dy-stamps" id="dyStamps">${ORDER.map(([k, at], i) => `<button type="button" class="dy-st" data-i="${i}"><b>${esc(NAME[k])}</b>${at}</button>`).join('')}<button type="button" class="dy-st" data-i="${RI}"><b>${esc(TXT.recapTag)}</b>22:40</button></div></div>
<p class="dy-intro" id="dyIntro">${esc(TXT.intro)}</p>
<section class="dy-rs off" id="dyRS" aria-live="polite"><span class="dy-tag">${esc(TXT.recapTag)}</span><div class="rs-t">${esc(RECAP.title)}</div>
  <div class="rs-grid">${RECAP.imgs.map(([k, src]) => `<figure><img src="${AB + src}" alt=""><figcaption>${esc(NAME[k])}</figcaption></figure>`).join('')}</div>
  <p class="rs-cap">${esc(RECAP.cap)}</p><div class="rs-bots">${RECAP.bots.map((nm, j) => `<div class="rs-b"><span>${esc(nm)}</span><img class="rs-bot" src="${AB}chars/bot_${String(j + 1).padStart(2, '0')}.png" alt=""></div>`).join('')}</div>
  <ul class="rs-pts">${RECAP.pts.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
  <div class="dy-acts"><button type="button" class="pri" id="dyRSBtn">${esc(TXT.recapRead)}</button></div></section>
<section class="dy-card off" id="dyCard" aria-live="polite"></section>
<section class="dy-end off" id="dyEnd"><span class="dy-tag">${esc(TXT.done)}</span><div class="q">${esc(TXT.endQ)}</div>
  <input class="dy-in" id="dyIn" list="dyLis" autocomplete="off" enterkeyhint="search" placeholder="${esc(TXT.ph)}"><datalist id="dyLis"></datalist>
  <div class="dy-picks" id="dyPicks"></div><p class="dy-res" id="dyRes"></p><p class="dy-note" id="dyNote" hidden>${esc(S.T('note'))}</p><details class="dy-facts" id="dyFacts" open hidden><summary id="dyFactsS"></summary><ul id="dyFactsL"></ul></details>
  <div class="dy-acts"><button type="button" class="pri" id="dyDl" disabled>${esc(TXT.dl)}</button><button type="button" id="dyShare">${esc(TXT.share)}</button><button type="button" id="dyAgain">${esc(TXT.again)}</button><button type="button" id="dyRecapEnd">${esc(TXT.recapRead)}</button></div>
  <p class="dy-line">${esc(TXT.shareLine)}</p></section>`;
const $ = id => document.getElementById(id);
$('dyLis').innerHTML = D.li.map(r => `<option value="${esc(r.d + ' ' + r.n)}">`).join('');

const P = (x, y, h = 0) => window.__six3dProject(x, y, h), okP = p => p && Number.isFinite(p.x) && Number.isFinite(p.y), CAM = (x, y, n, az) => window.__six3dCam(x, y, n, az);
const AZ = 0.3, wide = () => innerWidth >= 900, NEAR = () => wide() ? 0.62 : 0.7, NEAR_ALL = () => wide() ? 0.98 : 1.25;
const raf = () => new Promise(r => { let done = false; requestAnimationFrame(() => requestAnimationFrame(() => { done = true; r(); })); setTimeout(() => { if (!done) r(); }, 400); });
let J = null, cur = { x: D.meta.W / 2 + 60, y: D.meta.H / 2 + 60, n: NEAR_ALL(), az: 0 }, flight = null;
async function calibrate() { const c = BY[A6];
  for (let k = 0; k < 80; k++) {
    const n = NEAR(); CAM(c.cx, c.cy, n, AZ); await raf(); await raf();
    const p0 = P(c.cx, c.cy), px = P(c.cx + 200, c.cy), py = P(c.cx, c.cy + 200);
    if (stage.clientWidth > 0 && [p0, px, py].every(okP) && Number.isFinite(n)) { J = { a: (px.x - p0.x) / 200, b: (py.x - p0.x) / 200, c: (px.y - p0.y) / 200, d: (py.y - p0.y) / 200, x0: p0.x, y0: p0.y, n }; break; }
    await new Promise(r => setTimeout(r, 100)); }
  if (!J) J = { a: 1, b: 0, c: 0, d: 1, x0: 0, y0: 0, n: NEAR() };
  CAM(cur.x, cur.y, cur.n, cur.az); }
function aim(code) { const r = BY[code], W = stage.clientWidth, H = stage.clientHeight;
  const want = wide() ? { x: (W - 452) * 0.5, y: H * 0.6 } : { x: W * 0.5, y: H * 0.34 };
  const sx = want.x - J.x0, sy = want.y - J.y0, det = J.a * J.d - J.b * J.c;
  return { x: r.cx - (J.d * sx - J.b * sy) / det, y: r.cy - (-J.c * sx + J.a * sy) / det, n: J.n, az: AZ }; }
const overview = () => ({ x: D.meta.W / 2 + (wide() ? 160 : 0), y: D.meta.H / 2 + (wide() ? 60 : 300), n: NEAR_ALL(), az: 0 });
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
function flyTo(t, dur = 1400) { if (reduce) { cur = { ...t }; CAM(cur.x, cur.y, cur.n, cur.az); flight = null; return; } flight = { a: { ...cur }, b: t, t0: performance.now(), dur }; }
const ioc = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2, lerp = (a, b, k) => a + (b - a) * k;

let tt = DEV ? Math.max(0, +(QS.get('at') || 0)) : 0, playing = DEV ? !QS.get('pause') : true, lastNow = performance.now(), ci = -2, userCam = false;
const pp = $('dyPP'); const setPP = () => { pp.textContent = playing ? TXT.pause : TXT.go; }; setPP();
pp.onclick = () => { playing = !playing; if (playing) { userCam = false; flyTo(ci >= 0 && ci < CHS.length ? aim(CHS[ci].li) : overview()); } setPP(); };
cv.addEventListener('pointerdown', () => { userCam = true; flight = null; if (playing) { playing = false; setPP(); } });
$('dyStamps').onclick = e => { const b = e.target.closest('.dy-st'); if (!b) return; tt = chStart(+b.dataset.i) + 0.01; playing = true; userCam = false; setPP(); };

function cardHTML(c) {
  const rows = c.rows.map(([l, v]) => `<li><span>${esc(l)}</span><span class="${l === L_ONE ? 'one' : ''}">${Array.isArray(v) ? v.map(esc).join('<br>') : esc(v)}</span></li>`).join('');
  const stat = (c.stat ? `<div class="dy-stat"><b>${esc(c.stat[0])}</b><span>${esc(c.stat[1])}${c.stat[2] ? `<br><small>${esc(c.stat[2])}</small>` : ''}</span></div>` : '')
    + (c.hl ? `<div class="dy-hl"><b>${esc(c.hl[0])}</b>${c.hl[1] ? `<span>${esc(c.hl[1])}</span>` : ''}</div>` : '');
  const rev = c.reveal ? `<div class="dy-rev">${esc(c.reveal)}</div>` : '';
  return `<div class="dy-prog"><i id="dyProg"></i></div><div><span class="dy-tag">${esc(NAME[c.k])}</span><span class="dy-ct">${esc(D.meta.titles[c.k])}</span></div>
  <div class="dy-media" id="dyMedia"><video id="dyVid" src="${c.v}" poster="${c.poster}" muted playsinline autoplay loop preload="auto" aria-label="${esc(TXT.play)}"></video><button type="button" class="dy-snd" id="dyPlay">${esc(TXT.sound)}</button></div>
  ${rev}<ul class="dy-rows">${rows}</ul>${stat}<div class="dy-rel">${esc(c.rel)}</div><a class="dy-link" href="${PAGE[c.k]}" target="_blank" rel="noopener">${esc(TXT.link)} →</a>`;
}
function showCard(i) { const card = $('dyCard'), c = CHS[i]; card.innerHTML = cardHTML(c); card.scrollTop = 0;

  const v = $('dyVid'); v.muted = true; v.play().catch(() => {});
  $('dyPlay').onclick = () => { v.muted = false; v.loop = false; v.controls = true; v.currentTime = 0; v.play().catch(() => {}); $('dyPlay').hidden = true; playing = false; setPP(); };
  requestAnimationFrame(() => card.classList.remove('off')); }

const CH_NOW = $('dyChars');
function placeChars(list, li, alpha) {
  const h = parseFloat(getComputedStyle(root).getPropertyValue('--ch')) || 150, r = BY[li], p = P(r.cx, r.cy);
  if (!okP(p)) return;
  CH_NOW.innerHTML = list.map(([src, dx]) => `<img class="dy-chr" src="${AB}chars/${src}.png" alt="" style="left:${p.x + dx * h * 0.7}px;top:${p.y + 6}px;opacity:${alpha}">`).join('');
}
function drawOverlay(i, s) {
  const visited = CHS.slice(0, Math.max(0, Math.min(i + 1, CHS.length)));
  const pts = visited.map(c => { const r = BY[c.li]; return P(r.cx, r.cy); });
  if (!pts.every(okP)) return;
  let d = ''; pts.forEach((p, j) => {
    if (j === 0) { d += `M${p.x},${p.y}`; return; }
    const q = pts[j - 1], k = j === pts.length - 1 && i < CHS.length ? Math.min(1, s / 1.4) : 1, x = lerp(q.x, p.x, k), y = lerp(q.y, p.y, k);
    const mx = (q.x + x) / 2 + (j % 2 ? 40 : -40), my = (q.y + y) / 2 - 30; d += ` Q${mx},${my} ${x},${y}`; });
  $('dyRoute').setAttribute('d', d);
  const seen = new Map(); visited.forEach(c => { const a = seen.get(c.li) || []; a.push(`${c.at} ${NAME[c.k]}`); seen.set(c.li, a); });
  let pins = '', labs = '';
  for (const [li, a] of seen) { const r = BY[li], p = P(r.cx, r.cy); pins += `<circle class="dy-pin" cx="${p.x}" cy="${p.y}" r="8"/>`; labs += `<span class="dy-lab" style="left:${p.x}px;top:${p.y + 12}px">${esc(a.join(' ・ '))}</span>`; }
  $('dyPins').innerHTML = pins; $('dyLabs').innerHTML = labs;
  let bs = '', leads = ''; const W = stage.clientWidth, H = stage.clientHeight, xMax = wide() ? W - 452 : W - 8, yMax = wide() ? H - 40 : H * 0.44 - 34, yMin = wide() ? 104 : 96;
  const placed = [];
  BADGES.filter(b => i === b.from || i >= CHS.length).forEach((b, j) => {
    const r = BY[b.li], p = P(r.cx, r.cy), w = b.s.length * 12.5 + 22, side = p.x + 40 + w > xMax ? -1 : 1;
    const bx = Math.max(8, Math.min(xMax - w, side > 0 ? p.x + 40 : p.x - 40 - w)); let by = Math.max(yMin, Math.min(yMax, p.y + (j % 2 ? 40 : -62)));
    for (let k = 0; k < 6 && placed.some(q => bx < q.x + q.w && q.x < bx + w && by < q.y + 30 && q.y < by + 30); k++) by = by + 34 > yMax ? by - 34 * (k + 1) : by + 34;
    placed.push({ x: bx, y: by, w });
    leads += `<line class="dy-lead" x1="${p.x}" y1="${p.y}" x2="${side > 0 ? bx : bx + w}" y2="${by + 12}"/>`;
    const [a, z] = b.s.split('｜'); bs += `<span class="dy-badge" style="left:${bx}px;top:${by}px"><b>${esc(a)}</b>｜${esc(z)}</span>`; });
  $('dyBadges').innerHTML = bs; $('dyLeads').innerHTML = leads;
}

function enter(i) {
  ci = i; const st = root.querySelectorAll('.dy-st'); st.forEach((b, j) => { b.classList.toggle('done', j < i || i === EI); b.classList.toggle('now', j === i); });
  $('dyEnd').classList.toggle('off', i !== EI); $('dyRS').classList.toggle('off', i !== RI);
  if (i === -1) { six.setMode(0); $('dyCard').classList.add('off'); if (!userCam) flyTo(overview(), 10); return; }
  if (i === RI) { six.setMode(0); $('dyCard').classList.add('off'); if (!userCam) flyTo(overview(), 1800); $('dyRS').scrollTop = 0; return; }
  if (i === EI) { six.setMode(5); $('dyCard').classList.add('off'); if (!userCam) flyTo(overview(), 1800); prefill(); return; }
  const c = CHS[i]; six.setMode(c.k); $('dyCard').classList.add('off'); setTimeout(() => { if (ci === i) showCard(i); }, 500); if (!userCam) flyTo(aim(c.li));
}
let lastMin = -1;
function frame(now) {
  const dt = Math.min(0.1, (now - lastNow) / 1000); lastNow = now; if (playing) tt += dt;
  const i = chAt(tt); if (i !== ci) enter(i);
  $('dyIntro').classList.toggle('on', tt < T_INTRO - 0.3);
  const s = i < 0 ? tt : i === EI ? tt - T_END : tt - chStart(i);
  const m = i < 0 ? Math.round(lerp(7 * 60 + 10, 8 * 60 + 40, Math.min(1, s / T_INTRO))) : i === RI ? Math.round(lerp(22 * 60 + 40, 22 * 60 + 55, Math.min(1, s / RD))) : i === EI ? Math.round(lerp(22 * 60 + 55, 23 * 60, Math.min(1, s / 6))) : Math.round(lerp(CHS[i].t0, CHS[i].t1, Math.min(1, s / CHD)));
  if (m !== lastMin) { lastMin = m; six.setTime(m); $('dyClock').textContent = String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'); }
  if (flight) { const k = Math.min(1, (now - flight.t0) / flight.dur), e = ioc(k), a = flight.a, b = flight.b; cur = { x: lerp(a.x, b.x, e), y: lerp(a.y, b.y, e), n: lerp(a.n, b.n, e), az: lerp(a.az, b.az, e) }; CAM(cur.x, cur.y, cur.n, cur.az); if (k >= 1) flight = null; }
  drawOverlay(i, s);
  if (i >= 0 && i < CHS.length) { placeChars(CHS[i].chars, CHS[i].li, Math.min(1, Math.max(0, (s - 0.9) / 0.4))); const pg = $('dyProg'); if (pg) pg.style.width = Math.min(100, s / CHD * 100) + '%'; }
  else if (i === RI) { placeChars([['girl_6', -0.6]], A25, 1);
    root.querySelectorAll('.dy-rs figure').forEach((f, j) => f.classList.toggle('on', s > 0.6 + j * 0.5));
    root.querySelectorAll('.dy-rs .rs-b').forEach((b, j) => b.classList.toggle('on', s > 3.8 + j * 0.25));
    const rs = $('dyRS'); root.querySelectorAll('.dy-rs .rs-pts li').forEach((l, j) => { const on = s > 8 + j * 1.8; if (on && !l.classList.contains('on')) rs.scrollTop = Math.max(rs.scrollTop, l.offsetTop + l.offsetHeight - rs.clientHeight + 64); l.classList.toggle('on', on); }); }
  else if (i === EI) placeChars([['girl_6', -0.6]], A25, 1);
  else { const W = stage.clientWidth, H = stage.clientHeight; CH_NOW.innerHTML = `<img class="dy-chr" src="${AB}chars/girl_6.png" alt="" style="left:${wide() ? 150 : 74}px;top:${wide() ? H - 30 : H * 0.42}px">`; }
  requestAnimationFrame(frame);
}

let pickR = null;
function showLi(r, keep) { pickR = r; if (!keep) $('dyIn').value = r.d + ' ' + r.n;   // keep：邊打邊找時不改寫輸入框，免得讀者接著打字變成「松山區 中正里里」
  $('dyPicks').innerHTML = ''; $('dyRes').textContent = relLine(r); $('dyNote').hidden = false; $('dyDl').disabled = false; showFacts(r); }
function showFacts(r) {   // 狀況卡：跟下載的圖卡同一份內容（S.facts），選到里就展開，點標題可收合；沒有新寫字
  const box = $('dyFacts'); if (!r) { box.hidden = true; return; }
  $('dyFactsS').innerHTML = `${esc(r.d + ' ' + r.n)}<small>${esc(S.T('pop', { p: fmt(r.pop) }))}</small>`;
  $('dyFactsL').innerHTML = S.facts(r).map(([n, v, ch]) => `<li><b>${esc(NAME[n])}</b><span class="t">${esc(D.meta.titles[n])}</span>${esc(v)}${ch.length ? '<br>' + ch.map(([c, cls]) => `<span class="chip${cls ? ' ' + cls : ''}">${esc(c)}</span>`).join('') : ''}</li>`).join('');
  box.open = true; box.hidden = false; }
function relLine(r) { const ls = S.listsOf(r), m = D.meta, f = (t, o) => t.replace(/\{(\w)\}/g, (_, k) => o[k]);
  if (ls.length === 0) return f(TXT.rel0, { n: fmt(m.n_lists['0']) });
  if (ls.length === 1) return f(TXT.rel1, { a: NAME[ls[0]], n: fmt(m.n_lists['1']) });
  const p = m.pairs[ls[0] + '-' + ls[1]]; return f(p.n === 1 ? TXT.rel2one : TXT.rel2, { a: NAME[ls[0]], b: NAME[ls[1]], n: fmt(p.n), p: fmt(p.pop) }); }
function findLi() { const v = $('dyIn').value.trim().replace(/\s+/g, ' '); $('dyPicks').innerHTML = ''; if (!v) return;
  const full = D.li.find(r => r.d + ' ' + r.n === v || r.d + r.n === v.replace(/ /g, '')); if (full) return showLi(full);
  const nm = v.split(' ').pop(), hits = D.li.filter(r => r.n === nm || r.n === nm + '里');
  if (hits.length === 1) return showLi(hits[0]);
  if (hits.length > 1) { showFacts(null); $('dyNote').hidden = true; $('dyRes').textContent = TXT.pick; $('dyPicks').innerHTML = hits.map(r => `<button type="button" data-c="${r.c}">${esc(r.d + ' ' + r.n)}</button>`).join(''); return; }
  { const k = nm.replace(/里+$/, ''); let c = k ? D.li.filter(r => r.n.includes(k)) : []; if (!c.length && k) c = D.li.filter(r => r.d.startsWith(k));   // 按 Enter 時打的是區名或一部分：留著候選，不說找不到
    if (c.length) { pickR = null; showFacts(null); $('dyNote').hidden = true; $('dyRes').textContent = ''; $('dyDl').disabled = true; $('dyPicks').innerHTML = c.slice(0, 8).map(r => `<button type="button" data-c="${r.c}">${esc(r.d + ' ' + r.n)}</button>`).join(''); return; } }
  showFacts(null); $('dyNote').hidden = true; $('dyRes').textContent = TXT.notfound; }
function suggest(e) { if (e && e.isComposing) return; const v = $('dyIn').value.trim().replace(/\s+/g, ' '); if (!v) { $('dyPicks').innerHTML = ''; return; }
  const full = D.li.find(r => r.d + ' ' + r.n === v || r.d + r.n === v.replace(/ /g, '')); if (full) return showLi(full, true);
  const nm = v.split(' ').pop().replace(/里+$/, ''); if (!nm) return; const exact = D.li.filter(r => r.n === nm + '里'); if (exact.length === 1) return showLi(exact[0], true);
  let hits = D.li.filter(r => r.n.includes(nm)); if (!hits.length) hits = D.li.filter(r => r.d.startsWith(nm));   // 打里名的一部分，或打區名
  pickR = null; $('dyRes').textContent = ''; $('dyNote').hidden = true; $('dyDl').disabled = true; showFacts(null);   // 還沒選定，不留上一個里的結果
  $('dyPicks').innerHTML = hits.slice(0, 8).map(r => `<button type="button" data-c="${r.c}">${esc(r.d + ' ' + r.n)}</button>`).join(''); }
$('dyIn').addEventListener('input', suggest); $('dyIn').addEventListener('compositionend', suggest);
function openLi(r) { if (tt < T_END) { tt = T_END + 0.01; $('dyEnd').querySelector('.dy-tag').hidden = true; } if (r) showLi(r); }   // 地圖點里、頂端的找里鈕：直接到結尾；還沒看完就不寫「6 / 6 看完了」
{ const on3d0 = S.on3d; S.on3d = (c, from3d) => { if (on3d0) on3d0(c, from3d); if (c && from3d && BY[c]) openLi(BY[c]); }; }
if ($('dyFindBtn')) $('dyFindBtn').onclick = () => { openLi(null); setTimeout(() => $('dyIn').focus(), 400); };
$('dyIn').addEventListener('change', findLi); $('dyIn').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); findLi(); } });
$('dyPicks').onclick = e => { const c = e.target.dataset && e.target.dataset.c; if (c) showLi(BY[c]); };
function showCardImg(cv) { let box = $('dyCardBox'); if (!box) { box = document.createElement('div'); box.id = 'dyCardBox'; box.innerHTML = `<p class="dy-line">${esc(TXT.hold)}</p><img id="dyCardImg" alt="" style="display:block;width:100%;border:2px solid #1d1b17">`; $('dyEnd').appendChild(box); } $('dyCardImg').src = cv.toDataURL('image/png'); box.scrollIntoView({ block: 'nearest' }); }
if (ART) { $('dyShare').hidden = true; $('dyDl').textContent = TXT.showCard; }
$('dyDl').onclick = () => { if (!pickR) return; if (ART) return showCardImg(S.drawCard(pickR)); S.drawCard(pickR).toBlob(b => { const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = `${pickR.d}${pickR.n}_六題.png`; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500); }, 'image/png'); };
$('dyShare').onclick = async () => { const url = location.origin + location.pathname; try { if (navigator.share) await navigator.share({ title: TXT.brand, text: TXT.shareLine, url }); else { await navigator.clipboard.writeText(url); $('dyShare').textContent = TXT.copied; } } catch {} };
$('dyAgain').onclick = () => { $('dyEnd').querySelector('.dy-tag').hidden = false; tt = 0; playing = true; userCam = false; setPP(); };
const recap = mountRecap(el => document.getElementById('stagewrap').after(el), esc);
const toRecap = () => recap.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
$('dyRecapBtn').onclick = toRecap; $('dyRecapEnd').onclick = toRecap; $('dyRSBtn').onclick = toRecap;
let autoPaused = false;
new IntersectionObserver(([e]) => { const vid = $('dyVid'), out = e.intersectionRatio < 0.35;
  if (vid && vid.muted) { if (out) vid.pause(); else vid.play().catch(() => {}); }
  if (out) { if (playing) { playing = false; autoPaused = true; setPP(); } } else if (autoPaused) { autoPaused = false; playing = true; setPP(); } }, { threshold: [0, 0.35, 0.6] }).observe(stage);
function prefill() { const c = QS.get('li'); if (c && BY[c] && !pickR) showLi(BY[c]); }
if (QS.get('li') && BY[QS.get('li')] && !QS.get('at')) tt = T_END + 0.01;

await calibrate();
addEventListener('resize', () => { calibrate(); });
lastNow = performance.now(); frame(lastNow);
window.__dayReady = true;
