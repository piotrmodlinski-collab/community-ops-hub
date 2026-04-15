import { useEffect, useState } from "react";
import CommandCenterMenu3D from "./CommandCenterMenu3D";

const MENU_ITEMS = [
  { id: "hero", label: "Community Operations" },
  { id: "impact", label: "Impact" },
  { id: "coverage", label: "Operational Coverage" },
  { id: "differentiator", label: "Differentiator" },
  { id: "teams", label: "Team Architecture" },
  { id: "governance", label: "Governance Layer" },
  { id: "incident", label: "Incident & SLA" },
  { id: "roi", label: "ROI" },
  { id: "founder", label: "Founder" },
  { id: "missions", label: "Mission Entry" },
  { id: "launch", label: "Launch Process" },
  { id: "contact", label: "Final CTA" },
];

const COMMAND_MODELS = [
  { id: "impact", title: "Impact Core", menuLabel: "Impact", code: "MK-01", kind: "building", desc: "Live metrics and signals" },
  { id: "coverage", title: "Ops District", menuLabel: "Operational Coverage", code: "MK-02", kind: "building", desc: "Channels and pods" },
  { id: "differentiator", title: "Scale Captain", menuLabel: "Differentiator", code: "MK-03", kind: "character", desc: "Volunteer model loop" },
  { id: "teams", title: "Team Citadel", menuLabel: "Team Architecture", code: "MK-04", kind: "building", desc: "7 deployable teams" },
  { id: "governance", title: "Control Sentinel", menuLabel: "Governance Layer", code: "MK-05", kind: "character", desc: "Governance and compliance" },
  { id: "incident", title: "Incident Tower", menuLabel: "Incident & SLA", code: "MK-06", kind: "building", desc: "Severity and SLA" },
  { id: "roi", title: "ROI Reactor", menuLabel: "ROI", code: "MK-07", kind: "building", desc: "Cost efficiency model" },
  { id: "contact", title: "Mission Operator", menuLabel: "Final CTA", code: "MK-08", kind: "character", desc: "Launch your brief" },
];

const LIVE_METRICS = [
  { id: "coverage", mode: "fraction", target: 24, divisor: 7, value: "24/7", label: "Moderation Coverage", note: "always-on queue operations" },
  { id: "teams", mode: "number", target: 7, value: "7", label: "Operational Teams", note: "deployable modular pods" },
  { id: "savings", mode: "percent", target: 85, value: "85%", label: "Model Savings", note: "sample in-house vs outsourced" },
  { id: "languages", mode: "typing", value: "EN/DE/FR/RU/PL", label: "Language Coverage", note: "multilingual live execution" },
];

const IMPACT_SIGNALS = [
  "Reducing internal operational load",
  "Increasing retention and player trust",
  "Lowering moderation and support costs",
  "Improving sentiment and safety outcomes",
  "Turning activity into decision-ready intelligence",
  "Building sustainable long-term community structures",
];

const OPERATIONAL_COVERAGE = [
  {
    id: "channels",
    short: "CH",
    title: "Channels",
    status: "All active surfaces",
    context: "Map every player-facing touchpoint into one command stream.",
    items: [
      "Discord servers",
      "In-game chat and guild channels",
      "Forums and community boards",
      "Social hubs",
      "Wiki, guides, and docs platforms",
      "Feedback and reporting pipelines",
      "Additional communication channels",
    ],
  },
  {
    id: "pods",
    short: "DP",
    title: "Daily Delivery Pods",
    status: "Execution squads",
    context: "Deployable units that run daily moderation and engagement cycles.",
    items: [
      "Moderation & Safety",
      "Player Interaction & Engagement",
      "Content & Communication",
      "Community Analytics & Feedback",
      "Support Coordination",
    ],
  },
  {
    id: "knowledge",
    short: "KL",
    title: "Content & Knowledge Layer",
    status: "Knowledge backbone",
    context: "Structured know-how, publishing standards, and quality loops.",
    items: [
      "Guides, charts, and tips",
      "Knowledge architecture and wiki ops",
      "Multilingual publishing workflows",
      "Peer review and approval loops",
      "Refresher training for contributors",
    ],
  },
  {
    id: "advanced",
    short: "AX",
    title: "Advanced Capabilities",
    status: "Scale extensions",
    context: "Higher-order modules for resilience, growth, and predictive ops.",
    items: [
      "AI + human moderation stack",
      "VIP support lane",
      "Creator and ambassador programs",
      "Workforce forecasting for event peaks",
      "Sentiment radar and social listening",
      "Trust & safety compliance readiness",
    ],
  },
];

