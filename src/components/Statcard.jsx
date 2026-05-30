const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex items-center justify-between hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-300">

      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <h2 className="text-xl font-semibold">{value}</h2>
      </div>

      <div className={`p-3 rounded-lg text-white ${color}`}>
        {icon}
      </div>

    </div>
  );
};

export default StatCard;