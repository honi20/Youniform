import { useState } from 'react';
import { MonthPicker, MonthInput } from 'react-lite-month-picker';

function CalendarPicker() {
  const [selectedMonthData, setSelectedMonthData] = useState({
    month: 9,
    year: 2023,
  });
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  return (
    <>
      <div>
        <MonthInput
          selected={selectedMonthData}
          setShowMonthPicker={setIsPickerOpen}
          showMonthPicker={isPickerOpen}
          lang="en"
        />
        {isPickerOpen ? (
          <MonthPicker
            setIsOpen={setIsPickerOpen}
            selected={selectedMonthData}
            onChange={setSelectedMonthData}
            lang="en"
          />
        ) : null}
      </div>
    </>
  );
}

export default CalendarPicker;