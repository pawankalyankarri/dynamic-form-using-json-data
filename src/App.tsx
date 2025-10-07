import DynamicForm from "./DynamicForm";
import type { FieldConfig } from "./DynamicForm";

import MyFormSchemaJson from "./form.json";
// const formSchema: FieldConfig[] = [
//   { name: "name", label: "Name", type: "text", required: true },
//   { name: "phone", label: "Phone Number", type: "text", max: 10, min: 10 },
//   {
//     name: "gender",
//     label: "Gender",
//     type: "select",
//     options: [
//       { label: "Male", value: "male" },
//       { label: "Female", value: "female" },
//     ],
//   },
// ];


function App() {

  const MyFormSchema: FieldConfig[] = MyFormSchemaJson as FieldConfig[];

  return (
    <div className="  grid place-items-center h-screen">
      <DynamicForm schema={MyFormSchema} />
    </div>
  );
}

export default App;
