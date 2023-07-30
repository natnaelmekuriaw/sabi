import { ReactNode } from "react";
import Body from "./Body";
import Navbar from "./Navbar";
import Footer from "./Footer";

type WebsiteLayout = {
  children: ReactNode;
};

export default function Home({ children }: WebsiteLayout) {
  return (
    <div>
      <Navbar />
      <Body>{children}</Body>
      <Footer />
    </div>
  );
}
