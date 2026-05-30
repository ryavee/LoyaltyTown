import { useState, useEffect } from "react";
import {
  fetchTopHighlights,
  fetchStatCards,
  fetchYtdStats,
  fetchQrLifecycle,
  fetchKycStatus,
  fetchScanTrend,
  fetchPointsTrend,
  fetchCustomerScanReport,
  fetchEarnRedeemMonthly,
  fetchStateRegistrations,
  fetchDealerQR,
  fetchTopProducts,
  fetchCityScanData,
  fetchTopScanners,
} from "../services/dashboardService";

const useDashboardData = (timeRange = "7D") => {
  const [data, setData] = useState({
    topHighlights: [],
    statCards: [],
    ytdStats: [],
    qrLifecycle: [],
    kycStatus: [],
    scanTrend: [],
    pointsTrend: [],
    customerScanReport: [],
    earnRedeemMonthly: [],
    stateRegistrations: [],
    dealerQR: [],
    topProducts: [],
    cityScanData: [],
    topScanners: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    Promise.all([
      fetchTopHighlights(),
      fetchStatCards(),
      fetchYtdStats(),
      fetchQrLifecycle(),
      fetchKycStatus(),
      fetchScanTrend({ timeRange }),
      fetchPointsTrend({ timeRange }),
      fetchCustomerScanReport({ timeRange }),
      fetchEarnRedeemMonthly(),
      fetchStateRegistrations(),
      fetchDealerQR(),
      fetchTopProducts(),
      fetchCityScanData(),
      fetchTopScanners(),
    ])
      .then(([
        topHighlights, statCards, ytdStats, qrLifecycle, kycStatus,
        scanTrend, pointsTrend, customerScanReport, earnRedeemMonthly,
        stateRegistrations, dealerQR, topProducts, cityScanData, topScanners,
      ]) => {
        if (cancelled) return;
        setData({
          topHighlights, statCards, ytdStats, qrLifecycle, kycStatus,
          scanTrend, pointsTrend, customerScanReport, earnRedeemMonthly,
          stateRegistrations, dealerQR, topProducts, cityScanData, topScanners,
        });
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err);
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [timeRange]);

  return { data, loading, error };
};

export default useDashboardData;
