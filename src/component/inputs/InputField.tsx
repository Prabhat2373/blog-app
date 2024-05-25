import { Label } from "@/components/ui/label";
import classNames from "classnames";
import React, { ComponentProps } from "react";
import Asterisk from "../form/Asterisk";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { Input } from "@/components/ui/input";
import InputError from "../form/InputError";

interface TInputField extends ComponentProps<"input"> {
  label?: string;
  required?: boolean;
}

const InputField = (props: TInputField) => {
  const { label, required } = props;
  const { errors, touched } = useFormikContext();
  return (
    <div className="flex flex-col gap-2">
      <Label
        htmlFor={props?.name}
        className={classNames({
          hidden: !label,
        })}
      >
        {label} {required && <Asterisk />}
      </Label>
      <Field
        as={Input}
        className={classNames({
          "border border-red-500 placeholder:text-red-500 ":
            errors?.[props?.name] && touched?.[props?.name],
        })}
        {...props}
        required={false}
      />
      <ErrorMessage name={props.name} component={InputError} />
    </div>
  );
};

export default InputField;
