<script>
  import { content } from './lib/content.js'
  import Opener from './lib/slides/Opener.svelte'
  import Architecture from './lib/slides/Architecture.svelte'
  import OpsLayer from './lib/slides/OpsLayer.svelte'
  import Foundation from './lib/slides/Foundation.svelte'
  import Decisions from './lib/slides/Decisions.svelte'
  import Payoff from './lib/slides/Payoff.svelte'

  const slides = [Opener, Architecture, OpsLayer, Foundation, Decisions, Payoff]
  let index = $state(0)
  const Current = $derived(slides[index])

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

<main>
  {#key index}
    <section class="stage" class:opener-stage={index === 0}>
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
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 8vh var(--space-8) var(--space-8);
    animation: rise 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* The opener is the one slide that floats vertically centered. */
  .stage.opener-stage {
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

  @media (max-width: 640px) {
    .stage {
      padding: var(--space-12) var(--space-6);
    }
    .hint .keys {
      display: none;
    }
    .brand {
      display: none;
    }
  }
</style>
