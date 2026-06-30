<script>
  import { hierarchy, pack } from 'd3-hierarchy'

  let { content } = $props()
  const o = $derived(content.ops)

  const SIZE = 820
  const PHASE_VALUE = 10 // Sense / Consume / Assess — all equal
  const DECIDE_VALUE = 16 // a touch bigger, not overpowering
  const ANGLE = (21 * Math.PI) / 180 // rotate off-axis so it isn't a grid

  // Pack ONLY the phases, so phase size is independent of how many agents it
  // holds. Agents are then drawn at one fixed radius and placed by hand.
  const layout = $derived.by(() => {
    const data = {
      name: o.layerLabel,
      children: o.phases.map((ph) => ({
        name: ph.name,
        human: ph.human || false,
        value: ph.human ? DECIDE_VALUE : PHASE_VALUE,
      })),
    }
    const packed = pack()
      .size([SIZE, SIZE])
      .padding(20)(
        hierarchy(data)
          .sum((d) => d.value || 0)
          .sort((a, b) => (b.value || 0) - (a.value || 0))
      )

    const c = SIZE / 2
    const ca = Math.cos(ANGLE)
    const sa = Math.sin(ANGLE)
    const rot = (x, y) => {
      const dx = x - c
      const dy = y - c
      return [c + dx * ca - dy * sa, c + dx * sa + dy * ca]
    }

    const nodes = packed.descendants().map((n) => {
      const [x, y] = rot(n.x, n.y)
      return { x, y, r: n.r, depth: n.depth, data: n.data }
    })

    const phaseNodes = nodes.filter((n) => n.depth === 1)
    const Rp = (phaseNodes.find((n) => !n.data.human) || phaseNodes[0]).r
    const agentR = Rp * 0.36

    const agents = []
    for (const pn of phaseNodes) {
      const ph = o.phases.find((p) => p.name === pn.data.name)
      const len = Math.hypot(pn.x - c, pn.y - c) || 1
      const ox = (pn.x - c) / len // outward (toward the membrane wall)
      const oy = (pn.y - c) / len
      const tx = -oy // tangent
      const ty = ox
      if (pn.data.human) {
        agents.push({ x: pn.x + ox * pn.r * 0.45, y: pn.y + oy * pn.r * 0.45, name: 'Human' })
      } else if (ph.agents.length === 1) {
        agents.push({ x: pn.x + ox * pn.r * 0.34, y: pn.y + oy * pn.r * 0.34, name: ph.agents[0].name })
      } else {
        agents.push({ x: pn.x + tx * pn.r * 0.42, y: pn.y + ty * pn.r * 0.42, name: ph.agents[0].name })
        agents.push({ x: pn.x - tx * pn.r * 0.42, y: pn.y - ty * pn.r * 0.42, name: ph.agents[1].name })
      }
    }

    return { nodes, agentR, agents }
  })
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
        {#each layout.nodes as n}
          {#if n.depth === 0}
            <circle class="membrane" cx={n.x} cy={n.y} r={n.r} />
          {:else if n.data.human}
            <circle class="decide" cx={n.x} cy={n.y} r={n.r} />
          {:else}
            <circle class="phase" cx={n.x} cy={n.y} r={n.r} />
          {/if}
        {/each}

        {#each layout.agents as a}
          <circle class="agent-bubble" cx={a.x} cy={a.y} r={layout.agentR} />
        {/each}

        {#each layout.nodes as n}
          {#if n.depth === 1}
            <text class="phase-name" x={n.x} y={n.y + n.r - 14}>{n.data.name}</text>
          {/if}
        {/each}

        {#each layout.agents as a}
          <text class="agent-name" x={a.x} y={a.y + 5}>{a.name}</text>
        {/each}
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

  /* The key card — a warm, readable panel (not pure white). */
  .key-card {
    flex: 1;
    max-width: 380px;
    align-self: center;
    background: rgba(249, 240, 233, 0.9);
    border: 1px solid rgba(90, 50, 35, 0.12);
    border-radius: 16px;
    padding: var(--space-8);
  }

  .key-title {
    font-family: var(--font-display);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(90, 50, 35, 0.62);
    margin: 0 0 var(--space-6);
  }

  /* Inter-phase gap is the largest space — it separates the groups. */
  .key-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  .key-phase {
    display: flex;
    flex-direction: column;
  }

  .kp-name {
    font-family: var(--font-display);
    font-size: 17px;
    font-weight: 600;
    line-height: 1.2;
    color: #3a1c10;
  }

  .kp-blurb {
    font-size: 13px;
    line-height: 1.3;
    color: rgba(80, 48, 34, 0.74);
  }

  /* No rule line — indentation + proximity carry the nesting. Agents sit
     closer to their phase (above) than to the next phase (below). */
  .key-agents {
    list-style: none;
    margin: var(--space-2) 0 0;
    padding-left: var(--space-4);
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
    line-height: 1.25;
    color: #4a2114;
  }

  .ka-note {
    font-size: 12.5px;
    line-height: 1.3;
    color: rgba(80, 48, 34, 0.72);
  }

  /* Small screens: drop the side-by-side and stack — illustration on top, the
     key card beneath it. The hero leaves the absolute fill and flows so it can
     grow taller than the viewport (the stage scrolls). */
  @media (max-width: 760px) {
    .ops-hero {
      position: relative;
      inset: auto;
      min-height: 100vh;
      height: auto;
    }
    .ops-head {
      padding-top: var(--space-12);
    }
    .ops-body {
      flex-direction: column;
      align-items: stretch;
      gap: var(--space-8);
      padding-bottom: var(--space-18);
    }
    .viz-wrap {
      flex: none;
      width: 100%;
      max-width: 440px;
      height: auto;
      aspect-ratio: 1 / 1;
      margin: 0 auto;
    }
    .key-card {
      flex: none;
      width: 100%;
      max-width: none;
    }
  }
</style>
