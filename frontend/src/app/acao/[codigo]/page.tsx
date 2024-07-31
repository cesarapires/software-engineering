'use client'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import Api from '@/lib/api'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
} from 'recharts'

export default function VisualizarAcao({
  params,
}: {
  params: { codigo: string }
}) {
  const [acao, setAcao] = useState()

  useEffect(() => {
    Api.get(`/v1/acao/${params.codigo}`).then(response =>
      setAcao(response.data)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex max-w-full flex-col justify-between px-4 md:px-6">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={acao?.logourl}
            width={40}
            height={40}
            alt="Company Logo"
            className="rounded-full"
          />
          <div>
            <h2 className="text-lg font-bold">{acao?.longName}</h2>
            <p className="text-sm text-muted-foreground">{acao?.symbol}</p>
          </div>
        </div>
        <div className="text-2xl font-bold">$102.50</div>
      </div>

      <LinechartChart data={acao?.historicalDataPrice} />
    </div>
  )
}

interface LinechartProps {
  data: any[]
}

function LinechartChart({ data }: LinechartProps) {
  return (
    <ResponsiveContainer width="100%" height={600} minWidth={150}>
      <ChartContainer
        config={{
          close: {
            label: 'Valor',
            color: 'hsl(var(--chart-4))',
          },
        }}
      >
        <LineChart
          accessibilityLayer
          data={data}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={true} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            interval={0}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="close"
            type="natural"
            stroke="var(--color-close)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </ResponsiveContainer>
  )
}
