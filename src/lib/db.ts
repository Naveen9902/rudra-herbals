import { PrismaClient } from "@prisma/client"

const globalForPrismaStore = globalThis as unknown as {
  prismaStore: PrismaClient | undefined
}

export const prisma =
  globalForPrismaStore.prismaStore ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })

if (process.env.NODE_ENV !== "production") globalForPrismaStore.prismaStore = prisma
