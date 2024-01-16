import { addCollectionAndDocuments } from '../../../utils/writeBatch';
import FormField from '../authentication/sign-up/form.component';
import { useNavigate } from "react-router-dom";
import { Card } from 'react-bootstrap';
import { useState } from 'react';

export const SellerCreateCard = (seller) => {
  let key = {seller};
  let objectToAdd = [];
  let path = `/shop/${seller}`; 

  const navigate = useNavigate();

  const defaultFormFields = {
    name: '',
    price: '',
    image: '',
    description: '',
  }

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, price, image, description } = formFields;
  const HandleSubmit = async (event) => {
    event.preventDefault();

    try {
      await addCollectionAndDocuments(key, objectToAdd);
      alert('Product added successful. Happy Selling!!!')
      navigate(path);
    }

    catch (error) {
      // need to check and handle error codes
      switch (error.code) {
        case '':
          alert('!')
          break
        default: alert('!!!');
      }
    }
  }

  const handleChange = (event) => {
    const { value } = event.target;
    setFormFields({ ...formFields, [name]: value, [image]: value, [price]: value, [description]: value });
  }

  return (
    <>
      <Card className='card no-padding-container y-m'> 
        <div className='card-header'>
          Add a Product to your Collection
        </div>
        <div className='card-body'>
          <form onSubmit={HandleSubmit} action=''>
            <FormField 
              label={'What would you name this item?'}
              onChange={handleChange}
              type="text"
              value={name}
            />
            <section className="bg-diffrent">
              <div className="container bg-ws">
                <div className="row">
                  <div className="col-md-12">
                    <div className="verify-sub-box">
                      <p className='flex-just-center fs-smaller y-p1 c-50'><i>Upload different clear images of this item</i></p>
                      <div className="file-loading" >
	                      <input id="multiplefileupload" type="file" accept=".jpg,.png" multiple/>
	                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>            
            <FormField 
              label={'How much would this item cost?'}
              onChange={handleChange}
              type="number"
              value={price}
            />
            <textarea
              className='form-control' 
              placeholder={'Write some description for this item'} 
              onChange={handleChange}
              type="textarea"
              value={description} 
              rows={3}
            />
          </form>
        </div> 
      </Card>
    </>
  )
}