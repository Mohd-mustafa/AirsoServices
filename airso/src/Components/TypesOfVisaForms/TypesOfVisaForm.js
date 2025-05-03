import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import visaTypeService from '../../services/visaTypeService';
import Swal from 'sweetalert2';
import visaService from '../../services/visaServiceFile';

const VisaTypeForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    processing_time: '',
    stay_period: '',
    validity: '',
    visa_category: '',
    entry: '',
    fees: '',
    visa_id: id, // directly set from URL param
  });

  const [visaTitle, setVisaTitle] = useState('');

  // Fetch visa details when component mounts (if id is provided)
  useEffect(() => {
    if (id) {
      const fetchVisaById = async () => {
        try {
          const data = await visaService.getVisaById(id);
          setVisaTitle(data.title);
          console.log('Fetched visa:', data);
        } catch (error) {
          console.error('Failed to fetch visa:', error);
          Swal.fire({
            icon: 'error',
            title: 'Visa Not Found',
            text: 'The selected visa could not be found.',
          });
        }
      };
      fetchVisaById();
    }
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await visaTypeService.createVisaType(formData);

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Type of Visa Created!',
          text: 'The visa type has been added successfully.',
          confirmButtonText: 'OK',
        });
      
        setFormData({
          processing_time: '',
          stay_period: '',
          validity: '',
          visa_category: '',
          entry: '',
          fees: '',
          visa_id: id,
        });
      }
        } catch (error) {
      console.error('Error creating visa type:', error);

      Swal.fire({
        icon: 'error',
        title: 'Creation Failed!',
        text: 'Unable to create visa type. Please check the visa exists and try again.',
        confirmButtonText: 'OK',
      });
    }

  };
  return (
    <div className="visa-form-container">
      <h2>Create Type of Visa</h2>
      {visaTitle && <h3>For Visa: {visaTitle}</h3>}

      <form onSubmit={handleSubmit}>
        {['processing_time', 'stay_period', 'validity', 'visa_category', 'entry', 'fees'].map((field) => (
          <div key={field} className="form-group">
            <label>{field.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default VisaTypeForm;
