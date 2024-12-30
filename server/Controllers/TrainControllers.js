const express = require('express');
const Seat = require('../Models/Seat');
const verifyToken = require('../Middlwares/jwtAuthMiddleware');
const Booking = require('../Models/Booking');

const router = express.Router();

router.get(`/seats/:trainId`, async (req, res) => {
    try {
      const { trainId } = req.params;
  
      const seats = await Seat.findAll({
        where: {
          trainId,
          isReserved: true
        }
      });
  
      res.json(seats);
    }catch(error){
      res.status(400).json({ error: error.message });
    }
  }); 

  router.post("/seats/reserve", verifyToken, async (req, res) => {
    const userId = req.userId;
    const { trainId , numberOfSeats } = req.body;
  
    if (numberOfSeats < 1 || numberOfSeats > 7) {
      return res.status(400).json({ message: "Invalid seat count. Maximum 7." });
    }
  
    try {
      const availableSeats = await Seat.findAll({
        where: { trainId: parseInt(trainId), isReserved: false },
        order: [["number", "ASC"]], 
      });
  
      if (availableSeats.length < numberOfSeats) {
        return res.status(400).json({ message: "Not enough seats available." });
      }
  
      let reservedSeats = [];
      let tempRow = [];
  
      for (let i = 0; i < availableSeats.length; i++) {
        const currentSeat = availableSeats[i];
        const rowIndex = Math.floor((currentSeat.number - 1) / 7);
  
        if (tempRow.length === 0 || rowIndex === Math.floor((tempRow[0].number - 1) / 7)) {
          tempRow.push(currentSeat);
          if (tempRow.length === numberOfSeats) {
            reservedSeats = tempRow;
            break;
          }
        } else {
          tempRow = [currentSeat];
        }
      }
  
      if (reservedSeats.length < numberOfSeats) {
        reservedSeats = availableSeats.slice(0, numberOfSeats);
      }
  
      await Promise.all(
        reservedSeats.map((seat) =>
          seat.update({ isReserved: true })
        )
      );

      const seatNumbers = reservedSeats.map((seat) => seat.number);

      const booking = await Booking.create({
        userId, 
        trainId, 
        seatNumbers: JSON.stringify(seatNumbers),
        status: "confirmed",
      });
    
  
      res.json(reservedSeats);
    } catch (error) {
      res.status(500).json({ message: "Failed to reserve seats.", errorMessage: error.message });
    }
  });

module.exports = router;