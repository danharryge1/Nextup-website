import type { Metadata } from 'next'
import { COMPANY_NAME } from '@/lib/constants'
import AboutHero from '@/components/sections/about/AboutHero'
import Story from '@/components/sections/about/Story'
import TeamBios from '@/components/sections/about/TeamBios'
import Values from '@/components/sections/about/Values'

export const metadata: Metadata = {
  title: 'About Us',
  description: `Meet the team behind ${COMPANY_NAME}. Four founders, modern tools, real results.`,
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Story />
      <TeamBios />
      <Values />
    </>
  )
}
