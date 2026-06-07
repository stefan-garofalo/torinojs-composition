const skillActivationInstructions = [
  "Before planning or editing, read every file in `guidanceFiles` for this role.",
  "In those scoped AGENTS.md files, find the `Primary skills here` list and treat each named skill as mandatory for matching work.",
  "Activate a skill by opening its SKILL.md, reading only the workflow/checklist needed for the assigned task, and applying it before edits.",
  "If the task touches multiple owned or related scopes, inspect each scope's nearest AGENTS.md and activate the union of relevant skills.",
];

const reviewActivationInstructions = [
  ...skillActivationInstructions,
  "Stay read-only unless the parent explicitly asks for fixes.",
  "Lead with findings, sorted by severity, with precise file/line references.",
  "Use `simplify` to evaluate whether recently changed code can be clearer, smaller, or less stateful.",
  "Use `improve-codebase-architecture` only when concrete coupling, testability friction, or AI-navigation problems are visible in the repo.",
];

const capabilityPacks = {
  "presentation-core": {
    description:
      "Remotion React/TypeScript presentation implementation, playback behavior, code animation, and local preview work.",
    skills: [
      "agent-browser",
      "async-react-patterns",
      "design-taste-frontend",
      "frontend-domain-structure",
      "quality-types",
      "vercel-composition-patterns",
      "vercel-react-best-practices",
      "tdd",
      "simplify",
    ],
  },
  "docs-core": {
    description:
      "Wiki and project documentation maintenance grounded in the actual presentation requirements and implementation.",
    skills: ["create-spec", "create-plan", "implement-spec", "write-backlog", "simplify"],
  },
  "review-core": {
    description:
      "Cross-cutting review, simplification, and architecture-friction analysis for changed code.",
    skills: ["autoreview", "simplify", "improve-codebase-architecture"],
  },
};

const agents = [
  {
    name: "presentation-app",
    description:
      "Use for Remotion presentation work in `remotion-presentation/`, including React components, TypeScript, animation timing, keyboard/playback behavior, visual polish, and browser verification.",
    ownedPaths: ["remotion-presentation/**"],
    guidanceFiles: ["AGENTS.md"],
    activationInstructions: skillActivationInstructions,
    packs: ["presentation-core"],
    skills: [
      "agent-browser",
      "async-react-patterns",
      "design-taste-frontend",
      "frontend-domain-structure",
      "quality-types",
      "vercel-composition-patterns",
      "vercel-react-best-practices",
      "tdd",
      "simplify",
    ],
    boundaries: [
      "Own the presentation app and nearby tests/config only.",
      "Keep UI/animation decisions grounded in the existing deck requirements and Remotion runtime constraints.",
      "If the task is only wiki/spec/backlog shaping, tell the parent to use wiki-docs instead.",
    ],
  },
  {
    name: "wiki-docs",
    description:
      "Use for wiki content, requirements, specs, plans, and backlog-shaped project documentation.",
    ownedPaths: ["wiki/**", "deck-beats.md", "slides-content.md", "fragments.md"],
    guidanceFiles: ["AGENTS.md", "wiki/AGENTS.md"],
    activationInstructions: skillActivationInstructions,
    packs: ["docs-core"],
    skills: ["create-spec", "create-plan", "implement-spec", "write-backlog", "simplify"],
    boundaries: [
      "Own documentation and planning artifacts; do not change the Remotion app unless explicitly assigned.",
      "Preserve human-authored slide copy unless the task asks to revise it.",
      "Keep wiki route/frontmatter rules aligned with `wiki/AGENTS.md`.",
    ],
  },
  {
    name: "code-review",
    description:
      "Use for read-only review across the repo, especially behavioral regressions, missing tests, simplification, and architecture friction.",
    ownedPaths: ["**/*"],
    guidanceFiles: ["AGENTS.md"],
    activationInstructions: reviewActivationInstructions,
    packs: ["review-core"],
    skills: ["autoreview", "simplify", "improve-codebase-architecture"],
    boundaries: [
      "Review first: identify concrete defects, behavioral risks, missing tests, and simplification opportunities before summarizing.",
      "Do not edit files unless the parent explicitly assigns implementation after the review.",
      "Keep architecture notes grounded in observed code friction.",
    ],
  },
];

export { agents, capabilityPacks };
