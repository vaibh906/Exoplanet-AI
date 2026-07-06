import Dashboardcard from "./Dashboardcard";

function Stats() {
  const stats = [
    {
      title: "Dataset",
      value: "9,420",
      subtitle: "Kepler Light Curves",
      icon: "🛰️",
    },
    {
      title: "Model",
      value: "Random Forest",
      subtitle: "Machine Learning",
      icon: "🤖",
    },
    {
      title: "Accuracy",
      value: "98.7%",
      subtitle: "Prediction Accuracy",
      icon: "🎯",
    },
    {
      title: "Backend",
      value: "FastAPI",
      subtitle: "REST API",
      icon: "⚡",
    },
  ];

  return (
    <div className="stats-grid">
      {stats.map((item, index) => (
        <Dashboardcard
          key={index}
          icon={item.icon}
          title={item.title}
          value={item.value}
          subtitle={item.subtitle}
        />
      ))}
    </div>
  );
}

export default Stats;