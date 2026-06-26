import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import dealersService from '../../services/dealers.service';

const DealerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dealer, setDealer] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) fetchDealer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchDealer = async () => {
    setLoading(true);
    try {
      const data = await dealersService.getDealerById(id);
      setDealer(data);
    } catch (err) {
      toast.error('Failed to load dealer');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!dealer) return <div className="p-6">Dealer not found.</div>;

  return (
    <div className="min-h-screen bg-[#F8F5FC] px-3 py-3 sm:px-4 sm:py-4">
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{dealer.name || dealer.companyName}</h2>
          <div>
            <button onClick={() => navigate(`/dealers/${id}/edit`)} className="px-3 py-1 rounded-lg bg-[#EEE8FF] text-[#5B3FD6]">Edit</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-[#8E8AA2]">Contact Person</p>
            <p className="font-medium">{dealer.contactPerson}</p>
          </div>

          <div>
            <p className="text-sm text-[#8E8AA2]">Mobile</p>
            <p className="font-medium">{dealer.mobile}</p>
          </div>

          <div>
            <p className="text-sm text-[#8E8AA2]">Email</p>
            <p className="font-medium">{dealer.email}</p>
          </div>

          <div>
            <p className="text-sm text-[#8E8AA2]">Address</p>
            <p className="font-medium">{dealer.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealerDetails;
