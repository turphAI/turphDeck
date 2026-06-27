<script>
  let { content } = $props()
  const a = $derived(content.architecture)

  const statusLabel = { live: 'Live', building: 'Building', planned: 'Planned' }
</script>

<div class="slide">
  <header>
    <h2>{a.title}</h2>
    <p class="lead">{a.body}</p>
  </header>

  <div class="flow">
    <div class="col producers">
      <p class="col-head">Producers</p>
      <ul>
        {#each a.producers as p}
          <li>
            <span class="dot {p.status}"></span>
            <span class="name">{p.name}</span>
            {#if p.note}<span class="note">{p.note}</span>{/if}
          </li>
        {/each}
      </ul>
    </div>

    <div class="arrow" aria-hidden="true">
      <span class="contract">{a.contract}</span>
      <span class="line"></span>
    </div>

    <div class="col surface">
      <p class="col-head">Consumer</p>
      <div class="surface-card">
        <span class="surface-name">turph</span>
        <span class="surface-note">{a.surface}</span>
      </div>
    </div>
  </div>

  <ul class="legend">
    {#each Object.entries(statusLabel) as [key, label]}
      <li><span class="dot {key}"></span>{label}</li>
    {/each}
  </ul>
</div>

<style>
  .slide {
    width: 100%;
    max-width: 1080px;
  }

  header {
    max-width: 720px;
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

  .flow {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: var(--space-8);
  }

  .col-head {
    font-family: var(--font-display);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    margin: 0 0 var(--space-4);
  }

  .producers ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-3) var(--space-6);
  }

  .producers li {
    display: flex;
    align-items: baseline;
    gap: var(--space-2);
    font-family: var(--font-display);
  }

  .name {
    font-weight: 600;
    color: var(--text);
  }

  .note {
    font-size: 13px;
    color: var(--muted);
  }

  .dot {
    flex: none;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    transform: translateY(-1px);
  }
  .dot.live {
    background: var(--live);
  }
  .dot.building {
    background: var(--building);
  }
  .dot.planned {
    background: transparent;
    border: 1.5px solid var(--planned);
  }

  .arrow {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
    min-width: 180px;
  }

  .contract {
    font-family: var(--font-display);
    font-size: 12px;
    color: var(--accent);
    background: var(--accent-soft);
    padding: var(--space-1) var(--space-3);
    border-radius: 999px;
    white-space: nowrap;
  }

  .line {
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, transparent, var(--border), var(--accent));
  }

  .surface-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-left: 3px solid var(--accent);
    border-radius: 10px;
    padding: var(--space-6);
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .surface-name {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text);
  }

  .surface-note {
    font-size: 14px;
    color: var(--secondary);
  }

  .legend {
    list-style: none;
    display: flex;
    gap: var(--space-8);
    margin: var(--space-12) 0 0;
    padding: 0;
  }

  .legend li {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-family: var(--font-display);
    font-size: 13px;
    color: var(--secondary);
  }

  @media (max-width: 760px) {
    .flow {
      grid-template-columns: 1fr;
      gap: var(--space-6);
    }
    .arrow {
      flex-direction: row;
      min-width: 0;
    }
    .arrow .line {
      display: none;
    }
  }
</style>
