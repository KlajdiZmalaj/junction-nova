import { InputText, InputTextProps } from "primereact/inputtext";
import "./style.scss";
export default ({ wrapperClass, hasError, ...props }: IInputProps) => {
  return (
    <div className={"inputWrapper gap-2 " + wrapperClass}>
      <InputText
        aria-describedby={"input-" + props.name}
        {...props}
        className={hasError ? props.className + " p-invalid " : props.className}
      />
      {hasError && <small>{hasError}</small>}
    </div>
  );
};

type IInputProps = {
  wrapperClass?: string;
  hasError?: boolean;
} & InputTextProps;
