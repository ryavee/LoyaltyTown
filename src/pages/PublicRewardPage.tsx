import { useNavigate } from "react-router-dom";
import PublicPageShell from "../Components/PublicScan/PublicPageShell";
import RewardSuccess from "../Components/PublicScan/RewardSuccess";

const PublicRewardPage = () => {
  const navigate = useNavigate();

  return (
    <PublicPageShell step={4}>
      <RewardSuccess
        earnedPoints={10}
        walletBalance={10}
        onViewRewards={() => navigate("/wallet")}
      />
    </PublicPageShell>
  );
};

export default PublicRewardPage;
