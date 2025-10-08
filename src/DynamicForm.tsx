import { useState, type FormEvent } from "react";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompress, faEye, faEyeSlash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Input } from "./components/ui/input";
import { SelectValue } from "@radix-ui/react-select";
import { Card, CardContent, CardFooter } from "./components/ui/card";
import { Textarea } from "./components/ui/textarea";
import { Checkbox } from "./components/ui/checkbox";

import { MultiSelect } from "./components/ui/multi-select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "./components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Switch } from "./components/ui/switch";

type FieldType =
  | "text"
  | "number"
  | "select"
  | "email"
  | "date"
  | "textarea"
  | "checkbox"
  | "file"
  | "multiselect"
  | "radio"
  | "switch"
  | "inputmap"
  | "keyvalue"
  | "password";

export interface FieldConfig {
  name: string;
  label?: string;
  cLabel?: string;
  type: FieldType;
  required?: boolean;
  options?: { label: string; value: string }[];
  keyPlaceholder?: string;
  valuePlaceholder?: string;
  trigger?: string;
  max?: number;
  min?: number;
  rows?: number;
  disable?: boolean;
  defaultChecked?: boolean;
  checked?: boolean;
}

interface DynamicFormProps {
  schema: FieldConfig[];
}

const DynamicForm = ({ schema }: DynamicFormProps) => {
  const [formdata, setFormdata] = useState<Record<string, any>>({});
  const [collapse, setCollapse] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [inputList, setInputList] = useState<{id:number, name: string; value: string }[]>([]);
  const [keyValueList, setKeyValueList] = useState<Record<string,string>[]>([]);
  const [key, setKey] = useState<string>("");
  const [value, setValue] = useState<string>("");
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
    e.preventDefault()
    console.log('iputlist',inputList)
    const values = inputList.map(item=> item.value);
    values.push(...formdata['task'])
    setFormdata({...formdata, task: values})

    console.log("formdata", formdata);

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

  const handleInputMap = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]:[value]  });
    console.log("formdata", formdata);
  }
  const handleInputMapChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log('inputlist',inputList);
    const updatedList = inputList.map((item) => 
      item.id.toString() === name ? { ...item, value: value } : item
    );
    console.log("updatedList", updatedList);

    setInputList(updatedList);
    
    


    // const values = inputList.map(item=> item.value);
    // values.push(...formdata['task'])
    // setFormdata({...formdata, task: values})

    // const values = updatedList
    // .filter(item => item.name === name)
    
    // console.log("values", values);
    // setFormdata({ ...formdata, [name]: values  });
  };

  const createInput = (name:string) => {

    setInputList([...inputList, { id:Date.now(), name: name, value: "" }]);
    console.log(inputList);
  };



        const handleKeyValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          if (name.startsWith("key-")) {
            setKey(value);
          } else if (name.startsWith("value-")) {
            setValue(value);
          }

        };
        const addKeyValuePair = () => {
          if(key && value){
            const newPair = { [key]: value };
            setKey("");
            setValue("");
            setKeyValueList([...keyValueList, newPair]);
            setFormdata({ ...formdata, "keyValueData": [...keyValueList, newPair] });
          console.log("keyValueList", keyValueList);
        };
        }


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
      case "radio":
        return (
          <RadioGroup
            name={field.name}
            onValueChange={(val) => handleSelectChange(field.name, val)}
          >
            {field.options?.map((item) => {
              return (
                <div className="flex gap-2" key={item.value}>
                  <RadioGroupItem value={item.value} id={item.label} />
                  <Label htmlFor={item.label}>{item.label}</Label>
                </div>
              );
            })}
          </RadioGroup>
        );
      case "switch":
        const handleSwitchChange = (value: boolean) => {
          setFormdata({ ...formdata, [field.name]: value });
          console.log(formdata)
        }
        return (
          <div className="flex gap-2  ">
            <Switch id={field.cLabel} className=""  onCheckedChange={handleSwitchChange} />
            <Label className="capitalize" htmlFor={field.cLabel}>
              {field.cLabel}
            </Label>
            
          </div>
        );
      case "inputmap":
        return (
          <div className="">
            <div className="flex gap-2 relative">
              <Input
                type="text"
                name={field.name}
                required={field.required}
                onChange={handleInputMap}
                className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-transparent"
              />
              <span
                className="absolute right-3 top-1"
                onClick={() => createInput(field.name)}
              >
                
                <FontAwesomeIcon icon={faPlus} />
              </span>
            </div>
            {inputList.map((item,idx) => {
              // console.log("item", item);
              return (
                <div key={idx} className=" mt-2 relative">
                  <Input
                    type="text"
                    name={item.id.toString()}
                    required={field.required}
                    onChange={handleInputMapChange}
                    value={item.value}
                    className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-transparent"
                  />
                  <span className="absolute right-2 top-1.5" onClick={()=>setInputList(inputList.filter(obj=> obj.id != item.id ))}>❌</span>
                </div>
              );
            })}
          </div>
        );
      case "keyvalue":
        return (
          <div className="flex flex-col gap-2"> 
            <div className="flex gap-2">
              <Input
                type="text"
                name={"key-"+field.name}
                placeholder="Key"
                value={key}
                onChange={handleKeyValueChange}
                
                className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-transparent"
              />
              <Input
                type="text"
                name={"value-"+field.name}
                placeholder="Value"
                value={value}
                onChange={handleKeyValueChange}
                className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-transparent"
              />
            </div>
            <Button variant={"outline"} type="button" className="m-auto" onClick={addKeyValuePair}  >Add</Button>
          </div>
        );
        case "password" : 
        const [showPassword, setShowPassword] = useState<boolean>(false);
        return (
          
          <div className="flex gap-2 items-center relative">
          <Input
            type={showPassword ? "text" : "password"}
            name={field.name}
            required={field.required} 
            onChange={handleChange}
            className="focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-transparent"
          />
          <span className="absolute top-1.5 right-2" onClick={()=>{setShowPassword((prev)=>!prev)}}>{showPassword ? <FontAwesomeIcon icon={faEye}/> : <FontAwesomeIcon icon={faEyeSlash}/>}</span>
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
          <div className={collapse ? "col-span-2 w-[40%] m-auto" : " w-[40%] m-auto "}>
         <Button type="submit" className="border w-[100%] m-auto ">
            Submit
          </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        {schema.length >= 5 && (
          <span
            className="cursor-pointer"
            onClick={() => setCollapse(!collapse)}
          >
            <FontAwesomeIcon icon={faCompress} />
          </span>
        )}
         
      </CardFooter>
    </Card>
  );
};

export default DynamicForm;
