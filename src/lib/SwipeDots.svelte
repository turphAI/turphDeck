<script>
  // Scroll-position indicator for the small-screen carousels. Shows there are
  // more cards than the one on screen, and which one you're on. Only visible at
  // the carousel breakpoint — hidden on desktop where everything shows at once.
  let { el, count } = $props()
  let active = $state(0)

  function update() {
    if (!el || count < 2) return
    const max = el.scrollWidth - el.clientWidth
    active = max <= 0 ? 0 : Math.round((el.scrollLeft / max) * (count - 1))
  }

  $effect(() => {
    if (!el) return
    update()
    el.addEventListener('scroll', update, { passive: true })
    return () => el.removeEventListener('scroll', update)
  })
</script>

{#if count > 1}
  <div class="swipe-dots" aria-hidden="true">
    {#each Array(count) as _, i}
      <span class:active={i === active}></span>
    {/each}
  </div>
{/if}

<style>
  /* Desktop shows every card, so no indicator is needed. */
  .swipe-dots {
    display: none;
  }

  @media (max-width: 640px) {
    .swipe-dots {
      display: flex;
      justify-content: center;
      gap: var(--space-2);
      margin-top: var(--space-6);
    }
    .swipe-dots span {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--border);
      transition: background 0.2s, transform 0.2s;
    }
    .swipe-dots span.active {
      background: var(--accent);
      transform: scale(1.3);
    }
  }
</style>
