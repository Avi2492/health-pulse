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

import { Doctors, GenderOptions, IdentificationTypes } from "@/constants";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";

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
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.change}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option) => (
                      <div key={option} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>

          <div className="flex flex-col gap-6  xl:flex-row">
            <CustomFormFeild
              feildType={FormFeildType.INPUT}
              control={form.control}
              name="address"
              label="Address"
              placeholder="14, Street, New york"
            />
            <CustomFormFeild
              feildType={FormFeildType.INPUT}
              control={form.control}
              name="occupation"
              label="Occupation"
              placeholder="Software Engineer"
            />
          </div>
          <div className="flex flex-col gap-6  xl:flex-row">
            <CustomFormFeild
              feildType={FormFeildType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Emergency Contact Name"
              placeholder="Guardian's name"
            />
            <CustomFormFeild
              feildType={FormFeildType.PHONE_INPUT}
              control={form.control}
              name="emergencyContactNumber"
              label="Emergency Contact Number"
            />
          </div>

          <section className="space-y-6">
            <div className="mb-9 space-y-1">
              <h2 className="sub-header">Medical Information 💉</h2>
            </div>
          </section>

          <CustomFormFeild
            feildType={FormFeildType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary Physician"
            placeholder="Select a Physician"
          >
            {Doctors.map((doctor) => (
              <SelectItem key={doctor.name} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt={doctor.name}
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormFeild>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormFeild
              feildType={FormFeildType.INPUT}
              control={form.control}
              name="insuranceProvider"
              label="Insurance Provider"
              placeholder="BlueCross BlueShield"
            />
            <CustomFormFeild
              feildType={FormFeildType.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="Insurance Policy Number"
              placeholder="ABC1234567890"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormFeild
              feildType={FormFeildType.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Allergies (if any)"
              placeholder="Peanuts, Penicillin, Sugar"
            />
            <CustomFormFeild
              feildType={FormFeildType.TEXTAREA}
              control={form.control}
              name="currentMedication"
              label="Current medication (if any)"
              placeholder="Ibuprofen 200mg, Paracetamol 500mg"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormFeild
              feildType={FormFeildType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label="Family medical history (if any)"
              placeholder="Something Mention about your Past Family Medical if have"
            />
            <CustomFormFeild
              feildType={FormFeildType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Past medical history (if any)"
              placeholder="Something Mention about your Past Medical history if have"
            />
          </div>

          <section className="space-y-6">
            <div className="mb-9 space-y-1">
              <h2 className="sub-header">Identification & Verification 🕵️</h2>
            </div>
          </section>

          <CustomFormFeild
            feildType={FormFeildType.SELECT}
            control={form.control}
            name="identificationType"
            label="Identification Type"
            placeholder="Select an identification type"
          >
            {IdentificationTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormFeild>

          <CustomFormFeild
            feildType={FormFeildType.INPUT}
            control={form.control}
            name="identificationNumber"
            label="Identification number"
            placeholder="1234567890"
          />

          <CustomFormFeild
            feildType={FormFeildType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Scanned Copy of Document"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />

          <section className="space-y-6">
            <div className="mb-9 space-y-1">
              <h2 className="sub-header">Consent & Privacy ✍️</h2>
            </div>
          </section>

          <CustomFormFeild
            feildType={FormFeildType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="I consent to treatment"
          />
          <CustomFormFeild
            feildType={FormFeildType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="I consent to disclosure of information"
          />
          <CustomFormFeild
            feildType={FormFeildType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="I consent to terms conditions & privacy policy"
          />

          <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
