import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { Services } from "@/components/Services";
import { Stack } from "@/components/stack/Stack";
import { faq } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Stack />
      <Faq items={faq} />
      <Contact />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </>
  );
}
