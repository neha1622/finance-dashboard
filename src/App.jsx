import { Container, Typography } from "@mui/material";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Finance Dashboard
      </Typography>

      <Dashboard />
    </Container>
  );
}

export default App;