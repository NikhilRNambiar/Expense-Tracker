import React from 'react';
import { BarChart, Bar, XAxis, YAxis,ResponsiveContainer } from 'recharts';

const TopExpenses = ({ data }) => {
    const showSortedData = () => {
        return data.sort((a,b) => b.value - a.value);
    }
  return (
    <div>
        <h2 style={{color:'white',fontSize:'28px',fontStyle:'italic',fontWeight:'700',marginLeft:'40px'}}>Top Expenses</h2>
    <div style={{ borderRadius: '10px' ,width:'417px',height:'347px',marginLeft:'40px'}}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={showSortedData()}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
            barSize={30}
          >
            
            <XAxis type="number" hide/>
            <YAxis dataKey="name"  type="category" />
            
            <Bar dataKey="value" fill="#8784D2" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    </div>
  );
};

export default TopExpenses;
