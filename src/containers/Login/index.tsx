import "./style.scss";
import { useForm } from "@/hooks";
import { ILoginFormData } from "@/types";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useAPIContext } from "@/contexts/API";

const inputs = [
  {
    name: "username",
    type: "text",
    placeholder: "Enter username",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter password",
  },
];

export default () => {
  const { login } = useAPIContext();

  const { handleChange, handleSubmit, values, errors } = useForm(() => login(values), validate);

  return (
    <div className="login-page w-full flex justify-center items-center text-primary-600">
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <h2 className="text-header-2 uppercase">Login</h2>
        {inputs.map((input) => {
          const hasError = errors[input.name];
          return (
            <Input
              key={input.name}
              wrapperClass="mt-2"
              className="w-full"
              hasError={hasError}
              onChange={handleChange}
              {...input}
            />
          );
        })}

        <Button size="small" className="w-full !mt-2 bg-primary-600" label="Submit" type="submit" />
      </form>
    </div>
  );
};

export function validate(values: ILoginFormData) {
  let errors = {} as ILoginFormData;

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be 8 or more characters";
  } else if (!/\d/.test(values.password)) {
    errors.password = "Password must contain atleast 1 number";
  } else if (!/[!@#$%&?]/g.test(values.password)) {
    errors.password = "Password must contain atleast 1 special character";
  } else if (!/[A-Z]/g.test(values.password)) {
    errors.password = "Password must contain atleast 1 capitol letter";
  }
  return errors;
}
