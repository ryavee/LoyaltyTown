import { Archive, Copy, Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { EnterpriseDataTable } from "../../../Components/enterprise";
import type { DataTableAction, DataTableColumn } from "../../../Components/enterprise";
import type { ProductRecord } from "../../../data/productDemoData";
import { ProductStatusBadge } from "./ProductStatusBadge";

type ProductTableProps = {
  rows: ProductRecord[];
  visibleColumns: string[];
};

export const productColumns: DataTableColumn<ProductRecord>[] = [
  {
    id: "name",
    header: "Product",
    accessor: "name",
    sortable: true,
    cell: (row) => (
      <div>
        <Link to={`/products/${row.id}`} className="font-semibold text-white hover:text-cyan-200">
          {row.name}
        </Link>
        <p className="mt-1 text-xs text-slate-500">{row.code}</p>
      </div>
    ),
  },
  { id: "brand", header: "Brand", accessor: "brand", sortable: true },
  { id: "category", header: "Category", accessor: "category", sortable: true },
  { id: "status", header: "Status", accessor: "status", cell: (row) => <ProductStatusBadge status={row.status} /> },
  { id: "skuCount", header: "SKUs", accessor: "skuCount", align: "right", sortable: true },
  { id: "qrBatches", header: "QR Batches", accessor: "qrBatches", align: "right", sortable: true },
  { id: "warrantyMonths", header: "Warranty", accessor: (row) => (row.warrantyMonths ? `${row.warrantyMonths} months` : "Missing") },
  { id: "updatedAt", header: "Updated", accessor: "updatedAt", sortable: true },
];

const productActions: DataTableAction<ProductRecord>[] = [
  { id: "view", label: "View", icon: Eye, onClick: (row) => { window.location.href = `/products/${row.id}`; } },
  { id: "edit", label: "Edit", icon: Pencil, onClick: (row) => { window.location.href = `/products/${row.id}/edit`; } },
  { id: "clone", label: "Clone", icon: Copy, onClick: (row) => { window.location.href = `/products/${row.id}/clone`; } },
  { id: "archive", label: "Archive", icon: Archive, onClick: () => undefined },
  { id: "delete", label: "Delete", icon: Trash2, destructive: true, onClick: () => undefined },
];

export const ProductTable = ({ rows, visibleColumns }: ProductTableProps) => (
  <EnterpriseDataTable
    rows={rows}
    columns={productColumns}
    actions={productActions}
    visibleColumns={visibleColumns}
    emptyState={null}
  />
);
