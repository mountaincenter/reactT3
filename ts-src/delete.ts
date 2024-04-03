import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const data = await prisma.timeLog.deleteMany();
  console.log(data);
  const allTimeLogs = await prisma.timeLog.findMany();
  console.log(allTimeLogs);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
