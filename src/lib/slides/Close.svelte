<script>
  let { content } = $props()
  const c = $derived(content.close)
</script>

<div class="close">
  <p class="signoff">{c.signoff}</p>
  <p class="name">{c.name}</p>
  <div class="links">
    {#each c.links as l, i}
      {#if i > 0}<span class="sep" aria-hidden="true">·</span>{/if}
      <a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
    {/each}
  </div>
</div>

<style>
  .close {
    width: 100%;
    max-width: var(--slab);
  }

  .signoff {
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 4.5vw, 3.25rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--text);
    margin: 0;
    max-width: 760px;
  }

  .name {
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text);
    margin: var(--space-12) 0 0;
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3);
    margin-top: var(--space-3);
  }

  .links a {
    font-family: var(--font-display);
    font-size: 0.9375rem;
    color: var(--secondary);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: color 0.2s, border-color 0.2s;
  }

  .links a:hover {
    color: var(--accent);
    border-bottom-color: var(--accent);
  }

  .sep {
    color: var(--muted);
  }

  /* Phone: one line per link instead of an awkward inline wrap. */
  @media (max-width: 640px) {
    .links {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-2);
    }
    .sep {
      display: none;
    }
  }
</style>
