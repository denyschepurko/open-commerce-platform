import { getCurrentUser } from "@/lib/auth";
import { NavLinks } from "./NavLinks";

export async function Sidebar() {
  const user = await getCurrentUser();

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold">Company Portal</h1>
        <p className="text-sm text-gray-400">Admin Dashboard</p>
      </div>

      <NavLinks />

      <div className="p-4 border-t border-gray-700">
        <p className="text-sm font-medium">{user?.fullName ?? ""}</p>
        <p className="text-xs text-gray-400">{user?.email ?? ""}</p>
      </div>
    </aside>
  );
}
