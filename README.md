# Event Management Next.js Application

## Prerequisites

- Node.js (v18+)
- PostgreSQL
- npmor npm

## Setup Instructions

### 1. Clone the Repository

```bash
git clone git@github.com:mahatoHariom/event.git
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
npminstall
```

### 4. Database Setup

```bash
# Run Prisma migrations
npmprisma migrate dev

# Optional: Seed initial data
npmprisma db seed
```

### 5. Run Development Server

```bash
npmdev
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

- `npmdev`: Start development server
- `npmbuild`: Production build
- `npmstart`: Start production server
- `npmprisma`: Prisma CLI commands
