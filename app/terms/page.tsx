import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "General terms of service of Pearl Solutions for software development projects.",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  const { legal } = site;
  return (
    <LegalPage title="Terms of service" updated="2026-10-17">
      <p>
        These terms apply to every software development service provided by {legal.owner} EI, trading as{" "}
        {legal.tradingName} (SIREN {legal.siren}), referred to below as “the Provider”, to any business or individual
        client (“the Client”). A signed quote may add to or override these terms; where they differ, the quote
        prevails.
      </p>

      <h2>1. Quotes and orders</h2>
      <p>
        Every project starts with a written quote describing the scope, the deliverables, the price and the schedule.
        A quote is valid for 30 days. The order is confirmed when the Client signs the quote (or accepts it in writing)
        and pays any deposit it requires. Work outside the agreed scope is quoted separately.
      </p>

      <h2>2. Prices and payment</h2>
      <p>
        Prices are in euros. VAT is not charged: TVA non applicable, article 293 B du CGI. Unless the quote says
        otherwise, invoices are payable within 30 days by bank transfer. Projects are usually split into milestones,
        each invoiced on delivery.
      </p>
      <p>
        For business clients, late payment incurs penalties at three times the French legal interest rate, plus a
        fixed recovery fee of €40 (article L441-10 of the French Commercial Code). The Provider may suspend work while
        an invoice is overdue.
      </p>

      <h2>3. Delivery and acceptance</h2>
      <p>
        The Client receives each milestone for review and has 10 working days to report any non-conformity with the
        quote. Without a reply in that time, the milestone is considered accepted. Reported defects that fall within
        the scope are fixed at no extra cost.
      </p>

      <h2>4. Client obligations</h2>
      <p>
        The Client provides the content, access and information needed for the project on time, and guarantees that
        they hold the rights to everything they supply. The Client is solely responsible for the use made of the
        software delivered, including compliance with the terms of use of third-party websites and platforms (for
        example Discord, online stores or AI providers). In particular, automated checkout and scraping tools must be
        used in line with the rules of the sites they target.
      </p>

      <h2>5. Intellectual property</h2>
      <p>
        Once the full price has been paid, the Provider assigns to the Client the economic rights to the source code
        written specifically for the project, for the whole world and for the legal duration of copyright. Open-source
        components remain under their own licences. Until full payment, the deliverables remain the property of the
        Provider. The Provider may mention the project in its portfolio unless the Client objects in writing.
      </p>

      <h2>6. Confidentiality</h2>
      <p>
        Both parties keep confidential any information marked or reasonably understood as confidential, during the
        project and for three years afterwards. A separate non-disclosure agreement can be signed on request.
      </p>

      <h2>7. Warranty and liability</h2>
      <p>
        The Provider performs its services with care, under a best-efforts obligation. Bugs reported within 30 days of
        final delivery and caused by the Provider’s work are fixed free of charge. Changes made by the Client or a
        third party, and changes to third-party services (APIs, websites, platforms), are not covered.
      </p>
      <p>
        For business clients, the Provider’s total liability is limited to the amount paid for the project concerned,
        and the Provider is not liable for indirect losses such as lost profits or lost data. Nothing in these terms
        limits liability where the law forbids it.
      </p>

      <h2>8. Maintenance and hosting</h2>
      <p>
        Maintenance and hosting are optional and covered by a separate monthly plan, which either party can end with
        one month’s written notice.
      </p>

      <h2>9. Consumers</h2>
      <p>
        A Client acting as a consumer has 14 days from accepting the quote to withdraw, without giving reasons, by
        writing to <a href={`mailto:${site.email}`}>{site.email}</a>. If the consumer asks for work to start within
        that period, they pay for the work done up to their withdrawal, and lose the right to withdraw once the service
        has been fully performed.
      </p>
      <p>
        In case of a dispute, a consumer may use a consumer mediator free of charge, after first writing to the
        Provider. The mediator’s details are given on request and on every quote.
      </p>

      <h2>10. Termination</h2>
      <p>
        If either party seriously breaches these terms and does not remedy the breach within 15 days of a written
        notice, the other party may end the contract. Work completed up to that date is invoiced.
      </p>

      <h2>11. Governing law</h2>
      <p>
        These terms are governed by French law. The parties will try to settle any dispute amicably first. Failing
        that, disputes with business clients are brought before the courts of Reims, France; consumers may also bring
        proceedings before the court of their place of residence.
      </p>
    </LegalPage>
  );
}
