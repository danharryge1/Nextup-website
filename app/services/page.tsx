import type { Metadata } from 'next'
import ServicesHero from '@/components/sections/services/ServicesHero'
import HowWeHelp from '@/components/sections/services/HowWeHelp'
import ServiceBlock from '@/components/sections/services/ServiceBlock'
import FAQ from '@/components/sections/services/FAQ'
import { SERVICE_BLOCKS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Strategy, growth, and operations consulting for small businesses ready to move faster.',
}

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <HowWeHelp />
      {SERVICE_BLOCKS.map((block) => (
        <ServiceBlock key={block.number} {...block} />
      ))}
      <FAQ />
    </>
  )
}
