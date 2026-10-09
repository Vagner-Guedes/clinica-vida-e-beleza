import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function mountAnimations(root: HTMLElement) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const context = gsap.context(() => {
    if (reduceMotion) return

    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
    intro.from('[data-hero-word]', { yPercent: 115, opacity: 0, duration: .82, stagger: .07 }, .15)
      .from('[data-hero-copy]', { y: 18, opacity: 0, duration: .7, stagger: .08 }, .35)
      .from('[data-hero-image]', { clipPath: 'inset(0 0 100% 0)', scale: 1.05, duration: 1.2 }, .05)
      .from('[data-hero-detail]', { opacity: 0, x: 18, duration: .55, stagger: .1 }, .55)

    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
      gsap.from(element, {
        scrollTrigger: { trigger: element, start: 'top 84%', once: true },
        y: 28, opacity: 0, duration: .85, ease: 'power3.out',
        immediateRender: false,
      })
    })

    gsap.fromTo('[data-glaze-line]', { scaleY: 0 }, {
      scaleY: 1, transformOrigin: 'top center', ease: 'none',
      scrollTrigger: { trigger: '[data-journey]', start: 'top 72%', end: 'bottom 70%', scrub: true },
    })

    gsap.to('[data-beam]', {
      '--beam-angle': '360deg', duration: 8, repeat: -1, ease: 'none',
    })
  }, root)

  return () => context.revert()
}
