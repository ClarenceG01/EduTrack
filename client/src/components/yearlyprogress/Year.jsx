import React from "react";
import "./year.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Year 1",
    score: 55,
  },
  {
    name: "Year 2",
    score: 67,
  },
  {
    name: "Year 3",
    score: 76,
  },
  {
    name: "Year 4",
    score: 85,
  },
];
const CustomTooltip = ({ active, payload, label }) => {
  const getGrade = (score) => {
    if (score >= 70) {
      return "Grade A";
    } else if (score >= 60 && score < 70) {
      return "Grade B";
    } else if (score >= 50 && score < 60) {
      return "Grade C";
    } else if (score >= 40 && score < 50) {
      return "Grade D";
    } else {
      return "Grade E";
    }
  };

  if (active && payload && payload.length) {
    const score = payload[0].value;
    const grade = getGrade(score);

    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${score}`}</p>
        <p className="grade">{`Grade: ${grade}`}</p>
      </div>
    );
  }

  return null;
};

const Year = () => {
  return (
    <div>
      <LineChart
        width={700}
        height={500}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};

export default Year;
