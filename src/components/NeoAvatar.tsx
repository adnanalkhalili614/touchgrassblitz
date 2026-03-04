import { motion } from 'framer-motion'

export type NeoAvatarSize = 'small' | 'medium' | 'large'

const SIZE: Record<NeoAvatarSize, number> = { small: 36, medium: 64, large: 120 }

interface Props {
  size?: NeoAvatarSize
  isActive?: boolean
  className?: string
}

export function NeoAvatar({ size = 'medium', isActive = false, className = '' }: Props) {
  const px = SIZE[size]

  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: px, height: px }}
      animate={{ scale: isActive ? [1, 1.06, 1] : [0.97, 1.03, 0.97] }}
      transition={{
        duration: isActive ? 1.5 : 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(200,149,108,${isActive ? 0.35 : 0.18}) 0%, transparent 70%)`,
          transform: 'scale(1.6)',
          filter: 'blur(8px)',
        }}
      />

      {/* Mid glow ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(232,196,160,${isActive ? 0.25 : 0.12}) 0%, transparent 65%)`,
          transform: 'scale(1.25)',
          filter: 'blur(4px)',
        }}
      />

      {/* Core orb */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 40% 35%,
            #E8C4A0 0%,
            #C8956C 35%,
            #8B5E3C 65%,
            #4A3020 100%)`,
          boxShadow: isActive
            ? '0 0 20px rgba(200,149,108,0.6), inset 0 1px 0 rgba(255,255,255,0.2)'
            : '0 0 10px rgba(200,149,108,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
        }}
      />

      {/* Specular highlight */}
      <div
        className="absolute rounded-full"
        style={{
          width: '30%',
          height: '25%',
          top: '15%',
          left: '20%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 100%)',
          filter: 'blur(1px)',
        }}
      />
    </motion.div>
  )
}
