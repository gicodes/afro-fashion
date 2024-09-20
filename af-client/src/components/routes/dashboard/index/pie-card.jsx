import Paper from '@mui/material/Paper';
import { PieChart } from '@mui/x-charts/PieChart';

const PieUtilityCard = ({
  savedItems,
  pastOrders,
  leadCategory,
  productCount,
  productSold,
}) => {
  let leadCategoryX = leadCategory || 0;
  const value3 = (productCount && productSold) ? 45 : leadCategoryX;

  return (
    <Paper elevation={8}>
      <div className="sales-card">
        <div className="p-card-header">
          {productCount && productSold ? <p> Sales Performance </p> : <p>Buy History</p>}
        </div>

        <div className="sales-card-body">
          <PieChart
            series={[
              { data: [
                  { id: 0, value: productSold, label: 'Sales' },
                  { id: 1, value: productCount, label: 'Inventory' },
                  { id: 2, value: value3, label: 'Max Capacity' }, 
              ], },
            ]}
            width={350}
            height={150}
            // sx={{fontSize: "xx-small"}} // not working
          />
        </div>
      </div>
    </Paper>
  )
}

export default PieUtilityCard