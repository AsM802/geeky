import React from 'react';

export default function GeekyLogo({ className = '', collapsed = false }: { className?: string; collapsed?: boolean }) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Philosopher Silhouette SVG Circle */}
      <svg
        className="w-9 h-9 flex-shrink-0"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Ring */}
        <circle cx="50" cy="50" r="46" stroke="var(--accent-theme, #D4AF37)" strokeWidth="3" fill="var(--secondary-theme, #1A2F24)" fillOpacity="0.4" />
        <circle cx="50" cy="50" r="41" stroke="var(--accent-theme, #D4AF37)" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Greek Philosopher Statue Silhouette Drapes & Head */}
        <path
          d="M50 18 C38 18, 30 26, 30 38 C30 42, 33 46, 35 48 C32 52, 32 58, 36 63 C34 68, 36 74, 42 76 C45 78, 50 78, 54 75 C60 78, 66 75, 68 68 C70 62, 68 56, 65 52 C68 46, 70 40, 68 34 C65 24, 58 18, 50 18 Z"
          fill="var(--accent-theme, #D4AF37)"
          opacity="0.85"
        />

        {/* Curly Hair & Beard Details */}
        <circle cx="42" cy="24" r="5" fill="var(--secondary-theme, #1A2F24)" opacity="0.9" />
        <circle cx="50" cy="22" r="5.5" fill="var(--secondary-theme, #1A2F24)" opacity="0.9" />
        <circle cx="58" cy="25" r="4.8" fill="var(--secondary-theme, #1A2F24)" opacity="0.9" />
        <circle cx="36" cy="30" r="4.5" fill="var(--secondary-theme, #1A2F24)" opacity="0.9" />
        <circle cx="64" cy="32" r="4" fill="var(--secondary-theme, #1A2F24)" opacity="0.9" />

        {/* Beard curls */}
        <circle cx="44" cy="68" r="3.5" fill="var(--secondary-theme, #1A2F24)" />
        <circle cx="50" cy="72" r="3.8" fill="var(--secondary-theme, #1A2F24)" />
        <circle cx="56" cy="70" r="3.5" fill="var(--secondary-theme, #1A2F24)" />
        <circle cx="62" cy="64" r="3" fill="var(--secondary-theme, #1A2F24)" />

        {/* Modern Sunglasses */}
        <path d="M42 38 Q48 37 50 40 Q49 46 43 46 Q39 45 42 38 Z" fill="#111" stroke="var(--accent-theme, #D4AF37)" strokeWidth="1" />
        <path d="M50 40 Q52 37 58 38 Q61 45 57 46 Q51 46 50 40 Z" fill="#111" stroke="var(--accent-theme, #D4AF37)" strokeWidth="1" />
        <rect x="47" y="38.5" width="6" height="2" fill="var(--accent-theme, #D4AF37)" />
        <path d="M38 38 L32 40" stroke="var(--accent-theme, #D4AF37)" strokeWidth="1.5" />
        <path d="M62 38 L68 40" stroke="var(--accent-theme, #D4AF37)" strokeWidth="1.5" />

        {/* Laurel Wreath Crown */}
        <path d="M32 30 Q35 22 46 22" stroke="var(--accent-theme, #D4AF37)" strokeWidth="2" fill="none" />
        <path d="M68 30 Q65 22 54 22" stroke="var(--accent-theme, #D4AF37)" strokeWidth="2" fill="none" />
      </svg>

      {!collapsed && (
        <span className="font-heading font-bold text-xl tracking-wider bg-gradient-to-r from-white to-[var(--accent-theme,#D4AF37)] bg-clip-text text-transparent">
          Geeky
        </span>
      )}
    </div>
  );
}
