"use client";

import { useState } from "react";
import type { GymEvent } from "@/lib/admin-types";
import { useAdminStore } from "@/lib/admin-store";

export default function EventApplyModal({
  event,
  onClose,
}: {
  event: GymEvent;
  onClose: () => void;
}) {
  const { addEventApplication } = useAdminStore();
  const isFree = event.pricing.type === "free";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"twint" | "on_place" | "">(
    "",
  );
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const submit = () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (!isFree && !paymentMethod) {
      setError("Please choose a payment method.");
      return;
    }
    addEventApplication({
      eventId: event.id,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      paymentMethod: isFree ? "free" : (paymentMethod as "twint" | "on_place"),
    });
    setDone(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        {done ? (
          <div className="text-center">
            <h3 className="text-xl font-bold text-brand-black">You&apos;re signed up!</h3>
            <p className="mt-2 text-sm text-gray-600">
              We&apos;ve received your application for {event.name}. We&apos;ll
              be in touch shortly.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-lg bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-brand-black">
              Apply — {event.name}
            </h3>
            {isFree && (
              <p className="mt-2 text-sm font-medium text-green-700">
                This event is free — no payment required.
              </p>
            )}
            <div className="mt-4 space-y-4">
              <label className="block text-sm">
                <span className="font-medium">Full name *</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                />
              </label>
              <label className="block text-sm">
                <span className="font-medium">Email *</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                />
              </label>
              <label className="block text-sm">
                <span className="font-medium">Phone *</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                />
              </label>
              {!isFree && (
                <div>
                  <span className="text-sm font-medium">Payment *</span>
                  <div className="mt-2 grid gap-2">
                    {[
                      { id: "twint" as const, label: "Pay with Twint" },
                      { id: "on_place" as const, label: "Pay on place" },
                    ].map(({ id, label }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setPaymentMethod(id)}
                        className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
                          paymentMethod === id
                            ? "border-brand-blue bg-brand-blue text-white"
                            : "border-gray-200"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
            </div>
            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={submit}
                className="flex-1 rounded-lg bg-brand-blue py-2.5 text-sm font-semibold text-white"
              >
                Submit application
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
