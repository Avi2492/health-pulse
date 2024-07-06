"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormFeild from "./CustomFormFeild";
import "react-phone-number-input/style.css";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFeildType } from "./PatientForm";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
      const userData = {
        name,
        email,
        phone,
      };
      const newUser = await createUser(userData);
      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-12 flex-1"
        >
          <section className="mb-12 space-y-4">
            <h1 className="header">Welcome, {user.name} 🖐️ </h1>
            <p className="text-dark-700">Let us know more about yourself.</p>
          </section>
          <section className="mb-12 space-y-4">
            <div className="mb-9 space-y-1">
              <h2 className="sub-header">Personal information.</h2>
            </div>
          </section>

          <CustomFormFeild
            feildType={FormFeildType.INPUT}
            control={form.control}
            name="name"
            label="Full Name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormFeild
              feildType={FormFeildType.INPUT}
              control={form.control}
              name="email"
              label="Email"
              placeholder="johndoe@gmail.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />
            <CustomFormFeild
              feildType={FormFeildType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone"
              placeholder="+1 123 456 7890"
            />
          </div>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormFeild
              feildType={FormFeildType.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Date of Birth"
            />
            <CustomFormFeild
              feildType={FormFeildType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => <FormControl></FormControl>}
            />
          </div>

          <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
