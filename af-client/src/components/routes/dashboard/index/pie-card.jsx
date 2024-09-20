import Paper from '@mui/material/Paper';
import { PieChart } from '@mui/x-charts/PieChart';

const PieUtilityCard = ({
  userData,
  productCount,
  productSold,
}) => {
  let categories, label1, label2, label3, value1, value2, value3;

  if (userData && Object.keys(userData).length > 0) {
    categories = Object.entries(userData)
      .sort(([, a], [, b]) => b - a) // Sort by count in descending order
      .slice(0, 3)                   // Get the top 3 categories
      .map(([category, count]) => ({ category, count })); // Map to {category, count}

    const category1 = categories[0]?.category;
    const categoryCount1 = categories[0]?.count;

    const category2 = categories[1]?.category;
    const categoryCount2 = categories[1]?.count;

    const category3 = categories[2]?.category;
    const categoryCount3 = categories[2]?.count;

    label1 = category1;
    label2 = category2;
    label3 = category3;

    value1 = categoryCount1;
    value2 = categoryCount2;
    value3 = categoryCount3;
  } else {
    label1 = "Sales";
    label2 = "Inventory";
    label3 = "Max Capacity";

    value1 = productSold;
    value2 = productCount;
    value3 = 45;
  }

  return (
    <Paper elevation={8}>
      <div className="sales-card">
        <div className="p-card-header">
          { productCount ?
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