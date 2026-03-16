# Parvati Fabric Website

A modern, responsive website for Parvati Fabric built with React and Vite.

## Features

- ⚡ Fast and optimized with Vite
- 🎨 Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🎯 SEO optimized with React Helmet Async
- 🔄 Client-side routing with React Router
- 💅 Styled with Styled Components
- 🎠 Interactive carousels with Swiper
- 📦 PWA support
- 🔔 Toast notifications

## Tech Stack

- **Frontend Framework:** React 18.3
- **Build Tool:** Vite 7.2
- **Styling:** Styled Components
- **Animations:** Framer Motion
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Icons:** React Icons
- **Carousel:** Swiper
- **Notifications:** React Toastify

## Project Structure

```
parvati-fabric-website/
├── frontend/
│   ├── public/
│   │   ├── data/
│   │   ├── images/
│   │   └── videos/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── screenshots/
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd parvati-fabric-website
```

2. Navigate to the frontend directory:
```bash
cd frontend
```

3. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

To run on network (accessible from other devices):
```bash
npm run dev:network
```

### Build

Create a production build:
```bash
npm run build
```

### Preview

Preview the production build:
```bash
npm run preview
```

### Linting

Run ESLint:
```bash
npm run lint
```

## Available Scripts

- `npm run dev` - Start development server with host access
- `npm run dev:network` - Start development server accessible on network
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

All rights reserved.
