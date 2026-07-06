import { KpiCard } from "../enterprise";

const StatCard = ({ label, value, hint, icon }) => (
  <KpiCard label={label} value={value ?? "--"} target={hint} icon={icon} progress={0} />
);

export default StatCard;
