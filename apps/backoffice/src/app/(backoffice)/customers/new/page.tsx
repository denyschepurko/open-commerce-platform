import Link from "next/link";
import { createCustomerAction } from "@/actions/customers";
import { CustomerForm } from "@/components/customers/CustomerForm";
import { ROUTES } from "@/lib/routes";

export default function NewCustomerPage() {
  return (
    <div>
      <div className="mb-6">
        <Link
          href={ROUTES.CUSTOMERS}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to Customers
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-1">New Customer</h1>
      </div>
      <CustomerForm action={createCustomerAction} />
    </div>
  );
}
