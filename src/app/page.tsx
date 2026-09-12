"use client";

import { useState } from "react";

type Problem = {
  id: number;
  user: string;
  initials: string;
  time: string;
  category: string;
  categoryColor: string;
  categoryBg: string;
  title: string;
  description: string;
  image: string;
  likes: number;
  comments: number;
  team: string;
  teamMembers: number;
  solutions: number;
  location: string;
  status: "Open" | "In Progress" | "Solved";
};

const problems: Problem[] = [
  {
    id: 1,
    user: "Green India Initiative",
    initials: "GI",
    time: "2h",
    category: "ENVIRONMENT",
    categoryColor: "#16a34a",
    categoryBg: "#f0fdf4",
    title: "Reducing plastic waste in local markets",
    description:
      "Local markets are producing huge amounts of single-use plastic every day. We need practical and affordable ways for vendors to reduce plastic usage without increasing costs for customers.",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80",
    likes: 124,
    comments: 18,
    team: "Green Warriors",
    teamMembers: 6,
    solutions: 8,
    location: "Jaipur, Rajasthan",
    status: "In Progress",
  },
  {
    id: 2,
    user: "Rural Education Foundation",
    initials: "RE",
    time: "5h",
    category: "EDUCATION",
    categoryColor: "#2563eb",
    categoryBg: "#eff6ff",
    title: "Digital learning for rural students",
    description:
      "Many students in rural communities have limited access to quality digital education. We are looking for low-cost solutions that can work even with unreliable internet connectivity.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    likes: 89,
    comments: 14,
    team: "EduConnect",
    teamMembers: 4,
    solutions: 12,
    location: "Alwar, Rajasthan",
    status: "Open",
  },
  {
    id: 3,
    user: "Community Health Network",
    initials: "CH",
    time: "1d",
    category: "HEALTH",
    categoryColor: "#7c3aed",
    categoryBg: "#f5f3ff",
    title: "Making reliable health information accessible",
    description:
      "People often struggle to find trustworthy health information in simple language. How can technology help communities access verified information quickly?",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    likes: 201,
    comments: 31,
    team: "Health First",
    teamMembers: 8,
    solutions: 21,
    location: "Bengaluru, Karnataka",
    status: "Solved",
  },
];

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f1c3f]">
        <span className="text-xl font-extrabold text-white">N</span>
      </div>

      <div>
        <h1 className="text-lg font-extrabold tracking-tight text-[#0f1c3f]">
          Nivaran
        </h1>
        <p className="hidden text-[8px] font-bold uppercase tracking-[0.18em] text-amber-500 sm:block">
          Solve · Collaborate · Impact
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Problem["status"] }) {
  const styles = {
    Open: "bg-blue-50 text-blue-700",
    "In Progress": "bg-amber-50 text-amber-700",
    Solved: "bg-emerald-50 text-emerald-700",
  };

  const dots = {
    Open: "bg-blue-500",
    "In Progress": "bg-amber-500",
    Solved: "bg-emerald-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${styles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dots[status]}`} />
      {status}
    </span>
  );
}

