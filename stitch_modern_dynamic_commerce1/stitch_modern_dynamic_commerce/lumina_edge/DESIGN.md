# Design System Specification: High-End Editorial E-Commerce

## 1. Overview & Creative North Star: "The Kinetic Gallery"
The North Star for this design system is **"The Kinetic Gallery."** We are moving away from the "commodity grid" of standard e-commerce to create an environment that feels like a high-end digital flagship store. 

This system prioritizes **intentional asymmetry** and **tonal depth** over rigid containers. We treat the viewport as a canvas where high-quality imagery is the protagonist. By utilizing fluid typography and a "no-line" philosophy, we create a premium, energetic flow that guides the user through a curated story rather than a catalog.

---

## 2. Colors & Surface Philosophy
The palette is built on a foundation of sophisticated neutrals punctuated by a high-energy "Electric Blue."

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. Boundaries must be defined solely through background color shifts. Use `surface-container-low` (#eff1f2) against a `background` (#f5f6f7) to create distinction.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of fine paper and frosted glass. 
- **Layer 0 (Base):** `surface` (#f5f6f7) - The primary canvas.
- **Layer 1 (Subtle Inset):** `surface-container-low` (#eff1f2) - Used for large content blocks or section backgrounds.
- **Layer 2 (Lifted Content):** `surface-container-lowest` (#ffffff) - Used for product cards or interactive elements to create a natural "pop" against the lower tiers.

### The "Glass & Gradient" Rule
To inject visual "soul," use **Glassmorphism** for navigation bars and floating action menus. 
- **Glass Spec:** Background `surface` at 70% opacity with a `24px` backdrop-blur.
- **Signature Gradients:** For primary CTAs, use a linear gradient from `primary` (#0846ed) to `primary-container` (#859aff) at a 135-degree angle. This adds a "lithographic" depth that flat colors cannot achieve.

---

## 3. Typography: The Editorial Voice
We utilize a pairing of **Plus Jakarta Sans** for expressive moments and **Manrope** for functional clarity.

*   **Display & Headline (Plus Jakarta Sans):** These are your "hooks." Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) for hero moments. The fluid nature of these scales should feel oversized and confident.
*   **Title & Body (Manrope):** `title-lg` (1.375rem) serves as the secondary hierarchy for product names. `body-md` (0.875rem) is the workhorse for descriptions, ensuring high legibility against airy whitespace.
*   **Label (Manrope):** Use `label-md` (0.75rem) in all-caps with +0.05em tracking for category tags to provide a "technical" editorial feel.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are often a crutch for poor layout. In this system, we use **Tonal Layering**.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section. This creates a soft, sophisticated lift without visual noise.
*   **Ambient Shadows:** If a floating element (like a modal) requires a shadow, it must be "Ambient": 
    *   `box-shadow: 0 20px 40px rgba(44, 47, 48, 0.06);` (using a tinted version of `on-surface`).
*   **The "Ghost Border":** For essential accessibility in input fields, use `outline-variant` (#abadae) at **20% opacity**. Never use a 100% opaque border.

---

## 5. Components

### Buttons
- **Primary:** Gradient fill (`primary` to `primary-container`), `on-primary` text, `full` roundedness. No border.
- **Secondary:** `surface-container-highest` fill with `on-surface` text. This feels integrated, not "pasted on."
- **Tertiary/Ghost:** `on-surface` text with a subtle underline that expands on hover.

### Cards & Lists
- **The Rule:** No divider lines. Use `1.5rem` to `3rem` of vertical whitespace from the spacing scale to separate items.
- **Product Cards:** Use `surface-container-lowest` backgrounds. Imagery should have a `0.5rem` (lg) corner radius. On hover, the image should subtly scale (1.05x) while the container remains static.

### Input Fields
- **Styling:** Use `surface-container-low` as the field background. Labels (`label-md`) should sit above the field, never inside as placeholders.
- **Error State:** Use `error` (#b41340) for text and a `2px` bottom-bar only, avoiding a full red box which feels "loud" and unrefined.

### Interactive Chips
- **Filter Chips:** Use `secondary-container` (#e5e2e1) with `on-secondary-container` text. When selected, transition to `primary` (#0846ed) with a soft `surface-tint` glow.

---

## 6. Do's and Don'ts

### Do:
- **Do** use asymmetrical margins. A product description might be offset by 15% from the left to create a "magazine" layout feel.
- **Do** use high-quality lifestyle photography with a consistent color grade that complements the `secondary` (#5c5b5b) tones.
- **Do** implement "Staggered Entry" animations. Elements should fade and slide up with a `cubic-bezier(0.22, 1, 0.36, 1)` easing.

### Don't:
- **Don't** use pure black (#000000) for text. Always use `on-background` (#2c2f30) to maintain a premium, soft-touch look.
- **Don't** use standard 1px dividers. If you feel the need for a line, increase your whitespace by 24px instead.
- **Don't** use sharp corners. Every interactive element must use at least the `md` (0.375rem) roundedness to maintain the "Modern & Dynamic" energy.

---

## 7. Motion & Interaction
Movement is the "Dynamic" part of our system. 
- **Micro-interactions:** When a user hovers over a primary CTA, the gradient should subtly shift its angle.
- **Page Transitions:** Use a "Surface Slide"—where the new page `surface` appears to slide over the previous one like a fresh sheet of paper.