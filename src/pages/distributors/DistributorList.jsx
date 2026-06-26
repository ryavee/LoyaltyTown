import React, { useEffect, useState, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import distributorsService from '../../services/distributors.service';
import ExportButton from '../../Components/ExportButton';
import Pagination from '../../Components/Reusable/Pagination';
import ActionButtons from '../../Components/Reusable/ActionButtons';
import ConfirmationModal from '../../Components/ConfirmationModal';

const DistributorList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showDelete, setShowDelete] = useState(false);
  const [target, setTarget] = useState(null);

  useEffect(() => { fetchList(); }, []);

  const fetchList = async () => {
    setLoading(true);
    try {
      const data = await distributorsService.getDistributors();
      setItems(Array.isArray(data) ? data : data.items || []);
    } catch (err) {
      toast.error('Failed to load distributors');
    } finally { setLoading(false); }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((d) => !q || [d.name, d.contactPerson, d.city].filter(Boolean).some(v => v.toLowerCase().includes(q)));
  }, [items, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize; return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  const handleDelete = async () => {
    if (!target) return;
    try { await distributorsService.deleteDistributor(target.id || target._id); toast.success('Deleted'); setItems((cur) => cur.filter(i => (i.id||i._id) !== (target.id||target._id))); }
    catch { toast.error('Delete failed'); }
    finally { setShowDelete(false); setTarget(null); }
  };

  const columns = [{key:'name', header:'Distributor Name'},{key:'contactPerson', header:'Contact'},{key:'mobile', header:'Mobile'},{key:'email', header:'Email'},{key:'city', header:'City'},{key:'state', header:'State'},{key:'status', header:'Status'}];

  return (
    <div className="min-h-screen bg-[#F8F5FC] px-3 py-3 sm:px-4 sm:py-4">
      <div className="bg-white/95 rounded-xl border p-3 mb-4 flex items-center gap-3">
        <div className="relative w-full sm:w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8AA2]" />
          <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search distributors..." className="w-full pl-10 pr-4 py-2 rounded-lg border" />
        </div>

        <div className="ml-auto flex items-center gap-3">
          <ExportButton data={filtered} columns={columns} filename="distributors" disabled={filtered.length===0} />
          <button onClick={()=>window.location.href='/distributors/create'} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5B3FD6] text-white"><Plus className="w-4 h-4"/>Add</button>
        </div>
      </div>

      <div className="bg-white/95 rounded-xl border overflow-hidden">
        {loading ? <div className="p-12 text-center">Loading...</div> : filtered.length===0 ? <div className="p-12 text-center text-[#8E8AA2]">No distributors.</div> : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-[#F4F0FB] border-b"><tr>{columns.map(c=> <th key={c.key} className="px-5 py-3 text-left text-[10.5px] font-semibold text-[#8E8AA2]">{c.header}</th>)}<th className="px-5 py-3 text-left">Actions</th></tr></thead>
                <tbody>{paginated.map(d=> <tr key={d.id||d._id} className="border-b hover:bg-[#FAF8FE]"><td className="px-5 py-3">{d.name}</td><td className="px-5 py-3">{d.contactPerson}</td><td className="px-5 py-3">{d.mobile}</td><td className="px-5 py-3">{d.email}</td><td className="px-5 py-3">{d.city}</td><td className="px-5 py-3">{d.state}</td><td className="px-5 py-3">{d.status}</td><td className="px-5 py-3"><ActionButtons onEdit={()=>window.location.href=`/distributors/${d.id||d._id}/edit`} onDelete={() => { setTarget(d); setShowDelete(true); }} /></td></tr>)}</tbody>
              </table>
            </div>
            <div className="bg-[#FAF8FE] border-t"><Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} pageSize={pageSize} onPageSizeChange={(s)=>{setPageSize(s); setCurrentPage(1);}} totalItems={filtered.length} /></div>
          </>
        )}
      </div>

      <ConfirmationModal isOpen={showDelete} title="Delete Distributor" message={`Delete ${target?.name || 'this distributor'}?`} onConfirm={handleDelete} onCancel={()=>setShowDelete(false)} confirmText="Delete" type="danger" />
    </div>
  );
};

export default DistributorList;
