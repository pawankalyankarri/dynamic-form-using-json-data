import React from "react";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Input } from "./components/ui/input";
import { SelectValue } from "@radix-ui/react-select";

type FieldType = "text" | "number" | "select";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: { label: string; value: string }[];
  max?: number;
  min?: number;
}

interface DynamicFormProps {
  schema: FieldConfig[];
}

const DynamicForm: React.FC<DynamicFormProps> = ({ schema }) => {
  const renderField = (field: FieldConfig) => {
    switch (field.type) {
      case "text":
        return (
          <Input type="text" name={field.name} required={field.required}  />
        );

      case "number":
        return (
          <Input
            type="number"
            name={field.name}
            required={field.required}
            min={field.min}
            max={field.max}
          
            
          />
        );

      case "select":
        return (
          <Select>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      default:
        return null;
    }
  };

  return (
    <form className=" grid  gap-4 p-4 border rounded w-[50%]">
      {schema.map((field) => (
        <div key={field.name} className=" grid grid-cols-2 w-full">
          <Label >
            {field.label}: 
          </Label>
          <div >
            {renderField(field)}
          </div>
          
        </div>
      ))}

      <Button type="submit" className="border w-[40%] m-auto">
        Submit
      </Button>
    </form>
  );
};

export default DynamicForm;
