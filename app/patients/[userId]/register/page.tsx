import AppLogo from "@/components/AppLogo";
import RegisterForm from "@/components/forms/RegisterForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  const patient = await getPatient(userId);

  if (patient) {
    redirect(`/patients/${userId}/new-appointment`);
  }

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-col flex-1 py-10">
          <div className="mb-12">
            <AppLogo />
          </div>

          <RegisterForm user={user} />

          <div className="flex justify-center items-center text-center">
            <p className="copyright py-12">
              All &copy; {new Date().getFullYear()} Reserved by spheri
              <span className="text-orange-500">soft</span>
            </p>
          </div>
        </div>
      </section>
      <Image
        src={"/assets/images/register-img.png"}
        height={1000}
        width={1000}
        alt="form-img"
        className="side-img max-w-[390px] h-screen"
      />
    </div>
  );
};

export default Register;
