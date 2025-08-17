
import { MdLocalPharmacy } from "react-icons/md";
import { LuPill, LuHeartPulse, LuShieldCheck, LuTruck } from "react-icons/lu";
import { FiCheckCircle, FiAward } from "react-icons/fi";

/**
 * AboutHolyCare
 * - Modern, unique, responsive About component for the Holy Care app
 * - Built with TailwindCSS + React + react-icons
 * - Drop into any route/page. No external libs required.
 *
 * Usage:
 *   <AboutHolyCare />
 */
export default function AboutHolyCare() {
  const stats = [
    { label: "Active Medicines", value: "12,500+" },
    { label: "Trusted Users", value: "48k+" },
    { label: "Partner Pharmacies", value: "220+" },
    { label: "Avg. Delivery Time", value: "45 min" },
  ];

  const values = [
    {
      icon: <LuShieldCheck className="text-2xl" aria-hidden />,
      title: "Safety First",
      desc: "Licensed sellers, verified batches, and secure handling across the entire chain.",
    },
    {
      icon: <LuPill className="text-2xl" aria-hidden />,
      title: "Genuine Medicine",
      desc: "We source directly from approved distributors — no grey market, ever.",
    },
    {
      icon: <LuHeartPulse className="text-2xl" aria-hidden />,
      title: "Care, Not Just Cart",
      desc: "Reminders, refills, and clear guidance to support your ongoing therapy.",
    },
    {
      icon: <LuTruck className="text-2xl" aria-hidden />,
      title: "Fast & Reliable",
      desc: "Real‑time tracking and SLA-backed delivery in your city.",
    },
  ];

  const milestones = [
    {
      year: "2023",
      title: "The Spark",
      text: "Started as a tiny idea: make medicine access simple, safe, and fast.",
    },
    {
      year: "2024",
      title: "Trusted Rollout",
      text: "Onboarded licensed pharmacies, added secure payments, and verified inventory.",
    },
    {
      year: "2025",
      title: "Smart Platform",
      text: "Launched multi‑vendor marketplace, role‑based dashboards, and live order tracking.",
    },
  ];

  return (
    <>

      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-white to-indigo-50" />
        <div className="container">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
            <div className="w-full lg:w-1/2">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-emerald-700 text-sm font-medium">
                <MdLocalPharmacy aria-hidden /> About Holy Care
              </span>
              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
                Healthcare that feels human —
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-indigo-600">
                  fast, safe, and always authentic.
                </span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
                Holy Care is a multi‑vendor pharmacy platform built for real life. From authentic
                medicines to secure payments and rapid delivery, we connect you to trusted sellers
                with uncompromising quality.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm">
                  <FiCheckCircle className="text-emerald-600" aria-hidden /> Licensed partners
                </span>
                <span className="inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm">
                  <FiAward className="text-indigo-600" aria-hidden /> Quality assurance
                </span>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              {/* Decorative / Feature Card */}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                      <LuPill className="text-emerald-700 text-2xl" aria-hidden />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Real medicines, real fast</h3>
                      <p className="mt-1 text-sm text-gray-600">Track orders live, receive sealed packs, and verify batches.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
                      <LuShieldCheck className="text-indigo-700 text-xl" aria-hidden />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Secure by design</h4>
                      <p className="mt-1 text-sm text-gray-600">Payments, PII, and health data handled with care.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                      <LuTruck className="text-emerald-700 text-xl" aria-hidden />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Delivery you can trust</h4>
                      <p className="mt-1 text-sm text-gray-600">Fast, insured, and SLA‑backed in supported areas.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-gray-100 hover:shadow-md transition-shadow"
              >
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{s.value}</p>
                <p className="mt-1 text-xs sm:text-sm text-gray-600">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values grid */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">What we stand for</h2>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              Our promise blends authenticity, speed, and security — so your care stays the focus.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-gray-100 bg-gradient-to-b from-white to-gray-50 p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center rounded-xl bg-gray-100 p-3 mb-3">
                  {v.icon}
                </div>
                <h3 className="font-semibold text-gray-900">{v.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Milestones */}
      <section className="py-204 lg:py-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">Milestones</h2>
            <p className="mt-2 text-gray-600">A quick view of how Holy Care grew into your trusted pharmacy platform.</p>
          </div>
          <ol className="relative border-s border-indigo-200">
            {milestones.map((m, idx) => (
              <li key={idx} className="mb-10 ms-6">
                <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 ring-4 ring-white">
                  <span className="h-2.5 w-2.5 rounded-full bg-white" />
                </span>
                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
                  <div className="flex items-center gap-2 text-sm text-indigo-700 font-medium">
                    <span>{m.year}</span>
                    <span className="h-1 w-1 rounded-full bg-indigo-200" />
                    <span>{m.title}</span>
                  </div>
                  <p className="mt-2 text-gray-700 text-sm">{m.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container">
          <div className="rounded-3xl bg-gradient-to-r from-emerald-600 to-indigo-600 p-8 sm:p-10 text-white shadow-lg">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="flex-1">
                <h3 className="text-2xl sm:text-3xl font-semibold">Your health, one tap away</h3>
                <p className="mt-2 text-sm sm:text-base text-emerald-50 max-w-2xl">
                  Browse genuine medicines, add to cart, and get fast delivery with real‑time updates.
                </p>
              </div>
              <div className="flex gap-3">
                <a href="/shop" className="inline-flex items-center justify-center rounded-2xl bg-white/95 px-5 py-3 text-sm font-semibold text-emerald-700 shadow hover:bg-white">
                  Start Shopping
                </a>
                <a href="/contact" className="inline-flex items-center justify-center rounded-2xl bg-black/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-black/20">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
