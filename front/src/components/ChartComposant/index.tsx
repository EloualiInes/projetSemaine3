import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { TypeChartComposant } from '../../types/components/typesChart';

Chart.register(...registerables);

export default function ChartComposant({ data, mode }: TypeChartComposant) {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false
  };




  const displayAffiche = () => {
    switch (mode) {
      case 0:
        return <Bar data={data} options={defaultOptions} />;
      case 1:
        if (data.datasets && data.datasets.length > 0) {
          const dataset = data.datasets[0];
          const total = dataset.data.reduce((acc, value) => acc + value, 0);
          const percentageData = dataset.data.map(value => ((value / total) * 100).toFixed(2));
          const labelsWithPercentage = data.labels.map((label, index) => `${label} (${percentageData[index]}%)`);
          const modifiedData = { ...data, labels: labelsWithPercentage };
          return <Pie data={modifiedData} options={defaultOptions} />;
        }
        return null;

      default:
        return <Bar data={data} options={defaultOptions} />;

    }
  }

  return displayAffiche();
}
