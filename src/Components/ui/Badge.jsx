import { Badge as EnterpriseBadge } from "../enterprise";

const Badge = ({ text, cls = "" }) => (
  <EnterpriseBadge className={cls}>{text}</EnterpriseBadge>
);

export default Badge;
