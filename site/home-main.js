(function(){
const COPY=JSON.parse(document.getElementById('copy').textContent);
const T=(k,v)=>COPY[k].t.replace(/\{(\w+)\}/g,(_,x)=>(v&&v[x]!=null)?v[x]:'');
const fmt=n=>Number(n).toLocaleString('en-US');
const wan=n=>(n/10000).toFixed(1);
const QN={1:'種樹',2:'垃圾桶',3:'鼠患',4:'內湖塞車',5:'公車',6:'危老'};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const $=s=>document.querySelector(s);
const URLS={1:'https://yojuhsu.com/2026-taipei-debug-trees',2:'https://yojuhsu.com/2026-taipei-debug-bins',3:'https://yojuhsu.com/2026-taipei-debug-rats',5:'https://yojuhsu.com/2026-taipei-debug-bus',6:'https://yojuhsu.com/2026-taipei-debug-aging'};
const KEY={1:r=>r.q1.short,3:r=>r.q3.in58,5:r=>r.q5.cls==='到不了八成',6:r=>r.q6.top33};
const LISTS=[1,3,5,6];
const smooth=!matchMedia('(prefers-reduced-motion: reduce)').matches;
let D,BY={},NAMES={},SEL=null,Q4=null,resolveReady;
const SIX=window.SIX={T,fmt,esc,KEY,URLS,ready:new Promise(r=>resolveReady=r)};

fetch(window.DATA_BASE+'six.json').then(r=>r.json()).then(d=>{
  D=d; d.li.forEach((r,i)=>{r.i=i;BY[r.c]=r;(NAMES[r.n]=NAMES[r.n]||[]).push(r.c);});
  return fetch(window.DATA_BASE+'q4.json').then(r=>r.ok?r.json():null).catch(()=>null);
}).then(q4=>{

  if(q4&&q4.url){URLS[4]=q4.url;Q4=q4;}
  statics(); search();
  Object.assign(SIX,{D,BY,select,listsOf,relation,facts});
  resolveReady(SIX);
  const p=new URLSearchParams(location.search).get('li');
  if(p&&BY[p]) select(p,false);
});

function statics(){
  const m=D.meta;
  document.title=T('title');
  $('#kicker').textContent=T('kicker');
  $('#h1').textContent=T('h1',{un:m.union.n});
  $('#lede').textContent=T('lede',{un:m.union.n,up:wan(m.union.pop),tp:wan(m.total_pop)});
  $('#findl').textContent=T('findl');
  $('#q').placeholder=T('ph');
  $('#hint').textContent=T('hint');
  $('#how').innerHTML=`<h2>${esc(T('howh'))}</h2>`+
    `<p><b>種樹</b>　${esc(T('how1'))}</p>`+
    `<p><b>鼠患</b>　${esc(T('how3a'))}；${esc(T('how3b'))}</p>`+
    `<p><b>公車</b>　${esc(T('how5'))}</p>`+
    `<p><b>危老</b>　${esc(T('how6'))}</p>`+
    `<p>${esc(T('how24'))}</p>`;
  $('#foot').innerHTML=`<p>${esc(T('src'))}</p><p>${esc(T('privacy'))}</p>`;
}

function caption(k){
  const m=D.meta,L=m.lists;
  if(k===1) return [T('cap1l'),T('capn',{n:L['1'].n,p:fmt(L['1'].pop)}),T('cap1d')];
  if(k===2) return [T('cap2l'),T('cap2n',{n:fmt(m.q2_none100),t:fmt(m.q2_stops)}),T('cap2d')];
  if(k===3) return [T('cap3l'),T('capp',{p:fmt(L['3'].pop)}),T('cap3d')];
  if(k===4) return [T('cap4l'),T('cap4n',{n:D.li.filter(r=>r.q4.neihu).length}),''];
  if(k===5) return [T('cap5l'),T('capn',{n:L['5'].n,p:fmt(L['5'].pop)}),T('cap5d')];
  if(k===6) return [T('cap6l'),T('capp',{p:fmt(L['6'].pop)}),T('cap6d')];
}
SIX.caption=k=>caption(k);

function maps(){
  const m=D.meta;
  let html='';
  for(const k of [1,2,3,4,5,6]){
    let body='';
    for(const r of D.li){
      let c='';
      if(KEY[k]&&KEY[k](r)) c='on'; else if(k===4&&r.q4.neihu) c='nh';
      body+=`<path d="${r.path}" data-c="${r.c}"${c?` class="${c}"`:''}/>`;
    }
    let dots='';
    if(k===2){let a='',b='';for(const [x,y,s] of D.stops){const seg=`M${x} ${y}h0`;if(s===0)a+=seg;else b+=seg;}dots=`<path class="st0" d="${b}"/><path class="st1" d="${a}"/>`;}
    const [l,n,d]=caption(k);
    html+=`<article class="tile" data-k="${k}"><h2><span class="no">${k}</span><span>${esc(m.titles[k])}</span></h2>`+
      `<svg viewBox="0 0 ${m.W} ${m.H}" role="img" aria-label="${esc(l)}"><g class="li">${body}</g>${dots}<g class="sel"></g></svg>`+
      `<p class="cl">${esc(l)}</p><p class="cn">${esc(n)}</p>${d?`<p class="cd">${esc(d)}</p>`:''}`+
      (URLS[k]?`<a class="go" href="${URLS[k]}">${esc(T('link',{k}))}</a>`:`<span class="soon">${esc(T('st4'))}</span>`)+
      `</article>`;
  }
  const g=$('#grid'); g.innerHTML=html;
  const tip=$('#tip');
  g.addEventListener('click',e=>{const c=e.target.dataset&&e.target.dataset.c;if(c) select(c,true);});
  g.addEventListener('pointermove',e=>{
    const c=e.target.dataset&&e.target.dataset.c;
    if(!c||e.pointerType!=='mouse'){tip.hidden=true;return;}
    const r=BY[c]; tip.textContent=`${r.d} ${r.n}`; tip.hidden=false;
    tip.style.left=(e.clientX+12)+'px'; tip.style.top=(e.clientY+12)+'px';
  });
  g.addEventListener('pointerleave',()=>{tip.hidden=true;});
}

function search(){
  $('#lis').innerHTML=D.li.map(r=>`<option value="${esc(r.d+' '+r.n)}">`).join('');
  const q=$('#q');
  const go=()=>{
    const v=q.value.trim().replace(/\s+/g,' '); const msg=$('#msg'),pick=$('#pick');
    msg.hidden=true; pick.hidden=true; if(!v) return;
    const full=D.li.find(r=>r.d+' '+r.n===v||r.d+r.n===v.replace(/ /g,''));
    if(full){select(full.c,true);return;}
    const nm=v.split(' ').pop(); const hits=NAMES[nm]||NAMES[nm+'里']||[];
    if(hits.length===1){select(hits[0],true);return;}
    if(hits.length>1){
      msg.textContent=T('pick',{n:hits.length}); msg.hidden=false;
      pick.innerHTML=hits.map(c=>`<button type="button" data-c="${c}">${esc(BY[c].d+' '+BY[c].n)}</button>`).join(''); pick.hidden=false;
      return;
    }
    msg.textContent=T('notfound',{q:v}); msg.hidden=false;
  };
  q.addEventListener('change',go);
  q.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();go();}});
  $('#pick').addEventListener('click',e=>{const c=e.target.dataset.c;if(c){$('#pick').hidden=true;$('#msg').hidden=true;select(c,true);}});
}

