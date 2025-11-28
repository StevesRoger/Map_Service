import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface CustomDateRangePickerProps {
  selected?: DateRange;
  onSelect?: (range: DateRange | undefined) => void;
  locale?: any;
}

export function CustomDateRangePicker({ selected, onSelect, locale }: CustomDateRangePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  // Get month/year display
  const monthYearDisplay = useMemo(() => {
    const month = currentMonth.toLocaleString(locale?.code || 'en-US', { month: 'long' });
    const year = currentMonth.getFullYear();
    return `${month} ${year}`;
  }, [currentMonth, locale]);

  // Get days in month
  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInCurrentMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    // Get previous month days
    const prevMonth = new Date(year, month, 0);
    const daysInPrevMonth = prevMonth.getDate();

    const days: Array<{
      date: Date;
      isCurrentMonth: boolean;
      isToday: boolean;
    }> = [];

    // Add previous month days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, daysInPrevMonth - i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
      });
    }

    // Add current month days
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const date = new Date(year, month, i);
      const isToday = date.getTime() === today.getTime();
      days.push({
        date,
        isCurrentMonth: true,
        isToday,
      });
    }

    // Add next month days to complete the grid (6 rows x 7 days = 42)
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
      });
    }

    return days;
  }, [currentMonth]);

  // Navigation handlers
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  // Date selection logic
  const handleDateClick = (date: Date) => {
    if (!onSelect) return;

    if (!selected?.from || (selected.from && selected.to)) {
      // Start new selection
      onSelect({ from: date, to: undefined });
    } else if (selected.from && !selected.to) {
      // Complete the range
      if (date < selected.from) {
        onSelect({ from: date, to: selected.from });
      } else {
        onSelect({ from: selected.from, to: date });
      }
    }
  };

  // Check if date is in range
  const isDateInRange = (date: Date) => {
    if (!selected?.from) return false;

    const compareDate = hoveredDate && !selected.to ? hoveredDate : selected.to;
    if (!compareDate) return false;

    const start = selected.from < compareDate ? selected.from : compareDate;
    const end = selected.from < compareDate ? compareDate : selected.from;

    return date >= start && date <= end;
  };

  // Check if date is start or end of range
  const isRangeStart = (date: Date) => {
    return selected?.from && date.getTime() === selected.from.getTime();
  };

  const isRangeEnd = (date: Date) => {
    return selected?.to && date.getTime() === selected.to.getTime();
  };

  // Week days
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div className="h-[323.205px] relative rounded-[8px] shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[323.205px] items-start pb-0 pt-[12px] px-[12px] relative w-full">
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
            {/* Header with navigation */}
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full h-[24px]">
              {/* Previous month button */}
              <button
                onClick={goToPreviousMonth}
                className="bg-[rgba(0,0,0,0)] box-border content-stretch flex items-center justify-center opacity-50 p-[0.571px] rounded-[8px] size-[28px] hover:opacity-100 transition-opacity"
                aria-label="Previous month"
              >
                <div aria-hidden="true" className="absolute border-[0.571px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                <div className="relative shrink-0 size-[16px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <path d="M10 12L6 8L10 4" stroke="#E4E4E7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  </svg>
                </div>
              </button>

              {/* Month/Year text */}
              <div className="flex items-center h-[20px]">
                <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] text-[14px] text-nowrap text-zinc-200 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
                  {monthYearDisplay}
                </p>
              </div>

              {/* Next month button */}
              <button
                onClick={goToNextMonth}
                className="bg-[rgba(0,0,0,0)] box-border content-stretch flex items-center justify-center opacity-50 p-[0.571px] rounded-[8px] size-[28px] hover:opacity-100 transition-opacity"
                aria-label="Next month"
              >
                <div aria-hidden="true" className="absolute border-[0.571px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                <div className="relative shrink-0 size-[16px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <path d="M6 12L10 8L6 4" stroke="#E4E4E7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Calendar grid container */}
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
              {/* Week day headers */}
              <div className="content-stretch flex items-start relative shrink-0 w-full h-[19.205px] mb-[8px]">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="flex items-start h-[19.205px] rounded-[8px] w-[32px]"
                  >
                    <p className="font-['Open_Sans:Regular',sans-serif] font-normal leading-[19.2px] text-[12.8px] text-nowrap text-zinc-400 whitespace-pre mt-[-1.43px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      {day}
                    </p>
                  </div>
                ))}
              </div>

              {/* Date grid - flexbox layout */}
              <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                {Array.from({ length: 6 }).map((_, weekIndex) => (
                  <div
                    key={weekIndex}
                    className="content-stretch flex items-start relative shrink-0 w-full h-[32px]"
                  >
                    {Array.from({ length: 7 }).map((_, dayIndex) => {
                      const dayData = daysInMonth[weekIndex * 7 + dayIndex];
                      if (!dayData) return null;

                      const { date, isCurrentMonth } = dayData;
                      const inRange = isDateInRange(date);
                      const isStart = isRangeStart(date);
                      const isEnd = isRangeEnd(date);

                      return (
                        <div
                          key={dayIndex}
                          className="content-stretch flex flex-col items-start size-[32px]"
                        >
                          <button
                            onClick={() => handleDateClick(date)}
                            onMouseEnter={() => setHoveredDate(date)}
                            onMouseLeave={() => setHoveredDate(null)}
                            className={`h-[32px] relative rounded-[8px] shrink-0 w-full transition-colors ${
                              inRange || isStart || isEnd ? 'bg-zinc-800' : ''
                            } ${isCurrentMonth ? 'hover:bg-zinc-800' : 'hover:bg-zinc-800/50'}`}
                          >
                            <p
                              className={`absolute font-['Open_Sans:Regular',sans-serif] font-normal leading-[20px] text-[14px] text-nowrap top-[6.57px] whitespace-pre ${
                                date.getDate() < 10 ? 'left-[11.99px]' : 'left-[7.99px]'
                              } ${isCurrentMonth ? 'text-zinc-200' : 'text-zinc-400'}`}
                              style={{ fontVariationSettings: "'wdth' 100" }}
                            >
                              {date.getDate()}
                            </p>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}