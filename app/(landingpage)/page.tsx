import Features from "@/components/landingPage/Features";
import Example from "@/components/landingPage/Hero";
import NavBar from "@/components/common/Header/NavBar";
import Pricing from "@/components/landingPage/Pricing";
import Footer from "@/components/common/Footer";
import GlobalBusinessSection from "@/components/landingPage/Reach";

export default function Home() {
  return (
    <main>
      <div className="mt-16">
        <NavBar />
      </div>
      <Example />
      <Features />
      <Pricing />
      <GlobalBusinessSection/>
      <Footer />
    </main>
  )
}
