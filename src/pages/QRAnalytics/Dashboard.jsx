import React, { useEffect, useState } from 'react';
import analyticsService from '../../services/analytics.service';
import ExportButton from '../../Components/ExportButton';

const QRAnalyticsDashboard = () => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await analyticsService.getOverview();
        setOverview(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">QR Analytics</h2>
        <ExportButton filename="qr-analytics" customExport={async () => { const blob = await analyticsService.exportAnalytics(); const url = window.URL.createObjectURL(new Blob([blob])); const link = document.createElement('a'); link.href = url; link.setAttribute('download', `qr-analytics-${new Date().toISOString().split('T')[0]}.csv`); document.body.appendChild(link); link.click(); link.remove(); }} />
      </div>

      <div className="bg-white rounded-xl border p-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-[#FAF8FE] rounded-xl">
              <div className="text-xs text-[#8E8AA2]">Total Scans</div>
              <div className="text-2xl font-bold">{overview?.totalScans ?? '-'}</div>
            </div>
            <div className="p-4 bg-[#FAF8FE] rounded-xl">
              <div className="text-xs text-[#8E8AA2]">Valid Scans</div>
              <div className="text-2xl font-bold">{overview?.validScans ?? '-'}</div>
            </div>
            <div className="p-4 bg-[#FAF8FE] rounded-xl">
              <div className="text-xs text-[#8E8AA2]">Flagged</div>
              <div className="text-2xl font-bold">{overview?.flagged ?? '-'}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRAnalyticsDashboard;
