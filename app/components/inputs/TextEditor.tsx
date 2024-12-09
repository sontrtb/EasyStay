import dynamic from "next/dynamic";
import { Controller } from "react-hook-form";
import "react-quill/dist/quill.snow.css"; // Import the necessary Quill styles

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false }); // Disable SSR

interface TextEditorProps {
  control: any;
  id: string;
  label: string;
  disabled?: boolean;
  errors: any;
  defaultValue?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({
  control,
  id,
  label,
  disabled,
  errors,
  defaultValue,
}) => {
  return (
    <div className="w-full relative">
      <label
        className={`text-md ${errors[id] ? "text-rose-500" : "text-zinc-400"}`}
      >
        {label}
      </label>
      <Controller
        name={id}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <ReactQuill
            value={value || defaultValue}
            onChange={onChange}
            theme="snow"
            readOnly={disabled}
            className={`mt-2 h-52 ${
              errors[id] ? "border-rose-500" : "border-neutral-300"
            }`}
          />
        )}
      />
      {errors[id] && (
        <p className="text-rose-500 text-sm mt-1">
          {errors[id].message || "This field is required"}
        </p>
      )}
    </div>
  );
};

export default TextEditor;
