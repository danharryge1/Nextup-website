import type { Metadata } from 'next'
import ServicesHero from '@/components/sections/services/ServicesHero'
import HowWeHelp from '@/components/sections/services/HowWeHelp'
import ServicesWeOffer from '@/components/sections/services/ServicesWeOffer'
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
      <div style={{ height: 80, background: '#0A0A0F' }} />
      <ServicesWeOffer />
      <div style={{ height: 40, background: '#0A0A0F' }} />
      <HowWeHelp />
      <div style={{ height: 60, background: '#0A0A0F' }} />
      {SERVICE_BLOCKS.map((block, i) => (
        <div key={block.number}>
          {i > 0 && <div style={{ height: 80, background: i % 2 === 0 ? '#0A0A0F' : '#0D0D15' }} />}
          <ServiceBlock {...block} />
        </div>
      ))}
      <div style={{ height: 80, background: '#0A0A0F' }} />
      <FAQ />
    </>
  )
}
