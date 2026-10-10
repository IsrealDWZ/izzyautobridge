import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20">
      <div className="text-sm font-semibold tracking-[0.12em] uppercase text-alert mb-10">
        IzzyAutoBridge
      </div>
      <h1 className="text-7xl sm:text-8xl font-bold tracking-tight leading-none">404</h1>
      <h2 className="mt-5 text-2xl font-semibold">Page not found</h2>
      <p className="mt-3 max-w-md text-alert leading-relaxed">
        The page you are looking for does not exist or may have moved. Check the URL, or
        browse our current inventory of vehicles imported from China to Ghana.
      </p>
      <nav className="mt-10 flex flex-wrap gap-3 justify-center">
        <Link
          to="/"
          className="rounded-full bg-action text-onaction px-6 py-3 text-sm font-medium hover:opacity-85 transition-opacity"
        >
          Go home
        </Link>
        <Link
          to="/inventory"
          className="rounded-full border border-line px-6 py-3 text-sm font-medium hover:opacity-85 transition-opacity"
        >
          Browse inventory
        </Link>
        <a
          href="https://wa.me/233536225804?text=Hi%20IzzyAutoBridge%2C%20I%20have%20a%20question"
          rel="noopener"
          className="rounded-full border border-line px-6 py-3 text-sm font-medium hover:opacity-85 transition-opacity"
        >
          WhatsApp us
        </a>
      </nav>
    </section>
  );
}
