import Example from "@/components/landingPage/Hero";
import NavBar from "@/components/landingPage/NavBar";

export default function Home() {
  return (
    <main>
      <div className="mt-16">
        <NavBar />
      </div>
      <Example />
    </main>
  )
}
