import React, { useState } from "react";
import {
  ArrowDownToLine, ArrowRight, Github, Linkedin, Mail, Play, Search,
  Bell, ChevronDown, Code2, BrainCircuit, Palette, BriefcaseBusiness,
  GraduationCap, ExternalLink, Sparkles, X, Menu
} from "lucide-react";

const projects = [
  { title: "Vedic Panchang", category: "WEB DEVELOPMENT", year: "Featured project", tone: "panchang", mark: "☼", desc: "A Vedic calendar application built with Node.js, Express, and Swiss Ephemeris.", stack: ["Node.js", "Express", "Swiss Ephemeris"] },
  { title: "OmniSight", category: "RETAIL INTELLIGENCE CONCEPT", year: "Product concept", tone: "omni", mark: "◉", desc: "A retail intelligence concept exploring footfall, dwell time, queues, and heatmap insights.", stack: ["Computer Vision concept", "Edge AI", "Analytics"] },
  { title: "QuickRush / TapKart", category: "PRODUCT & STARTUP CONCEPT", year: "Product concept", tone: "quick", mark: "↗", desc: "A scan-and-go shopping concept designed around a digital cart, checkout, and exit verification.", stack: ["Product Design", "Retail Tech", "UX"] },
  { title: "Stackweb", category: "WEB DESIGN", year: "Design concept", tone: "stack", mark: "▧", desc: "A neo-brutalist web concept focused on strong hierarchy and a distinctive visual system.", stack: ["UI Design", "CSS", "Visual Systems"] },
  { title: "Alumni Connect Portal", category: "CAMPUS TECHNOLOGY", year: "Project", tone: "alumni", mark: "↗", desc: "A project concept for connecting alumni and students.", stack: ["Portal", "Networking"] },
  { title: "Digital Placement Tracker", category: "CAMPUS TECHNOLOGY", year: "Project", tone: "placement", mark: "▥", desc: "A project concept for tracking placement activity.", stack: ["Dashboard", "Analytics"] },
  { title: "Campus Event Management System", category: "CAMPUS TECHNOLOGY", year: "Project", tone: "events", mark: "✳", desc: "A project concept for managing campus events.", stack: ["Events", "Registration"] },
  { title: "Waste Management Monitoring", category: "SMART CAMPUS", year: "Project", tone: "waste", mark: "♻", desc: "A project concept for campus waste monitoring.", stack: ["IoT concept", "Monitoring"] },
  { title: "AI-Based Library Assistant", category: "GENERATIVE AI CONCEPT", year: "Project", tone: "library", mark: "✦", desc: "A project concept for a conversational library assistant.", stack: ["AI assistant concept", "Search"] },
  { title: "Smart Campus Navigation", category: "CAMPUS TECHNOLOGY", year: "Project", tone: "navigation", mark: "⌖", desc: "A project concept for indoor and outdoor campus navigation.", stack: ["Navigation", "Accessibility"] },
  { title: "Lab Equipment Booking System", category: "CAMPUS TECHNOLOGY", year: "Project", tone: "lab", mark: "⌘", desc: "A project concept for booking lab and workshop equipment.", stack: ["Booking", "Workflow"] },
  { title: "Student Attendance Analytics", category: "DATA & ANALYTICS", year: "Project", tone: "attendance", mark: "▤", desc: "A project concept for attendance dashboards and reporting.", stack: ["Analytics", "Dashboards"] },
  { title: "Smart Irrigation for Campus Garden", category: "SMART CAMPUS", year: "Project", tone: "irrigation", mark: "❋", desc: "A project concept for soil-moisture-based garden irrigation.", stack: ["IoT concept", "Automation"] }
];

const profiles = [
  { name: "Sidhartha", label: "The Builder", cls: "red", desc: "Projects, experiments, and the journey so far." },
  { name: "Recruiter / HR", label: "Talent View", cls: "blue", desc: "A quick tour of skills, projects, and experience." },
  { name: "Developer", label: "Tech View", cls: "green", desc: "Tools, implementation, and things I'm exploring." }
];

function ProfilePicker({ onChoose }) {
  return <main className="profile-screen">
    <div className="brand profile-brand"><span className="brand-mark">S</span> SIDHARTHA<span className="brand-lite">FLIX</span></div>
    <div className="profile-center">
      <h1>Who's watching <span>Sidhartha?</span></h1>
      <p className="profile-sub">Choose your viewing experience.</p>
      <div className="profile-list">
        {profiles.map((p) => <button className="profile-option" key={p.name} onClick={() => onChoose(p.name)}>
          <span className={`profile-avatar ${p.cls}`}>{p.name === "Sidhartha" ? "ST" : p.name === "Developer" ? "<>" : "HR"}</span>
          <span className="profile-name">{p.name}</span>
          <span className="profile-desc">{p.desc}</span>
        </button>)}
      </div>
      <button className="manage-profiles" onClick={() => onChoose("Recruiter / HR")}>ENTER PORTFOLIO <ArrowRight size={16}/></button>
    </div>
    <div className="profile-foot">A personal portfolio, presented like a streaming experience.</div>
  </main>;
}

