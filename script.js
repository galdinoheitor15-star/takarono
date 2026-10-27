/* =====================================================================
   CARDÁPIO — edite aqui nomes, descrições, preços e fotos.
   ATENÇÃO: os preços abaixo são EXEMPLOS. Troque pelos preços reais.
   ===================================================================== */
const WA = "558182450497";
const U = id => `https://images.unsplash.com/photo-${id}?w=400&q=70&auto=format&fit=crop`;
const CARDAPIO = [
  { cat:"Combinados", sub:"Sashimi, niguiri, uramaki e hot no mesmo barco. Escolha o tamanho da fome.", itens:[
    { nome:"Combinado 10 peças", desc:"Mix da casa para matar a vontade.", preco:29.90, foto:U("1617196034796-73dfa7b1fd56") },
    { nome:"Combinado 20 peças", desc:"Sashimi, niguiri, uramaki e hot filadélfia.", preco:54.90, foto:U("1583623025817-d180a2221d0a"), tag:"Mais pedido" },
    { nome:"Combinado 30 peças", desc:"Perfeito para dividir a dois.", preco:74.90, foto:U("1579584425555-c3ce17fd4351") },
    { nome:"Combinado 40 peças", desc:"Variedade completa da casa.", preco:94.90, foto:U("1617196034183-421b4917c92d") },
    { nome:"Combinado 60 peças", desc:"Para a galera toda. Barca caprichada.", preco:134.90, foto:U("1607301405418-780ee5e6dd10"), tag:"Família" },
  ]},
  { cat:"Kombos", sub:"Deu a louca nos Kombos: comida + bebida num preço só.", itens:[
    { nome:"Kombo 01", desc:"20 peças + refrigerante lata.", preco:59.90, foto:U("1607301406259-dfb186e15de8") },
    { nome:"Kombo 02", desc:"Temaki salmão + hot filadélfia (10 un) + refrigerante lata.", preco:57.90, foto:U("1627462133149-167e7e9a91b7") },
    { nome:"Kombo 03", desc:"Yakisoba + rolinho primavera (4 un) + refrigerante lata.", preco:49.90 },
  ]},
  { cat:"Temakis", sub:"Cone de alga bem recheado. Os clientes avisam: é gigante.", itens:[
    { nome:"Temaki Salmão", desc:"Salmão fresco, arroz e cebolinha.", preco:29.90, foto:U("1615361200098-9e630ec29b4e"), tag:"Gigante" },
    { nome:"Temaki Filadélfia", desc:"Salmão com cream cheese.", preco:31.90 },
    { nome:"Temaki Hot", desc:"Empanado e frito, com cream cheese e tarê.", preco:32.90 },
    { nome:"Temaki Skin", desc:"Pele de salmão crocante e molho tarê.", preco:24.90 },
  ]},
  { cat:"Hot rolls", sub:"Crocante por fora, cremoso por dentro. Frito na hora.", itens:[
    { nome:"Hot Filadélfia (10 un)", desc:"Salmão e cream cheese empanados.", preco:24.90, foto:U("1633478062482-790e3b5dd810"), tag:"Clássico" },
    { nome:"Hot Skin (10 un)", desc:"Pele de salmão, cream cheese e tarê.", preco:22.90 },
    { nome:"Hot Banana (8 un)", desc:"Banana com canela e doce de leite.", preco:19.90 },
  ]},
  { cat:"Especiais", sub:"Os queridinhos de quem já é cliente.", itens:[
    { nome:"Joy de maracujá (4 un)", desc:"Salmão envolvendo o arroz, finalizado com calda de maracujá.", preco:26.90, foto:U("1580822184713-fc5400e7fe10"), tag:"Favorito" },
    { nome:"Sashimi de salmão (10 fatias)", desc:"Fatias generosas, cortadas na hora.", preco:39.90, foto:U("1615361200141-f45040f367be") },
    { nome:"Uramaki especial (8 un)", desc:"Com ovas, cream cheese maçaricado e tarê.", preco:32.90, foto:U("1653122024993-31e02aedb1ac") },
  ]},
  { cat:"Pratos e porções", sub:"Para acompanhar ou para quem não come cru.", itens:[
    { nome:"Yakisoba", desc:"Macarrão oriental com legumes e molho da casa.", preco:34.90 },
    { nome:"Rolinho primavera (4 un)", desc:"Crocante, recheado de legumes.", preco:14.90 },
    { nome:"Porção de batata frita", desc:"Sequinha e bem temperada.", preco:19.90 },
  ]},
  { cat:"Bebidas", sub:"", itens:[
    { nome:"Refrigerante lata", desc:"Coca-Cola, Guaraná ou Fanta.", preco:6.00 },
    { nome:"Refrigerante 1 litro", desc:"", preco:10.00 },
    { nome:"Suco natural", desc:"Pergunte os sabores do dia.", preco:8.00 },
    { nome:"Água mineral", desc:"Com ou sem gás.", preco:3.00 },
  ]},
];
/* ===================================================================== */

