import React from 'react'

// After admin sign in is complete and successful, this page is rendered
const AdminIndex = () => {
  return (
    <div className='p-2'>
      <div className='card container admin'>
        <div className='card-body'>
          <div className='mt-4 p-2'>
            <h6>Hello Admin 👋</h6>
            <p> You now have more control over AF Business </p>
          </div>

          <div className='card p-3'>
            <div className='mt-2 p-2 btn btn-info'>
              Get all users
              <span className='block fs-xs'>Retrieve the list of all buyers </span>
            </div>
            <br/>
            <div className='mt-2 p-2 btn btn-warning'>
              Get product by Id
              <span className='block fs-xs'>search for a product with the correct Id</span>
            </div>
            <div className='mt-2 p-2 btn btn-success'>
              Get all products
              <span className='block fs-xs'>retrieve the list of all products</span>
            </div>
            <div className='mt-2 p-2 btn btn-warning'>
              Get seller information
              <span className='block fs-xs'>search for a seller with brand name</span>
            </div>
            <div className='mt-2 p-2 btn btn-success'>
              Get all sellers
              <span className='block fs-xs'>retrieve the list of all sellers</span>
            </div>
          </div>
          <br/>

          <div className='card bg-wheat p-3'>
            <div className='card-body fs-smaller text-center'>
              Actions require higher-level authorization
            </div>

            <div className='mt-2 p-2 btn btn-info'>
              Add new category collection
              <span className='block fs-xs'>add new category to the collections store</span>
            </div>
            <div className='mt-2 p-2 btn btn-warning'>
              Update category collection
              <span className='block fs-xs'>update a category collection information</span>
            </div>
            <div className='mt-2 p-2 btn btn-danger'>
              Delete category collection
              <span className='block fs-xs'>remove a category collection from store</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminIndex