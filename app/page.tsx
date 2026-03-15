import Hero from '@/components/sections/home/Hero'
import WhatWeDo from '@/components/sections/home/WhatWeDo'
import CredibilityStrip from '@/components/sections/home/CredibilityStrip'
import ProjectCarousel from '@/components/sections/home/ProjectCarousel'
import HowWeWork from '@/components/sections/home/HowWeWork'
import TeamTeaser from '@/components/sections/home/TeamTeaser'
import FinalCTA from '@/components/sections/home/FinalCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <CredibilityStrip />
      <ProjectCarousel />
      <HowWeWork />
      <TeamTeaser />
      <FinalCTA />
    </>
  )
}
