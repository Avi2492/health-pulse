"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormFeild, { FormFeildType } from "./CustomFormFeild";
import "react-phone-number-input/style.css";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { getAppointmentSchema } from "@/lib/validation";

import { SelectItem } from "../ui/select";
import { Doctors } from "@/constants";
import {
  createAppointment,
  updateAppointment,
} from "@/lib/actions/appointment.action";
import { Appointment } from "@/types/appwrite.types";

interface AppointmentProps {
  userId: string;
  patientId: string;
  type: "create" | "cancel" | "schedule";
  appointment?: Appointment;
  setOpen: (open: boolean) => void;
}

const AppointmentForm = ({
  userId,
  patientId,
  type = "create",
  appointment,
  setOpen,
}: AppointmentProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment?.primaryPhysician : "",
      schedule: appointment
        ? new Date(appointment?.schedule)
        : new Date(Date.now()),
      reason: appointment ? appointment?.reason : "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation>
  ) => {
    setIsLoading(true);

    let status;

    switch (type) {
      case "schedule":
        status = "schedule";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
    }

    try {
      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          status: status as Status,
          note: values.note,
        };

        const appointment = await createAppointment(appointmentData);

        if (appointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          );
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id!,
          patientId,
          appointment: {
            primaryPhysician: values?.primaryPhysician,
            schedule: new Date(values?.schedule),
            status: status as Status,
            cancellationReason: values?.cancellationReason,
          },
          type,
        };

        const updatedAppointment = await updateAppointment(appointmentToUpdate);

        if (updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
    setIsLoading(false);
  };

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      buttonLabel = "Submit Appointment";
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 flex-1"
        >
          {type === "create" && (
            <section className="mb-12 space-y-4">
              <h1 className="header">New Appointment 🖐️</h1>
              <p className="text-dark-700">
                Request a new appointment in 10 seconds.
              </p>
            </section>
          )}

          {type !== "cancel" && (
            <>
              <div className="flex flex-col gap-2 xl:flex-col">
                <CustomFormFeild
                  feildType={FormFeildType.SELECT}
                  control={form.control}
                  name="primaryPhysician"
                  label="Doctor"
                  placeholder="Select a doctor"
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

                <CustomFormFeild
                  feildType={FormFeildType.DATE_PICKER}
                  control={form.control}
                  name="schedule"
                  label="Expected appointment date"
                  placeholder="Select Date"
                  showTimeSelect
                  dateFormat="MM/dd/yyyy - h:mm aa"
                />
              </div>

              <div className="flex flex-col gap-6 xl:flex-row">
                <CustomFormFeild
                  feildType={FormFeildType.TEXTAREA}
                  control={form.control}
                  name="reason"
                  label="Reason for appointment"
                  placeholder="Enter Reason for appointment (Required)"
                />
                <CustomFormFeild
                  feildType={FormFeildType.TEXTAREA}
                  control={form.control}
                  name="note"
                  label="Descripition"
                  placeholder="Enter Descripition (Optional)"
                />
              </div>
            </>
          )}

          {type === "cancel" && (
            <CustomFormFeild
              feildType={FormFeildType.TEXTAREA}
              control={form.control}
              name="cancellationReason"
              label="Reason for Cancellation"
              placeholder="Enter Reason for Cancellation (Required)"
            />
          )}

          <SubmitButton
            isLoading={isLoading}
            className={`${
              type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
            } w-full`}
          >
            {buttonLabel}
          </SubmitButton>
        </form>
      </Form>
    </>
  );
};

export default AppointmentForm;
