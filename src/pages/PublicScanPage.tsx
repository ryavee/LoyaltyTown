import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomerRegistrationForm from "../Components/PublicScan/CustomerRegistrationForm";
import type { CustomerDetails } from "../Components/PublicScan/CustomerRegistrationForm";
import DuplicateWarning from "../Components/PublicScan/DuplicateWarning";
import MobileOtpForm from "../Components/PublicScan/MobileOtpForm";
import PublicPageShell from "../Components/PublicScan/PublicPageShell";
import RewardSuccess from "../Components/PublicScan/RewardSuccess";
import ScanLoader from "../Components/PublicScan/ScanLoader";
import VerificationCard from "../Components/PublicScan/VerificationCard";
import { getMockScanResponse } from "../data/publicScanMock";

type FlowStep = "loading" | "verification" | "mobile" | "otp" | "registration" | "reward";

const PublicScanPage = () => {
  const { code = "" } = useParams();
  const navigate = useNavigate();
  const [flowStep, setFlowStep] = useState<FlowStep>("loading");
  const [mobile, setMobile] = useState("");
  const scanResult = useMemo(() => getMockScanResponse(code), [code]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!scanResult.valid) {
        navigate("/error", { replace: true, state: { code } });
        return;
      }
      setFlowStep("verification");
    }, 1350);

    return () => window.clearTimeout(timer);
  }, [code, navigate, scanResult.valid]);

  const saveCustomer = (details: CustomerDetails) => {
    localStorage.setItem("loyaltytown_public_customer", JSON.stringify({
      ...details,
      mobile,
    }));
    setFlowStep("reward");
  };

  const progressStep =
    flowStep === "verification" ? 1 :
    flowStep === "mobile" || flowStep === "otp" ? 2 :
    flowStep === "registration" ? 3 :
    flowStep === "reward" ? 4 : undefined;

  return (
    <PublicPageShell step={progressStep}>
      {flowStep === "loading" && <ScanLoader code={code} />}

      {flowStep === "verification" && (
        scanResult.duplicate ? (
          <DuplicateWarning
            scanCount={scanResult.scanCount}
            productName={scanResult.productName}
            onContinue={() => setFlowStep("mobile")}
          />
        ) : (
          <VerificationCard
            product={scanResult}
            onContinue={() => setFlowStep("mobile")}
          />
        )
      )}

      {(flowStep === "mobile" || flowStep === "otp") && (
        <MobileOtpForm
          mode={flowStep}
          mobile={mobile}
          onMobileChange={setMobile}
          onSendOtp={() => setFlowStep("otp")}
          onVerify={() => setFlowStep("registration")}
          onBack={() => setFlowStep("mobile")}
        />
      )}

      {flowStep === "registration" && (
        <CustomerRegistrationForm onSubmit={saveCustomer} />
      )}

      {flowStep === "reward" && (
        <RewardSuccess
          earnedPoints={scanResult.rewardPoints}
          walletBalance={scanResult.rewardPoints}
          onViewRewards={() => navigate("/wallet")}
        />
      )}
    </PublicPageShell>
  );
};

export default PublicScanPage;
