import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../_services/auth";
import { API } from "../../_api";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await login(formData);

      console.log(response);

      if (response.success && response.token && response.user) {
        // Simpan token dan data user
        localStorage.setItem("accessToken", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));

        // Pasang token untuk request API berikutnya
        API.defaults.headers.common["Authorization"] =
          `Bearer ${response.token}`;

        // Arahkan berdasarkan role
        if (response.user.role === "admin") {
          navigate("/admin");
        } else if (response.user.role === "customer") {
          navigate("/");
        } else {
          setError("Role pengguna tidak dikenali.");
        }
      } else {
        setError(response.message || "Login gagal.");
      }
    } catch (error) {
      const responseData = error?.response?.data;

      setError(
        responseData?.message ||
        responseData?.email?.[0] ||
        "Email atau password salah."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>

              {error && (
                <div className="text-red-500 text-sm">
                  {error}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>

                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to={"/register"}
                    className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}