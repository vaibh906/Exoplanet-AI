function Dashboardcard({ icon, title, value, subtitle }) {
  return (
    <div className="dashboard-card">
      <div className="card-icon">
        <span>{icon}</span>
      </div>

      <div className="card-content">
        <h3>{title}</h3>

        <h2>{value}</h2>

        <p>{subtitle}</p>
      </div>
    </div>
  );
}

export default Dashboardcard;