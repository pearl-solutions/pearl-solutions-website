import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="section" style={{ minHeight: "80svh", display: "grid", placeItems: "center", paddingTop: 140 }}>
      <div className="container" style={{ display: "grid", justifyItems: "center", gap: 20, textAlign: "center" }}>
        <Logo size={96} />
        <h1 className="display">
          No pearl <em>here</em>
        </h1>
        <p className="muted">This page does not exist or has moved.</p>
        <Link href="/" className="btn btn-primary btn-lg">
          Back to the home page
        </Link>
      </div>
    </section>
  );
}
