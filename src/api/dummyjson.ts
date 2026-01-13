export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
  rating: number;
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

const BASE = "https://dummyjson.com";

async function safeJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

export async function fetchProducts(q?: string): Promise<ProductsResponse> {
  const url = q?.trim()
    ? `${BASE}/products/search?q=${encodeURIComponent(q.trim())}`
    : `${BASE}/products`;

  const res = await fetch(url);
  return safeJson<ProductsResponse>(res);
}

export async function fetchProductById(id: number): Promise<Product> {
  const res = await fetch(`${BASE}/products/${id}`);
  return safeJson<Product>(res);
}
