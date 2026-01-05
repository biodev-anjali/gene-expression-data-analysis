import { PrismaClient } from "@prisma/client"

/**
 * Prisma Client Singleton Pattern for Vercel Serverless
 * 
 * WHY THIS IS NEEDED:
 * - Vercel serverless functions are stateless and can be instantiated multiple times
 * - Each PrismaClient instance creates a connection pool
 * - Without singleton pattern, we'd exhaust database connections quickly
 * - Vercel's global object persists across function invocations in the same container
 * 
 * HOW VERCEL HANDLES THIS:
 * - Vercel reuses containers for multiple requests (warm starts)
 * - globalThis persists across requests in the same container
 * - New containers get fresh globalThis, but connection pooling in DATABASE_URL handles it
 * - PostgreSQL providers (Neon/Supabase) use connection poolers (PgBouncer) in the connection string
 * 
 * CONNECTION POOLING:
 * - Production DATABASE_URL includes connection pooling (e.g., ?pgbouncer=true)
 * - This allows many serverless functions to share a smaller pool of actual DB connections
 * - Without pooling, each function would need its own connection, quickly exhausting limits
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

/**
 * Initialize Prisma Client with optimized settings for serverless
 * - Reuses existing instance if available (from globalThis)
 * - Creates new instance only if needed
 * - Logging: verbose in dev, errors only in production
 */
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    // Connection pool settings are handled by the DATABASE_URL connection string
    // Production providers (Neon/Supabase) include pooling parameters in the URL
  })

// Store in globalThis to reuse across function invocations in the same container
// This is critical for Vercel serverless - prevents connection pool exhaustion
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = prisma
}

// Graceful shutdown: disconnect on process termination
if (typeof process !== "undefined") {
  process.on("beforeExit", async () => {
    await prisma.$disconnect()
  })
}

