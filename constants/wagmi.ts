import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
  zksync,
} from 'wagmi/chains';

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? '';

export const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: projectId,
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    zksync,
    base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
});