# HOT & SPICY

A modern, responsive multi-page website for a fictional fast-food restaurant in Pokhara, Nepal. Built with plain HTML5, CSS3 and vanilla JavaScript — no frameworks, build process or backend required.

## Project overview

Hot & Spicy is a four-page static business website designed to introduce the brand, showcase the menu, share a promotional offer and make it easy for customers to get in touch.

**Pages**

- `index.html` — homepage with hero, featured dishes, food categories, brand benefits, combo offer and demo testimonials.
- `about.html` — brand story, mission and vision, kitchen promise, embedded video, brand values and a menu call-to-action.
- `menu.html` — 12 demo dishes with a category filter and NPR prices.
- `contact.html` — demo contact details, opening hours, validated demo form and an illustrative map.

**Features**

- Shared sticky header and footer across every page
- Responsive mobile navigation with accessible toggle controls
- Menu category filtering (works from homepage category links too)
- Client-side contact form validation with an honest demo confirmation
- Back-to-top button
- Locally stored food photography with branded image fallbacks
- Responsive layouts built with Flexbox and CSS Grid
- Reduced-motion support and visible keyboard focus states
- No shopping cart, checkout, accounts, payments or backend requests

## Technologies used

- **HTML5** — semantic, accessible page structure
- **CSS3** — custom design tokens, Flexbox, CSS Grid and media queries
- **Vanilla JavaScript** — small optional interactions only
- **Google Fonts** — Bricolage Grotesque and DM Sans (with system font fallbacks)
- **Unsplash photography** — downloaded locally into `images/`

## Project structure

```text
crunchy-bite/
├── index.html
├── about.html
├── menu.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   ├── favicon.svg
│   ├── fallback.svg
│   └── ...food photography
└── README.md
```

## Run the website locally

No installation or build step is needed. The easiest option is to open `index.html` directly in a browser, though a local static server is recommended so all links and images behave exactly as they would when deployed.

### Option 1 — VS Code Live Server

1. Open the project folder in Visual Studio Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` and choose **Open with Live Server**.

### Option 2 — Python

Run this from the project folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

### Option 3 — Node.js

Run this from the project folder:

```bash
npx serve .
```

Follow the local URL printed in the terminal.

## How to customise the website

### Text and page content

Open the relevant HTML file and edit the text directly:

- Brand story and values: `about.html`
- Menu names and descriptions: `menu.html`
- Contact details, opening hours and form copy: `contact.html`
- Homepage sections and testimonials: `index.html`

The header and footer are repeated manually on each page so the site stays 100% static and beginner-friendly. If you change contact details or navigation, update all four HTML files.

### Prices

Search `menu.html` for `Rs.` and edit the price badge in each product card. Homepage featured prices are in `index.html`. The short note beneath the menu explains that prices are demo prices and should be replaced with real prices when launching.

### Colours and fonts

Open `css/style.css` and edit the design tokens at the top:

```css
:root {
  --red: #E6392F;
  --yellow: #FFC928;
  --charcoal: #202020;
  --cream: #FFF9EF;
  --white: #FFFFFF;
  --font-display: "Bricolage Grotesque", sans-serif;
  --font-body: "DM Sans", sans-serif;
}
```

Changing these variables updates the main palette and type hierarchy across all pages. Fonts are loaded through the Google Fonts link in each HTML `<head>`.

### Images

All food images live in the `images/` folder. Replace an image with your own file using the same filename, or update the `src` attribute in the HTML. For consistent crops:

- Product cards use a `4:3` or `16:11` media area with `object-fit: cover`.
- Keep photos at least **1200px wide** for good quality on larger screens.
- Use descriptive `alt` text.
- The inline `onerror` attributes and `js/script.js` automatically show `images/fallback.svg` if an image fails to load.

The current demo photos are sourced from [Unsplash](https://unsplash.com/) and stored locally so the site does not depend on external image hosting. Unsplash photos are free to use under the [Unsplash License](https://unsplash.com/license). Replace them with your own licensed restaurant photography before a commercial launch.

### Video

The About page includes a responsive YouTube embed in the “Watch the craft” section. It uses the privacy-enhanced `youtube-nocookie.com` domain and loads lazily. To use a different video, replace the video ID (`BIG1h2vG-Qg`) in both the iframe `src` and the “Watch on YouTube” link in `about.html`, then update the iframe `title` and the attribution text.

### Contact form

The form is intentionally a demonstration. It validates fields with JavaScript and shows a success-style message that clearly states **no message was sent or stored**. There is no backend, email service or database connection.

To connect a real form later, you would need a form-handling service or backend (for example Netlify Forms or a small serverless function). That is outside the scope of this static demo.

### Contact details and social links

Phone, email, address and social links are placeholders. Search for:

- `9812345678`
- `support@hotandspicy.com`
- `Bagar, Pokhara`
- `https://www.instagram.com/`

Replace them with real business details and profile URLs in all four HTML files.

## Deploy the static website

Because the site uses only static files, it can be deployed without any build command.

### GitHub Pages

1. Create a GitHub repository and upload the project files.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select your main branch and the root folder, then save.
5. GitHub will publish the site at the provided URL.

### Netlify

1. Sign in to Netlify and choose **Add new site → Deploy manually**.
2. Drag the project folder into the deploy area — no build command is needed.
3. Netlify will provide a live URL. You can add a custom domain later.

### Other static hosting

Upload the project folder to any standard static host (Cloudflare Pages, Vercel static output, shared hosting via FTP, etc.). The entry page is `index.html`.

## Demo content notice

Hot & Spicy, its menu, prices, reviews, contact details, address, map location and promotional offer are fictional and exist only for this demonstration website. All customer testimonials are explicitly labelled as demo reviews. Prices are shown in Nepali rupees (NPR) and are illustrative only.

## Quick quality checklist

- [x] Four pages linked through the shared navigation and footer
- [x] Consistent brand palette, typography and components
- [x] Responsive navigation and layouts
- [x] 12 menu products with category filters
- [x] Demo prices in NPR
- [x] Contact form validation and honest demo confirmation
- [x] Local images with fallbacks
- [x] No frameworks, backend or build process
