import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './assets/css/user.css';

const Users = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');

  useEffect(() => {
    if (loggedInUserEmail) {
      axios.get(`http://localhost:3001/user-bookings/${loggedInUserEmail}`)
        .then(response => {
          setBookings(response.data);
        })
        .catch(error => {
          console.error('Error fetching bookings:', error);
        });
    }
  }, [loggedInUserEmail]);

  const handleCancel = (bookingId) => {
    axios.delete(`http://localhost:3001/admin/${bookingId}`)
      .then(response => {
        setBookings(bookings.filter(booking => booking._id !== bookingId));
      })
      .catch(error => {
        console.error('Error cancelling booking:', error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUserEmail');
    navigate('/login');
  };

  return (
    <div className="fullScreenContainerUser">
      <div className="containerUser">
        <div className="hallUser">Your Bookings</div>
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Link to="/login" className="loUser button" onClick={handleLogout}>Logout</Link>
          <Link to="/service" className="button">Book Service</Link>
        </div>
        <table className="neumorphicUser">
          <thead className="theadDarkUser">
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Vehicle Number</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking._id}>
                <td>{booking.name}</td>
                <td>{booking.address}</td>
                <td>{booking.phone}</td>
                <td>{booking.vehicleNumber}</td>
                <td>{booking.service}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>
                  <button className="cancel-button" onClick={() => handleCancel(booking._id)}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
