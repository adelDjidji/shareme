"use client";

import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

const SHARE_CHANNELS = [
  {
    label: "WhatsApp",
    color: "bg-green-500 hover:bg-green-400",
    href: (url: string) =>
      `https://wa.me/?text=${encodeURIComponent(url)}`,
  },
  {
    label: "Messenger",
    color: "bg-blue-500 hover:bg-blue-400",
    href: (url: string) =>
      `https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=291494419107518&redirect_uri=${encodeURIComponent(url)}`,
  },
  {
    label: "Telegram",
    color: "bg-sky-500 hover:bg-sky-400",
    href: (url: string) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}`,
  },
  {
    label: "X / Twitter",
    color: "bg-black hover:bg-slate-800",
    href: (url: string) =>
      `https://x.com/intent/tweet?url=${encodeURIComponent(url)}`,
  },
  {
    label: "Email",
    color: "bg-slate-600 hover:bg-slate-500",
    href: (url: string) =>
      `mailto:?body=${encodeURIComponent(url)}`,
  },
];

export default function ShareSection({ profileUrl }: { profileUrl: string }) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-10 space-y-6">
      {/* QR Code */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-slate-400 text-sm">Scan to open profile</p>
        <div className="bg-white p-3 rounded-xl">
          <QRCodeSVG value={profileUrl} size={160} />
        </div>
      </div>

      {/* Copy link */}
      <div className="flex gap-2">
        <input
          readOnly
          value={profileUrl}
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-slate-300 text-sm truncate"
        />
        <button
          onClick={copyLink}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Share buttons */}
      <div>
        <p className="text-slate-400 text-sm mb-3 text-center">Share via</p>
        <div className="grid grid-cols-2 gap-2">
          {SHARE_CHANNELS.map(({ label, color, href }) => (
            <a
              key={label}
              href={href(profileUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className={`${color} text-white text-sm font-medium py-2.5 rounded-lg text-center transition-colors`}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
