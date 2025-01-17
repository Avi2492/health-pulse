import React from "react";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";

interface ButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}
const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  return (
    <>
      <Button
        type="submit"
        disabled={isLoading}
        className={className ?? "shad-primary-btn w-full"}
      >
        {isLoading ? (
          <div className="flex items-center gap-4">
            <LoaderCircle className="animate-spin" size={24} />
            Loading...
          </div>
        ) : (
          children
        )}
      </Button>
    </>
  );
};

export default SubmitButton;
