"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Role = "member" | "industry" | "university";

type FormData = {
  name: string;
  location: string;
  about: string;
  website: string;
  contact: string;
  industryType: string;
  skills: string;
  interests: string;
  departments: string;
};

const defaults: Record<Role, FormData> = {
  member: {
    name: "Ujjwal Bhardwaj",
    location: "Hyderabad, India",
    about: "Passionate about technology, innovation, and solving real-world societal problems.",
    website: "",
    contact: "",
    industryType: "",
    skills: "Web Development, Problem Solving, Python, C",
    interests: "Technology, Innovation, Sustainability, Education",
    departments: "",
  },
  industry: {
    name: "Tata Consultancy Services",
    location: "Mumbai, Maharashtra, India",
    about: "Technology and consulting organization working with communities and institutions to develop scalable solutions for real-world challenges.",
    website: "https://www.tcs.com",
    contact: "contact@example.com",
    industryType: "Information Technology & Services",
    skills: "",
    interests: "Digital Transformation, AI & ML, Sustainability, Smart Cities",
    departments: "",
  },
  university: {
    name: "Nivaran University",
    location: "Amaravati, Andhra Pradesh, India",
    about: "A collaborative academic community focused on innovation, research, entrepreneurship, and solving challenges that create meaningful social impact.",
    website: "https://www.nivaran.example",
    contact: "",
    industryType: "",
    skills: "",
    interests: "Research, Innovation, Sustainability, Social Impact",
    departments: "Computer Science, Electronics, Mechanical, Management",
  },
};

export default function EditProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedRole = searchParams.get("role") as Role | null;
  const role: Role = requestedRole && requestedRole in defaults ? requestedRole : "member";

  const [form, setForm] = useState<FormData>(defaults[role]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const base = { ...defaults[role] };
    try {
      const stored = localStorage.getItem(`nivaran-profile-${role}`);
      if (stored) Object.assign(base, JSON.parse(stored));
    } catch {}
    setForm(base);
    setSaved(false);
  }, [role]);

  const roleLabel = useMemo(
    () => role === "member" ? "Member" : role === "industry" ? "Industry" : "University",
    [role]
  );

  function update(field: keyof FormData, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setSaved(false);
  }

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    localStorage.setItem(`nivaran-profile-${role}`, JSON.stringify(form));
    setSaved(true);
  }

  return (
    <main className="min-h-screen bg-[#faf8f3] text-[#0f1c3f]">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="text-2xl font-bold tracking-tight">Nivaran</a>
          <a href={`/profile?role=${role}`} className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">
            Back to Profile
          </a>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-5 py-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#64748b]">Profile Settings</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Edit {roleLabel} Profile</h1>
          <p className="mt-2 text-slate-600">Update the information displayed on your Nivaran profile.</p>
        </div>

        <form onSubmit={saveProfile} className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <h2 className="text-lg font-bold">Basic Information</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <Field label={role === "member" ? "Full Name" : role === "industry" ? "Company Name" : "University Name"} value={form.name} onChange={(v) => update("name", v)} required />
              <Field label="Location" value={form.location} onChange={(v) => update("location", v)} required />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold">About</label>
              <textarea
                value={form.about}
                onChange={(e) => update("about", e.target.value)}
                rows={4}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0f1c3f] focus:ring-2 focus:ring-[#eef2ff]"
              />
            </div>
          </section>

          {role === "member" && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
              <h2 className="text-lg font-bold">Skills & Interests</h2>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <TagField label="Skills" value={form.skills} onChange={(v) => update("skills", v)} placeholder="Python, Web Development, C" />
                <TagField label="Areas of Interest" value={form.interests} onChange={(v) => update("interests", v)} placeholder="Technology, Education, Sustainability" />
              </div>
            </section>
          )}

          {role === "industry" && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
              <h2 className="text-lg font-bold">Organization Details</h2>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <Field label="Industry Type" value={form.industryType} onChange={(v) => update("industryType", v)} required />
                <Field label="Website" value={form.website} onChange={(v) => update("website", v)} placeholder="https://example.com" />
                <Field label="Contact Information" value={form.contact} onChange={(v) => update("contact", v)} placeholder="Email or phone" />
                <TagField label="Areas of Interest" value={form.interests} onChange={(v) => update("interests", v)} placeholder="AI & ML, Sustainability" />
              </div>
            </section>
          )}

          {role === "university" && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
              <h2 className="text-lg font-bold">University Details</h2>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <Field label="Website" value={form.website} onChange={(v) => update("website", v)} placeholder="https://example.com" />
                <TagField label="Departments / Domains" value={form.departments} onChange={(v) => update("departments", v)} placeholder="Computer Science, Electronics" />
                <div className="md:col-span-2">
                  <TagField label="Areas of Interest" value={form.interests} onChange={(v) => update("interests", v)} placeholder="Research, Innovation, Social Impact" />
                </div>
              </div>
            </section>
          )}

          <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-200 bg-white p-5">
            <div>
              {saved && <p className="text-sm font-semibold text-[#16a34a]">Profile changes saved successfully.</p>}
              {!saved && <p className="text-sm text-[#64748b]">Your changes are saved locally for this frontend demo.</p>}
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => router.push(`/profile?role=${role}`)} className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                Cancel
              </button>
              <button type="submit" className="rounded-lg bg-[#0f1c3f] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#172957]">
                Save Changes
              </button>
            </div>
          </section>
        </form>
      </div>
    </main>
  );
}

function Field({ label, value, onChange, placeholder, required = false }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0f1c3f] focus:ring-2 focus:ring-[#eef2ff]"
      />
    </div>
  );
}

function TagField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0f1c3f] focus:ring-2 focus:ring-[#eef2ff]"
      />
      <p className="mt-1.5 text-xs text-[#64748b]">Separate multiple items with commas.</p>
    </div>
  );
}
