import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import dealersService from '../../services/dealers.service';

const DealerEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await dealersService.getDealerById(id);
        reset(data);
      } catch (err) {
        toast.error('Failed to load dealer');
      }
    })();
  }, [id, reset]);

  const onSubmit = async (values) => {
    try {
      await dealersService.updateDealer(id, values);
      toast.success('Dealer updated');
      navigate('/dealers');
    } catch (err) {
      toast.error('Update failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5FC] px-3 py-3 sm:px-4 sm:py-4">
      <div className="bg-white rounded-xl border p-4">
        <h2 className="text-lg font-semibold mb-2">Edit Dealer</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Dealer Name</label>
            <input {...register('name')} className="w-full px-4 py-2 rounded-lg border" />
          </div>

          <div>
            <label className="block text-sm font-medium">Contact Person</label>
            <input {...register('contactPerson')} className="w-full px-4 py-2 rounded-lg border" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Mobile</label>
              <input {...register('mobile')} className="w-full px-4 py-2 rounded-lg border" />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input {...register('email')} className="w-full px-4 py-2 rounded-lg border" />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => navigate('/dealers')} className="px-4 py-2 rounded-lg bg-[#F4F0FB] text-[#5B3FD6]">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 rounded-lg bg-[#5B3FD6] text-white">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DealerEdit;
