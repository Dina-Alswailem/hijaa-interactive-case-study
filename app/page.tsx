"use client";

import { useEffect, useMemo, useState } from "react";

type Avatar = {
  id: string;
  label: string;
  alt: string;
  src: string;
  tone: string;
};

const avatars: Avatar[] = [
  {
    id: "boy-light",
    label: "الشخصية ١",
    alt: "شخصية طفل يرتدي الثوب والغترة",
    src: "/assets/hijaa-original/avatar-boy-light.png",
    tone: "#fff1a9",
  },
  {
    id: "girl-light",
    label: "الشخصية ٢",
    alt: "شخصية طفلة بشعر بني وقميص أخضر",
    src: "/assets/hijaa-original/avatar-girl-light.png",
    tone: "#d9f4c8",
  },
  {
    id: "boy-dark",
    label: "الشخصية ٣",
    alt: "شخصية طفل ببشرة داكنة يرتدي الثوب والغترة",
    src: "/assets/hijaa-original/avatar-boy-dark.webp",
    tone: "#c9e9ff",
  },
  {
    id: "girl-dark",
    label: "الشخصية ٤",
    alt: "شخصية طفلة ببشرة داكنة وشعر مجعّد",
    src: "/assets/hijaa-original/avatar-girl-dark.png",
    tone: "#ffd2bd",
  },
];

const colors = ["#f4a7c1", "#91a8ff", "#a8e8a0", "#ffd76a", "#c9a5ff"];

const teamStickers = [
  { src: "/assets/hijaa-team/member-01.png", alt: "ستيكر لعضوة من فريق هِجاء" },
  { src: "/assets/hijaa-team/member-02.png", alt: "ستيكر لعضوة من فريق هِجاء بنظارة على شكل نجمتين" },
  { src: "/assets/hijaa-team/member-03.png", alt: "ستيكر لعضوة من فريق هِجاء ترتدي خوذة" },
  { src: "/assets/hijaa-team/member-04.png", alt: "ستيكر لعضوة من فريق هِجاء تشير بعلامة الإعجاب" },
];

function SoundIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 10v4h3l5 4V6L8 10H5Z" fill="currentColor" />
      <path d="M16 9.2a4 4 0 0 1 0 5.6M18.6 6.8a7.4 7.4 0 0 1 0 10.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m15 5-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ReplayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 8V4m0 0h4M5 4l3 3a7 7 0 1 1-2 7" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function playTone(kind: "listen" | "success" = "listen") {
  if (typeof window === "undefined") return;
  const AudioContextClass = window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;

  const context = new AudioContextClass();
  const gain = context.createGain();
  gain.connect(context.destination);
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.12, context.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + (kind === "success" ? 1 : 0.55));

  const notes = kind === "success" ? [392, 523.25, 659.25, 783.99] : [440, 554.37];
  notes.forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    oscillator.connect(gain);
    const start = context.currentTime + index * 0.13;
    oscillator.start(start);
    oscillator.stop(start + 0.3);
  });
  window.setTimeout(() => context.close(), 1500);
}

function speak(word: string, success = false) {
  playTone(success ? "success" : "listen");
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "ar-SA";
  utterance.rate = success ? 0.78 : 0.7;
  utterance.pitch = 1.08;
  window.speechSynthesis.speak(utterance);
}

function Wave({ active = false }: { active?: boolean }) {
  return (
    <span className={`wave ${active ? "active" : ""}`} aria-hidden="true">
      {[12, 22, 32, 18, 27, 14].map((height, index) => (
        <i key={index} style={{ height, animationDelay: `${index * -0.08}s` }} />
      ))}
    </span>
  );
}

function Device({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`ipad-device ${className}`}>
      <span className="device-camera" aria-hidden="true" />
      <img src={src} alt={alt} decoding="async" />
    </div>
  );
}

const wordLetters = [
  { id: "b1", letter: "ب" },
  { id: "a", letter: "ا" },
  { id: "b2", letter: "ب" },
];

