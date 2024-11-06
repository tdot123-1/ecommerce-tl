"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { setFeaturedDates } from "@/lib/actions";
import {
  CalendarCheck,
  CalendarIcon,
  LoaderPinwheelIcon,
  SaveAllIcon,
  SaveIcon,
} from "lucide-react";
import { useState } from "react";

interface DatePickerProps {
  initialStartDate: Date;
  initialEndDate?: Date;
  productId: string;
}

//(!!) not selecting correct dates yet on submit

const DatePicker = ({
  initialStartDate,
  initialEndDate,
  productId,
}: DatePickerProps) => {
  const [startDate, setStartDate] = useState<Date>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | undefined>(initialEndDate);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    // normalize dates before submission to remove time discrepancies
    const normalizedStartDate = new Date(startDate.setHours(0, 0, 0, 0));
    const normalizedEndDate = endDate
      ? new Date(endDate.setHours(0, 0, 0, 0))
      : undefined;

    // // Normalize the dates to local midnight and format as 'YYYY-MM-DD'
    // const normalizeDate = (date: Date) => {
    //   const normalizedDate = new Date(date);
    //   normalizedDate.setHours(0, 0, 0, 0); // Set to midnight
    //   return normalizedDate.toLocaleDateString("en-CA"); // Formats as 'YYYY-MM-DD'
    // };

    // const normalizedStartDate = normalizeDate(startDate);
    // const normalizedEndDate = endDate ? normalizeDate(endDate) : null;

    try {
      await setFeaturedDates(productId, normalizedStartDate, normalizedEndDate);
      setIsDialogOpen(false);
    } catch (error) {
      setError("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartDate = (day: Date | undefined) => {
    setStartDateError("");

    // in case of undefined -> user hasn't selected a new date -> close popover, return early
    if (!day) {
      setIsStartOpen(false);
      return;
    }

    // normalize time stamps to exlude time differences
    const normalizedDay = new Date(day.setHours(0, 0, 0, 0));
    const normalizedInitialStartDate = new Date(
      initialStartDate.setHours(0, 0, 0, 0)
    );
    // get timestamp for todays date
    const today = new Date().setHours(0, 0, 0, 0);

    // set date only if new date is future or today's date, or initial date
    if (
      normalizedDay &&
      (normalizedDay.getTime() >= today ||
        normalizedDay.getTime() === normalizedInitialStartDate.getTime())
    ) {
      setStartDate(day);
    } else {
      setStartDateError("Please select a future date");
    }
    setIsStartOpen(false);
  };

  const handleEndDate = (day: Date | undefined) => {
    setEndDateError("");

    // in case of undefined -> user hasn't selected a new date -> close popover, return early
    if (!day) {
      setIsEndOpen(false);
      return;
    }

    // normalize time stamps to exlude time differences
    const normalizedDay = new Date(day.setHours(0, 0, 0, 0));
    const normalizedStartDate = new Date(startDate.setHours(0, 0, 0, 0));

    // get timestamp for todays date
    const today = new Date().setHours(0, 0, 0, 0);

    // only set new date if future date and later than start date
    if (normalizedDay.getTime() < today) {
      setEndDateError("Please select a future date");
    } else if (normalizedDay.getTime() <= normalizedStartDate.getTime()) {
      setEndDateError("Please select a date later than starting date");
    } else {
      setEndDate(day);
    }
    setIsEndOpen(false);
  };

  return (
    <div>
      <Dialog modal={false} open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="p-2">
            <p className="hidden">Edit dates</p>
            <CalendarIcon size={24} />
          </Button>
        </DialogTrigger>

        {/* custom backdrop */}
        {isDialogOpen && (
          <div
            className="fixed inset-0 bg-zinc-900 bg-opacity-40 backdrop-blur-sm z-10"
            onClick={() => setIsDialogOpen(false)}
          />
        )}

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Dates</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Change the dates for this product to keep track of how long it has
            been on the featured items list.
          </DialogDescription>
          <div className="flex flex-col md:flex-row mx-auto w-fit gap-4 my-4">
            <Popover open={isStartOpen} onOpenChange={setIsStartOpen}>
              <div className="flex flex-col gap-1">
                <Label htmlFor="start-date">Start Date</Label>
                <PopoverTrigger asChild>
                  <Button id="start-date" variant={"outline"} className="w-fit">
                    <div className="flex justify-center items-center gap-1">
                      <CalendarCheck />
                      {startDate.toLocaleDateString()}
                    </div>
                  </Button>
                </PopoverTrigger>
                {startDateError && (
                  <p className="text-red-600 text-xs italic">
                    {startDateError}
                  </p>
                )}
              </div>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(day) => handleStartDate(day)}
                />
              </PopoverContent>
            </Popover>
            <Popover open={isEndOpen} onOpenChange={setIsEndOpen}>
              <div className="flex flex-col gap-1">
                <Label htmlFor="start-date">End Date</Label>
                <PopoverTrigger asChild>
                  <Button id="start-date" variant={"outline"} className="w-fit">
                    <div className="flex justify-center items-center gap-1">
                      <CalendarCheck />
                      {endDate
                        ? endDate.toLocaleDateString()
                        : "Select end date"}
                    </div>
                  </Button>
                </PopoverTrigger>
                {endDateError && (
                  <p className="text-red-600 text-xs italic">{endDateError}</p>
                )}
              </div>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={(day) => handleEndDate(day)}
                />
              </PopoverContent>
            </Popover>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"secondary"} disabled={isLoading}>
                Cancel
              </Button>
            </DialogClose>
            <div className="flex flex-col gap-1">
              <Button
                onClick={handleSubmit}
                className="mb-2 md:mb-0"
                disabled={isLoading}
              >
                <div className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <LoaderPinwheelIcon size={20} className="animate-spin" />
                  ) : (
                    <SaveIcon size={20} />
                  )}

                  <span>Save Changes</span>
                </div>
              </Button>
              {error && <p className="text-red-600 text-xs italic">{error}</p>}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DatePicker;
