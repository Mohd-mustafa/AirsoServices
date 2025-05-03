 import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBottleWater, faCar, faCheckCircle, faHotel, faKaaba, faPassport, faPlane, faSpoon, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './flightDetailsAdmin.css'
import {useNavigate} from "react-router-dom"
import GroupService from '../../services/groupService';

const FlightDetailsAdmin = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editGroup, setEditGroup] = useState(null);
    const [updatedData, setUpdatedData] = useState({ group_name: '', starting_price: '' });
    const navigate=useNavigate();


    useEffect(() => {
      const fetchGroups = async () => {
          try {
              const response = await GroupService.getAllGroups();  // Using service
              setGroups(response);
 
           } catch (err) {
              console.error('Error fetching groups:', err);
              setError('Failed to load groups.');
          } finally {
              setLoading(false);
          }
      };
      fetchGroups();
  }, []);

  const handleDelete = async (id) => {
      try {
          await GroupService.deleteGroup(id);  // Using service
          setGroups(groups.filter(group => group.id !== id));
      } catch (error) {
          console.error('Error deleting group:', error);
      }
  };

  const handleEditClick = (group) => {
      setEditGroup(group);
      setUpdatedData({ 
          group_name: group.group_name, 
          starting_price: group.starting_price, 
          makkah_nights: group.makkah_nights, 
          madina_nights: group.madina_nights 
      });
  };

  const handleUpdate = async () => {
      try {
          await GroupService.updateGroup(editGroup.id, updatedData);  // Using service
          setGroups(groups.map(group => (group.id === editGroup.id ? { ...group, ...updatedData } : group)));
          setEditGroup(null);
      } catch (error) {
          console.error('Error updating group:', error);
      }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleAddGroup = () => {
      navigate("/addGroups");
  };

    return ( 
    
      <div className="flight-details-admin-container">
    {Array.isArray(groups) && groups.length > 0 ? (
    groups.map((group) => (
      <div key={group.id} className="flight-details-admin-section">
        <div className="flight-details-images">
          <img src={group.image_url} alt={group.group_name} />
        </div>

        <div className="plan-name-detail">
          <h1>{group.group_name}</h1>

          <div className="umarh-guide-admin">
            <span className="ziarah-admin">
              <FontAwesomeIcon icon={faKaaba} size="2x" className="icon-kaba" />
              Ziarah and Umrah Guide Includes
            </span>
            <span className="inclusive-admin">
              <FontAwesomeIcon icon={faCheckCircle} size="2x" className="icon-right" />
              Inclusive Of All Packages
            </span>
          </div>

          <div className="umarh-nights-admin">
            <p>Makkah {group.makkah_nights} Nights</p>
            <p>Madina {group.madina_nights} Nights</p>
          </div>

          <div className="umrah-includes-admin">
            <span>
              <FontAwesomeIcon icon={faPlane} /> Air Ticket
            </span>
            <span>
              <FontAwesomeIcon icon={faPassport} /> Umrah Visa
            </span>
            <span>
              <FontAwesomeIcon icon={faHotel} /> Hotels
            </span>
            <span>
              <FontAwesomeIcon icon={faSpoon} /> All Meals
            </span>
            <span>
              <FontAwesomeIcon icon={faCar} /> Transfer
            </span>
            <span>
              <FontAwesomeIcon icon={faBottleWater} /> Zamzam
            </span>
          </div>
        </div>

        <div className="plan-price-admin">
          <div className="plan-drop-admin">
            <select className="plan-dropdown-admin">
              <option value="basic">3 Star Hotel</option>
              <option value="standard">4 Star Hotel</option>
              <option value="premium">5 Star Hotel</option>
            </select>
          </div>
          <div className="price-starting-admin">
            <span className="starting">Starting From</span>
            <span className="rate">INR {group.starting_price}</span>
            <span className="per-person">Per Person</span>
          </div>
          
        </div>
        <div className="buttons-section">
            <button className="edit-button" onClick={() => handleEditClick(group)}>
              <FontAwesomeIcon icon={faEdit} /> Edit
            </button>
            <button className="delete-button" onClick={() => handleDelete(group.id)}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
          </div>
      </div>
    ))
  ) : (
    <div className="no-groups-message">
      <h2>No Groups Available</h2>
      <p>Please add a new group to manage flight details.</p>
      <button className="add-group-button" onClick={handleAddGroup}>
        + Add Group
      </button>
    </div>
  )}

  {editGroup && (
    <div className="edit-form-overlay">
      <div className="edit-form">
        <h2>Edit Group</h2>

        <label>Group Name:</label>
        <input
          type="text"
          value={updatedData.group_name}
          onChange={(e) => setUpdatedData({ ...updatedData, group_name: e.target.value })}
        />

        <label>Starting Price:</label>
        <input
          type="number"
          value={updatedData.starting_price}
          onChange={(e) => setUpdatedData({ ...updatedData, starting_price: e.target.value })}
        />

        <label>Makkah Nights:</label>
        <input
          type="number"
          value={updatedData.makkah_nights}
          onChange={(e) => setUpdatedData({ ...updatedData, makkah_nights: e.target.value })}
        />

        <label>Madina Nights:</label>
        <input
          type="number"
          value={updatedData.madina_nights}
          onChange={(e) => setUpdatedData({ ...updatedData, madina_nights: e.target.value })}
        />

        <div className="form-buttons">
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditGroup(null)}>Cancel</button>
        </div>
      </div>
    </div>
  )}
</div>

      
       )
}

export default FlightDetailsAdmin;