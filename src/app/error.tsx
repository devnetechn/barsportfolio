"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container-page flex min-h-[80vh] flex-col justify-center pt-28 pb-20">
      <h1 className="display display-lg max-w-[14ch]">This page didn&apos;t load</h1>
      <p className="lede mt-8">
        Something went wrong while rendering it. Try again, or go back to the home page.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className="btn btn-primary">
          Try again
        </button>
        <Link href="/" className="btn btn-secondary">
          Go to the home page
        </Link>
      </div>
    </section>
  );
}
