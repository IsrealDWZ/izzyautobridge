import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import LegalArticle, { LegalSection } from '../components/LegalArticle';
import { WHATSAPP_NUMBER } from '../utils/constants';

export default function TermsPage() {
  const { hash } = useLocation();

  useEffect(() => {
    document.title = 'Terms of Service — IzzyAutoBridge Ghana';
  }, []);

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hash]);

  return (
    <LegalArticle
      title="Terms of Service"
      updated="10 October 2026"
      intro="These terms govern your use of this website and any vehicle order placed with IzzyAutoBridge Ghana Ltd. Please read them before placing an order."
    >
      <LegalSection title="1. About these terms" id="about">
        <p>
          By using this website or placing an order, you agree to these terms. "We"/"us"
          means IzzyAutoBridge Ghana Ltd, a DVLA Class C licensed vehicle importer based in
          Accra, Ghana. If you do not agree, do not use the site or place an order.
        </p>
      </LegalSection>

      <LegalSection title="2. Our service" id="service">
        <p>We source vehicles from our partners in China and deliver them to Ghana:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>We inspect each vehicle ourselves (road test) and SGS inspects at the port of loading.</li>
          <li>Vehicles ship free — CIF Tema, with ocean freight and marine insurance included in the quoted price.</li>
          <li>Typical transit is about 60 days from payment to arrival at Tema Port.</li>
          <li>You receive video loading proof, Bill of Lading and full documentation via WhatsApp before the vessel sails.</li>
          <li>
            Clearance is handled by your agent (we supply all documents: BL, Commercial
            Invoice, Packing List, SGS Certificate, G-CAP) or by us for a GH₵4,000 service
            fee. You choose per order.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Orders and payment" id="orders">
        <ul className="list-disc pl-5 space-y-1.5">
          <li>A vehicle is secured only after full payment. We do not accept deposits or offer instalments.</li>
          <li>We issue a proforma invoice with a full landed-cost breakdown before you pay.</li>
          <li>Payment is by the methods stated on your proforma. Beware anyone asking you to pay outside that instruction.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Pricing" id="pricing">
        <p>
          Prices shown on vehicle pages are the prices. The final landed cost is confirmed
          in your proforma invoice before you pay and is based on the prevailing exchange
          rate at the time of processing. CIF prices in USD are also shown for
          transparency.
        </p>
      </LegalSection>

      <LegalSection title="5. Delivery" id="delivery">
        <p>
          The typical China-to-Tema transit is about 60 days, but this is an estimate, not a
          guarantee. Actual delivery depends on shipping schedules, customs clearance,
          DVLA registration and factors outside our control (port delays, regulatory
          changes). We will keep you informed of progress via WhatsApp.
        </p>
      </LegalSection>

      <LegalSection title="6. Inspection and vehicle condition" id="inspection">
        <p>
          Every vehicle is road-tested by us and inspected by SGS before loading. Photos,
          mileage, year and specifications on each vehicle page describe the specific unit
          for sale. Our inventory includes both brand-new and pre-owned vehicles — each
          listing states the condition, year and mileage of the specific unit. Any cosmetic
          wear consistent with age and mileage is disclosed in the listing.
        </p>
      </LegalSection>

      <LegalSection title="7. Import compliance" id="compliance">
        <p>
          You are responsible for meeting Ghana's import regulations, including vehicle age
          limits and any duties or levies assessed by Customs. We provide guidance and all
          required documents, but final clearance and DVLA registration are determined by
          the relevant authorities.
        </p>
      </LegalSection>

      <LegalSection title="8. Limitation of liability" id="liability">
        <p>
          To the maximum extent permitted by law, our liability for any claim arising from a
          vehicle order is limited to the amount you paid for that vehicle. We are not
          liable for indirect or consequential losses. Nothing in these terms limits rights
          you have under Ghanaian consumer law that cannot be waived.
        </p>
      </LegalSection>

      <LegalSection title="9. Governing law" id="law">
        <p>These terms are governed by the laws of the Republic of Ghana.</p>
      </LegalSection>

      <LegalSection title="10. Changes to these terms" id="changes">
        <p>
          We may update these terms. The version in effect at the time of your order — the
          one dated on your proforma — is the one that applies to that order.
        </p>
      </LegalSection>

      <LegalSection title="11. Contact" id="contact">
        <p>
          Questions about these terms? Message us on{' '}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline decoration-accent-hover decoration-2 underline-offset-4 hover:text-action transition-colors"
          >
            WhatsApp
          </a>
          .
        </p>
      </LegalSection>
    </LegalArticle>
  );
}
