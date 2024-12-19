'use client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { format, parseISO } from 'date-fns';

const colors = {
  "Walmart": "#2563eb",
  "Target": "#dc2626",
  "Whole Foods": "#059669",
  "Kroger": "#7c3aed"
};

export default function PriceHistoryChart({ priceHistory }) {
  const dates = Object.values(priceHistory)[0].map(item => item.date);
  const chartData = dates.map((date, index) => {
    const dataPoint = { date };
    Object.entries(priceHistory).forEach(([store, prices]) => {
      dataPoint[store] = prices[index].price;
    });
    return dataPoint;
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
          <p className="font-medium text-gray-900 mb-2">
            {format(parseISO(label), 'MMMM d, yyyy')}
          </p>
          <div className="space-y-1.5">
            {payload.map((entry, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="font-medium text-gray-700">{entry.name}</span>
                <span className="text-gray-900">${entry.value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => format(parseISO(date), 'MMM d')}
            stroke="#64748b"
            tick={{ fill: '#64748b' }}
            tickLine={{ stroke: '#cbd5e1' }}
          />
          <YAxis
            tickFormatter={(value) => `$${value.toFixed(2)}`}
            stroke="#64748b"
            tick={{ fill: '#64748b' }}
            tickLine={{ stroke: '#cbd5e1' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              paddingTop: '24px'
            }}
            formatter={(value) => (
              <span className="text-sm font-medium text-gray-700">{value}</span>
            )}
          />
          {Object.keys(priceHistory).map((store) => (
            <Line
              key={store}
              type="monotone"
              dataKey={store}
              stroke={colors[store]}
              strokeWidth={2.5}
              dot={{
                r: 4,
                strokeWidth: 2,
                fill: '#fff',
                strokeOpacity: 0.8
              }}
              activeDot={{
                r: 6,
                strokeWidth: 0,
                fill: colors[store]
              }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 