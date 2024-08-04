import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import PieLabel from '../PieLabel/PieLabel';
import "./Piechart.css";

const COLORS = ["#A000FF", "#FF9304", "#FDE006", '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Piechart = ({ data }) => {
  return (
    <div className='pieChart'>
    <div className='pie'>
      <ResponsiveContainer width='100%' height="100%">
        <PieChart width={199} height={199}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className='pieLabelsDiv'>
                <PieLabel name="Food" color="#A000FF"/>
                <PieLabel name="Entertainment" color="#FF9304"/>
                <PieLabel name="Travel" color="#FDE006"/>
        </div>
      
    </div>
    </div>
  );
};

export default Piechart;
