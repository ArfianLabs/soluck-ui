"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { PieChart } from "@mui/x-charts/PieChart";
import { useState } from "react";

const data2 = [
  { label: "0x234", value: 100 },
  { label: "0x345", value: 300 },
  { label: "0x456", value: 100 },
  { label: "0x567", value: 80 },
  { label: "0x678", value: 40 },
  { label: "0x789", value: 30 },
  { label: "0x890", value: 50 },
  { label: "0x901", value: 100 },
  { label: "0x902", value: 200 },
  { label: "0x903", value: 150 },
  { label: "0x904", value: 50 },
];
export const JackpotChart = () => {
  const [itemNb, setItemNb] = useState(5);

  const handleItemNbChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue !== "number") {
      return;
    }
    setItemNb(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <PieChart
        height={500}
        width={500}
        series={[
          {
            data: data2.slice(0, itemNb),

            arcLabel: (item) => `${item.label} (${item.value}$)`,
          },
        ]}
      />

      <Typography id="input-item-number" gutterBottom>
        Number of items
      </Typography>
      <Slider
        value={itemNb}
        onChange={handleItemNbChange}
        valueLabelDisplay="auto"
        min={1}
        max={10}
        aria-labelledby="input-item-number"
      />
    </Box>
  );
};
