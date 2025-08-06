import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useToast } from "./ToastContext"; // 1. Import useToast

const FormInput = ({ id, type, label, value, onChange, placeholder }) => (
  <div>
    <label
      htmlFor={id}
      className="block mb-2 text-sm font-medium text-gray-400"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 bg-[#2b2d31] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
      placeholder={placeholder}
      required
    />
  </div>
);

const FormButton = ({ children }) => (
  <button
    type="submit"
    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold text-center transition-colors duration-300"
  >
    {children}
  </button>
);

const AccountPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const { showToast } = useToast(); // 2. Get showToast
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLoginView ? "login" : "register";
    const url = `http://localhost:4000/api/${endpoint}`;

    const body = isLoginView
      ? { email: formData.email, password: formData.password }
      : {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        showToast(`Error: ${data.message}`, "error"); // 3. Replace alert
        return;
      }

      if (isLoginView) {
        showToast("Login successful!", "success"); // 3. Replace alert
        login({ email: data.email, name: data.name, token: data.token });
        navigate("/");
      } else {
        showToast("Registration successful! Please log in.", "success"); // 3. Replace alert
        setIsLoginView(true);
        setFormData({ name: "", email: "", password: "" });
      }
    } catch (error) {
      console.error("Network or server error:", error);
      showToast("Failed to connect to the server.", "error"); // 3. Replace alert
    }
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center -mt-20">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#1e1f22] border border-gray-800 rounded-xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">
            {isLoginView ? "Welcome Back" : "Create an Account"}
          </h1>
          <p className="text-gray-400 mt-2">
            {isLoginView ? "Sign in to continue" : "Get started with us today!"}
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLoginView && (
            <FormInput
              id="name"
              type="text"
              label="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="John Doe"
            />
          )}
          <FormInput
            id="email"
            type="email"
            label="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="you@example.com"
          />
          <FormInput
            id="password"
            type="password"
            label="Password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="••••••••"
          />
          <div className="pt-2">
            <FormButton>{isLoginView ? "Login" : "Create Account"}</FormButton>
          </div>
        </form>
        <div className="text-center text-gray-400">
          <p>
            {isLoginView
              ? "Don't have an account?"
              : "Already have an account?"}
            <button
              onClick={toggleView}
              className="ml-2 font-semibold text-indigo-400 hover:text-indigo-300 transition-colors duration-300"
            >
              {isLoginView ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
