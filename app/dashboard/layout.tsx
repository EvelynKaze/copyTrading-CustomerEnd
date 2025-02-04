import LayoutWrapper from "@/components/user-dashboard/layout-wrapper";

export const metadata = {
  title: "CopyTradeMarkets: UserDashboard",
  description: "Make transactions and purchase stocks with CopyTradeMarkets",
};

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return <LayoutWrapper>{children}</LayoutWrapper>;
};

export default Layout;
