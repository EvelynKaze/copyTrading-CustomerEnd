import Image from "next/image";
import { profilepic } from "@/constants/AppImages";
import ToggleSidebar from "./toggle-sidebar";
// import { Button } from "./ui/button";
// import { Icon } from "@iconify/react/dist/iconify.js";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Connect } from "@/components/user-deposit/Connect"
import { Account } from "@/components/user-deposit/account"
import { useAccount } from 'wagmi';

interface HeaderProps {
    userName: string | null;
    avatarUrl: string | null // Add optional avatarUrl
    accountTrader?: string | null
}


export function Header({ userName, avatarUrl }: HeaderProps){
    const { isConnected } = useAccount();

  return (
    <header className="flex items-center justify-between w-full border-b px-4 md:px-6 h-16 md:h-24 py-4">
      <ToggleSidebar />
      <div className="sm:flex hidden flex-col md:gap-1">
        <h1 className="text-base sm:text-lg md:text-2xl font-semibold">
            Welcome {userName || "Guest"}!
        </h1>
        <p className="text-xs sm:text-xs md:text-sm text-muted-foreground">
            {isConnected ? "Connected" : "Not Connected"}
        </p>
      </div>
      <div className="flex items-center gap-4">
        {/* <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="w-64 pl-8" />
        </div> */}
        {isConnected ? <Account /> : 
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            mounted,
          }) => {
            const ready = mounted;
            const connected = ready && account && chain;

            return (
              <div
                {...(!ready && {
                  'aria-hidden': true,
                  style: {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <button
                        className='bg-appPremuimGold cursor-pointer font-bold rounded-lg text-white p-2'
                        onClick={openConnectModal}
                      >
                        Connect Wallet
                      </button>
                    );
                  }

                  return (
                    <div style={{ display: 'flex', gap: 12 }}>
                      <button
                        onClick={openChainModal}
                        style={{
                          backgroundColor: '#ff8c00',
                          borderRadius: '12px',
                          color: 'white',
                          padding: '12px',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        {chain.name}
                      </button>

                      <button
                        onClick={openAccountModal}
                        style={{
                          backgroundColor: '#ff8c00',
                          borderRadius: '12px',
                          color: 'white',
                          padding: '12px 24px',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        {account.displayName}
                      </button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom> }
        {/* {isConnected ? <Account /> : <Connect />} */} 
        <button className="relative h-8 w-8">
          <Image
            src={avatarUrl || profilepic}
            alt="Profile"
            width={32}
            height={32}
            className=" w-full h-full object-cover rounded-full"
          />
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-green-500 ring-2 ring-white" />
        </button>
      </div>
    </header>
  );
}
