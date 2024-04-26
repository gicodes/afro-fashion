import './user.styles.scss';

// savedItems.savedItems can be modified to include links to products and/or checkout
// savedItems.savedItems can use options alerts to control flow to product routing
// savedItems.savedItems can use a delete button to minimize user data

export const SavedItems = ({ savedItems, item }) => {
  if (item === "orders"){
    return;
  } else 
  return (
    <>
      <div className='card container pt-2'>
        {savedItems?.map((item, index) => (
          <div className='user-products'>
            {index > 0 && <hr key={index}/>}
            <div key={index} className="saved-items">
              <span className='text-secondary'>{item.name}</span>
              <span className='text-black'>
                <a href={`marketplace/products/${item.id}`}>
                  ${item.price}
                </a>
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}