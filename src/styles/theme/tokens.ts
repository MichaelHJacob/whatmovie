export const componentTokens = {
  background: {
    "nav-black": "var(--color-bg-nav-black)",
    "nav-black-expanded": "var(--color-bg-nav-black-expanded)",
    navigationBtn: "var(--color-bg-inverted-soft)",
    "navigationBtn-hover": "var(--color-bg-inverted-soft-hover)",
    "navigationBtn-black": "var(--color-bg-black-soft)",
    "navigationBtn-black-hover": "var(--color-bg-black-soft-hover)",
  },
  foreground: {
    nav: "var(--color-fg-nav)",
    "nav-hover": "var(--color-fg-nav-hover)",
    "nav-white": "var(--color-fg-nav-white)",
    "nav-white-hover": "var(--color-fg-nav-white-hover)",
    navigationIcon: "var(--color-fg-base-subtle)",
    "navigationIcon-hover": "var(--color-fg-base-subtle-hover)",
    "navigationIcon-black": "var(--color-fg-white-subtle)",
    "navigationIcon-black-hover": "var(--color-fg-white-hover)",
  },
};

export const surface = {
  background: {
    body: "var(--color-bg-body)",
    base: "var(--color-bg-base)",
    raised: "var(--color-bg-raised)",
    overlay: "var(--color-bg-overlay)",
    scrim: "var(--color-bg-scrim)",
    floating: "var(--color-bg-floating)",
    "floating-expanded": "var(--color-bg-floating-expanded)",
  },
  border: {
    focus: "var(--color-border-focus)",
  },
};
export const blackWhite = {
  background: {
    // Base role
    "base-ghost": "var(--color-bg-base-ghost)",
    "base-dimmed": "var(--color-bg-base-dimmed)",
    "base-minimal": "var(--color-bg-base-minimal)",
    "base-subtle": "var(--color-bg-base-subtle)",
    "base-medium": "var(--color-bg-base-medium)",
    "base-accent": "var(--color-bg-base-accent)",
    "base-accent-hover": "var(--color-bg-base-accent-hover)",
    // Inverted role
    "inverted-ghost": "var(--color-bg-inverted-ghost)",
    "inverted-dimmed": "var(--color-bg-inverted-dimmed)",
    "inverted-minimal": "var(--color-bg-inverted-minimal)",
    "inverted-subtle": "var(--color-bg-inverted-subtle)",
    "inverted-medium": "var(--color-bg-inverted-medium)",
    "inverted-soft": "var(--color-bg-inverted-soft)",
    "inverted-soft-hover": "var(--color-bg-inverted-soft-hover)",
    "inverted-accent": "var(--color-bg-inverted-accent)",
    "inverted-accent-hover": "var(--color-bg-inverted-accent-hover)",
    // Static Black
    "black-ghost": "var(--color-bg-black-ghost)",
    "black-dimmed": "var(--color-bg-black-dimmed)",
    "black-minimal": "var(--color-bg-black-minimal)",
    "black-subtle": "var(--color-bg-black-subtle)",
    "black-medium": "var(--color-bg-black-medium)",
    "black-soft": "var(--color-bg-black-soft)",
    "black-soft-hover": "var(--color-bg-black-soft-hover)",
    "black-accent": "var(--color-bg-black-accent)",
    // Static White
    "white-subtle": "var(--color-bg-white-subtle)",
    "white-strong": "var(--color-bg-white-strong)",
    "white-intense": "var(--color-bg-white-intense)",
    "white-intense-hover": "var(--color-bg-white-intense-hover)",
    "white-accent": "var(--color-bg-white-accent)",
    "white-rich": "var(--color-bg-white-rich)",
  },
  border: {
    "base-ghost": "var(--color-border-base-ghost)",
    "base-dimmed": "var(--color-border-base-dimmed)",
    "base-minimal": "var(--color-border-base-minimal)",
    "base-accent": "var(--color-border-base-accent)",
    "white-minimal": "var(--color-border-white-minimal)",
  },
  foreground: {
    //  title, labels or text
    "base-accent": "var(--color-fg-base-accent)",
    // H2 title for main sections or list on the page.
    "base-strong": "var(--color-fg-base-strong)",
    "base-medium": "var(--color-fg-base-medium)",
    // secondary labels or text
    "base-subtle": "var(--color-fg-base-subtle)",
    // typically used for displaying disabled states or tertiary text
    "base-dimmed": "var(--color-fg-base-dimmed)",
    // Part of a large heading that can be significantly muted for contrast.
    "base-minimal": "var(--color-fg-base-minimal)",
    // Title from a large text or articles
    "base-heading": "var(--color-fg-base-heading)",
    // body text in prose or articles
    "base-body": "var(--color-fg-base-body)",
    // Inverted Role
    "inverted-accent": "var(--color-fg-inverted-accent)",
    "inverted-strong": "var(--color-fg-inverted-strong)",
    "inverted-medium": "var(--color-fg-inverted-medium)",
    "inverted-subtle": "var(--color-fg-inverted-subtle)",
    "inverted-minimal": "var(--color-fg-inverted-minimal)",
    "inverted-dimmed": "var(--color-fg-inverted-dimmed)",
    "inverted-heading": "var(--color-fg-inverted-heading)",
    "inverted-body": "var(--color-fg-inverted-body)",
    // Static Role
    "black-accent": "var(--color-fg-black-accent)",
    "black-strong": "var(--color-fg-black-strong)",
    "white-accent": "var(--color-fg-white-accent)",
    "white-strong": "var(--color-fg-white-strong)",
    "white-medium": "var( --color-fg-white-medium)",
    "white-subtle": "var(--color-fg-white-subtle)",
    "white-minimal": "var(--color-fg-white-minimal)",
    "white-heading": "var(--color-fg-white-heading)",
    "white-body": "var(--color-fg-white-body)",
    "white-hover": "var(--color-fg-white-hover)",
  },
};
export const inputLink = {
  background: {
    // Input role
    input: "var(--color-bg-input)",
    "input-focus": "var(--color-bg-input-focus)",
    "input-on": "var(--color-bg-input-on)",
    "input-off": "var(--color-bg-input-off)",
    "input-disabled": "var(--color-bg-input-disabled)",
    //static
    "black-input": "var(--color-bg-black-input)",
    //
  },
  foreground: {
    // Input
    placeholder: "var(--color-fg-placeholder)",
    "black-placeholder": "var(--color-fg-black-placeholder)",
    // Link default
    // Links in the middle of text paragraphs (inline) with Contrasting color (blue) to be identified immediately without the user having to hover
    link: "var(--color-fg-link)",
    "link-hover": "var(--color-fg-link-hover)",
    // Link primary
    "link-primary": "var(--color-fg-link-primary)",
    "link-primary-hover": "var(--color-fg-link-primary-hover)",
    // Link neutral
    // Navigation menus, card titles, list items, breadcrumbs. The user understands that they are clickable by the context.
    // It has the same color as the main text or is black (ex: base/black in Light Mode). It often only reveals that it is a link through underline or in the hover state.
    "link-neutral": "var(--color-fg-link-neutral)",
    "link-neutral-hover": "var(--color-fg-link-neutral-hover)",
    // Footers, links, publication date in an article, or metadata that lead to categories.
    "link-neutral-subtle": "var(--color-fg-link-neutral-subtle)",
    "link-neutral-subtle-hover": "var(--color-fg-link-neutral-subtle-hover)",
  },
  border: {
    "input-focus": "var(--color-border-input-focus)",
    input: "var(--color-border-input)",
    "black-input": "var(--color-border-black-input)",
  },
};
export const primaryNeutralStates = {
  background: {
    // Neutral role
    "neutral-dimmed": "var(--color-bg-neutral-dimmed)",
    "neutral-minimal": "var(--color-bg-neutral-minimal)",
    "neutral-subtle": "var(--color-bg-neutral-subtle)",
    "neutral-medium": "var(--color-bg-neutral-medium)",
    "neutral-accent": "var(--color-bg-neutral-accent)",
    // Primary, Negative and Notice role
    "primary-minimal": "var(--color-bg-primary-minimal)",
    "primary-accent": "var(--color-bg-primary-accent)",
    "primary-accent-hover": "var(--color-bg-primary-accent-hover)",
    "negative-minimal": "var(--color-bg-negative-minimal)",
    "negative-accent": "var(--color-bg-negative-accent)",
    "negative-accent-hover": "var(--color-bg-negative-accent-hover)",
    "notice-minimal": "var(--color-bg-notice-minimal)",
    "notice-accent": "var(--color-bg-notice-accent)",
    "notice-accent-hover": "var(--color-bg-notice-accent-hover)",
  },
  border: {
    "primary-minimal": "var(--color-border-primary-minimal)",
    "primary-accent": "var(--color-border-primary-accent)",
    "negative-minimal": "var(--color-border-negative-minimal)",
    "negative-accent": "var(--color-border-negative-accent)",
    "notice-minimal": "var(--color-border-notice-minimal)",
    "notice-accent": "var(--color-border-notice-accent)",
  },
  foreground: {
    // Neutral role
    "neutral-accent": "var(--color-fg-neutral-accent)",
    "neutral-strong-hover": "var(--color-fg-neutral-strong-hover)",
    "neutral-strong": "var(--color-fg-neutral-strong)",
    "neutral-subtle": "var(--color-fg-neutral-subtle)",
    "neutral-minimal": "var(--color-fg-neutral-minimal)",
    "neutral-dimmed": "var(--color-fg-neutral-dimmed)",
    "neutral-heading": "var(--color-fg-neutral-heading)",
    "neutral-body": "var(--color-fg-neutral-body)",
    // Primary, Negative and Notice role
    "primary-accent": "var(--color-fg-primary-accent)",
    "negative-accent": "var(--color-fg-negative-accent)",
    "notice-accent": "var(--color-fg-notice-accent)",
  },
};
