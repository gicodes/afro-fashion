import { updateSeller, uploadImageAndGetUrl } from "../../../../../utils/writeBatch";
import { useLoading } from '../../../../../contexts/loading.context';
import { UserContext } from '../../../../../contexts/user.context';
import { useAlert } from "../../../../../contexts/alert.context";
import { Card, ListGroup, Container } from "react-bootstrap"; 
import { MdUpload, MdCloudDone } from "react-icons/md";
import { blankAvi } from "../../../brands/brands.route";
import { useState, useContext } from 'react';

export const SellerProfileCard = ({ 
  bio,
  sellerName, 
  phone, 
  address, 
  imageUrl, 
  badge, 
  bankAcct,
  bank,
}) => {
  const { showLoading, hideLoading } = useLoading();
  const [ inputFields, setInputFields ] = useState({
    bio: bio || '',
    phone: phone || '',
    name: sellerName || '',
    address: address || '',
    bankAcct: bankAcct || '',
    bank: bank || '',
    imageUrl: imageUrl || blankAvi,   
  });
  const [ imgFile, setImgFile ] = useState(null);
  const [ image, setImage ] = useState(null);
  const { userId } = useContext(UserContext);
  const { addAutoCloseAlert } = useAlert();

  const sellerId = userId;

  const handleInputChange = (field, value) => {
    setInputFields({ ...inputFields, [field]: value });
  };
  
  const handleSaveInfo = async (inputField, value) => {
    if (!inputField || !value) {
      addAutoCloseAlert("warning", `Empty ${inputField} field`)
      return;
    }
    showLoading();

    try {
      await updateSeller(sellerId,`${inputField}`, value);

      if (inputField === "brandName" || "bankAcct"){
        addAutoCloseAlert("success", `Seller info updated!`);
      } 
      else addAutoCloseAlert("success", `Seller ${inputField} updated!`);
    } catch (err) {

      console.error("Error updating info:", err);
      addAutoCloseAlert("danger", `Failed to update ${inputField}!`);
    } finally {
      hideLoading();
    }
  }

  const handleImgChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImgFile(file);
    } else setImgFile(image)
  };

  const handleImgUpload = async (imageFile) => {
    if (!imageFile) {
      addAutoCloseAlert("warning", 'Empty image field');
      return;
    }
    showLoading();

    try {
      const imageUrl = await uploadImageAndGetUrl(imageFile, sellerId);
      setImage(imageUrl);
      setInputFields({
        ...inputFields,
        imageUrl: imageUrl,
      });
      await updateSeller(sellerId, 'imageUrl', imageUrl);

      addAutoCloseAlert("success", 'Profile photo updated!');
      setImgFile(null);
    } catch (error) {

      console.error("Error uploading image:", error);
      addAutoCloseAlert("danger", "Failed to upload image");
    } finally {
      hideLoading();
    }
  }

  return (
    <Container className="no-padding-container">            
      <div className="card">
          <div className="mx-auto">
            <div className="flex-just-center avatar"> 
              <img loading="lazy"
                src={imageUrl || blankAvi}
                className="rounded-circle profile-image"
                alt="profile avatar"
              />
            </div>
          
            <div className="p-1 mx-auto">
              <div className="image-upload">
                <div className="choose-file">
	                <input 
                    onChange={handleImgChange}
                    accept=".jpg, .jpeg, .png"
                    id='file-input'
                    name="image"
                    type="file"
                  />
	              </div>
                <span onClick={() => handleImgUpload(imgFile)}>
                  <MdUpload size={25}/>
                </span>
              </div>
            </div>
          </div>

          <Card className="mb-2">          
            <div> 
              <Card.Header className="profile-info">
                <b>Personal Information</b>
              </Card.Header>
              
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between">
                  <span className="fs-smaller v-center">
                    <b className="s-bold">Brand Name</b> 
                  </span> 
                  <input type="text" 
                    className="form-control m-1" 
                    value={inputFields.name}
                    placeholder="Eg. luxury_boots"
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                   <span onClick={() => handleSaveInfo('brandName', inputFields.name)} className="v-center">
                    <MdCloudDone size={20}/>
                  </span>
                </ListGroup.Item>

                <ListGroup.Item className="d-flex justify-content-between">
                  <span className="fs-smaller v-center">
                    <b className="s-bold">Bio</b>
                  </span>
                  <input type="text" 
                    className="form-control m-1" 
                    value={inputFields.bio}
                    placeholder="Eg. I deal on kids clothing and sneakers"
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                  />
                  <span onClick={() => handleSaveInfo('bio', inputFields.bio)} className="v-center">
                    <MdCloudDone size={20}/>
                  </span>
                </ListGroup.Item>
          
                <ListGroup.Item className="d-flex justify-content-between">
                  <span className="fs-smaller v-center">
                    <b className="s-bold">Phone</b>
                  </span>
                  <input type="text" 
                    className="form-control m-1" 
                    value={inputFields.phone}
                    placeholder="Eg. (234)-812-3456-789"
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  /> 
                  <span onClick={() => handleSaveInfo('phone', inputFields.phone)} className="v-center">
                    <MdCloudDone size={20}/>
                  </span>
                </ListGroup.Item>
          
                <ListGroup.Item className="d-flex justify-content-between">
                  <span className="fs-smaller v-center">
                    <b className="s-bold">Address</b>
                  </span>
                  <input type="text" 
                    className="form-control m-1" 
                    value={inputFields.address}
                    placeholder="Eg.  #1 Afro street, Lagos, Nigeria"
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                  <span onClick={() => handleSaveInfo('address', inputFields.address)} className="v-center">
                    <MdCloudDone size={20}/>
                  </span>
                </ListGroup.Item>

                <ListGroup.Item className="d-flex justify-content-between">
                  <span className="fs-smaller v-center">
                    <b className="s-bold">Bank&nbsp;</b>
                  </span>
                
                  <select onChange={(e) => handleInputChange('bank', e.target.value)} 
                  name='bank' className="form-select centered-dropdown"
                  >
                    <option>Select Bank</option>
                    <option value="Access Bank">Access Bank</option>
                    <option value="Ecobank">Ecobank</option>
                    <option value="Fidelity Bank">Fidelity Bank</option>
                    <option value="First Bank of Nigeria">First Bank of Nigeria</option>
                    <option value="First City Monument Bank (FCMB)">First City Monument Bank (FCMB)</option>
                    <option value="GTBank">GTBank</option>
                    <option value="Heritage Bank">Heritage Bank</option>
                    <option value="Keystone Bank">Keystone Bank</option>
                    <option value="Stanbic IBTC Bank">Stanbic IBTC Bank</option>
                    <option value="Sterling Bank">Sterling Bank</option>                    
                    <option value="Union Bank">Union Bank</option>
                    <option value="United Bank for Africa">United Bank for Africa</option>
                    <option value="Unity Bank">Unity Bank</option>
                    <option value="VFD Microfinance Bank">VFD Microfinance Bank</option>
                    <option value="Wema Bank">Wema Bank</option>
                    <option value="Zenith Bank">Zenith Bank</option>
                  </select>

                  <input type="text" 
                    className="form-control m-1" 
                    value={inputFields.bankAcct}
                    placeholder="Eg. 0123456789"
                    onChange={(e) => handleInputChange('bankAcct', e.target.value)}
                  />
                  <span onClick={() => { 
                    handleSaveInfo('bankAcct', inputFields.bankAcct); 
                    handleSaveInfo('bank', inputFields.bank)}
                  } className="v-center"
                  >
                    <MdCloudDone size={20}/>
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Card> 
        </div>
    </Container>
  );
};