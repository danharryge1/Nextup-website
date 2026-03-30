import { Mail, MapPin, Linkedin } from 'lucide-react'
import { COMPANY_EMAIL, COMPANY_LOCATION, CONTACT_TEXT, TEAM_MEMBERS } from '@/lib/constants'

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-[var(--foreground-muted)] text-base leading-relaxed">
        {CONTACT_TEXT}
      </p>

      <div className="flex flex-col gap-4 mt-2">
        <a
          href={`mailto:${COMPANY_EMAIL}`}
          className="flex items-center gap-3 text-[var(--foreground)] hover:text-accent-blue transition-colors duration-200"
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
      </div>

      {/* Team LinkedIn links */}
      <div>
        <p className="font-satoshi text-sm font-semibold text-[var(--foreground-muted)] mb-3 uppercase tracking-widest" style={{ fontSize: '0.7rem' }}>
          Connect with us
        </p>
        <div className="flex flex-col gap-3">
          {TEAM_MEMBERS.map((member) => (
            <a
              key={member.name}
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[var(--foreground)] hover:text-[var(--accent-teal)] transition-colors duration-200 group"
              aria-label={`${member.name} on LinkedIn`}
            >
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-[rgba(13,148,136,0.15)]"
                style={{ background: 'rgba(37,99,235,0.10)', color: 'var(--accent-blue)' }}
              >
                <Linkedin size={15} strokeWidth={2} />
              </span>
              <span className="font-satoshi text-sm">{member.name}, {member.role}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