const VOLUNTEER_LOOP = ["Recruit", "Onboard", "Certify", "Activate", "Monitor", "Improve"];

const VOLUNTEER_DETAILS = [
  "Recruit from active player communities",
  "Run structured onboarding and scenario training",
  "Certify readiness before activation",
  "Apply continuous quality monitoring",
  "Track activity and escalation handling",
  "Improve standards with regular refresh cycles",
];

const WHY_THIS_SCALES = [
  "Lower payroll-heavy expansion pressure",
  "Native community understanding at execution level",
  "Flexible language coverage for global titles",
  "Quality control and accountability by design",
  "Retention support through insider fluency",
];

const TEAM_ARCHITECTURE = [
  {
    number: "01",
    name: "Moderation & Safety Team",
    purpose: "Maintain safe and fair community spaces.",
    caps: ["Rule enforcement", "Conflict handling", "Sensitive case escalation", "Action audit trail"],
  },
  {
    number: "02",
    name: "Player Interaction Team",
    purpose: "Keep players active and connected.",
    caps: ["Daily interaction loops", "Events and activation", "New player onboarding", "Retention prompts"],
  },
  {
    number: "03",
    name: "Knowledge & Content Team",
    purpose: "Convert complexity into clear guidance.",
    caps: ["Guides and charts", "FAQ and wiki ops", "Patch communication", "Content updates"],
  },
  {
    number: "04",
    name: "Localization Team",
    purpose: "Enable multilingual community execution.",
    caps: ["Terminology alignment", "Regional adaptation", "Cross-channel consistency", "Language scale-up"],
  },
  {
    number: "05",
    name: "Review & Quality Team",
    purpose: "Protect consistency and standards.",
    caps: ["Action review", "Content validation", "Source checks", "Approval control"],
  },
  {
    number: "06",
    name: "Training & Development Team",
    purpose: "Grow team capability over time.",
    caps: ["Moderator training", "Refresher programs", "Judgment development", "Skill gap closure"],
  },
  {
    number: "07",
    name: "Feedback & Insight Team",
    purpose: "Turn noise into operational intelligence.",
    caps: ["Signal classification", "Trend mapping", "Studio-ready reporting", "KPI tracking"],
  },
];

const GOVERNANCE_PILLARS = [
  {
    title: "Governance",
    items: ["Rules and documentation", "Role ownership", "Approval flows", "Reviewer accountability"],
  },
  {
    title: "Compliance",
    items: ["DSA readiness", "UK OSA readiness", "Policy versioning", "Evidence-friendly records"],
  },
  {
    title: "Predictability",
    items: ["No rogue moderation", "No uncontrolled messaging", "No reputational surprises", "Repeatable quality"],
  },
];

const REFERENCE_RIBBON = [
  "Reference Frameworks: EU DSA",
  "UK Online Safety Act",
  "Escalation logs",
  "Audit-ready records",
  "Policy version history",
];

const SEVERITY_LADDER = [
  { key: "P0", text: "Life and safety threats", target: "Immediate triage" },
  { key: "P1", text: "Severe abuse or coordinated attacks", target: "< 15 min" },
  { key: "P2", text: "Policy violations at scale", target: "< 30 min" },
  { key: "P3", text: "Standard moderation cases", target: "< 2 h" },
];

const INCIDENT_ACTIONS = [
  "24/7 multilingual queue operations",
  "Escalation tree and command ownership",
  "Crisis communication templates",
  "Weekly KPI command dashboard",
  "Monthly optimization loop",
];

const SLA_ROWS = [
  ["P0", "Life/safety threat", "Immediate", "Escalate to incident lead + partner protocol"],
  ["P1", "Coordinated abuse wave", "< 15 min", "Containment actions + focused moderation"],
  ["P2", "Policy violations at scale", "< 30 min", "Queue prioritization + enforcement sweep"],
  ["P3", "Standard moderation case", "< 2 h", "Routine processing within operating queue"],
];

