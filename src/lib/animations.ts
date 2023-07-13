import gsap from 'gsap';

export function tweenProperty(target, prop, min, max) {
	gsap.to(target, {
		[prop]: gsap.utils.random(min, max),
		duration: 'random(10, 12)',
		ease: 'power.inOut',
		onComplete: tweenProperty,
		onCompleteParams: [target, prop, min, max]
	});
}
