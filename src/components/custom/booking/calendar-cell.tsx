import { useRef } from "react";
import { mergeProps, useCalendarCell, useFocusRing } from "react-aria";
import { CalendarState } from "react-stately";
import {
  CalendarDate,
  isToday,
  getLocalTimeZone,
  isSameMonth,
} from "@internationalized/date";
import { cn } from "@/lib/utils";

export function CalendarCell({
  state,
  date,
  currentMonth,
  isUnavailable,
}: {
  state: CalendarState;
  date: CalendarDate;
  currentMonth: CalendarDate;
  isUnavailable?: boolean;
}) {
  let ref = useRef(null);
  let { cellProps, buttonProps, isSelected, isDisabled, formattedDate } =
    useCalendarCell({ date }, state, ref);

  const { focusProps, isFocusVisible } = useFocusRing();

  const isDateToday = isToday(date, getLocalTimeZone());

  const isOutsideOfMonth = !isSameMonth(currentMonth, date);

  const finallyDisabled = isDisabled || isUnavailable;

  return (
    <td
      {...cellProps}
      className={`py-0.5 px-0.5 cursor-pointer relative ${
        isFocusVisible ? "z-10" : "z-0"
      }`}
    >
      <div
        ref={ref}
        hidden={isOutsideOfMonth}
        {...mergeProps(buttonProps, focusProps)}
        className="size-10 outline-none group rounded-md"
      >
        <div
          className={cn(
            "size-full rounded-sm flex items-center justify-center font-semibold text-sm",
            isSelected ? "bg-primary" : "",
            finallyDisabled ? "bg-muted-foreground/20 cursor-not-allowed" : "",
            !isSelected && !isDisabled ? "hover:bg-primary/50" : ""
          )}
        >
          {formattedDate}
          {isDateToday && (
            <div
              className={cn(
                "absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 bg-primary rounded-full",
                isSelected && "bg-transparent"
              )}
            ></div>
          )}
        </div>
      </div>
    </td>
  );
}
