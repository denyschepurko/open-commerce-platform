export function FormError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
      <p className="text-sm text-red-600">{message}</p>
    </div>
  );
}
