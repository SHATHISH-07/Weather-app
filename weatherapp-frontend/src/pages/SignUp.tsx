import { useState } from "react";
import { ApolloError } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SIGNUP } from "../graphql/mutations/signup";

interface SignUpProps {
  createUser: {
    id: string;
    name: string;
    username: string;
    city: string;
    state: string;
    country: string;
  };
}

const SignUp = () => {
  const navigate = useNavigate();

  const [signUpUser, { loading }] = useMutation<SignUpProps>(SIGNUP);

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    username: "",
    city: "",
    state: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.username || !form.city) {
      setError("Please fill all fields.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.state ||
      !form.country ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please fill all fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await signUpUser({
        variables: {
          username: form.username,
          password: form.password,
          name: form.name,
          city: form.city,
          state: form.state,
          country: form.country,
        },
      });

      setError("");
      console.log("Signup successful");
      navigate("/login");
    } catch (err: unknown) {
      const error = err as ApolloError;
      setError(error.message || "Signup failed");
    }
  };

  return (
    <div className="flex mt-[50px] md:mt-[65px] justify-center items-center min-h-screen bg-[#f3f4f6] dark:bg-[#1c1c1e] overflow-y-auto p-4">
      <div className="bg-white dark:bg-[#121212] text-gray-100 p-6 sm:p-8 rounded-lg shadow-lg max-w-md w-full mx-4 space-y-10">
        <h2 className="text-2xl sm:text-3xl font-medium text-black dark:text-white text-center">
          Sign Up
        </h2>

        <form
          onSubmit={step === 1 ? handleNext : handleSubmit}
          className="space-y-6"
        >
          {step === 1 ? (
            <>
              {/* Step 1 fields */}
              {["name", "username", "city"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2 capitalize">
                    {field}:
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={form[field as keyof typeof form]}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg border border-black dark:border-white text-black dark:text-white bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>
              ))}
            </>
          ) : (
            <>
              {/* Step 2 fields */}
              {["state", "country"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2 capitalize">
                    {field}:
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={form[field as keyof typeof form]}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg border border-black dark:border-white text-black dark:text-white bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg border border-black dark:border-white text-black dark:text-white bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg border border-black dark:border-white text-black dark:text-white bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>
            </>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-[#1d1d1d] dark:bg-[#2e2e2e] hover:bg-[#3e3e3e] text-white font-medium py-3 rounded-lg focus:ring-2 focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : step === 1 ? "Next" : "Sign Up"}
          </button>
        </form>

        {step === 2 && (
          <button
            onClick={() => setStep(1)}
            className="w-full text-blue-500 hover:underline text-md text-center"
          >
            &larr; Back
          </button>
        )}

        <p className="text-md text-black dark:text-white text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
