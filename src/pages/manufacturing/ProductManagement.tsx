import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Archive,
  Copy,
  Download,
  Filter,
  ImageOff,
  PackageCheck,
  Plus,
  Search,
  ShieldAlert,
  Trash2,
  Upload,
} from "lucide-react";
import AppBreadcrumbs from "../../Components/breadcrumbs/AppBreadcrumbs";
import {
  ActionBar,
  AdvancedFilters,
  ColumnVisibility,
  DateRangePicker,
  EmptyState,
  KPIGrid,
  LoadingSkeleton,
  PageToolbar,
  Pagination,
  PrimaryButton,
  SearchInput,
  SecondaryButton,
  Select,
} from "../../Components/enterprise";
import {
  brands,
  categories,
  productKpis,
  products,
  statuses,
  type ProductRecord,
} from "../../data/productDemoData";
import { ExportDialog } from "./products/ExportDialog";
import { ImportWizard } from "./products/ImportWizard";
import { ProductDetailsTabs } from "./products/ProductDetailsTabs";
import { ProductForm } from "./products/ProductForm";
import { ProductStatusBadge } from "./products/ProductStatusBadge";
import { ProductTable, productColumns } from "./products/ProductTable";

type ProductMode = "list" | "create" | "view" | "edit" | "clone" | "import" | "export" | "archive" | "delete" | "details" | "detail";

const isLoading = false;

const productKpiIcons = [PackageCheck, PackageCheck, PackageCheck, Archive, ImageOff, ShieldAlert];

const productKpiItems = productKpis.map((item, index) => ({
  ...item,
  icon: productKpiIcons[index] || PackageCheck,
}));

const options = (items: string[]) => items.map((item) => ({ label: item, value: item }));

const HeaderActions = () => (
  <>
    <Link to="/products/import" className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800">
      <Upload className="h-4 w-4" />
      Import
    </Link>
    <Link to="/products/export" className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-900 px-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800">
      <Download className="h-4 w-4" />
      Export
    </Link>
    <Link to="/products/create" className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
      <Plus className="h-4 w-4" />
      Create Product
    </Link>
  </>
);

const ProductListPage = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [status, setStatus] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [page, setPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState(productColumns.map((column) => column.id));

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesSearch = !normalized || [product.name, product.code, product.brand, product.category].some((value) => value.toLowerCase().includes(normalized));
      const matchesCategory = !category || product.category === category;
      const matchesBrand = !brand || product.brand === brand;
      const matchesStatus = !status || product.status === status;
      return matchesSearch && matchesCategory && matchesBrand && matchesStatus;
    });
  }, [brand, category, query, status]);

  if (isLoading) return <LoadingSkeleton rows={8} />;

  return (
    <div className="space-y-5">
      <PageToolbar
        start={<p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Product Management</p>}
        title="Products"
        description="Enterprise product catalog, connected product readiness, warranty defaults, QR lifecycle, and consumer display governance."
        end={<HeaderActions />}
      />

      <KPIGrid items={productKpiItems} />

      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <section className="rounded-lg border border-slate-800 bg-slate-950/75 p-4">
            <SearchInput value={query} onChange={setQuery} placeholder="Search products, product code, brand, or category" />
          </section>

          <AdvancedFilters
            title="Advanced Filters"
            activeCount={[category, brand, status, dateRange.from, dateRange.to].filter(Boolean).length}
            onReset={() => {
              setCategory("");
              setBrand("");
              setStatus("");
              setDateRange({ from: "", to: "" });
            }}
          >
            <Select label="Category" value={category} onChange={setCategory} options={options(categories)} />
            <Select label="Brand" value={brand} onChange={setBrand} options={options(brands)} />
            <Select label="Status" value={status} onChange={setStatus} options={options(statuses)} />
            <DateRangePicker label="Date Range" value={dateRange} onChange={setDateRange} />
          </AdvancedFilters>

          <ActionBar selectedCount={2}>
            <SecondaryButton icon={Download}>Export Selected</SecondaryButton>
            <SecondaryButton icon={Archive}>Archive</SecondaryButton>
            <SecondaryButton icon={Trash2}>Delete</SecondaryButton>
          </ActionBar>

          {filteredProducts.length ? (
            <>
              <ProductTable rows={filteredProducts} visibleColumns={visibleColumns} />
              <Pagination page={page} pageCount={4} onPageChange={setPage} totalLabel={`Showing ${filteredProducts.length} demo products`} />
            </>
          ) : (
            <EmptyState
              title="No products found"
              description="Adjust filters or create a new product to populate the catalog."
            />
          )}
        </div>

        <ColumnVisibility columns={productColumns} visibleColumns={visibleColumns} onChange={setVisibleColumns} />
      </div>
    </div>
  );
};

