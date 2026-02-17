import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import { prepareIncomeBarChartData, prepareYearlyChartData, prepareDailyChartData } from '../../utils/helper';
import CustomLineChart from '../Charts/CustomLineChart';

const IncomeOverview = ({ transactions, onAddIncome, viewType = "monthly" }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = viewType === "monthly"
            ? prepareDailyChartData(transactions)
            : prepareYearlyChartData(transactions);

        setChartData(result);

        return () => { };
    }, [transactions, viewType]);

    return <div className="card">
        <div className="flex items-center justify-between">
            <div className="">
                <h5 className='text-lg'>Income Overview</h5>
                <p className='text-xs text-gray-400 mt-0.5'>
                    Track your earnings over time and analyze your income trends.
                </p>
            </div>

            <button className='add-btn' onClick={onAddIncome}>
                <LuPlus className='text-lg' />
                Add Income
            </button>
        </div>

        <div className="mt-10">
            <CustomLineChart
                data={chartData}
            />
        </div>
    </div>
}

export default IncomeOverview