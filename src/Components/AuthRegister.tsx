import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";

function AuthRegister() {
  const { email } = useParams();
  const navigate = useNavigate();
  const [countries, setCountries] = useState<string[]>([]);
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    fetch("/universityLists.json")
      .then((res) => res.json())
      .then((data) => {
        const uniqueCountries = Array.from(
          new Set(data.map((val) => val.country))
        ).sort();
        setCountries(uniqueCountries);
      })
      .catch((err) => toast.error("Failed to load countries"));
  }, []);

  useEffect(() => {
    if (localStorage.getItem("authfail")) {
      toast.success(
        "Almost there. Please fill the following details for finer verification"
      );
      localStorage.removeItem("authfail");
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    educationType: "",
    school: "",
    school_year: "",
    college: "",
    college_stream: "",
    college_year: "",
    college_department: "",
    university: "",
    work_country: "",
    work_state: "",
    work_city: "",
    work_company: "",
    work_position: "",
    work_duration: "",
  });

  useEffect(() => {
    fetch("/universityLists.json")
      .then((res) => res.json())
      .then((data) => {
        const selectedUniversities = Array.from(
          new Set(
            data
              .filter((val) => val.country == formData.country)
              .map((val) => val.name)
          )
        ).sort();
        setUniversities(selectedUniversities);
      })
      .catch((err) => toast.error("Failed to load universities"));
  }, [formData.country, formData.work_country]);

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await api.post(apiRoutes.auth.register.authRegister, {
        name: formData.name,
        phone: formData.phone,
        email: email,
        education_type: formData.educationType,
        school: formData.educationType === "school" ? formData.school : undefined,
        school_year: formData.educationType === "school" ? formData.school_year : undefined,
        college: formData.educationType === "college" ? formData.college : undefined,
        college_stream: formData.educationType === "college" ? formData.college_stream : undefined,
        college_year: formData.educationType === "college" ? formData.college_year : undefined,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        work_country: formData.educationType === "working" ? formData.work_country : undefined,
        work_state: formData.educationType === "working" ? formData.work_state : undefined,
        work_city: formData.educationType === "working" ? formData.work_city : undefined,
        work_company: formData.educationType === "working" ? formData.work_company : undefined,
        work_position: formData.educationType === "working" ? formData.work_position : undefined,
        work_duration: formData.educationType === "working" ? formData.work_duration : undefined,
      });

      if (response.status === 200) {
        localStorage.setItem(
          "registration_toast",
          "Congratulations, your account has been created. Please Login Again."
        );
        navigate("/login");
      } else {
        alert(
          "You have already registered before. Please remove your earlier registration."
        );
      }
    } catch (error) {
      alert("An error occurred during registration. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="relative w-full max-w-2xl">
        <div className="glass-card rounded-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-blue-600 px-8 py-12 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Join Kepler 22B
              </h1>
              <p className="text-blue-100 text-lg">
                Complete your registration to unlock the future of tech
                education
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-[var(--foreground)]"
                  >
                    Full Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-[var(--muted-foreground)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-[var(--muted)] focus:bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-[var(--foreground)]"
                  >
                    Phone Number *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-[var(--muted-foreground)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-[var(--muted)] focus:bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Country Details */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-[var(--foreground)]">
                  Country
                </label>
                <select
                  id="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-xl text-[var(--foreground)] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  required
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* State and City */}
              <div className="grid md:grid-cols-2 gap-6">
                {["state", "city"].map((id) => (
                  <div key={id} className="space-y-2">
                    <label
                      htmlFor={id}
                      className="block text-sm font-semibold text-[var(--foreground)]"
                    >
                      {id === "state" ? "State" : "City"}
                    </label>
                    <input
                      type="text"
                      id={id}
                      value={formData[id]}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--muted)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:border-blue-500 focus:bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                      placeholder={
                        id === "city" ? "Enter your city" : "Enter your state"
                      }
                      required
                    />
                  </div>
                ))}
              </div>

              {/* Education Type Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-[var(--foreground)]">
                  Education Level *
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  {["school", "college", "working"].map((type) => (
                    <label
                      key={type}
                      className="relative flex-1 cursor-pointer"
                    >
                      <input
                        type="radio"
                        className="sr-only peer"
                        id="educationType"
                        value={type}
                        checked={formData.educationType === type}
                        onChange={handleChange}
                      />
                      <div className="w-full p-4 bg-[var(--muted)] border border-[var(--border)] rounded-xl text-center font-medium text-[var(--foreground)] transition-all duration-200 peer-checked:bg-blue-500/10 peer-checked:border-blue-500 peer-checked:text-blue-600 dark:peer-checked:text-blue-400 hover:border-[var(--muted-foreground)]">
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* School Fields */}
              {formData.educationType === "school" && (
                <div className="space-y-6 p-6 bg-blue-500/5 dark:bg-blue-500/10 rounded-2xl border border-blue-500/20">
                  <h3 className="text-lg font-semibold text-[var(--foreground)] flex items-center">
                    School Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="school"
                        className="block text-sm font-semibold text-[var(--foreground)]"
                      >
                        School Name *
                      </label>
                      <input
                        type="text"
                        id="school"
                        value={formData.school}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-[var(--card)] text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
                        placeholder="Enter your school name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="school_year"
                        className="block text-sm font-semibold text-[var(--foreground)]"
                      >
                        Current Grade *
                      </label>
                      <select
                        id="school_year"
                        value={formData.school_year}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-[var(--card)] text-[var(--foreground)]"
                        required
                      >
                        <option value="">Select Grade</option>
                        {[9, 10, 11, 12].map((year) => (
                          <option key={year} value={year}>
                            Grade {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* College Fields */}
              {formData.educationType === "college" && (
                <div className="space-y-6 p-6 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                  <h3 className="text-lg font-semibold text-[var(--foreground)] flex items-center">
                    College Information
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="college"
                        className="block text-sm font-semibold text-[var(--foreground)]"
                      >
                        College/University Name *
                      </label>
                      <input
                        type="text"
                        id="college"
                        value={formData.college}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-[var(--card)] text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
                        placeholder="Enter your college/university name"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="college_stream"
                          className="block text-sm font-semibold text-[var(--foreground)]"
                        >
                          Degree Level *
                        </label>
                        <select
                          id="college_stream"
                          value={formData.college_stream}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-[var(--card)] text-[var(--foreground)]"
                          required
                        >
                          <option value="">Select Degree Level</option>
                          {["Bachelor's", "Master's", "PhD"].map((stream) => (
                            <option key={stream} value={stream}>
                              {stream}
                            </option>
                          ))}
                        </select>
                      </div>
                      {formData.college_stream !== "PhD" && (
                        <div className="space-y-2">
                          <label
                            htmlFor="college_year"
                            className="block text-sm font-semibold text-[var(--foreground)]"
                          >
                            Year of Study *
                          </label>
                          <select
                            id="college_year"
                            value={formData.college_year}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-[var(--card)] text-[var(--foreground)]"
                            required
                          >
                            <option value="">Select Year</option>
                            {(formData.college_stream === "Bachelor's"
                              ? ["1st", "2nd", "3rd", "4th", "5th"]
                              : ["1st", "2nd"]
                            ).map((year) => (
                              <option key={year} value={year}>
                                {year} Year
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      <div className="space-y-2">
                        <label
                          htmlFor="college_department"
                          className="block text-sm font-semibold text-[var(--foreground)]"
                        >
                          Department *
                        </label>
                        <input
                          type="text"
                          id="college_department"
                          value={formData.college_department}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-[var(--card)] text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
                          placeholder="Enter your department"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Working fields */}
              {formData.educationType === "working" && (
                <div className="space-y-6 p-6 bg-purple-500/5 dark:bg-purple-500/10 rounded-2xl border border-purple-500/20">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <h3 className="text-lg font-semibold text-[var(--foreground)]">
                      Work Information
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-[var(--foreground)]">
                      Country
                    </label>
                    <select
                      id="work_country"
                      value={formData.work_country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--card)] border border-[var(--border)] rounded-xl text-[var(--foreground)] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                      required
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { id: "work_state", label: "State" },
                      { id: "work_city", label: "City" },
                      { id: "work_company", label: "Company Name" },
                      { id: "work_position", label: "Position" },
                      { id: "work_duration", label: "Duration" },
                    ].map(({ id, label }) => (
                      <div key={id} className="space-y-2">
                        <label
                          htmlFor={id}
                          className="block text-sm font-semibold text-[var(--foreground)]"
                        >
                          {label}
                        </label>
                        <input
                          type="text"
                          id={id}
                          value={formData[id]}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-[var(--muted)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:border-blue-500 focus:bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                          placeholder={`Enter your ${label.toLowerCase()}`}
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 font-semibold text-lg rounded-xl transition-all duration-200 ${
                  loading
                    ? "bg-zinc-400 dark:bg-zinc-600 text-white cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-xl active:scale-[0.98]"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                    Creating Your Account...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span>Complete Registration</span>
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-8 pt-6 border-t border-[var(--border)] text-center">
              <p className="text-[var(--muted-foreground)] mb-4">
                Already have an account?
              </p>
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 border border-[var(--primary)] text-[var(--primary)] font-semibold rounded-xl hover:bg-[var(--primary)] hover:text-white transition-all duration-200"
              >
                Sign In to Your Account
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-6 text-sm text-[var(--muted-foreground)]">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-green-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Secure Registration
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-blue-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Instant Access
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthRegister;
