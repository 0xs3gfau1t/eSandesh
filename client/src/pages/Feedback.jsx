import React, { useState } from 'react'

function Feedback() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Submitting feedback:', { name, email, message });
      setName('');
      setEmail('');
      setMessage('');
    };
  
    return (
      <div className="p-2">
        <h2 className="font-bold text-3xl">तपाईको प्रतिक्रिया</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="name" className="text-lg">
            नाम:
            </label>
            <input
              type="text"
              id="name"
              className="border block w-full  border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-lg">
             इमेल:
            </label>
            <input
              type="email"
              id="email"
              className="border block w-full border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="text-lg">
             प्रतिक्रिया:
            </label>
            <textarea
              id="message"
              className="border block w-full  border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-darkblue hover:bg-rose-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

export default Feedback