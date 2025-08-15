export default function BannerLoader() {
  return (
    <div className="flex items-center justify-center h-[400px] w-full">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-blue-400 border-t-transparent animate-spin"></div>
        <div className="absolute inset-1 rounded-full bg-white flex items-center justify-center text-blue-600 font-semibold">
          <span className="text-xs">Holy</span>
        </div>
      </div>
    </div>
  );
}
