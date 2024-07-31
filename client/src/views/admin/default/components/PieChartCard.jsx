import PieChart from "components/charts/PieChart";
import Card from "components/card";

const PieChartCard = ({ data }) => {
  const pieChartOptions = {
    chart: {
      type: 'pie',
    },
    labels: data.map(d => d.label),
  };

  const pieChartData = data.map(d => d.value);

  return (
    <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Subtasks Distribution
          </h4>
        </div>
      </div>
      <div className="mb-auto flex h-[220px] w-full items-center justify-center">
        <PieChart options={pieChartOptions} series={pieChartData} />
      </div>
      <div className="flex flex-row !justify-between rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        {data.map((d, index) => (
          <div key={index} className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <div className={`h-2 w-2 rounded-full ${d.color}`} />
              <p className="ml-1 text-sm font-normal text-gray-600">{d.label}</p>
            </div>
            <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
              {d.value}%
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PieChartCard;
