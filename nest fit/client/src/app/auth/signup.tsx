import { useForm } from "react-hook-form";
import { SignupInputs } from "../../types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../schemas/authSchema";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGNUP_MUTATION } from "../../graphql/mutations";
import { toast } from "react-toastify";
import { useUserStore } from "../stores/userStore";

export default function Signup() {
  const navigate = useNavigate();
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const [signup] = useMutation(SIGNUP_MUTATION);
  const { fetchCurrentUser } = useUserStore();

  const {
    handleSubmit,
    register,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<SignupInputs>({
    resolver: zodResolver(signupSchema),
  });

  const submit = async (data: SignupInputs) => {
    try {
      const response = await signup({ variables: { input: data } });
      if (response.data?.createUser) {
        localStorage.setItem("token", response.data?.createUser);
        await fetchCurrentUser();
        toast.success("Signup successful!");
        navigate("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Signup error: ", error);
      if (error.graphQLErrors.length > 0) {
        const message = error.graphQLErrors[0].message;

        // Handle duplicate username error
        if (message.includes(`uni_users_username`)) {
          setError("username", {
            type: "manual",
            message: "Username is already taken.",
          });
          toast.error("Username is already taken.");
        }

        // Handle duplicate email error
        if (message.includes(`uni_users_email`)) {
          setError("email", {
            type: "manual",
            message: "Email is already in use.",
          });
          toast.error("Email is already in use.");
        }
      } else if (error.networkError) {
        toast.error("Network error, please try again later.");
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-[350px] space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-[28px] font-semibold tracking-tight text-white">
            Create account
          </h1>
          <p className="text-[15px] text-zinc-400">Join Nest Fit today</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(submit)}>
          <div className="space-y-5">
            {/* Name Input */}
            <div>
              <div className="group relative rounded-xl border border-zinc-800 focus-within:border-zinc-600 transition-colors duration-200">
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("name")}
                  className="block w-full rounded-xl bg-transparent px-4 py-4 text-[15px] font-light text-white placeholder-zinc-500 focus:outline-none"
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Username Input */}
            <div>
              <div className="group relative rounded-xl border border-zinc-800 focus-within:border-zinc-600 transition-colors duration-200">
                <input
                  type="text"
                  placeholder="Username"
                  {...register("username")}
                  className="block w-full rounded-xl bg-transparent px-4 py-4 text-[15px] font-light text-white placeholder-zinc-500 focus:outline-none"
                />
              </div>
              {errors.username && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <div className="group relative rounded-xl border border-zinc-800 focus-within:border-zinc-600 transition-colors duration-200">
                <input
                  type="text"
                  placeholder="Email"
                  {...register("email")}
                  className="block w-full rounded-xl bg-transparent px-4 py-4 text-[15px] font-light text-white placeholder-zinc-500 focus:outline-none"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <div className="group relative rounded-xl border border-zinc-800 focus-within:border-zinc-600 transition-colors duration-200">
                <input
                  type={viewPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                  className="block w-full rounded-xl bg-transparent px-4 py-4 text-[15px] font-light text-white placeholder-zinc-500 focus:outline-none pr-12"
                />
                <button
                  type="button"
                  onClick={() => setViewPassword(!viewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-400 transition-colors duration-200"
                >
                  {viewPassword ? <EyeOff width={20} /> : <Eye width={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="relative w-full rounded-xl bg-white py-4 text-[15px] font-medium text-black transition-all duration-200 hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <Loader className="animate-spin text-black" size={20} />
                <span>Creating account...</span>
              </div>
            ) : (
              "Create account"
            )}
          </button>
        </form>

        <p className="text-center text-[15px] text-zinc-500">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="font-medium text-white hover:text-zinc-300 transition-colors duration-200"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
