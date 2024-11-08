import { updateUser, uploadImageAndGetUrl } from "../../../../utils/writeBatch";
import { useLoading } from '../../../../contexts/loading.context';
import { UserContext } from '../../../../contexts/user.context';
import { useAlert } from "../../../../contexts/alert.context";
import { MdUpload, MdSaveAs } from "react-icons/md";
import { blankAvi } from "../../index/dash-assets";
import { useState, useContext } from 'react';
import { Card } from "react-bootstrap"; 

export const UserProfileCard = ({ 
  bio, 
  name, 
  phone, 
  address, 
  imageUrl 
}) => {
  const { showLoading, hideLoading } = useLoading();
  const [ inputFields, setInputFields ] = useState({
    bio: bio || '',
    name: name || '',
    phone: phone || '',
    address: address || '',
    imageUrl: imageUrl || blankAvi,   
  });
  const [ imgFile, setImgFile ] = useState(null);
  const [ image, setImage ] = useState(null);
  const { userId } = useContext(UserContext);
  const { addAutoCloseAlert } = useAlert();

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
      await updateUser(userId,`${inputField}`, value);

      if (inputField === "displayName"){
        addAutoCloseAlert("success", `User display name updated!`);
      }
      else addAutoCloseAlert("success", `User ${inputField} updated!`);
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
      const imageUrl = await uploadImageAndGetUrl(imageFile, userId);
      setImage(imageUrl);
      setInputFields({
        ...inputFields,
        imageUrl: imageUrl,
      });
      await updateUser(userId, 'imageUrl', imageUrl);

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
      <div className="user-profile">
        <div className="avatar">
          <div className="cover-photo"> 
            {/* At some point, changeCoverPhoto=true */}
          </div>
          <div className="flex-just-center">
            <img 
              loading="lazy"
              src={imageUrl || blankAvi}
              alt={`${name}'s profile avatar`}
            />
          </div>
        </div>   

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
         
      <div> 
        <div className="card-header profile-info">
          <b>Personal Information</b>
        </div>
        
        <div className="p-1">
          <div className="d-flex justify-content-between m-2">
            <span className="info-title">Name</span> 
            <input type="text" 
              className="form-control m-1" 
              value={inputFields.name}
              placeholder="Eg. Abdul, Bukayo Chiwendu"
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            <span onClick={() => handleSaveInfo('displayName', inputFields.name)} className="v-center m-1">
              <MdSaveAs size={20}/>
            </span>
          </div>

          <div className="d-flex justify-content-between m-2">
            <span className="info-title">Bio</span>
            <input type="text" 
              className="form-control m-1" 
              value={inputFields.bio}
              placeholder="Eg. I'm interested in women clothing and senegalese"
              onChange={(e) => handleInputChange('bio', e.target.value)}
            />
            <span onClick={() => handleSaveInfo('bio', inputFields.bio)} className="v-center m-1">
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
            <span onClick={() => handleSaveInfo('phone', inputFields.phone)} className="v-center m-1">
              <MdSaveAs size={20}/>
            </span>
          </div>
    
          <div className="d-flex justify-content-between m-2">
            <span className="info-title">Address</span> 
            <input type="text" 
              className="form-control m-1" 
              value={inputFields.address}
              placeholder="Eg.  #1 Afro street, Lagos, Nigeria"
              onChange={(e) => handleInputChange('address', e.target.value)}
            />
            <span onClick={() => handleSaveInfo('address', inputFields.address)} className="v-center m-1">
              <MdSaveAs size={20}/>
            </span>
          </div>  
        </div>
      </div>
    </Card>
  );
};