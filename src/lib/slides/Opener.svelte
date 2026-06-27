<script>
  let { content } = $props()
</script>

<div class="opener">
  <h1>{content.opener.problem}</h1>
  <p class="craft">{content.opener.craft}</p>
</div>

<style>
  .opener {
    max-width: var(--slab);
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
</style>
