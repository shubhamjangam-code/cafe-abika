# Cafe Delight - Premium Single Page Cafe Website

A modern, elegant, fully responsive, and SEO-optimized single-page website for **Cafe Delight** located in Islampur, Maharashtra, India.

Built with **React**, **Vite**, **Tailwind CSS**, **Framer Motion**, and **Swiper.js**.

---

## 🌟 Key Features

- **Luxury Design & Aesthetics**: Warm premium color palette inspired by luxury cafes with glassmorphic elements and clean typography.
- **Steaming Loader Screen**: Elegant custom loading screen displaying a steaming coffee cup and animated progress.
- **Scroll Progress Tracker**: Top reading bar indicating page scroll depth.
- **Sticky Glass Navbar**: Transparent navbar on Hero section that transitions to blurred glassmorphism on scroll, with smooth scroll section anchors.
- **Interactive Food Menu**: Full food menu with a search bar, horizontal scrolling category filter tabs, and a veg/non-veg filter toggle.
- **Direct WhatsApp Ordering**: "Order" button on each menu card and special combos that instantly opens WhatsApp with a prefilled purchase message.
- **Masonry Image Lightbox**: Fully responsive image gallery with category filters and interactive lightbox modal (prev/next controls, image magnification).
- **Testimonial Slider**: Sleek sliding customer reviews carousel built with Swiper.js.
- **Statistics Counters**: Animated numeric stats showing happy customers, menu item counts, years of experience, and delivery speed.
- **Embedded Google Maps**: Real, interactive map showing the location of Islampur, Maharashtra.
- **Table Reservation Form**: High-end contact and booking form with animated success feedback.
- **Floating Controls**: Quick access buttons for dial-in phone, direct WhatsApp order, and scroll-to-top.

---

## 🎨 Design Systems

- **Primary Color**: `#B76E2B` (Warm Brown/Gold)
- **Secondary Color**: `#FFF7F0` (Warm Cream)
- **Accent Color**: `#2E7D32` (Forest Veg Green)
- **Backgrounds**: `#FFFFFF` (White) / `#FDF8F4` (Light Peach)
- **Typography**: Poppins (Primary sans-serif body text) & Montserrat (Stylized headings)

---

## 📁 Folder Structure

```text
cafe-website/
│
├── public/
│   ├── logo.png          # Cafe Brand Logo (Generated Gold Vector)
│   ├── robots.txt        # Search engine crawlers configuration
│   └── favicon.ico       # Tab shortcut icon
│
├── src/
│   ├── assets/           # Media files & mock resources
│   │
│   ├── components/       # Reusable UI Section Components
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Categories.jsx
│   │   ├── Menu.jsx
│   │   ├── Services.jsx
│   │   ├── Gallery.jsx
│   │   ├── WhyChooseUs.jsx
│   │   ├── Testimonials.jsx
│   │   ├── OfferBanner.jsx
│   │   ├── Delivery.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── FloatingButtons.jsx
│   │   ├── ScrollProgress.jsx
│   │   ├── Loader.jsx
│   │   └── BackToTop.jsx
│   │
│   ├── data/             # Structured JavaScript Datasets
│   │   ├── menu.js
│   │   ├── services.js
│   │   ├── gallery.js
│   │   └── testimonials.js
│   │
│   ├── App.jsx           # Section orchestrator & category state manager
│   ├── main.jsx          # React app mounting entry-point
│   └── index.css         # Tailwind imports, custom scrollbar & animations
│
├── package.json          # Node dependencies & project scripts
├── tailwind.config.js    # Customized theme colors & typography
├── postcss.config.js     # PostCSS loader config
├── vite.config.js        # Vite compiler configurations
└── README.md             # Documentation
```

---

## 🚀 Setup & Execution

Follow these simple commands to run the project locally on your system.

### Prerequisites

Ensure you have **Node.js** (v18.0.0 or higher) and **npm** installed on your system.

### 1. Install Dependencies

Open your terminal in the project directory (`D:\Cafe web`) and run:

```bash
npm install
```

### 2. Run Development Server

Start the local server with:

```bash
npm run dev
```

The application will launch on port **3000** (e.g., `http://localhost:3000/`).

### 3. Build for Production

Compile a optimized production build under the `dist/` directory:

```bash
npm run build
```

---

## 🔧 Easy Customizations

- **Cafe Name / Location**: Modify the brand string in `src/components/Navbar.jsx`, `src/components/Hero.jsx`, `src/components/About.jsx`, and `src/components/Footer.jsx`.
- **Menu Items / Pricing**: Simply add or edit food entries inside `src/data/menu.js`. The menu grid will automatically update.
- **Images**: Replace the Unsplash URLs in `src/data/menu.js` or `src/data/gallery.js` with your local assets or custom hosting links.
- **Phone / WhatsApp Number**: Change the `+919876543210` occurrences to your actual commercial contact number in the Navbar, Hero, Delivery, Contact, Footer, and FloatingButtons components.
