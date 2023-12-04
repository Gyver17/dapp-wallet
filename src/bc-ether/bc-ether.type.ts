export interface BlockchainTransaction {
  type: number;
  chainId: number;
  nonce: number;
  maxPriorityFeePerGas: bigint;
  maxFeePerGas: bigint;
  gasPrice: null;
  gasLimit: bigint;
  to: string;
  value: bigint;
  data: string;
  accessList: Array<unknown>;
  hash: string;
  v: number;
  r: string;
  s: string;
  from: string;
  confirmations: number;
}
