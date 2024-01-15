import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

window.Webflow ||= [];
window.Webflow.push(() => {
  const items = gsap.utils.toArray<HTMLDivElement>('.team_item');
  const images = gsap.utils.toArray<HTMLImageElement>('.team_image');
  const ctas = gsap.utils.toArray<HTMLDivElement>('.team_cta');

  gsap.set(items, { xPercent: -125, opacity: 0 });
  gsap.set(images, { scale: 1.2 });
  gsap.set(ctas, { opacity: 0, yPercent: 50 });
  gsap.set(ctas[0], { opacity: 1 });

  const masterTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.mover',
      start: 'top top',
      end: '+=3000',
      pin: '.mover',
      scrub: 1,
      // markers: true,
    },
    defaults: {
      ease: 'none',
    },
  });

  function animateTeamItem(i: number) {
    return gsap
      .timeline({ defaults: { ease: 'none' } })
      .to(items[i], { xPercent: -100, opacity: 1 })
      .to(images[i], { scale: 1 }, '<')
      .to(items[i], { xPercent: 0 })
      .to(images[i], { scale: 0.6, ease: 'power1.out' }, '<')
      .to(items[i], { xPercent: 99, opacity: 1 })
      .to(images[i], { scale: 1, ease: 'power1.in' }, '<')
      .to(items[i], { xPercent: 100, opacity: 1 })
      .to(items[i], { xPercent: 125, opacity: 0 })
      .to(images[i], { scale: 1.2 }, '<');
  }

  function animateCtaIn(i: number) {
    return gsap.timeline({ defaults: { ease: 'none' } }).to(ctas[i], { opacity: 1, yPercent: 0 });
  }

  function animateCtaOut(i: number) {
    return gsap.timeline({ defaults: { ease: 'none' } }).to(ctas[i], { opacity: 0, yPercent: -50 });
  }

  items.forEach((item, i) => {
    masterTl.add(animateTeamItem(i), '-=1');
    if (i === 2) {
      masterTl.add(animateCtaOut(0), '<').add(animateCtaIn(1), '>');
    }
    if (i === 5) {
      masterTl.add(animateCtaOut(1), '<').add(animateCtaIn(2), '>');
    }
  });
});
