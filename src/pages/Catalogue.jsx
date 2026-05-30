import React, { useMemo, useState } from "react";
import {
  Check,
  Eye,
  FileText,
  Loader,
  Plus,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { toast } from "react-hot-toast";

const initialCatalogues = [
  {
    id: "CAT1001",
    name: "Premium Cement Catalogue",
    hindiName: "प्रीमियम सीमेंट कैटलॉग",
    fileName: "premium-cement.pdf",
    url: "#",
    createdAt: "2026-05-30",
  },
  {
    id: "CAT1002",
    name: "Paints & Primer Catalogue",
    hindiName: "पेंट्स और प्राइमर कैटलॉग",
    fileName: "paints-primer.pdf",
    url: "#",
    createdAt: "2026-05-28",
  },
  {
    id: "CAT1003",
    name: "Waterproofing Catalogue",
    hindiName: "वॉटरप्रूफिंग कैटलॉग",
    fileName: "waterproofing.pdf",
    url: "#",
    createdAt: "2026-05-24",
  },
];

const emptyCatalogue = {
  name: "",
  hindiName: "",
  pdf: null,
};

const Catalogue = () => {
  const [catalogues, setCatalogues] = useState(initialCatalogues);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCatalogue, setNewCatalogue] = useState(emptyCatalogue);
  const [dragOver, setDragOver] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [catalogueToDelete, setCatalogueToDelete] = useState(null);

  const filteredCatalogues = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    return catalogues.filter((catalogue) =>
      [
        catalogue.id,
        catalogue.name,
        catalogue.hindiName,
        catalogue.fileName,
      ].some((value) => value?.toString().toLowerCase().includes(q))
    );
  }, [catalogues, searchTerm]);

  const handleFileSelect = (file) => {
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please select a valid PDF file");
      return;
    }

    setNewCatalogue((current) => ({
      ...current,
      pdf: file,
    }));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    handleFileSelect(event.dataTransfer.files[0]);
  };

  const handleCreateCatalogue = () => {
    if (
      !newCatalogue.name.trim() ||
      !newCatalogue.hindiName.trim() ||
      !newCatalogue.pdf
    ) {
      toast.error("Catalogue name, Hindi name, and PDF are required");
      return;
    }

    setIsCreating(true);

    setTimeout(() => {
      setCatalogues((current) => [
        {
          id: `CAT${Date.now().toString().slice(-4)}`,
          name: newCatalogue.name.trim(),
          hindiName: newCatalogue.hindiName.trim(),
          fileName: newCatalogue.pdf.name,
          url: "#",
          createdAt: new Date().toISOString().split("T")[0],
        },
        ...current,
      ]);
      setNewCatalogue(emptyCatalogue);
      setShowCreateModal(false);
      setIsCreating(false);
      toast.success("Catalogue created successfully");
    }, 500);
  };

  const handleDeleteCatalogue = () => {
    if (!catalogueToDelete) return;

    setCatalogues((current) =>
      current.filter((catalogue) => catalogue.id !== catalogueToDelete.id)
    );
    setCatalogueToDelete(null);
    toast.success("Catalogue deleted successfully");
  };

  return (
    <div className="min-h-screen bg-[#F8F5FC] px-3 py-3 sm:px-4 sm:py-4">
      <div className="mb-4">
        <h1 className="text-[24px] font-bold leading-tight text-[#5B3FD6]">
          Catalogue Management
        </h1>
        <p className="mt-0.5 text-[13px] text-[#7C7297]">
          Create, organize, and manage product PDF catalogues.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        {[
          {
            title: "Total Catalogues",
            value: catalogues.length,
            icon: FileText,
            color: "bg-[#EEE8FF] text-[#5B3FD6]",
          },
          {
            title: "PDF Files",
            value: catalogues.length,
            icon: Upload,
            color: "bg-[#E8F0FF] text-[#4F7CFF]",
          },
          {
            title: "Recently Added",
            value: catalogues.filter(
              (catalogue) =>
                new Date(catalogue.createdAt) >=
                new Date(new Date().setDate(new Date().getDate() - 7))
            ).length,
            icon: Check,
            color: "bg-[#EAFBF2] text-[#36B37E]",
          },
        ].map((stat) => (
          <div
            key={stat.title}
            className="bg-white/95 rounded-xl border border-[#E7DFF2] px-4 py-3.5 flex items-center gap-3 shadow-[0_1px_2px_rgba(43,35,64,0.04)]"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}
            >
              <stat.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[12px] leading-4 text-[#8E8AA2]">
                {stat.title}
              </p>
              <h3 className="text-xl font-bold leading-6 text-[#2B2340]">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/95 rounded-xl border border-[#E7DFF2] p-3 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-[0_1px_2px_rgba(43,35,64,0.04)]">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AAA2BE]" />
          <input
            type="text"
            placeholder="Search catalogue name, Hindi name or file..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none focus:ring-2 focus:ring-[#E7DDF8]"
          />
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#5B3FD6] hover:bg-[#4C32C7] text-white text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Create Catalogue
        </button>
      </div>

      {filteredCatalogues.length === 0 ? (
        <div className="bg-white/95 rounded-xl border border-[#E7DFF2] p-12 text-center text-[#8E8AA2]">
          <FileText className="w-9 h-9 mx-auto mb-3 text-[#AAA2BE]" />
          <h3 className="text-base font-semibold text-[#2B2340]">
            No catalogues found
          </h3>
          <p className="mt-1 text-sm">Create your first product catalogue.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {filteredCatalogues.map((catalogue) => (
            <div
              key={catalogue.id}
              className="group bg-white/95 rounded-xl border border-[#E7DFF2] p-4 shadow-[0_1px_2px_rgba(43,35,64,0.04)] hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#EEE8FF] text-[#5B3FD6] flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-[#2B2340] truncate">
                      {catalogue.name}
                    </h3>
                    <p className="text-xs text-[#7C7297] mt-1 truncate">
                      {catalogue.hindiName}
                    </p>
                    <p className="text-xs text-[#8E8AA2] mt-2 truncate">
                      {catalogue.fileName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={catalogue.url}
                    className="w-8 h-8 rounded-lg bg-[#EEE8FF] hover:bg-[#E7DDF8] text-[#5B3FD6] flex items-center justify-center"
                    title="View catalogue"
                  >
                    <Eye className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setCatalogueToDelete(catalogue)}
                    className="w-8 h-8 rounded-lg bg-[#FFEAF1] hover:bg-[#FFDDE7] text-[#E05A74] flex items-center justify-center"
                    title="Delete catalogue"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-xl bg-white border border-[#E7DFF2] shadow-xl relative">
            {isCreating && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 rounded-xl">
                <Loader className="w-8 h-8 text-[#5B3FD6] animate-spin" />
                <p className="mt-2 text-sm font-medium text-[#2B2340]">
                  Creating catalogue...
                </p>
              </div>
            )}

            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E7DFF2]">
              <div>
                <h2 className="text-lg font-semibold text-[#5B3FD6]">
                  Create Catalogue
                </h2>
                <p className="mt-0.5 text-sm text-[#7C7297]">
                  Upload a PDF catalogue for dealers and customers.
                </p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                disabled={isCreating}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#F4F0FB] text-[#7C7297]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                  Catalogue Name
                </label>
                <input
                  type="text"
                  value={newCatalogue.name}
                  onChange={(event) =>
                    setNewCatalogue((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  placeholder="Enter catalogue name"
                  className="w-full px-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none focus:ring-2 focus:ring-[#E7DDF8]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                  Catalogue Name (Hindi)
                </label>
                <input
                  type="text"
                  value={newCatalogue.hindiName}
                  onChange={(event) =>
                    setNewCatalogue((current) => ({
                      ...current,
                      hindiName: event.target.value,
                    }))
                  }
                  placeholder="कैटलॉग का नाम दर्ज करें"
                  className="w-full px-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none focus:ring-2 focus:ring-[#E7DDF8]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2B2340] mb-1.5">
                  Upload PDF
                </label>

                <div
                  className={`rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
                    dragOver
                      ? "border-[#5B3FD6] bg-[#EEE8FF]"
                      : newCatalogue.pdf
                        ? "border-[#36B37E] bg-[#EAFBF2]"
                        : "border-[#DCD4EA] bg-[#FAF8FE] hover:border-[#CFC0EF]"
                  }`}
                  onDrop={handleDrop}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={(event) => {
                    event.preventDefault();
                    setDragOver(false);
                  }}
                >
                  {newCatalogue.pdf ? (
                    <div className="flex items-center justify-center gap-2 text-[#36B37E]">
                      <Check className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        {newCatalogue.pdf.name}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-8 h-8 text-[#AAA2BE] mx-auto mb-2" />
                      <p className="text-sm text-[#7C7297] mb-1">
                        Drop your PDF here or
                      </p>
                      <label className="text-sm text-[#5B3FD6] hover:text-[#4C32C7] cursor-pointer font-medium">
                        browse files
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(event) =>
                            handleFileSelect(event.target.files[0])
                          }
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                </div>

                {newCatalogue.pdf && (
                  <button
                    onClick={() =>
                      setNewCatalogue((current) => ({ ...current, pdf: null }))
                    }
                    className="mt-2 text-sm text-[#E05A74] hover:text-[#D84B66]"
                  >
                    Remove file
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 px-5 py-4 border-t border-[#E7DFF2]">
              <button
                onClick={() => setShowCreateModal(false)}
                disabled={isCreating}
                className="px-4 py-2 rounded-lg bg-[#F4F0FB] hover:bg-[#EEE8FF] text-[#5B3FD6] text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCatalogue}
                disabled={isCreating}
                className="px-4 py-2 rounded-lg bg-[#5B3FD6] hover:bg-[#4C32C7] text-white text-sm font-medium disabled:opacity-60"
              >
                Create Catalogue
              </button>
            </div>
          </div>
        </div>
      )}

      {catalogueToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl bg-white border border-[#E7DFF2] shadow-xl p-6">
            <h2 className="text-lg font-semibold text-[#5B3FD6]">
              Delete Catalogue
            </h2>
            <p className="mt-2 text-sm text-[#7C7297]">
              Are you sure you want to delete{" "}
              <span className="font-medium text-[#2B2340]">
                {catalogueToDelete.name}
              </span>
              ?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setCatalogueToDelete(null)}
                className="px-4 py-2 rounded-lg bg-[#F4F0FB] hover:bg-[#EEE8FF] text-[#5B3FD6] text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCatalogue}
                className="px-4 py-2 rounded-lg bg-[#E05A74] hover:bg-[#D84B66] text-white text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalogue;
