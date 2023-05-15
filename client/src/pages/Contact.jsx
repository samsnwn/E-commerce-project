import React, { useState } from 'react';
import axios from 'axios';
import baseUrl from '../config/config';

const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/contact`, formState);
      setResponseMessage('Thank you for your message!');
      setFormState({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setResponseMessage('Sorry, an error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col items-center h-[70vh] justify-center">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg mt-20">
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label 
              htmlFor="name" 
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Your Name*
            </label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formState.name} 
              onChange={handleInputChange}
              required
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label 
              htmlFor="email" 
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Your Email*
            </label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formState.email} 
              onChange={handleInputChange}
              required
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>
        <div className="mb-4">
          <label 
            htmlFor="message" 
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Your Message*
          </label>
          <textarea 
            id="message" 
            name="message" 
            value={formState.message} 
            onChange={handleInputChange}
            required
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
          <p className="text-gray-600 text-xs mt-1 ml-2">* Required fields</p>
        </div>
      </form>
      {responseMessage && (
        <p 
          className={`text-center mt-4 py-2 ${
            responseMessage.startsWith('Thank you') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {responseMessage}
        </p>
      )}
    </div>
  );
};

export default ContactForm;