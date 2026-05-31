const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white border border-[#E9E2F3] rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.025)] ${className}`}
  >
    {children}
  </div>
);

export default Card;
