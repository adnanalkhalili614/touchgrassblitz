import { motion } from 'framer-motion'

interface Props {
  title: string
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  fullWidth?: boolean
  disabled?: boolean
  className?: string
}

export function PrimaryButton({
  title,
  onClick,
  variant = 'primary',
  fullWidth = true,
  disabled = false,
  className = '',
}: Props) {
  const base = `
    relative px-6 py-4 rounded-full text-sm font-medium tracking-wide
    transition-all select-none
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
    ${className}
  `

  const styles: Record<typeof variant, React.CSSProperties> = {
    primary:   { background: '#C8956C', color: '#0A0908' },
    secondary: { background: 'transparent', color: '#C8956C', border: '1px solid #C8956C' },
    ghost:     { background: 'transparent', color: '#8A7F78', border: 'none' },
  }

  return (
    <motion.button
      whileTap={disabled ? {} : { scale: 0.96 }}
      whileHover={disabled ? {} : { opacity: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={base}
      style={styles[variant]}
      onClick={disabled ? undefined : onClick}
    >
      {title}
    </motion.button>
  )
}
