"use client"

import { useEffect, useRef } from "react"

interface QRCodeProps {
  value: string
  size?: number
  className?: string
}

export function QRCode({ value, size = 200, className = "" }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Simple QR code placeholder - in a real app, you'd use a QR code library
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, size, size)

    // Draw a simple pattern to represent QR code
    ctx.fillStyle = "#000000"
    const cellSize = size / 25

    // Create a simple pattern
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        // Create a pseudo-random pattern based on the value
        const hash = value.split("").reduce((a, b) => {
          a = (a << 5) - a + b.charCodeAt(0)
          return a & a
        }, 0)

        if ((hash + i * j) % 3 === 0) {
          ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize)
        }
      }
    }

    // Add corner squares (typical QR code pattern)
    const cornerSize = cellSize * 7

    // Top-left corner
    ctx.fillRect(0, 0, cornerSize, cornerSize)
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(cellSize, cellSize, cornerSize - 2 * cellSize, cornerSize - 2 * cellSize)
    ctx.fillStyle = "#000000"
    ctx.fillRect(cellSize * 2, cellSize * 2, cornerSize - 4 * cellSize, cornerSize - 4 * cellSize)

    // Top-right corner
    ctx.fillStyle = "#000000"
    ctx.fillRect(size - cornerSize, 0, cornerSize, cornerSize)
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(size - cornerSize + cellSize, cellSize, cornerSize - 2 * cellSize, cornerSize - 2 * cellSize)
    ctx.fillStyle = "#000000"
    ctx.fillRect(size - cornerSize + cellSize * 2, cellSize * 2, cornerSize - 4 * cellSize, cornerSize - 4 * cellSize)

    // Bottom-left corner
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, size - cornerSize, cornerSize, cornerSize)
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(cellSize, size - cornerSize + cellSize, cornerSize - 2 * cellSize, cornerSize - 2 * cellSize)
    ctx.fillStyle = "#000000"
    ctx.fillRect(cellSize * 2, size - cornerSize + cellSize * 2, cornerSize - 4 * cellSize, cornerSize - 4 * cellSize)
  }, [value, size])

  return <canvas ref={canvasRef} width={size} height={size} className={`border border-border rounded ${className}`} />
}
