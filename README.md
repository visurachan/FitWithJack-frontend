# FitWithJack - Frontend

A modern, responsive React frontend for the FitWithJack personal training platform.

## Features

✨ **Modern UI/UX**
- Clean, professional design with Tailwind CSS
- Smooth animations with Framer Motion
- Responsive design for all devices
- Glass morphism effects and gradient designs

🔐 **Authentication System**
- User registration with email verification
- Secure JWT-based authentication
- Password management
- Auto-login after registration

👤 **User Profile**
- View and edit personal information
- Track physical stats (height, weight)
- Update contact details

📅 **Session Management**
- Browse one-time training sessions
- Filter by mode (Online/In-Person)
- View detailed session information
- Enroll in sessions with confirmation

🏋️ **Class Management**
- Browse regular fitness classes
- Search and filter classes
- View class schedules and pricing

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Axios** - HTTP client
- **React Query** - Server state management
- **date-fns** - Date utilities
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running on http://localhost:8080

### Installation

1. Install dependencies:
   npm install

2. Start the development server:
   npm run dev

3. Open http://localhost:5173

### Build for Production

npm run build

## Configuration

Update the .env file:
VITE_API_BASE_URL=http://localhost:8080
VITE_APP_NAME=FitWithJack

---

Built with ❤️ using React + Vite + Tailwind CSS