function SectionTitle({ eyebrow, title, note }) {
  return <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{note && <span className="section-note">{note}</span>}</div>;
}

function Poster({ project, onClick, compact = false }) {
  return <button className={`poster ${project.tone} ${compact ? "compact" : ""}`} onClick={() => onClick(project)}>
    <div className="poster-top"><span>{project.category}</span><span className="poster-dot">●</span></div>
    <div className="poster-art"><span>{project.mark}</span></div>
    <div className="poster-bottom"><span className="poster-title">{project.title}</span><span className="poster-year">{project.year}</span></div>
  </button>;
}

function ProjectModal({ project, close }) {
  if (!project) return null;
  return <div className="modal-backdrop" onClick={close}>
    <div className="project-modal" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close" onClick={close}><X size={19}/></button>
      <div className={`modal-banner ${project.tone}`}><span>{project.mark}</span></div>
      <div className="modal-content">
        <p className="eyebrow">{project.category}</p>
        <h2>{project.title}</h2>
        <p>{project.desc}</p>
        <div className="tag-row">{project.stack.map(t => <span className="tag" key={t}>{t}</span>)}</div>
        <p className="modal-disclaimer">Project details shown here are a portfolio summary. Add repository/demo links and implementation specifics as they become available.</p>
      </div>
    </div>
  </div>;
}