function listsOf(r){return LISTS.filter(k=>KEY[k](r));}

function select(c,scroll,from3d){
  SEL=c; const r=BY[c];
  $('#q').value=r.d+' '+r.n;
  document.querySelectorAll('.tile .sel').forEach(g=>{g.innerHTML=`<path class="selp" d="${r.path}"/><circle class="selc" cx="${r.cx}" cy="${r.cy}" r="44"/>`;});
  renderCard(r); SIX.storyHidden&&SIX.storyHidden(true);

  if(SIX.on3d) SIX.on3d(c,from3d);
  if(scroll) $('#stagewrap').scrollIntoView({behavior:smooth?'smooth':'auto',block:'start'});
}
function unselect(){
  SEL=null; $('#card').hidden=true; SIX.storyHidden&&SIX.storyHidden(false);
  document.querySelectorAll('.tile .sel').forEach(g=>{g.innerHTML='';});
  if(SIX.on3d) SIX.on3d(null);
}

function row(k,v,chips){
  const t=D.meta.titles[k];
  const x=chips.map(([s,cls])=>`<span class="chip${cls?' '+cls:''}">${esc(s)}</span>`).join('');
  const a=URLS[k]?`<a href="${URLS[k]}">${esc(T('link',{k}))}</a>`:`<span class="soon">${esc(T('st4'))}</span>`;
  return `<li><span class="n">${QN[k]}</span><span class="t">${esc(t)}</span><span class="v">${esc(v)}</span><span class="x">${x}</span>${a}</li>`;
}

