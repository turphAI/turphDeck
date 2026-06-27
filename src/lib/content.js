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

  proof: [
    { stat: 'LIVE', label: 'on one Mac mini, under launchd' },
    { stat: 'tailnet', label: 'the only boundary — no app-layer auth' },
    { stat: 'no cloud', label: 'no SaaS, no subscription, all mine' },
  ],

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
    title: 'A layer of agents keeps it current.',
    body:
      'Across all the apps sits a thin ops layer. Its agents sense the system and assess what changed — but the human stays in the decide seat.',
    flow: ['sense', 'assess', 'decide'],
    decideNote: 'Human in the decide seat — no auto-change.',
    agents: [
      { name: 'Navigator', note: 'fills the focus queue — next best work', status: 'live' },
      { name: 'Foundation management', note: 'senses model / hardware / economic drift', status: 'live' },
      { name: 'Freshness & quality sweeps', note: 'keeps the suite honest with itself', status: 'live' },
      { name: 'Document concierge', note: 'intake · classify · route', status: 'planned' },
    ],
  },

  payoff: {
    title: 'And you can watch it breathe.',
    body:
      "You've seen the architecture. Here it is alive — every run, every signal, rendered as a living field.",
    label: 'turphViz — live signal field',
  },
}
