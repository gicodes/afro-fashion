import Paper from '@mui/material/Paper';
import { PieChart } from '@mui/x-charts/PieChart';

const PieUtilityCard = ({
  userData,
  productCount,
  productSold,
}) => {
  let isSeller = productCount && productSold;

  const categories = Object.entries(userData)
    .sort(([, a], [, b]) => b - a) // Sort by count in descending order
    .slice(0, 3)                   // Get the top 3 categories
    .map(([category, count]) => ({ category, count })); // Map to {category, count}

  const category1 = categories[0]?.category;
  const categoryCount1 = categories[0]?.count;

  const category2 = categories[1]?.category;
  const categoryCount2 = categories[1]?.count;

  const category3 = categories[2]?.category;
  const categoryCount3 = categories[2]?.count;

  // Set labels and values based on whether the user is a seller
  const label1 = isSeller ? "Sales" : category1;
  const label2 = isSeller ? "Inventory" : category2;
  const label3 = isSeller ? "Max Capacity" : category3;

  const value1 = isSeller ? productSold : categoryCount1;
  const value2 = isSeller ? productCount : categoryCount2;
  const value3 = isSeller ? 45 : categoryCount3;

  return (
    <Paper elevation={8}>
      <div className="sales-card">
        <div className="p-card-header">
          { productCount && productSold ? 
            <p> Sales Performance </p> : 
            <div className='flex-space-around'>
              <p>Order History</p> 
              <span className='fs-smaller'>Top Categories</span>
            </div>
          }
        </div>

        <div className="sales-card-body">
          <PieChart
            series={[
              { data: [
                  { id: 0, value: value1, label: label1 },
                  { id: 1, value: value2, label: label2 },
                  { id: 2, value: value3, label: label3 }, 
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