function facts(r){
  const pc=x=>x==null?T('nodata'):x+'%';
  const out=[];
  out.push([1,T('r1',{a:pc(r.q1.canopy),b:pc(r.q1.park300)}),r.q1.short?[[T('chip1')]]:[]]);
  out.push([2,r.q2.stops?T('r2',{s:r.q2.stops,n:r.q2.none}):T('r2z'),[]]);
  const c3=[]; if(r.q3.in58) c3.push([T('chip3')]); if(r.q3.in21) c3.push([T('chip3b'),'sub']);
  out.push([3,T('r3',{e:fmt(r.q3.eat_km2),s:r.q3.stops_per_1k}),c3]);
  out.push([4,(Q4&&Q4.li&&Q4.li[r.c])||(r.q4.neihu?T('r4a'):T('r4b')),[]]);
  const c5=[]; if(r.q5.cls==='到不了八成'){c5.push([T('chip5')]); if(r.q5.cause) c5.push([r.q5.cause,'sub']);}
  out.push([5,T('r5',{c:r.q5.cls}),c5]);
  const c6=[]; if(r.q6.top33) c6.push([T('chip6')]); if(r.q6.pri) c6.push([T('chip6b'),'sub']);
  out.push([6,T('r6',{b:r.q6.B,p:r.q6.P}),c6]);
  return out;
}

function relation(r){
  const ls=listsOf(r),m=D.meta;
  if(ls.length===0) return T('rel0',{n:m.n_lists['0']});
  if(ls.length===1) return T('rel1',{a:QN[ls[0]],n:m.n_lists['1']});
  const p=m.pairs[ls[0]+'-'+ls[1]];
  return p.n===1?T('rel2one',{a:QN[ls[0]],b:QN[ls[1]]}):T('rel2',{a:QN[ls[0]],b:QN[ls[1]],n:p.n,p:fmt(p.pop)});
}

function renderCard(r){
  const el=$('#card');
  el.innerHTML=`<button type="button" class="cardx" id="cardx">${esc(T('close'))}</button>`+
    `<div class="ch"><div><h2>${esc(r.d+' '+r.n)}</h2><p class="pp">${esc(T('pop',{p:fmt(r.pop)}))}</p></div>`+
    `<div class="dlbox"><button type="button" class="dl" id="dl">${esc(T('dl'))}</button><span class="dlnote">${esc(T('dlnote'))}</span></div></div>`+
    `<p class="rel">${esc(relation(r))}<span class="note">${esc(T('note'))}</span></p>`+
    `<ul class="rows">${facts(r).map(([k,v,ch])=>row(k,v,ch)).join('')}</ul>`;
  el.hidden=false;
  $('#dl').addEventListener('click',()=>shareCard(r));
  $('#cardx').addEventListener('click',unselect);
}

