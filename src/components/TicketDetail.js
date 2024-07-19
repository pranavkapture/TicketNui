import React from 'react';

const TicketDetail = ({ ticket }) => {
  if (!ticket) {
    return <div className="text-center text-gray-500">Select a ticket to view details</div>;
  }

  const { name, email, priority, mode, status, description } = ticket;

  return (
    <div className="flex flex-col p-6 bg-white rounded-lg shadow-md w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Ticket Details</h2>
      
      <div className="mb-4">
        <span className="font-semibold text-gray-700">Name:</span>
        <span className="ml-2 text-gray-900">{name}</span>
      </div>
      
      <div className="mb-4">
        <span className="font-semibold text-gray-700">Email:</span>
        <span className="ml-2 text-gray-900">{email}</span>
      </div>
      
      <div className="mb-4">
        <span className="font-semibold text-gray-700">Priority:</span>
        <span className={`ml-2 px-2 py-1 rounded ${priority === 'High' ? 'bg-red-500 text-white' : priority === 'Medium' ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'}`}>
          {priority}
        </span>
      </div>
      
      <div className="mb-4">
        <span className="font-semibold text-gray-700">Mode:</span>
        <span className="ml-2 text-gray-900">{mode}</span>
      </div>
      
      <div className="mb-4">
        <span className="font-semibold text-gray-700">Status:</span>
        <span className="ml-2 text-gray-900">{status}</span>
      </div>
      
      <div>
        <span className="font-semibold text-gray-700">Description:</span>
        <p className="mt-2 text-gray-900">{description}</p>
      </div>
    </div>
  );
};

export default TicketDetail;
