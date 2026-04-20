import { getCurrentUser } from "@/lib/auth";
import { logoutAction } from "@/actions/auth";

export async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold text-gray-800">
        Welcome back, {user?.fullName ?? ""}
      </h2>
      <div className="flex items-center gap-4">
        {user?.role && (
          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            {user.role}
          </span>
        )}
        <form action={logoutAction}>
          <button
            type="submit"
            className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            Logout
          </button>
        </form>
      </div>
    </header>
  );
}