function WordDemo({ avatar }: { avatar: Avatar }) {
  const [placed, setPlaced] = useState<typeof wordLetters>([]);
  const [listening, setListening] = useState(false);
  const complete = placed.length === 3 && placed.map((item) => item.letter).join("") === "باب";
  const wrong = placed.length === 3 && !complete;

  useEffect(() => {
    if (complete) speak("أحسنت! عمل رائع", true);
  }, [complete]);

  function listen() {
    setListening(true);
    speak("باب");
    window.setTimeout(() => setListening(false), 1100);
  }

  function add(id: string) {
    if (placed.length === 3 || placed.some((item) => item.id === id)) return;
    const item = wordLetters.find((letter) => letter.id === id);
    if (item) setPlaced((current) => [...current, item]);
  }

  return (
    <div className={`word-demo ${complete ? "complete" : ""} ${wrong ? "wrong" : ""}`}>
      <div className="demo-toolbar">
        <span className="demo-tag">نموذج تفاعلي</span>
        <div className="chosen-mini"><img src={avatar.src} alt="" /><span>الشخصية المختارة</span></div>
        <button onClick={() => setPlaced([])} aria-label="إعادة النشاط"><ReplayIcon /></button>
      </div>
      <div className="door-activity"><img src="/assets/hijaa-original/door.webp" alt="رسم الباب الأصلي من تطبيق هِجاء" /></div>
      <button className="listen" onClick={listen}>
        <SoundIcon /><Wave active={listening} /><span>تشغيل الكلمة</span>
      </button>
      <div className="slots" aria-label="خانات كلمة باب">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            onClick={() => placed[index] && setPlaced((current) => current.filter((_, itemIndex) => itemIndex !== index))}
            aria-label={placed[index] ? `إزالة حرف ${placed[index].letter}` : `الخانة ${index + 1}`}
          >
            {placed[index]?.letter ?? ""}
          </button>
        ))}
      </div>
      <div className="letter-buttons" aria-label="الحروف المتاحة">
        {[wordLetters[2], wordLetters[0], wordLetters[1]].map((item, index) => (
          <button
            key={item.id}
            disabled={placed.some((letter) => letter.id === item.id)}
            onClick={() => add(item.id)}
            style={{ background: ["#f4a7c1", "#91a8ff", "#a8e8a0"][index] }}
          >
            {item.letter}
          </button>
        ))}
      </div>
      <p className="demo-status" aria-live="polite">
        {complete ? "أحسنت! اكتملت كلمة باب" : wrong ? "الترتيب غير صحيح، ويمكن المحاولة مرة أخرى" : "رتّب الحروف لتكوين الكلمة"}
      </p>
      {complete && (
        <div className="personal-success" role="status">
          <button className="success-close" onClick={() => setPlaced([])} aria-label="إغلاق رسالة النجاح">×</button>
          <div className="success-avatar" style={{ background: avatar.tone }}><img src={avatar.src} alt={avatar.alt} /></div>
          <span>Excellent!</span>
          <strong>أحسنت — عمل رائع ⭐</strong>
          <button onClick={() => speak("أحسنت! عمل رائع", true)}><SoundIcon /> تشغيل عبارة التشجيع</button>
        </div>
      )}
      {complete && <div className="celebration" aria-hidden="true">{Array.from({ length: 16 }).map((_, index) => <i key={index} style={{ "--index": index } as React.CSSProperties} />)}</div>}
    </div>
  );
}

function ColoringDemo() {
  const [color, setColor] = useState(colors[0]);
  const [pressed, setPressed] = useState(false);

  return (
    <div className="coloring-demo" data-reveal>
      <div className="coloring-canvas">
        <img className="coloring-mark" src="/assets/hijaa-original/coloring-icon.png" alt="أيقونة نشاط التلوين الأصلية" />
        <button
          className={`trace-letter ${pressed ? "pressed" : ""}`}
          onPointerDown={() => setPressed(true)}
          onPointerUp={() => setPressed(false)}
          onPointerLeave={() => setPressed(false)}
          onClick={() => speak("ألف")}
          aria-label="تلوين حرف الألف وسماع صوته"
          style={{ "--trace-color": color } as React.CSSProperties}
        >أ</button>
        <span>يمكن النقر على الحرف لسماع نطقه</span>
      </div>
      <div className="color-controls" aria-label="لوحة الألوان">
        {colors.map((item) => (
          <button
            key={item}
            onClick={() => { setColor(item); playTone("listen"); }}
            className={color === item ? "selected" : ""}
            style={{ background: item }}
            aria-label={`اختيار اللون ${item}`}
          />
        ))}
      </div>
    </div>
  );
}

