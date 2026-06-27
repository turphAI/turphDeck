<script>
  let { content } = $props()
  const d = $derived(content.decisions)
</script>

<div class="slide">
  <header>
    <h2>{d.title}</h2>
    <p class="lead">{d.lead}</p>
  </header>

  <ul class="refusals">
    {#each d.refusals as r}
      <li>
        <span class="what">{r.what}</span>
        <span class="why">{r.why}</span>
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

  .refusals {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-8) var(--space-12);
  }

  .refusals li {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding-left: var(--space-4);
    border-left: 2px solid var(--border);
  }

  .what {
    font-family: var(--font-display);
    font-size: 1.0625rem;
    font-weight: 600;
    color: var(--text);
  }

  .why {
    font-size: 0.9375rem;
    line-height: 1.45;
    color: var(--secondary);
  }

  @media (max-width: 700px) {
    .refusals {
      grid-template-columns: 1fr;
      gap: var(--space-6);
    }
  }
</style>