const ProductFormPage = ({ mode, product }: { mode: "create" | "edit" | "clone"; product?: ProductRecord }) => (
  <div className="space-y-5">
    <PageToolbar
      start={<p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Product Management</p>}
      title={mode === "create" ? "Create Product" : mode === "edit" ? "Edit Product" : "Clone Product"}
      description={
        mode === "clone"
          ? "Duplicate an existing product and adjust copied fields before saving."
          : "Configure product content, media, documents, warranty defaults, and consumer display settings."
      }
      end={mode === "clone" ? <ProductStatusBadge status="Draft" /> : undefined}
    />
    {mode === "clone" ? (
      <section className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <Copy className="mt-1 h-5 w-5 text-cyan-200" />
            <div>
              <h2 className="text-sm font-semibold text-white">Duplicate product flow</h2>
              <p className="mt-1 text-sm text-cyan-50/80">This frontend-only confirmation prepares a copied product record without creating backend data.</p>
            </div>
          </div>
          <PrimaryButton icon={Copy}>Confirm Clone</PrimaryButton>
        </div>
      </section>
    ) : null}
    <ProductForm mode={mode} product={product} />
  </div>
);

const ProductDetailsPage = ({ product }: { product: ProductRecord }) => (
  <div className="space-y-5">
    <PageToolbar
      start={<p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Product Details</p>}
      title={product.name}
      description={product.description}
      end={
        <>
          <ProductStatusBadge status={product.status} />
          <Link to={`/products/${product.id}/edit`} className="inline-flex h-10 items-center gap-2 rounded-md bg-cyan-400 px-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
            Edit Product
          </Link>
        </>
      }
    />
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {[
        ["Product Code", product.code],
        ["Brand", product.brand],
        ["Category", product.category],
        ["Updated", product.updatedAt],
      ].map(([label, value]) => (
        <div key={label} className="rounded-lg border border-slate-800 bg-slate-950/75 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p>
          <p className="mt-2 text-lg font-semibold text-white">{value}</p>
        </div>
      ))}
    </section>
    <ProductDetailsTabs product={product} />
  </div>
);

const ProductManagement = ({ mode = "list" }: { mode?: ProductMode }) => {
  const { id } = useParams();
  const product = products.find((item) => item.id === id) || products[0];
  const normalizedMode = mode === "detail" || mode === "details" ? "view" : mode;

  return (
    <div className="space-y-5">
      <AppBreadcrumbs />
      {normalizedMode === "list" ? <ProductListPage /> : null}
      {normalizedMode === "create" ? <ProductFormPage mode="create" /> : null}
      {normalizedMode === "edit" ? <ProductFormPage mode="edit" product={product} /> : null}
      {normalizedMode === "clone" ? <ProductFormPage mode="clone" product={product} /> : null}
      {normalizedMode === "view" ? <ProductDetailsPage product={product} /> : null}
      {normalizedMode === "import" ? (
        <div className="space-y-5">
          <PageToolbar
            start={<p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Bulk Import</p>}
            title="Import Products"
            description="Upload, preview, validate, confirm, and summarize product catalog imports with static frontend data."
          />
          <ImportWizard />
        </div>
      ) : null}
      {normalizedMode === "export" ? (
        <div className="space-y-5">
          <PageToolbar
            start={<p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Export</p>}
            title="Export Products"
            description="Select fields, format, filters, and generate a frontend-only export package."
          />
          <ExportDialog />
        </div>
      ) : null}
      {normalizedMode === "archive" || normalizedMode === "delete" ? (
        <EmptyState
          title={`${normalizedMode === "archive" ? "Archive" : "Delete"} flow placeholder`}
          description="This route is present for product lifecycle actions. Confirmation logic will be connected in a later backend sprint."
        />
      ) : null}
    </div>
  );
};

export default ProductManagement;
