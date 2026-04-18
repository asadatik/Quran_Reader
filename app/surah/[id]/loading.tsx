export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto">

      <div className="mb-6 h-6 w-24 bg-gray-200 rounded-lg skeleton" />

   
      <div className="bg-gradient-to-br from-emerald-900/50 to-emerald-800/50 rounded-3xl p-9 mb-8">
        <div className="space-y-4 mb-6">
          <div className="h-8 w-64 bg-gray-300 rounded-lg skeleton mx-auto" />
          <div className="h-5 w-48 bg-gray-300 rounded-lg skeleton mx-auto" />
        </div>

        <div className="flex items-center justify-center gap-3 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-6 w-28 bg-gray-300 rounded-full skeleton" />
          ))}
        </div>

        <div className="border-t border-gray-300 pt-6">
          <div className="h-8 w-3/4 bg-gray-300 rounded-lg skeleton mx-auto" />
        </div>
      </div>


      <div className="mb-6 h-10 w-full bg-gray-200 rounded-xl skeleton" />

      {/* Ayah skeletons */}
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-5 mb-4 skeleton">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-gray-200" />
            <div className="h-3 w-32 bg-gray-200 rounded" />
          </div>
          <div className="space-y-2 mb-4">
            <div className="h-6 bg-gray-100 rounded w-full" />
            <div className="h-6 bg-gray-100 rounded w-5/6" />
          </div>
          <div className="border-t border-gray-100 pt-4">
            <div className="h-4 bg-gray-50 rounded w-full mb-2" />
            <div className="h-4 bg-gray-50 rounded w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );
}