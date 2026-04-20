import { Outlet } from "react-router";
import { TopRibbon } from "./top-ribbon";
import { Header } from "./header";
import { Footer } from "./footer";

export function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <TopRibbon />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
