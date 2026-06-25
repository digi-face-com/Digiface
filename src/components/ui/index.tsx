import { ReactNode, ButtonHTMLAttributes } from 'react'

// ════════════════════════════════════════
// Button
// ════════════════════════════════════════
type ButtonVariant = 'primary' | 'gold' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-gradient-to-br from-purple to-purple-2 text-white shadow-[0_8px_32px_rgba(124,58,237,0.35)] hover:shadow-[0_12px_44px_rgba(124,58,237,0.5)]',
  gold: 'bg-gradient-to-br from-gold to-[#a06020] text-white shadow-[0_8px_32px_rgba(201,151,58,0.3)] hover:shadow-[0_12px_44px_rgba(201,151,58,0.45)]',
  ghost: 'bg-transparent text-muted border border-border hover:text-text hover:border-border2 hover:bg-purple/5',
  danger: 'bg-red/10 text-red border border-red/25 hover:bg-red/15',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-8 py-3.5 text-base rounded-xl',
}

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  return (
    <button
      className={`font-bold transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center gap-2 justify-center ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

// ════════════════════════════════════════
// Card
// ════════════════════════════════════════
export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-card2 border border-border rounded-2xl p-4 ${className}`}>
      {children}
    </div>
  )
}

export function CardSm({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-card2 border border-border rounded-xl p-3 ${className}`}>
      {children}
    </div>
  )
}

// ════════════════════════════════════════
// Pill / Badge
// ════════════════════════════════════════
type PillColor = 'purple' | 'gold' | 'green' | 'red' | 'blue' | 'orange' | 'muted'

const pillClasses: Record<PillColor, string> = {
  purple: 'bg-purple/15 text-purple-light border-purple/25',
  gold: 'bg-gold/15 text-gold-2 border-gold/25',
  green: 'bg-green/15 text-green border-green/25',
  red: 'bg-red/15 text-red border-red/25',
  blue: 'bg-blue/15 text-blue border-blue/25',
  orange: 'bg-orange/15 text-orange border-orange/25',
  muted: 'bg-white/5 text-muted border-border',
}

export function Pill({ children, color = 'purple', className = '' }: { children: ReactNode; color?: PillColor; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${pillClasses[color]} ${className}`}>
      {children}
    </span>
  )
}

// ════════════════════════════════════════
// AI Badge
// ════════════════════════════════════════
export function AiBadge({ children = 'AI' }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold bg-purple/10 border border-purple/25 text-purple-light">
      🧠 {children}
    </span>
  )
}

// ════════════════════════════════════════
// Phase 2 Badge ("بزودی")
// ════════════════════════════════════════
export function Phase2Badge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] italic text-gold-2/70 bg-gold/8 border border-gold/20">
      🔜 بزودی — فاز ۲
    </span>
  )
}

// ════════════════════════════════════════
// Timer
// ════════════════════════════════════════
export function Timer({ label, urgent = false }: { label: string; urgent?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border ${
        urgent ? 'bg-red/10 border-red/25 text-red' : 'bg-orange/10 border-orange/25 text-orange'
      }`}
    >
      ⏱ {label}
    </span>
  )
}

// ════════════════════════════════════════
// Toggle Switch
// ════════════════════════════════════════
export function Toggle({ on, onChange }: { on: boolean; onChange?: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange?.(!on)}
      className={`w-9 h-5 rounded-full relative flex-shrink-0 transition-colors ${on ? 'bg-purple' : 'bg-muted2'}`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${on ? 'right-0.5' : 'left-0.5'}`}
      />
    </button>
  )
}

// ════════════════════════════════════════
// Section wrapper
// ════════════════════════════════════════
export function Section({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`px-6 md:px-10 py-12 md:py-20 ${className}`}>{children}</section>
}

export function SectionHeader({
  eyebrow,
  title,
  accent,
  action,
}: {
  eyebrow: string
  title: string
  accent?: string
  action?: ReactNode
}) {
  return (
    <div className="flex items-end justify-between mb-10 flex-wrap gap-3">
      <div>
        <div className="text-[11px] tracking-[4px] uppercase text-gold font-semibold mb-2">{eyebrow}</div>
        <h2 className="font-display text-[clamp(28px,4vw,46px)] font-bold leading-tight">
          {title} {accent && <span className="text-gold-gradient">{accent}</span>}
        </h2>
      </div>
      {action}
    </div>
  )
}

// ════════════════════════════════════════
// Score Tier Badge
// ════════════════════════════════════════
const tierConfig = {
  BRONZE: { emoji: '🥉', label: 'برنز', color: '#cd7f32', bg: 'rgba(180,140,100,0.1)', border: 'rgba(180,140,100,0.25)' },
  SILVER: { emoji: '🥈', label: 'نقره', color: '#aaaaaa', bg: 'rgba(192,192,192,0.1)', border: 'rgba(192,192,192,0.3)' },
  GOLD: { emoji: '🥇', label: 'طلا', color: '#f0c060', bg: 'rgba(201,151,58,0.1)', border: 'rgba(201,151,58,0.3)' },
  PLATINUM: { emoji: '💎', label: 'پلاتین', color: '#a78bfa', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.3)' },
}

export function ScoreBadge({ tier }: { tier: keyof typeof tierConfig }) {
  const cfg = tierConfig[tier]
  return (
    <div
      className="rounded-xl px-3 py-2.5 flex items-center gap-2.5 border"
      style={{ background: cfg.bg, borderColor: cfg.border }}
    >
      <div className="text-lg">{cfg.emoji}</div>
      <div>
        <div className="text-[10px] font-bold" style={{ color: cfg.color }}>{cfg.label}</div>
      </div>
    </div>
  )
}

// ════════════════════════════════════════
// Big Data floating indicator
// ════════════════════════════════════════
export function BigDataIndicator() {
  return (
    <div className="fixed bottom-3 left-3 bg-bg/90 border border-purple/20 rounded-lg px-2.5 py-1.5 text-[9px] text-muted flex items-center gap-1.5 z-50">
      <span className="w-1.5 h-1.5 bg-green rounded-full animate-pulse-dot" />
      📊 Big Data — رفتار کاربران در حال ثبت
    </div>
  )
}