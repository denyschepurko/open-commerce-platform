interface TextareaProps {
  label: string;
  name: string;
  rows?: number;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  error?: string;
}

export function Textarea({
  label,
  name,
  rows = 3,
  placeholder,
  required,
  defaultValue,
  error,
}: TextareaProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${error ? "border-red-500" : "border-gray-300"}`}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
