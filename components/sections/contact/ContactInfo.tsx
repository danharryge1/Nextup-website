import { Mail, MapPin, Linkedin } from 'lucide-react'
import { COMPANY_EMAIL, COMPANY_LOCATION, LINKEDIN_URL, CONTACT_TEXT } from '@/lib/constants'

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-[var(--foreground-muted)] text-base leading-relaxed">
        {CONTACT_TEXT}
      </p>

      <div className="flex flex-col gap-4 mt-2">
        <a
          href={`mailto:${COMPANY_EMAIL}`}
          className="flex items-center gap-3 text-[var(--foreground)] hover:text-accent-blue transition-colors duration-200 group"
        >
          <span
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200"
            style={{ background: 'rgba(37,99,235,0.12)', color: 'var(--accent-blue)' }}
          >
            <Mail size={20} strokeWidth={2} />
          </span>
          <span className="font-satoshi text-sm">{COMPANY_EMAIL}</span>
        </a>

        <div className="flex items-center gap-3 text-[var(--foreground-muted)]">
          <span
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(37,99,235,0.12)', color: 'var(--accent-blue)' }}
          >
            <MapPin size={20} strokeWidth={2} />
          </span>
          <span className="font-satoshi text-sm">{COMPANY_LOCATION}</span>
        </div>

        <a
          href={LINKEDIN_URL}
          className="flex items-center gap-3 text-[var(--foreground)] hover:text-accent-blue transition-colors duration-200 group"
          aria-label="LinkedIn"
        >
          <span
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200"
            style={{ background: 'rgba(37,99,235,0.12)', color: 'var(--accent-blue)' }}
          >
            <Linkedin size={20} strokeWidth={2} />
          </span>
          <span className="font-satoshi text-sm">LinkedIn</span>
        </a>
      </div>
    </div>
  )
}
