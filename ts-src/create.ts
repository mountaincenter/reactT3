import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const startTime = new Date("2024-04-03T10:42:46.656Z");
  const stopTime = new Date("2024-04-03T11:42:50.000Z");
  const recordTimeInMinutes =
    (stopTime.getTime() - startTime.getTime()) / 60000;
  const recordTime = Math.ceil(recordTimeInMinutes);
  await prisma.timeLog.create({
    data: {
      startTime: startTime,
      stopTime: stopTime,
      recordTime: recordTime,
      status: "finished",
      userId: "cluftuk4k00004sseyhnfx4bn",
    },
  });
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
