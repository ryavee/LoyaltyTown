import { Archive, Copy, Eye, Pencil, RotateCcw, Trash2 } from "lucide-react";
import { EnterpriseDataTable } from "../../../Components/enterprise";
import type { DataTableAction, DataTableColumn } from "../../../Components/enterprise";
import type { BrandRecord, CategoryRecord, SkuRecord } from "../../../data/catalogDemoData";
import { StatusBadge } from "./StatusBadge";

const go = (path: string) => {
  window.location.href = path;
};

export const categoryColumns: DataTableColumn<CategoryRecord>[] = [
  { id: "name", header: "Category", accessor: "name", sortable: true },
  { id: "code", header: "Code", accessor: "code", sortable: true },
  { id: "parent", header: "Parent Category", accessor: "parent" },
  { id: "products", header: "Products", accessor: "products", align: "right" },
  { id: "displayOrder", header: "Display Order", accessor: "displayOrder", align: "right" },
  { id: "status", header: "Status", accessor: "status", cell: (row) => <StatusBadge status={row.status} /> },
  { id: "createdAt", header: "Created Date", accessor: "createdAt" },
];

export const brandColumns: DataTableColumn<BrandRecord>[] = [
  { id: "name", header: "Brand", accessor: "name", sortable: true },
  { id: "code", header: "Code", accessor: "code" },
  { id: "country", header: "Country", accessor: "country", sortable: true },
  { id: "industry", header: "Industry", accessor: "industry" },
  { id: "products", header: "Products", accessor: "products", align: "right" },
  { id: "status", header: "Status", accessor: "status", cell: (row) => <StatusBadge status={row.status} /> },
];

export const skuColumns: DataTableColumn<SkuRecord>[] = [
  { id: "skuCode", header: "SKU Code", accessor: "skuCode", sortable: true },
  { id: "product", header: "Product", accessor: "product", sortable: true },
  { id: "category", header: "Category", accessor: "category" },
  { id: "brand", header: "Brand", accessor: "brand" },
  { id: "mrp", header: "MRP", accessor: "mrp", align: "right" },
  { id: "qrRequired", header: "QR Enabled", accessor: "qrRequired" },
  { id: "batchRequired", header: "Batch Enabled", accessor: "batchRequired" },
  { id: "status", header: "Status", accessor: "status", cell: (row) => <StatusBadge status={row.status} /> },
];

export const CategoryTable = ({ rows }: { rows: CategoryRecord[] }) => (
  <EnterpriseDataTable rows={rows} columns={categoryColumns} actions={categoryActions} />
);

export const BrandTable = ({ rows }: { rows: BrandRecord[] }) => (
  <EnterpriseDataTable rows={rows} columns={brandColumns} actions={brandActions} />
);

export const SkuTable = ({ rows, basePath = "/skus" }: { rows: SkuRecord[]; basePath?: string }) => (
  <EnterpriseDataTable rows={rows} columns={skuColumns} actions={skuActions(basePath)} />
);

const categoryActions: DataTableAction<CategoryRecord>[] = [
  { id: "view", label: "View", icon: Eye, onClick: (row) => go(`/categories/${row.id}`) },
  { id: "edit", label: "Edit", icon: Pencil, onClick: (row) => go(`/categories/${row.id}/edit`) },
  { id: "archive", label: "Archive", icon: Archive, onClick: () => undefined },
  { id: "restore", label: "Restore", icon: RotateCcw, onClick: () => undefined },
  { id: "delete", label: "Delete", icon: Trash2, destructive: true, onClick: () => undefined },
];

const brandActions: DataTableAction<BrandRecord>[] = [
  { id: "view", label: "View", icon: Eye, onClick: (row) => go(`/brands/${row.id}`) },
  { id: "edit", label: "Edit", icon: Pencil, onClick: (row) => go(`/brands/${row.id}/edit`) },
  { id: "archive", label: "Archive", icon: Archive, onClick: () => undefined },
  { id: "restore", label: "Restore", icon: RotateCcw, onClick: () => undefined },
  { id: "delete", label: "Delete", icon: Trash2, destructive: true, onClick: () => undefined },
];

const skuActions = (basePath: string): DataTableAction<SkuRecord>[] => [
  { id: "view", label: "View", icon: Eye, onClick: (row) => go(`${basePath}/${row.id}`) },
  { id: "edit", label: "Edit", icon: Pencil, onClick: (row) => go(`${basePath}/${row.id}/edit`) },
  { id: "clone", label: "Clone", icon: Copy, onClick: () => undefined },
  { id: "archive", label: "Archive", icon: Archive, onClick: () => undefined },
  { id: "delete", label: "Delete", icon: Trash2, destructive: true, onClick: () => undefined },
];
