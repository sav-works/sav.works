import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Vision from '@/components/Vision'
import Services from '@/components/Services'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="max-w-[880px] mx-auto px-6">
      <Nav />
      <Hero />
      <Vision />
      <Services />
      <Contact />
      <Footer />
    </main>
  )
}
