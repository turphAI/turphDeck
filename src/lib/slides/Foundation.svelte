<script>
  let { content } = $props()
  const f = $derived(content.foundation)
</script>

<div class="slide">
  <header>
    <h2>{f.title}</h2>
    <p class="lead">{f.lead}</p>
  </header>

  <ul class="pillars">
    {#each f.pillars as p}
      <li>
        <span class="fact">{p.fact}</span>
        <span class="arrow" aria-hidden="true">→</span>
        <span class="consequence">{p.consequence}</span>
      </li>
    {/each}
  </ul>
</div>

<style>
  .slide {
    width: 100%;
    max-width: var(--slab);
  }

  header {
    margin-bottom: var(--space-12);
  }

  h2 {
    font-size: clamp(1.75rem, 3.5vw, 2.75rem);
    letter-spacing: -0.02em;
    margin: 0 0 var(--space-4);
  }

  .lead {
    font-family: var(--font-display);
    font-size: clamp(1.125rem, 1.8vw, 1.375rem);
    font-weight: 500;
    line-height: 1.4;
    color: var(--accent);
    margin: 0;
    max-width: 600px;
  }

  .pillars {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }

  .pillars li {
    display: flex;
    align-items: baseline;
    gap: var(--space-3);
    flex-wrap: wrap;
  }

  .fact {
    font-family: var(--font-display);
    font-size: 1.0625rem;
    font-weight: 600;
    color: var(--text);
    flex: 0 0 auto;
  }

  .arrow {
    color: var(--accent);
    font-family: var(--font-display);
  }

  .consequence {
    font-size: 1rem;
    color: var(--secondary);
  }
</style>
