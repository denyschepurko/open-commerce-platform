import type { Product } from "@/types/product";
import { getPrimaryImageUrl } from "@/types/product";
import { Card } from "@/components/ui/Card";

export function ProductImageCard({ product }: { product: Product }) {
  const primaryImage = getPrimaryImageUrl(product);

  return (
    <Card>
      {primaryImage ? (
        <img
          src={primaryImage}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg bg-gray-100"
        />
      ) : (
        <div className="w-full h-48 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
          No image available
        </div>
      )}
      {product.media.length > 1 && (
        <div className="flex gap-2 mt-3">
          {product.media.slice(0, 4).map((m, i) => (
            <div
              key={i}
              className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden"
            >
              {m.type === "image" ? (
                <img
                  src={m.url}
                  alt={m.altText ?? ""}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                  {m.type}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
