import React from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import moment from 'moment';

const MonthYearFilter = ({
    selectedMonth,
    selectedYear,
    onMonthChange,
    onYearChange,
    viewType = "monthly", // "monthly" or "yearly"
    onViewTypeChange
}) => {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

    const handleNextMonth = () => {
        if (selectedMonth === 11) {
            onMonthChange(0);
            onYearChange(selectedYear + 1);
        } else {
            onMonthChange(selectedMonth + 1);
        }
    };

    const handlePrevMonth = () => {
        if (selectedMonth === 0) {
            onMonthChange(11);
            onYearChange(selectedYear - 1);
        } else {
            onMonthChange(selectedMonth - 1);
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm mb-6 gap-4">
            <div className="flex items-center gap-4">
                {/* View Type Toggle */}
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => onViewTypeChange("monthly")}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${viewType === "monthly" ? "bg-white shadow-sm text-primary" : "text-gray-500 hover:text-gray-700"}`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => onViewTypeChange("yearly")}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${viewType === "yearly" ? "bg-white shadow-sm text-primary" : "text-gray-500 hover:text-gray-700"}`}
                    >
                        Yearly
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    {viewType === "monthly" && (
                        <button
                            onClick={handlePrevMonth}
                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <LuChevronLeft size={20} className="text-gray-600" />
                        </button>
                    )}

                    <div className="flex items-center gap-2">
                        {viewType === "monthly" && (
                            <select
                                value={selectedMonth}
                                onChange={(e) => onMonthChange(parseInt(e.target.value))}
                                className="text-sm font-semibold bg-transparent outline-none cursor-pointer text-gray-800"
                            >
                                {months.map((month, index) => (
                                    <option key={index} value={index}>{month}</option>
                                ))}
                            </select>
                        )}

                        <select
                            value={selectedYear}
                            onChange={(e) => onYearChange(parseInt(e.target.value))}
                            className="text-sm font-semibold bg-transparent outline-none cursor-pointer text-gray-800 border-none focus:ring-0"
                        >
                            {years.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>

                    {viewType === "monthly" && (
                        <button
                            onClick={handleNextMonth}
                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <LuChevronRight size={20} className="text-gray-600" />
                        </button>
                    )}
                </div>
            </div>

            <div className="hidden md:block">
                <p className="text-xs text-gray-500 font-medium italic">
                    {viewType === "monthly"
                        ? `Showing data for ${months[selectedMonth]} ${selectedYear}`
                        : `Showing summary for the year ${selectedYear}`}
                </p>
            </div>
        </div>
    );
};

export default MonthYearFilter;
