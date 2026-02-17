import React, { useEffect, useState } from 'react'
import { prepareIncomeBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

const IncomeStatistics = ({ data }) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeBarChartData(data);
        setChartData(result);
        return () => { };
    }, [data]);

    return (
        <div className="card col-span-1">
            <div className="flex items-center justify-between">
                <h5 className='text-lg'>Income Statistics</h5>
            </div>

            <CustomBarChart data={chartData} />
        </div>
    )
}

export default IncomeStatistics;