const ANNUAL_ROWS = [
  ["Community Moderation (24/7)", "420,000 USD", "80,000 USD"],
  ["Community Management", "180,000 USD", "70,000 USD"],
  ["Content + Knowledge", "150,000 USD", "Included"],
  ["Localization Ops", "120,000 USD", "Included"],
  ["Feedback Intelligence", "160,000 USD", "Included"],
  ["Training + Quality", "90,000 USD", "Included"],
  ["Tools + Admin", "80,000 USD", "20,000 USD"],
  ["Total", "1,200,000 USD", "170,000 USD"],
];

const MONTHLY_ROWS = [
  ["Community Moderation (24/7)", "35,000 USD", "6,666.67 USD"],
  ["Community Management", "15,000 USD", "5,833.33 USD"],
  ["Content + Knowledge", "12,500 USD", "Included"],
  ["Localization Ops", "10,000 USD", "Included"],
  ["Feedback Intelligence", "13,333.33 USD", "Included"],
  ["Training + Quality", "7,500 USD", "Included"],
  ["Tools + Admin", "6,666.67 USD", "1,666.67 USD"],
  ["Total", "100,000 USD", "14,166.67 USD"],
];

const INHOUSE_LIMITS = [
  "Single timezone limitations",
  "Burnout risk under event pressure",
  "Knowledge loss with staff turnover",
  "Harder scale up/down",
  "Expensive experimentation loops",
];

const OUTSOURCED_ADVANTAGES = [
  "Modular teams and variable scale",
  "Global coverage by design",
  "Proven governance processes",
  "Volunteer-based core with control layer",
  "Faster launches and optimization cycles",
];

const FOUNDER_METRICS = [
  "9+ years hands-on community operations",
  "2,500+ FAQ entries structured",
  "300+ wiki pages delivered",
  "150+ charts published",
  "200+ multilingual translations",
  "915 legacy FAQ entries reviewed",
];

const FOUNDER_VALUE = [
  "Senior Community Ops Lead perspective",
  "Live moderation + training ownership",
  "Knowledge systems architecture",
  "Cross-platform and multilingual execution",
  "Retention-focused operational design",
];

const STARTING_MISSIONS = [
  {
    title: "Guild Shield Setup",
    copy: "Deploy moderation, escalation, and anti-toxicity workflows before your next season reset.",
    cta: "Start Setup",
    target: "#coverage",
  },
  {
    title: "Retention Boss-Fight Plan",
    copy: "Design engagement loops, creator activation, and KPI tracking for stronger player stickiness.",
    cta: "Open Plan",
    target: "#roi",
  },
  {
    title: "Crisis War-Room Drill",
    copy: "Prepare rapid incident command response for abuse spikes, coordinated attacks, and launch pressure.",
    cta: "Start Contact Brief",
    target: "#contact",
  },
];

const LAUNCH_STEPS = [
  "Discovery and channel audit",
  "Governance setup and escalation playbook",
  "Team deployment and platform activation",
  "Weekly reporting and KPI tracking",
  "30/60/90 optimization cycles",
];

