require("dotenv").config();
const express = require("express");
const { Sequelize } = require("sequelize");
const Booking = require("./Models/Booking");
const Seat = require("./Models/Seat");
const authController = require('./Controllers/AuthControllers');
const trainController = require('./Controllers/TrainControllers');
const verifyToken = require("./Middlwares/jwtAuthMiddleware");
const sequelize = require("./database");
const cors = require('cors');
const Train = require("./Models/Train");
const User = require("./Models/User");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/bookings", verifyToken ,async (req, res) => {
  const  userId  = req.userId;
  try {
    const bookings = await Booking.findAll({
      where: { userId },
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings.", error });
  }
});

app.post("/book", verifyToken, async (req, res) => {
  try {
    const { trainId, seatCount } = req.body;

    if (seatCount > 7) {
      return res.status(400).json({ message: "Cannot book more than 7 seats at a time" });
    }

    const seats = await Seat.findAll({
      where: {
        trainId,
        isReserved: false,
      },
      order: [["number", "ASC"]],
    });

    if (seats.length < seatCount) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

    const rows = {};
    seats.forEach((seat) => {
      const row = Math.floor((seat.number - 1) / 7) + 1;
      if (!rows[row]) rows[row] = [];
      rows[row].push(seat);
    });

    let selectedSeats = [];
    for (const row in rows) {
      if (rows[row].length >= seatCount) {
        selectedSeats = rows[row].slice(0, seatCount);
        break;
      }
    }

    if (selectedSeats.length === 0) {
      selectedSeats = seats.slice(0, seatCount);
    }

    const bookings = await Promise.all(
      selectedSeats.map((seat) =>
        Booking.create({ userId: req.userId, seatId: seat.id }).then(() =>
          seat.update({ isReserved: true })
        )
      )
    );

    res.status(201).json({ message: "Seats booked successfully", bookings });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/bookings/remove", verifyToken, async (req, res) => {
  const { bookingId } = req.body;

  try {
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    const seatNumbers = JSON.parse(booking.seatNumbers);
    await Seat.update({ isReserved: false }, { where: { number: seatNumbers } });

    await booking.destroy();
    res.json({ message: "Booking cancelled successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to cancel booking.", error });
  }
});

app.delete("/cancel", verifyToken, async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findOne({
      where: { id: bookingId, userId: req.userId },
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const seat = await Seat.findByPk(booking.seatId);
    await booking.destroy();
    await seat.update({ isReserved: false });

    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/allTrains", verifyToken, async (req, res) => {
  try {
    const trains = await Train.findAll();
    res.json(trains);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



app.use('/auth', authController);
app.use('/train', trainController);

(async () => {
  // await User.bulkCreate([
  //   { username: "test", password: "test@123"},
  //   { username: "test2", password: "test2@123"},
  // ]);

  // await Train.bulkCreate([
  //   { name: "Express 1", fromStation: "A", toStation: "B", departureTime: new Date(), arrivalTime: new Date() },
  //   { name: "Express 2", fromStation: "B", toStation: "C", departureTime: new Date(), arrivalTime: new Date() },
  //   { name: "Express 3", fromStation: "D", toStation: "E", departureTime: new Date(), arrivalTime: new Date() },
  //   { name: "Express 4", fromStation: "G", toStation: "H", departureTime: new Date(), arrivalTime: new Date() },
  // ]);

  // await Seat.bulkCreate(
  //   Array.from({ length: 80 }, (_, i) => ({
  //     trainId: 4,
  //     number: i + 1,
  //     isReserved: false,
  //   }))
  // );

  // await Booking.bulkCreate([
  //   { userId: 1, trainId: 1, seatNumbers: JSON.stringify([1, 2]), status: "confirmed" },
  //   { userId: 2, trainId: 1, seatNumbers: JSON.stringify([3, 4]), status: "confirmed" },
  // ]);

  // await Seat.update({ isReserved: true }, { where: { number: [1, 2, 3, 4] } });

  console.log("Dummy data added!");
})();

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.error("Error syncing database", error));