const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const brl = v => v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const slug = s => s.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-");
const waLink = m => `https://wa.me/${WA}?text=${encodeURIComponent(m || "Olá Takarono! 🍣")}`;
$$(".js-wa").forEach(a=>{ a.href = waLink(); a.target="_blank"; a.rel="noopener"; });
$("#yr").textContent = new Date().getFullYear();

// Aberto / fechado (horário de Recife)
const hr = Number(new Intl.DateTimeFormat("en-US",{hour:"numeric",hour12:false,timeZone:"America/Recife"}).format(new Date())) % 24;
const ABERTO = hr >= 11 && hr < 23;
if(!ABERTO){ $("#status").classList.add("closed"); $("#status-text").textContent = "Fechado · abre às 11h"; }

// ---------- monta o cardápio ----------
const ITENS = {};
$("#groups").innerHTML = CARDAPIO.map(g=>{
  const gid = slug(g.cat);
  return `<div class="group" id="g-${gid}" data-cat="${gid}">
    <h3>${g.cat}</h3>${g.sub?`<p>${g.sub}</p>`:`<p></p>`}
    <div class="items">${g.itens.map(it=>{
      const id = slug(it.nome); ITENS[id] = it;
      return `<article class="item${it.foto?"":" nophoto"}" data-id="${id}">
        <div class="info">
          ${it.tag?`<span class="badge">${it.tag}</span>`:""}
          <h4>${it.nome}</h4>
          <p class="desc">${it.desc||""}</p>
          <div class="row">
            <span class="price">${brl(it.preco)}</span>
            <button class="add" data-add="${id}" aria-label="Adicionar ${it.nome}"><svg><use href="#plus"/></svg>Adicionar</button>
            <span class="stepper"><button data-dec="${id}" aria-label="Remover um">−</button><span data-q="${id}">0</span><button data-inc="${id}" aria-label="Adicionar mais um">+</button></span>
          </div>
        </div>
        ${it.foto?`<div class="thumb"><img loading="lazy" src="${it.foto}" alt="${it.nome}"></div>`:""}
      </article>`;
    }).join("")}</div>
  </div>`;
}).join("");
$("#cats").insertAdjacentHTML("beforeend", CARDAPIO.map(g=>`<button class="cat" data-go="${slug(g.cat)}">${g.cat}</button>`).join(""));

// ---------- sacola ----------
let bag = {};
try{ bag = JSON.parse(localStorage.getItem("takarono-bag")||"{}"); }catch(e){}
for(const k in bag) if(!ITENS[k]) delete bag[k];
const save = () => { try{ localStorage.setItem("takarono-bag", JSON.stringify(bag)); }catch(e){} };
const qty = () => Object.values(bag).reduce((a,b)=>a+b,0);
const total = () => Object.entries(bag).reduce((a,[k,q])=>a+ITENS[k].preco*q,0);

function render(){
  const n = qty(), t = total();
  $$(".item").forEach(el=>{
    const q = bag[el.dataset.id]||0;
    el.classList.toggle("inbag", q>0);
    el.querySelector("[data-q]").textContent = q;
  });
  $("#bagCount").textContent = n;
  $("#bagTotal").textContent = brl(t);
  $("#bagItems").textContent = n===1 ? "1 item na sacola" : `${n} itens na sacola`;
  $("#bagbar").classList.toggle("show", n>0 && !$("#drawer").classList.contains("show"));
  $("#drTotal").textContent = brl(t);
  $("#lines").innerHTML = n ? Object.entries(bag).map(([k,q])=>`
    <div class="line-item"><b>${ITENS[k].nome}</b>
      <span class="stepper"><button data-dec="${k}" aria-label="Remover um">−</button><span>${q}</span><button data-inc="${k}" aria-label="Adicionar mais um">+</button></span>
      <span class="lp">${q} × ${brl(ITENS[k].preco)} = ${brl(q*ITENS[k].preco)}</span></div>`).join("")
    : `<div class="empty"><img class="logo" src="logo.png" alt="">Sua sacola está vazia.<br>Escolha algo gostoso no cardápio.</div>`;
  $("#send").disabled = !n;
  $("#checkout").classList.toggle("hidden", !n);
  save();
}

