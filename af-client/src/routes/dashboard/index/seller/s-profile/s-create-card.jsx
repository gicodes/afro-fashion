import { addNewProduct, countOkAddProduct, uploadProductImages } from '../../../../../utils/writeBatch';
import { formattedDate, formattedTime, newTime } from '../../../../../components/date/dateConverter';
import FormField from '../../../../authentication/sign-up/form.component';
import { useLoading } from '../../../../../contexts/loading.context';
import { UserContext } from '../../../../../contexts/user.context';
import { useAlert } from '../../../../../contexts/alert.context';
import { useNavigate } from "react-router-dom";
import { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import '../../../dashboard.styles.scss';

const defaultFormFields = {
  category: '',
  name: '',
  price: '',
  stock: '',
  images: [],
  info: '',
}

export const SellerCreateCard = () => {
  const navigate = useNavigate();
  const addAlert = useAlert().addAutoCloseAlert;
  const { showLoading, hideLoading } = useLoading();
  const { currentUser, userId } = useContext(UserContext);
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { category, name, price, stock, info, } = formFields;

  const generateRandomId = () => {
    const randomNumber = Math.floor(Math.random() * 1000000);
    return `${newTime}-${randomNumber}`;
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

    if (!brandName){
      addAlert("danger", 'You must have a unique brand name!');
      return;
    }

    const countOk = await countOkAddProduct(currentUser?.brandName, userId)
    const timeStamp = `${formattedDate} at ${formattedTime}`

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
        updatedAt: timeStamp
      }

      if (countOk) {
        await addNewProduct(category, itemsToAdd);
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
      hideLoading();
      setIsSubmitting(false);
    }
  }

  return (
    <div className='card container'>
      <div className='p-2'>
        <form onSubmit={handleSubmit}>
          <select
            required
            id="category"
            name='category' 
            onChange={handleChange} 
            className="form-select centered-dropdown"
          > {/* values must match category values in db */}
            <option value={""}>Select item category</option> 
            <option value="accessories">Accessories</option>
            <option value="bags">Bags</option>          
            <option value="hair">Hair & Accessories</option>
            <option value="hats">Hats & Caps</option>
            <option value="jackets">Jackets & Coats</option>
            <option value="jerseys">Jerseys</option>
            <option value="kids">Kids Clothing</option>
            <option value="men">Men Clothing</option>
            <option value="senegalese">Senegalese</option>
            <option value="shoes">Shoes & Sneakers</option>
            <option value="slippers">Slippers & Sandals</option> 
            <option value="cosmetics">Cosmetics</option>  
            <option value="jewelleries">Jewelleries</option> 
            <option value="unisex">Unisex</option>
            <option value="women">Women Clothing</option>
          </select>

          <FormField 
            id="name"
            name="name"
            type="text" 
            value={formFields.name}
            onChange={handleChange}
            label={'Item or Product Name'}
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

            <div className="p-1">
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
            id="price"
            name="price"
            type="number"
            onChange={handleChange}
            value={formFields.price}
            label={'Item or Product cost in USD?'}
          />

          <FormField 
            id="stock"
            name="stock"
            type="number" 
            onChange={handleChange}
            value={formFields.stock}  
            label={'How many units do you currently have?'}
          />

          <textarea
            rows={3}
            id="info"
            name="info"
            type="textarea"
            value={formFields.info} 
            className='form-control' autoComplete=''  
            placeholder={'Write a detailed information about this item. Eg. This shoe comes in size 8.'} 
            onChange={handleChange}
          />

          <div className='m-2 flex-just-center'>
            <Button 
              type="submit" disabled={isSubmitting}
            >
              Submit
            </Button>
          </div>
        </form>
      </div> 
    </div>
  )
}
