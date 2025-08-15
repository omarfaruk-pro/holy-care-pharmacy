export default function SkeletonTableLoader() {
  return (
    <div className=" bg-white shadow-md rounded-lg animate-pulse overflow-x-auto">
      <table className="min-w-lg w-full text-left text-sm">
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="border-b">
              {/* Avatar */}
              <td className="px-4 py-4">
                <div className="skeleton w-10 h-10 rounded-full"></div>
              </td>

              {/* Name */}
              <td className="px-4 py-4">
                <div className="skeleton h-4 w-32 rounded"></div>
              </td>

              {/* Email */}
              <td className="px-4 py-4">
                <div className="skeleton h-4 w-48 rounded"></div>
              </td>

              {/* Role */}
              <td className="px-4 py-4">
                <div className="skeleton h-4 w-20 rounded"></div>
              </td>

              {/* Action */}
              <td className="px-4 py-4 flex gap-2">
                <div className="skeleton w-8 h-8 rounded-full"></div>
                <div className="skeleton w-8 h-8 rounded-full"></div>
                <div className="skeleton w-8 h-8 rounded-full"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
