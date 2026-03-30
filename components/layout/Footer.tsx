import Link from 'next/link'
import { Mail, MapPin, Linkedin } from 'lucide-react'
import { COMPANY_NAME, COMPANY_EMAIL, COMPANY_LOCATION, NAV_LINKS, TEAM_MEMBERS, FOOTER_TAGLINE, FOOTER_COPYRIGHT } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-[var(--background-dark)] text-[var(--foreground-on-dark)]">
      {/* Rainbow top border */}
      <div
        className="h-0.5 w-full"
        style={{
          background: 'linear-gradient(90deg, #008aa0, #00abb1, #2563EB, #F43F5E, #F59E0B)',
        }}
      />

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left: brand */}
          <div className="flex flex-col gap-3">
            <Link href="/" aria-label={`${COMPANY_NAME} - Home`}>
              <img
                src="/images/logo-with-name.svg"
                alt={COMPANY_NAME}
                style={{ height: 136, width: 'auto' }}
              />
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-[220px]">
              {FOOTER_TAGLINE}
            </p>
            <p className="text-sm text-white/30 mt-2">{FOOTER_COPYRIGHT}</p>
          </div>

          {/* Centre: nav */}
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-white/50 hover:text-accent-teal transition-colors duration-200 w-fit"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right: contact + LinkedIn */}
          <div className="flex flex-col gap-3">
            <p className="font-satoshi text-sm font-semibold text-white/70 mb-1">Get in touch</p>
            <a
              href={`mailto:${COMPANY_EMAIL}`}
              className="flex items-center gap-2 text-sm text-white/50 hover:text-accent-teal transition-colors duration-200"
            >
              <Mail size={14} />
              {COMPANY_EMAIL}
            </a>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <MapPin size={14} />
              {COMPANY_LOCATION}
            </div>

            {/* Individual LinkedIn icons */}
            <div className="flex gap-5 mt-2">
              {TEAM_MEMBERS.map((member) => (
                <a
                  key={member.name}
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                  className="flex flex-col items-center gap-1 footer-linkedin-link transition-colors duration-200"
                  style={{ color: 'var(--foreground-faint)', textDecoration: 'none' }}
                >
                  <Linkedin size={16} />
                  <span style={{ fontSize: '0.8rem' }}>{member.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
