<script>
  let { content } = $props()
  const d = $derived(content.decisions)
</script>

<div class="slide">
  <h2>{d.title}</h2>

  <ul class="refusals">
    {#each d.refusals as r}
      <li class="card">
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
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  h2 {
    font-size: clamp(1.75rem, 3.5vw, 2.75rem);
    letter-spacing: -0.02em;
    margin: 0;
  }

  /* Cards live in the space below the headline, vertically centered. */
  .refusals {
    list-style: none;
    margin: 0;
    padding: 0;
    flex: 1;
    max-width: 620px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: var(--space-4);
  }

  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: var(--space-6);
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .what {
    font-family: var(--font-display);
    font-size: 1.0625rem;
    font-weight: 600;
    color: var(--text);
  }

  .why {
    font-size: 0.9375rem;
    line-height: 1.5;
    color: var(--secondary);
  }
</style>
