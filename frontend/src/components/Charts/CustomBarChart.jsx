import React from 'react'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell
} from 'recharts';


const CustomBarChart = ({ data }) => {
    // Function to alternate colors 
    const getBarColor = (index) => {
        return index % 2 === 0 ? "#875cf5" : "#cfbefb";
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const item = payload[0].payload;
            return (
                <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
                    <p className='text-xs font-semibold text-purple-800 mb-1'>{item.category || item.source}</p>
                    <p className='text-sm text-gray-600'>
                        Amount: <span className='text-sm font-medium text-gray-900'>${item.amount}</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    console.log("CustomBarChart received data:", data);

    return (
        <div className='bg-white mt-6'>
            {data && data.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid stroke='none' />
                        <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#555" }} stroke='none' />
                        <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke='none' />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar
                            dataKey="amount"
                            fill='#FF8042'
                            radius={[10, 10, 0, 0]}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <div className="h-[300px] flex items-center justify-center text-gray-400">
                    No data available for the last 30 days
                </div>
            )}
        </div>
    )
}

export default CustomBarChart;