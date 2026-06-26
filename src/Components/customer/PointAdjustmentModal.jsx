import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { adjustPoints } from '../../services/wallet.service';

const PointAdjustmentModal = ({ customerId, isOpen, onClose, onAdjusted }) => {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  const onSubmit = async (values) => {
    try {
      await adjustPoints(customerId, values);
      toast.success('Points adjusted');
      reset();
      onAdjusted?.();
      onClose();
    } catch (err) {
      toast.error('Adjustment failed');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl p-5 w-full max-w-md">
        <h3 className="font-semibold mb-3">Adjust Points</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="text-sm block">Amount (positive to add, negative to deduct)</label>
            <input type="number" {...register('amount', { required: true })} className="w-full px-3 py-2 rounded-lg border" />
          </div>
          <div>
            <label className="text-sm block">Reason</label>
            <input {...register('reason')} className="w-full px-3 py-2 rounded-lg border" />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-[#F4F0FB] text-[#5B3FD6]">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 rounded-lg bg-[#5B3FD6] text-white">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PointAdjustmentModal;
