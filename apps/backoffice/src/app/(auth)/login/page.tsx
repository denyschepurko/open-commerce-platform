import { LoginForm } from "@/components/auth/LoginForm";
import { config } from "@/lib/config";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Company Portal</h1>
          <p className="text-sm text-gray-500 mt-2">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
          <LoginForm redirectTo={params.redirect} />
        </div>
        {config.useMockData && (
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">Demo credentials</p>
            <div className="mt-2 space-y-1">
              <p className="text-xs text-gray-500">
                admin@company.com / admin123
              </p>
              <p className="text-xs text-gray-500">
                manager@company.com / manager123
              </p>
              <p className="text-xs text-gray-500">
                support@company.com / support123
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
