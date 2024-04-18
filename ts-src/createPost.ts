import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const userId = "cluftuk4k00004sseyhnfx4bn";

  // postExampleを登録
  await prisma.post.create({
    data: {
      name: "postExample",
      createdById: userId,
    },
  });

  // postExampleRequiredを登録
  await prisma.post.create({
    data: {
      name: "postExampleRequired",
      createdById: userId,
    },
  });

  // const allPosts = await prisma.post.findMany({
  //   include: {
  //     createdBy: {
  //       select: {
  //         id: true,
  //         name: true,
  //         email: true,
  //         emailVerified: true,
  //         image: true,
  //       },
  //     },
  //   },
  // });
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
