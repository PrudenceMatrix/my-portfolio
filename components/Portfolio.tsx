"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import Image from 'next/image';

// ─────────────────────────────────────────────────────────────
//  COLOUR TOKENS
// ─────────────────────────────────────────────────────────────
const C = {
  cyan:  "#00d4d4",
  dark:  "#0a0a14",
  dark2: "#111125",
  card:  "#12122a",
  white: "#f0f0f5",
} as const;

// ─────────────────────────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────────────────────────
const TYPED_STRINGS = [
  "Systems Engineer.",
  "Security Specialist.",
  "React Developer.",
  "Java Architect.",
  "Python Engineer.",
  "CS Undergraduate.",
];

interface Project {
  id: string;
  name: string;
  tech: string;
  desc: string;
  live: boolean;
  url: string | null;
  emoji: string;
}

const PROJECTS: Project[] = [
  { id:"01", name:"PrudexAI",             tech:"TypeScript · React · Vercel · AI",  live:true,  url:"https://prudexai.vercel.app",           emoji:"🤖", desc:"Production-deployed AI platform. Live inference interface with scalable frontend architecture and API integration layer." },
  { id:"02", name:"DeepMatrix Systems AI", tech:"TypeScript · React",                live:false, url:null,                                    emoji:"🔒", desc:"High-performance corporate web presence for an AI, cybersecurity, and data engineering company." },
  { id:"03", name:"Triple-O Supermarket",  tech:"TypeScript · React · Vercel",       live:true,  url:"https://tripleosupermarket.vercel.app",  emoji:"🛒", desc:"Full-stack retail web system with product catalog and commercial interface at production scale." },
  { id:"04", name:"Enterprise Banking",    tech:"Java · OOP Architecture",            live:false, url:null,                                    emoji:"🏦", desc:"Secure object-oriented financial simulation engine with complex state management and transactional logic." },
  { id:"05", name:"Casino Game Engine",    tech:"Java · Probability Mechanics",       live:false, url:null,                                    emoji:"🎲", desc:"Programmatic casino environment with provably fair probability mechanics and scalable game-loop architecture." },
  { id:"06", name:"Security Scripts",      tech:"Python · Network Tooling",           live:false, url:null,                                    emoji:"🛡️", desc:"Custom scripting suite for network analysis, penetration testing, and automated reconnaissance workflows." },
];

interface ServiceItem { title: string; desc: string; icon: ReactNode; }

const SERVICES: ServiceItem[] = [
  {
    title: "Web Architecture",
    desc: "Scalable, high-performance web systems built with TypeScript and React. Engineered for speed and authority.",
    icon: (
      <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={C.cyan} strokeWidth={2}>
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "Security & Penetration Testing",
    desc: "Custom Python scripts for network analysis, vulnerability assessment, and ethical hacking workflows.",
    icon: (
      <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={C.cyan} strokeWidth={2}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "AI Integration",
    desc: "Building AI-powered products and platforms. From LLM integrations to production-deployed inference interfaces.",
    icon: (
      <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={C.cyan} strokeWidth={2}>
        <rect x={2} y={3} width={20} height={14} rx={2} />
        <line x1={8} y1={21} x2={16} y2={21} />
        <line x1={12} y1={17} x2={12} y2={21} />
      </svg>
    ),
  },
];

// ─────────────────────────────────────────────────────────────
//  PARTICLES
// ─────────────────────────────────────────────────────────────
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width = canvas.offsetWidth);
    let H = (canvas.height = canvas.offsetHeight);

    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.4,
    }));

    let mx = W / 2;
    let my = H / 2;

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    window.addEventListener("mousemove", onMove);

    let animId: number;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,212,212,0.55)";
        ctx.fill();
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(0,212,212,${0.15 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
        const dm = Math.hypot(pts[i].x - mx, pts[i].y - my);
        if (dm < 130) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(0,212,212,${0.28 * (1 - dm / 130)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(draw);
    }
    draw();

    const ro = new ResizeObserver(() => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    });
    ro.observe(canvas);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
    />
  );
}

