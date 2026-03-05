"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const SOCIAL_FIELDS = [
  { key: "name", label: "Your Name", placeholder: "John Doe", required: true, type: "text" },
  { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/username", type: "url" },
  { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/username", type: "url" },
  { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/username", type: "url" },
  { key: "twitter", label: "X / Twitter", placeholder: "https://x.com/username", type: "url" },
  { key: "youtube", label: "YouTube", placeholder: "https://youtube.com/@channel", type: "url" },
  { key: "tiktok", label: "TikTok", placeholder: "https://tiktok.com/@username", type: "url" },
  { key: "email", label: "Email", placeholder: "you@example.com", type: "email" },
  { key: "phone", label: "Phone", placeholder: "+1234567890", type: "tel" },
  { key: "whatsapp", label: "WhatsApp", placeholder: "+1234567890", type: "tel" },
  { key: "website", label: "Website", placeholder: "https://yourwebsite.com", type: "url" },
];

export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name?.trim()) {
      setError("Name is required.");
      return;
    }
    setLoading(true);
    setError("");

    const { data, error: dbError } = await supabase
      .from("profiles")
      .insert([form])
      .select("id")
      .single();

    setLoading(false);

    if (dbError) {
      setError(dbError.message);
      return;
    }

    router.push(`/profile/${data.id}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-white mb-2">ShareMe</h1>
        <p className="text-slate-400 mb-8 text-sm">
          Add your social links and get a shareable profile page.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {SOCIAL_FIELDS.map(({ key, label, placeholder, required, type }) => (
            <div key={key}>
              <label className="block text-sm text-slate-300 mb-1">
                {label} {required && <span className="text-rose-400">*</span>}
              </label>
              <input
                type={type}
                placeholder={placeholder}
                value={form[key] ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>
          ))}

          {error && <p className="text-rose-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors mt-2"
          >
            {loading ? "Creating your page..." : "Create my page"}
          </button>
        </form>
      </div>
    </main>
  );
}
