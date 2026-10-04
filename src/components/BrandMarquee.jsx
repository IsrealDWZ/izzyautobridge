import Marquee from './Marquee';

const DEFAULT_BADGES = [
  'Toyota', 'Honda', 'Hyundai', 'Kia', 'Nissan',
  'Mercedes', 'BMW', 'Ford', 'Mazda', 'Lexus',
];

export default function BrandMarquee({ badges = DEFAULT_BADGES, duration = 30 }) {
  return (
    <Marquee
      items={badges}
      duration={duration}
      gap="gap-3"
      itemClassName="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/90 backdrop-blur"
    />
  );
}
