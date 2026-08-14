import { useState } from "react";
import axios from "axios";
import Header from "../components/Reuseable/Header";

function Distributers() {
  // Generate unique 6 digit registration ID
    const generatedRegistrationId = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    residentialAddress: "",
    aadharNo: "",
    panNo: "",
    accountHolderName: "",
    bankAccountNo: "",
    ifscCode: "",
    bankName: "",
    branchName: "",
    registrationId: generatedRegistrationId,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [registrationId, setRegistrationId] = useState("");
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Enter a valid 10-digit mobile number";
    }

    if (!formData.residentialAddress.trim()) {
      newErrors.residentialAddress = "Residential address is required";
    }

    if (!formData.aadharNo.trim()) {
      newErrors.aadharNo = "Aadhaar number is required";
    } else if (!/^\d{12}$/.test(formData.aadharNo)) {
      newErrors.aadharNo = "Aadhaar number must contain 12 digits";
    }

    if (!formData.panNo.trim()) {
      newErrors.panNo = "PAN number is required";
    } else if (
      !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.panNo.toUpperCase())
    ) {
      newErrors.panNo = "Enter a valid PAN number";
    }

    if (!formData.accountHolderName.trim()) {
      newErrors.accountHolderName = "Account holder name is required";
    }

    if (!formData.bankAccountNo.trim()) {
      newErrors.bankAccountNo = "Bank account number is required";
    } else if (!/^\d{9,18}$/.test(formData.bankAccountNo)) {
      newErrors.bankAccountNo =
        "Bank account number must contain 9 to 18 digits";
    }

    if (!formData.ifscCode.trim()) {
      newErrors.ifscCode = "IFSC code is required";
    } else if (
      !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode.toUpperCase())
    ) {
      newErrors.ifscCode = "Enter a valid IFSC code";
    }

    if (!formData.bankName.trim()) {
      newErrors.bankName = "Bank name is required";
    }

    if (!formData.branchName.trim()) {
      newErrors.branchName = "Branch name is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess(false);
    setRegistrationId(generatedRegistrationId);
    setMessage("");

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...formData,
        panNo: formData.panNo.toUpperCase(),
        ifscCode: formData.ifscCode.toUpperCase(),
      };

      const response = await axios.post(
        "https://formbold.com/s/94Yzj",
        payload
      );

      //console.log("Registration response:", response.data);

      // Backend should return registrationId
      const generatedId = generatedRegistrationId

      setRegistrationId(generatedId);

      setSuccess(true);

      setMessage(
        "Thank you for registration. Our team will contact you soon."
      );

      // Clear form
      setFormData({
        fullName: "",
        mobileNumber: "",
        residentialAddress: "",
        aadharNo: "",
        panNo: "",
        accountHolderName: "",
        bankAccountNo: "",
        ifscCode: "",
        bankName: "",
        branchName: "",
      });
    } catch (error) {
      console.error("Registration error:", error);

      setMessage(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full rounded-lg border px-4 py-3 outline-none transition ${
      errors[field]
        ? "border-red-500 focus:ring-2 focus:ring-red-200"
        : "border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
    }`;

  // SUCCESS SCREEN
  if (success) {
    return (
      <div>
        <Header heading="Distributor Registration" />

        <div className="mx-auto max-w-2xl px-4 py-16">
          <div className="rounded-2xl bg-white p-8 text-center shadow-lg md:p-12">
            {/* Success Icon */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <span className="text-4xl text-green-600">✓</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-800">
              Registration Successful
            </h1>

            <p className="mt-4 text-gray-600">
              Thank you for registration. Our team will contact you soon.
            </p>

          

            <button
              type="button"
              onClick={() => {
                setSuccess(false);
                setRegistrationId(generatedRegistrationId);
                setMessage("");
              }}
              className="mt-8 rounded-lg bg-primary px-8 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Register Another Distributor
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header heading="Distributor Registration" />

      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-2xl bg-white p-6 shadow-lg md:p-10">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              Distributor Registration
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Please provide your personal and bank details to register as a
              distributor.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

              {/* Full Name */}
              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Your Full Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={inputClass("fullName")}
                />

                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Mobile Number <span className="text-red-500">*</span>
                </label>

                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  maxLength="10"
                  placeholder="Enter 10 digit mobile number"
                  className={inputClass("mobileNumber")}
                />

                {errors.mobileNumber && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.mobileNumber}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="mb-2 block font-medium text-gray-700">
                  Residential Address{" "}
                  <span className="text-red-500">*</span>
                </label>

                <textarea
                  name="residentialAddress"
                  value={formData.residentialAddress}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter your residential address"
                  className={inputClass("residentialAddress")}
                />

                {errors.residentialAddress && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.residentialAddress}
                  </p>
                )}
              </div>

              {/* Aadhaar */}
              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Aadhaar Number <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="aadharNo"
                  value={formData.aadharNo}
                  onChange={handleChange}
                  maxLength="12"
                  placeholder="Enter 12 digit Aadhaar number"
                  className={inputClass("aadharNo")}
                />

                {errors.aadharNo && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.aadharNo}
                  </p>
                )}
              </div>

              {/* PAN */}
              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  PAN Number <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="panNo"
                  value={formData.panNo}
                  onChange={handleChange}
                  maxLength="10"
                  placeholder="ABCDE1234F"
                  className={inputClass("panNo")}
                />

                {errors.panNo && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.panNo}
                  </p>
                )}
              </div>

              {/* Account Holder */}
              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Account Holder Name{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="accountHolderName"
                  value={formData.accountHolderName}
                  onChange={handleChange}
                  placeholder="Enter account holder name"
                  className={inputClass("accountHolderName")}
                />

                {errors.accountHolderName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.accountHolderName}
                  </p>
                )}
              </div>

              {/* Account Number */}
              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Bank Account Number{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="bankAccountNo"
                  value={formData.bankAccountNo}
                  onChange={handleChange}
                  placeholder="Enter bank account number"
                  className={inputClass("bankAccountNo")}
                />

                {errors.bankAccountNo && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.bankAccountNo}
                  </p>
                )}
              </div>

              {/* IFSC */}
              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  IFSC Code <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleChange}
                  maxLength="11"
                  placeholder="SBIN0001234"
                  className={inputClass("ifscCode")}
                />

                {errors.ifscCode && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.ifscCode}
                  </p>
                )}
              </div>

              {/* Bank */}
              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Bank Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  placeholder="Enter bank name"
                  className={inputClass("bankName")}
                />

                {errors.bankName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.bankName}
                  </p>
                )}
              </div>

              {/* Branch */}
              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Branch Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="branchName"
                  value={formData.branchName}
                  onChange={handleChange}
                  placeholder="Enter branch name"
                  className={inputClass("branchName")}
                />

                {errors.branchName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.branchName}
                  </p>
                )}
              </div>
            </div>

            {/* Error Message */}
            {message && (
              <div className="mt-6 rounded-lg bg-red-100 p-4 text-sm text-red-700">
                {message}
              </div>
            )}

            {/* Submit */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-primary px-8 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Register as Distributor"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Distributers;