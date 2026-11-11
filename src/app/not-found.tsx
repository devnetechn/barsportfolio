import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[70vh] flex-col justify-center pt-24">
      <h1 className="text-[clamp(2.2rem,5vw,3.5rem)]">This page doesn&apos;t exist</h1>
      <p className="mt-4 max-w-[50ch] text-lg text-graphite">
        The link may be out of date. The case studies and contact details are on the home page.
      </p>
      <p className="mt-8">
        <Link href="/" className="btn btn-primary">
          Go to the home page
        </Link>
      </p>
    </section>
  );
}
