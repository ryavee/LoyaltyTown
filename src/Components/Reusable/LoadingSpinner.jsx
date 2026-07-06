import { LoadingSpinner as EnterpriseLoadingSpinner } from "../enterprise";

const LoadingSpinner = ({ centered = false, message = "Loading..." }) => (
  <div className={centered ? "flex min-h-[300px] items-center justify-center" : undefined}>
    <EnterpriseLoadingSpinner label={message} />
  </div>
);

export default LoadingSpinner;
