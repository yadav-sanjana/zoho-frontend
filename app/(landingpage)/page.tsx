import Features from "@/components/landingPage/Features";
import Example from "@/components/landingPage/Hero";
import NavBar from "@/components/common/NavBar";
import Pricing from "@/components/landingPage/Pricing";
import Footer from "@/components/common/Footer";

export default function Home() {
  return (
    <main>
      <div className="mt-16 z-50">
        <NavBar />
      </div>
      <Example />
      <Features />
      <Pricing />
      <Footer />
    </main>
  )
}