function wrap(ctx,text,maxW){
  const out=[];let line='';
  for(const ch of text){const t=line+ch;if(ctx.measureText(t).width>maxW&&line){out.push(line);line=ch;}else line=t;}
  if(line) out.push(line); return out;
}
function drawCard(r){
  const W=1080,H=1350,cv=document.createElement('canvas');cv.width=W;cv.height=H;
  const ctx=cv.getContext('2d'),F='"PingFang TC","Noto Sans TC",sans-serif',css=getComputedStyle(document.documentElement);
  const C=k=>css.getPropertyValue(k).trim(),m=D.meta,X0=64,XW=W-128,IN=144;
  ctx.fillStyle=C('--paper');ctx.fillRect(0,0,W,H);
  ctx.font=`600 26px ${F}`;const kt=T('kicker'),kw=ctx.measureText(kt).width;
  ctx.fillStyle=C('--hi');ctx.fillRect(X0,56,kw+28,44);ctx.fillStyle='#fff';ctx.textBaseline='middle';ctx.fillText(kt,X0+14,79);ctx.textBaseline='alphabetic';
  ctx.fillStyle=C('--ink');ctx.font=`800 72px ${F}`;ctx.fillText(r.d+' '+r.n,X0,190);
  ctx.font=`400 30px ${F}`;ctx.fillStyle=C('--mute');ctx.fillText(T('pop',{p:fmt(r.pop)}),X0,240);
  const mw=190,s=mw/m.W,mh=m.H*s,mx=W-64-mw,my=36;
  ctx.save();ctx.translate(mx,my);ctx.scale(s,s);
  for(const v of D.li){ctx.fillStyle=v.c===r.c?C('--ink'):C('--base');ctx.fill(new Path2D(v.path));}
  ctx.restore();ctx.strokeStyle=C('--hi');ctx.lineWidth=4;ctx.beginPath();ctx.arc(mx+r.cx*s,my+r.cy*s,14,0,Math.PI*2);ctx.stroke();
  const rows=facts(r),rel=relation(r),top=Math.max(my+mh+18,290),bottom=H-138;
  const lay=(k,draw)=>{
    const z=v=>Math.round(v*k);let y=top;
    ctx.font=`600 ${z(26)}px ${F}`;const rl=wrap(ctx,rel,XW-40),bh=rl.length*z(36)+z(30);
    if(draw){ctx.fillStyle=C('--soft');ctx.fillRect(X0,y,XW,bh);ctx.fillStyle=C('--ink');rl.forEach((l,i)=>ctx.fillText(l,X0+20,y+z(42)+i*z(36)));}
    y+=bh+z(16);
    if(draw){ctx.fillStyle=C('--ink');ctx.fillRect(X0,y,XW,4);}
    y+=4;
    for(const [n,v,ch] of rows){
      let b=y+z(14)+z(28);
      ctx.font=`700 ${z(27)}px ${F}`;const tl=wrap(ctx,m.titles[n],XW-IN);
      if(draw){ctx.fillStyle=C('--hi');ctx.font=`800 ${z(26)}px ${F}`;ctx.fillText(QN[n],X0,b);ctx.font=`700 ${z(27)}px ${F}`;ctx.fillStyle=C('--ink');tl.forEach((l,i)=>ctx.fillText(l,X0+IN,b+i*z(35)));}
      b+=(tl.length-1)*z(35)+z(34);
      ctx.font=`400 ${z(25)}px ${F}`;const vl=wrap(ctx,v,XW-IN);
      if(draw){ctx.fillStyle=C('--ink');vl.forEach((l,i)=>ctx.fillText(l,X0+IN,b+i*z(33)));}
      b+=(vl.length-1)*z(33);
      if(ch.length){
        b+=z(40);ctx.font=`600 ${z(21)}px ${F}`;let cx=X0+IN;
        for(const [s2,cls] of ch){const w=ctx.measureText(s2).width+z(18),h=z(31);
          if(draw){if(cls){ctx.strokeStyle=C('--hi');ctx.lineWidth=2;ctx.strokeRect(cx,b-z(23),w,h);ctx.fillStyle=C('--hi');}else{ctx.fillStyle=C('--hi');ctx.fillRect(cx,b-z(23),w,h);ctx.fillStyle='#fff';}ctx.fillText(s2,cx+z(9),b);}
          cx+=w+10;}
      }
      y=b+z(18);
      if(draw){ctx.fillStyle=C('--rule');ctx.fillRect(X0,y,XW,2);}
      y+=2;
    }
    return y;
  };
  let k=1.14;for(let i=0;i<12&&lay(k,false)>bottom;i++)k*=0.95;
  lay(k,true);
  ctx.fillStyle=C('--mute');ctx.font=`400 22px ${F}`;ctx.fillText(T('note'),X0,H-104);ctx.fillText(T('cardfoot'),X0,H-70);
  ctx.fillStyle=C('--ink');ctx.font=`600 24px ${F}`;ctx.fillText(T('cardurl')+'?li='+r.c,X0,H-36);
  return cv;
}
function shareCard(r){
  const cv=drawCard(r);
  cv.toBlob(b=>{const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=`${r.d}${r.n}_六題.png`;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},500);},'image/png');
}
SIX.drawCard=drawCard;

