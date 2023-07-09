import FormField from '../authentication/sign-up/form.component';
import Button from '../../buttons/button.component';
import { WriteBatch } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

const Seller = () => {
  const handleChange = (event) => {
    const { name, image, price } = event.target;
    setFormFields({ ...formFields, [name]: value, [image]: value, [price]: value });
  }

  return (
    <>
      <Container className='card container'> 
        <div className='card-header'>
          Add a Product to your Collection
        </div>
        <div className='card-body'>
          <form onSubmit={HandleSubmit} action=''>
            <FormField 
              label={'Product Name'}
              type="text"
              onChange={handleChange}
              value={name}
            />
            <FormField 
              label={'Upload Image'}
              type='image/jpeg'
              onChange={handleChange}
              value={image}
            />
            <input type="file" id="image" name="image"/>
            <FormField 
            label={'Product Price'}
            type="number"
            onChange={handleChange}
            value={price}
          />
          </form>
        </div>  
      </Container>
    </>
  )
}

export default Seller;