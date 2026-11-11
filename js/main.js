(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const catLabel = Object.fromEntries(window.CATEGORIES.map((c) => [c.key, c.label]));
  const projects = window.PROJECTS;
  const videos = window.VIDEOS || [];
  const byId = (id) => projects.find((p) => p.id === id);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ================= loader ================= */
  const loader = $("#loader");
  const countEl = $("#loaderCount");
  const barEl = $("#loaderBar");
  let pct = 0;
  let pageLoaded = document.readyState === "complete";
  addEventListener("load", () => (pageLoaded = true));
  const minTime = reduce ? 0 : 1300;
  const t0 = performance.now();
  function tick() {
    const elapsed = performance.now() - t0;
    const target = pageLoaded || elapsed > 4000 ? 100 : Math.min(90, (elapsed / minTime) * 90);
    pct += (target - pct) * 0.12 + 0.3;
    if (pct > 100) pct = 100;
    countEl.textContent = Math.floor(pct);
    barEl.style.width = pct + "%";
    if (pct >= 100 && elapsed >= minTime) return finish();
    requestAnimationFrame(tick);
  }
  function finish() {
    loader.classList.add("is-done");
    document.body.classList.remove("is-loading");
    document.body.classList.add("is-ready");
    setTimeout(() => loader.remove(), 1100);
  }
  requestAnimationFrame(tick);

  /* ================= cursor ================= */
  const cursor = $("#cursor");
  const dot = $("#cursorDot");
  const cursorLabel = $("#cursorLabel");
  if (fine && !reduce) {
    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
    addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    });
    (function loop() {
      cx += (mx - cx) * 0.18; cy += (my - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px, ${cy}px)`;
      requestAnimationFrame(loop);
    })();
    document.addEventListener("mouseover", (e) => {
      const view = e.target.closest("[data-view]");
      const hov = e.target.closest("a, button, [data-hover]");
      cursor.classList.toggle("is-view", !!view);
      cursor.classList.toggle("is-play", !!view && view.dataset.view === "Play");
      cursor.classList.toggle("is-hover", !view && !!hov);
      cursor.classList.toggle("on-light", !!e.target.closest(".paper"));
      if (view) cursorLabel.textContent = view.dataset.view || "View";
    });
    document.addEventListener("mouseleave", () => { cursor.style.opacity = 0; dot.style.opacity = 0; });
    document.addEventListener("mouseenter", () => { cursor.style.opacity = 1; dot.style.opacity = 1; });
  } else {
    cursor.remove(); dot.remove();
  }

  // magnetic buttons
  const magnetize = (el) => {
    if (!fine || reduce) return;
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
    });
    el.addEventListener("mouseleave", () => (el.style.transform = ""));
  };
  $$(".magnetic").forEach(magnetize);

  /* ================= nav ================= */
  const nav = $("#nav");
  const burger = $("#burger");
  const menu = $("#menu");
  let lastY = 0;
  addEventListener("scroll", () => {
    const y = scrollY;
    nav.classList.toggle("is-scrolled", y > 40);
    lastY = y;
  }, { passive: true });
  const setMenu = (open) => {
    menu.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open);
    menu.setAttribute("aria-hidden", !open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
  $$("#menu a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

  const links = $$(".nav__links a");
  const secObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const id = en.target.id === "workfolio" ? "work" : en.target.id;
      links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === "#" + id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["about", "work", "workfolio", "reels", "services", "words", "contact"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) secObs.observe(el);
  });

  /* ================= hero: the design desk ================= */
  const hero = $("#hero");
  const scene = $("#scene");
  const layers = $$(".desk .layer");
  layers.forEach((l) => l.style.setProperty("--d", l.dataset.depth));

  // parallax
  if (fine && !reduce) {
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      scene.style.setProperty("--px", (((e.clientX - r.left) / r.width) - 0.5) * -18);
      scene.style.setProperty("--py", (((e.clientY - r.top) / r.height) - 0.5) * -12);
    });
    hero.addEventListener("pointerleave", () => { scene.style.setProperty("--px", 0); scene.style.setProperty("--py", 0); });
  }

  // lamp: monochrome → colour
  const lamp = $("#lamp");
  const hintText = $("#lampHintText");
  let lampTouched = false;
  const setLamp = (on, flick) => {
    hero.classList.toggle("is-lit", on);
    lamp.setAttribute("aria-pressed", on);
    if (on && flick && !reduce) {
      hero.classList.remove("flicker"); void hero.offsetWidth; hero.classList.add("flicker");
      setTimeout(() => hero.classList.remove("flicker"), 950);
    }
    hintText.textContent = on ? "ahh, colour!" : "click the lamp!";
  };
  const toggleLamp = () => { lampTouched = true; setLamp(!hero.classList.contains("is-lit"), true); };
  lamp.addEventListener("click", toggleLamp);
  lamp.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleLamp(); } });
  // if nobody finds the switch, the lamp flickers on by itself
  setTimeout(() => { if (!lampTouched && !hero.classList.contains("is-lit")) setLamp(true, true); }, reduce ? 0 : 5200);

  // monitor slideshow
  const screen = $("#screen");
  const shots = $$("image", screen);
  const screenLabel = $("#screenLabel");
  const screenList = shots.map((im) => byId(im.dataset.id)).filter(Boolean);
  let si = 0;
  const showShot = (n) => {
    si = (n + shots.length) % shots.length;
    shots.forEach((im, i) => im.classList.toggle("is-on", i === si));
    const p = byId(shots[si].dataset.id);
    if (p) { screenLabel.textContent = p.title; screen.setAttribute("aria-label", `Open ${p.title}`); }
  };
  showShot(0);
  if (!reduce) setInterval(() => { if (!screen.matches(":hover") && !document.hidden) showShot(si + 1); }, 2600);
  const openShot = () => openProject(shots[si].dataset.id, screenList);
  screen.addEventListener("click", openShot);
  screen.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openShot(); } });

  // pinned prints
  const pins = $$(".desk .pin");
  const pinList = pins.map((p) => byId(p.dataset.id)).filter(Boolean);
  pins.forEach((p) => {
    const go = () => openProject(p.dataset.id, pinList);
    p.addEventListener("click", go);
    p.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
  });

  // phone → reels
  const phone = $("#phone");
  const playPhone = () => { if (videos.length) openVideo(videos[0], videos); };
  phone.addEventListener("click", playPhone);
  phone.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); playPhone(); } });

  // cursor labels on scene objects
  lamp.dataset.view = "Switch";
  screen.dataset.view = "Open";
  phone.dataset.view = "Play";
  pins.forEach((p) => (p.dataset.view = "Open"));

  /* ================= what I do: taped cards ================= */
  $$(".wid__card").forEach((card) => {
    card.addEventListener("click", () => {
      const ref = card.dataset.ref;
      if (card.dataset.kind === "video") {
        const v = videos.find((x) => x.id === ref);
        if (v) openVideo(v, videos);
      } else {
        const p = byId(ref);
        if (p) openProject(ref, projects.filter((x) => x.cat === p.cat));
      }
    });
  });

  /* ================= split titles ================= */
  $$(".st").forEach((el) => {
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((word) => {
            if (!word) return;
            if (/^\s+$/.test(word)) { frag.appendChild(document.createTextNode(" ")); return; }
            const w = document.createElement("span"); w.className = "w";
            [...word].forEach((ch) => {
              const c = document.createElement("span"); c.className = "c"; c.textContent = ch;
              c.style.setProperty("--i", i++); w.appendChild(c);
            });
            frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    el.setAttribute("aria-label", el.textContent.trim());
    walk(el);
  });

  /* ================= featured stack ================= */
  const featured = projects.filter((p) => p.featured);
  const stack = $("#stack");
  stack.innerHTML = featured.map((p, i) => {
    const pics = (p.gallery.length ? p.gallery : [p.cover]).slice(0, 3);
    while (pics.length < 3) pics.push(p.cover);
    return `
    <article class="scard" style="--i:${i}; --c:${p.color || "#f3f0ea"}" data-id="${p.id}">
      <div class="scard__inner">
        <div class="scard__info">
          <div class="scard__top"><span class="scard__no">0${i + 1}</span><span class="scard__cat">${catLabel[p.cat]}</span></div>
          <h3 class="scard__title">${p.title}</h3>
          <p class="scard__client">${p.client}</p>
          <p class="scard__desc">${p.desc}</p>
          <div class="scard__tags">${p.tools.map((t) => `<span>${t}</span>`).join("")}<span>${p.imgs} visuals</span></div>
          <button class="scard__btn magnetic" data-open="${p.id}">${p.brief ? "Read the case study" : "Open project"} <i>↗</i></button>
        </div>
        <div class="scard__media" data-open="${p.id}" data-view="Open">
          ${pics.map((src, k) => `<figure><img src="${src}" alt="${p.title} — preview ${k + 1}" loading="lazy"></figure>`).join("")}
          <span class="scard__count">+${Math.max(0, p.imgs - 3)} more</span>
        </div>
        <div class="scard__shade"></div>
      </div>
    </article>`;
  }).join("");
  $$(".scard__btn", stack).forEach(magnetize);
  stack.addEventListener("click", (e) => {
    const t = e.target.closest("[data-open]");
    if (t) openProject(t.dataset.open, featured);
  });

  const scards = $$(".scard", stack);
  const stackFx = () => {
    if (innerWidth <= 860 || reduce) return;
    const vh = innerHeight;
    scards.forEach((card, i) => {
      const next = scards[i + 1];
      let p = 0;
      if (next) {
        const top = next.getBoundingClientRect().top;
        const stickTop = parseFloat(getComputedStyle(card).top) || 96;
        p = clamp((vh - top) / (vh - stickTop), 0, 1);
      }
      card.style.transform = `scale(${1 - p * 0.07})`;
      card.querySelector(".scard__shade").style.opacity = (p * 0.45).toFixed(3);
    });
  };
  let stackTick = false;
  addEventListener("scroll", () => {
    if (stackTick) return;
    stackTick = true;
    requestAnimationFrame(() => { stackFx(); stackTick = false; });
  }, { passive: true });
  addEventListener("resize", stackFx);
  stackFx();

  /* ================= workfolio grid ================= */
  const grid = $("#grid");
  const filters = $("#filters");
  const rest = projects.filter((p) => !p.featured);
  filters.innerHTML = window.CATEGORIES.map((c) => {
    const n = c.key === "all" ? rest.length : rest.filter((p) => p.cat === c.key).length;
    return n ? `<button class="filter" role="tab" data-filter="${c.key}" aria-selected="${c.key === "all"}" data-hover>${c.label}<sup>${String(n).padStart(2, "0")}</sup></button>` : "";
  }).join("");

  let gridList = rest;
  function renderGrid(key) {
    gridList = key === "all" ? rest : rest.filter((p) => p.cat === key);
    grid.innerHTML = gridList.map((p, i) => {
      const wide = key === "all" && (i === 0 || i === 7 || i === 12);
      return `
      <article class="card is-out ${wide ? "card--wide" : ""}" data-id="${p.id}" data-cat="${p.cat}" data-view="Open" tabindex="0" role="button" aria-label="Open ${p.title}">
        <div class="card__media">
          <span class="card__badge">${p.embeds.length ? "▶ Video" : catLabel[p.cat]}</span>
          <img src="${p.cover}" alt="${p.title} cover" loading="lazy" width="808" height="632">
          <span class="card__hover-title">${p.desc.split(" — ")[0].split(". ")[0]}</span>
          <span class="card__open">↗</span>
        </div>
        <div class="card__info">
          <div><h3 class="card__title">${p.title}</h3><span class="card__cat">${p.client}</span></div>
        </div>
      </article>`;
    }).join("");
    const cards = $$(".card", grid);
    const io = new IntersectionObserver((ents) => {
      ents.forEach((en) => {
        if (!en.isIntersecting) return;
        const c = en.target;
        setTimeout(() => c.classList.remove("is-out"), reduce ? 0 : (cards.indexOf(c) % 3) * 90);
        io.unobserve(c);
      });
    }, { threshold: 0.1 });
    cards.forEach((c) => io.observe(c));
    if (fine && !reduce) cards.forEach((c) => {
      const m = $(".card__media", c);
      c.addEventListener("mousemove", (e) => {
        const r = m.getBoundingClientRect();
        m.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 10}deg`);
        m.style.setProperty("--rx", `${((e.clientY - r.top) / r.height - 0.5) * -10}deg`);
      });
      c.addEventListener("mouseleave", () => { m.style.setProperty("--rx", "0deg"); m.style.setProperty("--ry", "0deg"); });
    });
  }
  renderGrid("all");
  filters.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn || btn.getAttribute("aria-selected") === "true") return;
    $$(".filter", filters).forEach((b) => b.setAttribute("aria-selected", b === btn));
    $$(".card", grid).forEach((c) => c.classList.add("is-out"));
    setTimeout(() => renderGrid(btn.dataset.filter), reduce ? 0 : 320);
  });
  grid.addEventListener("click", (e) => {
    const c = e.target.closest(".card");
    if (c) openProject(c.dataset.id, gridList);
  });
  grid.addEventListener("keydown", (e) => {
    const c = e.target.closest(".card");
    if (c && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openProject(c.dataset.id, gridList); }
  });

  /* ================= reels: looping previews + endless auto-scroll ================= */
  const track = $("#reelTrack");
  const vfilters = $("#vfilters");
  const reelItems = videos.map((v) => ({ type: v.type, label: v.label, title: v.title, sub: v.client, thumb: v.thumb, preview: v.preview, wide: !!v.wide, v }));
  vfilters.innerHTML = window.VIDEO_TYPES.map((t) => {
    const n = t.key === "all" ? reelItems.length : reelItems.filter((r) => r.type === t.key).length;
    return n ? `<button class="filter" role="tab" data-vf="${t.key}" aria-selected="${t.key === "all"}" data-hover>${t.label}<sup>${String(n).padStart(2, "0")}</sup></button>` : "";
  }).join("");
  track.innerHTML = reelItems.map((r, i) => `
    <article class="reel ${r.wide ? "reel--wide" : ""} ${r.preview ? "" : "reel--still"}" data-idx="${i}" data-type="${r.type}" data-view="Play" tabindex="0" role="button" aria-label="Play ${r.title}">
      <div class="reel__media">
        <span class="reel__notch"></span>
        <img src="${r.thumb}" alt="${r.title}" loading="lazy">
        ${r.preview && !reduce ? `<video class="reel__vid" src="${r.preview}" poster="${r.thumb}" muted loop playsinline preload="none" aria-hidden="true"></video>` : ""}
        <span class="reel__tag">${r.label}</span>
        <span class="reel__play" aria-hidden="true">▶</span>
        <div class="reel__cap"><h3>${r.title}</h3><p>${r.sub}</p></div>
      </div>
    </article>`).join("");
  // a second copy of the row makes the loop seamless
  $$(".reel", track).forEach((el) => {
    const c = el.cloneNode(true);
    c.classList.add("is-clone"); c.setAttribute("aria-hidden", "true"); c.tabIndex = -1;
    track.appendChild(c);
  });
  const reelEls = $$(".reel", track);
  const visibleReels = () => reelEls.filter((el) => !el.classList.contains("is-hidden") && !el.classList.contains("is-clone"));

  // previews play only while on screen
  const vids = $$(".reel__vid", track);
  const vio = new IntersectionObserver((ents) => {
    ents.forEach((en) => {
      const v = en.target;
      if (en.isIntersecting) { const p = v.play(); if (p && p.catch) p.catch(() => {}); }
      else v.pause();
    });
  }, { threshold: 0.2 });
  vids.forEach((v) => {
    vio.observe(v);
    v.addEventListener("playing", () => v.classList.add("is-playing"));
  });

  let pos = 0;
  const loopW = () => {
    const firstOrig = reelEls.find((el) => !el.classList.contains("is-clone") && !el.classList.contains("is-hidden"));
    const firstClone = reelEls.find((el) => el.classList.contains("is-clone") && !el.classList.contains("is-hidden"));
    return firstOrig && firstClone ? firstClone.offsetLeft - firstOrig.offsetLeft : 0;
  };

  vfilters.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    $$(".filter", vfilters).forEach((b) => b.setAttribute("aria-selected", b === btn));
    const key = btn.dataset.vf;
    reelEls.forEach((el) => el.classList.add("is-out"));
    setTimeout(() => {
      reelEls.forEach((el) => el.classList.toggle("is-hidden", key !== "all" && el.dataset.type !== key));
      pos = 0; track.scrollLeft = 0;
      reelEls.filter((el) => !el.classList.contains("is-hidden")).forEach((el, i) => setTimeout(() => el.classList.remove("is-out"), reduce ? 0 : Math.min(i, 8) * 60));
    }, reduce ? 0 : 280);
  });
  const openReel = (el) => {
    const r = reelItems[+el.dataset.idx];
    const list = visibleReels().map((x) => reelItems[+x.dataset.idx].v);
    openVideo(r.v, list.length ? list : videos);
  };
  let dragMoved = false;
  track.addEventListener("click", (e) => {
    if (dragMoved) { e.preventDefault(); return; }
    const el = e.target.closest(".reel");
    if (el) openReel(el);
  });
  track.addEventListener("keydown", (e) => {
    const el = e.target.closest(".reel");
    if (el && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openReel(el); }
  });

  // pause rules for the auto-scroll
  let hoverPause = false, holdUntil = 0, trackInView = false;
  const hold = (ms) => (holdUntil = performance.now() + ms);
  new IntersectionObserver(([en]) => (trackInView = en.isIntersecting)).observe(track);
  if (fine) {
    track.addEventListener("mouseenter", () => (hoverPause = true));
    track.addEventListener("mouseleave", () => (hoverPause = false));
    let down = false, sx = 0, sl = 0;
    track.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true; dragMoved = false; sx = e.clientX; sl = track.scrollLeft;
    });
    addEventListener("pointermove", (e) => {
      if (!down) return;
      const dx = e.clientX - sx;
      if (Math.abs(dx) > 6) { dragMoved = true; track.classList.add("is-drag"); }
      if (dragMoved) track.scrollLeft = sl - dx;
    });
    addEventListener("pointerup", () => {
      if (!down) return;
      down = false; track.classList.remove("is-drag"); hold(1200);
      setTimeout(() => (dragMoved = false), 0);
    });
  }
  ["touchstart", "touchmove", "wheel"].forEach((ev) => track.addEventListener(ev, () => hold(3000), { passive: true }));

  const reelBar = $("#reelBar");
  const prevBtn = $("#reelPrev"), nextBtn = $("#reelNext");
  const BAR = 18;
  reelBar.style.width = BAR + "%";
  const drawBar = (W) => {
    const p = W > 0 ? (pos % W) / W : 0;
    reelBar.style.transform = `translateX(${p * ((100 - BAR) / BAR) * 100}%)`;
  };
  const step = () => Math.max(260, track.clientWidth * 0.7);
  nextBtn.addEventListener("click", () => { hold(1400); track.scrollBy({ left: step(), behavior: "smooth" }); });
  prevBtn.addEventListener("click", () => {
    hold(1400);
    const W = loopW();
    if (W && track.scrollLeft < step()) { track.scrollLeft += W; pos = track.scrollLeft; }
    track.scrollBy({ left: -step(), behavior: "smooth" });
  });

  const SPEED = 36; // px per second
  let lastT = performance.now();
  (function loop(now) {
    const dt = Math.min(64, now - lastT) / 1000; lastT = now;
    const W = loopW();
    const running = !reduce && trackInView && !hoverPause && now > holdUntil && !document.hidden && !document.body.classList.contains("modal-open");
    if (running && W > 0) {
      pos += SPEED * dt;
      if (pos >= W) pos -= W;
      track.scrollLeft = pos;
    } else {
      pos = track.scrollLeft;
      if (W > 0 && pos >= W) { pos -= W; track.scrollLeft = pos; }
    }
    drawBar(W);
    requestAnimationFrame(loop);
  })(lastT);
  ["#driveLink", "#driveLink2"].forEach((s) => { const a = $(s); if (a && window.DRIVE_FOLDER) a.href = window.DRIVE_FOLDER; });

  /* ================= kind words (testimonials) ================= */
  const words = $("#words");
  const isLocal = ["localhost", "127.0.0.1", ""].includes(location.hostname);
  const quotes = window.TESTIMONIALS || [];
  // sample quotes never leave localhost — the live site only shows real ones
  if (words && quotes.length && (!window.TESTIMONIALS_ARE_SAMPLES || isLocal)) {
    words.hidden = false;
    $("#wordsFlag").hidden = !window.TESTIMONIALS_ARE_SAMPLES;
    const initials = (t) => t.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    $("#wordsWall").innerHTML = quotes.map((q, k) => `
      <li class="word" style="--k:${k}">
        <span class="word__pin" aria-hidden="true"></span>
        <blockquote class="word__q">${q.quote}</blockquote>
        <div class="word__who">
          <span class="word__avatar" aria-hidden="true">${initials(q.name)}</span>
          <span><b>${q.name}</b><small>${q.role}</small></span>
          <span class="word__stars" aria-label="5 out of 5">★★★★★</span>
        </div>
      </li>`).join("");
  }

  /* ================= WhatsApp ================= */
  if (window.WHATSAPP) {
    const wa = `https://wa.me/${window.WHATSAPP.number}?text=${encodeURIComponent(window.WHATSAPP.text)}`;
    ["#waFloat", "#waChip"].forEach((sel) => { const a = $(sel); if (a) a.href = wa; });
  }

  /* ================= services hover image ================= */
  const svcFloat = $("#svcFloat");
  if (fine && !reduce && svcFloat) {
    const img = $("img", svcFloat);
    let fx = 0, fy = 0, tx = 0, ty = 0, on = false;
    $$(".svc__item").forEach((it) => {
      it.addEventListener("mouseenter", () => { img.src = it.dataset.img; svcFloat.classList.add("is-on"); on = true; });
      it.addEventListener("mouseleave", () => { svcFloat.classList.remove("is-on"); on = false; });
    });
    addEventListener("mousemove", (e) => { tx = e.clientX + 170; ty = e.clientY; });
    (function loop() {
      if (on || svcFloat.classList.contains("is-on")) {
        fx += (tx - fx) * 0.14; fy += (ty - fy) * 0.14;
        svcFloat.style.left = fx + "px"; svcFloat.style.top = fy + "px";
      } else { fx = tx; fy = ty; }
      requestAnimationFrame(loop);
    })();
  }

  /* ================= project modal ================= */
  const modal = $("#modal");
  const panel = $("#modalPanel");
  let order = [], current = -1, lastFocus = null;

  function fill(p) {
    $("#modalCat").textContent = catLabel[p.cat];
    $("#modalTitle").textContent = p.title;
    $("#modalClient").textContent = p.client;
    $("#modalTools").textContent = p.tools.join(", ");
    $("#modalDesc").textContent = p.desc;
    $("#modalLink").href = p.url;
    const hasCase = !!(p.brief && p.idea && p.outcome);
    $("#modalCase").hidden = !hasCase;
    if (hasCase) {
      $("#caseBrief").textContent = p.brief;
      $("#caseIdea").textContent = p.idea;
      $("#caseOutcome").textContent = p.outcome;
    }
    const media = $("#modalMedia");
    const n = p.gallery.length;
    media.classList.toggle("is-grid", n > 1 && p.cat !== "ui");
    media.style.setProperty("--cols", n % 3 === 0 ? 3 : 2);
    if (p.embeds.length) {
      const v = p.embeds.length;
      media.classList.add("is-grid");
      media.style.setProperty("--cols", v % 3 === 0 ? 3 : 2);
      media.innerHTML = p.embeds.map((src, i) => `<div class="video video--tall"><iframe src="${src}" title="${p.title} — video ${i + 1}" loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>`).join("");
    } else {
      media.innerHTML = p.gallery.map((src, i) => `<img src="${src}" alt="${p.title} — image ${i + 1}" loading="${i < 2 ? "eager" : "lazy"}">`).join("");
      $$("img", media).forEach((im, i) => {
        const done = () => setTimeout(() => im.classList.add("is-loaded"), reduce ? 0 : Math.min(i, 4) * 90);
        im.complete ? done() : im.addEventListener("load", done, { once: true });
      });
    }
    const prev = order[(current - 1 + order.length) % order.length];
    const next = order[(current + 1) % order.length];
    $("#modalPrevName").textContent = order.length > 1 ? prev.title : "Previous";
    $("#modalNextName").textContent = order.length > 1 ? next.title : "Next";
    panel.scrollTop = 0;
  }
  function openProject(id, list) {
    order = list && list.length ? list : projects;
    current = order.findIndex((p) => p.id === id);
    if (current < 0) { order = projects; current = order.findIndex((p) => p.id === id); }
    if (current < 0) return;
    lastFocus = document.activeElement;
    fill(order[current]);
    modal.hidden = false;
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add("is-open")));
    $(".modal__close", modal).focus({ preventScroll: true });
  }
  function closeProject() {
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    setTimeout(() => { modal.hidden = true; $("#modalMedia").innerHTML = ""; }, reduce ? 0 : 800);
    lastFocus && lastFocus.focus({ preventScroll: true });
  }
  function stepProject(d) {
    current = (current + d + order.length) % order.length;
    fill(order[current]);
  }
  modal.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeProject(); });
  $("#modalPrev").addEventListener("click", () => stepProject(-1));
  $("#modalNext").addEventListener("click", () => stepProject(1));

  /* ================= video modal ================= */
  const vmodal = $("#vmodal");
  const vFrame = $("#vFrame");
  let vlist = [], vcur = -1, vLastFocus = null;
  function vfill(v) {
    vFrame.classList.toggle("is-wide", !!v.wide);
    vFrame.innerHTML = `<iframe src="${v.embed}" title="${v.title}" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
    $("#vTag").textContent = v.label;
    $("#vTitle").textContent = v.title;
    $("#vClient").textContent = v.client;
    const drive = v.source !== "behance";
    $("#vDrive").href = v.url;
    $("#vDrive").textContent = drive ? "Open in Drive ↗" : "View on Behance ↗";
    $("#vNote").textContent = drive ? "Playing from Google Drive — if it takes a second, it's buffering." : "Playing from Behance — if it takes a second, it's buffering.";
  }
  function openVideo(v, list) {
    vlist = list; vcur = vlist.indexOf(v);
    if (vcur < 0) { vlist = videos; vcur = videos.indexOf(v); }
    vLastFocus = document.activeElement;
    vfill(v);
    vmodal.hidden = false;
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => requestAnimationFrame(() => vmodal.classList.add("is-open")));
    $(".vmodal__close", vmodal).focus({ preventScroll: true });
  }
  function closeVideo() {
    vmodal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    setTimeout(() => { vmodal.hidden = true; vFrame.innerHTML = ""; }, reduce ? 0 : 500);
    vLastFocus && vLastFocus.focus({ preventScroll: true });
  }
  const vstep = (d) => { vcur = (vcur + d + vlist.length) % vlist.length; vfill(vlist[vcur]); };
  vmodal.addEventListener("click", (e) => { if (e.target.closest("[data-vclose]")) closeVideo(); });
  $("#vPrev").addEventListener("click", () => vstep(-1));
  $("#vNext").addEventListener("click", () => vstep(1));

  /* ================= keyboard ================= */
  const trap = (box, e) => {
    const f = $$("button, a[href], iframe", box);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };
  document.addEventListener("keydown", (e) => {
    if (!vmodal.hidden) {
      if (e.key === "Escape") closeVideo();
      if (e.key === "ArrowRight") vstep(1);
      if (e.key === "ArrowLeft") vstep(-1);
      if (e.key === "Tab") trap(vmodal, e);
      return;
    }
    if (!modal.hidden) {
      if (e.key === "Escape") closeProject();
      if (e.key === "ArrowRight") stepProject(1);
      if (e.key === "ArrowLeft") stepProject(-1);
      if (e.key === "Tab") trap(panel, e);
      return;
    }
    if (e.key === "Escape" && menu.classList.contains("is-open")) setMenu(false);
  });

  /* ================= reveals ================= */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("is-in");
      io.unobserve(en.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
  $$(".reveal-up, .reveal-pop, .st, .doodle, .contact__title, .wid, .wid-underline, .word").forEach((el) => io.observe(el));
  $$(".stickers, .notes, .about__right").forEach((wrap) =>
    [...wrap.children].forEach((c, i) => (c.style.transitionDelay = `${i * 0.12}s`))
  );

  /* ================= counters ================= */
  const cio = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target, end = +el.dataset.count, t = performance.now();
      const run = (now) => {
        const k = Math.min(1, (now - t) / 1400);
        el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(run);
      };
      requestAnimationFrame(run);
      cio.unobserve(el);
    });
  }, { threshold: 0.6 });
  $$("[data-count]").forEach((el) => cio.observe(el));

  /* ================= ticket tilt ================= */
  const ticket = $("#ticket");
  if (ticket && fine && !reduce) {
    ticket.addEventListener("mousemove", (e) => {
      const r = ticket.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      ticket.style.transform = `perspective(900px) rotate(-3deg) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    });
    ticket.addEventListener("mouseleave", () => (ticket.style.transform = ""));
  }

  $("#year").textContent = new Date().getFullYear();
})();
