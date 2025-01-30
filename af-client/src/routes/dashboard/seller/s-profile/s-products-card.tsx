import { deleteSellerItem, editSellerItem } from '../../../../utils/writeBatch.ts';
import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useLoading } from '../../../../contexts/loading.context.tsx';
import BrandContext  from '../../../../contexts/brand.context.tsx';
import { useAlert } from '../../../../contexts/alert.context.tsx';
import { useNavigate } from 'react-router-dom';
import '../../dashboard.styles.scss';
import { Card } from '@mui/material';

interface SProductCardProps { sellerName: string; }

export const SellerProducts: React.FC<SProductCardProps> = ({ sellerName }) => {
  const navigate = useNavigate();
  const seller = sellerName.toLowerCase();
    const brandContext = useContext(BrandContext);
    const brandItemsMap = useMemo(() => brandContext?.brandItemsMap || {}, [brandContext]);
  const { showLoading, hideLoading } = useLoading();
  const [ brands, setBrands ] = useState(brandItemsMap[seller]);

  useEffect(() => {
    setBrands(brandItemsMap[seller]);
  }, [seller, brandItemsMap]);

  const { addOptionsAlert, addAutoCloseAlert } = useAlert();

  const handleDeleteProduct = async (category, itemId) => {
    const handleYes = () => {
      showLoading();
      deleteSellerItem(category, itemId);

      addAutoCloseAlert("success", 'Product Deleted!' )
      hideLoading();
      navigate(`/brands/${seller}`);
    };

    const handleNo = () => addAutoCloseAlert("warning", 'Delete operation failed!');

    addOptionsAlert(
      'danger',
      'This action is irreversible. Are you sure you want to delete this product?',
      handleYes, handleNo
    );
  };

  const Product = ({ category, product }) => {
    const [editProduct, setEditProduct] = useState(false);
    const [inputFields, setInputFields] = useState({
      name: product?.name || '',
      count: product?.count || '',
      price: product?.price || '',
      info: product?.info || '',
    });

    const toggleEditProduct = () => setEditProduct(!editProduct);
  
    const handleInputChange = (field, value) => {
      setInputFields({ ...inputFields, [field]: value });
    };
  
    const handleFormSubmit = () => {
      showLoading();
      editSellerItem(product?.category, product?.id, inputFields);

      setEditProduct(false);
      addAutoCloseAlert("success", 'Product edited successfully!')

      hideLoading();
      navigate(`/brands/${seller}`);
    };

    return (
      <div>
        <div className="product-bar" key={`${category}-${product?.id}`}>
          <span className="product-name">
            <b>{product?.name}</b>
          </span>
          <div className="btn-group" role="group">
            <button
              type="button"
              className="btn btn-warning"
              onClick={toggleEditProduct}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleDeleteProduct(product?.category, product?.id)}
            >
              Delete
            </button>
          </div>
        </div>

        { editProduct && (
          <div className='mb-2'>
            <div className="input-group p-2 bg-ws">
              <div className="input-group-prepend">
                <span className="input-group-text">Description</span>
              </div>
              <input type="text" 
                className="form-control" 
                value={inputFields.info}
                onChange={(e) => handleInputChange('info', e.target.value)}
              />
            </div>

            <div className="input-group p-2 bg-ws">
              <div className="input-group-prepend">
                <span className="input-group-text">Remaining</span>
              </div>
              <input 
                type="number" 
                className="form-control" 
                value={inputFields.count}
                onChange={(e) => handleInputChange('count', e.target.value)}
              />

              <div className="input-group-prepend">
                <span className="input-group-text">Price</span>
              </div>
              <input
                type="number"
                className="form-control"
                value={inputFields.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
              />
            </div>
            <div className="input-group p-2 bg-ws">
              <div className="input-group-prepend">
                <span className="input-group-text">Edit name</span>
              </div>
              <input
                type="text"
                className="form-control"
                value={inputFields.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
              <button
                onClick={handleFormSubmit}
                className="btn btn-outline-primary"
                type="button"
              >
                Submit Edit
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="my-1">
      { brands && Object.keys(brands).length > 0 ? (
        <div>
          <div className='my-3 text-center text-success'> 
            <h6>Active Products from your inventory</h6> 
          </div>
          { Object.entries(brands).map(([category, categoryProducts]) => (
            <div className="category-card" key={category}>
              <div className='p-3'>
                <h6 className="font-awesome text-center">
                  Category: <span className='text-gray'>{category.toUpperCase()}</span>
                </h6>
              </div>
              
              { Array.isArray(categoryProducts) && categoryProducts.map((product) => (
                <Product
                  key={product?.id}
                  category={category}
                  product={product}
                />
              ))}
            </div>
          ))}
        </div>
        ) : (
        <div className="mx-auto p-3">
          You have no Active Product...
        </div>
      )}
    </Card>
  );
};
