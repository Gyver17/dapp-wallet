import { PrismaClient, Prisma } from '@prisma/client';
import { hashString } from '../../src/common/utils/hash.util';

export async function seedUsers(prisma: PrismaClient) {
  const users: Prisma.UserCreateManyInput[] = [
    {
      id: 'clk5ndwbs000208lc9dtpepw1',
      firstName: 'Jhon',
      lastName: 'Doe',
      email: 'jhondoe@gmail.com',
      password: await hashString('password'),
      username: 'jhondoe',
      walletAddress: '0x6A9dA6dcDE83b58698F812A6168F6C28827D4b44',
    },
    {
      id: 'clk5ndwbs000208lc9dtpepw2',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'janedoe@gmail.com',
      password: await hashString('password'),
      username: 'janedoe',
      walletAddress: '0x4D8283FE1c4F0276d5D331faD495c7B37188AA1D',
    },
    {
      id: 'clk5ndwbs000208lc9dtpepw3',
      firstName: 'Mary',
      lastName: 'Doe',
      email: 'marydoe@gmail.com',
      password: await hashString('password'),
      username: 'marydoe',
      walletAddress: '0xdA787aC2BC569B14E87D75321f5e908Aee1B1545',
    },
  ];

  await prisma.user.createMany({
    data: users,
  });

  console.info('seed users succesfully executed');
}
