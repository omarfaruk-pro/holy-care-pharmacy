// CardSkeleton.jsx
export default function CardSkeleton() {
  return (
    <div className="card bg-base-100 shadow-md animate-pulse cursor-default transition-transform duration-200">
      <div className="flex flex-col gap-2 px-4 py-5 text-center items-center justify-between">
        {/* Icon placeholder */}
        <div className="h-8 w-8 rounded-full bg-gray-300 mb-2"></div>
        {/* Title placeholder */}
        <div className="h-1 w-full rounded bg-gray-300 mb-1"></div>
        {/* Number placeholder */}
        <div className="h-1 w-full rounded bg-gray-300"></div>
      </div>
    </div>
  );
}
