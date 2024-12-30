import React from "react";
import { Box, Grid } from "@mui/material";

interface SeatMapProps {
  totalSeats: number;
  bookedSeats: number[];
}

const SeatMap: React.FC<SeatMapProps> = ({ totalSeats, bookedSeats }) => {
  const seatsPerRow = 7;

  return (
    <Box sx={{ maxWidth: "500px", display: "flex", flexWrap: "wrap" }}>
      <Grid container spacing={1}>
        {Array.from({ length: totalSeats }, (_, i) => i + 1).map((seatNumber) => (
          <Grid
            key={seatNumber}
            item
            xs={1}
            sx={{
              width: "50px",
              height: "50px",
              backgroundColor: bookedSeats.includes(seatNumber)
                ? "red"
                : "lightgreen",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid black",
              borderRadius: "4px",
            }}
          >
            {seatNumber}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SeatMap;
