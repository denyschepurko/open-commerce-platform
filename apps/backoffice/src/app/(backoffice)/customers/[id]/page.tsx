import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCustomerById,
  getCustomerOrders,
} from "@/lib/services/customerService";
import { getCustomerFullName, getCustomerTier } from "@/types/customer";
import { Button } from "@/components/ui/Button";
import { CustomerMetrics } from "@/components/customers/CustomerMetrics";
import { CustomerContactCard } from "@/components/customers/CustomerContactCard";
import { CustomerAddresses } from "@/components/customers/CustomerAddresses";
import { CustomerOrderHistory } from "@/components/customers/CustomerOrderHistory";
import { ROUTES } from "@/lib/routes";
import { formatDate } from "@/lib/formatters";

interface CustomerDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CustomerDetailPage({
  params,
}: CustomerDetailPageProps) {
  const { id } = await params;
  const customer = await getCustomerById(id);

  if (!customer) {
    notFound();
  }

  const orders = await getCustomerOrders(id);
  const fullName = getCustomerFullName(customer);
  const tier = getCustomerTier(customer.totalSpent);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <Link
            href={ROUTES.CUSTOMERS}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to Customers
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">{fullName}</h1>
          <p className="text-sm text-gray-500 mt-1">
            Customer since {formatDate(customer.createdAt)}
          </p>
        </div>
        <div className="flex gap-2">
          <Button href={ROUTES.CUSTOMER_EDIT(customer.id)} variant="secondary">
            Edit
          </Button>
        </div>
      </div>

      {/* Tier badge */}
      <div className="flex gap-3 mb-6">
        <span
          className={`px-2.5 py-1 text-xs font-medium rounded-full ${tier.color}`}
        >
          {tier.label}
        </span>
      </div>

      <CustomerMetrics customer={customer} />

      <div className="grid grid-cols-3 gap-6 mb-6">
        <CustomerContactCard customer={customer} />
        <CustomerAddresses addresses={customer.addresses} />
      </div>

      <CustomerOrderHistory orders={orders} />
    </div>
  );
}
