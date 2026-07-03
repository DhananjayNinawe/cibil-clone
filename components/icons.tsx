export function MailIcon({ className = "w-8 h-8 text-white" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth={1.5} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6.5l9 6 9-6" />
    </svg>
  );
}

export function HeadsetIcon({ className = "w-8 h-8 text-white" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 13v-1a8 8 0 0116 0v1" />
      <rect x="2.5" y="12" width="4" height="6" rx="1.5" strokeWidth={1.5} />
      <rect x="17.5" y="12" width="4" height="6" rx="1.5" strokeWidth={1.5} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 18v1a2 2 0 01-2 2h-3" />
    </svg>
  );
}

export function ClockIcon({ className = "w-6 h-6 text-white" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function MapPinIcon({ className = "w-6 h-6 text-white" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 21s7-6.5 7-11.5A7 7 0 105 9.5C5 14.5 12 21 12 21z"
      />
      <circle cx="12" cy="9.5" r="2.2" strokeWidth={1.5} />
    </svg>
  );
}

export function HashIcon({ className = "w-5 h-5 text-yellow-600" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 9h14M5 15h14M9 4L7 20M17 4l-2 16" />
    </svg>
  );
}

export function QuestionIcon({ className = "w-5 h-5 text-green-600" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.5 9a2.5 2.5 0 114 2c-.8.6-1.5 1.1-1.5 2.2" />
      <circle cx="12" cy="16.7" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CalendarIcon({ className = "w-5 h-5 text-purple-600" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="3.5" y="5" width="17" height="16" rx="2" strokeWidth={1.5} />
      <path strokeLinecap="round" strokeWidth={1.5} d="M3.5 9.5h17M8 3v4M16 3v4" />
    </svg>
  );
}

export function PersonContactIcon({ className = "w-6 h-6 text-[#00b0f0]" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="3.5" strokeWidth={1.5} />
      <path strokeLinecap="round" strokeWidth={1.5} d="M5.5 20a6.5 6.5 0 0113 0" />
    </svg>
  );
}

export function MegaphoneIcon({ className = "w-5 h-5 text-gray-600" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 10v4a1 1 0 001 1h2l9 4V5L6 9H4a1 1 0 00-1 1z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 15.5V19a1.5 1.5 0 01-3 0v-2.5" />
    </svg>
  );
}

export function WarningTriangleIcon({ className = "w-5 h-5 text-yellow-600" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 3.5l9.5 16.5H2.5L12 3.5z"
      />
      <path strokeLinecap="round" strokeWidth={1.5} d="M12 10v4" />
      <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function DocumentIcon({ className = "w-6 h-6 text-[#00b0f0]" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 3.5h7l4 4V19a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 016 19V5A1.5 1.5 0 017 3.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6M9 15.5h6" />
    </svg>
  );
}

export function ReportChartIcon({ className = "w-9 h-9 text-white" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 3.5h7l4 4V19a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 016 19V5A1.5 1.5 0 017 3.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 15v2M12 12v5M15 9v8" />
    </svg>
  );
}

export function DocumentAlertIcon({ className = "w-9 h-9 text-white" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 3.5h7l4 4V19a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 016 19V5A1.5 1.5 0 017 3.5z" />
      <circle cx="12" cy="13" r="4" fill="currentColor" stroke="none" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} stroke="#0a3a52" d="M12 11v2.2" />
      <circle cx="12" cy="14.6" r="0.5" fill="#0a3a52" stroke="none" />
    </svg>
  );
}

export function ScaleIcon({ className = "w-9 h-9 text-white" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v18M7 21h10M5 7h6m2 0h6M5 7L3 12a2.5 2.5 0 005 0L5.5 7.3M19 7l-2 5a2.5 2.5 0 005 0L19.5 7.3" />
    </svg>
  );
}

export function PhoneCheckIcon({ className = "w-9 h-9 text-white" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <rect x="7" y="3" width="10" height="18" rx="1.5" strokeWidth={1.5} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 18h2" />
      <circle cx="17.5" cy="7.5" r="3.5" fill="#22c55e" stroke="none" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.3} stroke="#fff" d="M16 7.5l1 1 2-2" />
    </svg>
  );
}

export function BankIcon({ className = "w-6 h-6 text-white" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9.5L12 4l9 5.5M4.5 9.5v9M8 9.5v9M12 9.5v9M16 9.5v9M19.5 9.5v9M3 21h18" />
    </svg>
  );
}

export function PlusMinusCircleIcon({
  expanded,
  className = "w-5 h-5 text-[#00b0f0]",
}: {
  expanded: boolean;
  className?: string;
}) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9.25" strokeWidth={1.5} />
      <path strokeLinecap="round" strokeWidth={1.5} d="M8 12h8" />
      {!expanded && <path strokeLinecap="round" strokeWidth={1.5} d="M12 8v8" />}
    </svg>
  );
}

export function ChatBubbleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 5.94 2 10.8c0 2.76 1.44 5.22 3.7 6.85-.12 1.06-.55 2.42-1.55 3.68a.5.5 0 00.5.79c2.13-.4 3.75-1.28 4.78-2 .82.17 1.68.26 2.57.26 5.52 0 10-3.94 10-8.8S17.52 2 12 2z" />
    </svg>
  );
}

