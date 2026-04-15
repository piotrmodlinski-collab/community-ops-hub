import { useEffect, useRef, useState } from "react";

const ICON_MARKERS = [
  {
    id: "hero",
    label: "Community Operations",
    menu: "Community Operations",
    icon: "/assets/icon-community-operations.png",
    x: 36,
    y: -2,
    size: 108,
    offsetX: -2,
    offsetY: -1,
    tilt: -4,
  },
  {
    id: "impact",
    label: "Live Community Impact",
    menu: "Impact",
    icon: "/assets/icon-live-impact-house.png",
    x: 26,
    y: 61,
    size: 122,
    offsetX: -3,
    offsetY: 1,
    tilt: -6,
  },
  {
    id: "coverage",
    label: "Operational Coverage",
    menu: "Coverage",
    icon: "/assets/icon-operational-coverage.png",
    x: 61,
    y: -5,
    size: 114,
    topPriority: true,
    offsetX: 1,
    offsetY: -2,
    tilt: 2,
  },
  {
    id: "differentiator",
    label: "Key Differentiator",
    menu: "Differentiator",
    icon: "/assets/icon-key-differentiator.png",
    x: 73,
    y: -11,
    size: 110,
    topPriority: true,
    offsetX: 2,
    offsetY: -1,
    tilt: 5,
  },
  {
    id: "teams",
    label: "Team Architecture",
    menu: "Team",
    icon: "/assets/icon-team-architecture.png",
    x: 8,
    y: -11.8,
    size: 118,
    offsetX: -1,
    offsetY: -2,
    tilt: -7,
  },
  {
    id: "governance",
    label: "Governance and Control",
    menu: "Governance",
    icon: "/assets/icon-governance-control.png",
    x: 92,
    y: 12,
    size: 116,
    offsetX: 1,
    offsetY: -1,
    tilt: 6,
  },
  {
    id: "incident",
    label: "Incident Command",
    menu: "Incident",
    icon: "/assets/icon-incident-command.png",
    x: 45,
    y: 66,
    size: 100,
    offsetX: -1,
    offsetY: 2,
    tilt: -2,
  },
  {
    id: "founder",
    label: "Operational Lead",
    menu: "Lead",
    icon: "/assets/icon-operational-lead.png",
    x: 14,
    y: 71,
    size: 82,
    offsetX: -2,
    offsetY: 1,
    tilt: -8,
  },
  {
    id: "roi",
    label: "Pricing and ROI",
    menu: "ROI",
    icon: "/assets/icon-pricing-roi.png",
    x: 129,
    y: 84,
    size: 118,
    offsetX: 2,
    offsetY: 1,
    tilt: 7,
  },
  {
    id: "contact",
    label: "Build Your Community",
    menu: "Build",
    icon: "/assets/icon-build-your-community.png",
    x: 65,
    y: 74,
    size: 122,
    offsetX: 2,
    offsetY: 1,
    tilt: 4,
  },
];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function resolveMarkerLayout(markers, width, height) {
  if (!width || !height) return markers;

  const scaleByWidth = clamp(width / 680, 0.76, 1.95);
  const scaleByHeight = clamp(height / 300, 0.84, 1.55);
  const iconScale = Math.min(scaleByWidth, scaleByHeight);

  const topReserved = clamp(height * 0.03, 10, 22);
  const bottomReserved = clamp(height * 0.05, 16, 30);
  const sidePadding = clamp(width * 0.012, 8, 18);

  const spreadX = clamp(width / 980, 1.08, 1.22);
  const spreadY = clamp(height / 320, 1.04, 1.16);

  const points = markers.map((marker) => {
    const minSize = marker.id === "founder" ? 60 : 74;
    const maxSize = marker.size * 2.32;
    const renderSize = clamp(marker.size * iconScale, minSize, maxSize);
    const radius = renderSize * 0.5 + 10;
    const labelClearance = clamp(height * 0.065, 18, 30) + (marker.id === "founder" ? 8 : 0);

    const minX = sidePadding + radius;
    const maxX = width - sidePadding - radius;
    const minYLift = marker.topPriority ? 24 : 0;
    const minY = Math.max(radius * 0.7, topReserved + radius - minYLift);
    const rawMaxY = height - bottomReserved - radius - labelClearance;
    const maxY = Math.max(minY, rawMaxY);

    const mapX = 50 + (marker.x - 50) * spreadX + (marker.offsetX ?? 0);
    const mapY = 50 + (marker.y - 50) * spreadY + (marker.offsetY ?? 0);

    const x = clamp((mapX / 100) * width, minX, maxX);
    const y = clamp((mapY / 100) * height, minY, maxY);

    return { ...marker, renderSize, radius, x, y, minX, maxX, minY, maxY };
  });

  for (let n = 0; n < 260; n += 1) {
    for (let i = 0; i < points.length; i += 1) {
      for (let j = i + 1; j < points.length; j += 1) {
        const a = points[i];
        const b = points[j];

        let dx = b.x - a.x;
        let dy = b.y - a.y;
        let dist = Math.hypot(dx, dy);

        if (dist < 0.001) {
          const angle = (i * 37 + j * 17) * (Math.PI / 180);
          dx = Math.cos(angle);
          dy = Math.sin(angle);
          dist = 1;
        }

        const minDist = (a.radius + b.radius) * 1.17;

        if (dist < minDist) {
          const overlap = minDist - dist;
          const ux = dx / dist;
          const uy = dy / dist;
          const pushA = a.topPriority && !b.topPriority ? 0 : overlap * 0.5;
          const pushB = b.topPriority && !a.topPriority ? 0 : overlap * 0.5;

          a.x -= ux * pushA;
          a.y -= uy * pushA;
          b.x += ux * pushB;
          b.y += uy * pushB;

          a.x = clamp(a.x, a.minX, a.maxX);
          a.y = clamp(a.y, a.minY, a.maxY);
          b.x = clamp(b.x, b.minX, b.maxX);
          b.y = clamp(b.y, b.minY, b.maxY);
        }
      }
    }
  }

  return points.map((point) => ({
    ...point,
    xPx: point.x,
    yPx: point.y,
  }));
}