function ProblemCard({ problem }: { problem: Problem }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(problem.likes);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes((value) => (liked ? value - 1 : value + 1));
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* User header */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0f1c3f] text-xs font-bold text-white">
            {problem.initials}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#0f1c3f]">
                {problem.user}
              </h3>

              <span className="text-xs text-slate-400">· {problem.time}</span>
            </div>

            <p className="text-xs text-slate-400">{problem.location}</p>
          </div>
        </div>

        <button className="rounded-lg px-2 py-1 text-xl text-slate-400 hover:bg-slate-50">
          ···
        </button>
      </div>

      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        <img
          src={problem.image}
          alt={problem.title}
          className="h-full w-full object-cover transition duration-500 hover:scale-[1.02]"
        />

        <div className="absolute left-4 top-4">
          <span
            className="rounded-full px-3 py-1.5 text-[10px] font-bold tracking-widest"
            style={{
              color: problem.categoryColor,
              backgroundColor: problem.categoryBg,
            }}
          >
            {problem.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-5">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-bold leading-tight tracking-tight text-[#0f1c3f]">
            {problem.title}
          </h2>

          <StatusBadge status={problem.status} />
        </div>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          {problem.description}
        </p>

        {/* Actions */}
        <div className="mt-5 flex items-center gap-5 border-b border-gray-100 pb-4">
          <button
            onClick={toggleLike}
            className={`flex items-center gap-1.5 text-sm font-medium transition ${
              liked
                ? "text-red-500"
                : "text-slate-500 hover:text-red-500"
            }`}
          >
            <span className="text-xl">{liked ? "♥" : "♡"}</span>
            {likes}
          </button>

          <button className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-[#0f1c3f]">
            <span className="text-lg">○</span>
            {problem.comments}
          </button>

          <button className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-[#0f1c3f]">
            <span className="text-lg">↗</span>
            Share
          </button>
        </div>

        {/* Problem details */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-[#faf8f3] p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Team
            </p>
            <p className="mt-1 truncate text-xs font-bold text-[#0f1c3f]">
              {problem.team}
            </p>
            <p className="mt-0.5 text-[10px] text-slate-400">
              {problem.teamMembers} members
            </p>
          </div>

          <div className="rounded-xl bg-[#faf8f3] p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Solutions
            </p>
            <p className="mt-1 text-sm font-bold text-[#0f1c3f]">
              {problem.solutions}
            </p>
            <p className="mt-0.5 text-[10px] text-slate-400">
              submitted
            </p>
          </div>

          <div className="rounded-xl bg-[#faf8f3] p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Status
            </p>
            <p className="mt-1 text-xs font-bold text-[#0f1c3f]">
              {problem.status}
            </p>
            <p className="mt-0.5 text-[10px] text-slate-400">
              challenge
            </p>
          </div>
        </div>

        {/* View button */}
        <button className="mt-4 w-full rounded-xl bg-[#0f1c3f] py-3 text-sm font-bold text-white transition hover:bg-[#1a2d5a]">
          View problem →
        </button>
      </div>
    </article>
  );
}

export default function Home() {
  const [activeNav, setActiveNav] = useState("Home");

  return (
    <main className="min-h-screen bg-[#faf8f3]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <Logo />

          {/* Search */}
          <div className="hidden w-full max-w-md md:block">
            <div className="flex items-center gap-3 rounded-xl bg-[#f5f5f3] px-4 py-2.5">
              <span className="text-slate-400">⌕</span>
              <input
                type="text"
                placeholder="Search problems, teams or solutions..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/login"
              className="hidden rounded-xl px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 sm:block"
            >
              Log in
            </a>

            <a
              href="/signup"
              className="rounded-xl bg-[#0f1c3f] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#1a2d5a]"
            >
              Join
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-6 lg:grid-cols-[220px_minmax(0,650px)_240px] lg:px-8">
        {/* Left sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <nav className="space-y-1">
              {[
                { name: "Home", icon: "⌂" },
                { name: "Explore", icon: "⌕" },
                { name: "Teams", icon: "♧" },
                { name: "Solutions", icon: "✦" },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveNav(item.name)}
                  className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    activeNav === item.name
                      ? "bg-[#0f1c3f] text-white"
                      : "text-slate-600 hover:bg-white"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </button>
              ))}
            </nav>

            <div className="my-6 border-t border-gray-200" />

            <button className="w-full rounded-xl border border-[#0f1c3f]/15 bg-white px-4 py-3 text-sm font-bold text-[#0f1c3f] transition hover:border-[#0f1c3f]/30 hover:shadow-sm">
              + Post a problem
            </button>

            <div className="mt-8">
              <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Your activity
              </p>

              <div className="mt-3 space-y-3 px-4 text-xs text-slate-500">
                <p>♡ 12 liked problems</p>
                <p>♧ 2 teams joined</p>
                <p>✦ 4 solutions submitted</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Feed */}
        <section className="min-w-0">
          {/* Mobile heading */}
          <div className="mb-5 flex items-center justify-between lg:hidden">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-amber-600">
                Nivaran feed
              </p>
              <h2 className="mt-1 text-2xl font-extrabold text-[#0f1c3f]">
                Problems worth solving
              </h2>
            </div>
          </div>

          {/* Create post */}
          <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
                +
              </div>

              <button className="flex-1 rounded-xl bg-[#f5f5f3] px-4 py-3 text-left text-sm text-slate-400 hover:bg-slate-100">
                What problem do you want to solve?
              </button>
            </div>

            <div className="mt-3 flex gap-2 border-t border-gray-100 pt-3">
              <button className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50">
                📷 Add photo
              </button>

              <button className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50">
                🏷️ Category
              </button>

              <button className="ml-auto rounded-lg bg-[#0f1c3f] px-4 py-2 text-xs font-bold text-white">
                Post
              </button>
            </div>
          </div>

          {/* Feed filter */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex gap-2">
              <button className="rounded-full bg-[#0f1c3f] px-4 py-2 text-xs font-bold text-white">
                For you
              </button>

              <button className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100">
                Latest
              </button>

              <button className="hidden rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 sm:block">
                Trending
              </button>
            </div>

            <span className="text-xs text-slate-400">
              {problems.length} problems
            </span>
          </div>

          {/* Problems */}
          <div className="space-y-5">
            {problems.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
          </div>
        </section>

        {/* Right sidebar */}
        <aside className="hidden xl:block">
          <div className="sticky top-24 space-y-5">
            {/* Trending */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <h3 className="font-bold text-[#0f1c3f]">
                Trending categories
              </h3>

              <div className="mt-4 space-y-3">
                {[
                  ["🌱", "Environment", "124 problems"],
                  ["📚", "Education", "89 problems"],
                  ["❤️", "Health", "67 problems"],
                  ["💻", "Technology", "54 problems"],
                ].map(([icon, name, count]) => (
                  <button
                    key={name}
                    className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-[#faf8f3]"
                  >
                    <span className="text-lg">{icon}</span>

                    <div>
                      <p className="text-xs font-bold text-[#0f1c3f]">
                        {name}
                      </p>
                      <p className="text-[10px] text-slate-400">{count}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Top teams */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[#0f1c3f]">Top teams</h3>
                <button className="text-xs font-bold text-amber-600">
                  See all
                </button>
              </div>

              <div className="mt-4 space-y-4">
                {[
                  ["GW", "Green Warriors", "8 members"],
                  ["EC", "EduConnect", "6 members"],
                  ["HF", "Health First", "8 members"],
                ].map(([initials, name, members]) => (
                  <div
                    key={name}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0f1c3f] text-[10px] font-bold text-white">
                      {initials}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-[#0f1c3f]">
                        {name}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {members}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="px-2 text-[10px] leading-5 text-slate-400">
              Nivaran · Solve · Collaborate · Impact
              <br />
              © 2026 Nivaran
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}