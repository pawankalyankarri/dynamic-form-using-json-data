import DynamicForm from "./DynamicForm";
import type { FieldConfig } from "./DynamicForm";

import MyFormSchemaJson from "./form.json";
import Sample from "./Sample";

function App() {

  const MyFormSchema: FieldConfig[] = MyFormSchemaJson as FieldConfig[];

  return (
    <div className="grid place-items-center h-screen">
     {/* <div className="w-full"> <Sample/></div> */}
      <DynamicForm schema={MyFormSchema} />
    </div>
  );
}

export default App;
