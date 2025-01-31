import React from 'react';
import './user.styles.scss';

// SavedItems take in two arguments that dynamically decides what to return each time it's called
// SavedItems render two sets of similar variables i.e. savedItems.orders & savedItems.savedItems

interface UserHistoryProps {
  savedItems: any[];
  item?: string;
}

export const UserHistory: React.FC<UserHistoryProps> = ({ savedItems, item }: UserHistoryProps) => {
  const NoSavedItems = ({item}) => 
    <div className='container'>
      <div className='m-2 text-center'>
        <p>You do not have any {item}</p>
      </div>
    </div>

  if (item === "pastOrders") {
    if (savedItems?.length < 1) return (<NoSavedItems item={"past order"} />); 
    else {
      return (
        <div className='card container'>
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
      )
    }
  }

  // savedItems.savedItems can use a delete button to minimize user data

  if (savedItems?.length < 1) return (<NoSavedItems item={"saved item"} />); 
  else {
    return (
      <div className='card container'>
        <div className='card-body'>
          {savedItems?.map((item, index) => (
            <div 
              key={index} 
              className='user-products'
            >
              {index > 0 && <hr key={`${item.id}-hr`} />}
              <a className="saved-items" href={`marketplace/products/${item.id}`}>
                <span key={`${item.id}-index`} className='index v-center'>{index + 1}.</span>
                <span key={`${item.id}-name`} className='name'>{item.name}</span>
                <span key={`${item.id}-price`} className='price v-center'>${item.price}
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
