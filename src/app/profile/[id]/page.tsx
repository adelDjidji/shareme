import { supabase, Profile } from "@/lib/supabase";
import { notFound } from "next/navigation";

const LINK_CONFIG: {
  key: keyof Profile;
  label: string;
  icon: string;
  color: string;
  prefix?: string;
}[] = [
  { key: "linkedin", label: "LinkedIn", icon: "in", color: "bg-blue-600", prefix: "" },
  { key: "facebook", label: "Facebook", icon: "f", color: "bg-blue-500", prefix: "" },
  { key: "instagram", label: "Instagram", icon: "ig", color: "bg-pink-500", prefix: "" },
  { key: "twitter", label: "X / Twitter", icon: "𝕏", color: "bg-black", prefix: "" },
  { key: "youtube", label: "YouTube", icon: "▶", color: "bg-red-600", prefix: "" },
  { key: "tiktok", label: "TikTok", icon: "tt", color: "bg-slate-800", prefix: "" },
  { key: "email", label: "Email", icon: "@", color: "bg-emerald-600", prefix: "mailto:" },
  { key: "phone", label: "Phone", icon: "☏", color: "bg-green-600", prefix: "tel:" },
  { key: "whatsapp", label: "WhatsApp", icon: "W", color: "bg-green-500", prefix: "https://wa.me/" },
  { key: "website", label: "Website", icon: "🌐", color: "bg-indigo-600", prefix: "" },
];

function buildHref(prefix: string, value: string): string {
  if (prefix === "https://wa.me/") {
    return `https://wa.me/${value.replace(/\D/g, "")}`;
  }
  if (prefix) return `${prefix}${value}`;
  return value.startsWith("http") ? value : `https://${value}`;
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) notFound();

  const profile = data as Profile;

  const activeLinks = LINK_CONFIG.filter(({ key }) => profile[key]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-3xl font-bold text-white mx-auto mb-4">
            {profile.name.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
        </div>

        <div className="space-y-3">
          {activeLinks.map(({ key, label, icon, color, prefix }) => (
            <a
              key={key}
              href={buildHref(prefix ?? "", String(profile[key]))}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-5 py-4 transition-colors"
            >
              <span
                className={`w-9 h-9 rounded-lg ${color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
              >
                {icon}
              </span>
              <span className="text-white font-medium">{label}</span>
            </a>
          ))}
        </div>

        <p className="text-center text-slate-600 text-xs mt-10">
          Made with <a href="/" className="text-indigo-400 hover:underline">ShareMe</a>
        </p>
      </div>
    </main>
  );
}
