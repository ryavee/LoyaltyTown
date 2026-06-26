import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import campaignsService from '../../services/campaigns.service';
import { toast } from 'react-hot-toast';

const CampaignDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{ if(id) fetch(); },[id]);
  const fetch = async ()=>{ setLoading(true); try{ const d = await campaignsService.getCampaignById(id); setItem(d); } catch { toast.error('Failed to load'); } finally { setLoading(false); } };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!item) return <div className="p-6">Not found</div>;

  return (
    <div className="p-4">
      <div className="bg-white rounded-xl border p-6 max-w-3xl">
        <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-semibold">{item.name}</h2><div><button onClick={()=>navigate(`/campaigns/${id}/edit`)} className="px-3 py-1 rounded-lg bg-[#EEE8FF] text-[#5B3FD6]">Edit</button></div></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><div className="text-xs text-[#8E8AA2]">Status</div><div className="font-medium">{item.status}</div></div>
          <div><div className="text-xs text-[#8E8AA2]">Duration</div><div className="font-medium">{item.startDate} — {item.endDate}</div></div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
