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
      itemClassName="rounded-full border border-subtle bg-primary px-4 py-1.5 text-sm text-main"
    />
  );
}
