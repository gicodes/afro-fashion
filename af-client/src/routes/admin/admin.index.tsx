import React from 'react';

// After admin sign in is complete and successful, this page is rendered
const AdminIndex = () => {

  const ActionBtn = ({text, color, description, action}) => {
    return (
      <div
        className={`my-1 p-2 btn mw-268 mx-auto btn-${color}`}
        onClick={action}
      >
        {text}
        <span className='block fs-xs'>{description}</span>
      </div>
    )
  }

  return (
    <div className='p-2'>
      <div className='card container admin'>
        <div className='card-body'>
          <div className='mt-4 p-2'>
            <h6>Hello Admin,</h6>
            <p> Manage the little details with AF Business </p>
          </div>

          <div className='card p-3'>
            <ActionBtn text='Get all users' color='success' description='retrieve the list of buyers and sellers' action={() => console.log('add new product')} />
            <br/>
            <ActionBtn text='Get product by Id' color='warning' description='search for a product with Id' action={() => console.log('add new product')} />
            <ActionBtn text='Get all products' color='success' description='retrieve the list of all products' action={() => console.log('add new product')} />
            <ActionBtn text='Get seller information' color='warning' description='search for a seller with brand name' action={() => console.log('add new product')} />
            <ActionBtn text='Get all sellers' color='success' description='retrieve the list of all sellers' action={() => console.log('add new product')} />
          </div>
          <br/>

          <div className='card bg-lg p-3'>
            <div className='card-body fs-smaller text-center'>
              <p>Actions require higher-level authorization</p>
              
              <ActionBtn text='Add new category collection' color='light' description='add new category to the collections store' action={() => console.log('add new product')} />
              <ActionBtn text='Update category collection' color='info' description='update a category collection information' action={() => console.log('add new product')} />
              <ActionBtn text='Delete category collection' color='danger' description='remove a category collection from store' action={() => console.log('add new product')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default AdminIndex