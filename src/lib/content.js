// The single small content source. Adding the next chapter of the journey is an
// edit here, not a slide redesign — "current by design" (journal 018).
//
// status: 'live' | 'building' | 'planned' — drives the visual live-vs-planned
// distinction the deck treats as a hard rule.

export const content = {
  kicker: 'turph — a personal software suite',

  opener: {
    problem:
      'A household runs on a pile of real problems — money, health, insurance, a constant flood of information.',
    craft: 'I am designing and shipping the software to actually handle mine.',
  },

  architecture: {
    // Headline flipped to match the top-down hierarchy: consumer first, then producers.
    title: 'One surface reads. Producers write.',
    consumer: {
      name: 'turph',
      note: 'one tabbed surface · tailnet-only · on your phone',
    },
    contract: 'GET /api/<project>/recent · /<id>',
    contractNote: 'one symmetric contract — no producer knows another exists',
    // Producers bucketed by domain. Our own categories — chosen to fit the apps
    // and rhyme with the opener, not match it exactly. Fuzzy on purpose.
    categories: [
      {
        problem: 'Finance',
        apps: [
          { name: 'Portfolio', note: 'Fidelity look-through', status: 'live' },
          { name: 'Utilities', note: 'household spend', status: 'live' },
          { name: 'Insurance', note: 'auto & home policies', status: 'live' },
        ],
      },
      {
        problem: 'Health',
        apps: [{ name: 'Witness', note: 'medication journey', status: 'live' }],
      },
      {
        problem: 'Retirement',
        apps: [
          { name: 'Retire', note: 'planning', status: 'planned' },
          { name: 'ReLo', note: 'relocation', status: 'building' },
        ],
      },
      {
        problem: 'Information',
        apps: [{ name: 'News', note: 'daily digest', status: 'live' }],
      },
      {
        problem: 'Design',
        apps: [{ name: 'Designs', note: 'creative portfolio', status: 'planned' }],
      },
    ],
  },

  ops: {
    title: 'A layer of agents keeps the suite current.',
    layerLabel: 'the ops layer',
    // The layer runs four phases. Each phase names the agent that does its
    // work, so the agent ↔ phase link is explicit. Consume is its own phase:
    // proving the ecosystem with data — manual and outside calls — is real work.
    phases: [
      {
        name: 'Sense',
        blurb: 'Watch the substrate move',
        agents: [{ name: 'Foundation', note: 'model · hardware · economics', status: 'live' }],
      },
      {
        name: 'Consume',
        blurb: 'Pull the world in',
        agents: [{ name: 'Concierge', note: 'intake · classify · route', status: 'planned' }],
      },
      {
        name: 'Assess',
        blurb: 'Judge what changed',
        agents: [
          { name: 'Sweeper', note: 'freshness · quality · health', status: 'live' },
          { name: 'Navigator', note: 'next-best-work', status: 'live' },
        ],
      },
      {
        name: 'Decide',
        blurb: 'The human acts',
        human: true,
        agents: [],
      },
    ],
    decideNote: 'Agents sense, consume, and assess — the human alone decides. No auto-change.',
  },

  foundation: {
    // The substrate reveal. One thesis — "private by construction" — with the
    // stack as its evidence. Absorbs the proof strip pulled off the opener.
    title: 'It all runs on one Mac mini.',
    lead: 'Private by construction — not a feature bolted on, the architecture itself.',
    pillars: [
      { fact: 'One mini I own', consequence: 'no third-party custody of anything' },
      { fact: 'Tailnet is the only door', consequence: 'no app-layer auth to get wrong' },
      { fact: 'Local LLM, cloud only as fallback', consequence: 'data stays put for the routine work' },
      { fact: 'No cloud, no SaaS, no subscription', consequence: 'nothing to breach off-premises' },
    ],
  },

  decisions: {
    title: 'Decisions I refused to make.',
    lead: 'The discipline is the design — what I left out, on purpose.',
    refusals: [
      {
        what: 'No SvelteKit, FastAPI, Tailwind, shadcn',
        why: 'plain Vite · Svelte · Flask · CSS — the framework weight buys nothing here',
      },
      {
        what: 'No accounts, multi-user, or sharing',
        why: "it's a household consumer — complexity I'd never use",
      },
      {
        what: 'No real-time, polling, or push',
        why: "pull on open — engineering for a problem I don't have",
      },
      {
        what: 'No producer logic in the consumer',
        why: "the fix lives where the data lives — a decoupling I won't break",
      },
    ],
  },

  payoff: {
    title: 'And you can watch it breathe.',
    body:
      "You've seen the architecture. Here it is alive — every run, every signal, rendered as a living field.",
    label: 'turphViz — live signal field',
  },
}
