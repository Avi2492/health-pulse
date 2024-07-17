import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";

// interface AppointmentProps {
//   setOpen: (open: boolean) => void;
// }

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-col flex-1 py-10">
          <Image
            src={"/assets/icons/logo-full.svg"}
            height={1000}
            width={1000}
            alt="home-logo"
            className="mb-12 h-10 w-fit"
          />

          <AppointmentForm
            patientId={patient?.$id}
            userId={userId}
            type="create"
          />

          <div className="flex justify-center items-center text-center">
            <p className="copyright py-12">
              All &copy; {new Date().getFullYear()} Reserved by spheri
              <span className="text-orange-500">soft</span>
            </p>
          </div>
        </div>
      </section>
      <Image
        src={"/assets/images/appointment-img.png"}
        height={1000}
        width={1000}
        alt="form-img"
        className="side-img max-w-[390px] h-screen"
      />
    </div>
  );
};

export default NewAppointment;
