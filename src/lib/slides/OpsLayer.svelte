<script>
  import { hierarchy, pack } from 'd3-hierarchy'

  let { content } = $props()
  const o = $derived(content.ops)

  const SIZE = 820
  const AGENT_VALUE = 8
  const DECIDE_VALUE = 64
  // Rotate the packed layout off-axis so it doesn't read as a grid.
  const ANGLE = (21 * Math.PI) / 180

  const packed = $derived.by(() => {
    const data = {
      name: o.layerLabel,
      children: o.phases.map((ph) =>
        ph.human
          ? { name: ph.name, human: true, value: DECIDE_VALUE }
          : { name: ph.name, children: ph.agents.map((a) => ({ name: a.name, value: AGENT_VALUE })) }
      ),
    }
    return pack()
      .size([SIZE, SIZE])
      .padding(14)(
        hierarchy(data)
          .sum((d) => d.value || 0)
          .sort((a, b) => (b.value || 0) - (a.value || 0))
      )
  })

  const c = SIZE / 2
  const nodes = $derived(
    packed.descendants().map((n) => {
      const dx = n.x - c
      const dy = n.y - c
      const ca = Math.cos(ANGLE)
      const sa = Math.sin(ANGLE)
      return {
        x: c + dx * ca - dy * sa,
        y: c + dx * sa + dy * ca,
        r: n.r,
        depth: n.depth,
        data: n.data,
        isLeaf: !n.children,
      }
    })
  )
  const agentR = $derived(nodes.find((n) => n.depth === 2)?.r ?? 60)
  const decide = $derived(nodes.find((n) => n.data.human))
</script>

<div class="ops-hero">
  <div class="ops-head">
    <h2>{o.title}</h2>
  </div>

  <div class="ops-body">
    <div class="viz-wrap">
      <svg
        class="hero-svg"
        viewBox="0 0 {SIZE} {SIZE}"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="The ops layer — an ecosystem of agents; the human decides"
      >
        {#each nodes as n}
          {#if n.depth === 0}
            <circle class="membrane" cx={n.x} cy={n.y} r={n.r} />
          {:else if n.data.human}
            <circle class="decide" cx={n.x} cy={n.y} r={n.r} />
          {:else if !n.isLeaf}
            <circle class="phase" cx={n.x} cy={n.y} r={n.r} />
          {:else}
            <circle class="agent-bubble" cx={n.x} cy={n.y} r={n.r} />
          {/if}
        {/each}

        {#if decide}
          <circle class="agent-bubble" cx={decide.x} cy={decide.y} r={agentR} />
        {/if}

        {#each nodes as n}
          {#if n.depth === 0}
            <!-- container label lives in the key card -->
          {:else if n.data.human}
            <text class="phase-name" x={n.x} y={n.y + n.r - 18}>{n.data.name}</text>
          {:else if !n.isLeaf}
            <text class="phase-name" x={n.x} y={n.y + n.r - 14}>{n.data.name}</text>
          {:else}
            <text class="agent-name" x={n.x} y={n.y + 5}>{n.data.name}</text>
          {/if}
        {/each}

        {#if decide}
          <text class="agent-name" x={decide.x} y={decide.y + 5}>Human</text>
        {/if}
      </svg>
    </div>

    <aside class="key-card">
      <p class="key-title">{o.layerLabel}</p>
      <ul class="key-list">
        {#each o.phases as ph}
          <li class="key-phase">
            <span class="kp-name">{ph.name}</span>
            <span class="kp-blurb">{ph.blurb}</span>
            <ul class="key-agents">
              {#if ph.human}
                <li>
                  <span class="ka-name">Human</span>
                  <span class="ka-note">alone decides — no auto-change</span>
                </li>
              {:else}
                {#each ph.agents as a}
                  <li>
                    <span class="ka-name">{a.name}</span>
                    <span class="ka-note">{a.note}</span>
                  </li>
                {/each}
              {/if}
            </ul>
          </li>
        {/each}
      </ul>
    </aside>
  </div>
</div>

<style>
  .ops-hero {
    position: absolute;
    inset: 0;
    background: var(--accent);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .ops-head,
  .ops-body {
    width: 100%;
    max-width: calc(var(--slab) + 2 * var(--space-8));
    margin: 0 auto;
    padding-left: var(--space-8);
    padding-right: var(--space-8);
  }

  .ops-head {
    padding-top: 8vh;
    padding-bottom: var(--space-4);
  }

  .ops-head h2 {
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 3.2vw, 2.5rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.2;
    color: #fbf6f2;
    margin: 0;
  }

  .ops-body {
    flex: 1;
    min-height: 0;
    display: flex;
    align-items: center;
    gap: var(--space-12);
    padding-bottom: var(--space-8);
  }

  .viz-wrap {
    flex: 1.65;
    height: 100%;
    min-width: 0;
  }

  .hero-svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  text {
    font-family: var(--font-display);
    text-anchor: middle;
  }

  /* Three tones of the accent hue. */
  .membrane {
    fill: rgba(247, 233, 224, 0.06);
    stroke: rgba(247, 233, 224, 0.32);
    stroke-width: 2px;
  }
  .phase {
    fill: rgba(247, 233, 224, 0.13);
  }
  .agent-bubble {
    fill: rgba(247, 233, 224, 0.27);
  }
  .decide {
    fill: rgba(247, 233, 224, 0.2);
    stroke: rgba(247, 233, 224, 0.42);
    stroke-width: 2px;
  }
  .phase-name {
    font-size: 23px;
    font-weight: 600;
    fill: #54281a;
  }
  .agent-name {
    font-size: 13px;
    font-weight: 500;
    fill: #54281a;
  }

  /* The key card — structure, label home, and agent explanations. */
  .key-card {
    flex: 1;
    max-width: 380px;
    align-self: center;
    background: rgba(247, 233, 224, 0.12);
    border: 1px solid rgba(247, 233, 224, 0.25);
    border-radius: 16px;
    padding: var(--space-8);
  }

  .key-title {
    font-family: var(--font-display);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(74, 33, 20, 0.5);
    margin: 0 0 var(--space-6);
  }

  .key-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }

  .key-phase {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .kp-name {
    font-family: var(--font-display);
    font-size: 17px;
    font-weight: 600;
    color: #3f1e12;
  }

  .kp-blurb {
    font-size: 13px;
    color: rgba(74, 33, 20, 0.58);
  }

  .key-agents {
    list-style: none;
    margin: var(--space-2) 0 0;
    padding-left: var(--space-4);
    border-left: 2px solid rgba(74, 33, 20, 0.18);
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .key-agents li {
    display: flex;
    flex-direction: column;
  }

  .ka-name {
    font-family: var(--font-display);
    font-size: 13.5px;
    font-weight: 600;
    color: #54281a;
  }

  .ka-note {
    font-size: 12px;
    color: rgba(74, 33, 20, 0.62);
  }
</style>
