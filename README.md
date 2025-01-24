
# Executive Orders Wiki Application

A modern web application built with React, Express, and PostgreSQL for managing and analyzing executive orders.

## Tech Stack

- **Frontend**: React with TypeScript, TailwindCSS, Shadcn/UI components
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js with local strategy
- **API Client**: TanStack Query
- **Routing**: Wouter

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # UI & Feature components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   ├── pages/        # Page components
│   │   └── types/        # TypeScript type definitions
├── db/                    # Database schema and config
├── server/                # Express backend
│   ├── auth.ts           # Authentication logic
│   ├── routes.ts         # API routes
│   └── index.ts          # Server entry point
```

## Getting Started

1. Fork this Repl in Replit
2. The database URL should be automatically provisioned in your environment
3. Install dependencies:
```bash
npm install
```
4. Run the development server:
```bash
npm run dev
```

The application will be available on port 5000.

## Database Schema

The application uses the following main tables:
- `users`: User authentication and roles
- `sections`: Main content sections
- `articles`: Wiki articles with metadata
- `revisions`: Article revision history

## Key Features

- User authentication with editor privileges
- Article creation and editing
- Section management
- Article sentiment and risk analysis
- Revision history tracking
- Real-time content updates

## API Routes

The main API endpoints are:

- `POST /api/auth/login`: User login
- `POST /api/auth/register`: User registration
- `GET /api/sections`: Get all sections
- `GET /api/articles`: Get articles
- `POST /api/articles`: Create new article
- `PUT /api/articles/:id`: Update article
- `GET /api/revisions/:articleId`: Get article revisions

## Development

### Frontend Development

Components use Shadcn/UI library and are located in `client/src/components`. The application uses:
- TailwindCSS for styling
- TanStack Query for API data management
- Wouter for client-side routing

### Backend Development

The Express server handles:
- API routes in `server/routes.ts`
- Authentication in `server/auth.ts`
- Database operations using Drizzle ORM

### Database Changes

Use Drizzle Kit for database migrations:
```bash
npm run db:push
```

## Deployment

Deploy directly on Replit:
1. Open the Deployments panel
2. Choose "Deploy"
3. Configure your deployment settings
4. The build command is: `npm run build`
5. The start command is: `npm run start`

## Environment Variables

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string (auto-provisioned)
- `SESSION_SECRET`: For session management

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Submit your changes

## License

MIT License
