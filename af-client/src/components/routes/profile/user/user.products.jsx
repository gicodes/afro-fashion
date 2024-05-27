import './user.styles.scss';

export const PastOrders = ({ pastOrders, orders }) => {
  // savedItems.pastOrders can be modified to include a "buy again" option for users

}

// savedItems.savedItems can be modified to include links to products and/or checkout
// savedItems.savedItems can use options alerts to control flow to product routing
// savedItems.savedItems can use a delete button to minimize user data

export const SavedItems = ({ savedItems, item }) => {
  if (item === "orders"){
    return;
  } else 
  return (
    <>
      <div className='card container'>
        <div className='card-body'>
          {savedItems?.map((item, index) => (
            <div 
              key={`${item.id}-container`} 
              className='user-products'
            >
              {index > 0 && <hr key={`${item.id}-hr`} />}
              <div key={`${item.id}-saved`} className="saved-items">
                <span key={`${item.id}-index`} className='index v-center'>{index + 1}.</span>
                <span key={`${item.id}-name`} className='name'>{item.name}</span>
                <span key={`${item.id}-price`} className='price v-center'>
                  <a href={`marketplace/products/${item.id}`}>
                    ${item.price}
                  </a>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}