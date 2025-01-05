import { useForm } from "react-hook-form";
import { LoginInputs } from "../../types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/authSchema";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../../graphql/mutations";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [login] = useMutation(LOGIN_MUTATION, {
    onError: (error) => {
      if (error.graphQLErrors.length > 0) {
        toast.error(error.graphQLErrors[0].message);
      } else if (error.networkError) {
        toast.error("Network error, please try again later.");
      } else {
        toast.error("An unknown error occurred.");
      }
    },
  });
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  });

  const submit = async (loginData: LoginInputs) => {
    try {
      const response = await login({ variables: { input: loginData } });

      if (response.data?.login) {
        console.log("Login success: ", response.data);
        localStorage.setItem("token", response.data.login);
        toast.success("Login successful!");

        navigate("/");
      }
    } catch (error) {
      console.log("Login failure: ", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen text-white mx-10 md:mx-20">
      <h1 className="font-semibold text-[18px] sm:text-[20px] md:text-[22px] lg:text-[26px] text-gray-300">
        Log in to your Nest Fit account
      </h1>

      <form
        className="flex flex-col gap-3 w-full sm:w-[350px] md:w-[450px] lg:w-[500px]"
        onSubmit={handleSubmit(submit)}
      >
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
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
      <p className="text-gray-400 text-sm">
        Don't have an account?{" "}
        <Link to="/auth/signup" className="text-blue-400 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
