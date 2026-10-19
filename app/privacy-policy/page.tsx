import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Pearl Solutions collects, uses and protects your personal data, in line with the GDPR.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicy() {
  const { legal } = site;
  return (
    <LegalPage title="Privacy policy" updated="2026-10-17">
      <p>
        This policy explains what personal data {legal.tradingName} collects through this website, why, and what your
        rights are under the General Data Protection Regulation (EU 2016/679, “GDPR”) and the French Data Protection
        Act.
      </p>

      <h2>Data controller</h2>
      <p>
        {legal.owner} EI, trading as {legal.tradingName}, {legal.address.street}, {legal.address.postcode}{" "}
        {legal.address.city}, {legal.address.country}. Contact: <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>What is collected</h2>
      <h3>When you use the contact form or write by email</h3>
      <ul>
        <li>your name and email address;</li>
        <li>the services you select and the description of your project;</li>
        <li>any other information you choose to share in your message.</li>
      </ul>
      <h3>When you browse the site</h3>
      <p>
        The host records technical logs (IP address, browser, pages requested, date and time) needed to deliver the
        site and keep it secure. The site sets no advertising or analytics cookies and does not track you across
        other websites. Fonts are served from this site, not from a third party.
      </p>

      <h2>Why, and on what legal basis</h2>
      <ul>
        <li>
          Answering your enquiry and preparing a quote: steps taken at your request before a contract (article 6(1)(b)
          GDPR).
        </li>
        <li>Performing a contract once signed, and invoicing: contract and legal obligations (article 6(1)(b) and (c)).</li>
        <li>Keeping the site secure and preventing spam: legitimate interest (article 6(1)(f)).</li>
      </ul>

      <h2>Who receives it</h2>
      <p>
        Your data is used only by {legal.owner}. It is never sold or rented. It is processed by the following
        service providers, solely on our behalf:
      </p>
      <ul>
        <li>Vercel Inc., which hosts the website;</li>
        <li>OVH SAS, which provides the domain name and servers, in France;</li>
        <li>Discord Inc., whose service receives contact-form messages;</li>
        <li>the email provider used to reply to you.</li>
      </ul>
      <p>
        Some of these providers are based in the United States. Transfers rely on the EU–US Data Privacy Framework or
        on the European Commission’s standard contractual clauses.
      </p>

      <h2>How long it is kept</h2>
      <ul>
        <li>Enquiries that do not lead to a project: 3 years from your last message.</li>
        <li>Client data: for the duration of the contract, then archived for the periods required by law (10 years for accounting records).</li>
        <li>Technical logs: no more than 12 months.</li>
      </ul>

      <h2>Your rights</h2>
      <p>
        You can access, correct or delete your data, restrict or object to its use, and ask for a copy in a portable
        format. You can also give instructions about what happens to your data after your death. To use any of these
        rights, write to <a href={`mailto:${site.email}`}>{site.email}</a>. You will get an answer within one month.
      </p>
      <p>
        If you believe your rights have not been respected, you can complain to the French data protection authority,
        the CNIL (<a href="https://www.cnil.fr" rel="noopener noreferrer">cnil.fr</a>).
      </p>

      <h2>Security</h2>
      <p>
        The site is served over HTTPS, access to messages is restricted to {legal.owner}, and accounts are protected
        by strong passwords and two-factor authentication.
      </p>

      <h2>Changes</h2>
      <p>This policy may be updated. The date at the top of the page shows the latest version.</p>
    </LegalPage>
  );
}
