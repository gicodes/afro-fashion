import { addNewProduct, countOkAddProduct, uploadProductImages } from '../../../../utils/writeBatch.ts';
import { setDateToTimestamp } from '../../../../components/date/dateConverter.ts';
import FormField from '../../../authentication/sign-up/form.component.tsx';
import { useLoading } from '../../../../contexts/loading.context.tsx';
import { useAlert } from '../../../../contexts/alert.context.tsx';
import UserContext from '../../../../contexts/user.context.tsx';
import React, { useState, useContext } from 'react';
import { InfoRounded } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import '../../dashboard.styles.scss';
import { Card } from '@mui/material';

const defaultFormFields = {
  category: '',
  name: '',
  price: '',
  stock: '',
  images: [],
  info: '',
}

export const SellerCreateCard: React.FC = () => {
  const navigate = useNavigate();
  const addAlert = useAlert().addAutoCloseAlert;
  const { showLoading, hideLoading } = useLoading();
  const { currentUser, uid } = useContext(UserContext);
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const [ uploadImageInfo, setUploadImageInfo ] = useState<boolean>(false);
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { category, name, price, stock, info, } = formFields;

  const generateRandomId = () => {
    const timeOfGeneration = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 1000000);
    return `${timeOfGeneration}-${randomNumber}`;
  }

  const id = generateRandomId();
  const brandName = currentUser?.brandName;
  const path = `/brands/${brandName.toLowerCase()}`;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleImgChange = (event) => {
    const { name, files } = event.target;
    if (files?.length > 0) {
      setFormFields({ ...formFields, [name]: files });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return; // prevent multiple submissions
    setIsSubmitting(true); // disable the button
    showLoading();

    if (!brandName){ // check for brandName to avoid null error
      addAlert("danger", 'You must have a unique brand name!');
      return;
    }

    const countOk = await countOkAddProduct(currentUser, uid)
    const updatedAt = setDateToTimestamp();
    try {
      const imagesArray = formFields?.images;
      const imageUrls = await uploadProductImages(imagesArray, id);
      const itemsToAdd = {
        id: id,
        name: name,
        price: price,
        count: stock,
        info: info,
        seller: brandName,
        category: category,
        imageUrls: imageUrls,
        updatedAt: updatedAt,
      }

      if (countOk) {
        await addNewProduct(category, itemsToAdd);
        addAlert("success", 
        "Your Product is being created... this may take up some time. You'll be redirected to your store. Refresh after 2 minutes to see your new product 📈");

        hideLoading();

        setTimeout(() => {
          navigate(path);
        }, 5000) 
      } else {
        addAlert("danger", 'You have exceeded your limit. Upgrade your subscription to continue creating products!')
      }
    } catch (err) {
      console.error(err);

      addAlert("danger", 'Something went wrong. Please try again later!!')
    } finally {
      hideLoading();
      setIsSubmitting(false);
    }
  }

  return (
    <Card className='my-1 mx-auto col-md-6'>
      <div className='card-header py-4 text-center bg-ws'>
        <h6>Create a new product for your audience</h6>
      </div>
      <div className='px-4'>
        <form onSubmit={handleSubmit}>
          <FormField 
            required
            id="name"
            name="name"
            type="text" 
            value={formFields.name}
            onChange={handleChange}
            label={'Product Name'}
          />
          
          <select
            required
            id="category"
            name='category' 
            onChange={handleChange} 
            className="form-select centered-dropdown bg-wheat my-1"
          > {/* values must match category values in db */}
            <option value={""}>Select product category</option> 
            <option value="accessories">Accessories</option>
            <option value="bags">Bags</option>
            <option value="cosmetics">Cosmetics</option>            
            <option value="hair">Hair & Accessories</option>
            <option value="hats">Hats & Caps</option>
            <option value="jackets">Jackets & Coats</option>
            <option value="jerseys">Jerseys</option>
            <option value="kids">Kids Clothing</option>
            <option value="men">Men Clothing</option>
            <option value="senegalese">Senegalese</option>
            <option value="shoes">Shoes & Sneakers</option>
            <option value="slippers">Slippers & Sandals</option> 
            <option value="jewelleries">Jewelleries</option> 
            <option value="unisex">Unisex</option>
            <option value="women">Women Clothing</option>
          </select>

          <FormField 
            required
            id="price"
            name="price"
            type="number"
            onChange={handleChange}
            value={formFields.price}
            label={'Product price in NGN?'}
          />

          <FormField 
            required
            id="stock"
            name="stock"
            type="number" 
            onChange={handleChange}
            value={formFields.stock}  
            label={'How many units do you currently have?'}
          />

          <textarea
            required
            rows={4}
            id="info"
            name="info"
            value={formFields.info} 
            className='form-control' autoComplete=''  
            placeholder={'Write a detailed information about this item. Eg. This shoe comes in size 8.'} 
            onChange={handleChange}
          />

          <div className="bg-ws my-2 py-2">
            <div className="flex-space-around">
              <input 
                className='w-90'
                onChange={handleImgChange}
                accept=".jpg, .jpeg, .png"
                id='upload-images'
                name="images"
                type="file"
                multiple
                required
              />
              <span onClick={() => setUploadImageInfo(!uploadImageInfo)}>
                <InfoRounded />
              </span>
            </div>
            { uploadImageInfo && 
              <div className='fs-smaller my-3'>
                <span className='flex-just-center fs-smaller'>
                  <i>*Upload at least 2 different photos of this product*</i>       
                </span>
                <ul className='my-1'>
                  <li>Each photo must be less than 1MB</li> 
                  <li>All photos must be clear and distinctive</li>
                  <li>All photos must maintain same background (preferably white background)</li>
                </ul>
              </div>
            }
          </div>

          <div className='my-3 flex-just-center'>
            <Button 
              type="submit" disabled={isSubmitting}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Card> 
  )
}
