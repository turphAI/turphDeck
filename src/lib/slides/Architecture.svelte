<script>
  import SwipeDots from '../SwipeDots.svelte'

  let { content } = $props()
  const a = $derived(content.architecture)

  const statusLabel = { live: 'Live', building: 'Building', planned: 'Planned' }
  let bucketsEl = $state()
</script>

<div class="slide">
  <h2>{a.title}</h2>

  <div class="flow">
    <!-- consumer on top -->
    <div class="tier">
      <span class="role">Consumer</span>
      <div class="consumer-card">
        <span class="cname">{a.consumer.name}</span>
        <span class="cnote">{a.consumer.note}</span>
      </div>
    </div>

    <!-- contract connector (the symmetric API) -->
    <div class="contract">
      <span class="seg"></span>
      <span class="pill">{a.contract}</span>
      <span class="seg"></span>
    </div>
    <p class="contract-note">{a.contractNote}</p>

    <!-- producers below, bucketed by the opener's four problems -->
    <div class="tier producers">
      <span class="role">Producers</span>
      <div class="buckets" bind:this={bucketsEl}>
        {#each a.categories as cat}
          <div class="bucket">
            <span class="problem">{cat.problem}</span>
            <ul>
              {#each cat.apps as app}
                <li>
                  <span class="dot {app.status}"></span>
                  <span class="app">
                    <span class="name">{app.name}</span>
                    <span class="note">{app.note}</span>
                  </span>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </div>

    <SwipeDots el={bucketsEl} count={a.categories.length} />
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
    max-width: var(--slab);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    text-align: left;
  }

  h2 {
    font-size: clamp(1.75rem, 3.5vw, 2.75rem);
    letter-spacing: -0.02em;
    margin: 0 0 var(--space-12);
    white-space: nowrap;
  }

  .flow {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .tier {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-3);
  }

  .role {
    font-family: var(--font-display);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
  }

  /* Consumer — the prominent card at the top */
  .consumer-card {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    background: var(--surface);
    border: 1px solid var(--border);
    border-top: 3px solid var(--accent);
    border-radius: 12px;
    padding: var(--space-6) var(--space-12);
    min-width: 320px;
  }

  .cname {
    font-family: var(--font-display);
    font-size: 1.625rem;
    font-weight: 700;
    color: var(--text);
  }

  .cnote {
    font-size: 14px;
    color: var(--secondary);
  }

  /* Contract connector — the symmetric API, enlarged */
  .contract {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .seg {
    width: 2px;
    height: var(--space-6);
    background: var(--border);
  }

  .pill {
    font-family: var(--font-display);
    font-size: 15px;
    font-weight: 500;
    color: var(--accent);
    background: var(--accent-soft);
    padding: var(--space-2) var(--space-6);
    border-radius: 999px;
    white-space: nowrap;
    margin: var(--space-1) 0;
  }

  .contract-note {
    font-size: 13px;
    color: var(--muted);
    margin: var(--space-3) 0 var(--space-8);
  }

  /* Producers — bucketed by the opener's problems */
  .producers {
    width: 100%;
  }

  .buckets {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-8);
    width: 100%;
    max-width: 980px;
    margin-top: var(--space-2);
    text-align: left;
  }

  .bucket {
    flex: 1 1 150px;
    min-width: 140px;
    max-width: 200px;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .problem {
    font-family: var(--font-display);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
    padding-bottom: var(--space-2);
    border-bottom: 1px solid var(--border);
  }

  .bucket ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .bucket li {
    display: flex;
    gap: var(--space-2);
  }

  .app {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .name {
    font-family: var(--font-display);
    font-size: 1rem;
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
    margin-top: 7px;
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

  .legend {
    list-style: none;
    display: flex;
    justify-content: center;
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
  .legend .dot {
    margin-top: 0;
  }

  @media (max-width: 760px) {
    h2 {
      white-space: normal;
    }
    .buckets {
      gap: var(--space-6);
    }
    .consumer-card {
      padding: var(--space-6) var(--space-8);
    }
  }

  /* Phone: the producers become a swipe row — one domain bucket at a time,
     peeking the next. The consumer card + contract stay stacked above. */
  @media (max-width: 640px) {
    .buckets {
      flex-wrap: nowrap;
      justify-content: flex-start;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      gap: var(--space-6);
      margin-inline: calc(-1 * var(--space-6));
      padding-inline: var(--space-6);
      scrollbar-width: none;
    }
    .buckets::-webkit-scrollbar {
      display: none;
    }
    .bucket {
      flex: 0 0 64%;
      max-width: none;
      scroll-snap-align: center;
    }
  }
</style>
