import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PromoCode {
  code: string;
  id: string;
}

interface SelectPromoOptionsProps {
  promoCodes: PromoCode[];
  handleChange: (value: string) => void;
}

const SelectPromoOptions = ({
  promoCodes,
  handleChange,
}: SelectPromoOptionsProps) => {
  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger>
        <SelectValue placeholder="Choose promo code" />
      </SelectTrigger>
      <SelectContent>
        {promoCodes.map((promo) => (
          <SelectItem key={promo.id} value={promo.id}>
            {promo.code}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectPromoOptions;
