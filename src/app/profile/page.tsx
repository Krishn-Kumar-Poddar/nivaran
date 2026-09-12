 "use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Role = "member" | "industry" | "university";

const profiles = {
  member: {
    role: "Member",
    name: "Ujjwal Bhardwaj",
    location: "Hyderabad, India",
    initials: "UB",
    about:
      "Passionate about technology, innovation, and solving real-world societal problems.",
    interests: ["Technology", "Innovation", "Sustainability", "Education"],
    skills: ["Web Development", "Problem Solving", "Python", "C"],
    stats: [
      ["12", "Challenges Joined"],
      ["5", "Solutions Submitted"],
      ["3", "Completed"],
    ],
    primaryTitle: "My Challenges",
    primaryItems: [
      ["Water Management in Rural Areas", "Joined"],
      ["Smart Waste Management", "Joined"],
    ],
    secondaryTitle: "My Solutions",
    secondaryItems: [
      ["Smart Waste Management System", "Submitted"],
      ["Low-Cost Water Purification", "Submitted"],
    ],
  },
  industry: {
    role: "Industry",
    name: "Tata Consultancy Services",
    location: "Mumbai, Maharashtra, India",
    initials: "TC",
    about:
      "Technology and consulting organization working with communities and institutions to develop scalable solutions for real-world challenges.",
    industryType: "Information Technology & Services",
    website: "https://www.tcs.com",
    interests: ["Digital Transformation", "AI & ML", "Sustainability", "Smart Cities"],
    stats: [
      ["18", "Challenges Posted"],
      ["7", "Active Challenges"],
      ["42", "Solutions Received"],
    ],
    primaryTitle: "Active Challenges",
    primaryItems: [
      ["AI for Public Service Delivery", "Open"],
      ["Digital Solutions for Rural Healthcare", "Open"],
      ["Smart City Resource Management", "Open"],
    ],
    secondaryTitle: "Collaborations",
    secondaryItems: [
      ["University Innovation Program", "Active"],
      ["Student Technology Challenge", "Completed"],
    ],
  },
  university: {
    role: "University",
    name: "Nivaran University",
    location: "Amaravati, Andhra Pradesh, India",
    initials: "NU",
    about:
      "A collaborative academic community focused on innovation, research, entrepreneurship, and solving challenges that create meaningful social impact.",
    website: "https://www.nivaran.example",
    departments: ["Computer Science", "Electronics", "Mechanical", "Management"],
    interests: ["Research", "Innovation", "Sustainability", "Social Impact"],
    stats: [
      ["15", "Challenges Posted"],
      ["320", "Student Participants"],
      ["27", "Solutions Submitted"],
    ],
    primaryTitle: "Challenges Posted",
    primaryItems: [
      ["Sustainable Campus Solutions", "Open"],
      ["AI-Based Learning Support", "Open"],
      ["Renewable Energy Monitoring", "Open"],
    ],
    secondaryTitle: "Collaborations",
    secondaryItems: [
      ["Industry Innovation Cell", "Active"],
      ["Community Development Program", "Active"],
    ],
  },
};

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const [role, setRole] = useState<Role>("member");
  const [profileOverrides, setProfileOverrides] = useState<Partial<Record<Role, any>>>({});

  useEffect(() => {
    const requestedRole = searchParams.get("role") as Role | null;
    if (requestedRole && requestedRole in profiles) setRole(requestedRole);
  }, [searchParams]);

  useEffect(() => {
    const loaded: Partial<Record<Role, any>> = {};
    (Object.keys(profiles) as Role[]).forEach((item) => {
      try {
        const saved = localStorage.getItem(`nivaran-profile-${item}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (typeof parsed.skills === "string") parsed.skills = splitList(parsed.skills);
          if (typeof parsed.interests === "string") parsed.interests = splitList(parsed.interests);
          if (typeof parsed.departments === "string") parsed.departments = splitList(parsed.departments);
          loaded[item] = parsed;
        }
      } catch {}
    });
    setProfileOverrides(loaded);
  }, []);

  const profile = { ...profiles[role], ...(profileOverrides[role] || {}) };

  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#0f1c3f]">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="text-2xl font-bold tracking-tight">
            Nivaran
          </a>
          <div className="flex items-center gap-2">
            <a href="/" className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">
              Home
            </a>
            <a href="/login" className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">
              Log out
            </a>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-5 py-8">
        {/* Temporary preview switcher. Replace with logged-in role from backend later. */}
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
            Profile preview
          </p>
          <div className="flex flex-wrap gap-2">
            {(["member", "industry", "university"] as Role[]).map((item) => (
              <button
                key={item}
                onClick={() => setRole(item)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  role === item
                    ? "bg-[#0f1c3f] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-gray-200"
                }`}
              >
                {item === "member" ? "Member" : item === "industry" ? "Industry" : "University"}
              </button>
            ))}
          </div>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#eef2ff] text-2xl font-bold text-[#0f1c3f] ring-4 ring-white">
                {profile.initials}
              </div>

              <div>
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                    {profile.name}
                  </h1>
                  <span className="rounded-full bg-[#eef2ff] px-3 py-1 text-xs font-semibold text-[#0f1c3f]">
                    {profile.role}
                  </span>
                </div>
                <p className="text-sm text-[#64748b]">{profile.location}</p>
              </div>
            </div>

            <a
              href={`/profile/edit?role=${role}`}
              className="rounded-lg bg-[#0f1c3f] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#172957]"
            >
              Edit Profile
            </a>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-7">
            <h2 className="text-lg font-bold">About</h2>
            <p className="mt-2 max-w-3xl leading-7 text-slate-600">{profile.about}</p>
          </div>

          {"industryType" in profile && (
            <div className="mt-6 grid gap-5 border-t border-slate-100 pt-7 sm:grid-cols-2">
              <div>
                <h2 className="text-sm font-semibold text-[#64748b]">Industry Type</h2>
                <p className="mt-1 font-medium">{profile.industryType}</p>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-[#64748b]">Website / Contact</h2>
                <p className="mt-1 font-medium text-[#0f1c3f]">{profile.website}</p>
              </div>
            </div>
          )}

          {"website" in profile && !("industryType" in profile) && (
            <div className="mt-6 border-t border-slate-100 pt-7">
              <h2 className="text-sm font-semibold text-[#64748b]">Website</h2>
              <p className="mt-1 font-medium text-[#0f1c3f]">{profile.website}</p>
            </div>
          )}

          {"departments" in profile && (
            <div className="mt-6 border-t border-slate-100 pt-7">
              <h2 className="text-lg font-bold">Departments & Domains</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.departments.map((department) => (
                  <span key={department} className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700">
                    {department}
                  </span>
                ))}
              </div>
            </div>
          )}

          {"skills" in profile && (
            <div className="mt-6 border-t border-slate-100 pt-7">
              <h2 className="text-lg font-bold">Skills</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 border-t border-slate-100 pt-7">
            <h2 className="text-lg font-bold">Areas of Interest</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <span key={interest} className="rounded-full bg-[#eef2ff] px-3 py-1.5 text-sm text-[#0f1c3f]">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          {profile.stats.map(([value, label]) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
              <p className="text-3xl font-bold text-[#0f1c3f]">{value}</p>
              <p className="mt-1 text-sm text-[#64748b]">{label}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 grid gap-6 md:grid-cols-2">
          <ProfileList title={profile.primaryTitle} items={profile.primaryItems} />
          <ProfileList title={profile.secondaryTitle} items={profile.secondaryItems} />
        </section>

        <footer className="py-8 text-center text-xs text-gray-400">
          © 2026 Nivaran — Turning problems into solutions.
        </footer>
      </div>
    </main>
  );
}

function splitList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function ProfileList({
  title,
  items,
}: {
  title: string;
  items: string[][];
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="mt-4 space-y-3">
        {items.map(([name, status]) => (
          <div
            key={name}
            className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 p-4"
          >
            <p className="text-sm font-semibold text-[#0f1c3f]">{name}</p>
            <span className="shrink-0 rounded-full bg-[#faf8f3] px-3 py-1 text-xs font-medium text-[#64748b]">
              {status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
