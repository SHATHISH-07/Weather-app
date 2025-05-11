import { useMutation, useApolloClient } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LOGIN } from "../graphql/mutations/login";
import { GET_CURRENT_USER } from "../graphql/queries/getCurrentUser";
import { setUser, clearUser } from "../app/features/user/userSlice";

interface LoginResponse {
  login: {
    token: string;
  };
}

interface UserState {
  id: string;
  name: string;
  username: string;
  city: string;
  state: string;
  country: string;
}

interface CurrentUserResponse {
  getCurrentUser: UserState | null;
}

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const client = useApolloClient();

  const [login, { loading }] = useMutation<LoginResponse>(LOGIN);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      // console.log("Attempting login with:", { username, password });
      const loginResult = await login({ variables: { username, password } });
      const token = loginResult.data?.login?.token;
      // console.log("Login result:", loginResult);

      if (token) {
        localStorage.setItem("token", token);
        console.log("Token stored:", token);

        const { data } = await client.query<CurrentUserResponse>({
          query: GET_CURRENT_USER,
          fetchPolicy: "network-only",
        });
        // console.log("Current user data:", data);

        if (data?.getCurrentUser) {
          dispatch(setUser(data.getCurrentUser));

          navigate("/");
        } else {
          console.error("No user data returned from GET_CURRENT_USER");
          setErrorMessage("Failed to fetch user data. Please try again.");
          dispatch(clearUser());
          localStorage.removeItem("token");
        }
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage("Invalid credentials or server error.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f3f4f6] dark:bg-[#1c1c1e] overflow-y-auto p-4">
      <div className="bg-white dark:bg-[#121212] text-gray-100 p-6 sm:p-8 rounded-lg shadow-lg max-w-md w-full mx-4 space-y-10">
        <h2 className="text-2xl sm:text-3xl font-medium text-black dark:text-white mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-10">
          <div>
            <label className="block text-sm text-black dark:text-white font-medium mb-2">
              Username:
            </label>
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              required
              className="w-full p-3 rounded-lg border-1 text-black dark:text-white border-black dark:border-white focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>
          <div>
            <label className="block text-sm text-black dark:text-white font-medium mb-2">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              required
              className="w-full p-3 rounded-lg border-1 border-black text-black dark:text-white dark:border-white focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full cursor-pointer bg-[#1d1d1d] dark:bg-[#2e2e2e] hover:bg-[#3e3e3e] text-white font-medium py-3 rounded-lg focus:ring-2 focus:ring-white"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-md text-black dark:text-white text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
