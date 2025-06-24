import React, { useEffect, useState } from "react"

type Props = {
  startDate: string // formato ISO: "2025-06-20T00:00:00Z"
  endDate: string   // formato ISO
}

function getProgressPercentage(startDate: string, endDate: string): number {
  const now = new Date()
  const start = new Date(startDate)
  const end = new Date(endDate)

  const total = end.getTime() - start.getTime()
  const elapsed = now.getTime() - start.getTime()

  const percent = (elapsed / total) * 100

  return Math.min(100, Math.max(0, percent))
}

export default function LoanProgressBar({ startDate, endDate }: Props) {
  const [progress, setProgress] = useState<number>(
    getProgressPercentage(startDate, endDate)
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(getProgressPercentage(startDate, endDate))
    }, 60000)

    return () => clearInterval(interval)
  }, [startDate, endDate])

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1 text-gray-600">
        <span>{new Date(startDate).toLocaleDateString()}</span>
        <span>{new Date(endDate).toLocaleDateString()}</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className={`h-4 transition-all duration-500 ${
            progress >= 100 ? "bg-red-500" : "bg-indigo-600"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="text-right text-xs mt-1 text-gray-500">
        {progress.toFixed(1)}% of time elapsed
      </div>
    </div>
  )
}
