import Footer from "./Footer";
import Navigation from "./Navigation";
import ScrollToTop from "./ScrollToTop";

export default function Layout({ children }) {
  return (
    <>
      <Navigation/>
      <ScrollToTop/>
      <main className="min-h-screen">{children}</main>
      <Footer/>
    </>
  )
}