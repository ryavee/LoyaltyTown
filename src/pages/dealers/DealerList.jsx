import React, { useEffect, useState, useMemo } from 'react';
import { Search, Plus, MoreVertical } from 'lucide-react';
import { toast } from 'react-hot-toast';

import dealersService from '../../services/dealers.service';
import ExportButton from '../../Components/ExportButton';
import ImportButton from '../../Components/ImportButton';
import ActionButtons from '../../Components/Reusable/ActionButtons';
import ConfirmationModal from '../../Components/ConfirmationModal';
import Pagination from '../../Components/Reusable/Pagination';

const DealerList = () => {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [targetDealer, setTargetDealer] = useState(null);

  useEffect(() => {
    fetchDealers();
  }, []);

  const fetchDealers = async () => {
    setLoading(true);
    try {
      const data = await dealersService.getDealers();
      // Expect backend to return array of dealers
      setDealers(Array.isArray(data) ? data : data.items || []);
    } catch (err) {
      toast.error('Failed to load dealers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!targetDealer) return;
    try {
      await dealersService.deleteDealer(targetDealer.id || targetDealer._id);
      toast.success('Dealer deleted');
      setDealers((cur) => cur.filter((d) => (d.id || d._id) !== (targetDealer.id || targetDealer._id)));
    } catch (err) {
      toast.error('Delete failed');
    } finally {
      setShowDeleteModal(false);
      setTargetDealer(null);
    }
  };

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return dealers.filter((d) => {
      const matchesSearch =
        !q ||
        [d.name, d.contactPerson, d.mobile, d.email, d.city, d.state]
          .filter(Boolean)
          .some((v) => v.toString().toLowerCase().includes(q));

      const matchesStatus = statusFilter === 'All' || d.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [dealers, searchTerm, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  const columns = [
    { key: 'name', header: 'Dealer Name' },
    { key: 'contactPerson', header: 'Contact Person' },
    { key: 'mobile', header: 'Mobile' },
    { key: 'email', header: 'Email' },
    { key: 'city', header: 'City' },
    { key: 'state', header: 'State' },
    { key: 'status', header: 'Status' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5FC] px-3 py-3 sm:px-4 sm:py-4">
      <div className="bg-white/95 rounded-xl border border-[#E7DFF2] p-3 mb-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8AA2]" />
            <input
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              placeholder="Search dealers..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm outline-none"
            />
          </div>

          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} className="px-4 py-2 rounded-lg border border-[#E7DFF2] bg-[#FAF8FE] text-sm">
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <ImportButton onUpload={() => toast.success('CSV import placeholder')} label="Import CSV" />
          <ExportButton data={filtered} columns={columns} filename="dealers" page="dealers" disabled={filtered.length === 0} />
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5B3FD6] text-white" onClick={() => window.location.href = '/dealers/create'}>
            <Plus className="w-4 h-4" /> Add Dealer
          </button>
        </div>
      </div>

      <div className="bg-white/95 rounded-xl border border-[#E7DFF2] overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-[#8E8AA2]">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-[#8E8AA2]">No dealers available.</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-[#F4F0FB] border-b border-[#E7DFF2]">
                  <tr>
                    {columns.map((h) => (
                      <th key={h.key} className="px-5 py-3 text-left text-[10.5px] font-semibold text-[#8E8AA2]">{h.header}</th>
                    ))}
                    <th className="px-5 py-3 text-left text-[10.5px] font-semibold text-[#8E8AA2]">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {paginated.map((d) => (
                    <tr key={d.id || d._id} className="border-b border-[#F2ECFA] hover:bg-[#FAF8FE]">
                      <td className="px-5 py-3 text-sm text-[#2B2340]">{d.name || d.companyName}</td>
                      <td className="px-5 py-3 text-sm text-[#5B5875]">{d.contactPerson || d.contact_name}</td>
                      <td className="px-5 py-3 text-sm text-[#5B5875]">{d.mobile}</td>
                      <td className="px-5 py-3 text-sm text-[#5B5875]">{d.email}</td>
                      <td className="px-5 py-3 text-sm text-[#5B5875]">{d.city}</td>
                      <td className="px-5 py-3 text-sm text-[#5B5875]">{d.state}</td>
                      <td className="px-5 py-3">{d.status}</td>
                      <td className="px-5 py-3">
                        <ActionButtons
                          onEdit={() => (window.location.href = `/dealers/${d.id || d._id}/edit`)}
                          onDelete={() => { setTargetDealer(d); setShowDeleteModal(true); }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-[#FAF8FE] border-t border-[#E7DFF2]">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                pageSize={pageSize}
                onPageSizeChange={(s) => { setPageSize(s); setCurrentPage(1); }}
                totalItems={filtered.length}
              />
            </div>
          </>
        )}
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Delete Dealer"
        message={`Are you sure you want to delete ${targetDealer?.name || targetDealer?.companyName || 'this dealer'}?`}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default DealerList;
