import React from 'react';
import Paper from '@mui/material/Paper';
import { PieChart } from '@mui/x-charts/PieChart';

interface PieUtilityCardProps {
  userData: any[] | undefined;
  productCount: number | null;
  productSold: number | null;
}

const PieUtilityCard: React.FC<PieUtilityCardProps> = ({
  userData,
  productCount,
  productSold,
}) => {
  const nullUserData: boolean = userData?.length === 0 && productCount != null;
  const chartData = userData && Object.keys(userData).length > 0
    ? Object.entries(userData)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([category, count], index) => ({
          id: index,
          label: category,
          value: count,
        }))
    : [
        { id: 0, label: "Sales", value: productSold ?? 0 },
        { id: 1, label: "Inventory", value: productCount ?? 0 },
        { id: 2, label: "Max Capacity", value: 45 },
      ];

  return (
    <Paper elevation={8}>
      <div className="sales-card">
        <div className="p-card-header">
          <div className="flex-space-bet">
            <p>{nullUserData ? "Sales Performance" : "Order History"}</p>
        </div>
        </div>
        <div className="sales-card-body">
          <PieChart series={[{ data: chartData }]} width={350} height={150} />
        </div>
      </div>
    </Paper>
  )
}

export default PieUtilityCard