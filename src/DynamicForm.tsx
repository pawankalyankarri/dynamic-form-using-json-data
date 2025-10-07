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
import { Card, CardContent } from "./components/ui/card";
import { Textarea } from "./components/ui/textarea";
import { Checkbox } from "./components/ui/checkbox";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "./components/ui/dropdown-menu";
import { MultiSelect } from "./components/ui/multi-select";

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
  label: string;
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
  const [collapse,setCollapse] = useState<boolean>(false)

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
          <Input
            type="date"
            name={field.name}
            required={field.required}
            onChange={handleChange}
            className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-transparent"
          />
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
          <Checkbox
            disabled={field.disable}
            name={field.name}
            required={field.required}
            defaultChecked={field.defaultChecked}
            className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-transparent"
          />
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
          // <DropdownMenu>
          //   <DropdownMenuTrigger asChild className="w-full outline-0">
          //     <Button variant="outline" >{field.trigger}</Button>
          //   </DropdownMenuTrigger>
          //   <DropdownMenuContent className="z-50 bg-gray-50 w-full min-w-full">
          //     {field.options?.map(item=>{
          //         return(
          //           <DropdownMenuCheckboxItem
          //             className="w-full"
          //             key={item.label}
          //             checked={formdata[field.name]?.includes(item.value) ?? false}
          //             onCheckedChange={() => { handleMultiSelect(field.name, item.value); }}
          //           >
          //             {item.label}
          //           </DropdownMenuCheckboxItem>
          //         )
          //     })}
          //   </DropdownMenuContent>
          // </DropdownMenu>
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

      <Card className={collapse ? "w-full max-w-xl  shadow-lg bg-blue-50 " : "w-full max-w-sm shadow-lg bg-blue-50 "}>
        <CardContent>
          <form className={collapse ? "grid gap-4 p-4 grid-cols-2" : "grid gap-4 p-4"} onSubmit={handleSubmit}>
            {schema.map((field) => (
              <div key={field.name} className="grid grid-cols-1 gap-1 w-full">
                <Label className="py-1 capitalize">{field.label}: </Label>
                <div className="w-full">{renderField(field)}</div>
              </div>
            ))}
            <Button type="submit" className="border w-[40%] m-auto">
              Submit
            </Button>
            <span className="" onClick={()=>setCollapse(!collapse)}>big</span>
          </form>
        </CardContent>
      </Card>

  );
};

export default DynamicForm;
