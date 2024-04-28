import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.post.update({
    where: { id: 2 },
    data: {
      name: "testExample",
      content: "contentExample",
    },
  });
  const allPosts = await prisma.post.findMany();
  console.log(allPosts);
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
