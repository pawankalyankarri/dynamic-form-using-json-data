import { MultiSelect } from "@/components/ui/multi-select";
import { useState } from "react";
 
const Sample = () => {
    
const educationOptions = [
  { label: "10th", value: "10th" },
  { label: "Inter", value: "inter" },
  { label: "Graduation", value: "graduation" },
];

const [selectedEducation, setSelectedEducation] = useState<string[]>([]);
return(
<MultiSelect
  options={educationOptions}
  selected={selectedEducation}
  onChange={setSelectedEducation}
  placeholder="Select education"
  label="Education"
/>
)}
export default Sample;

