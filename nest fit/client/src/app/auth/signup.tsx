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
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen text-white mx-10 md:mx-20">
      <h1 className="font-semibold text-[18px] sm:text-[20px] md:text-[22px] lg:text-[26px] text-gray-300">
        Create your Nest Fit account
      </h1>

      <form
        className="flex flex-col gap-3 w-full sm:w-[350px] md:w-[450px] lg:w-[500px]"
        onSubmit={handleSubmit(submit)}
      >
        {/* Name Input */}
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="Full Name"
            {...register("name")}
            className="bg-custom-gray w-full p-3 rounded-md focus:outline-none font-light text-[14px] sm:text-[16px]"
          />
          {errors.name && (
            <span className="text-red-400 text-[12px] font-medium px-2">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Username Input */}
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="Username"
            {...register("username")}
            className="bg-custom-gray w-full p-3 rounded-md focus:outline-none font-light text-[14px] sm:text-[16px]"
          />
          {errors.username && (
            <span className="text-red-400 text-[12px] font-medium px-2">
              {errors.username.message}
            </span>
          )}
        </div>

        {/* Email Input */}
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="Email"
            {...register("email")}
            className="bg-custom-gray w-full p-3 rounded-md focus:outline-none font-light text-[14px] sm:text-[16px]"
          />
          {errors.email && (
            <span className="text-red-400 text-[12px] font-medium px-2">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Password Input */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center bg-custom-gray p-3 rounded-md w-full">
            <input
              type={viewPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className="bg-transparent w-full focus:outline-none font-light text-[14px] sm:text-[16px]"
            />
            <div
              className="cursor-pointer"
              onClick={() => setViewPassword(!viewPassword)}
            >
              {viewPassword ? (
                <EyeOff className="text-gray-400" width={20} />
              ) : (
                <Eye className="text-gray-400" width={20} />
              )}
            </div>
          </div>
          {errors.password && (
            <span className="text-red-400 text-[12px] font-medium px-2">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-md transition duration-300 font-medium text-[14px] sm:text-[16px]"
        >
          {isSubmitting ? (
            <>
              <Loader className="animate-spin" size={20} />
              Signing up...
            </>
          ) : (
            "Sign up"
          )}
        </button>
      </form>
      <p className="text-gray-400 text-sm">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-blue-400 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