function change(id, d, srcEl){
  bag[id] = Math.max(0,(bag[id]||0)+d);
  if(!bag[id]) delete bag[id];
  render();
  if(d>0){
    bump();
    if(srcEl) fly(srcEl, id);
    toast(`${ITENS[id].nome} na sacola`);
  }
}
document.addEventListener("click",e=>{
  const a = e.target.closest("[data-add]"), i = e.target.closest("[data-inc]"), dd = e.target.closest("[data-dec]");
  if(a) change(a.dataset.add, 1, a);
  else if(i) change(i.dataset.inc, 1, i.closest(".item") ? i : null);
  else if(dd) change(dd.dataset.dec, -1);
});

// animações da sacola
function bump(){
  if(typeof gsap==="undefined") return;
  gsap.fromTo("#bagbar .ico",{scale:1},{scale:1.35,duration:.18,yoyo:true,repeat:1,ease:"power2.out"});
  gsap.fromTo("#bagCount",{scale:.4},{scale:1,duration:.6,ease:"back.out(4)"});
}
function fly(src, id){
  if(typeof gsap==="undefined") return;
  const s = src.getBoundingClientRect(), bar = $("#bagbar .ico").getBoundingClientRect();
  const el = document.createElement("div"); el.className="fly";
  const img = src.closest(".item")?.querySelector("img");
  el.innerHTML = img ? `<img src="${img.src}" alt="">` : "";
  document.body.appendChild(el);
  const x0 = s.left + s.width/2 - 23, y0 = s.top + s.height/2 - 23;
  const tx = (bar.top ? bar.left + bar.width/2 : innerWidth/2) - 23, ty = (bar.top && bar.top < innerHeight ? bar.top : innerHeight-60) - 10;
  gsap.set(el,{x:x0,y:y0,scale:.3});
  gsap.timeline({onComplete:()=>el.remove()})
    .to(el,{scale:1.1,duration:.25,ease:"back.out(3)"})
    .to(el,{x:tx,duration:.7,ease:"power1.inOut"},.15)
    .to(el,{y:y0-120,duration:.3,ease:"power2.out"},.15)
    .to(el,{y:ty,duration:.4,ease:"power2.in"},.45)
    .to(el,{scale:.2,opacity:0,duration:.2},.75);
}
let tt;
function toast(m){ const t=$("#toast"); t.textContent=m; t.classList.add("show"); clearTimeout(tt); tt=setTimeout(()=>t.classList.remove("show"),1600); }

// drawer
let lenis;
function openBag(){ $("#drawer").classList.add("show"); $("#drawer").setAttribute("aria-hidden","false"); $("#scrim").classList.add("show"); $("#bagbar").classList.remove("show"); lenis && lenis.stop(); document.body.style.overflow="hidden"; setTimeout(()=>$("#closeBag").focus(),300); }
function closeBag(){ $("#drawer").classList.remove("show"); $("#drawer").setAttribute("aria-hidden","true"); $("#scrim").classList.remove("show"); lenis && lenis.start(); document.body.style.overflow=""; render(); }
$("#openBag").onclick = openBag; $("#closeBag").onclick = closeBag; $("#scrim").onclick = closeBag;
addEventListener("keydown",e=>{ if(e.key==="Escape") closeBag(); });

