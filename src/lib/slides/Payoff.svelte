<script>
  let { content } = $props()
  const p = $derived(content.payoff)

  // Placeholder for the real turphViz embed — a few orbiting signals to evoke
  // the living field until the actual viz is dropped in.
  const signals = [
    { r: 70, dur: 8, delay: 0, size: 10 },
    { r: 110, dur: 13, delay: -3, size: 7 },
    { r: 150, dur: 19, delay: -8, size: 13 },
    { r: 95, dur: 11, delay: -5, size: 6 },
  ]
</script>

<div class="slide">
  <header>
    <h2>{p.title}</h2>
    <p class="lead">{p.body}</p>
  </header>

  <div class="viz" aria-label={p.label}>
    <div class="core"></div>
    {#each signals as s, i}
      <div
        class="orbit"
        style="--r:{s.r}px; --dur:{s.dur}s; --delay:{s.delay}s; --size:{s.size}px; --rot:{i * 47}deg;"
      >
        <span class="signal"></span>
      </div>
    {/each}
    <span class="viz-label">{p.label}</span>
  </div>
</div>

<style>
  .slide {
    width: 100%;
    max-width: 960px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  header {
    max-width: 680px;
    margin-bottom: var(--space-12);
  }

  h2 {
    font-size: clamp(1.75rem, 3.5vw, 2.75rem);
    letter-spacing: -0.02em;
    margin: 0 0 var(--space-4);
  }

  .lead {
    font-size: 1.125rem;
    line-height: 1.5;
    color: var(--secondary);
    margin: 0;
  }

  .viz {
    position: relative;
    width: 340px;
    height: 340px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .core {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 0 0 var(--accent-soft);
    animation: breathe 4s ease-in-out infinite;
  }

  @keyframes breathe {
    0%,
    100% {
      box-shadow: 0 0 0 6px var(--accent-soft);
      opacity: 0.95;
    }
    50% {
      box-shadow: 0 0 0 20px transparent;
      opacity: 1;
    }
  }

  .orbit {
    position: absolute;
    width: calc(var(--r) * 2);
    height: calc(var(--r) * 2);
    border: 1px solid var(--border);
    border-radius: 50%;
    transform: rotate(var(--rot));
    animation: spin var(--dur) linear var(--delay) infinite;
  }

  .signal {
    position: absolute;
    top: -1px;
    left: 50%;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    background: var(--accent);
    transform: translate(-50%, -50%);
    opacity: 0.85;
  }

  @keyframes spin {
    to {
      transform: rotate(calc(var(--rot) + 360deg));
    }
  }

  .viz-label {
    position: absolute;
    bottom: -36px;
    left: 50%;
    transform: translateX(-50%);
    font-family: var(--font-display);
    font-size: 13px;
    letter-spacing: 0.04em;
    color: var(--muted);
    white-space: nowrap;
  }

  @media (prefers-reduced-motion: reduce) {
    .core,
    .orbit {
      animation: none;
    }
  }
</style>
