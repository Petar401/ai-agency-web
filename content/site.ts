/**
 * Single source of truth for all visible copy.
 * Items tagged [placeholder] / [example] are explicitly safe-to-replace.
 */

export const site = {
  brand: {
    name: 'NorfolkAI',
    tagline: 'AI Automation Agency · Norwich',
    domain: 'norfolkai.co.uk',
    url: 'https://norfolkai.co.uk',
    email: 'hello@norfolkai.co.uk',
    phone: '+44 1603 000 000',
    address: {
      street: 'St Andrews Plain',
      locality: 'Norwich',
      region: 'Norfolk',
      postcode: 'NR3 1AU',
      country: 'GB',
    },
  },

  nav: [
    { label: 'Services', href: '#services' },
    { label: 'For Enterprise', href: '#enterprise' },
    { label: 'Process', href: '#process' },
    { label: 'Work', href: '#work' },
    { label: 'FAQ', href: '#faq' },
  ],

  hero: {
    eyebrow: 'Norwich · AI Automation Agency',
    title: ["AI systems that run", 'the work you don’t have time for.'] as const,
    description:
      'NorfolkAI builds production AI agents and automations for Norwich SMEs — and private internal AI for larger teams. Lead generation, onboarding, marketing and operations, handled.',
    primaryCta: { label: 'Book a free automation audit', href: '#contact' },
    secondaryCta: { label: 'See what we build', href: '#services' },
    trust: ['Asterisk', 'Cooks', 'Opal', 'Dune', 'Oasis'],
  },

  services: [
    {
      id: 'automation-systems',
      title: 'AI Automation Systems',
      blurb: 'End-to-end workflow automation across the tools you already use — no rip-and-replace.',
      bullets: ['Cross-tool orchestration', 'Realtime triggers', 'Human-in-the-loop where it matters'],
    },
    {
      id: 'ai-agents',
      title: 'AI Agents (Sales · Support · Ops)',
      blurb: '24/7 agents that qualify leads, reply to customers and route work — with full audit trails.',
      bullets: ['ICP-aware outreach', 'Reply detection & handover', 'Tone & policy guardrails'],
    },
    {
      id: 'crm-lead-workflow',
      title: 'CRM & Lead Workflow',
      blurb: 'HubSpot, Salesforce or Pipedrive automations + enrichment to keep your pipeline clean.',
      bullets: ['Auto-enrichment', 'Stage hygiene & alerts', 'Reporting that actually ships'],
    },
    {
      id: 'internal-knowledge-assistant',
      title: 'Internal Knowledge Assistant',
      blurb: 'A private AI trained on your SOPs, wiki and drives — answers, drafts and runs reports.',
      bullets: ['Private deployment', 'Role-based access', 'Audit log of every answer'],
    },
    {
      id: 'document-automation',
      title: 'Document & Admin Automation',
      blurb: 'Proposals, contracts, invoicing and intake — generated, signed, filed, on autopilot.',
      bullets: ['e-Sign + payment in one flow', 'Branded document templates', 'Auto-filing & retrieval'],
    },
    {
      id: 'custom-ai',
      title: 'Custom AI Integrations',
      blurb: 'Bespoke builds against your APIs, data warehouse and product — when off-the-shelf isn’t enough.',
      bullets: ['Your stack, your data', 'Evals + monitoring', 'Owned by you, not us'],
    },
  ],

  industries: [
    { id: 'professional-services', title: 'Professional Services', blurb: 'Accountants, agencies and consultancies: kill admin, scale advisory.' },
    { id: 'trades-field', title: 'Trades & Field Services', blurb: 'Quotes, scheduling and customer comms — quietly automated.' },
    { id: 'ecommerce', title: 'Ecommerce', blurb: 'CX agents, returns automation and merchandising assistants.' },
    { id: 'healthcare-admin', title: 'Healthcare Admin', blurb: 'Intake, triage routing and document workflows — UK GDPR-aware.' },
    { id: 'property', title: 'Property', blurb: 'Lettings, viewings and pipeline workflows that don’t drop the ball.' },
    { id: 'hospitality', title: 'Hospitality', blurb: 'Bookings, guest comms and feedback loops on autopilot.' },
  ],

  process: [
    {
      step: '01',
      title: 'Audit',
      copy: 'A 30-minute call to map workflows and find the highest-ROI things to automate first.',
    },
    {
      step: '02',
      title: 'Strategy',
      copy: 'A written plan with scope, costs and a guaranteed go-live date — no jargon.',
    },
    {
      step: '03',
      title: 'Build',
      copy: 'We build the agents and automations against your tools, data and brand voice.',
    },
    {
      step: '04',
      title: 'Integrate',
      copy: 'Connect to your CRM, comms and stack with role-based access and full audit trails.',
    },
    {
      step: '05',
      title: 'Optimise',
      copy: 'Monthly reviews so the systems keep getting smarter — not just a one-off project.',
    },
  ],

  caseStudies: [
    {
      id: 'cs-services',
      tag: '[example] Professional services · Norwich',
      problem: 'Two part-time staff buried in lead admin and proposal docs.',
      solution: 'Lead Gen Agent + Document Automation tied to HubSpot.',
      outcome: 'Bookings 2.1× in 60 days. Admin time down 73%.',
      metric: { label: 'Bookings', value: '2.1×' },
    },
    {
      id: 'cs-trades',
      tag: '[example] Field services · Norfolk',
      problem: 'Manual quoting and scheduling losing jobs to faster competitors.',
      solution: 'AI quoting agent connected to job-management software + customer SMS flow.',
      outcome: 'Quote turnaround under 6 minutes. 31% higher conversion.',
      metric: { label: 'Quote time', value: '< 6 min' },
    },
    {
      id: 'cs-enterprise',
      tag: '[example] 120-person services firm',
      problem: 'Staff repeatedly asking the same SOP questions across Slack and email.',
      solution: 'Private Internal Knowledge Assistant on Slack + Google Drive + Notion.',
      outcome: 'Reduced internal Q&A by 64%. ~38h/week saved across the team.',
      metric: { label: 'Time saved', value: '38h/week' },
    },
  ],

  testimonials: [
    {
      id: 't-1',
      tag: '[placeholder]',
      quote:
        'We replaced two part-time roles with one Lead Gen Agent and a Marketing Agent. Bookings doubled in our second month and the team finally stopped chasing admin.',
      author: 'Holly Reeve',
      role: 'MD, a Norwich-based services firm',
    },
    {
      id: 't-2',
      tag: '[placeholder]',
      quote:
        'NorfolkAI didn’t just hand us a tool. They built it into the way we already work — and stayed around to make it better.',
      author: 'James Holloway',
      role: 'COO, professional services',
    },
    {
      id: 't-3',
      tag: '[placeholder]',
      quote:
        'The internal AI has changed how the team operates. New staff onboard faster and senior people stop being pulled into the same questions.',
      author: 'Priya Shah',
      role: 'People Director, ~120-person firm',
    },
  ],

  faq: [
    {
      q: 'How long does a typical project take?',
      a: 'Most engagements go live within 14 to 28 days. The free audit gives you a hard date before you commit to anything.',
    },
    {
      q: 'How do you price?',
      a: 'A fixed build fee (scope-locked) plus an optional monthly optimisation retainer. No vague hourly billing, no surprises.',
    },
    {
      q: 'Where does our data go?',
      a: 'You choose. We support private deployments where data never leaves your tenant, plus regional UK/EU hosting for hosted setups. We design for UK GDPR by default.',
    },
    {
      q: 'Can the AI run on-prem or in our cloud?',
      a: 'Yes — for larger clients we deploy into your AWS, Azure or GCP, or on private infrastructure. Models can be cloud-hosted or self-hosted depending on your data class.',
    },
    {
      q: 'Which tools do you integrate with?',
      a: 'HubSpot, Salesforce, Pipedrive, Notion, Slack, Microsoft 365, Google Workspace, Stripe, Xero/Quickbooks, plus REST/GraphQL APIs and SQL warehouses.',
    },
    {
      q: 'What happens after launch?',
      a: 'Monthly optimisation reviews, monitoring with eval suites, and a clear escalation path. We treat agents as living systems, not "ship and forget" projects.',
    },
    {
      q: 'Who owns the IP?',
      a: 'You do. Code, prompts, evals and integrations are all yours. We keep no lock-in.',
    },
    {
      q: 'Why Norwich?',
      a: 'We’re Norwich-based and serve Norfolk SMEs in person. We also work UK-wide and remotely with larger teams elsewhere.',
    },
  ],

  cta: {
    eyebrow: 'Ready when you are',
    title: 'Book a free automation audit.',
    description:
      '30 minutes. No slides, no sales pitch. You leave with a clear plan of what to automate first — even if you never work with us.',
    submitLabel: 'Book my free audit',
    successMessage:
      'Thanks — your audit request is in. We’ll reply within one working day.',
  },

  footer: {
    tagline:
      'AI Automation Agency · Norwich, NR3. Building agents for small businesses & internal AI for larger teams.',
    columns: [
      {
        heading: 'Services',
        links: [
          { label: 'AI Automation Systems', href: '#services' },
          { label: 'AI Agents', href: '#services' },
          { label: 'CRM & Lead Workflow', href: '#services' },
          { label: 'Internal Knowledge Assistant', href: '#services' },
          { label: 'Document Automation', href: '#services' },
          { label: 'Custom AI Integrations', href: '#services' },
        ],
      },
      {
        heading: 'Company',
        links: [
          { label: 'Process', href: '#process' },
          { label: 'For Enterprise', href: '#enterprise' },
          { label: 'Work', href: '#work' },
          { label: 'FAQ', href: '#faq' },
          { label: 'Book audit', href: '#contact' },
        ],
      },
      {
        heading: 'Legal',
        links: [
          { label: 'Privacy', href: '/privacy' },
          { label: 'Terms', href: '/terms' },
        ],
      },
    ],
  },
} as const;

export type Site = typeof site;
