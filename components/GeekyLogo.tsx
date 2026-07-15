import React from 'react';
import { Playfair_Display } from 'next/font/google';

// Load the Playfair Display font with the required weights
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
});

export default function GeekyLogo({ className = '', collapsed = false }: { className?: string; collapsed?: boolean }) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* SVG Logo Graphic */}
      <svg 
        className={`${collapsed ? 'w-8 h-8' : 'w-10 h-10'} flex-shrink-0 transition-all duration-300`}
        viewBox="0 0 400 400" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Outer Ring */}
        <circle cx="200" cy="180" r="140" fill="none" stroke="#4d5337" strokeWidth="6"/>
        
        {/* Inner Ring */}
        <circle cx="200" cy="180" r="132" fill="none" stroke="#4d5337" strokeWidth="2"/>
        
        {/* Main Circular Solid Background */}
        <circle cx="200" cy="180" r="126" fill="#4d5337" />

        <g id="bust">
          {/* Toga / Shoulder Drape */}
          <path d="M 130 290 Q 150 240 180 230 Q 210 220 230 250 Q 260 210 320 260 L 320 310 L 130 310 Z" fill="#d5cfbc" />
          <path d="M 145 285 Q 165 245 180 235 Q 210 225 225 255 Q 240 235 280 245 L 290 280 L 250 310 L 145 310 Z" fill="#fdfaf2" />
          <path d="M 195 240 Q 220 220 250 250 L 220 310 Z" fill="#4d5337" opacity="0.3" />

          {/* Neck */}
          <path d="M 175 190 L 175 250 L 225 250 L 225 190 Z" fill="#d5cfbc" />
          <path d="M 175 190 Q 200 195 225 190 L 215 250 L 175 250 Z" fill="#fdfaf2" />

          {/* Head Base */}
          <path d="M 170 120 Q 155 160 175 200 Q 215 210 235 180 Q 250 140 230 110 Q 200 100 170 120 Z" fill="#fdfaf2" />
          
          {/* Ear */}
          <path d="M 172 155 Q 165 155 165 165 Q 165 178 175 175 Z" fill="#fdfaf2" stroke="#d5cfbc" strokeWidth="3" />

          {/* Beard & Mustache Base */}
          <path d="M 175 185 Q 185 235 230 230 Q 255 220 255 190 Q 255 175 235 170 Z" fill="#d5cfbc" />
          <path d="M 180 185 Q 195 225 225 225 Q 245 215 245 190 Q 245 180 235 175 Z" fill="#fdfaf2" />
          
          {/* Curly Beard Details */}
          <circle cx="190" cy="205" r="10" fill="#fdfaf2" />
          <circle cx="205" cy="215" r="12" fill="#fdfaf2" />
          <circle cx="222" cy="218" r="11" fill="#fdfaf2" />
          <circle cx="235" cy="205" r="10" fill="#fdfaf2" />
          <circle cx="242" cy="190" r="8" fill="#fdfaf2" />
          <circle cx="215" cy="200" r="10" fill="#d5cfbc" />
          
          {/* Mustache */}
          <path d="M 215 180 Q 235 180 245 195 Q 235 195 220 188 Z" fill="#d5cfbc" />

          {/* Nose */}
          <path d="M 235 140 L 252 162 L 238 168 Z" fill="#fdfaf2" />

          {/* Curly Hair */}
          <g fill="#fdfaf2">
            <circle cx="170" cy="115" r="12" />
            <circle cx="185" cy="105" r="14" />
            <circle cx="205" cy="100" r="15" />
            <circle cx="228" cy="105" r="13" />
            <circle cx="242" cy="118" r="11" />
            
            <circle cx="160" cy="130" r="11" />
            <circle cx="155" cy="148" r="10" />
            <circle cx="158" cy="165" r="9" />
            
            <circle cx="178" cy="125" r="12" />
            <circle cx="195" cy="118" r="13" />
            <circle cx="215" cy="115" r="12" />
            <circle cx="232" cy="128" r="11" />
            
            {/* Inner hair depth */}
            <circle cx="188" cy="135" r="11" fill="#d5cfbc" />
            <circle cx="205" cy="130" r="11" fill="#d5cfbc" />
          </g>

          {/* Sunglasses */}
          <path d="M 185 142 L 218 135 Q 230 155 222 168 Q 200 175 192 155 Z" fill="#242718" />
          <path d="M 224 134 L 255 136 Q 262 155 250 166 Q 232 170 226 150 Z" fill="#242718" />
          <rect x="216" y="138" width="10" height="5" transform="rotate(-10 216 138)" fill="#242718" />
          <path d="M 185 142 L 165 148 L 165 144 L 185 139 Z" fill="#242718" />
          
          {/* Sunglasses Glare */}
          <ellipse cx="202" cy="145" rx="2" ry="6" transform="rotate(30 202 145)" fill="#ffffff" opacity="0.4" />
          <ellipse cx="242" cy="145" rx="2" ry="6" transform="rotate(30 242 145)" fill="#ffffff" opacity="0.4" />
        </g>
      </svg>

      {/* Brand Text - Only visible when not collapsed */}
      {!collapsed && (
        <h1 
          className={`${playfair.className} text-[28px] leading-none font-bold text-[#4d5337] tracking-[-1px] flex items-baseline`}
        >
          Geek<span className="text-[#5e5944]">y</span>
        </h1>
      )}
    </div>
  );
}
