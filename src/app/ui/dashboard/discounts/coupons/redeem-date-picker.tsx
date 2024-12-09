"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarCheck, XCircle } from "lucide-react";

interface RedeemDatePickerProps {
  redeemDate: Date | undefined;
  setRedeemDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const RedeemDatePicker = ({
  redeemDate,
  setRedeemDate,
}: RedeemDatePickerProps) => {
  //   const [redeemDate, setRedeemDate] = useState<Date>();
  return (
    <>
      <Popover>
        <div className="flex items-center gap-1">
          <PopoverTrigger asChild>
            <Button id="redeem_by" variant={"outline"} className="w-fit ml-4">
              <div className="flex justify-center items-center gap-1">
                <CalendarCheck />
                {redeemDate ? (
                  redeemDate.toLocaleDateString()
                ) : (
                  <span>Pick a date</span>
                )}
              </div>
            </Button>
          </PopoverTrigger>
          <Button
            type="button"
            variant={`ghost`}
            className="p-2"
            onClick={() => setRedeemDate(undefined)}
          >
            <p className="hidden">Reset selected date</p>
            <XCircle size={24} />
          </Button>
        </div>

        <PopoverContent>
          <Calendar
            mode="single"
            selected={redeemDate}
            onSelect={setRedeemDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default RedeemDatePicker;
