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
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 240, 255, 0.15)" />
          <XAxis 
            dataKey="fileName" 
            angle={-45}
            textAnchor="end"
            height={100}
            stroke="#60a5fa"
            style={{ fontSize: "11px" }}
            tick={{ fill: "#94a3b8" }}
          />
          <YAxis 
            stroke="#60a5fa"
            style={{ fontSize: "12px" }}
            tick={{ fill: "#94a3b8" }}
            label={{ value: "Mean Expression", angle: -90, position: "insideLeft", style: { fill: "#cbd5e1", fontSize: "13px" } }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.98)",
              border: "1px solid rgba(0, 240, 255, 0.4)",
              borderRadius: "4px",
              color: "#e0f2fe",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)"
            }}
            labelStyle={{ color: "#00f0ff", marginBottom: "8px" }}
          />
          <Bar 
            dataKey="meanExpr" 
            fill="url(#colorGradient)"
            radius={[4, 4, 0, 0]}
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity={0.8} />
              <stop offset="50%" stopColor="#14b8a6" stopOpacity={0.7} />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.6} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

