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
import { format } from 'date-fns';

const colors = {
  "Zepto": "#2563eb",
  "Blinkit": "#dc2626",
  "D-Mart": "#059669"
};

const parseMongoDate = (dateStr) => {
  try {
    // Handle MongoDB ISODate format
    if (typeof dateStr === 'object' && dateStr.$date) {
      return new Date(dateStr.$date).getTime();
    }
    // Handle regular date string
    return new Date(dateStr).getTime();
  } catch (error) {
    console.error('Error parsing date:', error);
    return null;
  }
};

export default function PriceHistoryChart({ products }) {
  if (!products || !Array.isArray(products) || products.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center text-gray-500">
        No price history data available
      </div>
    );
  }

  // Get all unique dates across all products
  const allDates = [...new Set(products.flatMap(p =>
    (p.priceHistory || []).map(h => parseMongoDate(h.date))
  ))].filter(Boolean).sort();

  // Create chart data with prices from all platforms for each date
  const chartData = allDates.map(timestamp => {
    const dataPoint = { date: timestamp };
    products.forEach(product => {
      if (product.priceHistory) {
        const historyEntry = product.priceHistory.find(h =>
          parseMongoDate(h.date) === timestamp
        );
        if (historyEntry) {
          dataPoint[product.platform] = parseFloat(historyEntry.price.replace('₹', ''));
        }
      }
    });
    return dataPoint;
  });

  if (chartData.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center text-gray-500">
        No price history data available
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
          <p className="font-medium text-gray-900 mb-2">
            {format(new Date(label), 'MMMM d, yyyy')}
          </p>
          <div className="space-y-1.5">
            {payload.map((entry, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="font-medium text-gray-700">{entry.name}</span>
                <span className="text-gray-900">₹{entry.value.toFixed(2)}</span>
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
            type="number"
            domain={['auto', 'auto']}
            tickFormatter={(timestamp) => format(new Date(timestamp), 'MMM d, HH:mm')}
            stroke="#64748b"
            tick={{ fill: '#64748b' }}
            tickLine={{ stroke: '#cbd5e1' }}
          />
          <YAxis
            tickFormatter={(value) => `₹${value.toFixed(2)}`}
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
          {products.map((product) => (
            <Line
              key={product._id}
              type="monotone"
              dataKey={product.platform}
              name={`${product.platform} (${product.variant || 'Default'})`}
              stroke={colors[product.platform]}
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
                fill: colors[product.platform]
              }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 