import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { Fragment } from "@/components/fragments/Fragments";
import { JsonLd } from "@/components/JsonLd";
import { faq as generalFaq, getService, services, site } from "@/lib/site";
import styles from "./service.module.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  const url = `/services/${service.slug}`;
  return {
    title: service.title,
    description: service.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: `${service.title} · Pearl Solutions`, description: service.metaDescription, url },
    twitter: { title: `${service.title} · Pearl Solutions`, description: service.metaDescription },
  };
}

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);
  const items = [...service.faq, ...generalFaq.slice(0, 3)];

  return (
    <>
      <section className={styles.hero} aria-labelledby="service-title">
        <div className={styles.spotlight} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <nav aria-label="Breadcrumb" className="chip">
            <span className={styles.dot} style={{ background: service.disc }} aria-hidden="true" />
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/#services">Services</Link>
          </nav>
          <h1 id="service-title" className={`display ${styles.title}`}>
            {service.h1}
          </h1>
          <p className={styles.intro}>{service.intro}</p>
          <div className={styles.actions}>
            <Link href="#contact" className="btn btn-primary btn-lg">
              Start a project
            </Link>
            <Link href="#builds" className="btn btn-ghost btn-lg">
              What I build
            </Link>
          </div>
          <div className={styles.stage} aria-hidden="true">
            <span className={styles.halo} style={{ "--tint": service.disc } as React.CSSProperties} />
            <div className={styles.ui}>
              <Fragment slug={service.slug} />
            </div>
          </div>
        </div>
      </section>

      <section id="builds" className="section" aria-labelledby="builds-title">
        <div className="container">
          <div className="section-head">
            <h2 id="builds-title" className="h2" data-reveal>
              Typical <em>builds</em>
            </h2>
            <p data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              Starting points, not packages. Every build is scoped around your needs.
            </p>
          </div>
          <div className={styles.split}>
            <ul className={styles.builds}>
              {service.builds.map((b, i) => (
                <li key={b.name} className={`card ${styles.build}`} data-reveal style={{ "--i": i } as React.CSSProperties}>
                  <span className={styles.tag}>{b.stack}</span>
                  <h3 className="h3">{b.name}</h3>
                  <p>{b.detail}</p>
                </li>
              ))}
            </ul>
            <div className={`card ${styles.included}`} data-reveal>
              <h3 className="h3">Always included</h3>
              <ul>
                {service.included.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>


      <Faq
        items={items}
        id="service-faq"
        title={
          <>
            Before <em>you ask</em>
          </>
        }
        intro="What people usually ask before we start."
      />

      <section className={styles.others} aria-labelledby="others-title">
        <div className="container">
          <h2 id="others-title" className={styles.othersTitle}>
            Also built to order
          </h2>
          <ul className={styles.othersList}>
            {others.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="btn btn-ghost btn-lg">
                  <span className={styles.dot} style={{ background: s.disc }} aria-hidden="true" />
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Contact />

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.metaDescription,
            serviceType: service.name,
            url: `${site.url}/services/${service.slug}`,
            provider: { "@id": `${site.url}/#organization` },
            areaServed: "Worldwide",
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: site.url },
              { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/#services` },
              { "@type": "ListItem", position: 3, name: service.title, item: `${site.url}/services/${service.slug}` },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]}
      />
    </>
  );
}
