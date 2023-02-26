import { useNavigate } from "react-router-dom";

const Directory = ({ categories }) => {

  const navigate = useNavigate();
  const onRouteHandler = (route) => { navigate(route) }

  return (
    <div className='categories-container'>
      {
        categories.map(
          ({ title, id, imageUrl, route }) => (
            <div key={id} className="category-container"
              onClick={() => onRouteHandler(route)}
            >
              <div className='background-image'
                style={{
                  backgroundImage: `url(${imageUrl})`
                }} />
              <div className='category-body-container'>
                <div className='title-container'>
                  <h2>{title}</h2>
                  <span>Shop now</span>
                </div>
              </div>
            </div>
          ))
      }
    </div>
  )
}

export default Directory;