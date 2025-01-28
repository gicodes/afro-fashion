import { updateSeller, uploadImageAndGetUrl } from "../../../../utils/writeBatch.ts";
import { useLoading } from '../../../../contexts/loading.context.tsx';
import { useAlert } from "../../../../contexts/alert.context.tsx";
import UserContext from "../../../../contexts/user.context.tsx";
import { MdUpload, MdSaveAs, MdVerified } from "react-icons/md";
import { blankAvi } from "../../index/dash-assets.tsx";
import React, { useState, useContext } from 'react';
import { Card } from "react-bootstrap"; 

interface SellerProfileProps {
  bio: string;
  sellerName: string;
  brandName: string;
  phone: string;
  address: string;
  imageUrl: string;
  bankAcct: string;
  bank: string;
  isVerified: boolean;
}

export const SellerProfileCard: React.FC<SellerProfileProps>  = ({ 
  bio,
  sellerName,
  brandName, 
  phone, 
  address, 
  imageUrl, 
  bankAcct,
  bank,
  isVerified
}: SellerProfileProps) => {
  const { showLoading, hideLoading } = useLoading();
  const [ inputFields, setInputFields ] = useState({
    bio: bio || '',
    phone: phone || '',
    name: sellerName || '',
    brandName: '@' + brandName,
    address: address || '',
    bankAcct: bankAcct || '',
    bank: bank || '',
    imageUrl: imageUrl || blankAvi,   
  });

  const [ imgFile, setImgFile ] = useState(null);
  const { addAutoCloseAlert } = useAlert();
  const { uid } = useContext(UserContext);

  const sellerId = uid;

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
    } else setImgFile(null)
  };

  const handleImgUpload = async (imageFile) => {
    if (!imageFile) {
      addAutoCloseAlert("warning", 'Empty image field');
      return;
    }
    showLoading();

    try {
      const imageUrl = await uploadImageAndGetUrl(imageFile, sellerId);
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
    <Card className="col-md-8">            
      <div className="card">
        <div className="mx-auto">
          <div className="flex-just-center avatar"> 
            <img 
              loading="lazy"
              src={imageUrl || blankAvi}
              alt={`${sellerName}'s profile avatar`}
            />
          </div>
          <div className="verified">
            {isVerified && <MdVerified size={20} fill="green"/>}
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

        <div> 
          <div className="card-header profile-info">
            <b>Personal Information</b>
          </div>
          
          <div className="p-1">
            <div className="d-flex justify-content-between m-2">
              <span className="info-title"> Full Name </span> 
              <input type="text"
                className="form-control m-1" 
                value={inputFields.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
                <span onClick={() => handleSaveInfo('displayName', inputFields.name)} className="v-center">
                <MdSaveAs size={20}/>
              </span>
            </div>
            
            <div className="d-flex justify-content-between m-2">
              <span className="info-title">Brand Name</span> 
              <input 
                disabled
                className="form-control m-1" 
                value={inputFields.brandName}
              />
            </div>

            <div className="d-flex justify-content-between m-2">
              <span className="info-title">Bio</span>
              <input type="text" 
                value={inputFields.bio}
                className="form-control m-1" 
                placeholder="Eg. I deal on kids clothing and sneakers"
                onChange={(e) => handleInputChange('bio', e.target.value)}
              />
              <span onClick={() => handleSaveInfo('bio', inputFields.bio)} className="v-center">
                <MdSaveAs size={20}/>
              </span>
            </div>
      
            <div className="d-flex justify-content-between m-2">
              <span className="info-title">Phone</span>
              <input type="text" 
                className="form-control m-1" 
                value={inputFields.phone}
                placeholder="Eg. (234)-812-3456-789"
                onChange={(e) => handleInputChange('phone', e.target.value)}
              /> 
              <span onClick={() => handleSaveInfo('phone', inputFields.phone)} className="v-center">
                <MdSaveAs size={20}/>
              </span>
            </div>
      
            <div className="d-flex justify-content-between m-2">
              <span className="info-title">Address</span>
              <input type="text" 
                className="form-control m-1" 
                value={inputFields.address}
                placeholder="Eg.  #69 Ozumba Mbadiwe, Lagos, Nigeria"
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
              <span onClick={() => handleSaveInfo('address', inputFields.address)} className="v-center">
                <MdSaveAs size={20}/>
              </span>
            </div>

            <div className="d-flex justify-content-between m-2">
              <span className="info-title">Bank&nbsp;&nbsp;</span>
              <select 
                onChange={(e) => handleInputChange('bank', e.target.value)} 
                name='bank' className="form-select centered-dropdown m-2"
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
                className="form-control" 
                value={inputFields?.bankAcct}
                placeholder="Eg. 0123456789"
                onChange={(e) => handleInputChange('bankAcct', e.target.value)}
              />
              <span 
                className="v-center"
                onClick={() => { 
                  handleSaveInfo('bankAcct', inputFields.bankAcct); 
                  handleSaveInfo('bank', inputFields.bank)}
                }
              >
                <MdSaveAs size={20}/>
              </span>
            </div>
          </div>
        </div> 
      </div>
    </Card>
  );
};