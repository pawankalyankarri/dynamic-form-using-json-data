import DynamicForm from "./DynamicForm";
import type { FieldConfig } from "./DynamicForm";

import MyFormSchemaJson from "./form.json";

function App() {

  const MyFormSchema: FieldConfig[] = MyFormSchemaJson as FieldConfig[];

  return (
    <div className="grid place-items-center h-screen w-full">

      <DynamicForm schema={MyFormSchema} />

    </div>
  );
}

export default App;
