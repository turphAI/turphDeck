<script>
  let { content } = $props()
  const p = $derived(content.payoff)

  // ── Drop-in the real turphViz capture here ──────────────────────────────
  // Put the file at  public/turphviz-loop.mp4  and set videoSrc below.
  // It will replace the generated placeholder field with the real thing.
  const videoSrc = '/turphviz-loop.mp4'
  const poster = '/turphviz-poster.jpg'
  // ────────────────────────────────────────────────────────────────────────

  // Placeholder signal field: breathing nodes, faint links, drifting comets.
  const nodes = [
    { x: 800, y: 430, r: 13, d: 0, hero: true },
    { x: 470, y: 300, r: 6, d: 0.4 },
    { x: 1130, y: 340, r: 7, d: 1.0 },
    { x: 300, y: 560, r: 5, d: 1.6 },
    { x: 620, y: 230, r: 4, d: 0.8 },
    { x: 980, y: 250, r: 5, d: 2.0 },
    { x: 1280, y: 560, r: 6, d: 0.6 },
    { x: 560, y: 640, r: 5, d: 1.3 },
    { x: 1010, y: 640, r: 7, d: 0.2 },
    { x: 380, y: 430, r: 4, d: 2.4 },
    { x: 1180, y: 470, r: 4, d: 1.8 },
    { x: 720, y: 600, r: 4, d: 0.9 },
    { x: 880, y: 560, r: 5, d: 1.5 },
    { x: 230, y: 380, r: 3, d: 0.5 },
    { x: 1360, y: 300, r: 4, d: 2.2 },
  ]
  const edges = [
    [0, 1], [0, 2], [0, 8], [0, 12], [1, 4], [2, 5], [8, 6], [1, 9], [2, 10], [12, 11], [3, 7], [0, 6],
  ]
</script>

<div class="payoff-hero">
  {#if videoSrc}
    <video class="field" autoplay muted loop playsinline {poster}>
      <source src={videoSrc} type="video/mp4" />
    </video>
  {:else}
    <svg class="field" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="1600" height="900" fill="#16110d" />
      {#each edges as [a, b]}
        <line class="edge" x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} />
      {/each}
      <circle class="ring" cx={nodes[0].x} cy={nodes[0].y} r="13" />
      {#each nodes as n}
        <circle
          class="node"
          class:hero={n.hero}
          cx={n.x}
          cy={n.y}
          r={n.r}
          style="animation-delay: {-n.d}s"
        />
      {/each}
      <circle class="comet" r="3.5">
        <animateMotion dur="7s" repeatCount="indefinite" path="M-60,250 Q700,80 1660,420" />
      </circle>
      <circle class="comet" r="2.8">
        <animateMotion dur="9s" begin="-4s" repeatCount="indefinite" path="M1660,660 Q800,760 -60,520" />
      </circle>
    </svg>
  {/if}

  <div class="scrim"></div>

  <div class="overlay">
    <div class="overlay-inner">
      <h2>{p.title}</h2>
      <p class="lead">{p.body}</p>
      <span class="viz-label">{p.label}</span>
    </div>
  </div>
</div>

<style>
  .payoff-hero {
    position: absolute;
    inset: 0;
    background: #16110d;
    overflow: hidden;
  }

  .field {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /* A soft top-left wash so the headline stays legible over the field. */
  .scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(10, 7, 5, 0.6), rgba(10, 7, 5, 0.1) 48%, transparent 70%);
  }

  .overlay {
    position: absolute;
    inset: 0;
  }

  .overlay-inner {
    width: 100%;
    max-width: calc(var(--slab) + 2 * var(--space-8));
    margin: 0 auto;
    padding: 8vh var(--space-8) 0;
  }

  h2 {
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 3.2vw, 2.5rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.2;
    color: #fbf6f2;
    margin: 0;
  }

  .lead {
    font-size: 1.0625rem;
    line-height: 1.5;
    color: rgba(251, 246, 242, 0.82);
    margin: var(--space-4) 0 0;
    max-width: 520px;
  }

  .viz-label {
    display: block;
    margin-top: var(--space-6);
    font-family: var(--font-display);
    font-size: 13px;
    letter-spacing: 0.04em;
    color: rgba(251, 246, 242, 0.55);
  }

  /* ── placeholder field animation ── */
  .edge {
    stroke: rgba(247, 233, 224, 0.08);
    stroke-width: 1;
  }

  .node {
    fill: rgba(247, 233, 224, 0.85);
    transform-box: fill-box;
    transform-origin: center;
    animation: pulse 4s ease-in-out infinite;
  }

  .node.hero {
    fill: #d98a63;
    filter: drop-shadow(0 0 14px rgba(217, 138, 99, 0.85));
    animation-duration: 5s;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.32;
      transform: scale(0.85);
    }
    50% {
      opacity: 1;
      transform: scale(1.12);
    }
  }

  .ring {
    fill: none;
    stroke: rgba(217, 138, 99, 0.5);
    stroke-width: 1.5;
    transform-box: fill-box;
    transform-origin: center;
    animation: ring 5s ease-out infinite;
  }

  @keyframes ring {
    0% {
      opacity: 0.55;
      transform: scale(0.5);
    }
    100% {
      opacity: 0;
      transform: scale(3);
    }
  }

  .comet {
    fill: #f0d8c8;
    filter: drop-shadow(0 0 7px rgba(240, 200, 170, 0.9));
  }

  @media (prefers-reduced-motion: reduce) {
    .node,
    .ring {
      animation: none;
    }
  }
</style>
