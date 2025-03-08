# Periskope

Periskope is a modern real-time chat application built with Next.js, React, and Supabase. It offers a clean, responsive interface for messaging with contacts, searching users, and managing conversations.

![Periskope Screenshot](public/screenshot.png)

## Features

- **Real-time Messaging**: Send and receive messages instantly
- **User Authentication**: Secure login and registration with Supabase Auth
- **Contact Management**: Add, search, and filter contacts
- **Message Status**: Track when messages are sent, delivered, and read
- **Responsive Design**: Works on desktop and mobile devices
- **Search Functionality**: 
  - Search existing contacts with debounced filtering
  - Add new contacts through user search
- **Message History**: View and scroll through conversation history
- **Unread Messages**: Filter to quickly find conversations with unread messages

## Tech Stack

- **Frontend**:
  - [Next.js 15](https://nextjs.org/) (React framework)
  - [React 19](https://react.dev/) (UI library)
  - [TailwindCSS 4](https://tailwindcss.com/) (Styling)
  - [React Icons](https://react-icons.github.io/react-icons/) (Icon components)

- **Backend**:
  - [Supabase](https://supabase.com/) (Backend-as-a-Service)
  - PostgreSQL (Database)
  - Row-Level Security (Data protection)

- **Authentication**:
  - Supabase Auth
  - Middleware for protected routes

## Project Structure

```
periskope/
├── app/                # Next.js app directory
│   ├── auth/           # Authentication pages
│   ├── chats/          # Chat interface pages
│   ├── layout.tsx      # Root layout component
│   └── page.tsx        # Home page component
├── components/         # Reusable React components
│   ├── auth/           # Authentication components
│   ├── chat/           # Chat interface components
│   └── ...             # Other UI components
├── public/             # Static assets
├── utils/              # Utility functions and services
├── types/              # TypeScript type definitions
├── middleware.ts       # Next.js middleware for auth
├── supabase-schema.sql # Database schema
└── ...                 # Configuration files
```

## Getting Started

### Prerequisites

- Node.js (version 18 or newer)
- npm or yarn
- Supabase account

### Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/periskope.git
cd periskope
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Set up Supabase**

- Create a new Supabase project
- Run the SQL from `supabase-schema.sql` in the SQL editor to set up the database schema
- Set up authentication providers in the Supabase dashboard

5. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Deployment

The application can be deployed on [Vercel](https://vercel.com/) or any other Next.js-compatible hosting service.

```bash
npm run build
# or
yarn build
```

## Database Structure

The application uses the following main tables:
- `profiles`: User profiles with username and avatar information
- `messages`: Chat messages between users with status tracking
- `contacts`: User-to-user connections

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
