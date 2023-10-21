import { Button, ButtonProps } from "primereact/button";

export default ({ children, className, ...props }: IButtonType) => {
  return (
    <Button className={className} {...props}>
      {children}
    </Button>
  );
};

type IButtonType = {
  label?: string;
  className?: string;
} & ButtonProps;
