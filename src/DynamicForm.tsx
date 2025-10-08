import { useState, type FormEvent } from "react";
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
import { Card, CardContent, CardFooter } from "./components/ui/card";
import { Textarea } from "./components/ui/textarea";
import { Checkbox } from "./components/ui/checkbox";

import { MultiSelect } from "./components/ui/multi-select";
import Calendar22 from "./components/ui/Calendar22";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "./components/ui/calendar";

type FieldType =
  | "text"
  | "number"
  | "select"
  | "email"
  | "date"
  | "textarea"
  | "checkbox"
  | "file"
  | "multiselect";

export interface FieldConfig {
  name: string;
  label?: string;
  cLabel?: string;
  type: FieldType;
  required?: boolean;
  options?: { label: string; value: string }[];

  trigger?: string;
  max?: number;
  min?: number;
  rows?: number;
  disable?: boolean;
  defaultChecked?: boolean;
}

interface DynamicFormProps {
  schema: FieldConfig[];
}

const DynamicForm = ({ schema }: DynamicFormProps) => {
  const [formdata, setFormdata] = useState<Record<string, any>>({});
  const [collapse, setCollapse] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(formdata);
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormdata({ ...formdata, [name]: value });
  };

  const handleMultiSelect = (fieldName: string, selectedValues: string[]) => {
    setFormdata((prev) => ({
      ...prev,
      [fieldName]: selectedValues,
    }));
  };

  const renderField = (field: FieldConfig) => {
    switch (field.type) {
      case "text":
        return (
          <Input
            type="text"
            name={field.name}
            required={field.required}
            onChange={handleChange}
            className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-transparent"
          />
        );

      case "number":
        return (
          <Input
            type="number"
            name={field.name}
            required={field.required}
            min={field.min}
            max={field.max}
            onChange={handleChange}
            className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-transparent"
          />
        );

      case "select":
        return (
          <Select
            onValueChange={(value) => handleSelectChange(field.name, value)}
            required={field.required}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={`Select ${field.label}`}
                className="w-full"
              />
            </SelectTrigger>
            <SelectContent className="z-50 bg-gray-50 ">
              {field.options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "email":
        return (
          <Input
            type="email"
            name={field.name}
            required={field.required}
            onChange={handleChange}
            className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-transparent"
          />
        );
      case "date":
        return (
          // <Input
          //   type="date"
          //   name={field.name}
          //   required={field.required}
          //   onChange={handleChange}
          //   className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-transparent"
          // />

          <div className="flex flex-col gap-3">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="w-48 justify-between font-normal"
                >
                  {date ? date.toLocaleDateString() : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0  bg-gray-50"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setDate(date);
                    setFormdata({ ...formdata, [field.name]: date });
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        );
      case "textarea":
        return (
          <Textarea
            name={field.name}
            required={field.required}
            rows={field.rows}
            onChange={handleChange}
            className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-transparent"
          />
        );

      case "checkbox":
        return (
          <div className="flex gap-2">
            <Checkbox
              disabled={field.disable}
              name={field.name}
              required={field.required}
              defaultChecked={field.defaultChecked}
              id={field.cLabel}
              className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-transparent"
            />
            <Label className="capitalize" htmlFor={field.cLabel}>
              {field.cLabel}
            </Label>
          </div>
        );
      case "file":
        return (
          <Input
            type="file"
            required={field.required}
            className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-transparent"
          />
        );
      case "multiselect":
        return (
          <div className="w-full h-full">
            <MultiSelect
              key={field.name}
              options={field.options ?? []}
              selected={formdata[field.name] ?? []}
              onChange={(val) => handleMultiSelect(field.name, val)}
              placeholder={field.trigger}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card
      className={
        collapse
          ? "w-full max-w-xl  shadow-lg bg-blue-50 "
          : "w-full max-w-sm shadow-lg bg-blue-50 "
      }
    >
      <CardContent>
        <form
          className={
            collapse ? "grid gap-4  p-4 grid-cols-2" : "grid gap-4 p-4"
          }
          onSubmit={handleSubmit}
        >
          {schema.map((field) => (
            <div key={field.name} className="grid grid-cols-1 gap-1 w-full">
              <Label className="py-1 capitalize">{field.label} </Label>
              <div className="w-full">{renderField(field)}</div>
            </div>
          ))}
          <Button type="submit" className="border w-[40%] m-auto">
            Submit
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        {schema.length >= 5 && (
          <span
            className="cursor-pointer"
            onClick={() => setCollapse(!collapse)}
          >
            »
          </span>
        )}
      </CardFooter>
    </Card>
  );
};

export default DynamicForm;
