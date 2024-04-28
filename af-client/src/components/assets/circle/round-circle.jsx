import './round-circle.styles.scss';

const RoundCircleCard = ({title}) => {
  return (
    <div className="mt-5 round-circle-card">
        <br/>
        <div className='card-body'>
            <p className='v-center'>
                <b>{title}</b>
            </p>
        </div>
    </div>
  );
};

export default RoundCircleCard;