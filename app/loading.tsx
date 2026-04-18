export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6">
      {/* Animated spinner */}
      <div className="relative w-12 h-12">
        <div
          className="absolute inset-0 rounded-full border-4 border-emerald-200
                     border-t-emerald-700 animate-spin"
        />
      </div>

      {/* Text */}
      <div className="text-center">
        <p className="text-gray-700 font-medium">Loading Surahs…</p>
        <p className="text-gray-400 text-sm mt-1">Please wait</p>
      </div>
    </div>
  );
}