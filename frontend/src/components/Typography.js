import React from "react";

// ---- style variants for reuse ----
const baseStyles = {
  heroTitle:
    "font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight",
  sectionTitle:
    "font-heading font-semibold text-2xl sm:text-3xl leading-snug tracking-tight",
  subTitle:
    "font-body font-semibold text-base sm:text-lg tracking-[0.03em] uppercase",
  body: "font-body text-base leading-relaxed",
  bodySm: "font-body text-sm leading-relaxed opacity-80",
  button:
    "font-body text-sm font-semibold uppercase tracking-[0.12em]",
  nav: "font-body text-sm font-medium tracking-[0.16em] uppercase",
};

// ---- helper to auto choose HTML tag ----
function defaultTagForVariant(variant) {
  switch (variant) {
    case "heroTitle":
      return "h1";
    case "sectionTitle":
      return "h2";
    case "subTitle":
      return "h3";
    case "body":
    case "bodySm":
      return "p";
    case "button":
    case "nav":
      return "span";
    default:
      return "p";
  }
}

// ---- main Typography component ----
export function Typography({
  as,
  variant,
  children,
  className = "",
  ...rest
}) {
  const Component = as || defaultTagForVariant(variant);
  const classes = `${baseStyles[variant] || ""} ${className}`.trim();

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}
