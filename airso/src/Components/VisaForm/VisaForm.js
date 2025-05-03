import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import visaService from "../../services/visaServiceFile.js";
import './VisaForm.css';
import Swal from 'sweetalert2';

const initialFormState = {
  visa_name: "",
  country: "",
  price: "",
  processing_time: "",
  approval_rate: "",
  title: ""
};

const VisaForm = ({ editingVisa }) => {
  const [formData, setFormData] = useState(initialFormState);
  const navigate = useNavigate();

  useEffect(() => {
    if (editingVisa) {
      setFormData(editingVisa);
    } else {
      setFormData(initialFormState);
    }
  }, [editingVisa]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Map camelCase to backend snake_case
      const submissionData = {
        visa_name: formData.title,   // using title as visa_name
        country: formData.country,
        price: formData.price,
        processing_time: formData.processing_time,
        approval_rate: formData.approval_rate,
        title: formData.title
      };

      if (editingVisa) {
        await visaService.updateVisa(editingVisa.id, submissionData);
        Swal.fire({
          title: 'Visa Updated',
          text: 'Visa details were successfully updated in the database.',
          icon: 'success',
          confirmButtonText: 'OK',
        }) 
      } else {
        const result = await visaService.createVisa(submissionData);
        Swal.fire({
          title: 'Visa Added',
          text: 'New visa details have been successfully added to MySQL!',
          icon: 'success',
          confirmButtonText: 'Great!',
        }).then(() => {
          navigate(`/addVisaTypes/${result.id}`);
        });
      }

      setFormData(initialFormState);

    } catch (error) {
      console.error("Failed to submit visa:", error);
      Swal.fire({
        title: 'Submission Failed',
        text: error.message || 'Something went wrong while submitting visa data.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  return (
    <div className="visa-form-container">
      <h1>Enter Visa Details</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <h2>{editingVisa ? "Edit Visa" : "Add Visa"}</h2>
        <div>
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
            disabled={!!editingVisa}
          />
        </div>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Visa Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <div>
          <input
            type="text"
            name="processing_time"
            placeholder="Processing Time"
            value={formData.processing_time}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="number"
            name="approval_rate"
            placeholder="Approval Rate (%)"
            value={formData.approval_rate}
            onChange={handleChange}
            required
            min="0"
            max="100"
          />
        </div>
        <button type="submit">
          {editingVisa ? "Update Visa" : "Create Visa"}
        </button>
      </form>
    </div>
  );
};

export default VisaForm;
