// import { headers } from "next/headers";
import LayoutClient from "./layout-client"; // Import the client component

const LayoutWrapper = async ({ children }: { children?: React.ReactNode }) => {
  // const headersData = await headers();
  // const cookies = headersData.get("cookie") || "";

  return <LayoutClient>{children}</LayoutClient>;
};

export default LayoutWrapper;
