"use client"
import Hero from "@/components/landingPage/Hero";
import NavBar from "@/components/landingPage/NavBar";
import LoginForm from "@/components/user/LoginForm";
import SignupForm from "@/components/user/SignUpForm";

export default function Home() {
  return (
    <main>
      <div className="mt-16">
        <NavBar />
      </div>
      <Hero />
      {/* <LoginForm/>
      <SignupForm/> */}
    </main>
  )
}
