import type { Product } from "@/types/product";
import { Card } from "@/components/ui/Card";

export function ProductMediaGallery({ product }: { product: Product }) {
  if (product.media.length === 0) return null;

  return (
    <Card>
      <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
        Media ({product.media.length} files)
      </h2>
      <div className="grid grid-cols-6 gap-3">
        {product.media.map((m, i) => (
          <div key={i} className="relative group">
            {m.type === "image" ? (
              <img
                src={m.url}
                alt={m.altText ?? product.name}
                className="w-full h-24 object-cover rounded-lg bg-gray-100"
              />
            ) : (
              <div className="w-full h-24 rounded-lg bg-gray-100 flex flex-col items-center justify-center">
                <span className="text-xs text-gray-500 uppercase">
                  {m.type}
                </span>
              </div>
            )}
            {m.isPrimary && (
              <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-blue-600 text-white text-xs rounded font-medium">
                Primary
              </span>
            )}
            <p className="text-xs text-gray-500 mt-1 truncate">
              {m.altText ?? `${m.type} ${i + 1}`}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
