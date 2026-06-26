import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import distributorsService from '../../services/distributors.service';

const DistributorCreate = () => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try { await distributorsService.createDistributor(values); toast.success('Distributor created'); navigate('/distributors'); }
    catch { toast.error('Create failed'); }
  };

  return (
    <div className="min-h-screen bg-[#F8F5FC] px-3 py-3">
      <div className="bg-white rounded-xl border p-4">
        <h2 className="text-lg font-semibold mb-2">Create Distributor</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div><label className="block text-sm">Name</label><input {...register('name')} className="w-full px-4 py-2 rounded-lg border"/></div>
          <div><label className="block text-sm">Contact Person</label><input {...register('contactPerson')} className="w-full px-4 py-2 rounded-lg border"/></div>
          <div className="flex justify-end gap-2"><button type="button" onClick={()=>navigate('/distributors')} className="px-4 py-2 rounded-lg bg-[#F4F0FB] text-[#5B3FD6]">Cancel</button><button type="submit" disabled={isSubmitting} className="px-4 py-2 rounded-lg bg-[#5B3FD6] text-white">Create</button></div>
        </form>
      </div>
    </div>
  );
};

export default DistributorCreate;