// checkout
const form = $("#checkout");
form.addEventListener("change",()=>{
  const tipo = form.tipo.value, pag = form.pag.value;
  $("#addrBox").classList.toggle("hidden", tipo!=="Delivery");
  $("#troco").classList.toggle("hidden", pag!=="Dinheiro");
  $("#feeNote").textContent = tipo==="Delivery" ? "A taxa de entrega é confirmada pelo WhatsApp." : tipo==="Retirada" ? "Retire na Av. Padre Rocha, 305. Avisamos quando estiver pronto." : "Peça e a gente prepara para quando você chegar.";
});
$("#send").onclick = ()=>{
  const nome = $("#nome").value.trim(), tipo = form.tipo.value, rua = $("#rua").value.trim();
  $("#nome").classList.toggle("err", !nome);
  $("#rua").classList.toggle("err", tipo==="Delivery" && !rua);
  if(!nome || (tipo==="Delivery" && !rua)){ toast(!nome ? "Digite seu nome" : "Digite o endereço de entrega"); (!nome?$("#nome"):$("#rua")).focus(); return; }
  const L = [];
  L.push("*NOVO PEDIDO · TAKARONO* 🍣","");
  Object.entries(bag).forEach(([k,q])=>L.push(`${q}x ${ITENS[k].nome} — ${brl(q*ITENS[k].preco)}`));
  L.push("",`*Subtotal: ${brl(total())}*`,"");
  L.push(`*Nome:* ${nome}`, `*Tipo:* ${tipo}`);
  if(tipo==="Delivery"){ L.push(`*Endereço:* ${rua}`); const ref=$("#ref").value.trim(); if(ref) L.push(`*Referência:* ${ref}`); }
  let pg = form.pag.value; const tr = $("#troco").value.trim(); if(pg==="Dinheiro" && tr) pg += ` (troco para R$ ${tr})`;
  L.push(`*Pagamento:* ${pg}`);
  const obs = $("#obs").value.trim(); if(obs) L.push(`*Obs.:* ${obs}`);
  if(tipo==="Delivery") L.push("","_Aguardo a confirmação com a taxa de entrega._");
  window.open(waLink(L.join("\n")),"_blank");
};
render();

// avaliações reais (trechos de avaliações públicas no Google)
const QUOTES = ["A execução da culinária japonesa ali é impecável.","Frescor absoluto dos insumos.","O temaki é gigante!","O temaki bom, tamboril saboroso e yakisoba ótimo.","Funcionários formidáveis e serviço espetacular.","A comida é extremamente saborosa.","Não deixe de provar o Joy de maracujá.","Atendimento muito bom."];
$("#quotes").innerHTML = [...QUOTES,...QUOTES].map(q=>`<div class="q"><p>“${q}”</p><small>Avaliação no Google</small></div>`).join("");

// categorias: clique e indicador
const ind = $("#catInd");
function setCat(id){
  $$(".cat").forEach(c=>c.classList.toggle("on", c.dataset.go===id));
  const c = $(`.cat[data-go="${id}"]`); if(!c) return;
  ind.style.width = c.offsetWidth+"px"; ind.style.transform = `translateX(${c.offsetLeft}px)`;
  const box = $("#cats"); box.scrollTo({left:c.offsetLeft - box.clientWidth/2 + c.offsetWidth/2, behavior:"smooth"});
}
$$(".cat").forEach(c=>c.onclick=()=>{
  const t = $("#g-"+c.dataset.go);
  lenis ? lenis.scrollTo(t,{offset:-140,duration:1.2}) : t.scrollIntoView({behavior:"smooth"});
});
setCat(slug(CARDAPIO[0].cat));
const catIO = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting) setCat(e.target.dataset.cat); }),{rootMargin:"-40% 0px -55% 0px"});
$$(".group").forEach(g=>catIO.observe(g));

// nav sólida ao rolar
const nav = $("#nav");
const onScroll = () => nav.classList.toggle("solid", scrollY > innerHeight*.6);
addEventListener("scroll", onScroll, {passive:true}); onScroll();

