import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import campaignsService from '../../services/campaigns.service';
import { toast } from 'react-hot-toast';

const CampaignEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  useEffect(()=>{ if(!id) return; (async ()=>{ try{ const d = await campaignsService.getCampaignById(id); reset(d); } catch { toast.error('Failed to load'); } })(); },[id, reset]);

  const onSubmit = async (values) => { try{ await campaignsService.updateCampaign(id, values); toast.success('Updated'); navigate('/campaigns'); } catch { toast.error('Update failed'); } };

  return (
    <div className="p-4">
      <div className="bg-white rounded-xl border p-4 max-w-2xl">
        <h2 className="text-lg font-semibold mb-3">Edit Campaign</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div><label className="block text-sm">Name</label><input {...register('name')} className="w-full px-4 py-2 rounded-lg border"/></div>
          <div className="flex gap-2"><div className="flex-1"><label className="block text-sm">Start</label><input type="date" {...register('startDate')} className="w-full px-4 py-2 rounded-lg border"/></div><div className="flex-1"><label className="block text-sm">End</label><input type="date" {...register('endDate')} className="w-full px-4 py-2 rounded-lg border"/></div></div>
          <div className="flex justify-end gap-2"><button type="button" onClick={()=>navigate('/campaigns')} className="px-4 py-2 rounded-lg bg-[#F4F0FB] text-[#5B3FD6]">Cancel</button><button type="submit" disabled={isSubmitting} className="px-4 py-2 rounded-lg bg-[#5B3FD6] text-white">Save</button></div>
        </form>
      </div>
    </div>
  );
};

export default CampaignEdit;
