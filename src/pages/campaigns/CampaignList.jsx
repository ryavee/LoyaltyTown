import React, { useEffect, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import campaignsService from '../../services/campaigns.service';
import ExportButton from '../../Components/ExportButton';
import { toast } from 'react-hot-toast';

const CampaignList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState('');

  useEffect(()=>{ fetchList(); },[]);
  const fetchList = async () => { setLoading(true); try{ const data = await campaignsService.getCampaigns(); setItems(Array.isArray(data)?data:data.items||[]); } catch { toast.error('Failed to load campaigns'); } finally { setLoading(false); } };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Campaigns</h2>
        <div className="flex items-center gap-3">
          <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search campaigns..." className="px-3 py-2 rounded-lg border" />
          <ExportButton data={items} columns={[{key:'name',header:'Name'},{key:'status',header:'Status'}]} filename="campaigns" />
          <button onClick={()=>window.location.href='/campaigns/create'} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5B3FD6] text-white"><Plus className="w-4 h-4"/>Create</button>
        </div>
      </div>

      <div className="bg-white rounded-xl border p-4">
        {loading ? <div>Loading...</div> : items.length===0 ? <div className="text-center text-[#8E8AA2] p-8">No campaigns</div> : (
          <ul className="space-y-2">
            {items.map(c => (
              <li key={c.id||c._id} className="p-3 border rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-xs text-[#8E8AA2]">{c.status}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={()=>window.location.href=`/campaigns/${c.id||c._id}`} className="px-3 py-1 rounded-lg bg-[#F4F0FB] text-[#5B3FD6]">View</button>
                  <button onClick={()=>window.location.href=`/campaigns/${c.id||c._id}/edit`} className="px-3 py-1 rounded-lg bg-[#EEE8FF] text-[#5B3FD6]">Edit</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CampaignList;
