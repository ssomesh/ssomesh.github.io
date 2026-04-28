# Website Structure & Development Guide

## ssomesh.github.io — Complete Documentation

This document explains every element of the personal academic website hosted at
[ssomesh.github.io](https://ssomesh.github.io), from the ground up. It is
written so that a person with **zero** web-development experience can read it
front-to-back and understand how the site works, and so that an expert can use
it as a quick, accurate reference.

---

## Table of Contents

1. [How a Web Page Works — The 30-Second Version](#1-how-a-web-page-works)
2. [Directory Layout](#2-directory-layout)
3. [HTML — The Skeleton](#3-html--the-skeleton)
4. [CSS — The Skin](#4-css--the-skin)
5. [JavaScript — The Muscles](#5-javascript--the-muscles)
6. [Bootstrap 3 — The Framework](#6-bootstrap-3--the-framework)
7. [Page-by-Page Breakdown](#7-page-by-page-breakdown)
8. [The Navigation Bar](#8-the-navigation-bar)
9. [The Dark / Light Mode Toggle](#9-the-dark--light-mode-toggle)
10. [The Page-Shift Fix](#10-the-page-shift-fix)
11. [How to Edit Content](#11-how-to-edit-content)
12. [Common Pitfalls & Troubleshooting](#12-common-pitfalls--troubleshooting)
13. [Glossary](#13-glossary)

---

## 1. How a Web Page Works

Every web page is built from three technologies that do different jobs:

| Technology | Analogy | What it does |
|------------|---------|-------------|
| **HTML** (HyperText Markup Language) | The skeleton / bones | Defines the *structure* and *content*: headings, paragraphs, links, images, lists. |
| **CSS** (Cascading Style Sheets) | The skin / clothing | Controls *appearance*: colors, fonts, spacing, layout, borders. |
| **JavaScript** (JS) | The muscles / brain | Adds *behaviour*: responding to clicks, remembering preferences, showing/hiding things. |

When a browser loads a page it:

1. Reads the **HTML** to build a tree of elements (the *DOM* — Document Object
   Model).
2. Reads the **CSS** to decide how each element looks.
3. Runs any **JavaScript** to wire up interactive behaviour.

The browser then *paints* pixels on screen.

---

## 2. Directory Layout

```
ssomesh.github.io/
│
├── index.html              ← Home page ("about me")
├── research.html           ← Publications, patents, projects
├── mentor.html             ← Mentoring: M.Tech project, interns
├── misc.html               ← Accomplishments, service, talks
├── phddissertation.html    ← PhD dissertation abstract & tag cloud
├── academics.html          ← Coursework & TA (older page, not in nav)
├── index_bk.html           ← Backup of an older index.html (unused)
├── README.md               ← GitHub repository readme
│
├── css/                    ← All stylesheets
│   ├── normalize.css       ← CSS reset (makes browsers consistent)
│   ├── bootstrap.min.css   ← Bootstrap 3 framework (minified)
│   ├── bootstrap.css       ← Bootstrap 3 framework (readable)
│   ├── mystylesheet.css    ← Custom styles (navbar color, fonts, etc.)
│   ├── darkmode.css        ← Dark/light mode + layout fixes
│   ├── academicons.css     ← Academic icon font (DBLP, Google Scholar)
│   ├── academicons.min.css ← Same, minified
│   └── style_sheet.css     ← Unused legacy stylesheet
│
├── js/                     ← All JavaScript files
│   ├── jquery.js           ← jQuery 1.11.1 (Bootstrap dependency)
│   ├── bootstrap.min.js    ← Bootstrap 3 JS (minified)
│   ├── bootstrap.js        ← Bootstrap 3 JS (readable)
│   └── darkmode.js         ← Dark/light mode toggle logic
│
├── img/                    ← Images (photo, icons, tag cloud, etc.)
│
├── docs/                   ← Downloadable documents
│   ├── papers/             ← Publication PDFs
│   ├── patents/            ← Patent PDFs
│   ├── slides/             ← Presentation slides
│   ├── thesis/             ← PhD thesis PDF
│   ├── certificates/       ← Award / reviewer certificates
│   ├── code/               ← Code archives from interns
│   └── cv/                 ← Curriculum vitae
│
└── startbootstrap-bare-gh-pages/  ← Original Bootstrap bare template
    ├── index.html
    ├── css/
    ├── js/
    └── fonts/
```

### Why this layout matters

* **All pages live at the root** so links like `href="research.html"` resolve
  correctly without any path prefix.
* **CSS and JS are in their own folders**, loaded by every page via `<link>`
  and `<script>` tags.
* **The `docs/` folder** holds downloadable assets. Links point there with
  `href="docs/papers/tpds25.pdf"`.

---

## 3. HTML — The Skeleton

### 3.1 Document boilerplate

Every HTML page should begin with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Somesh Singh</title>
    <!-- CSS links go here -->
    <!-- Anti-flash script (before </head>) -->
    <script>
      if(localStorage.getItem('theme')==='dark'){
        document.documentElement.classList.add('dark-mode');
      }
    </script>
</head>
<body>
    <script>if(localStorage.getItem('theme')==='dark')document.body.classList.add('dark-mode');</script>
    <!-- Visible content goes here -->
    <!-- JS scripts go here, just before </body> -->
</body>
</html>
```

| Line | Purpose |
|------|---------|
| `<!DOCTYPE html>` | Tells the browser this is an HTML5 document. Without it the browser may enter "quirks mode" and render things incorrectly. |
| `<html lang="en">` | Root element. `lang="en"` tells screen readers and search engines the content is English. |
| `<meta charset="utf-8">` | Character encoding — lets you use special characters (é, ü, ç, ×, etc.) safely. |
| `<meta name="viewport" ...>` | Makes the page responsive on phones and tablets by setting the viewport width to the device width. |
| `<title>` | The text shown on the browser tab. |

### 3.2 Key HTML elements used in this site

| Element | Meaning | Example on site |
|---------|---------|----------------|
| `<h1>` – `<h6>` | Headings, `<h1>` is largest | `<h1>Somesh Singh</h1>` |
| `<p>` | Paragraph of text | Bio text on index.html |
| `<a href="...">` | Hyperlink (anchor) | Navigation links, publication DOIs |
| `<img src="...">` | Image | Profile photo, icons |
| `<ul>` / `<ol>` | Unordered / ordered list | Accomplishments in misc.html |
| `<li>` | List item (child of `<ul>`/`<ol>`) | Each accomplishment |
| `<dl>` / `<dt>` / `<dd>` | Definition list / term / description | Coursework items in academics.html |
| `<nav>` | Semantic navigation container | The top navbar |
| `<div>` | Generic block container | Layout wrappers (`.container`, `.row`) |
| `<span>` | Generic inline container | Float-right dates |
| `<hr>` | Horizontal rule (separator line) | Between sections |
| `<blockquote>` | Block quotation | Quotes on phddissertation.html |
| `<button>` | Clickable button | Dark mode toggle, mobile nav toggle |
| `<em>` / `<i>` | Emphasis / italic | Author names |
| `<strong>` / `<b>` | Strong emphasis / bold | "4th place" highlights |
| `<u>` | Underline | Author's own name in author lists |
| `<br>` | Line break | Inside the dissertation abstract |
| `<sup>` | Superscript | Exponents like |V|² |

### 3.3 Attributes you'll see

| Attribute | Used on | Purpose |
|-----------|---------|---------|
| `href` | `<a>` | URL the link points to |
| `src` | `<img>`, `<script>` | Path to an image or script file |
| `class` | many | Applies CSS class(es). e.g. `class="container"` |
| `id` | many | Unique identifier. e.g. `id="theme-toggle"` |
| `style` | many | Inline CSS. e.g. `style="font-size:16pt"` |
| `target="_blank"` | `<a>` | Opens link in a new tab |
| `data-toggle="collapse"` | `<a>` | Bootstrap JS: toggles a collapsible section |
| `aria-label` | `<button>` | Accessibility: labels the button for screen readers |
| `rel="stylesheet"` | `<link>` | Tells the browser the linked file is CSS |

---

## 4. CSS — The Skin

CSS rules have the form:

```css
selector {
    property: value;
}
```

The **selector** picks which HTML elements to style; the **property** says
what aspect to change; the **value** says how.

### 4.1 Stylesheet load order (matters!)

Each HTML page loads stylesheets in this order:

```html
<link href="css/normalize.css"      rel="stylesheet">  <!-- 1 -->
<link href="css/bootstrap.min.css"  rel="stylesheet">  <!-- 2 -->
<link href="css/mystylesheet.css"   rel="stylesheet">  <!-- 3 -->
<link href="css/darkmode.css"       rel="stylesheet">  <!-- 4 -->
```

**Why order matters:** When two CSS rules have the same specificity, the one
that appears *later* wins. So:

1. `normalize.css` makes browsers consistent (resets default margins, fonts).
2. `bootstrap.min.css` provides the grid, navbar, buttons, and other
   components.
3. `mystylesheet.css` customizes the look (Berkeley blue navbar, font sizes,
   link styles).
4. `darkmode.css` adds the toggle button, the scrollbar fix, and all the
   dark-mode overrides. Because it loads last, its rules can override
   everything above when dark mode is active.

### 4.2 normalize.css

A "CSS reset." Different browsers have different default margins, paddings,
and font sizes. `normalize.css` levels the playing field so the site looks
the same everywhere.

### 4.3 bootstrap.min.css

The CSS part of the **Bootstrap 3** framework. Provides:

* **Grid system** — `.container`, `.row`, `.col-sm-*`, `.col-lg-*`
* **Navbar** — `.navbar`, `.navbar-inverse`, `.navbar-static-top`
* **Collapse** — `.collapse` for expandable sections (abstracts)
* **Responsive utilities** — media queries for different screen widths

### 4.4 mystylesheet.css

Custom rules for this site:

```css
body {
    padding-top: 2%;           /* Space above the heading */
    margin: 0 auto;            /* Center the body */
}

a:hover, a:link, a:visited {
    text-decoration: none;     /* Remove underlines from all links */
}

.navbar {
    border-radius: 5px;
    background: #003262;       /* "Berkeley Blue" */
}

.navbar-inverse .navbar-brand {
    color: #FDB515;            /* California Gold — indicates the active/current page */
}

.navbar-inverse .navbar-nav > li > a {
    color: #fff;               /* White text for other nav items */
}

.navbar-inverse .navbar-nav > li > a:hover,
.navbar-inverse .navbar-brand:hover {
    color: #FDB515;            /* "California Gold" on hover */
}

.container .img-responsive {
    max-width: 90%;
    border-color: #d8d8d8;
    border-radius: 6px;        /* Rounded corners on the profile photo */
}

p {
    font-size: 1.25em;         /* Slightly larger paragraph text */
}
```

**Active-page indicator:** The active page's nav link is styled in gold
(#FDB515) via the `.active` class on its `<li>` element. On desktop, all
four nav items are visible side-by-side with the current page highlighted
in gold. The `.navbar-brand` is hidden on desktop and only serves as the
visible label on mobile (see §8).

### 4.5 darkmode.css

This file does five things:

1. **Fixes the page shift** — `html { overflow-y: scroll; }` (see §10).
2. **Prevents white flash** — `html.dark-mode { background-color: #000000; }`
   works with the `<head>` script to set the background before first paint
   (see §5.4).
3. **Styles the toggle button** — positions it, makes it circular, colours it.
4. **Overrides colours when `body` has class `dark-mode`**.
5. **Adds light pill backgrounds behind small icons** so they remain clearly
   visible on the black background.

#### 4.5.1 Dark mode colour palette

The dark mode uses a Cyborg-inspired palette (see
[Bootswatch Cyborg](https://bootswatch.com/3/cyborg/)) adapted for a true-black
background.  The colours were chosen for comfort and readability:

| Role | Hex value | Colour name / description |
|------|-----------|--------------------------|
| Background | `#000000` | True black |
| Body text | `#b0b0b0` | Soft gray — easy on the eyes, lower contrast than pure white |
| Headings | `#e0e0e0` | Near-white, gentle |
| Bold text | `#d0d0d0` | Brighter for emphasis |
| Links | `#4dd0e1` | Bright cyan — pops on black, distinct from body text |
| Link hover | `#ffd54f` | Warm gold — clear visual feedback |
| Navbar background | `#e8ecf1` | Light cool gray — creates a "floating bar" effect |
| Navbar text | `#1e293b` | Dark slate |
| Navbar active item | `#003262` | Berkeley Blue — maintains brand identity |
| Navbar hover | `#2563eb` | Bright blue |
| Horizontal rules | `#282828` | Dark gray (Cyborg-style) |
| Section underlines | `#3c3c3c` | Mid gray |
| Blockquote background | `#0d0d0d` | Near-black, subtle depth |
| Blockquote attribution | `#888888` | Muted gray |
| Toggle button border | `#4dd0e1` | Matches link colour |
| Mentor topic labels | `#f5b942` | Brighter gold (readable on black) |
| ACM badge text | `#80deea` | Light cyan (replaces invisible dark purple) |

#### 4.5.2 Full colour mapping (light → dark)

| Light mode value | Dark mode override | What it affects |
|------------------|--------------------|----------------|
| `#fff` (white background) | `#000000` (true black) | Page background |
| `#333` (dark text) | `#b0b0b0` (soft gray) | Body text |
| `#222` (heading colour) | `#e0e0e0` (near-white) | Headings |
| Bootstrap blue links | `#4dd0e1` (bright cyan) | All hyperlinks |
| — | `#ffd54f` (warm gold) | Link hover colour |
| `#003262` (navbar bg) | `#e8ecf1` (light gray) | Navbar background |
| `#fff` (navbar text) | `#1e293b` (dark slate) | Navbar link text |
| `#FDB515` (navbar active) | `#003262` (Berkeley Blue) | Active nav item |
| `1px solid black` (borders) | `1px solid #3c3c3c` | Section header underlines |
| `#eff` (blockquote bg) | `#0d0d0d` (near-black) | Blockquote backgrounds |
| `—` | `#282828` | Horizontal rules |
| `#23007d` (ACM badge) | `#80deea` (light cyan) | ACM badge text |
| `#C4820E` (mentor gold) | `#f5b942` (bright gold) | Mentor topic labels |

#### 4.5.3 Icon visibility in dark mode

Small icons (GitHub, LinkedIn, ORCID, ACM badge) and academic font-icons
(DBLP, Google Scholar) would be difficult to see on a black background.
The dark mode CSS solves this by adding a **white pill-shaped backdrop**
behind each icon using `background-color` with `border-radius` and `padding`:

```css
/* Image-based icons — white pill */
body.dark-mode img[src*="github.png"],
body.dark-mode img[src*="linkedin"],
body.dark-mode img[src*="orcid"] {
    background-color: rgba(255, 255, 255, 0.92);
    border-radius: 6px;
    padding: 3px;
}

/* Font-based icons (Academicons) — white pill */
body.dark-mode i.ai {
    background-color: rgba(255, 255, 255, 0.92);
    border-radius: 4px;
    padding: 2px 4px;
    color: #1a1a1a;
}
```

The `rgba(255, 255, 255, 0.92)` is white with 92% opacity — slightly
translucent to blend naturally. The `border-radius` rounds the corners
to match the icon's shape, creating a clean pill effect rather than a
harsh rectangle.

The tag-cloud image on the dissertation page gets a similar treatment
with more padding since it's a larger image.

#### 4.5.4 How CSS specificity beats existing rules

The overrides use CSS **specificity** to beat the existing rules. For example,
`body.dark-mode .navbar` has higher specificity than `.navbar`, so when the
class `dark-mode` is present, the dark navbar colour wins.

For inline styles that cannot be overridden by normal CSS (because inline
styles have the highest specificity), `darkmode.css` uses the **`!important`**
declaration combined with **attribute selectors**:

```css
body.dark-mode [style*="color:black"] {
    color: #b0b0b0 !important;
}
```

The `[style*="color:black"]` selector targets any element whose `style`
attribute *contains* the substring `color:black`. The `!important` flag
is necessary because inline `style` attributes normally outrank all
external CSS rules regardless of specificity.

#### 4.5.5 The light navbar design choice

In dark mode, the navbar uses a light gray background (`#e8ecf1`) instead
of the dark charcoal approach used by many dark themes. This creates a
visually striking "floating card" effect — a light bar sitting on the
black background — that:

- Clearly delineates the navigation area from page content.
- Maintains high contrast for nav text (dark slate on light gray).
- Preserves the Berkeley Blue brand colour for the active page indicator.
- Complements the overall aesthetic without clashing with the dark theme.

The nav text switches to dark colours (`#1e293b` for regular items,
`#003262` for the active item) since the background is now light.

---

## 5. JavaScript — The Muscles

### 5.1 jQuery (`js/jquery.js`)

jQuery is a library that simplifies working with the DOM. Bootstrap 3 depends
on it — without jQuery, the collapsible navbar (hamburger menu on mobile) and
the expandable abstracts would not work.

jQuery is loaded **before** Bootstrap's JS because Bootstrap's code calls
jQuery functions.

### 5.2 Bootstrap JS (`js/bootstrap.min.js`)

Provides the interactive parts of Bootstrap components:

* **Collapse plugin** — powers `data-toggle="collapse"` on the abstract
  (abstract) links and the mobile navbar hamburger.
* **Dropdown, modal, tooltip** plugins (not used here, but included in the
  bundle).

### 5.3 darkmode.js

A small, self-contained script:

```javascript
(function () {
    var toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    function updateAriaLabel() {
        var isDark = document.body.classList.contains('dark-mode');
        toggle.setAttribute('aria-label',
            isDark ? 'Switch to light mode' : 'Switch to dark mode');
        toggle.setAttribute('title',
            isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }

    updateAriaLabel();

    toggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        document.documentElement.classList.toggle('dark-mode');
        var theme = document.body.classList.contains('dark-mode')
            ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        updateAriaLabel();
    });
})();
```

**How it works, step by step:**

1. `document.getElementById('theme-toggle')` finds the toggle button in the
   DOM.
2. `updateAriaLabel()` sets the button's tooltip and screen-reader label to
   reflect the current mode.
3. When the button is clicked:
   - `document.body.classList.toggle('dark-mode')` adds or removes the
     `dark-mode` class on `<body>`.
   - `document.documentElement.classList.toggle('dark-mode')` does the same
     on the `<html>` element — this is essential for the anti-flash system
     (see §5.4) to keep `<html>` and `<body>` in sync.
   - The user's choice (`'dark'` or `'light'`) is saved to
     **`localStorage`**, a browser-side key-value store that persists across
     page reloads and sessions.
   - The aria-label/title is updated again.

### 5.4 Two-tier anti-flash system

When a user in dark mode clicks a nav link, the browser loads a brand-new
HTML document. During the split second before CSS and scripts execute, the
browser would paint the default white background — causing a jarring white
flash. The site prevents this with **two inline scripts** working together:

#### Tier 1: `<head>` script (fires earliest possible)

Inside `<head>`, **before** any `<link>` stylesheets or the `</head>` tag:

```html
<script>
  if(localStorage.getItem('theme')==='dark'){
    document.documentElement.classList.add('dark-mode');
  }
</script>
```

This adds `dark-mode` to the `<html>` element (`document.documentElement`).
Because `<html>` exists as soon as the browser starts parsing the document,
this runs **before** `<body>` even exists. Combined with the CSS rule:

```css
html.dark-mode {
    background-color: #000000;
}
```

…the browser's very first paint is already black, not white. This is the
critical fix — without it, there is always a white flash between pages.

#### Tier 2: `<body>` script (applies full dark mode styling)

Right after the `<body>` tag:

```html
<script>
if(localStorage.getItem('theme')==='dark')
    document.body.classList.add('dark-mode');
</script>
```

This adds `dark-mode` to `<body>`, which activates all the detailed dark
mode CSS rules (text colour, navbar, links, icons, etc.).

#### Why both are needed

- **Tier 1 alone** sets `html` background to black but can't style `<body>`
  content (headings, text, navbar) because `<body>` doesn't exist yet when
  the `<head>` script runs.
- **Tier 2 alone** would set body dark mode correctly, but the `<html>`
  element would still be white during the brief moment between first paint
  and body script execution — causing a flash.
- **Together**, Tier 1 ensures no white flash, and Tier 2 ensures all content
  styling is correct.

The `darkmode.js` script (loaded at the end of `<body>`) also toggles the
class on **both** `document.documentElement` and `document.body` when the
user clicks the toggle button, keeping them in sync.

---

## 6. Bootstrap 3 — The Framework

### 6.1 The grid system

Bootstrap divides the page into a 12-column grid.

```
.container         → fixed-width centred wrapper
  └── .row         → a horizontal row
       ├── .col-sm-3  → 3 of 12 columns on small screens (≥768px)
       ├── .col-lg-4  → 4 of 12 columns on large screens (≥1200px)
       └── .col-lg-12 → full width
```

On **index.html**, the layout is:
- Profile photo: `col-sm-3 col-lg-4` (¼ to ⅓ of the width)
- Bio text: `col-sm-9 col-lg-8` (¾ to ⅔ of the width)

On **other pages**, the content spans the full width: `col-lg-12`.

The `sm`, `md`, `lg` prefixes correspond to breakpoints:

| Prefix | Screen width | Typical device |
|--------|-------------|----------------|
| `xs` | < 768px | Phone |
| `sm` | ≥ 768px | Tablet |
| `md` | ≥ 992px | Desktop |
| `lg` | ≥ 1200px | Large desktop |

### 6.2 The navbar

Bootstrap's `navbar` component provides a responsive navigation bar.

Key classes:

| Class | Purpose |
|-------|---------|
| `.navbar` | Base navbar styles |
| `.navbar-inverse` | Dark colour scheme (here overridden to Berkeley blue) |
| `.navbar-static-top` | Navbar scrolls with the page (not sticky) |
| `.navbar-header` | Contains the brand link and the mobile toggle button |
| `.navbar-brand` | The site's "brand" link (here: "about me") |
| `.navbar-toggle` | The hamburger button visible on small screens |
| `.navbar-collapse` | The section that collapses on mobile |
| `.nav .navbar-nav` | The `<ul>` list of nav links |

The hamburger menu works via Bootstrap's **Collapse** plugin:
`data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"` on the
button tells Bootstrap to show/hide the element with that `id`.

### 6.3 Collapse (expandable abstracts)

On **research.html**, each publication's abstract is hidden inside a
`.collapse` div. Clicking the `(abstract)` link toggles it:

```html
<a data-toggle="collapse" href="#esa23">(abstract)</a>

<p class="collapse" id="esa23">
  The abstract text...
</p>
```

`data-toggle="collapse"` triggers Bootstrap JS, which adds/removes the `.in`
class on the target element, making it visible or hidden.

### 6.4 `.initialism`

Applied to the navbar text. In Bootstrap 3 this makes text slightly smaller
and uppercase-able. Here it just adds a subtle stylistic touch to the nav
items.

---

## 7. Page-by-Page Breakdown

### 7.1 index.html (Home / "About Me")

**Structure:**
```
<body>
  ├── [flash-prevention script]
  ├── .container  (heading + navbar)
  │   ├── [dark mode toggle button]
  │   ├── <h1>  Somesh Singh
  │   └── <nav> navbar
  ├── .container  (page content)
  │   ├── .row
  │   │   ├── .col-sm-3.col-lg-4  →  profile photo
  │   │   └── .col-sm-9.col-lg-8  →  bio, contact
  │   ├── <hr>
  │   └── social icons (GitHub, LinkedIn, ORCID)
  ├── jquery.js
  ├── bootstrap.min.js
  └── darkmode.js
```

**Notable elements:**
- `<img class="img-responsive">` makes the profile photo scale on small
  screens.
- Social icons are plain `<img>` elements inside `<a>` tags, floated right.
  In dark mode, each icon gets a white pill-shaped backdrop via CSS
  (`background-color`, `border-radius`, `padding`) so it stays visible on
  the black background.
- The email address uses `{firstname} (dot) {lastname}` as a simple
  anti-spam measure.

### 7.2 research.html

**Structure:**
```
<body>
  ├── .container  (heading + navbar)
  ├── .container  (page content)
  │   └── .col-lg-12
  │       ├── Research intro paragraph
  │       ├── Publications
  │       │   └── (one block per paper: h3 title, h4 authors, h4 venue,
  │       │        collapse abstract)
  │       ├── Patents
  │       └── Other Projects
```

**How a publication entry works:**

```html
<h3 style="font-size: 16pt">Paper Title</h3>
<h4 style="font-size: 13pt"><i><u>Somesh Singh</u>, Co-Author,</i></h4>
<h4 style="font-size: 13pt">in Venue Name, Year.</h4>
<p style="font-size: 11pt">
  <a data-toggle="collapse" href="#paper-id">(abstract)</a>
  <a href="docs/papers/file.pdf" target="_blank">(pdf)</a>
  <a href="https://doi.org/..." target="_blank">(doi)</a>
</p>
<p class="collapse" id="paper-id" style="font-size: 11pt">
  Abstract text...
</p>
```

- `<u>` underlines the author's own name.
- `&#32;` is a Unicode space, `&#231;` is ç, etc. — HTML entities for special
  characters.
- `<i class="ai ai-dblp-square">` uses the **Academicons** icon font
  (loaded from a CDN) for the DBLP and Google Scholar icons.

### 7.3 mentor.html

Lists supervised students and interns using nested `<dl>` (definition list)
elements:

```html
<dl>
  <dt>Student Name, <a href="...">Institution</a>
      <span style="float:right">Year</span>
  </dt>
  <dd style="color:#C4820E;">Topic Title</dd>
</dl>
```

The `#C4820E` gold colour is overridden to a brighter `#f5b942` in dark
mode via an attribute selector in `darkmode.css`, since the darker gold
would lack sufficient contrast on a black background.

### 7.4 misc.html

Three sections: Accomplishments, Professional Service, Selected Invited Talks.

Each uses a `<ul>` with `<li>` items. The items use `<dl>` for layout (even
without `<dt>`/`<dd>` children — a historical HTML quirk in this site).

### 7.5 phddissertation.html

Features:
- `<blockquote>` elements with `style="background:#eff"` for the Bertrand
  Russell and Aristotle quotes. In dark mode, the background is overridden
  to `#0d0d0d` (near-black) via `!important`.
- A long `<p>` with the dissertation abstract, using `<br>` tags to create
  paragraph-like spacing within the single `<p>` element.
- A tag-cloud image (`img/tag_cloud_phd.png`). In dark mode, this image
  gets a white background with rounded corners and padding to ensure
  readability.

### 7.6 academics.html

Not linked from the current navbar (commented out). Contains coursework and
TA listings using `<dl>`/`<dt>`/`<dd>`.

---

## 8. The Navigation Bar

The navbar appears on every page. Every page has the **same four nav items
in the same order**: about me, research, mentoring, miscellaneous. The
current page is highlighted in gold via a `class="active"` on its `<li>`.

Each HTML page contains its own copy of the navbar (not factored out into a
shared file).

### 8.1 How the navbar adapts to screen size

The navbar has two different behaviours depending on screen width:

**Desktop (≥ 768px):**
- The `.navbar-brand` is **hidden** via CSS (`display: none`).
- All four nav items in the `<ul>` are visible side-by-side.
- The active page's `<li>` has `class="active"`, styled in gold (#FDB515).
- Order is always: about me | research | mentoring | miscellaneous.

**Mobile (< 768px):**
- The `.navbar-brand` is **visible**, showing the current page's name in gold.
- The `<ul>` is hidden behind the hamburger (☰) button.
- The active `<li>` is hidden from the dropdown (CSS: `display: none`) to
  avoid duplicating the brand text.
- The remaining three items appear in the dropdown menu.

This is achieved with two CSS media queries in `mystylesheet.css`:

```css
/* On desktop: hide the brand (the full list shows all items) */
@media (min-width: 768px) {
    .navbar .navbar-brand {
        display: none;
    }
}

/* On mobile: hide the active li (brand already shows current page) */
@media (max-width: 767px) {
    .navbar-inverse .navbar-nav > li.active {
        display: none;
    }
}
```

### 8.2 Active-page styling

In `mystylesheet.css`:

```css
.navbar-inverse .navbar-nav > li.active > a,
.navbar-inverse .navbar-nav > li.active > a:hover,
.navbar-inverse .navbar-nav > li.active > a:focus {
    color: #FDB515;            /* California Gold */
    background-color: transparent;
}
```

The gold colour matches the original `.navbar-brand` colour, so the desktop
appearance is visually identical to having the brand visible — the active
page is always the gold item on the left.

### 8.3 Per-page configuration

Each page sets two things:
1. The `.navbar-brand` text and `href` (for mobile display).
2. Which `<li>` gets `class="active"`.

| Page | `.navbar-brand` text | Active `<li>` |
|------|---------------------|---------------|
| `index.html` | about me | about me |
| `research.html` | research | research |
| `mentor.html` | mentoring | mentoring |
| `misc.html` | miscellaneous | miscellaneous |
| `phddissertation.html` | research (parent page) | research |
| `academics.html` | academics | academics |

### 8.4 Navbar structure (example: research.html)

```html
<div class="container">
  <button id="theme-toggle" class="theme-toggle" ...>...</button>
  <h1 style="font-size:5rem; margin-bottom:0.3em;">Somesh Singh</h1>
  <nav class="navbar navbar-inverse navbar-static-top">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand initialism" href="research.html"> research</a>
    </div>
    <div class="collapse navbar-collapse"
         id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav initialism">
        <li><a href="index.html">about me</a></li>
        <li class="active"><a href="research.html">research</a></li>
        <li><a href="mentor.html">mentoring</a></li>
        <li><a href="misc.html">miscellaneous</a></li>
      </ul>
    </div>
  </nav>
</div>
```

Notice that:
- All four nav items appear in the `<ul>`, always in the same order.
- The current page ("research") has `class="active"` on its `<li>`.
- The brand text matches the active page (used only on mobile).
- On desktop, the brand is hidden and you see all four items with
  "research" highlighted in gold.

### 8.5 How to add a new page to the navbar

To add a new page (e.g., `teaching.html`):

1. **On every existing page:** add
   `<li><a href="teaching.html">teaching</a></li>` inside the
   `<ul class="nav navbar-nav">`, in the desired position.
2. **On the new page itself:** include all nav items in the `<ul>` (in the
   same order as other pages), set the teaching `<li>` to `class="active"`,
   and set the `.navbar-brand` to "teaching" with `href="teaching.html"`.

### 8.6 Important structural rule

The `<nav>` must close *inside* the `<div class="container">`, not the
other way around:

```
Correct:   container opens → nav opens → nav closes → container closes
Wrong:     container opens → nav opens → container closes → nav closes
```

Getting this wrong causes layout shifts between pages.

---

## 9. The Dark / Light Mode Toggle

### 9.1 The toggle button (HTML)

Placed inside the first `.container` div on every page, right before the
`<h1>` heading:

```html
<div class="container">
  <button id="theme-toggle" class="theme-toggle"
          title="Toggle dark mode" aria-label="Toggle dark mode">
    <svg class="icon-moon" ...>  <!-- crescent moon path -->  </svg>
    <svg class="icon-sun"  ...>  <!-- sun circle + rays -->  </svg>
  </button>
  <h1 ...>Somesh Singh</h1>
  ...
</div>
```

The button contains two inline **SVG** icons (Scalable Vector Graphics):

- **Moon** (`icon-moon`): A crescent moon shape. Visible in **light mode**,
  indicating "click to switch to dark."
- **Sun** (`icon-sun`): A circle with radiating lines. Visible in **dark
  mode**, indicating "click to switch to light."

The visibility is controlled purely by CSS:

```css
/* Light mode (default) */
.theme-toggle .icon-sun  { display: none;   }
.theme-toggle .icon-moon { display: inline; }

/* Dark mode */
body.dark-mode .theme-toggle .icon-sun  { display: inline; }
body.dark-mode .theme-toggle .icon-moon { display: none;   }
```

### 9.2 Button styling

The toggle uses `rem` units so it scales naturally with browser zoom, and
`float: right` so it sits in the content flow rather than floating over it:

```css
.theme-toggle {
    float: right;        /* flows with the content, doesn't occlude */
    z-index: 100;
    margin-top: 0.3em;
    border-radius: 50%;  /* makes it a circle */
    width: 2.4rem;
    height: 2.4rem;
    transition: ... 0.3s ease;  /* smooth colour changes */
}
```

Because the toggle is inside the `.container` and uses `float: right`, it:
- Scrolls with the page content (not fixed to the viewport).
- Moves when the user zooms in or resizes the window.
- Never occludes other content since it's part of the document flow.

On smaller screens (< 768px), the button shrinks slightly:

| Screen width | Button size |
|-------------|------------|
| ≥ 768px (desktop/tablet) | 2.4rem |
| < 768px (phone) | 2rem |

Using `rem` (root-em) units means the button scales with browser zoom.
When a user zooms in, the browser increases the root font size, and the
button grows proportionally — staying usable without overlapping content.

In light mode the button has a Berkeley-blue border on a light background.
In dark mode it switches to a near-black background (`#0d0d0d`) with a
cyan border (`#4dd0e1`) that matches the link colour, and a subtle
cyan glow (`box-shadow`). Hovering inverts this — the background becomes
cyan and the icon turns black — with a `transform: scale(1.08)` for
tactile feedback.

### 9.3 How it persists across pages

1. User clicks the toggle → JS saves `localStorage.setItem('theme', 'dark')`
   and toggles `dark-mode` on both `<html>` and `<body>`.
2. User navigates to another page → two inline scripts fire in sequence:
   - The `<head>` script adds `dark-mode` to `<html>` **before first paint**,
     preventing any white flash (see §5.4).
   - The `<body>` script adds `dark-mode` to `<body>`, activating all
     detailed dark-mode CSS overrides.
3. The CSS rules for `html.dark-mode` and `body.dark-mode` take effect →
   dark colours render seamlessly without any flash.

`localStorage` is per-origin (per-domain), so `ssomesh.github.io` shares
the same storage across all its pages. The preference survives browser
restarts.

### 9.4 How to modify dark mode colours

All dark-mode colours live in `css/darkmode.css`, under the
`DARK MODE OVERRIDES` section. A colour palette reference is included at
the top of that section as a CSS comment for quick reference.

To change the dark background, for example:

```css
body.dark-mode {
    background-color: #000000;  /* ← change this value */
}
```

To change the link colour in dark mode:

```css
body.dark-mode a,
body.dark-mode a:link,
body.dark-mode a:visited {
    color: #4dd0e1;  /* ← change this value */
}
```

To change the navbar background in dark mode:

```css
body.dark-mode .navbar {
    background: #e8ecf1;  /* ← change this value */
}
```

When choosing colours, ensure sufficient **contrast** against the
background. The WCAG (Web Content Accessibility Guidelines) recommend a
contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.
Free tools like [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
can verify your choices.

Standard colour formats in CSS:
- Hex: `#1a1a2e` (red=1a, green=1a, blue=2e)
- RGB: `rgb(26, 26, 46)`
- HSL: `hsl(240, 28%, 14%)`
- RGBA: `rgba(255, 255, 255, 0.92)` (with alpha/transparency)

---

## 10. The Page-Shift Fix

### The problem

When navigating between pages, the content would shift slightly left or
right. Two causes:

1. **Scrollbar appearing/disappearing.** Pages with more content (like
   research.html) show a vertical scrollbar; shorter pages don't. The
   scrollbar takes up ~15–17px of width, so the viewport *content area*
   shrinks, and the centred container shifts.

2. **Broken HTML nesting.** The `<div class="container">` was being closed
   *inside* `<nav>` on some pages but not others. This caused browsers to
   interpret the container width differently.

### The fix

**Scrollbar:** In `css/darkmode.css`:

```css
html {
    overflow-y: scroll;
}
```

This forces the vertical scrollbar to always be visible (even when the page
is short enough not to need it). The scrollbar may appear "greyed out" on
short pages, but the content area width stays constant.

**Nesting:** The `</div>` and `</nav>` tags were reordered on all pages so
that `<nav>` always closes *before* its parent `<div class="container">`.

---

## 11. How to Edit Content

### Adding a new publication to research.html

Copy an existing publication block and modify:

```html
<h3 style="font-size: 16pt">
Your Paper Title
</h3>
<h4 style="font-size: 13pt"><i><u>Somesh Singh</u>,&#32;Co-Author,</i></h4>
<h4 style="font-size: 13pt">in Venue Name, Year.</h4>
<p style="font-size: 11pt">
  <a data-toggle="collapse" href="#unique-id">(abstract)</a>
  <a href="docs/papers/yourfile.pdf" target="_blank">(pdf)</a>
  <a href="https://doi.org/..." target="_blank">(doi)</a>
</p>
<p class="collapse" id="unique-id" style="font-size: 11pt">
  Your abstract text here.
</p>
```

**Critical:** The `href="#unique-id"` and `id="unique-id"` must match and
be unique across the page.

### Adding a new nav link

In **every** HTML file, add a `<li>` inside the `<ul class="nav navbar-nav">`:

```html
<li><a href="newpage.html">new page</a></li>
```

Then create `newpage.html` using the same boilerplate as the other pages.
On the **new page itself**, include all nav items in the `<ul>` (in the same
order as other pages), set the new page's `<li>` to `class="active"`, and
set the `.navbar-brand` to the new page's name with `href` pointing to the
new page's filename (see §8 for details).

### Changing the profile photo

Replace `img/me.jpg` with a new image file of the same name, or update the
`src` attribute in `index.html`.

### Updating the favicon

Replace `img/favicon.ico` or update the `<link rel="shortcut icon">` in each
page's `<head>`.

---

## 12. Common Pitfalls & Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| Hamburger menu doesn't work on mobile | `jquery.js` not loaded, or loaded after `bootstrap.min.js` | Ensure jQuery `<script>` comes before Bootstrap's |
| Abstract doesn't expand when clicked | `id` mismatch between the `<a href="#...">` and the `<p id="...">` | Make them match exactly |
| Dark mode resets on page change | `localStorage` script missing from `<body>` or `<head>` | Add both inline `<script>` blocks: one in `<head>` (for `<html>`) and one right after `<body>` (see §5.4) |
| Content shifts when navigating | Missing `overflow-y: scroll` on `html`, or broken nav nesting | Check `darkmode.css` is loaded; verify `</nav>` comes before `</div>` for the container |
| Wrong page highlighted in navbar | `class="active"` on wrong `<li>` | Each page must have `class="active"` on its own `<li>` and its name as the `.navbar-brand` text (see §8) |
| Page looks different in different browsers | `normalize.css` not loaded | Ensure it's the first stylesheet |
| Inline styles not overridden in dark mode | Inline styles have highest specificity | Use `!important` in `darkmode.css` with attribute selectors |
| Icons invisible in dark mode | No light background behind icons | Add `background-color: rgba(255,255,255,0.92)` with `border-radius` and `padding` to the icon's dark-mode CSS rule |
| White flash when navigating pages | `<head>` anti-flash script missing, or `html.dark-mode` CSS rule absent | Ensure the `<head>` script sets `dark-mode` on `<html>` and `darkmode.css` has `html.dark-mode { background-color: #000000; }` (see §5.4) |
| `</br>` appears in HTML source | Legacy invalid syntax | Replace with `<br>` (a void element with no closing tag) |

---

## 13. Glossary

| Term | Definition |
|------|-----------|
| **DOM** | Document Object Model — the browser's internal tree representation of the HTML. |
| **CSS specificity** | The algorithm browsers use to decide which CSS rule wins when multiple rules target the same element. Inline styles > IDs > classes > element selectors. |
| **`!important`** | A CSS declaration that overrides normal specificity rules. Used sparingly for cases like inline-style overrides. |
| **Viewport** | The visible area of the browser window. |
| **Responsive design** | Design that adapts to different screen sizes using flexible grids and media queries. |
| **Media query** | A CSS technique (`@media (max-width: 767px) { ... }`) that applies styles only at certain screen widths. |
| **`localStorage`** | A browser API for storing key-value pairs persistently on the client side (survives page reloads and browser restarts). |
| **FOUC** | Flash of Unstyled Content — a brief flicker of default styles before CSS is applied. |
| **Minified** (`.min.css`, `.min.js`) | Files with whitespace and comments removed to reduce file size for faster loading. |
| **CDN** | Content Delivery Network — a globally distributed server network for fast delivery of libraries (used for Academicons). |
| **SVG** | Scalable Vector Graphics — an XML-based image format that scales without pixelation, used for the sun/moon toggle icons. |
| **Semantic element** | An HTML element that conveys meaning (e.g., `<nav>`, `<article>`) vs. a generic one (`<div>`, `<span>`). |
| **Void element** | An HTML element that cannot have children and has no closing tag (e.g., `<br>`, `<hr>`, `<img>`). Writing `</br>` is invalid — browsers tolerate it, but the correct form is `<br>`. |
| **`rgba`** | Red, Green, Blue, Alpha — a colour format with a transparency channel. `rgba(255, 255, 255, 0.92)` is white at 92% opacity. Used for icon pill backgrounds in dark mode. |
| **Attribute selector** | A CSS selector like `[style*="color:black"]` that matches elements based on their HTML attributes. |
| **`rem`** | "Root em" — a CSS unit equal to the root element's font size (typically 16px). Unlike `px`, `rem` scales with browser zoom, making UI elements responsive to user preferences. |
| **Bootstrap grid** | A 12-column layout system where `.col-*-N` spans N columns at a given breakpoint. |
| **Collapse** | A Bootstrap plugin that toggles the visibility of an element with a slide animation. |

---

*Document generated for ssomesh.github.io. Last updated: April 28, 2026.*
