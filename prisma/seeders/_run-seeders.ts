import { PrismaClient } from '@prisma/client';

// @Seeds
import { seedUsers } from './users.seed';
import { seedTokenContracts } from './token-contracts.seed';

const prisma = new PrismaClient();

async function main() {
  console.info('> Running seeds ');
  console.info('--------------------------------------\n');

  await seedUsers(prisma);
  await seedTokenContracts(prisma);

  console.info('\n✔ All seeds succesfully executed\n');
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
