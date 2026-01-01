# Gene Expression Analyzer

A sci-fi themed Next.js application for analyzing gene expression data with a modern, futuristic UI.

## Features

- 🧬 Gene expression file analysis
- 📊 Statistical analysis display
- 📜 Analysis history tracking
- 🔄 Duplicate detection via file hashing
- 🎨 Sci-fi themed dynamic UI with animations
- 💾 Persistent data storage with Prisma

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Production) / SQLite (Development)
- **ORM**: Prisma
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+ (for latest Prisma) or Node.js 20.11+ (with Prisma 5.x)
- npm or yarn
- PostgreSQL database (for production) or SQLite (for local dev)

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd gene-expression-app
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables

Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/genex_dev?schema=public"
```

For local development with SQLite (temporary, will need PostgreSQL for production):
```env
DATABASE_URL="file:./dev.db"
```

4. Set up the database

For PostgreSQL:
```bash
npx prisma migrate dev
```

For SQLite (if using):
```bash
# Update schema.prisma to use sqlite first
npx prisma migrate dev
```

5. Generate Prisma Client
```bash
npx prisma generate
```

6. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
gene-expression-app/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Database migrations
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── analyze/    # File upload API
│   │   │   └── history/    # History API
│   │   ├── history/        # History page
│   │   ├── page.tsx        # Main analyzer page
│   │   └── layout.tsx      # Root layout
│   └── lib/
│       └── prisma.ts       # Prisma client
└── public/                 # Static assets
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com/new)
3. Add `DATABASE_URL` environment variable (PostgreSQL connection string)
4. Deploy!

**Important**: This app requires PostgreSQL for production deployment. SQLite will not work on serverless platforms like Vercel.

## Usage

1. **Upload File**: Navigate to the main page and upload a gene expression data file
2. **View Results**: Analysis results are displayed immediately after upload
3. **View History**: Click "HISTORY" to see all past analyses
4. **Compare**: Select multiple analyses in history to compare them side-by-side

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

MIT