export default function CommandCenterMenu3D({ activeSection, onSelect, themeMode = "dark", onToggleTheme }) {
  const layerRef = useRef(null);
  const frameRef = useRef(null);
  const slotRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [layoutMarkers, setLayoutMarkers] = useState(ICON_MARKERS);
  const [isPinned, setIsPinned] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [slotHeight, setSlotHeight] = useState(null);
  const [pinStyle, setPinStyle] = useState(null);
  const isDarkTheme = themeMode === "dark";
  const logoSrc = isDarkTheme ? "/assets/community-network-logo-dark.png" : "/assets/community-network-logo.png";

  useEffect(() => {
    const node = layerRef.current;
    if (!node) return undefined;

    const updateLayout = () => {
      // Use layout-box size (not transformed visual size) so collapse scale
      // does not corrupt marker coordinates after window resize.
      const width = node.clientWidth || node.offsetWidth;
      const height = node.clientHeight || node.offsetHeight;
      if (width < 1 || height < 1) return;
      setLayoutMarkers(resolveMarkerLayout(ICON_MARKERS, width, height));
    };

    updateLayout();

    const observer = new ResizeObserver(updateLayout);
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updatePinState = () => {
      const slotNode = slotRef.current;
      const frameNode = frameRef.current;
      if (!slotNode || !frameNode) return;

      const slotRect = slotNode.getBoundingClientRect();
      const topOffset = Math.round(window.innerHeight * 0.03);
      const shouldPin = window.scrollY > 2 && slotRect.top <= topOffset;

      setSlotHeight(Math.round(frameNode.offsetHeight));
      setIsPinned(shouldPin);

      if (shouldPin) {
        setPinStyle({
          left: `${Math.round(slotRect.left)}px`,
          width: `${Math.round(slotRect.width)}px`,
          top: `${topOffset}px`,
        });
      } else {
        setPinStyle(null);
      }
    };

    updatePinState();
    window.addEventListener("scroll", updatePinState, { passive: true });
    window.addEventListener("resize", updatePinState);

    return () => {
      window.removeEventListener("scroll", updatePinState);
      window.removeEventListener("resize", updatePinState);
    };
  }, []);

  return (
    <section className="command-center-hud" aria-label="Command Center">
      <div className="command-center-stage">
        <button type="button" className="hud-logo" onClick={() => onSelect("hero")} aria-label="Go to Mobile Game Community Operations">
          <img src={logoSrc} alt="Community Network" />
        </button>

        <div ref={slotRef} className="phone-frame-slot" style={slotHeight ? { minHeight: `${slotHeight}px` } : undefined}>
          <div
            ref={frameRef}
            className={`phone-frame ${isPinned ? "is-pinned" : ""} ${isCollapsed ? "is-collapsed" : ""}`}
            style={isPinned ? pinStyle ?? undefined : undefined}
          >
            <button
              type="button"
              className={`phone-collapse-toggle ${isCollapsed ? "collapsed" : ""}`}
              onClick={() => setIsCollapsed((prev) => !prev)}
              aria-label={isCollapsed ? "Expand phone view" : "Collapse phone view"}
            >
              <span className="phone-power-icon" aria-hidden="true" />
            </button>
            <button
              type="button"
              className={`phone-theme-toggle ${isDarkTheme ? "dark" : "light"}`}
              onClick={() => onToggleTheme?.()}
              aria-label={isDarkTheme ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkTheme ? (
                <svg className="phone-theme-glyph" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M20.2 14.5a8.7 8.7 0 0 1-10.7-10.7 1 1 0 0 0-1.2-1.2A10 10 0 1 0 21.4 15.7a1 1 0 0 0-1.2-1.2z"
                  />
                </svg>
              ) : (
                <svg className="phone-theme-glyph" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 3.2a1 1 0 0 1 1 1v1.6a1 1 0 0 1-2 0V4.2a1 1 0 0 1 1-1zm0 15a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4zm8.8-5.2a1 1 0 0 1-1 1h-1.6a1 1 0 1 1 0-2h1.6a1 1 0 0 1 1 1zm-15 0a1 1 0 0 1-1 1H3.2a1 1 0 1 1 0-2h1.6a1 1 0 0 1 1 1zm11.2 6.2a1 1 0 0 1 1.4 0l1.1 1.1a1 1 0 0 1-1.4 1.4L17 20.6a1 1 0 0 1 0-1.4zM5.6 7.8a1 1 0 0 1 1.4 0l1.1 1.1A1 1 0 1 1 6.7 10L5.6 8.9a1 1 0 0 1 0-1.1zm12.5 0a1 1 0 0 1 1.4 1.4L18.4 10a1 1 0 1 1-1.4-1.4zM7 18.4a1 1 0 1 1 1.4 1.4l-1.1 1.1a1 1 0 0 1-1.4-1.4z"
                  />
                </svg>
              )}
            </button>
            <div className="command-viewport-shell">
              <div className="command-viewport" role="presentation" />
              <div className="phone-collapsed-face" aria-hidden={!isCollapsed}>
                <img src={logoSrc} alt="" />
              </div>

              <div ref={layerRef} className="icon-marker-layer" aria-label="Map icons">
                {layoutMarkers.map((marker) => (
                  <button
                    key={marker.id}
                    type="button"
                    className={`world-icon ${activeSection === marker.id ? "active" : ""} ${hoveredId === marker.id ? "hover" : ""}`}
                    style={{
                      left: marker.xPx != null ? `${marker.xPx}px` : `${marker.x}%`,
                      top: marker.yPx != null ? `${marker.yPx}px` : `${marker.y}%`,
                      "--icon-size": `${marker.renderSize ?? marker.size ?? 150}px`,
                      "--icon-tilt": `${marker.tilt ?? 0}deg`,
                    }}
                    onClick={() => onSelect(marker.id)}
                    onMouseEnter={() => setHoveredId(marker.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    aria-label={marker.label}
                  >
                    <img src={marker.icon} alt="" />
                    <span className="world-icon-label">{marker.menu ?? marker.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