function Section({ id, eyebrow, title, subtitle, children }) {
  return (
    <section id={id} className="section-block">
      <div className="section-head">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

function Table({ title, rows }) {
  return (
    <article className="table-shell">
      <h3>{title}</h3>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>In-house</th>
            <th>Outsourced</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

function LiveMetricCard({ metric, index, isActive }) {
  const getInitialValue = () => (metric.mode === "typing" ? "" : "0");
  const [valueText, setValueText] = useState(getInitialValue);
  const [noteChars, setNoteChars] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setValueText(getInitialValue());
      setNoteChars(0);
      return undefined;
    }

    let frameId = null;
    let timerId = null;
    let delayId = null;
    let noteInterval = null;

    const startNoteTyping = () => {
      let chars = 0;
      noteInterval = window.setInterval(() => {
        chars += 1;
        setNoteChars(Math.min(chars, metric.note.length));
        if (chars >= metric.note.length) {
          window.clearInterval(noteInterval);
          noteInterval = null;
        }
      }, 22);
    };

    const startAnimation = () => {
      if (metric.mode === "typing") {
        let chars = 0;
        timerId = window.setInterval(() => {
          chars += 1;
          setValueText(metric.value.slice(0, chars));
          if (chars >= metric.value.length) {
            window.clearInterval(timerId);
            timerId = null;
            startNoteTyping();
          }
        }, 66);
        return;
      }

      const duration = 1400;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        const current = Math.round((metric.target ?? 0) * eased);

        if (metric.mode === "fraction") {
          setValueText(`${current}/${metric.divisor}`);
        } else if (metric.mode === "percent") {
          setValueText(`${current}%`);
        } else {
          setValueText(String(current));
        }

        if (progress < 1) {
          frameId = window.requestAnimationFrame(tick);
        } else {
          if (metric.mode === "fraction") {
            setValueText(`${metric.target}/${metric.divisor}`);
          } else if (metric.mode === "percent") {
            setValueText(`${metric.target}%`);
          } else {
            setValueText(String(metric.target ?? 0));
          }
          startNoteTyping();
        }
      };

      frameId = window.requestAnimationFrame(tick);
    };

    delayId = window.setTimeout(startAnimation, index * 180);

    return () => {
      if (delayId) window.clearTimeout(delayId);
      if (frameId) window.cancelAnimationFrame(frameId);
      if (timerId) window.clearInterval(timerId);
      if (noteInterval) window.clearInterval(noteInterval);
    };
  }, [index, isActive, metric]);

  const noteText = metric.note.slice(0, noteChars);
  const isNoteTyping = isActive && noteChars < metric.note.length;

  return (
    <article className={`metric-card metric-card-live ${isActive ? "active" : "idle"}`}>
      <p className="metric-status">LIVE FEED</p>
      <p className="metric-value">{valueText}</p>
      <h3>{metric.label}</h3>
      <p className="metric-note">
        {noteText}
        <span className={`metric-caret ${isNoteTyping ? "on" : ""}`} aria-hidden="true" />
      </p>
    </article>
  );
}

function CoverageServerIcon({ id }) {
  if (id === "channels") {
    return (
      <svg className="coverage-server-glyph" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v2A2.5 2.5 0 0 1 17.5 11h-11A2.5 2.5 0 0 1 4 8.5v-2zm0 9A2.5 2.5 0 0 1 6.5 13h11a2.5 2.5 0 1 1 0 5h-11A2.5 2.5 0 0 1 4 15.5z" />
      </svg>
    );
  }
  if (id === "pods") {
    return (
      <svg className="coverage-server-glyph" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm8 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6zM4.5 18a3.5 3.5 0 0 1 7 0v1h-7v-1zm8 0a3.5 3.5 0 0 1 7 0v1h-7v-1z" />
      </svg>
    );
  }
  if (id === "knowledge") {
    return (
      <svg className="coverage-server-glyph" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M5 4.5A2.5 2.5 0 0 1 7.5 2H18v17h-1.2a3.8 3.8 0 0 0-3.8 3H7.5A2.5 2.5 0 0 1 5 19.5v-15zm3 2v2h7v-2H8zm0 4v2h7v-2H8z" />
      </svg>
    );
  }
  if (id === "advanced") {
    return (
      <svg className="coverage-server-glyph" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="m12 2 2.1 5.2L19 9.3l-4 3.4 1.2 5.3L12 15.2 7.8 18l1.2-5.3-4-3.4 4.9-2.1L12 2zm8.1 13.4 1 2.5 2.4 1-2.4 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5zM3.9 14l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z" />
      </svg>
    );
  }
  return (
    <svg className="coverage-server-glyph" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 3a9 9 0 0 1 8.8 7.2H17a5 5 0 0 0-9.8 0H3.2A9 9 0 0 1 12 3zm0 18a9 9 0 0 1-8.8-7.2H7a5 5 0 0 0 10 0h3.8A9 9 0 0 1 12 21z" />
    </svg>
  );
}

