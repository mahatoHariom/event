# Event Management Next.js Application

## Prerequisites

- Node.js (v18+)
- PostgreSQL
- pnpm or npm

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd event-management-app
```

### 2. Environment Configuration

Create `.env` file in project root:

```
DATABASE_URL=postgresql://mahato:mahato@localhost:5432/event?schema=sample
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Database Setup

```bash
# Run Prisma migrations
pnpm prisma migrate dev

# Optional: Seed initial data
pnpm prisma db seed
```

### 5. Run Development Server

```bash
pnpm dev
```

### 6. Application Features

- User authentication
- Event creation, update, delete
- Pagination
- Search and filter events

## Technologies

- Next.js 14
- Prisma ORM
- PostgreSQL
- NextAuth
- TypeScript
- Tailwind CSS

## Development Commands

- `pnpm dev`: Start development server
- `pnpm build`: Production build
- `pnpm start`: Start production server
- `pnpm prisma`: Prisma CLI commands
