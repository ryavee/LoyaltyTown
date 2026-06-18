import api from "./api";

const toApiStatus = (status) =>
  status === "Active" || status === "ACTIVE" ? "ACTIVE" : "INACTIVE";

export const buildProductPayload = (product) => ({
  name: product.productName.trim(),
  sku: product.sku.trim(),
  category: product.category || undefined,
  mrp: Number(product.mrp || 0),
  description: product.description.trim() || undefined,
  imageUrl: product.image?.trim() || undefined,
  basePoints: Number(product.basePoints || 0),
  cashbackAmount: Number(product.cashbackAmount || 0),
  status: toApiStatus(product.status),
});

export const toProductViewModel = (product, fallback = {}) => ({
  ...fallback,
  ...(product || {}),
  id: product?.id ?? fallback.id,
  productName:
    product?.name ?? product?.productName ?? fallback.productName ?? "",
  image: product?.imageUrl ?? product?.image ?? fallback.image ?? "",
  status:
    (product?.status ?? fallback.status) === "INACTIVE" ? "Inactive" : "Active",
});

const unwrapProduct = (response) => {
  const data = response.data?.data ?? response.data;
  return data?.product ?? data;
};

const toAbsoluteImageUrl = (imageUrl) => {
  if (!imageUrl?.trim()) {
    throw new Error("The upload response did not include an image URL.");
  }

  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl;
  }

  const apiBaseUrl = api.defaults.baseURL;
  if (!apiBaseUrl) {
    throw new Error("Cannot resolve the uploaded image URL.");
  }

  return new URL(imageUrl, apiBaseUrl).toString();
};

export const uploadProductImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file, file.name);

  // Let Axios/browser set Content-Type so the multipart boundary is included.
  const response = await api.post("/uploads/product-image", formData);
  const data = response.data?.data ?? response.data;

  return toAbsoluteImageUrl(data?.imageUrl ?? data?.url);
};

export const createProduct = async (product) => {
  const response = await api.post("/products", buildProductPayload(product));
  return unwrapProduct(response);
};

export const updateProduct = async (id, product) => {
  const response = await api.patch(
    `/products/${id}`,
    buildProductPayload(product)
  );
  return unwrapProduct(response);
};
