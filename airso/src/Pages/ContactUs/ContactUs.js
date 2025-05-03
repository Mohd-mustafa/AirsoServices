import React, { useEffect, useState } from 'react'
import './ContactUs.css'
 import axios from '../../utils/axiosInstance.js'
import { useAuth } from '../../AuthContextFiles/AuthContext.js'

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        message: '',
        reason: 'Inquiry',
    })

    const [responseMessage, setResponseMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const {user,isAuthenticated}=useAuth();
     
 
    useEffect(() =>{
        if(isAuthenticated && user){
            setFormData((prevData)=> ({
                ...prevData,
                name:user.name || '',
                email:user.email || ''
            }));
            console.log(isAuthenticated)
        }
    }, [user, isAuthenticated])

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "phoneNumber") {
            // Allow only numeric input and limit to 10 digits
            if (value === '' || /^\d{0,10}$/.test(value)) {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/contacts', formData);
            console.log(response);
            setResponseMessage(response.data.message);
            setErrorMessage('');
            setFormData({ name: '', email: '', phoneNumber: '', message: '' });
        } catch (error) {
            setErrorMessage(error.response?.data?.error || "An error occurred");
            setResponseMessage('');
        }
    }

    return (
        <div className='contact-us-container'>
        <div className='contact-form-container'>
        <h2>Contact Us</h2>
        {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        
        <form onSubmit={handleSubmit} className='contact-form'>
    
            {/* Row 1: Name & Email */}
            <div className='form-row'>
                <div className='form-group'>
                    <label htmlFor='name'>Enter Your Name:</label>
                    <input
                        type='text'
                        placeholder='Enter Your Name'
                        name='name'
                        id='name'
                        value={formData.name}
                        onChange={handleChange}
                         readOnly={isAuthenticated} 
                         className={isAuthenticated ? 'read-only' : ''} // Apply blur class when authenticated

                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Enter Your Email</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='Enter Your Email'
                        readOnly={isAuthenticated} // Make it read-only if user is logged in
                        className={isAuthenticated ? 'read-only' : ''} // Apply blur class when authenticated

                        />
                </div>
            </div>
    
            {/* Row 2: Phone Number & Reason */}
            <div className='form-row'>
                <div className='form-group'>
                    <label htmlFor='phoneNumber'>Enter Your Phone Number</label>
                    <input
                        type='text'
                        id='phoneNumber'
                        name='phoneNumber'
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder='Enter Your Phone Number'
                        required
                        maxLength="10"
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='reason'>Reason For Contact</label>
                    <select
                        id='reason'
                        name='reason'
                        value={formData.reason}
                        onChange={handleChange}
                        required
                    >
                        <option value="inquiry">Inquiry</option>
                        <option value="Support">Support</option>
                        <option value="feedback">Feedback</option>
                    </select>
                </div>
            </div>
    
            {/* Row 3: Message (Full Width) */}
            <div className='form-group'>
                <label htmlFor='message'>Enter Your Message</label>
                <textarea
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    placeholder='Enter Your Message'
                    required
                ></textarea>
            </div>
    
            <button type='submit' className='submit-btn'>Submit</button>
        </form>
    </div>
    </div>
    );
}

export default ContactUs;
