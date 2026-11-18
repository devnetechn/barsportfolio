import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[80vh] flex-col justify-center pt-28 pb-20">
      <h1 className="display display-lg max-w-[14ch]">This page doesn&apos;t exist</h1>
      <p className="lede mt-8">
        The link may be out of date. The work, case studies and contact details are on the home page.
      </p>
      <p className="mt-10">
        <Link href="/" className="btn btn-primary">
          Go to the home page
        </Link>
      </p>
    </section>
  );
}
