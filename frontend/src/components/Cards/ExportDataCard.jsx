import React from 'react'
import { LuDownload, LuFileJson, LuFileSpreadsheet } from 'react-icons/lu'

const ExportDataCard = ({ onExport, type }) => {
    return (
        <div className='card bg-gradient-to-br from-violet-50 to-white border-violet-100 flex flex-col md:flex-row items-center justify-between gap-6 px-10 py-8'>
            <div className='flex items-center gap-4'>
                <div className='w-14 h-14 flex items-center justify-center bg-violet-100 text-violet-600 rounded-full'>
                    <LuFileSpreadsheet className='text-3xl' />
                </div>
                <div>
                    <h4 className='text-xl font-semibold text-gray-800'>Export {type} Data</h4>
                    <p className='text-sm text-gray-400 mt-1'>Download your {type.toLowerCase()} transactions as an Excel file for better tracking.</p>
                </div>
            </div>

            <button
                onClick={onExport}
                className='flex items-center gap-3 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl transition-all shadow-md shadow-violet-200 active:scale-95'
            >
                <LuDownload className='text-lg' />
                <span className='font-medium'>Download Excel</span>
            </button>
        </div>
    )
}

export default ExportDataCard
