import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import usersService from '../../services/users.service';

const UserCreate = () => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try { await usersService.createUser(values); toast.success('User created'); navigate('/users'); } catch { toast.error('Create failed'); }
  };

  return (
    <div className="min-h-screen bg-[#F8F5FC] px-3 py-3">
      <div className="bg-white rounded-xl border p-4">
        <h2 className="text-lg font-semibold mb-2">Create User</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div><label className="block text-sm">Full Name</label><input {...register('name')} className="w-full px-4 py-2 rounded-lg border"/></div>
          <div><label className="block text-sm">Email</label><input {...register('email')} className="w-full px-4 py-2 rounded-lg border"/></div>
          <div><label className="block text-sm">Mobile</label><input {...register('mobile')} className="w-full px-4 py-2 rounded-lg border"/></div>
          <div><label className="block text-sm">Password</label><input type="password" {...register('password')} className="w-full px-4 py-2 rounded-lg border"/></div>
          <div><label className="block text-sm">Role</label><select {...register('role')} className="w-full px-4 py-2 rounded-lg border bg-white"><option value="COMPANY_ADMIN">COMPANY_ADMIN</option><option value="MANAGER">MANAGER</option><option value="SALES_MANAGER">SALES_MANAGER</option><option value="DEALER_USER">DEALER_USER</option><option value="DISTRIBUTOR_USER">DISTRIBUTOR_USER</option><option value="SUPPORT">SUPPORT</option></select></div>
          <div className="flex justify-end gap-2"><button type="button" onClick={()=>navigate('/users')} className="px-4 py-2 rounded-lg bg-[#F4F0FB] text-[#5B3FD6]">Cancel</button><button type="submit" disabled={isSubmitting} className="px-4 py-2 rounded-lg bg-[#5B3FD6] text-white">Create</button></div>
        </form>
      </div>
    </div>
  );
};

export default UserCreate;
