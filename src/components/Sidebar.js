import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import PendingIcon from '@mui/icons-material/HourglassEmpty';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteIcon from '@mui/icons-material/OpenInBrowser';

const Sidebar = ({ setStatusFilter }) => {
  const { username,setUsername } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUsername('');
    navigate('/');
  };

  return (
    <div className="w-64 bg-blue-800 h-screen flex flex-col justify-between p-4 shadow-lg">
      <div>
        <div className="mb-4 text-center">
          <div className="flex items-center bg-black justify-center mb-2 w-full border border-black p-2">
            <img src="/logo-sm.svg" alt="Logo" className="h-8 w-8 mr-2" />
            <h3 className="text-xl text-yellow-100 font-bold">Kapture Cx</h3>
          </div>
          <h4 className="text-xl text-yellow-100 font-bold">Welcome, {username}</h4>
        </div>
        <List component="nav">
          <ListItem button onClick={() => setStatusFilter('All')} className="hover:bg-gray-500 rounded-lg">
            <ListItemIcon>
              <InboxIcon className="text-yellow-100" />
            </ListItemIcon>
            <ListItemText primary="All" className="text-yellow-100" />
          </ListItem>
          <ListItem button onClick={() => setStatusFilter('open')} className="hover:bg-gray-500 rounded-lg">
            <ListItemIcon>
              <DeleteIcon className="text-yellow-100" />
            </ListItemIcon>
            <ListItemText primary="Open" className="text-yellow-100" />
          </ListItem>
          <ListItem button onClick={() => setStatusFilter('in-progress')} className="hover:bg-gray-500 rounded-lg">
            <ListItemIcon>
              <PendingIcon className="text-yellow-100" />
            </ListItemIcon>
            <ListItemText primary="Pending" className="text-yellow-100" />
          </ListItem>
          <ListItem button onClick={() => setStatusFilter('close')} className="hover:bg-gray-500 rounded-lg">
            <ListItemIcon>
              <DoneAllIcon className="text-yellow-100" />
            </ListItemIcon>
            <ListItemText primary="Completed" className="text-yellow-100" />
          </ListItem>
        </List>
        <Divider className="my-4 bg-gray-500" />
        <List component="nav">
          <ListItem button onClick={() => setStatusFilter('All')} className="hover:bg-gray-500 rounded-lg">
            <ListItemIcon>
              <DraftsIcon className="text-yellow-100" />
            </ListItemIcon>
            <ListItemText primary="Assigned to me" className="text-yellow-100" />
          </ListItem>
          <ListItem button onClick={() => setStatusFilter('open')} className="hover:bg-gray-500 rounded-lg">
            <ListItemIcon>
              <DraftsIcon className="text-yellow-100" />
            </ListItemIcon>
            <ListItemText primary="Created by me" className="text-yellow-100" />
          </ListItem>
          <ListItem button onClick={() => setStatusFilter('close')} className="hover:bg-gray-500 rounded-lg">
            <ListItemIcon>
              <DraftsIcon className="text-yellow-100" />
            </ListItemIcon>
            <ListItemText primary="Completed by me" className="text-yellow-100" />
          </ListItem>
        </List>
      </div>
      <div>
        <button
          onClick={handleLogout}
          sx={{backgroundColor:'black'}}
          className="block w-full rounded text-gray-800 text-left px-4 py-2 bg-yellow-100 hover:bg-gray-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
