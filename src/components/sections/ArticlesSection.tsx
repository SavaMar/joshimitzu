import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { articles } from "@/lib/site-config";

export default function ArticlesSection() {
  return (
    <section className="bg-brand-gray py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-brand-black sm:text-4xl">
            New to BJJ? Start Here
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            If you&apos;re new, I prepared 3 important articles to help you
            understand what Jiu Jitsu is all about.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-brand-black">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{article.excerpt}</p>
                <Link
                  href={`/blog/${article.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue-dark transition-colors hover:text-brand-blue"
                >
                  Read Article
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-block rounded-lg border-2 border-brand-black px-6 py-3 text-base font-semibold text-brand-black transition-colors hover:bg-brand-black hover:text-white"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
