import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import NewsletterSignup from "../components/NewsletterSignup";
function RootLayout() {
  return (
    <>
      <MainNavigation />
      <NewsletterSignup />
      <main className="content">
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
