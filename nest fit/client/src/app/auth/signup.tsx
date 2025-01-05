import { useForm } from "react-hook-form";
import { SignupInputs } from "../../types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../schemas/authSchema";

export default function Signup() {
  const { handleSubmit, register } = useForm<SignupInputs>({
    resolver: zodResolver(signupSchema),
  });
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen text-white">
      <h1 className="font-[500] text-[16px]">Create your Nest Fit account</h1>
      <form onSubmit={handleSubmit(() => {})}>
        <div className="flex items-center gap-2 px-2 py-3 rounded-md">
          <input
            type="text"
            placeholder="Username"
            {...register("email")}
            className="bg-gray-200"
          />
        </div>
      </form>
    </div>
  );
}
