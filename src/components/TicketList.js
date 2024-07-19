import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTickets, deleteTicket } from '../actions/ticketActions';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Checkbox } from '@mui/material';
import { Search as SearchIcon, Flag as FlagIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { WhatsApp as WhatsAppIcon, Sms as SmsIcon, Mail as MailIcon, Facebook as FacebookIcon } from '@mui/icons-material';

const TicketList = ({ filter, onTicketSelect }) => {
  const dispatch = useDispatch();
  const tickets = useSelector(state => state.ticket.tickets);
  const loading = useSelector(state => state.ticket.loading);
  const error = useSelector(state => state.ticket.error);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTickets, setSelectedTickets] = useState([]);
  const ticketsPerPage = 7;

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredTickets.length / ticketsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDelete = (ticketId) => {
    dispatch(deleteTicket(ticketId));
  };

  const handleSelectTicket = (ticketId) => {
    setSelectedTickets((prevSelected) =>
      prevSelected.includes(ticketId)
        ? prevSelected.filter((id) => id !== ticketId)
        : [...prevSelected, ticketId]
    );
  };

  const iconMapping = {
    whatsapp: <WhatsAppIcon />,
    sms: <SmsIcon />,
    mail: <MailIcon />,
    gmail: <MailIcon />,
    facebook: <FacebookIcon />
  };

  const offset = (currentPage - 1) * ticketsPerPage;

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.name.toLowerCase().includes(searchQuery.toLowerCase())
      || ticket.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filter === 'All' || ticket.status === filter;
    return matchesSearch && matchesStatus;
  });

  const currentTickets = filteredTickets.slice(offset, offset + ticketsPerPage);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col w-full p-4 overflow-hidden">
      <div className="flex justify-between mb-4">
        <TextField
          type="text"
          placeholder="Search by Name or Email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            endAdornment: <SearchIcon className="text-gray-500" />,
          }}
        />
      </div>
      <TableContainer component={Paper} className='relative'>
        <Table className='relative' style={{ tableLayout: 'fixed', height: '300px' }}>
          <TableHead>
            <TableRow className="bg-gray-50">
              <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <Checkbox
                  indeterminate={selectedTickets.length > 0 && selectedTickets.length < currentTickets.length}
                  checked={currentTickets.length > 0 && selectedTickets.length === currentTickets.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTickets(currentTickets.map(ticket => ticket.email));
                    } else {
                      setSelectedTickets([]);
                    }
                  }}
                />
              </TableCell>
              <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-widre">Name</TableCell>
              <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</TableCell>
              <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</TableCell>
              <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mode</TableCell>
              <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableCell>
              <TableCell className="px-6 py-3 text-left text-xs overflow-hidden text-overflow-ellipsis font-medium text-gray-500 uppercase ">Description</TableCell>
              <TableCell className="px-6 py-3"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="bg-white divide-y divide-gray-200">
            {currentTickets.map((ticket) => (
              <TableRow
                key={ticket.email}
                hover
                onClick={() => onTicketSelect(ticket)}
                className="cursor-pointer"
              >
                <TableCell style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} className="px-6 py-4 whitespace-nowrap">
                  <Checkbox
                    checked={selectedTickets.includes(ticket.email)}
                    onChange={() => handleSelectTicket(ticket.email)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </TableCell>
                <TableCell style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} width='20%' className="px-6 py-4 whitespace-nowrap">{ticket.name}</TableCell>
                <TableCell style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} width='20%' className="px-6 py-4 whitespace-nowrap">{ticket.email}</TableCell>
                <TableCell style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} width='10%' className="px-6 py-4 whitespace-nowrap">
                  {ticket.priority === 'low' && <FlagIcon className="text-blue-500" />}
                  {ticket.priority === 'medium' && <FlagIcon className="text-yellow-500" />}
                  {ticket.priority === 'high' && <FlagIcon className="text-red-500" />}
                </TableCell>
                <TableCell style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} width='10%' className="px-6 py-4 whitespace-nowrap text-center">
                  {iconMapping[ticket.mode.toLowerCase()] && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      color="primary"
                    >
                      {iconMapping[ticket.mode.toLowerCase()]}
                    </Button>
                  )}
                </TableCell>
                <TableCell style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} width='10%' className="px-6 py-4 whitespace-nowrap">{ticket.status}</TableCell>
                <TableCell style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} width='20%' className="px-6 py-4 whitespace-nowrap overflow-hidden text-overflow-ellipsis">{ticket.description}</TableCell>
                <TableCell style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} width='10%' className="px-6 py-4 whitespace-nowrap text-right">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(ticket.email);
                    }}
                    color="secondary"
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex justify-between items-center mt-10">
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          variant="contained"
          sx={{ backgroundColor: 'black' }}
          className={`px-3 py-1 ${currentPage === 1 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-gray-600 hover:bg-gray-700 text-white'}`}
        >
          Previous
        </Button>
        <span className="px-3 py-1">
          Page {currentPage} of {Math.ceil(filteredTickets.length / ticketsPerPage)}
        </span>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(filteredTickets.length / ticketsPerPage)}
          variant="contained"
          sx={{ backgroundColor: 'black' }}
          className={`px-3 py-1 ${currentPage === Math.ceil(filteredTickets.length / ticketsPerPage) ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-gray-600 hover:bg-gray-700 text-white'}`}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TicketList;
