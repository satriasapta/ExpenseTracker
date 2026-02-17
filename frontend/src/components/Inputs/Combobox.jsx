import React, { useState, useEffect, useRef } from 'react';

const Combobox = ({ value, onChange, options = [], label, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const containerRef = useRef(null);

    useEffect(() => {
        if (value) {
            const filtered = options.filter(option =>
                option.toLowerCase().includes(value.toLowerCase()) && option.toLowerCase() !== value.toLowerCase()
            );
            setFilteredOptions(filtered);
        } else {
            setFilteredOptions(options);
        }
    }, [value, options]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        onChange({ target: { value: option } });
        setIsOpen(false);
    };

    return (
        <div className="mb-4 relative" ref={containerRef}>
            <label className="text-[13px] text-slate-800">{label}</label>
            <div className="input-box">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => {
                        onChange(e);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    placeholder={placeholder}
                    className="w-full bg-transparent outline-none"
                />
            </div>

            {isOpen && filteredOptions.length > 0 && (
                <ul className="absolute z-50 w-full bg-white border border-slate-200 rounded-lg shadow-lg mt-1 max-h-40 overflow-y-auto">
                    {filteredOptions.map((option, index) => (
                        <li
                            key={index}
                            className="px-4 py-2.5 text-sm text-slate-700 hover:bg-purple-50 hover:text-primary cursor-pointer transition-colors"
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Combobox;