/* ===================== ANIMAÇÕES ===================== */
if(typeof gsap === "undefined"){
  $("#loader").remove();
  $$(".hero-word .ch>span").forEach(e=>e.style.transform="none");
  $$(".hero .up").forEach(e=>{e.style.opacity=1;e.style.transform="none"});
  Object.assign($(".hero-roll img").style,{scale:1,opacity:1});
} else {
  gsap.registerPlugin(ScrollTrigger);

  if(typeof Lenis !== "undefined"){
    lenis = new Lenis({lerp:.1});
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(t=>lenis.raf(t*1000));
    gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
      const id=a.getAttribute("href"); if(id.length<2) return;
      e.preventDefault(); lenis.scrollTo(id,{duration:1.4});
    }));
  }

  // abertura
  lenis && lenis.stop();
  gsap.set(".hero-roll img",{rotate:-40});
  gsap.timeline({defaults:{ease:"expo.out"}, onComplete:()=>{ lenis && lenis.start(); $("#loader").remove(); }})
    .from("#loader-logo",{scale:0,rotate:-120,duration:1,ease:"back.out(1.6)"})
    .to(".loader-word span",{y:0,stagger:.05,duration:.8},"-=.5")
    .to("#loader",{yPercent:-100,duration:1.1,ease:"expo.inOut"},"+=.3")
    .to(".hero-word .ch>span",{y:0,stagger:.06,duration:1.3},"-=.55")
    .to(".hero-roll img",{scale:1,opacity:1,rotate:0,duration:1.8},"-=1.2")
    .to(".hero .up",{opacity:1,y:0,stagger:.1,duration:1},"-=1.2");

  // rolinho segue o mouse e gira com o scroll
  const roll = $("#roll");
  const rx = gsap.quickTo(roll,"x",{duration:1,ease:"power3"}), ry = gsap.quickTo(roll,"y",{duration:1,ease:"power3"});
  addEventListener("mousemove",e=>{ rx((e.clientX/innerWidth-.5)*40); ry((e.clientY/innerHeight-.5)*30); });
  gsap.timeline({scrollTrigger:{trigger:"#hero",start:"top top",end:"bottom top",scrub:true}})
    .to(roll,{scale:1.5,rotate:90,ease:"none"},0)
    .to(".hero-word .ch:nth-of-type(-n+4)",{xPercent:-60,ease:"none"},0)
    .to(".hero-word .ch:nth-of-type(n+5)",{xPercent:60,ease:"none"},0)
    .to(".hero-word",{opacity:0,ease:"none"},0)
    .to(".hero-foot",{opacity:0,y:-60,ease:"none"},0);

  // faixa que acelera com o scroll
  const band = $("#band"); let bx=0, boost=0, dir=1;
  ScrollTrigger.create({onUpdate:s=>{ boost=Math.min(Math.abs(s.getVelocity())/300,12); dir=s.direction; }});
  gsap.ticker.add(()=>{ const half=band.scrollWidth/2; bx-=(1.2+boost)*dir; boost*=.92; if(bx<=-half) bx+=half; if(bx>0) bx-=half; gsap.set(band,{x:bx}); });

  // cardápio
  gsap.from(".menu-head h2",{yPercent:70,opacity:0,duration:1.2,ease:"expo.out",scrollTrigger:{trigger:".menu-head",start:"top 85%"}});
  $$(".group").forEach(g=>{
    gsap.from(g.querySelector("h3"),{x:-40,opacity:0,duration:1,ease:"expo.out",scrollTrigger:{trigger:g,start:"top 85%"}});
    gsap.from(g.querySelectorAll(".item"),{y:50,opacity:0,duration:.9,ease:"expo.out",stagger:.07,scrollTrigger:{trigger:g,start:"top 80%"}});
    g.querySelectorAll(".thumb").forEach(t=>gsap.from(t,{clipPath:"inset(100% 0 0 0 round 16px)",duration:1.2,ease:"expo.inOut",scrollTrigger:{trigger:t,start:"top 90%"}}));
  });

  // avaliações
  const sc={v:0,c:0};
  gsap.fromTo(sc,{v:0,c:0},{v:4.5,c:484,duration:2,ease:"power3.out",scrollTrigger:{trigger:".score",start:"top 80%"},onUpdate:()=>{ $("#scoreNum").textContent=sc.v.toFixed(1).replace(".",","); $("#revCount").textContent=Math.round(sc.c); }});
  gsap.from(".stars svg",{scale:0,rotate:-90,stagger:.08,duration:.6,ease:"back.out(3)",scrollTrigger:{trigger:".score",start:"top 80%"}});

  // info e mapa
  gsap.from(".info-sec h2",{yPercent:50,opacity:0,duration:1.2,ease:"expo.out",scrollTrigger:{trigger:".info-sec",start:"top 75%"}});
  gsap.from(".hours div,.perks span",{y:20,opacity:0,stagger:.04,duration:.7,ease:"power3.out",scrollTrigger:{trigger:".hours",start:"top 85%"}});
  gsap.from("#map",{clipPath:"inset(100% 0 0 0 round 28px)",duration:1.4,ease:"expo.inOut",scrollTrigger:{trigger:"#map",start:"top 85%"}});

  // final
  gsap.from("#finalTitle",{scale:.7,opacity:0,ease:"none",scrollTrigger:{trigger:".final",start:"top 90%",end:"top 30%",scrub:true}});
  gsap.from("#mascot",{yPercent:60,rotate:-20,ease:"none",scrollTrigger:{trigger:".final",start:"top 70%",end:"bottom bottom",scrub:true}});
}
