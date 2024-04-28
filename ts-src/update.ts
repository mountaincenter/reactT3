import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const startTime = new Date("2024-04-10T13:42:00.000Z");
  const stopTime = new Date("2024-04-10T16:42:00.000Z");
  const recordTimeInMinutes =
    (stopTime.getTime() - startTime.getTime()) / 60000;
  const recordTime = Math.ceil(recordTimeInMinutes);
  await prisma.timeLog.update({
    where: { id: "cluuv2ygd000113eshdy1ozkz" },
    data: {
      startTime: startTime,
      stopTime: stopTime,
      recordTime: recordTime,
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
