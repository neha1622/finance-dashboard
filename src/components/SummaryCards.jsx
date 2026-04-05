import { Card, CardContent, Typography, Grid } from "@mui/material";

export default function SummaryCards({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  return (
    <Grid container spacing={2}>
      {[ 
        { title: "Balance", value: balance },
        { title: "Income", value: income },
        { title: "Expense", value: expense }
      ].map((item, i) => (
        <Grid item xs={12} md={4} key={i}>
          <Card>
            <CardContent>
              <Typography variant="h6">{item.title}</Typography>
              <Typography>₹{item.value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}