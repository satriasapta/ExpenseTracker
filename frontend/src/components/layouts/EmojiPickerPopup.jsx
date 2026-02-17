import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import { LuImage, LuX } from 'react-icons/lu';

const EmojiPickerPopup = ({ icon, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='flex flex-col items-center gap-3 mb-2'>
            <div className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => setIsOpen(true)}>
                <div className="w-16 h-16 flex items-center justify-center text-3xl bg-purple-50 text-primary rounded-2xl border-2 border-dashed border-purple-200 group-hover:border-primary group-hover:bg-purple-100 transition-all duration-300 overflow-hidden">
                    {icon ? (
                        <img src={icon} alt="Icon" className='w-full h-full object-cover' />
                    ) : (
                        <LuImage className="opacity-50 group-hover:opacity-100" />
                    )}
                </div>

                <p className='text-xs font-medium text-slate-500 group-hover:text-primary transition-colors'>{icon ? "Change Icon" : "Add Icon"}</p>
            </div>

            {isOpen && (
                <div className="relative">
                    <button className='w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer' onClick={() => setIsOpen(false)}>
                        <LuX />
                    </button>

                    <EmojiPicker
                        open={isOpen}
                        onEmojiClick={(emoji) => onSelect(emoji?.imageUrl || '')}
                    />
                </div>
            )}
        </div>
    )
}

export default EmojiPickerPopup