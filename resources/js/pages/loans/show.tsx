import React from "react"
import LoanProgressBar from "@/components/loanProgressBar"

type Props = {
  loan: {
    id: number
    fecha_inicio: string
    fecha_fin: string
    libro: string
  }
}

export default function Show({ loan }: Props) {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Loan Details</h1>

      <div className="bg-white shadow rounded-lg p-4 space-y-4">
        <div>
          <p className="text-gray-800 font-medium mb-1">
            <span className="text-indigo-600">Book:</span> {loan.libro}
          </p>

          <LoanProgressBar
            startDate={loan.fecha_inicio}
            endDate={loan.fecha_fin}
          />
        </div>
      </div>
    </div>
  )
}
