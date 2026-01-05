import { PrismaClient } from "@prisma/client"

// Prisma Client singleton pattern for Vercel serverless compatibility
// In serverless environments, we need to reuse connections to avoid connection pool exhaustion
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Initialize Prisma Client with connection pooling optimized for serverless
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    // Connection pool settings for serverless (handled by connection string in production)
  })

// In development, store Prisma Client in global to prevent multiple instances
// In production (Vercel), each function invocation may create a new instance,
// but the connection pooling in the DATABASE_URL handles this efficiently
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}

