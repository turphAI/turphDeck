<script>
  let { content } = $props()
  const o = $derived(content.ops)
</script>

<div class="slide">
  <h2>{o.title}</h2>

  <!-- The ops layer, rendered as a layer: a contained band with the four
       phases flowing across it and an agent operating inside each phase. -->
  <div class="layer">
    <span class="layer-label">{o.layerLabel}</span>

    <div class="phases">
      {#each o.phases as ph}
        <div class="phase" class:terminal={ph.name === 'Decide'}>
          <span class="phase-name">{ph.name}</span>
          <span class="phase-blurb">{ph.blurb}</span>
        </div>
      {/each}
    </div>

    <div class="rail">
      {#each o.phases as ph}
        <span class="node-cell"><span class="node" class:terminal={ph.name === 'Decide'}></span></span>
      {/each}
    </div>

    <div class="agents">
      {#each o.phases as ph}
        <div class="agent-col">
          {#if ph.human}
            <div class="human">
              <span class="human-name">The human</span>
              <span class="human-note">holds the decide seat</span>
            </div>
          {:else}
            {#each ph.agents as ag}
              <div class="agent">
                <span class="agent-head">
                  <span class="dot {ag.status}"></span>
                  <span class="agent-name">{ag.name}</span>
                </span>
                <span class="agent-note">{ag.note}</span>
              </div>
            {/each}
          {/if}
        </div>
      {/each}
    </div>
  </div>

  <p class="decide-note">{o.decideNote}</p>
</div>

<style>
  .slide {
    width: 100%;
    max-width: var(--slab);
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  h2 {
    font-size: clamp(1.75rem, 3.5vw, 2.75rem);
    letter-spacing: -0.02em;
    margin: 0 0 var(--space-12);
  }

  /* The layer — a contained band the phases operate inside */
  .layer {
    position: relative;
    border: 1px solid var(--border);
    border-radius: 16px;
    background: color-mix(in srgb, var(--accent-soft) 22%, var(--surface));
    padding: var(--space-12) var(--space-8) var(--space-8);
  }

  .layer-label {
    position: absolute;
    top: calc(-1 * var(--space-3));
    left: var(--space-8);
    font-family: var(--font-display);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
    background: var(--bg);
    padding: 0 var(--space-3);
  }

  /* Three aligned 4-column rows: phases, the rail, the agents */
  .phases,
  .agents {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }

  .phase {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding: 0 var(--space-3);
  }

  .phase-name {
    font-family: var(--font-display);
    font-size: 1.375rem;
    font-weight: 600;
    color: var(--text);
  }

  .phase.terminal .phase-name {
    color: var(--accent);
  }

  .phase-blurb {
    font-size: 13px;
    color: var(--muted);
  }

  /* The rail — the pipeline flowing left → right through the layer */
  .rail {
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin: var(--space-6) 0;
  }

  .rail::before {
    content: '';
    position: absolute;
    left: 6%;
    right: 6%;
    top: 50%;
    height: 2px;
    transform: translateY(-50%);
    background: linear-gradient(to right, var(--border), var(--accent));
  }

  .node-cell {
    display: flex;
    justify-content: center;
  }

  .node {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: var(--bg);
    border: 2px solid var(--accent);
    position: relative;
    z-index: 1;
  }

  .node.terminal {
    background: var(--accent);
  }

  .agent-col {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    padding: 0 var(--space-3);
  }

  .agent {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .agent-head {
    display: flex;
    align-items: baseline;
    gap: var(--space-2);
  }

  .agent-name {
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 600;
    color: var(--text);
  }

  .agent-note {
    font-size: 13px;
    color: var(--secondary);
    padding-left: calc(8px + var(--space-2));
  }

  /* The human owns Decide — distinct from the agents (no status dot) */
  .human {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .human-name {
    display: flex;
    align-items: baseline;
    gap: var(--space-2);
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 700;
    color: var(--accent);
  }

  .human-name::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
  }

  .human-note {
    font-size: 13px;
    color: var(--secondary);
    padding-left: calc(8px + var(--space-2));
  }

  .dot {
    flex: none;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  .dot.live {
    background: var(--live);
  }
  .dot.planned {
    background: transparent;
    border: 1.5px solid var(--planned);
  }

  .decide-note {
    text-align: center;
    font-size: 14px;
    color: var(--secondary);
    margin: var(--space-8) 0 0;
  }

  @media (max-width: 760px) {
    .phases,
    .agents,
    .rail {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-6) 0;
    }
    .rail {
      display: none;
    }
  }
</style>
