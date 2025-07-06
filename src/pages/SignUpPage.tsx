import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth"; // Make sure this path is correct

type SignUpFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>();

  const { signUp } = useAuth();

  const onSubmit = async (data: SignUpFormData) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await signUp(data.email, data.password);
      toast.success(
        "Sign up successful! Please check your email for verification."
      );
    } catch (error: any) {
      toast.error(error.message || "Sign up failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 relative">
      {/* Background */}
      <AuthBackground />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md z-10"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Create an Account
        </h2>

        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
          Email
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is not valid",
              },
            })}
            className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </label>

        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
          Password
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </label>

        <label className="block mb-6 font-medium text-gray-700 dark:text-gray-300">
          Confirm Password
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            className="w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn w-full py-2"
        >
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

// Don't forget to import your AuthBackground component or replace it with your background component
import AuthBackground from "../components/ui/AuthBackground";
