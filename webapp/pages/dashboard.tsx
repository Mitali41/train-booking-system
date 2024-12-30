import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  Box,
  CardMedia
} from "@mui/material";
import axios from "axios";

interface Train {
  id: number;
  name: string;
  fromStation: string;
  toStation: string;
  departureTime: string;
}

let apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export default function Dashboard() {
  const [trains, setTrains] = useState<Train[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchTrains = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get<Train[]>(apiUrl + '/allTrains', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrains(response.data);
    };

    fetchTrains();
  }, []);


  const filteredTrains = trains.filter((train) => {
    const matchesName = train.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesName;
  });

  return (
    <div>
      <Box display="flex" gap={5} alignItems="center" style={{ padding: 16 }}>
        <TextField
          label="Search by Train Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"

        >
          Search
        </Button>
      </Box>
      <Grid container spacing={2} style={{ padding: 16 }}>
        {filteredTrains.map((train) => (
          <Grid item xs={12} sm={6} md={4} key={train.id}>
            <Card style={{ cursor: "pointer" }}>
              <CardMedia
                component="img"
                height="140"
                image="/trainCard.jpg"
                alt="Train Image"
              />
              <CardContent>
                <Typography variant="h6">{train.name}</Typography>
                <Typography variant="body2">
                  From: {train.fromStation} To: {train.toStation}
                </Typography>
                <Typography variant="body2">
                  Departure: {new Date(train.departureTime).toLocaleString()}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: 16 }}
                  onClick={() => router.push(`/trains/${train.id}`)}
                >
                  Book Ticket
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
