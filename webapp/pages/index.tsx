import { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";

let apiUrl = process.env.NEXT_PUBLIC_BASE_API_URL || "https://train-booking-system-s4hc.onrender.com";

export default function Home() {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isMobile = useMediaQuery('(max-width:600px)');

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const endpoint = isSignup ? "/auth/signup" : "/auth/login";

      interface requestBody {
        username: string, 
        password: string,
      }

      let requestBody: requestBody  = {
        username,
        password,
      };
      const response = await axios.post(apiUrl + endpoint, requestBody);
      localStorage.setItem("token", response.data.token);
      router.push("/dashboard");
    } catch (error: any) {
      alert(error.response?.data.message || "Error");
    }
  };

  return (
    <Grid container style={{ height: "100vh" }}>
      {!isMobile && (
        <Grid
          item
          xs={6}
          style={{
            background: "url('/train.jpg') no-repeat center center",
            backgroundSize: "cover",
          }}
        />
      )}
      <Grid
        item
        xs={isMobile ? 12 : 6}
        style={{
          background: isMobile ? "url('/train.jpg') no-repeat center center" : "none",
          backgroundSize: "100% 100%",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          gap={8}
          alignItems="center"
          justifyContent="center"
          height="100%"
          style={{
            backgroundColor: isMobile ? "rgba(0, 0, 0, 0.5)" : "transparent",
          }}
        >
          <Typography variant="h4" style={{ color: isMobile ? "#fff" : "inherit" }}>
            Train Booking System
          </Typography>
          <Card style={{ width: "100%", maxWidth: 400, ...(isMobile ? { backgroundColor: "rgba(255, 255, 255, 0.9)" } : {}) }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {isSignup ? "Sign Up" : "Login"}
              </Typography>

              <TextField
                fullWidth
                margin="normal"
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: 16 }}
                onClick={handleSubmit}
              >
                {isSignup ? "Sign Up" : "Login"}
              </Button>
              <Button
                fullWidth
                style={{ marginTop: 8 }}
                onClick={() => setIsSignup(!isSignup)}
              >
                {isSignup
                  ? "Already have an account? Login"
                  : "Don't have an account? Sign Up"}
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
}