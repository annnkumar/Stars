"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface FloatingPhotoProps {
  x: number
  y: number
  imageUrl: string
  message: string
}

export default function FloatingPhoto({ x, y, imageUrl, message }: FloatingPhotoProps) {
  // Random gentle floating motion
  const floatX = Math.random() * 40 - 20 // Between -20 and 20
  const floatY = Math.random() * 40 - 20 // Between -20 and 20

  return (
    <motion.div
      className="absolute z-30 pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: floatX,
        y: floatY,
      }}
      transition={{
        opacity: { duration: 0.5 },
        scale: {
          type: "spring",
          stiffness: 300,
          damping: 20,
        },
        x: {
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        },
        y: {
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      }}
    >
      <motion.div
        className="flex flex-col items-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="relative w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-full border-2 border-white shadow-lg">
          <div className="absolute inset-0 rounded-full bg-white bg-opacity-20 backdrop-blur-sm" />
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt="Love memory"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 96px, 128px"
          />
        </div>

        <motion.div
          className="mt-2 px-3 py-1 bg-black bg-opacity-40 backdrop-blur-sm rounded-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-white text-xs md:text-sm text-center font-medium">{message}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
