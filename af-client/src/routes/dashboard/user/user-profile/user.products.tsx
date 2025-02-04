import './user.styles.scss';
import React, { useContext } from 'react';
import { DeleteOutline } from '@mui/icons-material';
import { removeFromSavedItems } from 'src/utils/writeBatch';
import UserContext from '../../../../contexts/user.context';
import { useAlert } from '../../../../contexts/alert.context';

// SavedItems take in two arguments that dynamically decides what to return each time it's called
// SavedItems render two sets of similar variables i.e. savedItems.orders & savedItems.savedItems

interface UserHistoryProps {
  savedItems: any[];
  item?: string;
}

export const UserHistory: React.FC<UserHistoryProps> = ({ savedItems, item }: UserHistoryProps) => {
  const { uid } = useContext(UserContext);
  const { addAutoCloseAlert, addOptionsAlert } = useAlert();

  const handleDeleteProduct = async (uid, itemId) => {
    const handleYes = async () => {
      await removeFromSavedItems(uid, itemId);
      addAutoCloseAlert("success", 'Product Removed from Saved Items!');
    };
    
    const handleNo = () => { return };
    addOptionsAlert('warning', 'Are you sure you want to remove this product from your saved items collection?', handleYes, handleNo);
  };

  const NoSavedItems = ({item}) => 
    <div className='container'>
      <div className='m-2 text-center'>
        <p>You do not have any {item}</p>
      </div>
    </div>

  const SavedItemsTemp = () =>
    <div className='card container mt-2'>
      <div className='card-body'>
        {savedItems?.map((item, index) => (
          <div 
            key={index} 
            className='user-products'
          >
            {index > 0 && <hr key={`${item.id}-hr`} />}
            <div key={`${item.id}-index`} className='saved-items pt-1'>
              <span className='index v-center'>{index + 1}.</span>
              <a className="name" href={`marketplace/products/${item.id}`}>
                {item.name}
              </a>
              <span onClick={() => handleDeleteProduct(uid, item.id)}> 
                <DeleteOutline color='warning'/> 
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>

    const PastOrdersTemp = () => <div className='card container'>
    <div className='card-body'>
      {/* For some reason, I get error: savedItems is not a function */}
      {savedItems?.map((item, index) => (
        <div 
          key={`${item.id}-container`} 
          className='user-products'
        >
          {index > 0 && <hr key={`${item.id}-hr`} />}
          <div
            key={`${item.id}-saved`} 
            className="saved-items"
          >
            <span key={`${item.id}-name`} className='ol-name v-center'>{item.name}</span>
            <span key={`${item.id}-ol`} className='ol-btn v-center'>
              <a href={`marketplace/products/${item.id}`} className='btn btn-success'>Buy Again</a>
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>

  if (item === "pastOrders") {
    if (savedItems?.length < 1) return (<NoSavedItems item={"past order"} />); 
    else {
      return <PastOrdersTemp />
    }
  } else {
    if (savedItems?.length < 1) return (<NoSavedItems item={"saved item"} />); 
    else {
      return <SavedItemsTemp />
    }
  }
}
