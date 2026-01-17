"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/about";
import Portfolio from "@/components/Portfolio";
import Testimonial from "@/components/testimonial";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Chatbot from "@/components/chatbot";
import Zoyi from "@/components/Zoyi";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <Testimonial />
      <Contact />
      <Footer />
      <Zoyi />
      <Chatbot />
    </main>
  );
}
