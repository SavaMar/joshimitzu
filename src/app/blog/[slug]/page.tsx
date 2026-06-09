import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { articles } from "@/lib/site-config";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

const articleContent: Record<string, string[]> = {
  "how-jiu-jitsu-affects-you": [
    "Training Brazilian Jiu Jitsu changes you in ways that extend far beyond the mats. Physically, you'll develop functional strength, flexibility, and cardiovascular endurance — but unlike repetitive gym workouts, every session presents new puzzles to solve.",
    "Mentally, BJJ demands presence. You can't scroll your phone while someone is trying to pass your guard. This forced mindfulness becomes a form of meditation, clearing your head and reducing stress.",
    "Socially, BJJ creates bonds unlike any other sport. You spend hours in close contact with training partners, building trust through shared struggle. The ego stays on the shelf — everyone taps, everyone learns.",
    "Many practitioners report improved sleep, better posture, increased confidence in daily life, and a sense of belonging to something larger than themselves.",
  ],
  "how-it-changes-kids": [
    "For children, Brazilian Jiu Jitsu is more than a sport — it's a development tool disguised as play. Kids naturally love rolling on the ground, and BJJ channels that instinct into structured learning.",
    "Focus and concentration improve as children learn to pay attention to instructions and execute techniques. The mat becomes a classroom where listening and following directions are rewarded with fun.",
    "Confidence grows with every new technique mastered. Children who may have been shy or uncertain find their voice through achievement and positive reinforcement from coaches and peers.",
    "BJJ also teaches respect, discipline, and emotional regulation. Learning to tap when caught, congratulating partners after rolling, and showing up consistently builds character that transfers to school and home life.",
  ],
  "bjj-levels-you-can-reach": [
    "The BJJ belt system represents a journey of years, not months. Each rank is earned through consistent training, demonstrated skill, and time on the mats.",
    "White belt is where everyone begins. This phase is about learning fundamentals — how to move, how to escape, how to survive. It's humbling and exciting in equal measure.",
    "Blue belt typically comes after 1–2 years of consistent training. At this level, you start connecting techniques and developing your own game. Many consider blue belt the most challenging belt because you now know enough to realize how much you don't know.",
    "Purple, brown, and black belts represent deep expertise developed over many years. But the journey doesn't end at black belt — in BJJ, learning never stops. Every roll is a chance to grow.",
  ],
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  const content = articleContent[slug];

  if (!article || !content) {
    notFound();
  }

  return (
    <>
      <div className="relative h-64 sm:h-80">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 to-transparent" />
        <div className="absolute bottom-0 mx-auto w-full max-w-3xl px-4 pb-8 sm:px-6">
          <Link
            href="/blog"
            className="text-sm text-brand-blue hover:underline"
          >
            &larr; Back to Blog
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            {article.title}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-6 text-gray-700">
          {content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-brand-blue/10 p-8 text-center">
          <p className="font-semibold text-brand-black">
            Want to experience BJJ yourself?
          </p>
          <Link
            href="/trial-training"
            className="mt-4 inline-block rounded-lg bg-brand-blue px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-blue-dark"
          >
            Book Free Trial
          </Link>
        </div>
      </div>
    </>
  );
}
