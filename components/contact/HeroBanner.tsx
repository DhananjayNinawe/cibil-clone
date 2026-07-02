function AgentSilhouette() {
  return (
    <svg viewBox="0 0 200 200" className="absolute right-6 sm:right-16 bottom-0 h-full w-auto" aria-hidden="true">
      <circle cx="130" cy="90" r="55" fill="#ffffff" opacity="0.15" />
      <circle cx="128" cy="78" r="24" fill="#ffffff" opacity="0.25" />
      <path d="M90 140q38 -22 76 0l4 60h-84z" fill="#ffffff" opacity="0.25" />
    </svg>
  );
}

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#0a3a52] via-[#0f6b8f] to-[#5fc3e8] h-64 sm:h-80">
      <AgentSilhouette />
    </section>
  );
}
