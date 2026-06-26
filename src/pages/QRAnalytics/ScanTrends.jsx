import React, { useEffect, useState } from 'react';
import analyticsService from '../../services/analytics.service';

const ScanTrends = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await analyticsService.getScanTrends();
        setData(res);
      } catch (err) {
        console.error(err);
      } finally { setLoading(false); }
    })();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Scan Trends</h2>
      <div className="bg-white rounded-xl border p-4">
        {loading ? <div>Loading...</div> : <pre className="text-sm text-[#6B6B6B]">{JSON.stringify(data, null, 2)}</pre>}
      </div>
    </div>
  );
};

export default ScanTrends;
