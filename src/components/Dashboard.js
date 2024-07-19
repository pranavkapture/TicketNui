import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './Sidebar';
import TicketList from './TicketList';
import CreateTicketForm from './CreateTicketForm';
import TicketDetail from './TicketDetail';
import { Dialog, IconButton, Drawer, Button } from '@mui/material';
import { Menu as MenuIcon, Add as AddIcon } from '@mui/icons-material';
import { deleteTicket } from '../actions/ticketActions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const tickets = useSelector(state => state.ticket.tickets);

  const [filter, setFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleCreateTicketClick = () => {
    setShowForm(true);
    setEditMode(false);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditMode(false);
  };

  const handleTicketSelect = (ticket) => {
    setSelectedTicket(ticket);
    setShowDetail(true);
    setEditMode(false);
  };

  const handleEditTicket = (ticket) => {
    setSelectedTicket(ticket);
    setEditMode(true);
    setShowForm(true);
    setShowDetail(false);
  };

  const handleCloseDetail = () => {
    setSelectedTicket(null);
    setShowDetail(false);
  };

  return (
    <div className="h-screen bg-black">
      <div className="relative bg-gray-200 overflow-hidden">
        {/* Fixed background overlay */}
        <div className="fixed top-0 left-0 w-full bg-gray-200 opacity-50 z-[-1]"></div>

        {/* Navbar for mobile */}
        <div className="lg:hidden flex justify-between items-center p-4 bg-white shadow-md">
          <IconButton onClick={() => setIsDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
          <h1 className="text-2xl font-bold">Ticketing App</h1>
        </div>

        {/* Drawer for sidebar on mobile */}
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <Sidebar setStatusFilter={setFilter} />
        </Drawer>

        {/* Main content */}
        <div className="flex">
          {/* Sidebar for desktop */}
          <div className="hidden h-full lg:block">
            <Sidebar setStatusFilter={setFilter} />
          </div>

          {/* Main content area */}
          <div className={`flex-grow px-4 overflow-hidden ml-10 ${selectedTicket ? 'lg:pl-4' : ''}`}>
            <div className="flex justify-between items-center mt-3">
              <h1 className="hidden lg:block text-3xl font-bold">Ticketing App</h1>
              <Button
                variant="contained"
                sx={{ backgroundColor: 'black' }}
                startIcon={<AddIcon />}
                onClick={handleCreateTicketClick}
              >
                Create Ticket
              </Button>
            </div>
            <TicketList
              tickets={tickets}
              filter={filter}
              onTicketSelect={handleTicketSelect}
              deleteTicket={(ticketId) => dispatch(deleteTicket(ticketId))}
            />
          </div>
        </div>

        {/* Dialog for Create/Edit Form */}
        <Dialog open={showForm} onClose={handleFormClose} maxWidth="sm" fullWidth>
          <CreateTicketForm
            onClose={handleFormClose}
            initialValues={editMode ? selectedTicket : null}
          />
        </Dialog>

        {/* Dialog for Ticket Detail */}
        <Dialog open={showDetail} onClose={handleCloseDetail} maxWidth="md" fullWidth>
          {selectedTicket && (
            <TicketDetail
              ticket={selectedTicket}
              onEdit={handleEditTicket}
              onClose={handleCloseDetail}
            />
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default Dashboard;
