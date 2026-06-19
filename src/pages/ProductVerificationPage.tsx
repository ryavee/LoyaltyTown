import { useNavigate } from "react-router-dom";
import PublicPageShell from "../Components/PublicScan/PublicPageShell";
import VerificationCard from "../Components/PublicScan/VerificationCard";
import { mockResponse } from "../data/publicScanMock";

const ProductVerificationPage = () => {
  const navigate = useNavigate();

  return (
    <PublicPageShell step={1}>
      <VerificationCard
        product={mockResponse}
        onContinue={() => navigate("/scan/LTQR-A82K9XQ1P3")}
      />
    </PublicPageShell>
  );
};

export default ProductVerificationPage;
