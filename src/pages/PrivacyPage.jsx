import { useEffect } from 'react';

import LegalArticle, { LegalSection } from '../components/LegalArticle';
import { WHATSAPP_NUMBER } from '../utils/constants';

export default function PrivacyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy — IzzyAutoBridge Ghana';
  }, []);

  return (
    <LegalArticle
      title="Privacy Policy"
      updated="10 October 2026"
      intro="We collect almost nothing. This page explains exactly what the izzyautobridge.vercel.app website does with your information — in plain language. We run Google Analytics, but only if you allow it."
    >
      <LegalSection title="Who we are" id="who">
        <p>
          IzzyAutoBridge Ghana Ltd is a licensed vehicle importer based in Accra, Ghana
          (DVLA Class C). We import vehicles from China to Tema Port with transparent
          landed costs. This policy covers our website only.
        </p>
      </LegalSection>

      <LegalSection title="What this website collects" id="collect">
        <p>
          <strong>Nothing about you is sent to us by the website itself.</strong> There are
          no accounts, no payment forms, no email signups, and no server-side logs of your
          personal details that we access. Prices, inventory and pages are served statically.
        </p>
        <p>
          If you contact us through WhatsApp, your name, number and messages are handled by
          WhatsApp (Meta) under their own privacy policy. We only see what you choose to
          send in that chat.
        </p>
      </LegalSection>

      <LegalSection title="Local storage (saved on your device)" id="storage">
        <p>The website stores a few things in your browser's local storage:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Your saved/favorite vehicles</li>
          <li>Your vehicle comparison selections</li>
          <li>Your light/dark theme choice</li>
          <li>
            Your analytics consent choice (accepted or declined), so we can remember it
          </li>
        </ul>
        <p>
          This data stays on your device. It is never transmitted to us or to any third
          party by the site. Clearing your browser storage removes it permanently.
        </p>
      </LegalSection>

      <LegalSection title="Cookies" id="cookies">
        <p>
          <strong>This website does not use cookies.</strong> Google Analytics uses
          browser storage rather than advertising cookies, and it only activates if you
          accept the analytics consent banner. If we ever add other cookie-based tools, we
          will update this page and ask for your consent first.
        </p>
      </LegalSection>

      <LegalSection title="Analytics (Google Analytics)" id="analytics">
        <p>
          We use <strong>Google Analytics 4</strong> to understand aggregate usage — which
          pages are viewed and how people reach the site. It is not used for advertising.
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <strong>Off until you accept.</strong> Google Analytics is loaded and enabled
            only after you click Accept on the consent banner. If you decline (or ignore
            the banner), no analytics data is collected.
          </li>
          <li>
            <strong>Anonymised IP.</strong> We enable IP anonymisation so your address is
            not stored in full.
          </li>
          <li>
            <strong>No ad profile.</strong> We do not use Google's advertising features,
            remarketing, or audience personalisation.
          </li>
          <li>
            <strong>Opt out any time.</strong> Clear this site's storage (or use your
            browser's "clear data") to reset your choice; the banner will ask again. You
            can also use Google's browser opt-out tools.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Third-party services the site touches" id="third-party">
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <strong>Hosting (Vercel).</strong> Our site is served by Vercel, which
            processes standard web-server data (IP address, user agent) to deliver pages.
          </li>
          <li>
            <strong>WhatsApp (Meta).</strong> Only when you tap a WhatsApp link or widget;
            the chat is governed by Meta's terms.
          </li>
          <li>
            <strong>Exchange-rate API.</strong> We fetch a public USD/GHS rate at build time
            to calculate displayed prices. No personal data is sent.
          </li>
          <li>
            <strong>Google Analytics.</strong> Runs only if you accept the consent banner.
            Measures aggregate page usage; no advertising profile is built.
          </li>
          <li>
            <strong>Google site verification.</strong> A single verification tag proves to
            Google that we own this site for Search Console. It is not tracking.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Your rights under Ghana's Data Protection Act, 2012" id="rights">
        <p>
          Ghana's Data Protection Act gives you the right to ask what personal data we hold
          about you and to have it corrected or deleted. The website itself does not collect
          personal details for accounts or orders — and analytics, if you allow it, is
          aggregate and anonymised. You are welcome to ask, and we will confirm.
        </p>
      </LegalSection>

      <LegalSection title="Children's privacy" id="children">
        <p>
          This website is intended for adults making vehicle purchases. We do not knowingly
          collect data from anyone.
        </p>
      </LegalSection>
      <LegalSection title="Changes to this policy" id="changes">
        <p>
          If we change how the site handles data, this page will be updated and the "last
          updated" date revised before those changes take effect.
        </p>
      </LegalSection>

      <LegalSection title="Contact" id="contact">
        <p>
          Questions about privacy? Message us on{' '}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline decoration-accent-hover decoration-2 underline-offset-4 hover:text-action transition-colors"
          >
            WhatsApp
          </a>
          . We are a small Accra-based team — a real person will reply.
        </p>
      </LegalSection>
    </LegalArticle>
  );
}
