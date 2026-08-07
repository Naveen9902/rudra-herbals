import { PrismaClient } from "@prisma/client"

const globalForPrismaStore = globalThis as unknown as {
  prismaStore: PrismaClient | undefined
}

let dbUrl = process.env.DATABASE_URL || "postgresql://dummy:dummy@localhost/dummy"
if (dbUrl.startsWith('"') && dbUrl.endsWith('"')) dbUrl = dbUrl.slice(1, -1)
if (dbUrl.startsWith("'") && dbUrl.endsWith("'")) dbUrl = dbUrl.slice(1, -1)

export const prisma =
  globalForPrismaStore.prismaStore ??
  new PrismaClient({
    datasourceUrl: dbUrl,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })

if (process.env.NODE_ENV !== "production") globalForPrismaStore.prismaStore = prisma
