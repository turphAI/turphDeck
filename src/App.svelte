<script>
  import { content } from './lib/content.js'
  import Opener from './lib/slides/Opener.svelte'
  import Architecture from './lib/slides/Architecture.svelte'
  import OpsLayer from './lib/slides/OpsLayer.svelte'
  import Foundation from './lib/slides/Foundation.svelte'
  import Decisions from './lib/slides/Decisions.svelte'
  import Payoff from './lib/slides/Payoff.svelte'
  import Close from './lib/slides/Close.svelte'

  const slides = [Opener, Architecture, OpsLayer, Foundation, Decisions, Payoff, Close]
  // Slides that break out of the padded masthead and fill the viewport.
  const bleedSlides = new Set([2, 5]) // the ops layer + the turphViz payoff
  let index = $state(0)
  const Current = $derived(slides[index])

  // On small screens the stage scrolls instead of clipping — reset to the top
  // of each new slide as you move through the deck.
  let mainEl
  $effect(() => {
    index
    if (mainEl) mainEl.scrollTop = 0
  })

  function next() {
    if (index < slides.length - 1) index++
  }
  function prev() {
    if (index > 0) index--
  }
  function onKey(e) {
    if (['ArrowRight', 'ArrowDown', ' ', 'PageDown'].includes(e.key)) {
      e.preventDefault()
      next()
    } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
      e.preventDefault()
      prev()
    } else if (e.key === 'Home') {
      index = 0
    } else if (e.key === 'End') {
      index = slides.length - 1
    }
  }
</script>

<svelte:window onkeydown={onKey} />

<main class:on-bleed={bleedSlides.has(index)} bind:this={mainEl}>
  {#key index}
    <section
      class="stage"
      class:centered-stage={index === 0 || index === slides.length - 1}
      class:bleed={bleedSlides.has(index)}
    >
      <Current {content} />
    </section>
  {/key}

  <div class="brand">{content.kicker}</div>

  <nav class="dots" aria-label="slide navigation">
    {#each slides as _, i}
      <button
        class:active={i === index}
        onclick={() => (index = i)}
        aria-label={`Go to slide ${i + 1}`}
      ></button>
    {/each}
  </nav>

  <div class="hint">
    <span class="count">{index + 1} / {slides.length}</span>
    <span class="keys">← → to navigate</span>
  </div>
</main>

<style>
  main {
    position: relative;
    height: 100vh;
    overflow: hidden;
  }

  .stage {
    position: relative;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 8vh var(--space-8) var(--space-8);
    animation: rise 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* Full-bleed hero slides own the whole viewport. */
  .stage.bleed {
    padding: 0;
  }

  /* The opener and the close float vertically centered (bookends). */
  .stage.centered-stage {
    justify-content: center;
    padding: var(--space-8);
  }

  @keyframes rise {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .brand {
    position: fixed;
    left: var(--space-8);
    bottom: var(--space-8);
    font-family: var(--font-display);
    font-size: 13px;
    letter-spacing: 0.02em;
    color: var(--muted);
    z-index: 10;
  }

  .dots {
    position: fixed;
    left: 50%;
    bottom: var(--space-8);
    transform: translateX(-50%);
    display: flex;
    gap: var(--space-3);
    z-index: 10;
  }

  .dots button {
    width: 8px;
    height: 8px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: var(--border);
    cursor: pointer;
    transition: background 0.25s, transform 0.25s;
  }

  .dots button:hover {
    background: var(--secondary);
  }

  .dots button.active {
    background: var(--accent);
    transform: scale(1.4);
  }

  .hint {
    position: fixed;
    right: var(--space-8);
    bottom: var(--space-8);
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: var(--space-1);
    font-family: var(--font-display);
    font-size: 13px;
    color: var(--muted);
    z-index: 10;
  }

  .hint .count {
    font-weight: 600;
    color: var(--secondary);
  }

  /* On full-bleed accent slides, the nav goes light to stay legible. */
  main.on-bleed .brand,
  main.on-bleed .hint {
    color: rgba(251, 246, 242, 0.7);
  }
  main.on-bleed .hint .count {
    color: rgba(251, 246, 242, 0.92);
  }
  main.on-bleed .dots button {
    background: rgba(251, 246, 242, 0.35);
  }
  main.on-bleed .dots button.active {
    background: #fbf6f2;
  }

  /* Small screens: the stage scrolls instead of clipping. Dense slides can be
     taller than the viewport — you swipe between slides, scroll within one. */
  @media (max-width: 760px) {
    /* main stays a fixed 100vh viewport and scrolls inside; the stage grows
       past it. (If main grew with its content it would never scroll.) */
    main {
      overflow-y: auto;
    }
    .stage {
      height: auto;
      min-height: 100vh;
      /* Extra bottom room so the last content clears the fixed nav dots. */
      padding: var(--space-12) var(--space-6) var(--space-18);
    }
    .stage.bleed,
    .stage.centered-stage {
      min-height: 100vh;
      height: auto;
    }
  }

  @media (max-width: 640px) {
    .hint .keys {
      display: none;
    }
    .brand {
      display: none;
    }
  }
</style>
