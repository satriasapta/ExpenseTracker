import React, { useState } from 'react'
import Input from '../Inputs/Input';
import Combobox from '../Inputs/Combobox';
import EmojiPickerPopup from '../layouts/EmojiPickerPopup';

const AddIncomeForm = ({ onAddIncome, sources }) => {
  const [income, setIncome] = useState({
    source: '',
    amount: '',
    date: '',
    icon: '',
  });

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });
  return (
    <div className="space-y-5 px-1 py-2">
      <div className="flex flex-col items-center">
        <EmojiPickerPopup
          icon={income.icon}
          onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Combobox
          value={income.source}
          onChange={({ target }) => handleChange('source', target.value)}
          label="Income Source"
          placeholder="Freelance, Salary, etc"
          options={sources}
        />

        <Input
          value={income.amount}
          onChange={({ target }) => handleChange('amount', target.value)}
          label="Amount"
          placeholder=""
          type="number"
        />
      </div>

      <Input
        value={income.date}
        onChange={({ target }) => handleChange('date', target.value)}
        label="Date"
        placeholder=""
        type="date"
      />

      <div className="flex justify-end pt-2">
        <button
          type='button'
          className='add-btn add-btn-fill px-8 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300'
          onClick={() => onAddIncome(income)}
        >
          Add Income
        </button>
      </div>
    </div>
  );
}

export default AddIncomeForm