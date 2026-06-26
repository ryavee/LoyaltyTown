import React, { useEffect, useState, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import usersService from '../../services/users.service';
import ExportButton from '../../Components/ExportButton';
import Pagination from '../../Components/Reusable/Pagination';
import ActionButtons from '../../Components/Reusable/ActionButtons';
import ConfirmationModal from '../../Components/ConfirmationModal';

const UserList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showDelete, setShowDelete] = useState(false);
  const [target, setTarget] = useState(null);

  useEffect(()=>{ fetchUsers(); },[]);
  const fetchUsers = async () => { setLoading(true); try { const data = await usersService.getUsers(); setItems(Array.isArray(data)?data:data.items||[]); } catch { toast.error('Failed to load users'); } finally { setLoading(false); } };

  const filtered = useMemo(()=>{ const q = search.trim().toLowerCase(); return items.filter(u=>{ const matchesSearch = !q || [u.name,u.email,u.mobile].filter(Boolean).some(v=>v.toLowerCase().includes(q)); const matchesRole = roleFilter==='All' || u.role===roleFilter; return matchesSearch && matchesRole; }); },[items,search,roleFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length/pageSize));
  const paginated = useMemo(()=>{ const start=(currentPage-1)*pageSize; return filtered.slice(start,start+pageSize); },[filtered,currentPage,pageSize]);

  const handleDelete = async ()=>{ if(!target) return; try{ await usersService.deleteUser(target.id||target._id); toast.success('Deleted'); setItems(cur=>cur.filter(i=>(i.id||i._id)!=(target.id||target._id))); }catch{ toast.error('Delete failed'); } finally{ setShowDelete(false); setTarget(null); } };

  const columns = [{key:'name',header:'Name'},{key:'email',header:'Email'},{key:'mobile',header:'Mobile'},{key:'role',header:'Role'},{key:'company',header:'Company'},{key:'status',header:'Status'}];

  return (
    <div className="min-h-screen bg-[#F8F5FC] px-3 py-3 sm:px-4 sm:py-4">
      <div className="bg-white/95 rounded-xl border p-3 mb-4 flex items-center gap-3">
        <div className="relative w-full sm:w-[300px]"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8AA2]"/><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search users..." className="w-full pl-10 pr-4 py-2 rounded-lg border"/></div>
        <select value={roleFilter} onChange={(e)=>setRoleFilter(e.target.value)} className="px-4 py-2 rounded-lg border bg-[#FAF8FE]"><option>All</option><option>COMPANY_ADMIN</option><option>MANAGER</option><option>SALES_MANAGER</option><option>DEALER_USER</option><option>DISTRIBUTOR_USER</option><option>SUPPORT</option></select>
        <div className="ml-auto flex items-center gap-3"><ExportButton data={filtered} columns={columns} filename="users" disabled={filtered.length===0}/><button onClick={()=>window.location.href='/users/create'} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5B3FD6] text-white"><Plus className="w-4 h-4"/>Add</button></div>
      </div>

      <div className="bg-white/95 rounded-xl border overflow-hidden">
        {loading ? <div className="p-12 text-center">Loading...</div> : filtered.length===0 ? <div className="p-12 text-center text-[#8E8AA2]">No users.</div> : (
          <>
            <div className="overflow-x-auto"><table className="min-w-full"><thead className="bg-[#F4F0FB] border-b"><tr>{columns.map(c => <th key={c.key} className="px-5 py-3 text-left text-[10.5px] font-semibold text-[#8E8AA2]">{c.header}</th>)}<th className="px-5 py-3">Actions</th></tr></thead><tbody>{paginated.map(u=> <tr key={u.id||u._id} className="border-b hover:bg-[#FAF8FE]"><td className="px-5 py-3">{u.name}</td><td className="px-5 py-3">{u.email}</td><td className="px-5 py-3">{u.mobile}</td><td className="px-5 py-3">{u.role}</td><td className="px-5 py-3">{u.company}</td><td className="px-5 py-3">{u.status}</td><td className="px-5 py-3"><ActionButtons onEdit={()=>window.location.href=`/users/${u.id||u._id}/edit`} onDelete={()=>{setTarget(u); setShowDelete(true);}}/></td></tr>)}</tbody></table></div>
            <div className="bg-[#FAF8FE] border-t"><Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} pageSize={pageSize} onPageSizeChange={(s)=>{setPageSize(s); setCurrentPage(1);}} totalItems={filtered.length} /></div>
          </>
        )}
      </div>

      <ConfirmationModal isOpen={showDelete} title="Delete User" message={`Delete ${target?.name || 'this user'}?`} onConfirm={handleDelete} onCancel={()=>setShowDelete(false)} confirmText="Delete" type="danger" />
    </div>
  );
};

export default UserList;
