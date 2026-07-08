/* Antalya Vize Danışmanlığı — etkileşim JS (React'siz, hızlı) */
(function(){
  "use strict";
  var WA = "905066937439";
  function waLink(msg){ return "https://wa.me/"+WA+"?text="+encodeURIComponent(msg); }

  /* ---- Yıl ---- */
  var y = document.getElementById("year"); if(y) y.textContent = new Date().getFullYear();

  /* ---- Scroll reveal ---- */
  var els = document.querySelectorAll(".fade-up");
  if("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(function(el){ io.observe(el); });
  } else { els.forEach(function(el){ el.classList.add("in"); }); }

  /* ---- Veri kartı grafik animasyonları ---- */
  var statBox = document.getElementById("statCards");
  if(statBox){
    var animEls = statBox.querySelectorAll(".ring-fg,.spark-line,.gbar");
    var fire = function(){ animEls.forEach(function(el){ el.classList.add("in"); }); };
    if("IntersectionObserver" in window){
      var sio = new IntersectionObserver(function(entries){
        entries.forEach(function(e){ if(e.isIntersecting){ fire(); sio.disconnect(); } });
      }, { threshold: 0.3 });
      sio.observe(statBox);
    } else { fire(); }
  }

  /* ---- Mobil menü ---- */
  var btn = document.getElementById("menuBtn"), menu = document.getElementById("mobileMenu");
  if(btn && menu){
    btn.addEventListener("click", function(){
      var open = menu.classList.toggle("hidden") === false;
      btn.setAttribute("aria-expanded", String(open));
    });
    menu.querySelectorAll(".mobile-link").forEach(function(a){
      a.addEventListener("click", function(){ menu.classList.add("hidden"); btn.setAttribute("aria-expanded","false"); });
    });
  }

  /* ---- Yorumlar ---- */
  var yorumlar = [
    ["İlk Schengen başvurum reddedilmişti ve nedenini bile tam anlamamıştım. Dosyamı baştan incelediler, ret gerekçesine yönelik eksikleri giderdiler. İkinci başvurum olumlu sonuçlandı.","E. Yıldız","Almanya — Turistik"],
    ["Birleşik Krallık başvurumda banka hareketlerimin yetersiz göründüğünü fark edip nasıl güçlendireceğimi anlattılar. O detay olmasa muhtemelen ret alacaktım.","M. Karaca","Birleşik Krallık — Ziyaret"],
    ["ABD ticari vizesi için mülakata hazırlanırken hangi soruların geleceğini, nasıl yanıt vermem gerektiğini tek tek çalıştık. Mülakatta hiç tedirgin olmadım.","S. Demir","ABD — Ticari (B1/B2)"],
    ["Eşimle birlikte İtalya'ya gidecektik ama davet ve konaklama belgelerinde tutarsızlık vardı. Bunu önceden yakalayıp düzelttiler, başvurumuz sorunsuz geçti.","A. Şahin","İtalya — Aile Ziyareti"],
    ["Daha önce iki kez reddedilmiştim, umudumu kesmiştim. Önceki dosyalarımdaki hataları gösterip yeni bir strateji kurdular. Bu kez vizem onaylandı.","H. Demir","Fransa — Turistik"],
    ["Şirketim adına fuara katılmam gerekiyordu ve zaman çok kısaydı. Evrak listesini netleştirip süreci hızlandırdılar, randevuya yetiştik.","B. Aksoy","Hollanda — Ticari"]
  ];
  var rev = document.getElementById("reviews");
  if(rev){
    var star = '<svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="m12 2 3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7Z"/></svg>';
    rev.innerHTML = yorumlar.map(function(r){
      return '<figure class="fade-up in bg-slatey-100 rounded-xl p-7 border border-slatey-200 flex flex-col">'
        +'<div class="flex gap-0.5 text-accent-500 mb-4">'+star+star+star+star+star+'</div>'
        +'<blockquote class="text-slatey-700 leading-relaxed flex-1">"'+r[0]+'"</blockquote>'
        +'<figcaption class="mt-5 pt-5 border-t border-slatey-200"><div class="font-medium">'+r[1]+'</div><div class="text-xs text-slatey-500 mt-0.5">'+r[2]+'</div></figcaption></figure>';
    }).join("");
  }

  /* ---- Uygunluk Testi ---- */
  var QUESTIONS = [
    {key:"ulke",label:"Hedef ülke",w:0.7,q:"Hangi ülke veya bölge için başvuru yapmayı planlıyorsunuz?",opts:[
      ["Almanya, Fransa, İtalya ve diğer Schengen ülkeleri",10,"Schengen vizesiyle çok sayıda Avrupa ülkesine seyahat"],
      ["Birleşik Krallık",9,"İngiltere, İskoçya, Galler ve Kuzey İrlanda"],
      ["Amerika Birleşik Devletleri",8,"ABD turistik veya ticari (B1/B2) vizesi"],
      ["Henüz karar vermedim",6,"Size en uygun ülkeyi birlikte belirleyelim"]]},
    {key:"amac",label:"Seyahat amacı",w:0.7,q:"Seyahat amacınız nedir?",opts:[
      ["Turistik",9],["Ticari",10],["Aile / Arkadaş Ziyareti",8],["Eğitim",8],["Diğer",6]]},
    {key:"seyahat",label:"Seyahat geçmişi",w:1.1,q:"Daha önce yurt dışına çıktınız mı?",opts:[
      ["Birçok kez",10],["Bir kez",6],["Hiç çıkmadım",4]]},
    {key:"vize",label:"Vize geçmişi",w:1.2,q:"Daha önce vize aldınız mı?",opts:[
      ["Birden fazla kez",10],["Bir kez",8],["Hiç almadım",4]]},
    {key:"calisma",label:"Çalışma durumu",w:1.0,q:"Çalışma durumunuz nedir?",opts:[
      ["SGK'lı çalışan",9],["Şirket sahibi",10],["Devlet memuru",10],["Emekli",8],["Öğrenci",7],["Çalışmıyorum",4]]},
    {key:"gelir",label:"Düzenli gelir",w:1.2,q:"Düzenli geliriniz bulunuyor mu?",opts:[
      ["Evet",10],["Kısmen",6],["Hayır",3]]},
    {key:"birikim",label:"Banka birikimi",w:1.2,q:"Banka hesabınızda seyahatinizi destekleyecek birikim bulunuyor mu?",opts:[
      ["Evet",10],["Kısmen",6],["Hayır",3]]},
    {key:"ret",label:"Ret geçmişi",w:1.3,q:"Daha önce vize reddi aldınız mı?",opts:[
      ["Hayır",10],["Bir kez",5],["Birden fazla kez",2]]},
    {key:"tarih",label:"Seyahat tarihleri",w:0.7,q:"Seyahat tarihleriniz belli mi?",opts:[
      ["Evet",10],["Kısmen",6],["Hayır",4]]},
    {key:"belge",label:"Evrak hazırlığı",w:0.8,q:"Belgelerinizi hazırlamaya başladınız mı?",opts:[
      ["Büyük ölçüde hazır",10],["Kısmen hazır",6],["Henüz başlamadım",3]]}
  ];
  var STRONG = {seyahat:"Seyahat geçmişiniz",vize:"Daha önce vize almış olmanız",gelir:"Düzenli gelirinizin bulunması",birikim:"Seyahati destekleyen birikiminiz",calisma:"İstikrarlı çalışma durumunuz",ret:"Ret geçmişinizin bulunmaması",belge:"Evrak hazırlığınızın ilerlemiş olması",tarih:"Seyahat planınızın netliği",amac:"Seyahat amacınızın net olması",ulke:"Hedef ülkenizin belirli olması"};
  var WEAK = {seyahat:"Seyahat geçmişinin güçlendirilmesi",vize:"İlk kez başvuru olması",gelir:"Gelir belgelerinin netleştirilmesi",birikim:"Banka birikiminin desteklenmesi",calisma:"Çalışma/bağ belgelerinin güçlendirilmesi",ret:"Önceki ret kararının doğru ele alınması",belge:"Evrak hazırlık durumu",tarih:"Seyahat planının netleştirilmesi",amac:"Seyahat amacının netleştirilmesi",ulke:"Hedef ülkenin belirlenmesi"};

  var step = 0, ans = {};
  var qEl = document.getElementById("testQuestion"),
      rEl = document.getElementById("testResult"),
      statusEl = document.getElementById("testStatus"),
      pctEl = document.getElementById("testPct"),
      barEl = document.getElementById("testBar");
  if(!qEl) return;
  var total = QUESTIONS.length;
  var arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="w-4 h-4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  function esc(s){ return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];}); }

  function renderQuestion(){
    rEl.classList.add("hidden"); qEl.classList.remove("hidden");
    var Q = QUESTIONS[step];
    var pct = Math.round((step/total)*100);
    statusEl.textContent = "Soru "+(step+1)+" / "+total;
    pctEl.textContent = pct+"% tamamlandı";
    barEl.style.width = pct+"%";
    var html = '<h3 class="font-display font-semibold text-xl md:text-2xl mb-6">'+esc(Q.q)+'</h3><div class="space-y-3">';
    Q.opts.forEach(function(o,idx){
      var active = ans[Q.key] && ans[Q.key][0]===o[0];
      html += '<button data-idx="'+idx+'" class="optBtn w-full text-left rounded-xl border px-5 py-4 transition flex items-center justify-between gap-4 group '+(active?"border-violet-400 bg-brand-500/10":"border-slatey-200 hover:border-violet-400/50 hover:bg-white/5")+'">'
        +'<span class="min-w-0"><span class="block text-slatey-700 group-hover:text-slatey-900 font-medium leading-snug">'+esc(o[0])+'</span>'
        +(o[2]?'<span class="block text-sm text-slatey-500 mt-0.5 leading-snug">'+esc(o[2])+'</span>':'')+'</span>'
        +'<span class="text-slatey-500 group-hover:text-brand-600 shrink-0">'+arrow+'</span></button>';
    });
    html += '</div>';
    if(step>0) html += '<button id="backBtn" class="mt-6 text-sm text-slatey-500 hover:text-slatey-900 inline-flex items-center gap-1.5"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="w-4 h-4"><path d="M19 12H5M11 18l-6-6 6-6"/></svg> Geri</button>';
    qEl.innerHTML = html;
    qEl.querySelectorAll(".optBtn").forEach(function(b){
      b.addEventListener("click", function(){
        var o = QUESTIONS[step].opts[+b.getAttribute("data-idx")];
        ans[QUESTIONS[step].key] = o;
        step++;
        if(step>=total) renderResult(); else renderQuestion();
      });
    });
    var bk = document.getElementById("backBtn");
    if(bk) bk.addEventListener("click", function(){ if(step>0){ step--; renderQuestion(); } });
  }

  function calc(){
    var wsum=0, max=0;
    QUESTIONS.forEach(function(q){ var o=ans[q.key]; if(o) wsum+=o[1]*q.w; max+=10*q.w; });
    var raw=(wsum/max)*100;
    var adj = raw>=92 ? 88+(raw-92)*1.5 : raw*0.955+2;
    return Math.max(0, Math.min(100, Math.round(adj)));
  }

  function renderResult(){
    qEl.classList.add("hidden"); rEl.classList.remove("hidden");
    statusEl.textContent = "Değerlendirme Sonucu"; pctEl.textContent = "Tamamlandı"; barEl.style.width = "100%";
    var score = calc();
    var band = score>=90?["Çok Güçlü Başvuru Profili","text-accent-500","#0d9488"]
      : score>=75?["Güçlü Başvuru Profili","text-accent-500","#0d9488"]
      : score>=60?["Geliştirilebilir Başvuru Profili","text-amber-300","#f5c451"]
      : score>=40?["Ek Hazırlık Gerekiyor","text-amber-400","#eab14a"]
      : ["Uzman İncelemesi Önerilir","text-brand-600","#0ea5e9"];
    var strengths=[], weaks=[];
    QUESTIONS.forEach(function(q){ var o=ans[q.key]; if(!o) return; if(o[1]>=9 && STRONG[q.key]) strengths.push(STRONG[q.key]); else if(o[1]<=6 && WEAK[q.key]) weaks.push(WEAK[q.key]); });
    var expert = score>=90 ? "Paylaştığınız bilgiler doğrultusunda başvurunuz oldukça güçlü görünmektedir. Doğru sunulmuş bir dosyayla başvurunuzun başarı şansı yüksektir; yine de kesin değerlendirme için dosyanızın uzmanlarımız tarafından incelenmesini öneririz."
      : score>=75 ? "Paylaştığınız bilgiler doğrultusunda başvurunuz olumlu görünmektedir. Birkaç alanın güçlendirilmesiyle dosyanız daha da sağlamlaşır. Kesin değerlendirme için dosyanızın uzmanlarımız tarafından incelenmesi önerilir."
      : score>=60 ? "Başvurunuzun temeli uygun; ancak bazı alanların güçlendirilmesi onay şansınızı belirgin şekilde artıracaktır. Dikkat edilmesi gereken noktaları birlikte ele alabiliriz."
      : score>=40 ? "Başvurunuzdan önce bazı alanlarda ek hazırlık yapılması önerilir. Doğru bir strateji ve eksiksiz bir dosya ile durumunuzu önemli ölçüde güçlendirebiliriz."
      : "Mevcut bilgiler doğrultusunda başvurunuzun bir uzman tarafından detaylı incelenmesi önemlidir. Endişelenmeyin; doğru hazırlık ve stratejiyle birçok zorluk aşılabilir. Sizin için en uygun yolu birlikte belirleyelim.";

    var C=2*Math.PI*52, off=C*(1-score/100);
    // Hero paneli diliyle: her cevap için renkli durum satırı
    function statusOf(v){
      if(v>=9) return ["Güçlü","text-accent-500"];
      if(v>=7) return ["İyi","text-accent-500"];
      if(v>=5) return ["Geliştirilebilir","text-amber-300"];
      return ["Dikkat","text-brand-600"];
    }
    var panelRows = QUESTIONS.map(function(q){
      var o = ans[q.key]; if(!o) return "";
      var st = statusOf(o[1]);
      return '<div class="flex items-center justify-between gap-3 bg-slatey-100 rounded-lg px-4 py-2.5">'
        +'<span class="text-sm text-slatey-700">'+esc(q.label)+'</span>'
        +'<span class="text-sm font-medium '+st[1]+'">'+st[0]+'</span></div>';
    }).join("");

    // WhatsApp özeti
    var lines = QUESTIONS.map(function(q){ return "• "+q.label+": "+(ans[q.key]?ans[q.key][0]:"-"); }).join("\n");
    var sPart = strengths.length ? ("\n\nGüçlü yönler:\n"+strengths.map(function(s){return "✓ "+s;}).join("\n")) : "";
    var wPart = weaks.length ? ("\n\nDikkat alanları:\n"+weaks.map(function(s){return "⚠ "+s;}).join("\n")) : "";
    var waMsg = "Vize Uygunluk Ön Değerlendirme Sonucum\n\nGenel Skor: "+score+"/100\nBaşvuru Gücü: "+band[0]+"\n\nYanıtlarım:\n"+lines+sPart+wPart+"\n\nÜcretsiz uzman ön değerlendirmesi talep ediyorum.";

    rEl.innerHTML =
      '<div class="text-center mb-8"><div class="relative inline-grid place-items-center mb-4">'
      +'<svg viewBox="0 0 120 120" class="w-40 h-40 -rotate-90"><defs><linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0ea5e9"/><stop offset="55%" stop-color="#a855f7"/><stop offset="100%" stop-color="#2dd4bf"/></linearGradient></defs><circle cx="60" cy="60" r="52" fill="none" stroke="#e2e8f0" stroke-width="10"/>'
      +'<circle cx="60" cy="60" r="52" fill="none" stroke="url(#ringGrad)" stroke-width="10" stroke-linecap="round" stroke-dasharray="'+C+'" stroke-dashoffset="'+C+'" style="transition:stroke-dashoffset 1.1s ease" id="scoreRing"/></svg>'
      +'<div class="absolute text-center"><div class="font-display font-bold text-5xl grad-text">'+score+'</div><div class="text-xs text-slatey-500">/ 100</div></div></div>'
      +'<div class="text-xs text-slatey-500 uppercase tracking-[0.2em] mb-1">Başvuru Gücü</div><h3 class="font-display font-bold text-2xl '+band[1]+'">'+esc(band[0])+'</h3></div>'
      +'<div class="glass rounded-xl p-5 mb-6">'
      +'<div class="flex items-center gap-2 mb-4 grad-text font-display font-semibold"><svg viewBox="0 0 24 24" fill="none" stroke="url(#icoGrad)" stroke-width="1.6" class="w-5 h-5"><path d="M3 3v18h18M7 14l3-3 3 3 4-5"/></svg> Değerlendirme Paneliniz</div>'
      +'<div class="space-y-2.5">'+panelRows+'</div>'
      +'<div class="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 pt-4 border-t border-slatey-200 text-xs text-slatey-500">'
      +'<span class="inline-flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-mint-400"></span> Güçlü</span>'
      +'<span class="inline-flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-amber-300"></span> Geliştirilebilir</span>'
      +'<span class="inline-flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-violet-300"></span> Dikkat</span>'
      +'</div></div>'
      +'<div class="bg-slatey-100 border border-slatey-200 rounded-xl p-5 mb-7"><div class="flex items-center gap-2 mb-2 grad-text font-display font-semibold"><svg viewBox="0 0 24 24" fill="none" stroke="url(#icoGrad)" stroke-width="1.6" class="w-5 h-5"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM12 8v.01M11 12h1v4h1"/></svg> Uzman Yorumu</div><p class="text-slatey-700 leading-relaxed text-[15px]">'+esc(expert)+'</p></div>'
      +'<a href="'+waLink(waMsg)+'" target="_blank" rel="noopener" class="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1ebe5b] text-white font-semibold px-7 py-4 rounded-xl transition font-display"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="w-5 h-5"><path d="M20 12a8 8 0 1 0-3 6.2L21 20l-1.5-3.5A8 8 0 0 0 20 12Z"/></svg> Sonucumu WhatsApp\'tan Gönder</a>'
      +'<button id="resetBtn" class="block mx-auto mt-4 text-sm text-slatey-500 hover:text-slatey-900">Testi yeniden başlat</button>'
      +'<p class="text-xs text-slatey-500 mt-5 text-center max-w-md mx-auto">Bu ön değerlendirme yalnızca bilgilendirme amaçlıdır ve vize garantisi anlamına gelmez. Nihai karar ilgili konsolosluğa aittir. <a href="#kvkk" class="underline hover:text-slatey-700">KVKK</a></p>';

    // halka animasyonu
    setTimeout(function(){ var ring=document.getElementById("scoreRing"); if(ring) ring.style.strokeDashoffset = off; }, 60);
    var rb = document.getElementById("resetBtn");
    if(rb) rb.addEventListener("click", function(){ step=0; ans={}; renderQuestion(); });
  }

  renderQuestion();

  /* ---- İmleci takip eden ışık huzmesi ---- */
  (function cursorGlow(){
    // dokunmatik cihazlarda / reduced-motion tercihinde çalıştırma
    if(window.matchMedia && (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    var glow = document.createElement("div");
    glow.id = "cursorGlow";
    document.body.appendChild(glow);
    var tx = window.innerWidth/2, ty = window.innerHeight*0.25;
    var cx = tx, cy = ty, raf = null;
    function onMove(e){ tx = e.clientX; ty = e.clientY; if(!raf) raf = requestAnimationFrame(loop); }
    function loop(){
      // yumuşak takip (lerp): hedefe doğru %8 yaklaş
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      glow.style.transform = "translate3d("+(cx-300)+"px,"+(cy-300)+"px,0)";
      if(Math.abs(tx-cx) > 0.5 || Math.abs(ty-cy) > 0.5){ raf = requestAnimationFrame(loop); }
      else { raf = null; }
    }
    window.addEventListener("mousemove", onMove, { passive:true });
    // sayfa yüklenince ortadan başlasın
    glow.style.transform = "translate3d("+(cx-300)+"px,"+(cy-300)+"px,0)";
  })();
})();
