import React, { useState } from "react";
import FormField from "./form.component.tsx";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useAlert } from "../../../contexts/alert.context.tsx";
import { useLoading } from '../../../contexts/loading.context.tsx';
import Button from "../../../components/buttons/button.component.tsx";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { customCreateUserWithEmail } from "../../../utils/firebase.utils.ts";

// This component embodies the first creation of sign-up (logic and UI) before rendering on other components
const SignUp = () => {
  const navigate = useNavigate();
  const [ buyer, setBuyer ] = useState(true);
  const addAlert = useAlert().addAutoCloseAlert;
  const { showLoading, hideLoading } = useLoading();

  const defaultFormFields = {
    userType: buyer ? 'buyer' : 'seller',
    displayName: '',
    brandName: '@',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  }
  const [ showPassword, setShowPassword ] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const resetFormFields = () => { setFormFields(defaultFormFields) };
  const { userType, displayName, brandName, phone, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  const handleSellerTagChange = (event) => {
    const { name, value } = event.target;
    let formattedValue = value;

    if (!value.startsWith('@')) {
      formattedValue = '@' + value.replace(/@/g, '');
    }

    formattedValue = formattedValue.toLowerCase().replace(/\s+/g, '');
    
    setFormFields({
      ...formFields,
      [name]: formattedValue,
    });

  };

  const handleChangeUser = () => {
    if(buyer) {
      setBuyer(false);
      navigate('#seller')
    } else { 
      navigate('')
      setBuyer(true);
    }
  }
  
  let userPath = '/auth', sellerPath = '/auth/accept-seller-terms'

  const handleSuccessNavigate = (path) => navigate(path)
  
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  
  const HandleSubmit = async (event) => {
    event.preventDefault()
    
    if (password !== confirmPassword) {
      addAlert("danger", 'Passwords do not match')
      return;
    }

    try {      
      showLoading();
      await customCreateUserWithEmail(email, password, displayName, brandName.substring(1), phone, userType);
      
      if (userType === "seller"){
        resetFormFields();
        addAlert("info", 'Seller profile created. Continue set up!');
        
        hideLoading();
        handleSuccessNavigate(sellerPath);
        setBuyer(false);
      } else {
        resetFormFields();
        addAlert("success", 'User profile created. Go to sign in!');
        
        hideLoading();
        handleSuccessNavigate(userPath)
        setBuyer(true);
      }
    } catch (error) {
      hideLoading();

      if (error.message.includes('auth/weak-password')) {
        addAlert("warning", 'Your password must be at least 6 characters!');
      } 
      else
      if (error.message.includes('auth/email-already-in-use')) {
        addAlert("danger", 'Failed to register. This email already exists!!');
      } else {
        addAlert("danger", 'Failed Operation! Please Try again later!!!');
      }
    }
  }

  return (
    <Container className="no-padding-container">
      <div className="card container sign-up-container">
        <div className="centered">
          <h4 className="title">Register</h4><hr/>
        </div>

        <form onSubmit={HandleSubmit}>
          <div className="group">
            <div className="p-3 bg-ws -mt2">
              <div className="flex-just-center">
                <h6>Are you here to buy or sell?</h6>
              </div>

              <RadioGroup
                value={!buyer ? 'seller' : 'buyer'}
                onChange={handleChange}
                name='userType'
              >
                <ol className="mx-auto -mb">
                  <FormControlLabel 
                    onClick={handleChangeUser} 
                    label="Buyer" control={<Radio />} 
                    value="buyer" name="userType" />
                  <FormControlLabel 
                    onClick={handleChangeUser} 
                    label="Seller" control={<Radio />} 
                    value="seller" name="userType" />
                </ol>
              </RadioGroup>
            </div>

            <div className="form-fields">
            <FormField
              label={'Full Name'}
              type='text' required
              onChange={handleChange}
              name='displayName'
              autoComplete="true"
              value={formFields.displayName}
            />

            {!buyer && 
            <FormField
              label={'Seller Tag'}
              type='text' required
              onChange={handleSellerTagChange}
              name='brandName'
              autoComplete="true"
              value={formFields.brandName}
            />
            }

            <FormField
              label={'Phone'}
              type='number' required
              onChange={handleChange}
              name='phone'
              autoComplete="true"
              value={formFields.phone}
            />

            <FormField
              label={'Email'}
              type='email' required
              onChange={handleChange}
              name='email'
              autoComplete="true"
              value={formFields.email}
            />
            
            <FormField
              label={'Password'}
              type={showPassword ? 'text' : 'password'} required
              onChange={handleChange}
              name='password'
              value={formFields.password}
              autoComplete='true'
            />

            <FormField
              label={'Confirm Password'}
              type={showPassword ? 'text' : 'password'} required
              onChange={handleChange}
              name='confirmPassword'
              value={formFields.confirmPassword}
              autoComplete='true'
            />
            
            <div 
              onClick={handleShowPassword}
              className="flex -mt2 mb-5 flex-end"
              
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
        
            <div className='buttons-container'>
              <Button buttonType={"default"} type="submit">
                Sign Up
              </Button>
              {/* {buyer && <Button
                type='button'
                buttonType='google'
                onClick={logGoogleUser}
              >
                <section id="google">
                  Google Sign-up
                </section>
              </Button>} */}
            </div>
          </div>
          </div>
        </form>

        <p className="centered z-footer"> 
          Already Registered? 
          <a href='/auth' className="zf-link"> &nbsp;Return to 
            sign in
          </a>
        </p>
        </div>
    </Container>
  )
}

export default SignUp;