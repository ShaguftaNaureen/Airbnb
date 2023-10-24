// nextjs13 hot reloading can cause bunch of new prisma client instances to be created and giving us the warning in the terminal so we assign the prisma client to a globalThis variable which is not affected by hot reload, this is just a best practice while using prisma with nextjs13

import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client

export default client