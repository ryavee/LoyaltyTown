import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import distributorsService from '../../services/distributors.service';

const DistributorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (id) fetch(); }, [id]);

  const fetch = async () => { setLoading(true); try { const d = await distributorsService.getDistributorById(id); setItem(d); } catch { toast.error('Failed to load'); } finally { setLoading(false); } };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!item) return <div className="p-6">Not found</div>;

  return (
    <div className="min-h-screen bg-[#F8F5FC] px-3 py-3">
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-semibold">{item.name}</h2><button onClick={()=>navigate(`/distributors/${id}/edit`)} className="px-3 py-1 rounded-lg bg-[#EEE8FF] text-[#5B3FD6]">Edit</button></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><p className="text-sm text-[#8E8AA2]">Contact</p><p className="font-medium">{item.contactPerson}</p></div><div><p className="text-sm text-[#8E8AA2]">Mobile</p><p className="font-medium">{item.mobile}</p></div></div>
      </div>
    </div>
  );
};

export default DistributorDetails;
