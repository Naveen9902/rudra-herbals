import { PrismaClient } from "@prisma/client"

const globalForPrismaStore = globalThis as unknown as {
  prismaStore: PrismaClient | undefined
}

export const prisma =
  globalForPrismaStore.prismaStore ??
  new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL || "postgresql://dummy:dummy@localhost/dummy",
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })

if (process.env.NODE_ENV !== "production") globalForPrismaStore.prismaStore = prisma