const CH=[
 {k:6,t0:9*60,t1:10*60,v:(window.ASSET_BASE || '') + 'media/q6.mp4',vd:16.0,img:(window.ASSET_BASE || '') + 'media/q6_info.svg',id:4.5},
 {k:1,t0:11*60,t1:13*60,v:(window.ASSET_BASE || '') + 'media/q1.mp4',vd:18.8,img:(window.ASSET_BASE || '') + 'media/q1_info.svg',id:4.5},
 {k:2,t0:14*60+30,t1:15*60+30,v:(window.ASSET_BASE || '') + 'media/q2.mp4',vd:10.0,img:(window.ASSET_BASE || '') + 'media/q2_info.png',id:4.5},
 {k:4,t0:17*60,t1:18*60,v:null,vd:0,img:(window.ASSET_BASE || '') + 'media/q4_info.webp',id:10},
 {k:3,t0:20*60+40,t1:21*60+30,v:(window.ASSET_BASE || '') + 'media/q3.mp4',vd:16.5,img:(window.ASSET_BASE || '') + 'media/q3_info.png',id:5},
 {k:5,t0:21*60+40,t1:22*60+40,v:(window.ASSET_BASE || '') + 'media/q5.mp4',vd:19.0,img:(window.ASSET_BASE || '') + 'media/q5_info.webp',id:4.5}
];
CH.forEach(c=>{c.dur=c.vd+c.id;});
SIX.CH=CH;
let chNow=-1;
SIX.showChapter=i=>{
  const c=CH[i],m=D.meta; chNow=i; const st=$('#story'); st.hidden=!!SEL;
  $('#spn').textContent=T('chn',{k:QN[c.k]}); $('#spt').textContent=m.titles[c.k];
  $('#spc').textContent=T('claim'+c.k);
  const l=$('#spl'); l.textContent=T('link',{k:c.k}); l.href=URLS[c.k]||'#';
  $('#spk').textContent=T('chk',{i:i+1,n:CH.length});
  const v=$('#spv'),im=$('#spi'); im.src=c.img; im.alt=T('alt'+c.k);
  if(c.v){v.hidden=false;im.hidden=true;v.src=c.v;v.currentTime=0;v.play().catch(()=>{});}
  else{v.pause();v.removeAttribute('src');v.hidden=true;im.hidden=false;}
};
SIX.storyTick=(i,ct)=>{ const c=CH[i]; $('#spp').style.width=Math.min(100,ct/c.dur*100)+'%';
  if(c.v&&ct>=c.vd&&$('#spi').hidden){$('#spv').pause();$('#spv').hidden=true;$('#spi').hidden=false;} };
SIX.pauseStory=p=>{const v=$('#spv'); if(p) v.pause(); else if(!v.hidden) v.play().catch(()=>{});};
SIX.storyHidden=h=>{ if(chNow>=0) $('#story').hidden=h; };
})();
