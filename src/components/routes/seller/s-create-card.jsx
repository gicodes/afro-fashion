import FormField from '../authentication/sign-up/form.component';
import { UserContext } from '../../../contexts/user.context';
import { addSellerItems } from '../../../utils/writeBatch';
import { useNavigate } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import { useState, useContext } from 'react';

import './seller.styles.scss';

const defaultFormFields = {
  category: '',
  title: '',
  price: '',
  images: [],
  info: '',
}

export const SellerCreateCard = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { category, title, price, info } = formFields;

  const generateRandomId = () => {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 1000000);
    return `${timestamp}-${randomNumber}`;
  }
  const brand = currentUser?.displayName;
  const path = `/seller/${brand}`;
  const id = generateRandomId();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleImgChange = (event) => {
    const { name, files } = event.target;
    const imagesArray = Array.from(files);
    setFormFields({ ...formFields, [name]: imagesArray });
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const imagesArray = Array.from(formFields.images).flat(); // Flatten the array
      const itemsArray = imagesArray.map((image, index) => ({
        id: `${id}${index}`,
        title: title,
        price: price,
        info: info,
        seller: brand,
        images: [image],
      }));
  
      await addSellerItems(category, itemsArray);
  
      alert('Product created successfully. Happy sales!!!');
      navigate(path);
    } catch (err) {
      console.error('Error adding items:', err.message);
    }
  };

  return (
    <>
      <Card className='card no-padding-container y-m mx-auto'> 
        <div className='card-header flex-just-center bg-ws'>
          Add a Product to your Collection
        </div>
        <div className='card-body'>
          <form onSubmit={handleSubmit} action=''>
            <select onChange={handleChange} name='category'
              className="form-select centered-dropdown w-50">
              <option>Select category</option>
              <option value="kids">Kids</option>
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="jersey">Jersey</option>
              <option value="hats">Hats</option>
              <option value="accessories">Accessories</option>
              <option value="jackets">Jackets</option>
              <option value="sneakers">Sneakers</option>
              <option value="shoes">Shoes</option>
              <option value="slippers">Slippers</option>
              <option value="bags">Bags</option>
              <option value="senegalese">Senegalese</option>
            </select>

            <FormField 
              label={'What would you name this item?'}
              onChange={handleChange}
              type="text"
              value={formFields.title}
              name="title"
            />
            <section className="bg-ws">
                <div className="row">
                  <div className="col-md-12">
                    <div className="verify-sub-box">
                      <p className='flex-just-center fs-smaller y-p1 c-50'>
                        <i>Upload different clear images of this item</i>
                      </p>
                      <div className="file-loading flex-just-center">
	                      <input 
                          className='flex-just-center'
                          onChange={handleImgChange}
                          accept=".jpg, .jpeg, .png"
                          id='upload-images'
                          name="images"
                          type="file"
                          multiple
                        />
	                    </div>
                    </div>
                </div>
              </div>
            </section>

            <FormField 
              label={'How much would this item cost? (US dollar $)'}
              onChange={handleChange}
              type="number"
              value={formFields.price}
              name="price"
            />

            <textarea
              className='form-control' 
              placeholder={'Write some info for this item'} 
              onChange={handleChange}
              type="textarea"
              value={formFields.info} 
              rows={3}
              name="info"
            />

            <div className='mt-3 flex-just-center'>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div> 
      </Card>
    </>
  )
}
