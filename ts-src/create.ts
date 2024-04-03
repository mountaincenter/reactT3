import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const startTime = new Date(new Date().getTime() - 10 * 60000); // 10分前の時刻
  const stopTime = new Date(); // 現在の時刻
  const recordTime = Math.floor(
    (stopTime.getTime() - startTime.getTime()) / 1000,
  ); // 差分を分で計算
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
