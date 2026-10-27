"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock, KeyRound, Sparkles, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      passcode === "tolucci2026" ||
      passcode === "revival" ||
      passcode === "admin"
    ) {
      sessionStorage.setItem("tolucci_admin_authenticated", "true");
      router.push("/admin");
    } else {
      setError(
        'Invalid ministry authorization code. (Hint: Use default demo passcode "tolucci2026")',
      );
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 rounded-3xl bg-[#0f0f17] border border-[#c5a880]/40 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          {/* <div className="w-12 h-12 mx-auto rounded-xl bg-[#c5a880]/15 border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880]">
            <Shield className="w-6 h-6" />
          </div> */}
          <span className="text-xs uppercase tracking-widest text-[#c5a880] font-semibold">
            Evangelist Tolucci's Ministry
          </span>
          <h1 className="serif-heading text-2xl text-[#faf8f5]">
            Admin Dashboard
          </h1>
          {/* <p className="text-xs text-[#9c978e]">
            Restricted to authorized secretariat, media, and editorial team
            members.
          </p> */}
        </div>

        {error && (
          <div className="p-3 bg-red-950/40 border border-red-800 rounded-lg text-xs text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#dcd6cc] mb-1">
              Enter Passcode
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="Enter authorization passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#161622] border border-[#2b2b3d] text-sm text-[#faf8f5] focus:outline-none focus:border-[#c5a880]"
              />
              <KeyRound className="w-4 h-4 text-[#9c978e] absolute left-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#c5a880] text-[#0a0a0d] font-semibold text-xs hover:bg-[#e0cca9] transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-[#c5a880]/20"
          >
            Access Dashboard <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* <div className="p-3 rounded-xl bg-[#14141e] border border-[#232332] text-center text-[11px] text-[#9c978e]">
          💡 Demo Access Passcode:{" "}
          <code className="text-[#c5a880] font-mono">tolucci2026</code>
        </div> */}
      </div>
    </div>
  );
}