function CharacterPicker({ selected, onSelect }: { selected: Avatar; onSelect: (avatar: Avatar) => void }) {
  return (
    <div className="character-picker" data-reveal>
      <div className="picker-top"><span>اختيار الشخصية</span><b>04 شخصيات أصلية</b></div>
      <div className="avatar-options">
        {avatars.map((avatar, index) => (
          <button
            key={avatar.id}
            className={selected.id === avatar.id ? "selected" : ""}
            onClick={() => { onSelect(avatar); playTone("listen"); }}
            aria-pressed={selected.id === avatar.id}
            aria-label={`اختيار ${avatar.label}`}
            style={{ "--avatar-tone": avatar.tone } as React.CSSProperties}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <img src={avatar.src} alt={avatar.alt} />
            <i aria-hidden="true">✓</i>
          </button>
        ))}
      </div>
      <div className="picker-result">
        <div style={{ background: selected.tone }}><img src={selected.src} alt="" /></div>
        <p><span>اختيار يرتبط ببقية الرحلة</span><strong>تظهر الشخصية المختارة مرة أخرى عند إتمام النشاط بنجاح.</strong></p>
      </div>
    </div>
  );
}

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar>(avatars[0]);
  const projectMeta = useMemo(() => [
    ["المنصّة", "iPadOS"],
    ["الدور", "UX/UI + Prototype"],
    ["التركيز", "صعوبات التعلّم"],
    ["اللغة", "العربية"],
  ], []);

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(1, window.scrollY / height) : 0);
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.1 });
    document.querySelectorAll("[data-reveal]").forEach((item) => observer.observe(item));
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <main>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} />

      <nav className="nav shell" aria-label="التنقل الرئيسي">
        <a href="#top" className="brand" aria-label="هِجاء — البداية"><img src="/assets/hijaa-original/app-icon.jpg" alt="" /><b>هِجاء</b></a>
        <div className="nav-links"><a href="#name">الإلهام</a><a href="#screens">الواجهات</a><a href="#characters">الشخصيات</a><a href="#prototype">التجربة</a><a href="#team">الفريق</a></div>
        <a href="#prototype" className="nav-action">استكشاف التجربة <ArrowIcon /></a>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy" data-reveal>
          <div className="app-chip"><img src="/assets/hijaa-original/app-icon.jpg" alt="أيقونة تطبيق هِجاء الأصلية" /><span><b>هِجاء</b><small>Arabic learning · iPad</small></span></div>
          <p className="kicker"><i /> تطبيق عربي متعدد الحواس</p>
          <h1><span className="hero-title-primary">حرفًا حرفًا،</span><br /><span>تبدأ الكلمة.</span></h1>
          <p className="hero-lead">تجربة تعليمية تساعد الأطفال ذوي صعوبات التعلّم على سماع الحرف، رؤيته، لمسه، ثم بنائه داخل كلمة بثقة.</p>
          <div className="hero-actions">
            <a href="#screens" className="primary">استعراض الواجهات <ArrowIcon /></a>
            <button className="secondary" onClick={() => speak("هِجاء")}><SoundIcon /> تشغيل اسم هِجاء</button>
          </div>
          <div className="meta-grid">{projectMeta.map(([label, value]) => <div key={label}><span>{label}</span><b>{value}</b></div>)}</div>
        </div>

        <div className="hero-stage" data-reveal>
          <div className="stage-caption"><span>واجهات التطبيق الأصلية</span><b>01 — 02</b></div>
          <img className="hero-main-mockup" src="/assets/hijaa-original/main-screen.png" alt="الصفحة الرئيسية لتطبيق هِجاء وتعرض نشاطي التلوين والكلمات" />
          <Device src="/assets/hijaa-original/success-bear-clear.png" alt="واجهة النجاح الأصلية في هِجاء بعد تكوين كلمة دب" className="success-device" />
          <div className="avatar-orbit" aria-hidden="true">
            {avatars.map((avatar) => <span key={avatar.id} style={{ background: avatar.tone }}><img src={avatar.src} alt="" /></span>)}
          </div>
          <div className="stage-note"><span>صورة</span><span>صوت</span><span>لمس</span><i>→</i><b>ثقة</b></div>
        </div>
      </section>

      <section className="name-section" id="name">
        <div className="shell name-grid">
          <div className="section-number" data-reveal><span>01</span><b>الإلهام</b></div>
          <div className="name-copy" data-reveal>
            <p className="eyebrow">الاسم يشرح طريقة التعلّم</p>
            <h2>«هِجاء» من<br /><span>التَّهجِئة.</span></h2>
            <p>تعني التهجئة قراءة الكلمة حرفًا بعد حرف، مع التعرّف إلى صوت كل حرف وشكله قبل جمعها في كلمة واحدة. من هنا جاء اسم «هِجاء»، ليعبّر عن طريقة التعلّم التي يقوم عليها التطبيق.</p>
          </div>
          <div className="spelling-card" data-reveal>
            <span className="card-label">Letter by letter</span>
            <img
              className="spelling-door"
              src="/assets/hijaa-original/door.webp"
              alt="باب، مثال على تكوين الكلمة حرفًا حرفًا"
            />
            <div className="spell-equation" aria-label="ب زائد ألف زائد باء تساوي باب">
              <i>ب</i><em>+</em><i>ا</i><em>+</em><i>ب</i><em>=</em><strong>باب</strong>
            </div>
            <p>حرف يُسمع <b>·</b> صورة تُفهم <b>·</b> كلمة تُبنى</p>
            <button onClick={() => speak("باء، ألف، باء، باب")}><SoundIcon /> تشغيل التهجئة</button>
          </div>
        </div>
      </section>

      <section className="screens-section" id="screens">
        <div className="shell">
          <div className="section-top light" data-reveal>
            <div className="section-number"><span>02</span><b>الواجهات</b></div>
            <div><p className="eyebrow">شاشات مختارة من التطبيق الفعلي</p><h2>رحلة واضحة من اختيار النشاط إلى إتمام الكلمة.</h2></div>
          </div>
          <div className="journey-stack">
            <article className="journey-chapter start-chapter" data-reveal>
              <div className="journey-copy">
                <span>01 / البداية</span>
                <h3>يبدأ الطفل من خيارين واضحين.</h3>
                <p>تقدّم الصفحة الرئيسية نشاطي التلوين والكلمات مباشرة، ثم تعرض الحروف في شبكة ملوّنة تسهّل العثور على الحرف المطلوب.</p>
              </div>
              <div className="journey-visuals">
                <img className="ready-mockup" src="/assets/hijaa-original/main-screen.png" alt="الصفحة الرئيسية في تطبيق هِجاء" loading="lazy" />
                <Device src="/assets/hijaa-original/letter-grid-clear.png" alt="واجهة اختيار حرف من الحروف العربية" className="journey-device" />
              </div>
            </article>
            <article className="journey-chapter learn-chapter" data-reveal>
              <div className="journey-copy">
                <span>02 / التعرّف إلى الحرف</span>
                <h3>حرف واحد في كل مرة.</h3>
                <p>يمكن التنقّل بين الحروف بهدوء، ثم تأكيد الحرف المختار. وفي التلوين يركّز الطفل على شكل الحرف من خلال اللون واللمس والصوت.</p>
              </div>
              <div className="journey-visuals reverse">
                <Device src="/assets/hijaa-original/letter-carousel-clear.png" alt="واجهة استعراض الحروف حرفًا بعد حرف" className="journey-device" />
                <img className="ready-mockup" src="/assets/hijaa-original/coloring-screen.png" alt="واجهة تلوين حرف العين" loading="lazy" />
              </div>
            </article>
            <article className="journey-chapter practice-chapter" data-reveal>
              <div className="journey-copy">
                <span>03 / التطبيق والتعزيز</span>
                <h3>صورة، صوت، ثم ترتيب للحروف.</h3>
                <p>يربط نشاط الكلمات بين صورة مألوفة ونطقها، ثم يطلب إكمال الكلمة بالحروف الصحيحة. بعد النجاح تظهر الشخصية المختارة مع رسالة تشجيعية واضحة.</p>
              </div>
              <div className="journey-visuals">
                <Device src="/assets/hijaa-original/word-bear-clear.png" alt="واجهة الاستماع إلى كلمة دب وترتيب حروفها" className="journey-device" />
                <Device src="/assets/hijaa-original/success-bear-clear.png" alt="واجهة النجاح والتشجيع بعد إكمال كلمة دب" className="journey-device" />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="characters-section" id="characters">
        <div className="shell characters-heading">
          <div className="section-number" data-reveal><span>03</span><b>التمثيل</b></div>
          <div data-reveal><p className="eyebrow">لماذا أربع شخصيات؟</p><h2>ليجد الطفل<br /><span>ما يشبهه داخل التجربة.</span></h2></div>
          <div className="characters-intro" data-reveal><p>تضم التجربة ولدين وبنتين بملامح وألوان بشرة متنوعة. يختار الطفل الشخصية الأقرب إليه، ثم تظهر الشخصية نفسها عند إتمام النشاط لتجعل رسالة النجاح أكثر ارتباطًا به.</p><div className="mini-flow"><span>اختيار</span><i>→</i><span>تعلّم</span><i>→</i><span>إنجاز</span><i>→</i><b>احتفال بالشخصية المختارة</b></div></div>
        </div>
        <div className="shell"><CharacterPicker selected={selectedAvatar} onSelect={setSelectedAvatar} /></div>
      </section>

      <section className="experience-section" id="prototype">
        <div className="shell experience-grid">
          <div className="experience-copy" data-reveal>
            <div className="section-number"><span>04</span><b>حلقة النجاح</b></div>
            <p className="eyebrow">نموذج يوضّح الفكرة</p>
            <h2>صوت، محاولة،<br />ثم تعزيز واضح.</h2>
            <p>يوضّح النموذج كيف يستمع الطفل إلى كلمة «باب»، ثم يرتّب حروفها. وعند الإجابة الصحيحة تظهر الشخصية المختارة مع عبارة «أحسنت» واحتفالية قصيرة.</p>
            <ol className="success-loop"><li><span>01</span><b>صورة وصوت</b></li><li><span>02</span><b>محاولة مباشرة</b></li><li><span>03</span><b>تعزيز شخصي</b></li></ol>
          </div>
          <WordDemo avatar={selectedAvatar} />
        </div>
      </section>

      <section className="color-section">
        <div className="shell color-grid">
          <div data-reveal>
            <div className="section-number"><span>05</span><b>التعلّم بالتفاعل</b></div>
            <p className="eyebrow">التلوين يدعم التعرّف إلى الحرف</p>
            <h2>التلوين يساعد على<br />تثبيت شكل الحرف.</h2>
            <p>يجمع النشاط بين رؤية الحرف، سماع نطقه، والتفاعل معه باللمس. يساعد هذا التنوع الطفل على التعرّف إلى شكل الحرف بطريقة أبسط وأكثر تشويقًا.</p>
            <div className="sensory-pills"><span>رؤية</span><span>صوت</span><span>لمس</span></div>
          </div>
          <ColoringDemo />
        </div>
      </section>

      <section className="principles-section">
        <div className="shell">
          <div className="section-top" data-reveal>
            <div className="section-number"><span>06</span><b>قرار التصميم</b></div>
            <div><p className="eyebrow">طفولي في الإحساس، واضح في الاستخدام</p><h2>كل عنصر يؤدي وظيفة تعليمية.</h2></div>
          </div>
          <div className="principles-grid">
            {[
              ["01", "خطوة واحدة", "تطلب كل شاشة إجراءً واحدًا واضحًا حتى يبقى التركيز على المهمة الحالية."],
              ["02", "صوت متاح دائمًا", "يمكن إعادة نطق الحرف أو الكلمة عند الحاجة من دون تقييد بعدد المحاولات."],
              ["03", "ألوان منظّمة", "تميّز الألوان الحروف والخيارات والحالات، وتساعد الطفل على متابعة النشاط."],
              ["04", "تعزيز مباشر", "تجمع لحظة النجاح بين الشخصية والصوت والاحتفال لتأكيد الإجابة الصحيحة."],
            ].map(([number, title, text]) => <article key={number} data-reveal><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="type-section">
        <div className="shell">
          <div className="section-top light" data-reveal>
            <div className="section-number"><span>07</span><b>النظام البصري</b></div>
            <div><p className="eyebrow">توازن بين الطابع الطفولي والوضوح</p><h2>خط مرح للعناوين، وواضح للتعليمات.</h2></div>
          </div>
          <div className="type-grid">
            <article className="font-card playful-card" data-reveal>
              <span>للعناوين والعبارات القصيرة</span><strong>Baloo Bhaijaan 2</strong><h3>نتعلّم<br />ونلعب</h3>
              <p>حروف دائرية وودودة تمنح العناوين طابعًا طفوليًا، وتُستخدم في العبارات القصيرة فقط.</p>
            </article>
            <article className="font-card clear-card" data-reveal>
              <span>للنصوص التوضيحية والتعليمات</span><strong>NT Panorama Naskh Regular</strong><h3>اسمع الحرف، ثم اختر الإجابة الصحيحة.</h3>
              <p>خط عربي واضح يمنح الشرح إيقاعًا هادئًا، ويُستخدم في الفقرات والتعليمات التي تحتاج إلى قراءة سهلة.</p>
            </article>
            <article className="palette-system" data-reveal>
              {[
                ["أصفر تشجيع", "#FFF0A8"], ["أزرق نشاط", "#BCEBFF"], ["أخضر تعلّم", "#C9F7C1"], ["وردي تفاعل", "#F4A7C1"], ["حبر داكن", "#111111"],
              ].map(([name, value]) => <div key={value} style={{ background: value, color: value === "#111111" ? "#ffffff" : "#171717" }}><span>{name}</span><b>{value}</b></div>)}
            </article>
          </div>
        </div>
      </section>

      <section className="team-section" id="team">
        <div className="shell team-layout">
          <div className="section-number" data-reveal><span>08</span><b>فريق العمل</b></div>
          <div className="team-copy" data-reveal>
            <p className="eyebrow">الأشخاص خلف هِجاء</p>
            <h2>صممناه وطوّرناه<br /><span>معًا.</span></h2>
            <p>هِجاء مشروع جماعي صنعه فريق من أربع عضوات. تعاون الفريق على فهم احتياجات الطفل، تصميم التجربة، وبناء النموذج ليظهر كرحلة تعليمية واحدة ومتكاملة.</p>
          </div>
          <div className="team-stickers" data-reveal>
            {teamStickers.map((member, index) => (
              <figure key={member.src}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <img src={member.src} alt={member.alt} loading="lazy" />
              </figure>
            ))}
          </div>
          <div className="dina-credit" data-reveal>
            <div><span>دراسة الحالة</span><strong>دينا السويلم</strong></div>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/dina-alswailem-5a4786280" target="_blank" rel="noreferrer"><i>in</i> LinkedIn</a>
              <a href="https://github.com/Dina-Alswailem" target="_blank" rel="noreferrer"><i>&lt;/&gt;</i> GitHub</a>
            </div>
          </div>
        </div>
      </section>

      <section className="closing">
        <div className="shell closing-inner" data-reveal>
          <img src="/assets/hijaa-original/app-icon.jpg" alt="أيقونة تطبيق هِجاء" />
          <p className="eyebrow">هِجاء — تجربة عربية متعددة الحواس</p>
          <h2>من أول حرف<br /><span>إلى أول «أحسنت».</span></h2>
          <p>مشروع جماعي من فريق هِجاء · إعداد دراسة الحالة: دينا السويلم</p>
          <div>
            <a href="https://www.figma.com/design/yuNUs7ty86nQGsp91CQvi8/%D9%87%D9%90%D8%AC%D8%A7%D8%A1?node-id=0-1" target="_blank" rel="noreferrer">فتح ملف Figma <ArrowIcon /></a>
            <a href="https://www.linkedin.com/in/dina-alswailem-5a4786280" target="_blank" rel="noreferrer">LinkedIn <ArrowIcon /></a>
            <a href="https://github.com/Dina-Alswailem" target="_blank" rel="noreferrer">GitHub <ArrowIcon /></a>
            <a href="#top">العودة للأعلى <ArrowIcon /></a>
          </div>
        </div>
      </section>

      <footer className="shell"><span>هِجاء © 2026</span><span>فريق هِجاء · دراسة الحالة: Dina Alswailem</span></footer>
    </main>
  );
}
