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
import { useUserStore } from "../stores/userStore";

export default function Login() {
  const navigate = useNavigate();
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const { fetchCurrentUser } = useUserStore();

  const {
    handleSubmit,
    register,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  });

  const [login] = useMutation(LOGIN_MUTATION);

  const submit = async (loginData: LoginInputs) => {
    try {
      const response = await login({ variables: { input: loginData } });

      if (response.data?.login) {
        localStorage.setItem("token", response.data.login);
        await fetchCurrentUser();
        toast.success("Login successful!");
        navigate("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Login failure: ", error);
      if (error.graphQLErrors.length > 0) {
        const errorMessage = error.graphQLErrors[0].message;

        if (errorMessage.includes("Invalid username or email")) {
          setError("usernameOrEmail", {
            type: "manual",
            message: "Invalid username or email. Please try again.",
          });
        } else if (errorMessage.includes("Invalid password")) {
          setError("password", {
            type: "manual",
            message: "Incorrect password. Please try again.",
          });
        } else {
          toast.error(errorMessage);
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
            Nest Fit
          </h1>
          <p className="text-[15px] text-zinc-400">Welcome back</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(submit)}>
          <div className="space-y-5">
            {/* Username/Email Input */}
            <div>
              <div className="group relative rounded-xl border border-zinc-800 focus-within:border-zinc-600 transition-colors duration-200">
                <input
                  type="text"
                  placeholder="Username or email"
                  {...register("usernameOrEmail")}
                  className="block w-full rounded-xl bg-transparent px-4 py-4 text-[15px] font-light text-white placeholder-zinc-500 focus:outline-none"
                />
              </div>
              {errors.usernameOrEmail && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.usernameOrEmail.message}
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
                <span>Logging in...</span>
              </div>
            ) : (
              "Log in"
            )}
          </button>
        </form>

        <p className="text-center text-[15px] text-zinc-500">
          Don't have an account?{" "}
          <Link
            to="/auth/signup"
            className="font-medium text-white hover:text-zinc-300 transition-colors duration-200"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
