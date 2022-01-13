import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {getDefaultNormalizer, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
  // the header h1 element exists. Include three asserts,
  //  if the header is in the document, 
  //  if the header is truthy, 
  //  if the header has the correct test content.

  // use arrange act assert method!!!
  render(<ContactForm/>);
  const header = screen.queryByText(/Contact Form/i);
  //console.log(header);
  expect(header).toBeInTheDocument();
  expect(header).toBeTruthy();
  expect(header).toHaveTextContent(/Contact Form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
  render(<ContactForm/>);

  const firstName = screen.getByLabelText(/First Name*/i);
  userEvent.type(firstName, 'abc');

  const errorMessages = await screen.findAllByTestId('error')
  expect(errorMessages).toHaveLength(1);   //// why toHaveLength(1)  ??? 
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  render(<ContactForm/>);

  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);

  await waitFor(()=>{
    const errorMessages = screen.queryAllByTestId('error');
    //console.log(errorMessages);
    expect(errorMessages).toHaveLength(3);
  })


});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  render(<ContactForm/>);

  const firstName = screen.getByLabelText(/First Name*/i);
  userEvent.type(firstName, 'Timmeeehhhh');

  const lastName = screen.getByLabelText(/Last Name*/i);
  userEvent.type(lastName, 'Goloshchapov');

  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);

  const errorMessages = await screen.getAllByTestId('error');
  expect(errorMessages).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm/>);

  const email = screen.getByLabelText(/email*/i);
  userEvent.type(email, 'timmygmail.com');

  const errorMessage = await screen.findByText(/email must be a valid email address/i);
  expect(errorMessage).toBeInTheDocument();


});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm/>);

  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);

  const errorMessage = await screen.findByText(/lastName is a required field/i)
  expect(errorMessage).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
  render(<ContactForm/>);

  const firstName = screen.getByLabelText(/First Name*/i);
  userEvent.type(firstName, 'Timmeeehhhh');

  const lastName = screen.getByLabelText(/Last Name*/i);
  userEvent.type(lastName, 'Goloshchapov');

  const email = screen.getByLabelText(/email*/i);
  userEvent.type(email, 'timmy@gmail.com');

  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);

  await waitFor(()=>{
    const firstNameDisplay = screen.queryByText('Timmeeehhhh');
    const lastNameDisplay = screen.queryByText('Goloshchapov');
    const emailDisplay = screen.queryByText('timmy@gmail.com');
    const messageDisplay = screen.queryByTestId('messageDisplay');

    expect(firstNameDisplay).toBeInTheDocument();
    expect(lastNameDisplay).toBeInTheDocument();
    expect(emailDisplay).toBeInTheDocument();
    expect(messageDisplay).not.toBeInTheDocument();

  })
});

test('renders all fields text when all fields are submitted.', async () => {
  render(<ContactForm/>);

  const firstName = screen.getByLabelText(/First Name*/i);
  userEvent.type(firstName, 'Timmeeehhhh');

  const lastName = screen.getByLabelText(/Last Name*/i);
  userEvent.type(lastName, 'Goloshchapov');

  const email = screen.getByLabelText(/email*/i);
  userEvent.type(email, 'timmy@gmail.com');

  const message = screen.getByLabelText(/message/i);
  userEvent.type(message, 'jdhajshdjsahjdhasjdhk');

  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);

  await waitFor(()=>{
    const firstNameDisplay = screen.queryByText('Timmeeehhhh');
    const lastNameDisplay = screen.queryByText('Goloshchapov');
    const emailDisplay = screen.queryByText('timmy@gmail.com');
    const messageDisplay = screen.queryByText('jdhajshdjsahjdhasjdhk');

    expect(firstNameDisplay).toBeInTheDocument();
    expect(lastNameDisplay).toBeInTheDocument();
    expect(emailDisplay).toBeInTheDocument();
    expect(messageDisplay).toBeInTheDocument();

  })

});