import './flightDetails.css'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import madina from '../../assests/madina.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faBottleWater, faCar,faCheckCircle, faClock, faContactBook, faHotel, faKaaba, faPassport, faPlane, faSpoon } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';


const FlightDetails = () => {
 
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
   

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/groups');
        setGroups(response.data);
        console.log(JSON.stringify(response.data,null,2));
      } catch (err) {
        console.error('Error fetching groups:', err);
        setError('Failed to load groups.');
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
 

  return (
    <div className='flight-details-container'>
  {groups.map((group) => ( 
    <div key={group.id} className='flight-details-section'> {/* Add key here */}
      <div className='flight-images'>
        <img src={group.image_url} alt="Madina" />
      </div>
      <div className='plan-name'>
        <h1>{group.group_name}</h1>
        <div className='umarh-guide'>
          <span className='ziarah'>
            <FontAwesomeIcon icon={faKaaba} size="2x" style={{ color: 'purple', fontSize: '16px', marginRight:'5px' }} />
            Ziarah and Umrah Guide Includes
          </span>
          <span className='inclusive'>
            <FontAwesomeIcon icon={faCheckCircle} size="2x" style={{ color: 'green', fontSize: '16px', marginRight: '5px' }} />
            Inclusive Of All Packages
          </span>
        </div>
        <div className='umarh-nights'>
          <p>Makkah 7 Nights</p>
          <p>Madina 6 Nights</p>
        </div>
        <div className='umrah-includes'>
          <span><FontAwesomeIcon icon={faPlane} size="2x" style={{ color: 'purple', fontSize: '16px', marginRight:'5px' }} />&nbsp; Air Ticket </span>
          <span><FontAwesomeIcon icon={faPassport} size="2x" style={{ color: 'purple', fontSize: '16px', marginRight:'5px' }} />&nbsp;Umrah Visa</span>
          <span><FontAwesomeIcon icon={faHotel} size="2x" style={{ color: 'purple', fontSize: '16px', marginRight:'5px' }} />&nbsp; Hotels</span>
          <span><FontAwesomeIcon icon={faSpoon} size="2x" style={{ color: 'purple', fontSize: '16px', marginRight:'5px' }} />&nbsp;All Meals</span>
          <span><FontAwesomeIcon icon={faCar} size="2x" style={{ color: 'purple', fontSize: '16px', marginRight:'5px' }} />&nbsp;Transfer</span>
          <span><FontAwesomeIcon icon={faBottleWater} size="2x" style={{ color: 'purple', fontSize: '16px', marginRight:'5px' }} />Zamzam</span>
        </div>
      </div>
      
      <div className='plan-price'>
        <div>
          <select id="plan" className="plan-dropdown" style={{ padding: '5px', borderRadius: '5px' }}>
            <option value="basic">3 Star Hotel</option>
            <option value="standard">4 Star Hotel</option>
            <option value="premium">5 Star Hotel</option>
          </select>
        </div>
        <div className='plan-pricing'>
          <span className='starting'>Starting From</span>  
          <span className='rate'>INR {group.starting_price}</span>
          <span>Per Person</span>
        </div>
        
        <div className='plan-button'>
          <button>Avail Now</button>
        </div>
      </div>
    </div>
  ))}
</div>

  )
}

export default FlightDetails