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
  { href: "/trial-training", label: "Trial Training" },
  { href: "/blog", label: "Blog" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const schedule = [
  { day: "Monday", time: "6:45 – 7:45", type: "No-Gi", note: "Early Bird" },
  { day: "Tuesday", time: "6:45 – 7:45", type: "Gi", note: "Early Bird" },
  { day: "Wednesday", time: "6:45 – 7:45", type: "No-Gi", note: "Early Bird" },
  { day: "Friday", time: "6:45 – 7:45", type: "Gi", note: "Early Bird" },
  { day: "Tuesday", time: "18:30 – 20:00", type: "Gi", note: "All Levels" },
  { day: "Thursday", time: "18:30 – 20:00", type: "No-Gi", note: "All Levels" },
  { day: "Saturday", time: "10:00 – 11:30", type: "Gi", note: "Open Mat" },
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
