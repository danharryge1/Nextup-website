/**
 * Dynamic GSAP loader - keeps GSAP out of the main bundle.
 * Usage: const { gsap, ScrollTrigger } = await loadGSAP()
 */
export async function loadGSAP() {
  const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ])
  gsap.registerPlugin(ScrollTrigger)
  return { gsap, ScrollTrigger }
}

export async function loadGSAPOnly() {
  const { default: gsap } = await import('gsap')
  return gsap
}
