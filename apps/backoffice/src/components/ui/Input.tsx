interface InputProps {
  label: string;
  name: string;
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
}

export function Input({
  label,
  name,
  type = "text",
  placeholder,
  required,
  defaultValue,
}: InputProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}
