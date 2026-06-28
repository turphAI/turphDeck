<script>
  let { content } = $props()
  const f = $derived(content.foundation)
</script>

{#snippet icon(id)}
  <svg
    class="card-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    {#if id === 'mini'}
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    {:else if id === 'shield'}
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    {:else if id === 'chip'}
      <rect width="16" height="16" x="4" y="4" rx="2" />
      <rect width="6" height="6" x="9" y="9" rx="1" />
      <path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" />
      <path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" />
    {:else if id === 'cloud'}
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      <line x1="3" y1="3" x2="21" y2="21" />
    {/if}
  </svg>
{/snippet}

<div class="slide">
  <h2>{f.title}</h2>

  <div class="cards">
    {#each f.pillars as p}
      <div class="card">
        <span class="card-badge">{@render icon(p.icon)}</span>
        <span class="card-label">{p.label}</span>
        <span class="card-blurb">{p.blurb}</span>
      </div>
    {/each}
  </div>
</div>

<style>
  .slide {
    width: 100%;
    max-width: var(--slab);
  }

  h2 {
    font-size: clamp(1.75rem, 3.5vw, 2.75rem);
    letter-spacing: -0.02em;
    margin: 0 0 var(--space-12);
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-6);
  }

  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: var(--space-8) var(--space-6);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--space-4);
  }

  .card-badge {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: var(--accent-soft);
    color: var(--accent);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--space-1);
  }

  .card-icon {
    width: 30px;
    height: 30px;
  }

  .card-label {
    font-family: var(--font-display);
    font-size: 1.0625rem;
    font-weight: 600;
    color: var(--text);
  }

  .card-blurb {
    font-size: 0.9375rem;
    line-height: 1.5;
    color: var(--secondary);
  }

  @media (max-width: 760px) {
    .cards {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-4);
    }
  }
</style>
