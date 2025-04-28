"use client"

import { motion } from "framer-motion"

interface ShootingStarProps {
  x: number
  y: number
}

export default function ShootingStar({ x, y }: ShootingStarProps) {
  // Calculate a random diagonal direction
  const angle = (Math.random() * Math.PI) / 4 + Math.PI / 8 // Between PI/8 and 3PI/8
  const distance = Math.random() * 200 + 200 // Between 200 and 400 pixels

  const endX = x + Math.cos(angle) * distance
  const endY = y + Math.sin(angle) * distance

  return (
    <motion.div
      className="absolute z-20 pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 1 }}
      animate={{
        opacity: 0,
        x: endX - x,
        y: endY - y,
      }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
    >
      <motion.div
        className="w-1 h-1 bg-white rounded-full"
        animate={{
          boxShadow: [
            "0 0 4px 2px rgba(255, 255, 255, 0.7), 0 0 10px 5px rgba(255, 255, 255, 0.5), 0 0 20px 10px rgba(255, 255, 255, 0.3)",
            "0 0 2px 1px rgba(255, 255, 255, 0.7), 0 0 5px 2px rgba(255, 255, 255, 0.5), 0 0 10px 5px rgba(255, 255, 255, 0.3)",
          ],
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
      />
    </motion.div>
  )
}