function App() {
  const [profile, setProfile] = useState(null);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const filtered = projects.filter(p => `${p.title} ${p.category}`.toLowerCase().includes(query.toLowerCase()));
  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  if (!profile) return <ProfilePicker onChoose={setProfile}/>;

  return <div className="app-shell">
    <header className="topbar">
      <div className="nav-left">
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><Menu size={20}/></button>
        <button className="brand" onClick={() => go("home")}><span className="brand-mark">S</span> SIDHARTHA<span className="brand-lite">FLIX</span></button>
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <button onClick={() => go("home")}>Home</button><button onClick={() => go("projects")}>Projects</button><button onClick={() => go("experience")}>Experience</button><button onClick={() => go("skills")}>Skills</button><button onClick={() => go("about")}>About</button>
        </nav>
      </div>
      <div className="nav-right">
        <label className="search-box"><Search size={17}/><input value={query} onChange={e => {setQuery(e.target.value); if (e.target.value) go("projects");}} placeholder="Search projects"/></label>
        <button className="icon-button" aria-label="Notifications"><Bell size={18}/></button>
        <button className="mini-profile" onClick={() => setProfile(null)} title="Switch profile">ST <ChevronDown size={14}/></button>
      </div>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-grid"></div>
        <div className="hero-content">
          <div className="hero-kicker"><span className="red-bar"></span> FEATURED PORTFOLIO <span className="muted-kicker">· {profile === "Recruiter / HR" ? "RECRUITER VIEW" : profile === "Developer" ? "TECH VIEW" : "THE BUILDER'S CUT"}</span></div>
          <h1>Curious mind.<br/><span>Builder mindset.</span></h1>
          <p className="hero-intro">I'm <strong>Sidhartha Tharala</strong>, a Computer Science student exploring web development, product design, and practical applications of AI.</p>
          <div className="hero-meta"><span className="match">OPEN TO LEARNING</span><span>2025–Present</span><span className="maturity">CSE · VAAGDEVI COLLEGE</span></div>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => go("projects")}><Play size={17} fill="currentColor"/> Explore Projects</button>
            <a className="btn btn-secondary" href="/Sidhartha_Tharala_GenAI_Internship_Resume.pdf" download><ArrowDownToLine size={17}/> Download Resume</a>
          </div>
          <div className="hero-links"><a href="https://github.com/sidharthatharala98" target="_blank" rel="noreferrer"><Github size={16}/> GitHub</a><a href="https://www.linkedin.com/in/sidhartha-tharala-66b27a387/" target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn</a><a href="mailto:sidharthatharala28@gmaill.com"><Mail size={16}/> Email</a></div>
        </div>
        <div className="hero-portrait">
          <img src="/profilepic.png" alt="Sidhartha Tharala portrait"/>
          <div className="portrait-caption"><span className="live-dot"></span> CURRENTLY BUILDING MY NEXT CHAPTER</div>
        </div>
        <div className="hero-bottom-fade"></div>
      </section>

      <div className="content-wrap">
        <section className="shelf" id="journey">
          <SectionTitle eyebrow="THE STORY SO FAR" title="Continue exploring" note="A few chapters of my journey"/>
          <div className="journey-grid">
            <button className="journey-card" onClick={() => go("about")}><span className="journey-icon"><GraduationCap/></span><span className="journey-title">The Beginning</span><span className="journey-sub">B.Tech · Computer Science</span></button>
            <button className="journey-card" onClick={() => go("experience")}><span className="journey-icon"><Palette/></span><span className="journey-title">The Designer</span><span className="journey-sub">Dhiora Groups · UI/UX</span></button>
            <button className="journey-card" onClick={() => go("projects")}><span className="journey-icon"><Code2/></span><span className="journey-title">The Builder</span><span className="journey-sub">Web & product concepts</span></button>
            <button className="journey-card" onClick={() => go("skills")}><span className="journey-icon"><BrainCircuit/></span><span className="journey-title">The AI Explorer</span><span className="journey-sub">Learning through experiments</span></button>
          </div>
        </section>

        <section className="shelf" id="projects">
          <SectionTitle eyebrow="SELECTED WORK" title={query ? `Search results for “${query}”` : "My projects"} note={`${filtered.length} titles in the collection`}/>
          <div className="poster-row">
            {filtered.map(p => <Poster key={p.title} project={p} onClick={setSelected}/>)}
            {filtered.length === 0 && <p className="empty-state">No projects match that search. Try another title.</p>}
          </div>
        </section>

        <section className="shelf split-section" id="experience">
          <div className="experience-main">
            <SectionTitle eyebrow="WORK & COLLABORATION" title="Experience"/>
            <div className="experience-card">
              <div className="experience-icon"><Palette size={23}/></div>
              <div><div className="experience-topline"><h3>UI/UX Design Work</h3><span className="pill">Design</span></div>
                <p className="company">Dhiora Groups</p>
                <p>Contributed to UI/UX design work for ManaHRMS and the Dhiora app, focusing on interface layouts and product usability.</p>
                <span className="small-muted">Dates not listed · Details can be expanded with verified contributions</span>
              </div>
            </div>
            <div className="experience-card">
              <div className="experience-icon"><BrainCircuit size={23}/></div>
              <div><div className="experience-topline"><h3>Generative AI & Automation</h3><span className="pill learning">Exploring</span></div>
                <p className="company">Independent learning & prototypes</p>
                <p>Exploring LLM-powered applications, API integrations, and workflow automation as a learning direction—not presented as a formal internship.</p>
                <span className="small-muted">Add only tools and shipped automations you can demonstrate</span>
              </div>
            </div>
            <div className="honesty-note"><Sparkles size={16}/><span>Experience is kept factual. This portfolio does not invent internships or claim employment at other startups.</span></div>
          </div>
          <aside className="currently">
            <SectionTitle eyebrow="NEXT CHAPTER" title="What I'm looking for"/>
            <div className="currently-box"><span className="big-number">01</span><h3>Data Science & Generative AI</h3><p>Hands-on internship opportunities, mentorship, and practical projects that turn concepts into working tools.</p><span className="pill">Open to opportunities</span></div>
            <div className="currently-box muted-box"><span className="big-number">02</span><h3>Build. Test. Improve.</h3><p>Strengthen technical fundamentals while building projects that solve real problems.</p></div>
          </aside>
        </section>

        <section className="shelf" id="skills">
          <SectionTitle eyebrow="THE TOOLKIT" title="Skills & interests" note="A growing collection"/>
          <div className="skills-grid">
            <div className="skill-panel"><Code2/><h3>Web & Software</h3><p>JavaScript · Node.js · Express · React · HTML · CSS · Git/GitHub</p></div>
            <div className="skill-panel"><BrainCircuit/><h3>AI & Data</h3><p>Generative AI · LLM applications · Data analysis · Machine-learning fundamentals</p><span className="small-muted">Learning focus; proficiency should be verified in discussion.</span></div>
            <div className="skill-panel"><Palette/><h3>Product & Design</h3><p>UI/UX design · Interface prototyping · Product thinking</p></div>
            <div className="skill-panel"><Sparkles/><h3>Interests</h3><p>AI-powered workflows · Retail technology · Developer tools · Useful automation</p></div>
          </div>
        </section>

        <section className="shelf about-section" id="about">
          <SectionTitle eyebrow="BEHIND THE PROFILE" title="About Sidhartha"/>
          <div className="about-card">
            <div className="about-monogram">ST<span>●</span></div>
            <div><h3>Learning by building.</h3><p>I'm pursuing a B.Tech in Computer Science and Engineering at Vaagdevi College of Engineering. My work so far spans web applications, interface design, and early-stage product concepts. I'm interested in developing stronger foundations in data and AI while continuing to ship practical projects.</p><div className="about-facts"><span>Computer Science</span><span>Product-minded</span><span>AI-curious</span></div></div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <span className="eyebrow">END CREDITS</span><h2>Have a project in mind?</h2><p>Let's connect, exchange ideas, or talk about an internship opportunity.</p>
          <div className="contact-actions"><a className="btn btn-primary" href="mailto:sidharthatharala28@gmaill.com"><Mail size={17}/> Get in touch</a><a className="btn btn-secondary" href="https://www.linkedin.com/in/sidhartha-tharala-66b27a387/" target="_blank" rel="noreferrer"><Linkedin size={17}/> Connect on LinkedIn</a></div>
        </section>
      </div>
    </main>
    <footer className="footer"><div className="brand"><span className="brand-mark">S</span> SIDHARTHA<span className="brand-lite">FLIX</span></div><span>Designed as a personal portfolio · Inspired by streaming interfaces</span><button onClick={() => {setProfile(null); window.scrollTo({top:0,behavior:"smooth"});}}>Switch profile</button></footer>
    {selected && <ProjectModal project={selected} close={() => setSelected(null)}/>}
  </div>;
}

export default App;