// ─────────────────────────────────────────────────────────────
//  TYPED TEXT
// ─────────────────────────────────────────────────────────────
function Typed({ strings }: { strings: string[] }) {
  const [display, setDisplay] = useState("");
  const [si, setSi]           = useState(0);
  const [ci, setCi]           = useState(0);
  const [del, setDel]         = useState(false);

  useEffect(() => {
    const s = strings[si];
    let t: ReturnType<typeof setTimeout>;

    if (!del && ci < s.length) {
      t = setTimeout(() => { setDisplay(s.slice(0, ci + 1)); setCi((c) => c + 1); }, 60);
    } else if (!del) {
      t = setTimeout(() => setDel(true), 1600);
    } else if (ci > 0) {
      t = setTimeout(() => { setDisplay(s.slice(0, ci - 1)); setCi((c) => c - 1); }, 35);
    } else {
      setDel(false);
      setSi((i) => (i + 1) % strings.length);
    }

    return () => clearTimeout(t);
  }, [ci, del, si, strings]);

  return (
    <span>
      {display}
      <span
        style={{
          display: "inline-block", width: 2, height: "1em",
          background: C.cyan, marginLeft: 3,
          verticalAlign: "text-bottom",
          animation: "blink .85s step-end infinite",
        }}
      />
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
//  HEX FRAME
// ─────────────────────────────────────────────────────────────
const HEX_PATH = "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)";

function HexFrame({ size = 260, children }: { size?: number; children: ReactNode }) {
  return (
    <div style={{ clipPath: HEX_PATH, background: "linear-gradient(135deg,#00d4d4,#0066ff)", padding: 3, width: size, height: size, flexShrink: 0 }}>
      <div style={{ width: "100%", height: "100%", clipPath: HEX_PATH, background: "#111125", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  PHOTO PLACEHOLDER - DONE
//  ──────────────────────────────────────────────────────────
//  HOW TO ADD YOUR PHOTO:
//  1. Go to https://imgbb.com → upload your photo
//  2. Copy the "Direct link" (ends in .jpg / .png)
//  3. Replace <PhotoPlaceholder /> (appears TWICE below)
//     with this JSX:
//
//  <Image
//    src="https://i.ibb.co/1J4P8mDR/image.png"
//    alt="Brian Machayo"
//    style={{ width:"100%", height:"100%", objectFit:"cover" }}
//  />
// ─────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────
//  SHARED BUTTON STYLES
// ─────────────────────────────────────────────────────────────
const btnOutline: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 8,
  border: `2px solid ${C.cyan}`, color: C.cyan,
  fontFamily: "'Poppins', sans-serif", fontSize: 14, fontWeight: 500,
  padding: "11px 30px", borderRadius: 4,
  textDecoration: "none", cursor: "pointer", background: "transparent",
  transition: "all .25s",
};

// ─────────────────────────────────────────────────────────────
//  MAIN EXPORT
// ─────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [active, setActive] = useState("home");

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  const navItems = ["home", "about", "services", "architecture", "contact"];

  return (
    <>
      {/* ── Global styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${C.dark}; color: ${C.white}; font-family: 'Poppins', sans-serif; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${C.cyan}; border-radius: 2px; }
        @keyframes hexPulse { 0%,100%{ opacity:.6; transform:scale(1); } 50%{ opacity:1; transform:scale(1.06); } }
        @keyframes blink    { 0%,100%{ opacity:1; } 50%{ opacity:0; } }
        .btn-o:hover  { background: ${C.cyan} !important; color: #000 !important; box-shadow: 0 0 24px rgba(0,212,212,.4); }
        .svc:hover    { border-color: rgba(0,212,212,.45) !important; transform: translateY(-6px); box-shadow: 0 16px 40px rgba(0,212,212,.12); }
        .pcard:hover  { border-color: rgba(0,212,212,.4)  !important; transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,212,212,.1); }
        .btn-send:hover { background: #00ffff !important; box-shadow: 0 0 28px rgba(0,212,212,.5); }
        input::placeholder, textarea::placeholder { color: #555; }
        input:focus, textarea:focus { border-color: ${C.cyan} !important; outline: none; background: rgba(0,212,212,.04) !important; }
        @media (max-width: 768px) {
          .hero-wrap  { flex-direction: column !important; padding: 100px 24px 60px !important; }
          .hero-right { margin-top: 40px; }
          .about-wrap { flex-direction: column !important; padding: 80px 24px !important; }
          .g3  { grid-template-columns: 1fr !important; }
          .g2  { grid-template-columns: 1fr !important; }
          .pad { padding-left: 24px !important; padding-right: 24px !important; }
          nav  { padding: 16px 24px !important; }
          .nav-links { gap: 16px !important; }
        }
      `}</style>

      {/* ─────── NAV ─────── */}
      <nav style={{ background: "rgba(10,10,20,.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,212,212,.1)", padding: "18px 56px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "fixed", top: 0, left: 0, right: 0, zIndex: 200 }}>
        <span style={{ fontSize: 22, fontWeight: 700, color: C.white }}>
          Portfolio<span style={{ color: C.cyan }}>.</span>
        </span>
        <ul className="nav-links" style={{ display: "flex", gap: 32, listStyle: "none" }}>
          {navItems.map((s) => (
            <li key={s}>
              <span
                onClick={() => scrollTo(s)}
                style={{ fontSize: 14, color: active === s ? C.cyan : "#aaa", cursor: "pointer", transition: "color .2s", fontFamily: "'Poppins', sans-serif" }}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </span>
            </li>
          ))}
        </ul>
      </nav>

      {/* ─────── HERO ─────── */}
      <section
        id="home"
        className="hero-wrap"
        style={{ minHeight: "100vh", background: C.dark2, display: "flex", alignItems: "center", padding: "100px 56px 60px", position: "relative", overflow: "hidden" }}
      >
        <Particles />

        {/* Left */}
        <div style={{ flex: 1, position: "relative", zIndex: 2 }}>
          <p style={{ fontSize: 26, fontWeight: 400, color: "#ccc", marginBottom: 4 }}>Hello, It&apos;s Me</p>
          <h1 style={{ fontSize: "clamp(40px,6vw,72px)", fontWeight: 800, letterSpacing: "-.02em", lineHeight: 1, marginBottom: 8 }}>
            Brian Machayo
          </h1>
          <p style={{ fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 500, marginBottom: 24 }}>
            And I&apos;m a&nbsp;<span style={{ color: C.cyan }}><Typed strings={TYPED_STRINGS} /></span>
          </p>
          <p style={{ fontSize: 14, color: "#999", lineHeight: 1.8, maxWidth: 440, marginBottom: 32 }}>
            Developing scalable architectures and secure systems. Specialising in OOP, AI integrations,
            and ethical hacking workflows. Currently engineering corporate web infrastructures and
            complex Java-based state machines.
          </p>

          {/* Social icons */}
          <div style={{ display: "flex", gap: 12, marginBottom: 36 }}>
            <a href="https://github.com/PrudenceMatrix" target="_blank" rel="noreferrer" className="btn-o"
              style={{ width: 40, height: 40, border: `2px solid ${C.cyan}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: C.cyan, textDecoration: "none" }}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.031 1.531 1.031.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a href="https://linkedin.com/in/brian-machayo" target="_blank" rel="noreferrer" className="btn-o"
              style={{ width: 40, height: 40, border: `2px solid ${C.cyan}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: C.cyan, textDecoration: "none" }}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="mailto:machayobrian5@gmail.com" className="btn-o"
              style={{ width: 40, height: 40, border: `2px solid ${C.cyan}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: C.cyan, textDecoration: "none" }}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
            <a href="tel:+254796393902" className="btn-o"
              style={{ width: 40, height: 40, border: `2px solid ${C.cyan}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: C.cyan, textDecoration: "none" }}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
            </a>
          </div>

          <a href="https://github.com/PrudenceMatrix" target="_blank" rel="noreferrer" className="btn-o" style={btnOutline}>
            View GitHub
          </a>
        </div>

        {/* Right — hex photo */}
        <div className="hero-right" style={{ flex: "0 0 340px", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 2 }}>
          <div style={{ position: "relative", width: 300, height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: -20, background: "radial-gradient(circle,rgba(0,212,212,.35) 0%,transparent 65%)", animation: "hexPulse 3s ease-in-out infinite" }} />
            <HexFrame size={260}>
              {/*
               * ══════════════════════════════════════════════
               * PHOTO ADDED — using Next.js Image component:
               *
               * <Image
               *   src="https://i.ibb.co/1J4P8mDR/image.png"
               *   alt="Brian Machayo"
               *   style={{ width:"100%", height:"100%", objectFit:"cover" }}
               * />
               * ══════════════════════════════════════════════
               */}
              <Image
                src="https://i.ibb.co/1J4P8mDR/image.png"
                alt="Brian Machayo"
                style={{ width:"100%", height:"100%", objectFit:"cover" }}
              />
            </HexFrame>
          </div>
        </div>
      </section>

      {/* ─────── ABOUT ─────── */}
      <section id="about" className="about-wrap" style={{ background: C.dark, padding: "100px 56px", display: "flex", gap: 64, alignItems: "center" }}>
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div style={{ position: "absolute", inset: -16, background: "radial-gradient(circle,rgba(0,212,212,.25) 0%,transparent 65%)" }} />
          <HexFrame size={240}>
            {/* Photo added — same Image component as hero above */}
            <Image
              src="https://i.ibb.co/1J4P8mDR/image.png"
              alt="Brian Machayo"
              style={{ width:"100%", height:"100%", objectFit:"cover" }}
            />
          </HexFrame>
        </div>
        <div>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700, marginBottom: 6 }}>
            About <span style={{ color: C.cyan }}>Me</span>
          </h2>
          <p style={{ fontSize: 16, fontWeight: 500, color: C.cyan, marginBottom: 16 }}>Systems &amp; Security Engineer</p>
          <p style={{ fontSize: 14, color: "#999", lineHeight: 1.85, marginBottom: 16 }}>
            Computer Science undergraduate (Year 2, Semester 2) based in Kisii, Kenya. Operating across
            three primary stacks — Java systems architecture, Python security tooling, and modern TypeScript
            web infrastructure — with one unified narrative: rigorous systems and security engineering.
          </p>
          <p style={{ fontSize: 14, color: "#999", lineHeight: 1.85, marginBottom: 28 }}>
            Former ICT instructor at Kolongolo Boys Secondary School. IT Support at Rocky Cyber. Active
            technical mentor for emerging engineers. Open to remote and international opportunities.
          </p>
          <a href="https://github.com/PrudenceMatrix" target="_blank" rel="noreferrer" className="btn-o" style={btnOutline}>
            View GitHub ↗
          </a>
        </div>
      </section>

      {/* ─────── SERVICES ─────── */}
      <section id="services" className="pad" style={{ background: C.dark2, padding: "100px 56px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700 }}>
            Our <span style={{ color: C.cyan }}>Services</span>
          </h2>
        </div>
        <div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {SERVICES.map((s) => (
            <div key={s.title} className="svc" style={{ background: C.card, border: "1px solid rgba(0,212,212,.1)", borderRadius: 12, padding: "32px 24px", textAlign: "center", transition: "all .3s" }}>
              <div style={{ width: 56, height: 56, background: "rgba(0,212,212,.1)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                {s.icon}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: "#888", lineHeight: 1.75, marginBottom: 20 }}>{s.desc}</p>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}
                style={{ display: "inline-block", border: `1px solid ${C.cyan}`, color: C.cyan, fontFamily: "'Poppins',sans-serif", fontSize: 12, padding: "7px 22px", borderRadius: 4, cursor: "pointer", textDecoration: "none" }}>
                Read More
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ─────── PROJECTS ─────── */}
      <section id="architecture" className="pad" style={{ background: C.dark, padding: "100px 56px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700 }}>
            Latest <span style={{ color: C.cyan }}>Projects</span>
          </h2>
        </div>
        <div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {PROJECTS.map((p) => (
            <div
              key={p.id} className="pcard"
              onClick={() => { if (p.url) window.open(p.url, "_blank"); }}
              style={{ background: C.card, borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,.05)", transition: "all .3s", cursor: p.url ? "pointer" : "default", position: "relative" }}
            >
              {p.live && (
                <span style={{ position: "absolute", top: 10, right: 10, background: C.cyan, color: "#000", fontSize: 9, fontWeight: 600, letterSpacing: ".1em", padding: "3px 8px", borderRadius: 3, zIndex: 2 }}>
                  LIVE
                </span>
              )}
              <div style={{ aspectRatio: "16/10", background: "#1a1a35", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>
                {p.emoji}
              </div>
              <div style={{ padding: 18 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: C.cyan, letterSpacing: ".06em", marginBottom: 8 }}>{p.tech}</div>
                <div style={{ fontSize: 12, color: "#777", lineHeight: 1.65 }}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────── CONTACT ─────── */}
      <section id="contact" className="pad" style={{ background: C.dark2, padding: "100px 56px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700 }}>
            Contact <span style={{ color: C.cyan }}>Me!</span>
          </h2>
        </div>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div className="g2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {(["Full Name","Email Address","Mobile Number","Email Subject"] as const).map((ph, i) => (
              <input
                key={ph}
                type={i === 1 ? "email" : i === 2 ? "tel" : "text"}
                placeholder={ph}
                defaultValue={i === 2 ? "+254 796 393 902" : ""}
                style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, padding: "14px 18px", fontFamily: "'Poppins',sans-serif", fontSize: 13, color: C.white, width: "100%" }}
              />
            ))}
            <textarea
              placeholder="Your Message"
              style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, padding: "14px 18px", fontFamily: "'Poppins',sans-serif", fontSize: 13, color: C.white, gridColumn: "1 / -1", resize: "vertical", minHeight: 130 }}
            />
            <button
              className="btn-send"
              style={{ background: C.cyan, color: "#000", fontFamily: "'Poppins',sans-serif", fontSize: 14, fontWeight: 600, padding: "14px 40px", border: "none", borderRadius: 6, cursor: "pointer", width: "100%", gridColumn: "1 / -1", letterSpacing: ".04em" }}
            >
              Send Message
            </button>
          </div>
        </div>
      </section>

      {/* ─────── FOOTER ─────── */}
      <footer style={{ background: "#060610", borderTop: "1px solid rgba(0,212,212,.1)", padding: "24px 56px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: 13, color: "#555" }}>
          Copyright ©bg 2026 by <span style={{ color: C.cyan }}>Brian Machayo</span> | All Rights Reserved.
        </p>
        <button
          onClick={() => scrollTo("home")}
          style={{ width: 36, height: 36, background: C.cyan, borderRadius: 6, border: "none", color: "#000", fontSize: 16, cursor: "pointer" }}
        >
          ↑
        </button>
      </footer>
    </>
  );
}
