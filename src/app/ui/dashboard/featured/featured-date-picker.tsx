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
import { CalendarCheck, CalendarIcon } from "lucide-react";
import { useState } from "react";

interface DatePickerProps {
  initialStartDate: Date;
  initialEndDate?: Date;
}

const DatePicker = ({ initialStartDate, initialEndDate }: DatePickerProps) => {
  const [startDate, setStartDate] = useState<Date>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | undefined>(initialEndDate);

  const handleStartDate = () => {};

  return (
    <div>
      <Dialog modal={false}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="p-2">
            <p className="hidden">Edit dates</p>
            <CalendarIcon size={24} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Dates</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Change the dates for this product to keep track of how long it has
            been on the featured items list.
          </DialogDescription>
          <div className="flex flex-col md:flex-row mx-auto w-fit gap-4 my-4">
            <Popover>
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
              </div>
              <PopoverContent >
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(day) => {
                    if (day) setStartDate(day);
                  }}
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <div className="flex flex-col gap-1">
                <Label htmlFor="start-date">End Date</Label>
                <PopoverTrigger asChild>
                  <Button id="start-date" variant={"outline"} className="w-fit">
                    <div className="flex justify-center items-center gap-1">
                      <CalendarCheck />
                      {endDate ? endDate.toLocaleDateString() : "Select end date"}
                    </div>
                  </Button>
                </PopoverTrigger>
              </div>
              <PopoverContent >
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={(day) => {
                    if (day) setEndDate(day);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"secondary"}>Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>Save Changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DatePicker;
