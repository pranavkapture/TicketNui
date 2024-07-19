import React from 'react';
import { useSelector } from 'react-redux';

const TicketDetail = ({ selectedTicket }) => {
  if (!selectedTicket) {
    return <div className="text-center">Select a ticket to view details</div>;
  }

  const { name, email, priority, mode, status, description } = selectedTicket;

  return (
    <div className="flex flex-col p-4 w-full">
      <h2 className="text-xl font-bold mb-4">Ticket Details</h2>
      <div className="mb-4">
        <span className="font-bold">Name:</span> {name}
      </div>
      <div className="mb-4">
        <span className="font-bold">Email:</span> {email}
      </div>
      <div className="mb-4">
        <span className="font-bold">Priority:</span> {priority}
      </div>
      <div className="mb-4">
        <span className="font-bold">Mode:</span> {mode}
      </div>
      <div className="mb-4">
        <span className="font-bold">Status:</span> {status}
      </div>
      <div>
        <span className="font-bold">Description:</span> {description}
      </div>
    </div>
  );
};

export default TicketDetail;
