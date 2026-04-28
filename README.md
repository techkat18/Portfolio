# Katrinca's Portfolio Website

A modern portfolio website featuring smooth animations, scroll effects, responsive design, and live API integrations — built entirely with pure HTML, CSS, and Vanilla JavaScript.

---

## Project Overview

This is a multi-page personal portfolio website for **Katrinca Claire T. Ibita**, a developer and designer based in the Philippines. The portfolio showcases 10 personal and academic projects across mobile development, web apps, Java systems, and console-based games.

The site was built from scratch without any frontend frameworks. It features a fully interactive projects gallery with modal popups and category filtering, a live-connected contact form, a GitHub profile bento card, and an embedded Google Maps location — all powered by real third-party APIs.

Key highlights:
- 10 projects displayed in a filterable, animated grid
- Click-to-expand modal with detailed descriptions, tech tags, and prev/next navigation
- Dual-channel contact form submission (EmailJS + Formspree fallback)
- Live GitHub profile stats fetched at runtime
- Embedded Google Maps iframe for location display
- Custom cursor, grain texture overlay, glassmorphism effects, and scroll-triggered animations

---

## File Structure

```
portfolio/
├── index.html          # Home page with hero, stats, and featured work
├── about.html          # About page with experience and education timeline
├── skills.html         # Skills showcase with animated progress bars
├── projects.html       # Filterable project gallery with modal viewer
├── contact.html        # Contact form, GitHub card, map, and social links
├── main.css            # Global stylesheet (animations, layout, components)
├── main.js             # Global JavaScript (cursor, scroll effects, navbar)
└── img/                # Project screenshots and images
```

---

## APIs Used

### 1. EmailJS
**Purpose:** Sends contact form submissions directly to an email inbox without a backend server.

- **Library:** `@emailjs/browser` (loaded via CDN)
- **How it works:** When the contact form is submitted, EmailJS uses a configured service and email template to deliver the message straight to Katrinca's inbox. The `emailjs.send()` call passes the sender's name, email, subject, selected service, and message body.
- **Config values used:** Public Key, Service ID (`service_zecmydj`), Template ID (`template_dxfbk0h`)

### 2. Formspree
**Purpose:** Acts as a reliable fallback for contact form submissions in case EmailJS encounters an error.

- **Endpoint:** `https://formspree.io/f/mnjbzeby`
- **How it works:** After EmailJS sends the message, the form data is also submitted to Formspree via a `fetch()` POST request using `FormData`. This dual-submission approach ensures the message is received even if one channel fails.

### 3. GitHub REST API
**Purpose:** Dynamically fetches and displays live GitHub profile stats on the contact page.

- **Endpoint:** `https://api.github.com/users/techkat18`
- **How it works:** On page load, a `fetch()` call retrieves the GitHub user object for the account `techkat18`. The response populates the GitHub bento card with the avatar, display name, handle, bio, public repository count, follower count, following count, and public gist count. If the request fails, an error state is shown instead.

### 4. Google Maps Embed API
**Purpose:** Displays an interactive location map on the contact page.

- **How it works:** An `<iframe>` embed points to specific GPS coordinates (`14.247669, 122.748239`) via a Google Maps embed URL. No API key is required for the basic iframe embed.

---

## Transaction Feature — KwarTrack

**KwarTrack** (Project 03) is the portfolio's featured financial management system, built for the Student Government of the College of Computing and Multimedia Studies (CCMS) at Camarines Norte State College (CNSC).

### What It Does
KwarTrack replaces manual, paper-based record-keeping with a digital platform for tracking:

- **Student dues** — recording the amounts owed by each student member
- **Transactions** — logging each payment event with date, amount, and payer information
- **Payment histories** — maintaining a full audit trail per student so officers can verify who has paid and who has not

### How the Transaction Feature Works
The transaction system is designed around a simple but effective CRUD workflow:

1. **Record a Payment** — An officer logs a new transaction by entering the student's name or ID, the amount paid, and the date. Each entry is stored in the database and immediately reflected in the student's running balance.
2. **View Payment History** — Officers can look up any student's full payment history, showing a chronological list of all transactions tied to their account.
3. **Track Outstanding Dues** — The dashboard automatically computes which students still have unpaid or partially paid dues by comparing total payments against the required amount.
4. **Dashboard Overview** — A summary view shows overall collection progress, recent transactions, and flagged accounts with missing payments.

The system was built with HTML, CSS, JavaScript, and PHP, with a relational database (MySQL) handling persistent storage of student records and transaction logs.

---

## How to Run / View the Project

### Option 1 — Open Directly in a Browser (Quickest)
1. Download or clone the project folder to your computer.
2. Open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari).
3. Navigate between pages using the top navigation bar.

Note: Some API features (EmailJS, GitHub card) require an internet connection to function. The contact form will not send emails if opened from a `file://` path in certain browsers due to CORS restrictions — use a local server (Option 2) for full functionality.

### Option 2 — Run with a Local Development Server (Recommended)
For full API support, serve the files over HTTP using one of the following:

**Using VS Code Live Server:**
1. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code.
2. Right-click `index.html` and select **Open with Live Server**.
3. The site will open at `http://127.0.0.1:5500`.

**Using Python:**
```bash
# Python 3
python -m http.server 8080
```
Then open `http://localhost:8080` in your browser.

**Using Node.js:**
```bash
npx serve .
```
Then open the URL shown in the terminal.

### Option 3 — Deploy Online
Upload all files to any static hosting provider:
- [GitHub Pages](https://pages.github.com/)
- [Netlify](https://netlify.com/)
- [Vercel](https://vercel.com/)

Make sure to keep the file structure intact and include the `img/` folder with all project screenshots.

---

## Customization

### Colors
Edit these CSS variables at the top of `main.css`:

```css
:root {
  --bg-primary: #0a0a0a;
  --bg-secondary: #1a1a1a;
  --text-primary: #ffffff;
  --text-secondary: #a0a0a0;
  --accent-purple: #a855f7;
  --accent-cyan: #06b6d4;
  --accent-pink: #ec4899;
}
```

### Fonts
The website uses **DM Serif Display** for headings and **DM Sans** for body text (loaded from Google Fonts). Change these in the `@import` at the top of `main.css`.

### Projects
Edit the `projects` array in the `<script>` block at the bottom of `projects.html`. Each project object supports:
- `index` — display number (e.g. `'01'`)
- `img` — path to the project image
- `category` — label shown above the title
- `title` — project name
- `desc` — full description shown in the modal
- `tags` — array of technology/tool tags

### Contact Form (EmailJS)
To use the contact form with your own EmailJS account:
1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Create a service and email template
3. Replace the `publicKey`, `service_zecmydj`, and `template_dxfbk0h` values in `contact.html` with your own credentials

---

## Technologies Used

- HTML5, CSS3, Vanilla JavaScript
- Font Awesome 6 (icons)
- Google Fonts (DM Serif Display, DM Sans, JetBrains Mono)
- EmailJS Browser SDK
- Formspree
- GitHub REST API
- Google Maps Embed

---

## Responsive Breakpoints

- Desktop: 1024px and above
- Tablet: 768px – 1023px
- Mobile: Below 768px

---

## Credits

Design & Development: **Katrinca Claire T. Ibita**
© 2025 All Rights Reserved