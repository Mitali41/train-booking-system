import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

let apiUrl = process.env.BASE_API_URL;

const MyBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const userId = 1; 
 

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchBookings = async () => {

      const response = await axios.get(`${apiUrl}/bookings`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      setBookings(response.data);
    };

    fetchBookings();
  }, [userId]);

  const handleCancelBooking = async (bookingId: number) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(`${apiUrl}/bookings/remove`, {
        bookingId
      }, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Bookings
      </Typography>
      <Grid container spacing={2}>
        {bookings.length > 0  && bookings.map((booking) => (
          <Grid item xs={12} md={6} key={booking.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  Train ID: {booking.trainId}
                </Typography>
                <Typography variant="body1">
                  Seats: {JSON.parse(booking.seatNumbers).join(", ")}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Status: {booking.status}
                </Typography>
                <IconButton
                  aria-label="cancel booking"
                  color="error"
                  onClick={() => handleCancelBooking(booking.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyBookings;
