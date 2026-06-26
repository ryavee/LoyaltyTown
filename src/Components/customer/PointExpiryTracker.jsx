import React, { useEffect, useState } from 'react';
import { getExpiry } from '../../services/wallet.service';

const PointExpiryTracker = ({ customerId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getExpiry(customerId);
        setData(res);
      } catch (err) {
        console.error(err);
      } finally { setLoading(false); }
    })();
  }, [customerId]);

  if (loading) return <div className="p-4">Loading expiry...</div>;
  if (!data || !data.items || data.items.length === 0) return <div className="p-4 text-[#8E8AA2]">No upcoming expiries.</div>;

  return (
    <div className="bg-white rounded-xl border p-4">
      <h4 className="font-semibold mb-2">Points Expiry</h4>
      <ul className="space-y-2">
        {data.items.map((e) => (
          <li key={e.id} className="flex items-center justify-between">
            <div>
              <div className="font-medium">{e.points} pts</div>
              <div className="text-xs text-[#8E8AA2]">Expires on {e.expiresAt}</div>
            </div>
            <div className="text-sm text-[#E05A74]">{e.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PointExpiryTracker;
