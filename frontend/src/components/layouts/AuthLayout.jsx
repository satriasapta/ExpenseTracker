import React from 'react'
import { LuTrendingUpDown } from 'react-icons/lu';

const AuthLayout = ({ children }) => {
    return (
        <div className='flex'>
            {/* LEFT */}
            <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
                <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>
                {children}
            </div>

            {/* RIGHT */}
            <div className="hidden md:block w-[40vw] h-screen bg-violet-50 overflow-hidden p-8 relative">

    {/* DOT PATTERN */}
    <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(60,0,120,0.06)_1px,_transparent_1px)] bg-[size:22px_22px]" />

    {/* BIG SOFT GLOWS */}
    <div className="absolute -top-10 left-0 w-[380px] h-[380px] bg-purple-500/40 blur-[150px] rounded-full" />
    <div className="absolute bottom-20 right-10 w-[300px] h-[300px] bg-fuchsia-500/30 blur-[160px] rounded-full" />

    {/* WAVY GRADIENT BACKDROP */}
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-600/40 to-pink-500/40 opacity-30 blur-[120px] rounded-[60px] rotate-12" />

    {/* STRONG GRADIENT LINES */}
    <div className="absolute top-[40%] left-10 w-[280px] h-[4px] bg-gradient-to-r from-purple-400 to-fuchsia-500 rounded-full opacity-70" />
    <div className="absolute top-[60%] right-10 w-[210px] h-[3px] bg-gradient-to-r from-pink-500 to-indigo-400 rounded-full opacity-60" />

    {/* SHAPES WITH FLOAT ANIMATION */}
    <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5 animate-[float_6s_ease-in-out_infinite]" />
    <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10 animate-[float_7s_ease-in-out_infinite]" />
    <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-10 -left-5 animate-[float_5s_ease-in-out_infinite]" />

    {/* EXTRA FLOATING GRADIENT CIRCLES */}
    <div className="absolute top-[65%] left-[30%] w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-80 blur-sm animate-pulse" />
    <div className="absolute top-[15%] right-[30%] w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full opacity-70 blur-[2px] animate-bounce" />

    

    {/* ICON DECORATION */}
    <div className="absolute bottom-5 left-10 text-white text-5xl rotate-12 opacity-40">
        <LuTrendingUpDown />
    </div>

    {/* MAIN CARD */}
    <div className="relative z-20 mt-10">
        <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expense"
            value="430,000"
            color="bg-primary"
        />
    </div>

    {/* FLOATING MINI CARD */}
    <div className="absolute bottom-10 right-10 z-20 bg-white/90 backdrop-blur-lg shadow-xl border border-gray-200 p-4 rounded-xl">
        <p className="text-xs text-gray-600">This Month</p>
        <p className="text-xl font-semibold text-green-600">+32%</p>
    </div>
</div>

        </div>
    )
}

export default AuthLayout;

// INFO CARD
const StatsInfoCard = ({ icon, label, value, color }) => {
    return (
        <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50 z-10 w-[330px]">
            <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
                {icon}
            </div>
            <div>
                <h6 className='text-xs text-gray-500 mb-1'>{label}</h6>
                <span className='text-[20px]'>${value}</span>
            </div>
        </div>
    )
}
