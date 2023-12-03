import { PrismaClient, Prisma } from '@prisma/client';

export async function seedTokenContracts(prisma: PrismaClient) {
  const tokenContracts: Prisma.TokenContractCreateManyInput[] = [
    {
      id: 'clk5ndwbs000208lc9dtpepw1',
      name: 'Uniswap',
      symbol: 'Uniswap',
      address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      decimals: 18,
    },
  ];

  await prisma.tokenContract.createMany({
    data: tokenContracts,
  });

  console.info('seed token contracts succesfully executed');
}
