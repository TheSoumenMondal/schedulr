"use client";

import { Calendar } from "./calendar";
import {
  today,
  getLocalTimeZone,
  parseDate,
  CalendarDate,
} from "@internationalized/date";
import { DateValue } from "@react-types/calendar";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface RenderCalendarProps {
  availability: {
    day: string;
    isActive: boolean;
  }[];
}

export function RenderCalendar({ availability }: RenderCalendarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [date, setdate] = useState(() => {
    const dateParams = searchParams.get("date");
    return dateParams ? parseDate(dateParams) : today(getLocalTimeZone());
  });

  const handleDateChange = (newDate: DateValue) => {
    setdate(newDate as CalendarDate);
    const url = new URL(window.location.href);
    url.searchParams.set("date", newDate.toString());
    router.push(url.toString());
  };

  useEffect(()=>{
    const dateParams = searchParams.get("date");
    if (dateParams) {
      const parsedDate = parseDate(dateParams);
      if (parsedDate) {
        setdate(parsedDate as CalendarDate);
      }
    }
  }, [searchParams]);

  const isDateUnavailable = (date: DateValue) => {
    const dayOfWeek = date.toDate(getLocalTimeZone()).getDay();
    const adjustedIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    return !availability[adjustedIndex]?.isActive;
  };
  return (
    <Calendar
      value={date}
      onChange={handleDateChange}
      minValue={today(getLocalTimeZone())}
      isDateUnavailable={isDateUnavailable}
    />
  );
}
