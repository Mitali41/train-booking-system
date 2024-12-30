import React, { useState, useEffect } from "react";
import SeatMap from "../../components/SeatMap";
import { Box, Button, Typography, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";

let apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL || "https://train-booking-system-s4hc.onrender.com";

const TrainSeats = () => {
  const [bookedSeats, setBookedSeats] = useState<number[]>([]);
  const router = useRouter(); 
  const [numberOfSeats, setNumberOfSeats] = useState<number>(1);
  const trainId = router.query.trainId;

  useEffect(() => {
    const fetchBookedSeats = async () => {
      const response = await axios.get(apiUrl + `/train/seats/${trainId}`);
      setBookedSeats(response.data.map((seat: { number: number }) => seat.number));
    };

    fetchBookedSeats();
  }, [trainId]);

  const handleReserveSeats = async () => {
    const token = localStorage.getItem("token");
    try {
    const response = await axios.post(apiUrl + `/train/seats/reserve`, {
       trainId:trainId , numberOfSeats 
    }, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
   
      setBookedSeats((prev) => [
        ...prev,
        ...response.data.map((seat: { number: number }) => seat.number),
      ]);
    }catch(error){
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 4,
        p: 4,
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <SeatMap totalSeats={80} bookedSeats={bookedSeats} />

      <Box sx={{ width: "300px" }}>
        <Typography variant="h5" gutterBottom>
          Reserve Seats
        </Typography>
        <TextField
          label="Number of Seats"
          type="number"
          inputProps={{ min: 1, max: 7 }}
          value={numberOfSeats}
          onChange={(e) => setNumberOfSeats(Number(e.target.value))}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained" 
          color="primary"
          onClick={handleReserveSeats}
          fullWidth
        >
          Reserve
        </Button>
      </Box>
    </Box>
  );
};

export default TrainSeats;
