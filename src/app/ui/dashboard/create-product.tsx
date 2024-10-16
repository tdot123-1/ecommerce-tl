"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";


const Form = () => {
  return (
    <form>
      <div className="mb-4">
        <Label>Name</Label>
        <Input type="text" />
      </div>
      <div className="mb-4">
        <Label>Price</Label>
        <Input type="text" />
      </div>
      <div className="mb-4">
        <Label>Sizes</Label>
        <Input type="text" />
      </div>
      <div className="mb-4">
        <Label>Description</Label>
        <Textarea />
      </div>
    </form>
  );
};

export default Form;
