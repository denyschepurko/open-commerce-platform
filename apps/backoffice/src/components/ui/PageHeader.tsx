export function PageHeader({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      {children}
    </div>
  );
}
