export default function LoadingCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="h-40 w-full bg-gray-100 animate-pulse" />
      <div className="p-3">
        <div className="mb-2">
          <div className="h-5 bg-gray-100 rounded-md w-3/4 animate-pulse mb-2" />
          <div className="h-4 bg-gray-100 rounded-full w-1/4 animate-pulse" />
        </div>
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="h-4 bg-gray-100 rounded w-1/4 animate-pulse" />
              <div className="h-4 bg-gray-100 rounded w-1/3 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 