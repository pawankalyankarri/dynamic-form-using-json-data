import React from "react";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Input } from "./components/ui/input";
import { SelectValue } from "@radix-ui/react-select";
import { Card, CardContent } from "./components/ui/card";
import { Textarea } from "./components/ui/textarea";
import { Checkbox } from "./components/ui/checkbox";

type FieldType = "text" | "number" | "select" | "email" | "date" | "textarea" | "checkbox";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: { label: string; value: string }[];
  max?: number;
  min?: number;
  rows?:number;
  disable?: boolean;
  defaultChecked? : boolean;
}

interface DynamicFormProps {
  schema: FieldConfig[];
}

const DynamicForm: React.FC<DynamicFormProps> = ({ schema }) => {
  


  const renderField = (field: FieldConfig) => {
    switch (field.type) {
      case "text":
        return (
          <Input type="text" name={field.name} required={field.required} />
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
          <Select >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={`Select ${field.label}`} className="w-full" />
            </SelectTrigger>
            <SelectContent >
              {field.options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "email" : 
      return(
        <Input
            type="email"
            name={field.name}
            required={field.required}
            
          />
      )
      case "date" : 
      return(
        <Input
            type="date"
            name={field.name}
            required={field.required}
          />
      )
      case 'textarea' : 
        return(
          <Textarea 
            name={field.name}
            required={field.required}
            rows={field.rows}
              />
        )
      
        case "checkbox" : 
        return(
          <Checkbox 
          disabled={field.disable}
          defaultChecked = {field.defaultChecked}
          />
        )


      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-sm shadow-lg" >
      <CardContent>
        <form className=" grid gap-4 p-4  ">
          {schema.map((field) => (
            <div key={field.name} className=" grid grid-cols-1 gap-1 w-full">
              <Label className="py-1 capitalize" >{field.label}: </Label>
              <div className="w-full" >{renderField(field)}</div>
            </div>
          ))}

          <Button type="submit" className="border w-[40%] m-auto">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DynamicForm;
