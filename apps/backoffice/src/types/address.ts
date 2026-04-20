import { AddressType } from "./enums";

export interface Address {
  type?: AddressType;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault?: boolean;
}

export function getFullAddress(addr: Address): string {
  const line2 = addr.addressLine2 ? `, ${addr.addressLine2}` : "";
  return `${addr.addressLine1}${line2}, ${addr.city}, ${addr.state} ${addr.zip}, ${addr.country}`;
}
