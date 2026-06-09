import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { articles } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles about Brazilian Jiu Jitsu, training tips, and the Joshimitsu BJJ community.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="Blog"
        subtitle="Insights, guides, and stories from the Joshimitsu BJJ community."
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                <h2 className="text-lg font-bold text-brand-black">
                  {article.title}
                </h2>
                <p className="mt-2 text-sm text-gray-600">{article.excerpt}</p>
                <Link
                  href={`/blog/${article.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue-dark transition-colors hover:text-brand-blue"
                >
                  Read Article
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-12 text-center text-gray-500">
          More articles coming soon. Connect Supabase to manage blog content from
          the admin panel.
        </p>
      </div>
    </>
  );
}
