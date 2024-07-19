import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { addTicket } from '../actions/ticketActions';
import * as Yup from 'yup';

const CreateTicketForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    priority: Yup.string().required('Priority is required'),
    mode: Yup.string().required('Mode is required'),
    status: Yup.string().required('Status is required'),
    description: Yup.string().required('Description is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      priority: '',
      mode: '',
      status: '',
      description: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(addTicket(values));
      resetForm();
    },
  });

  return (
    <div className="flex flex-col w-full p-4">
      <h2 className="text-xl font-bold mb-4">Create Ticket</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <TextField
          label="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          variant="outlined"
          fullWidth
        />
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Priority</InputLabel>
          <Select
            label="Priority"
            name="priority"
            value={formik.values.priority}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.priority && Boolean(formik.errors.priority)}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Mode</InputLabel>
          <Select
            label="Mode"
            name="mode"
            value={formik.values.mode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.mode && Boolean(formik.errors.mode)}
          >
            <MenuItem value="whatsapp">WhatsApp</MenuItem>
            <MenuItem value="sms">SMS</MenuItem>
            <MenuItem value="mail">Mail</MenuItem>
            <MenuItem value="gmail">Gmail</MenuItem>
            <MenuItem value="facebook">Facebook</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.status && Boolean(formik.errors.status)}
          >
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="in progress">In Progress</MenuItem>
            <MenuItem value="closed">Closed</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
          variant="outlined"
          fullWidth
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateTicketForm;
