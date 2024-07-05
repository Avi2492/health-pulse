import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { FormFeildType } from "./PatientForm";
import { Control } from "react-hook-form";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core";

interface CustomFormFeildProps {
  control: Control<any>;
  feildType: FormFeildType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderInput = ({
  field,
  props,
}: {
  field: any;
  props: CustomFormFeildProps;
}) => {
  const { feildType, iconSrc, iconAlt, placeholder } = props;

  switch (props.feildType) {
    case FormFeildType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case FormFeildType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="IN"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );
    default:
      break;
  }
};

const CustomFormFeild = (props: CustomFormFeildProps) => {
  const { control, feildType, name, label } = props;
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex-1">
            {feildType !== FormFeildType.CHECKBOX && label && (
              <FormLabel>{label}</FormLabel>
            )}
            <RenderInput field={field} props={props} />

            <FormMessage className="shad-error" />
          </FormItem>
        )}
      />
    </>
  );
};

export default CustomFormFeild;
