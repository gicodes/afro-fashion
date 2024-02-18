import { addSellerItems, uploadImages } from '../../../../../utils/writeBatch';
import FormField from '../../../authentication/sign-up/form.component';
import { useLoading } from '../../../../../contexts/loading.context';
import { UserContext } from '../../../../../contexts/user.context';
import { useAlert } from '../../../../../contexts/alert.context';
import { useNavigate } from "react-router-dom";
import { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';

import '../../profile.styles.scss';

const defaultFormFields = {
  category: '',
  name: '',
  price: '',
  count: '',
  images: [],
  info: '',
}

export const SellerCreateCard = () => {
  const navigate = useNavigate();
  const addAlert = useAlert().addAutoCloseAlert;
  const { currentUser } = useContext(UserContext);
  const { showLoading, hideLoading } = useLoading();
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { category, name, price, count, info, } = formFields;

  const generateRandomId = () => {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 1000000);
    return `${timestamp}-${randomNumber}`;
  }

  const brand = currentUser?.brandName;
  const path = `/seller/${brand.toLowerCase()}`;
  const id = generateRandomId();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleImgChange = (event) => {
    const { name, files } = event.target;
    setFormFields({ ...formFields, [name]: files });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!brand){
      addAlert("danger", 'You must have a unique brand name');
      return;
    }

    try {
      const imagesArray = formFields.images;
      const imageUrls = await uploadImages(imagesArray, id);
      const itemsToAdd = {
        id: id,
        name: name,
        price: price,
        count: count,
        info: info,
        seller: brand,
        category: category,
        imageUrls: imageUrls,
      };
      
      setIsSubmitting(true);
      showLoading();
      await addSellerItems(category, itemsToAdd);

      addAlert("success", 
      'Product created! It might up to take 15 minutes to propogate as we verify product authenticity');

      setIsSubmitting(false);
      hideLoading();
      navigate(path);
    } catch (err) {
      hideLoading();
      addAlert("danger", 'something went wrong. Try again later!!')
    }
  }

  return (
    <>
      <div className='card container'>
        <div className='p-2'>
          <form onSubmit={handleSubmit} action=''>
            <div className='card mb-2 fs-smaller'>
              <button disabled className='btn btn-warning m-2'>Important notice for <b>ALL</b> sellers!</button>
              <div className='p-2'>
                <p>You have to create or update your <b>Brand Name</b>, before creating your very first product!</p>
                <p>Brand names are used throughout the marketplace to <b>ID</b> sellers product. 
                  It is important to use a unique name and keep it consistent.</p>
                <p>To avoid conflicts when a user tries to purchase your product, update 
                  your <b>Bank</b> information with the listed banks available.</p>
              </div>
            </div>

            <select onChange={handleChange} name='category' 
              className="form-select centered-dropdown"
            >
              <option>Select item category</option>
              <option value="kids">Kids</option>
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="jerseys">Jersey</option>
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
              type="text" name="name"
              value={formFields.name}
            />

            <div className="bg-ws">
              <p className='flex-just-center fs-smaller pt-3 c-50'>
                <i>* Upload different clear images of this item*</i>
              </p>
              <div className="p-1 m-1">
	              <input 
                  onChange={handleImgChange}
                  accept=".jpg, .jpeg, .png"
                  id='upload-images'
                  name="images"
                  type="file"
                  multiple
                />
	            </div>
            </div>

            <FormField 
              label={'How much would this item cost?'}
              onChange={handleChange}
              type="number"
              value={formFields.price}
              name="price"
            />

            <FormField 
              label={'How much stock do you currently have?'}
              onChange={handleChange}
              type="number" name="count"
              value={formFields.count}  
            />

            <textarea
              className='form-control' 
              placeholder={'Write a detailed information about this item. Eg. This shoe comes in size 8.'} 
              onChange={handleChange}
              type="textarea" name="info"
              value={formFields.info} 
              rows={3}
            />

            <div className='m-2 flex-just-center'>
              <Button type="submit" disabled={isSubmitting}>Submit</Button>
            </div>
          </form>
        </div> 
      </div>
    </>
  )
}