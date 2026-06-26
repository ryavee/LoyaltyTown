import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import distributorsService from '../../services/distributors.service';

const DistributorEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  useEffect(() => { if (!id) return; (async ()=>{ try{ const d = await distributorsService.getDistributorById(id); reset(d); } catch { toast.error('Failed to load'); } })(); }, [id, reset]);

  const onSubmit = async (values) => { try { await distributorsService.updateDistributor(id, values); toast.success('Updated'); navigate('/distributors'); } catch { toast.error('Update failed'); } };

  return (
    <div className="min-h-screen bg-[#F8F5FC] px-3 py-3">
      <div className="bg-white rounded-xl border p-4">
        <h2 className="text-lg font-semibold mb-2">Edit Distributor</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div><label className="block text-sm">Name</label><input {...register('name')} className="w-full px-4 py-2 rounded-lg border"/></div>
          <div><label className="block text-sm">Contact Person</label><input {...register('contactPerson')} className="w-full px-4 py-2 rounded-lg border"/></div>
          <div className="flex justify-end gap-2"><button type="button" onClick={()=>navigate('/distributors')} className="px-4 py-2 rounded-lg bg-[#F4F0FB] text-[#5B3FD6]">Cancel</button><button type="submit" disabled={isSubmitting} className="px-4 py-2 rounded-lg bg-[#5B3FD6] text-white">Save</button></div>
        </form>
      </div>
    </div>
  );
};

export default DistributorEdit;
