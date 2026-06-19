import type { SerializedTrialForm } from "@/lib/trial-form";

export type TrialStatus = "new" | "scheduled" | "member" | "archived";

export interface TrialApplication {
  id: string;
  status: TrialStatus;
  submittedAt: string;
  scheduledTrialDate?: string;
  memberPackage?: string;
  data: SerializedTrialForm;
}

export type EventPricingType = "free" | "fixed" | "early_bird";

export interface EventPricing {
  type: EventPricingType;
  price?: number;
  earlyBirdPrice?: number;
  earlyBirdUntil?: string;
  normalPrice?: number;
}

export interface GymEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  guestName?: string;
  guestInstagram?: string;
  bannerImage: string;
  pricing: EventPricing;
  description: string;
  createdAt: string;
}

export type EventPaymentMethod = "twint" | "on_place" | "free";

export interface EventApplication {
  id: string;
  eventId: string;
  name: string;
  email: string;
  phone: string;
  paymentMethod: EventPaymentMethod;
  submittedAt: string;
}

export interface AdminAnalytics {
  totalApplied: number;
  activeRequests: number;
  members: number;
  archived: number;
  followUpNeeded: number;
  upcomingEvents: number;
  eventApplications: number;
}

export type EffectiveTrialStatus =
  | "new"
  | "scheduled"
  | "follow_up"
  | "member"
  | "archived";