export function PlayIcon({ className = "w-6 h-6 text-[#00b0f0]" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5.14v13.72a1 1 0 001.5.87l11-6.86a1 1 0 000-1.72l-11-6.86A1 1 0 008 5.14z" />
    </svg>
  );
}

export function PersonSilhouetteIcon({ className = "w-16 h-16 text-white/25" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.42 0-9 2.24-9 5v3h18v-3c0-2.76-4.58-5-9-5z" />
    </svg>
  );
}

export function EyeIcon({ visible, onToggle }: { visible: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      aria-label={visible ? "Hide value" : "Show value"}
    >
      {visible ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
      )}
    </button>
  );
}

export function InfoIcon() {
  return (
    <svg className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  );
}

export function ChevronDownIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export function MenuIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function SearchIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

export function IndiaFlagIcon({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 30 20">
      <rect width="30" height="6.67" y="0" fill="#FF9933" />
      <rect width="30" height="6.67" y="6.67" fill="#FFFFFF" />
      <rect width="30" height="6.66" y="13.34" fill="#138808" />
      <circle cx="15" cy="10" r="2.2" fill="none" stroke="#000080" strokeWidth="0.4" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

export function BellIcon({ className = "w-8 h-8 text-white" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2a6 6 0 00-6 6v3.586l-1.707 1.707A1 1 0 005 15h14a1 1 0 00.707-1.707L18 11.586V8a6 6 0 00-6-6zm0 20a2.5 2.5 0 002.45-2h-4.9A2.5 2.5 0 0012 22z" />
    </svg>
  );
}

export function QuoteIcon({ className = "w-8 h-8 text-[#00b0f0]" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 32 24">
      <path d="M0 24V14.4Q0 8.4 3 4.5T10.8 0l1.8 3.6q-3.3 1.5-4.95 3.6T6 12h6v12zm18 0V14.4q0-6 3-9.9T28.8 0l1.8 3.6q-3.3 1.5-4.95 3.6T24 12h6v12z" />
    </svg>
  );
}

export function CheckCircleIcon({ className = "w-4 h-4 text-sky-500" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function CrossCircleIcon({ className = "w-4 h-4 text-red-500" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function PhoneIcon({ className = "w-4 h-4 text-gray-400" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-.826 1.671l-1.048.524a11.042 11.042 0 005.516 5.516l.524-1.048a1.5 1.5 0 011.671-.826l3.223.716A1.5 1.5 0 0117 14.352V15.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 013.43 8.326 13.019 13.019 0 013 5V3.5z" />
    </svg>
  );
}

export function LinkedInIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#0A66C2" />
      <path
        fill="#fff"
        d="M7.5 9.5h2.2v7.3H7.5V9.5zM8.6 6.2a1.3 1.3 0 110 2.6 1.3 1.3 0 010-2.6zM11 9.5h2.1v1h.03c.29-.55 1-1.14 2.06-1.14 2.2 0 2.61 1.45 2.61 3.34v4.1h-2.2v-3.64c0-.87-.02-1.98-1.21-1.98-1.21 0-1.4.95-1.4 1.92v3.7H11V9.5z"
      />
    </svg>
  );
}

export function FacebookIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        fill="#fff"
        d="M13.4 18v-5.6h1.88l.28-2.18h-2.16V8.85c0-.63.17-1.06 1.08-1.06h1.15V5.85c-.2-.03-.88-.09-1.67-.09-1.65 0-2.78 1.01-2.78 2.86v1.6H9.3v2.18h1.88V18h2.22z"
      />
    </svg>
  );
}

export function YoutubeIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#FF0000" />
      <path fill="#fff" d="M10 15.5v-7l6 3.5-6 3.5z" />
    </svg>
  );
}

export function InstagramIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <defs>
        <radialGradient id="ig-gradient" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="15%" stopColor="#fdf497" />
          <stop offset="35%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="100%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <circle cx="12" cy="12" r="12" fill="url(#ig-gradient)" />
      <rect x="7" y="7" width="10" height="10" rx="3" fill="none" stroke="#fff" strokeWidth="1.3" />
      <circle cx="12" cy="12" r="2.4" fill="none" stroke="#fff" strokeWidth="1.3" />
      <circle cx="14.9" cy="9.1" r="0.6" fill="#fff" />
    </svg>
  );
}
