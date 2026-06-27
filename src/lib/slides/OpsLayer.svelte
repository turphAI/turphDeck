<script>
  let { content } = $props()
  const o = $derived(content.ops)
</script>

<div class="slide">
  <header>
    <h2>{o.title}</h2>
    <p class="lead">{o.body}</p>
  </header>

  <div class="flow" aria-label="sense, assess, decide">
    {#each o.flow as step, i}
      <span class="step" class:decide={step === 'decide'}>{step}</span>
      {#if i < o.flow.length - 1}<span class="sep" aria-hidden="true">→</span>{/if}
    {/each}
    <span class="decide-note">{o.decideNote}</span>
  </div>

  <ul class="agents">
    {#each o.agents as agent}
      <li>
        <span class="dot {agent.status}"></span>
        <div>
          <span class="name">{agent.name}</span>
          <span class="note">{agent.note}</span>
        </div>
      </li>
    {/each}
  </ul>
</div>

<style>
  .slide {
    width: 100%;
    max-width: 960px;
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
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--space-3);
    margin-bottom: var(--space-12);
  }

  .step {
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 600;
    text-transform: lowercase;
    color: var(--secondary);
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: var(--space-2) var(--space-6);
  }

  .step.decide {
    color: #fff;
    background: var(--accent);
    border-color: var(--accent);
  }

  .sep {
    color: var(--muted);
    font-family: var(--font-display);
  }

  .decide-note {
    font-size: 14px;
    color: var(--accent);
    margin-left: var(--space-4);
  }

  .agents {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-6) var(--space-12);
  }

  .agents li {
    display: flex;
    align-items: baseline;
    gap: var(--space-3);
  }

  .agents div {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .dot {
    flex: none;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    transform: translateY(2px);
  }
  .dot.live {
    background: var(--live);
  }
  .dot.planned {
    background: transparent;
    border: 1.5px solid var(--planned);
  }

  .name {
    font-family: var(--font-display);
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text);
  }

  .note {
    font-size: 15px;
    color: var(--secondary);
  }

  @media (max-width: 700px) {
    .agents {
      grid-template-columns: 1fr;
    }
    .decide-note {
      margin-left: 0;
      width: 100%;
    }
  }
</style>
