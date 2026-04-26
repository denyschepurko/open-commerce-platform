import Link from "next/link";
import { notFound } from "next/navigation";
import { getCustomerById } from "@/lib/services/customerService";
import { getCustomerFullName } from "@/types/customer";
import { updateCustomerAction } from "@/actions/customers";
import { CustomerForm } from "@/components/customers/CustomerForm";
import { ROUTES } from "@/lib/routes";

interface EditCustomerPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCustomerPage({ params }: EditCustomerPageProps) {
  const { id } = await params;
  const customer = await getCustomerById(id);

  if (!customer) {
    notFound();
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href={ROUTES.CUSTOMER_DETAIL(id)}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to {getCustomerFullName(customer)}
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-1">
          Edit {getCustomerFullName(customer)}
        </h1>
      </div>
      <CustomerForm action={updateCustomerAction} customer={customer} />
    </div>
  );
}
