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
    title: 'Producers write. One surface reads.',
    body:
      'Each app is an independent producer that writes artifacts to disk. turph is the single consumer — it only reads, over one symmetric API contract. No producer knows another exists.',
    producers: [
      { name: 'News', note: 'Gmail digest', status: 'live' },
      { name: 'Portfolio', note: 'Fidelity look-through', status: 'live' },
      { name: 'Insurance', note: 'policy reviews', status: 'live' },
      { name: 'Witness', note: 'medication journey', status: 'live' },
      { name: 'Utilities', note: 'household spend', status: 'live' },
      { name: 'ReLo', note: 'relocation', status: 'building' },
      { name: 'Designs', note: 'portfolio', status: 'planned' },
      { name: 'Retire', note: 'planning', status: 'planned' },
    ],
    contract: 'GET /api/<project>/recent · /<id>',
    surface: 'turph — one tabbed surface · tailnet-only · on your phone',
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
