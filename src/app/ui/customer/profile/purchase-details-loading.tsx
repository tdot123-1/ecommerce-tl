import { LoaderPinwheelIcon } from "lucide-react";

const PurchaseDetailsLoading = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <LoaderPinwheelIcon size={32} className="animate-spin" />
    </div>
  );
};

export default PurchaseDetailsLoading;
