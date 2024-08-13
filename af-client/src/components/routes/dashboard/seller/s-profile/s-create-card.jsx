import { addSellerItems, sellerProductCount, uploadImages } from '../../../../../utils/writeBatch';
import FormField from '../../../authentication/sign-up/form.component';
import { useLoading } from '../../../../../contexts/loading.context';
import { UserContext } from '../../../../../contexts/user.context';
import { useAlert } from '../../../../../contexts/alert.context';
import { useNavigate } from "react-router-dom";
import { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';

import '../../dashboard.styles.scss';

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
  const { showLoading, hideLoading } = useLoading();
  const { currentUser, userId } = useContext(UserContext);
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { category, name, price, count, info, } = formFields;

  const generateRandomId = () => {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 1000000);

    return `${timestamp}-${randomNumber}`;
  }

  const id = generateRandomId();
  const brand = currentUser?.brandName;
  const path = `/brands/${brand.toLowerCase()}`;

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

    const { uid } = userId;
    const countOk = await sellerProductCount(currentUser, uid)

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
      
      showLoading();

      if (countOk) {
        await addSellerItems(category, itemsToAdd);
        
        addAlert("success", 
        'Product created! It might up to take 15 minutes to propogate as we verify product authenticity');

        hideLoading();
        navigate(path);
      } else {
        addAlert("danger", 'You have exceeded your limit. Upgrade your subscription to continue creating products!')
      }
    } catch (err) {
      addAlert("danger", 'something went wrong. Try again later!!')
    } finally {
      hideLoading()
    }
  }

  return (
    <>
      <div className='card container'>
        <div className='p-2'>
          <form onSubmit={handleSubmit} action=''>
            <select onChange={handleChange} name='category' 
              className="form-select centered-dropdown"
            >
              <option>Select item category</option>
              <option value="accessories">Accessories</option>
              <option value="bags">Bags</option>          
              <option value="hair">Hair</option>
              <option value="hats">Hats</option>
              <option value="jackets">Jackets</option>
              <option value="jerseys">Jerseys</option>
              <option value="kids">Kids</option>
              <option value="men">Men</option>
              <option value="senegalese">Senegalese</option>
              <option value="shoes">Shoes</option>
              <option value="slippers">Slippers</option> 
              <option value="sneakers">Cosmetics</option>  
              <option value="underwears">Underwears</option> 
              <option value="unisex">Unisex</option>
              <option value="women">Women</option>
            </select>

            <FormField 
              label={'What would you name this item?'}
              onChange={handleChange}
              type="text" name="name"
              value={formFields.name}
            />

            <div className="bg-ws">
              <p className='flex-just-center fs-smaller pt-3co-50'>
                <i>*Upload at least 2 different photos of this item*</i>       
              </p>
              <div className='m-3 fs-smaller'>
                <li>Each photo must be less than 1MB</li> 
                <li>The photos must be clear and distinctive</li>
                <li>The photos must maintain same background (preferably white background)</li>
              </div>

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
              <Button type="submit">Submit Me</Button>
            </div>
          </form>
        </div> 
      </div>
    </>
  )
}