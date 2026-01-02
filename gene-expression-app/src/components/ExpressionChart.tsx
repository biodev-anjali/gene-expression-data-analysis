"use client"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

export default function ExpressionChart({ data }: { data: any[] }) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 240, 255, 0.1)" />
          <XAxis 
            dataKey="fileName" 
            angle={-45}
            textAnchor="end"
            height={80}
            stroke="#60a5fa"
            style={{ fontSize: "12px" }}
          />
          <YAxis 
            stroke="#60a5fa"
            style={{ fontSize: "12px" }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              border: "1px solid rgba(0, 240, 255, 0.5)",
              borderRadius: "4px",
              color: "#e0f2fe"
            }}
          />
          <Bar 
            dataKey="meanExpr" 
            fill="url(#colorGradient)"
            radius={[4, 4, 0, 0]}
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.6} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

