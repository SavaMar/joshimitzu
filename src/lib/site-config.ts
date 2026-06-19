export const siteConfig = {
  name: "Joshimitsu BJJ",
  tagline: "Brazilian Jiu-Jitsu for adults and children — modern, effective, athletic.",
  owner: "Aljoscha Hilse",
  address: {
    street: "Industriestrasse 6",
    city: "4562 Biberist",
    country: "Switzerland",
  },
  email: "info@joshimitsubjj.ch",
  phone: "+41 76 598 50 53",
  phoneDisplay: "(+41) 765985053",
  whatsapp: "41765985053",
  social: {
    whatsapp: "https://wa.me/41765985053",
    instagram: "https://www.instagram.com/joshimitsubjj/",
    facebook: "https://www.facebook.com/joshimitsubjj/",
    email: "mailto:info@joshimitsubjj.ch",
  },
};

export const navLinks = [
  { href: "/what-is-bjj", label: "What is BJJ?" },
  { href: "/kids-training", label: "Kids Training" },
  { href: "/prices", label: "Prices" },
  { href: "/schedule", label: "Schedule" },
  { href: "/blog", label: "Blog" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export type ClassType = "Nogi" | "Gi" | "Sparring";
export type ClassLevel =
  | "All levels"
  | "Level 1"
  | "Level 2"
  | "Basics"
  | "Members only";
export type ClassCategory = "Early Bird" | "Kids" | "Adult";

export interface ScheduleClass {
  time: string;
  type: ClassType;
  level: ClassLevel;
  category: ClassCategory;
}

export interface ScheduleDay {
  day: string;
  classes: ScheduleClass[];
}

export const weeklySchedule: ScheduleDay[] = [
  {
    day: "Monday",
    classes: [
      { time: "06.45 - 07.45", type: "Nogi", level: "All levels", category: "Early Bird" },
      { time: "16:00 - 17:00", type: "Gi", level: "Level 1", category: "Kids" },
      { time: "17:15 - 18:15", type: "Gi", level: "Level 2", category: "Kids" },
      { time: "18:30 - 19:30", type: "Gi", level: "Basics", category: "Adult" },
      { time: "19.45 - 20.45", type: "Gi", level: "All levels", category: "Adult" },
    ],
  },
  {
    day: "Tuesday",
    classes: [
      { time: "06.45 - 07.45", type: "Gi", level: "All levels", category: "Early Bird" },
      { time: "16:00 - 17:00", type: "Gi", level: "Level 1", category: "Kids" },
      { time: "17:15 - 18:15", type: "Gi", level: "Level 2", category: "Kids" },
      { time: "18:30 - 20:00", type: "Nogi", level: "All levels", category: "Adult" },
    ],
  },
  {
    day: "Wednesday",
    classes: [
      { time: "06.45 - 07.45", type: "Nogi", level: "All levels", category: "Early Bird" },
      { time: "16:00 - 17:00", type: "Nogi", level: "Level 1", category: "Kids" },
      { time: "17:15 - 18:15", type: "Nogi", level: "Level 2", category: "Kids" },
      { time: "18:30 - 19:30", type: "Gi", level: "Basics", category: "Adult" },
      { time: "19.45 - 20.45", type: "Gi", level: "All levels", category: "Adult" },
    ],
  },
  {
    day: "Thursday",
    classes: [
      { time: "16:00 - 17:00", type: "Gi", level: "Level 1", category: "Kids" },
      { time: "17:15 - 18:15", type: "Gi", level: "Level 2", category: "Kids" },
      { time: "18:30 - 20:00", type: "Nogi", level: "All levels", category: "Adult" },
    ],
  },
  {
    day: "Friday",
    classes: [
      { time: "06.45 - 07.45", type: "Gi", level: "All levels", category: "Early Bird" },
      { time: "18:00 - 19:15", type: "Sparring", level: "Members only", category: "Adult" },
    ],
  },
];

export const reviews = [
  {
    name: "Marco S.",
    text: "I was nervous before my first class, but the team made me feel welcome from minute one. Best decision I've made this year.",
    rating: 5,
  },
  {
    name: "Sarah K.",
    text: "My son loves the kids class. He's more confident, focused, and actually looks forward to training every week.",
    rating: 5,
  },
  {
    name: "Thomas B.",
    text: "Great structure, excellent coaching, and a friendly atmosphere. You progress at your own pace without pressure.",
    rating: 5,
  },
];

export const faqItems = [
  {
    question: "Do I need to be fit to start?",
    answer:
      "No. BJJ meets you where you are. You don't need prior fitness, flexibility, or martial arts experience to begin.",
  },
  {
    question: "Will I have to fight during trial training?",
    answer:
      "No. Trial sessions focus on basics, movement, and getting comfortable on the mats. You won't be thrown into sparring.",
  },
  {
    question: "What should I wear to my first class?",
    answer:
      "Comfortable sportswear without zippers or buttons. We'll provide guidance on getting a gi if you decide to continue.",
  },
  {
    question: "Is BJJ safe for children?",
    answer:
      "Yes. Kids classes are structured for age-appropriate learning with emphasis on respect, control, and fun.",
  },
  {
    question: "How often should I train?",
    answer:
      "Most beginners start with 2–3 sessions per week. Consistency matters more than intensity when you're starting out.",
  },
];

export const articles = [
  {
    slug: "how-jiu-jitsu-affects-you",
    title: "How Jiu Jitsu Affects You",
    excerpt:
      "Discover how regular training transforms your body, mind, and daily life — from stress relief to real self-confidence.",
    image: "/images/about_1.jpg",
  },
  {
    slug: "how-it-changes-kids",
    title: "How It Changes Kids",
    excerpt:
      "BJJ builds focus, resilience, and social skills in children — all while they have fun rolling with friends.",
    image: "/images/about_2.jpg",
  },
  {
    slug: "bjj-levels-you-can-reach",
    title: "BJJ Levels That You Can Reach",
    excerpt:
      "From white belt to black belt — understand the journey, what each rank means, and how progress really works.",
    image: "/images/about_3.jpg",
  },
];

export const trainerPhotos = [
  { src: "/images/about_1.jpg", alt: "Trainer Aljoscha Hilse portrait" },
  { src: "/images/about_2.jpg", alt: "Trainer with student" },
  { src: "/images/about_3.jpg", alt: "Training session with instructor" },
];

export interface PricePack {
  term: string;
  price: number;
  discountedPrice?: number;
  discountedLabel?: string;
  registrationFee: number;
  audience: string;
  value: string;
  includes: string[];
  feelAfter: string;
  highlighted?: boolean;
}

export interface PricingCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  accent: "blue" | "green" | "purple";
  packs: PricePack[];
}

export const pricingCategories: PricingCategory[] = [
  {
    id: "adult",
    title: "Adult Training",
    subtitle: "Ages 16 and over",
    description:
      "Structured Gi and No-Gi classes for every level — from complete beginners to active competitors. Train before work with Early Bird sessions or in the evening after your day.",
    accent: "blue",
    packs: [
      {
        term: "6-month term",
        price: 800,
        discountedPrice: 600,
        discountedLabel: "Pupils / Students / Apprentices",
        registrationFee: 50,
        audience: "Adults (aged 16 and over)",
        value: "Six months is enough to build real habits and see your first belt progress.",
        includes: [
          "Unlimited adult Gi & No-Gi classes",
          "Early Bird sessions before work",
          "Structured curriculum for all levels",
          "Open mat access",
        ],
        feelAfter:
          "You'll walk in unsure and leave knowing you belong — fitter, more confident, and connected to a team that pushes you forward.",
      },
      {
        term: "12-month term",
        price: 1100,
        discountedPrice: 900,
        discountedLabel: "Pupils / Students / Apprentices",
        registrationFee: 50,
        audience: "Adults (aged 16 and over)",
        value: "The sweet spot for commitment and savings — BJJ becomes part of your weekly rhythm.",
        includes: [
          "Everything in the 6-month plan",
          "Sparring and competition prep sessions",
          "Priority access to seminars & events",
          "Best value per month for regular training",
        ],
        feelAfter:
          "Training feels natural, not forced. You'll notice real skill growth, better fitness, and a community you genuinely look forward to seeing.",
        highlighted: true,
      },
      {
        term: "24-month term",
        price: 1800,
        discountedPrice: 1500,
        discountedLabel: "Pupils / Students / Apprentices",
        registrationFee: 50,
        audience: "Adults (aged 16 and over)",
        value: "For those ready to commit long-term — maximum savings and the deepest investment in your journey.",
        includes: [
          "Full membership with all class types",
          "Long-term coaching relationship",
          "Competition & sparring access",
          "Lowest monthly cost over two years",
        ],
        feelAfter:
          "BJJ isn't something you do — it's who you're becoming. You'll feel grounded, capable, and proud of how far you've come.",
      },
    ],
  },
  {
    id: "youth",
    title: "Youth Training",
    subtitle: "Ages 7 to 15",
    description:
      "Age-appropriate classes that channel natural energy into focus, respect, and real skill. Kids learn through play and structured technique — building confidence that carries into school and life.",
    accent: "green",
    packs: [
      {
        term: "6-month term",
        price: 600,
        registrationFee: 30,
        audience: "Children and young people (7 to 15 years)",
        value: "Half a year to discover whether BJJ clicks — most kids are hooked after the first month.",
        includes: [
          "Age-appropriate Gi or No-Gi classes",
          "Level 1 & Level 2 group placement",
          "Fun, structured coaching",
          "Safe, supervised environment",
        ],
        feelAfter:
          "Your child will stand taller — more focused at school, more confident with peers, and excited to tell you what they learned on the mats.",
      },
      {
        term: "12-month term",
        price: 900,
        registrationFee: 30,
        audience: "Children and young people (7 to 15 years)",
        value: "A full year of growth — enough time for real technique development and lasting friendships.",
        includes: [
          "Everything in the 6-month plan",
          "Belt progression tracking",
          "Competition opportunities (optional)",
          "Better monthly rate than short-term",
        ],
        feelAfter:
          "You'll see a child who handles frustration better, listens more carefully, and genuinely loves showing up twice a week.",
        highlighted: true,
      },
      {
        term: "24-month term",
        price: 1500,
        registrationFee: 30,
        audience: "Children and young people (7 to 15 years)",
        value: "The best long-term investment in your child's physical and mental development.",
        includes: [
          "Full youth membership",
          "Long-term coach relationship",
          "Competition prep when ready",
          "Lowest cost per month",
        ],
        feelAfter:
          "BJJ becomes part of who they are — disciplined, resilient, and proud of earning every stripe and belt.",
      },
    ],
  },
  {
    id: "minis",
    title: "Kids Minis",
    subtitle: "Ages 3 to 6",
    description:
      "Our youngest program introduces movement, coordination, and social skills through playful BJJ fundamentals — always age-appropriate, always fun.",
    accent: "purple",
    packs: [
      {
        term: "3-month term",
        price: 400,
        registrationFee: 30,
        audience: "Children aged 3 to 6 years",
        value: "A gentle introduction — perfect for testing whether your little one enjoys the mats.",
        includes: [
          "Short, playful sessions",
          "Coordination & body awareness games",
          "Social skills through partner play",
          "Patient, experienced coaches",
        ],
        feelAfter:
          "Your child will come home buzzing with energy — more coordinated, more social, and asking when they can go back.",
      },
      {
        term: "6-month term",
        price: 650,
        registrationFee: 30,
        audience: "Children aged 3 to 6 years",
        value: "Enough time for real motor skill development and a smooth transition into youth classes.",
        includes: [
          "Everything in the 3-month plan",
          "Progression toward youth program",
          "Better value over six months",
          "Consistent routine they can count on",
        ],
        feelAfter:
          "You'll watch them grow from shy observer to confident participant — ready for the next step in their BJJ journey.",
        highlighted: true,
      },
    ],
  },
];

export const kidsTrainingBenefits = [
  {
    title: "Social Skills",
    description:
      "Contact sports teach children to read others, set boundaries, and resolve conflicts without fear or aggression.",
  },
  {
    title: "Self-Confidence",
    description:
      "Every new technique mastered builds real achievement — shy kids find their voice through positive reinforcement.",
  },
  {
    title: "Body Awareness",
    description:
      "Kids naturally move on the ground. BJJ channels that instinct into structured, complex movement patterns.",
  },
  {
    title: "Focus & Discipline",
    description:
      "The mat is a classroom where listening, following directions, and showing up consistently are rewarded.",
  },
  {
    title: "Emotional Regulation",
    description:
      "Learning to tap, congratulate partners, and handle frustration builds character that transfers to school and home.",
  },
  {
    title: "Pure Fun",
    description:
      "Beyond all the benefits — kids love it. Rolling with friends is play, and they can't wait to come back.",
  },
];

export const kidsTraining = {
  heroImage: "/images/about_2.jpg",
  galleryImages: [
    { src: "/images/about_1.jpg", alt: "Kids BJJ training session" },
    { src: "/images/about_2.jpg", alt: "Coach working with young student" },
    { src: "/images/about_3.jpg", alt: "Children training together on the mats" },
  ],
  videoUrl: siteConfig.social.instagram,
  videoPoster: "/images/about_3.jpg",
};
