<script>
  let { content } = $props()
</script>

<div class="opener">
  <p class="kicker">{content.kicker}</p>
  <h1>{content.opener.problem}</h1>
  <p class="craft">{content.opener.craft}</p>

  <ul class="proof">
    {#each content.proof as p}
      <li>
        <span class="stat">{p.stat}</span>
        <span class="plabel">{p.label}</span>
      </li>
    {/each}
  </ul>
</div>

<style>
  .opener {
    max-width: 980px;
  }

  .kicker {
    font-family: var(--font-display);
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
    margin: 0 0 var(--space-6);
  }

  h1 {
    font-size: clamp(2rem, 4.5vw, 3.5rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--text);
    margin: 0;
  }

  .craft {
    font-family: var(--font-display);
    font-size: clamp(1.25rem, 2.4vw, 1.875rem);
    font-weight: 500;
    line-height: 1.3;
    color: var(--accent);
    margin: var(--space-8) 0 0;
    max-width: 760px;
  }

  .proof {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-12);
    margin: var(--space-18) 0 0;
    padding: var(--space-8) 0 0;
    border-top: 1px solid var(--border);
  }

  .proof li {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .stat {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text);
  }

  .plabel {
    font-size: 15px;
    color: var(--secondary);
    max-width: 220px;
  }

  @media (max-width: 640px) {
    .proof {
      gap: var(--space-6);
    }
  }
</style>