function CoverageMonitor({ channels }) {
  const [activeChannelId, setActiveChannelId] = useState(channels[0]?.id ?? "");
  const activeChannel = channels.find((channel) => channel.id === activeChannelId) ?? channels[0];

  if (!activeChannel) return null;

  return (
    <div className="coverage-monitor-shell">
      <div className="coverage-monitor-frame">
        <div className="coverage-discord-banner">
          <p>Community Ops User Server</p>
        </div>

        <div className="coverage-monitor-screen">
          <aside className="coverage-server-rail" aria-label="Servers">
            <button type="button" className="coverage-server-home" aria-label="Home">
              <CoverageServerIcon id="home" />
            </button>
            {channels.map((channel) => (
              <button
                key={channel.id}
                type="button"
                className={`coverage-server-btn ${activeChannel.id === channel.id ? "active" : ""}`}
                onClick={() => setActiveChannelId(channel.id)}
                aria-label={`Open ${channel.title}`}
              >
                <CoverageServerIcon id={channel.id} />
                <span className="coverage-server-chip">{channel.title}</span>
              </button>
            ))}
          </aside>

          <aside className="coverage-sidebar" aria-label="Operational channels">
            <header className="coverage-sidebar-head">
              <strong>Community Ops HQ</strong>
            </header>

            <p className="coverage-list-title">Text Channels</p>
            {channels.map((channel) => (
              <button
                key={channel.id}
                type="button"
                className={`coverage-channel-btn ${activeChannel.id === channel.id ? "active" : ""}`}
                onClick={() => setActiveChannelId(channel.id)}
              >
                <span className="coverage-channel-hash" aria-hidden="true">
                  #
                </span>
                <span>
                  <strong>{channel.title}</strong>
                  <small>{channel.status}</small>
                </span>
              </button>
            ))}
          </aside>

          <section className="coverage-feed" aria-live="polite">
            <header className="coverage-main-head">
              <p className="coverage-main-topic">
                #{activeChannel.title}
                <span>{activeChannel.status}</span>
              </p>
              <div className="coverage-main-actions" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            </header>

            <div className="coverage-search-row">
              <div className="coverage-search-box">Search or create post...</div>
              <button type="button" className="coverage-new-post">
                New post
              </button>
            </div>

            <div className="coverage-filter-row">
              <button type="button" className="coverage-filter-pill">
                Sort and view
              </button>
            </div>

            <div className="coverage-feed-body">
              {activeChannel.items.map((item, index) => (
                <article key={item} className={`coverage-post-card ${index % 2 ? "alt" : ""}`}>
                  <h4>
                    {activeChannel.title} thread {String(index + 1).padStart(2, "0")}
                  </h4>
                  <p>{item} • {activeChannel.context}</p>
                  <div className="coverage-post-meta">
                    <small>Joey</small>
                    <small>•</small>
                    <small>{index + 1}</small>
                    <small>•</small>
                    <small>~30 days ago</small>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="coverage-monitor-stand" aria-hidden="true">
        <span />
      </div>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [impactEffectsArmed, setImpactEffectsArmed] = useState(false);
  const [themeMode, setThemeMode] = useState(() => {
    if (typeof window === "undefined") return "dark";
    const stored = window.localStorage.getItem("community-theme-mode");
    if (stored === "dark" || stored === "light") return stored;
    return "dark";
  });

  const jumpTo = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    const hudHeight = document.querySelector(".command-center-hud")?.getBoundingClientRect().height ?? 0;
    const stickyOffset = hudHeight + 14;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - stickyOffset;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const sectionNodes = MENU_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
    if (!sectionNodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        threshold: [0.35, 0.5, 0.7],
        rootMargin: "-10% 0px -45% 0px",
      },
    );

    sectionNodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (impactEffectsArmed) return undefined;
    const impactNode = document.getElementById("impact");
    if (!impactNode) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setImpactEffectsArmed(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.38,
        rootMargin: "-12% 0px -28% 0px",
      },
    );

    observer.observe(impactNode);
    return () => observer.disconnect();
  }, [impactEffectsArmed]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
    window.localStorage.setItem("community-theme-mode", themeMode);
  }, [themeMode]);

  return (
    <div className="app-shell">
      <div className="atmosphere atmosphere-a" aria-hidden="true" />
      <div className="atmosphere atmosphere-b" aria-hidden="true" />
      <div className="signal-grid" aria-hidden="true" />
      <CommandCenterMenu3D
        models={COMMAND_MODELS}
        activeSection={activeSection}
        onSelect={jumpTo}
        themeMode={themeMode}
        onToggleTheme={() => setThemeMode((prev) => (prev === "dark" ? "light" : "dark"))}
      />

      <main className="layout">
        <section id="hero" className="hero-block section-block">
          <div className="hero-copy">
            <p className="eyebrow">Mobile Game Community Operations</p>
            <h1>Build a community system, not just a support layer.</h1>
            <p className="section-subtitle">
              A command-layer operating model for live-service titles. Moderation, engagement, knowledge systems,
              feedback intelligence, multilingual execution, governance, and structured reporting in one scalable
              operating framework.
            </p>

            <div className="hero-actions">
              <button type="button" className="btn btn-accent" onClick={() => jumpTo("contact")}>
                Start 30-Day Pilot Season
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => jumpTo("coverage")}>
                Open Command Brief
              </button>
            </div>
            <p className="microcopy">NDA-ready kickoff and operational draft in the first 48 hours.</p>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-link-layer">
              <span className="orbit orbit-outer" />
              <span className="orbit orbit-mid" />
              <span className="orbit orbit-inner" />
              <span className="link link-v" />
              <span className="link link-h" />
              <span className="link link-d1" />
              <span className="link link-d2" />
            </div>
            <div className="core">Core</div>
            <div className="node node-a">Moderation</div>
            <div className="node node-b">Engagement</div>
            <div className="node node-c">Content</div>
            <div className="node node-d">Feedback</div>
            <div className="node node-e">Compliance</div>
            <div className="node node-f">Reporting</div>
          </div>
        </section>

        <Section
          id="impact"
          eyebrow="Live Community Impact"
          title="Operational metrics as a live dashboard"
          subtitle="Scale, predictability, and cost efficiency visible at a glance."
        >
          <div className="metrics-grid">
            {LIVE_METRICS.map((metric, index) => (
              <LiveMetricCard key={metric.id} metric={metric} index={index} isActive={impactEffectsArmed} />
            ))}
          </div>

          <div className="chip-grid">
            {IMPACT_SIGNALS.map((item) => (
              <article key={item} className="chip-card">
                {item}
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="coverage"
          eyebrow="Operational Coverage"
          title="What this system actually covers"
          subtitle="Unified channel operations, delivery pods, knowledge layer, and advanced capabilities."
        >
          <CoverageMonitor channels={OPERATIONAL_COVERAGE} />
        </Section>

        <Section
          id="differentiator"
          eyebrow="Key Differentiator"
          title="Structured volunteer-based moderation, governed like a professional workforce"
          subtitle="Volunteer-powered at the core. Professionally controlled in execution."
        >
          <div className="split-2">
            <article className="panel-card">
              <h3>6-Step Operating Loop</h3>
              <ol className="loop-list">
                {VOLUNTEER_LOOP.map((step, index) => (
                  <li key={step}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {step}
                  </li>
                ))}
              </ol>
              <ul className="tight-list">
                {VOLUNTEER_DETAILS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="panel-card">
              <h3>Why this model scales</h3>
              <ul className="tight-list">
                {WHY_THIS_SCALES.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </Section>

        <Section
          id="teams"
          eyebrow="Team Architecture"
          title="Seven deployable operational teams"
          subtitle="All modules are coordinated by one community lead to keep one operating standard across channels."
        >
          <div className="team-grid">
            {TEAM_ARCHITECTURE.map((team) => (
              <article className="team-card" key={team.name}>
                <p className="team-number">{team.number}</p>
                <h3>{team.name}</h3>
                <p>{team.purpose}</p>
                <ul>
                  {team.caps.map((cap) => (
                    <li key={cap}>{cap}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="governance"
          eyebrow="Governance and Control Layer"
          title="Enterprise-ready predictability for high-scale live communities"
          subtitle="Built for trust, speed, and traceability."
        >
          <div className="governance-grid">
            {GOVERNANCE_PILLARS.map((pillar) => (
              <article key={pillar.title} className="panel-card">
                <h3>{pillar.title}</h3>
                <ul className="tight-list">
                  {pillar.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="reference-ribbon" role="note" aria-label="Reference frameworks">
            {REFERENCE_RIBBON.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </Section>

        <Section
          id="incident"
          eyebrow="Incident Command Framework"
          title="Severity control, response flow, and SLA discipline"
          subtitle="Designed for live-service pressure and crisis readiness."
        >
          <div className="split-2">
            <article className="panel-card">
              <h3>Severity Ladder</h3>
              <div className="severity-list">
                {SEVERITY_LADDER.map((row) => (
                  <div className="severity-row" key={row.key}>
                    <strong>{row.key}</strong>
                    <p>{row.text}</p>
                    <small>{row.target}</small>
                  </div>
                ))}
              </div>
            </article>

            <article className="panel-card">
              <h3>Action System</h3>
              <ul className="tight-list">
                {INCIDENT_ACTIONS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>

          <article className="table-shell">
            <h3>SLA Matrix</h3>
            <table>
              <thead>
                <tr>
                  <th>Severity</th>
                  <th>Case Type</th>
                  <th>Target Response</th>
                  <th>Action Path</th>
                </tr>
              </thead>
              <tbody>
                {SLA_ROWS.map((row) => (
                  <tr key={row[0]}>
                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                    <td>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        </Section>

        <Section
          id="roi"
          eyebrow="Pricing and ROI"
          title="Live community operations do not have to scale with internal headcount"
          subtitle="Financial visibility with modular execution and governance control."
        >
          <div className="roi-banner">Sample benchmark: up to 85% model savings depending on title scale and delivery scope.</div>

          <div className="table-grid">
            <Table title="Annual Comparison" rows={ANNUAL_ROWS} />
            <Table title="Monthly Comparison" rows={MONTHLY_ROWS} />
          </div>

          <div className="split-2">
            <article className="panel-card">
              <h3>In-house limitations</h3>
              <ul className="tight-list">
                {INHOUSE_LIMITS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="panel-card">
              <h3>Outsourced model advantages</h3>
              <ul className="tight-list">
                {OUTSOURCED_ADVANTAGES.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </Section>

        <Section
          id="founder"
          eyebrow="Founder / Operational Lead"
          title="Operator credibility built on execution"
          subtitle="Piotr Modlinski - Senior Community Ops Lead"
        >
          <div className="founder-shell">
            <img src="/assets/piotr-modlinski.jpeg" alt="Piotr Modlinski" />
            <article className="panel-card">
              <h3>Why trust this operator</h3>
              <p>
                Hands-on leadership across moderation, knowledge systems, multilingual publishing, and live-ops
                governance for large mobile game ecosystems.
              </p>
              <div className="languages">EN | DE | RU | PL</div>
            </article>
          </div>

          <div className="split-2">
            <article className="panel-card">
              <h3>Execution Metrics</h3>
              <ul className="tight-list">
                {FOUNDER_METRICS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="panel-card">
              <h3>Strategic Value</h3>
              <ul className="tight-list">
                {FOUNDER_VALUE.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </Section>

        <Section
          id="missions"
          eyebrow="Choose Your Starting Mission"
          title="Three clean entry points for studio-side onboarding"
          subtitle="Start where your operational pain is highest."
        >
          <div className="mission-grid">
            {STARTING_MISSIONS.map((mission) => (
              <article key={mission.title} className="mission-card">
                <h3>{mission.title}</h3>
                <p>{mission.copy}</p>
                <button type="button" className="btn btn-ghost" onClick={() => jumpTo(mission.target.replace("#", ""))}>
                  {mission.cta}
                </button>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="launch"
          eyebrow="Mission Launch"
          title="Simple onboarding flow"
          subtitle="From discovery to optimization in one operating cadence."
        >
          <ol className="timeline">
            {LAUNCH_STEPS.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </Section>

        <section id="contact" className="section-block final-cta">
          <div className="section-head">
            <p className="eyebrow">Build Your Community Operating Model</p>
            <h2>Command infrastructure for your next live-service phase</h2>
            <p className="section-subtitle">
              We can prepare a rollout plan with team structure, governance model, KPI framework, and delivery cadence
              tailored to your title.
            </p>
          </div>

          <div className="hero-actions">
            <a className="btn btn-accent" href="https://www.linkedin.com/in/piotr-modli%C5%84ski-83b78a71/" target="_blank" rel="noreferrer">
              Book War-Room Call
            </a>
            <button type="button" className="btn btn-ghost" onClick={() => jumpTo("roi")}>
              Unlock ROI Blueprint
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => jumpTo("coverage")}>
              View Mission Modules
            </button>
          </div>

          <p className="microcopy">Bring your current pain points and we will turn them into a 30/60/90 action map.</p>
        </section>
      </main>

      <footer className="footer">
        <p>Community Network | Premium Live-Ops Command Infrastructure for Game Communities</p>
      </footer>
    </div>
  );
}



