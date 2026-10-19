import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Legal notice",
  description: "Legal notice (mentions légales) of Pearl Solutions: publisher, registration and hosting.",
  alternates: { canonical: "/legal-notice" },
};

export default function LegalNotice() {
  const { legal } = site;
  return (
    <LegalPage title="Legal notice" updated="2026-10-17">
      <p>
        This page gives the information required by article 6 of French law no. 2004-575 of 21 June 2004 on confidence
        in the digital economy (LCEN). A French version is available on request.
      </p>

      <h2>Publisher</h2>
      <dl>
        <dt>Business</dt>
        <dd>
          {legal.owner} EI, trading as {legal.tradingName}
        </dd>
        <dt>Legal form</dt>
        <dd>Sole proprietorship (entreprise individuelle), micro-entreprise tax regime</dd>
        <dt>Registered address</dt>
        <dd>
          {legal.address.street}, {legal.address.postcode} {legal.address.city}, {legal.address.country}
        </dd>
        <dt>SIREN</dt>
        <dd>{legal.siren}</dd>
        <dt>Registration</dt>
        <dd>Registre national des entreprises (RNE)</dd>
        <dt>VAT</dt>
        <dd>TVA non applicable, article 293 B du CGI (VAT not applicable)</dd>
        <dt>Email</dt>
        <dd>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </dd>
        <dt>Publication director</dt>
        <dd>{legal.owner}</dd>
      </dl>

      <h2>Hosting</h2>
      {legal.hosts.map((host) => (
        <dl key={host.name}>
          <dt>Role</dt>
          <dd>{host.role}</dd>
          <dt>Host</dt>
          <dd>{host.name}</dd>
          <dt>Address</dt>
          <dd>{host.address}</dd>
          <dt>Website</dt>
          <dd>
            <a href={host.url} rel="noopener noreferrer">
              {host.url.replace(/^https:\/\/(www\.)?/, "")}
            </a>
          </dd>
        </dl>
      ))}

      <h2>Intellectual property</h2>
      <p>
        The text, design, logo and code of this website belong to {legal.owner} EI, unless stated otherwise. Copying
        or reusing them without written permission is prohibited. The interface examples shown on the site are
        illustrations made for this site; they do not show client work.
      </p>

      <h2>Personal data</h2>
      <p>
        How your data is handled is explained in the <Link href="/privacy-policy">privacy policy</Link>.
      </p>

      <h2>Liability</h2>
      <p>
        The information on this site is provided for general purposes and may change without notice. Links to other
        websites are provided for convenience; {legal.tradingName} is not responsible for their content.
      </p>
    </LegalPage>
  );
}
