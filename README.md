# Minima Boilerplate

A modern full-stack web application boilerplate featuring a Next.js frontend with a clean UI, user authentication, and a solid foundation for building complex web applications.

![Minima](frontend/public/images/minima-crane.png)

## Features

- **Next.js 15** with React 19 for modern web development
- **Complete Authentication System** with email/password and Google OAuth
- **UI Components** built with Radix UI and styled with Tailwind CSS
- **Form Handling** with React Hook Form and Zod validation
- **Responsive Design** that works across all devices
- **User Dashboard** with protected routes

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm 9.6.7 or later
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/MinimaGroup/minima-boilerplate.git
cd minima-boilerplate
```

2. Install frontend dependencies:

```bash
cd frontend
npm install
```

### Running the Application

#### Frontend (Next.js)

Start the frontend development server:

```bash
cd frontend
npm run dev
```

The frontend will be available at http://localhost:3000

### Environment Variables

Create a `.env.local` file in the `frontend` directory with the following variables:

```
# API URLs
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Auth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

## Project Structure

```
minima-boilerplate/
├── frontend/                # Next.js frontend application
│   ├── components/          # Reusable UI components
│   ├── app/                 # App router pages and layouts
│   ├── lib/                 # Utility functions and hooks
│   ├── public/              # Static assets
│   └── styles/              # Global styles
```

## Authentication

The application includes a complete authentication system with:

- Email/password login
- User registration
- Google OAuth integration
- Protected routes
- Token-based authentication

To use Google OAuth, you need to set up a Google Cloud project and configure the OAuth Consent Screen and credentials. Add your Google Client ID to the `.env.local` file.

## Customization

### Styling

The application uses Tailwind CSS for styling. You can customize the theme in `frontend/tailwind.config.js`.

### Components

UI components are built with Radix UI and styled with Tailwind CSS. You can find all components in the `frontend/components/ui` directory.

## Deployment

### Frontend

The frontend can be deployed to Vercel, Netlify, or any other static site hosting service.

#### Vercel (recommended)

```bash
cd frontend
vercel
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you have any questions or need help with the boilerplate, please open an issue on GitHub.
