import { useState } from "react";

function DistributorRegistration() {
  const [form, setForm] = useState({
    mobile: "",
    name: "",
    aadhaar: "",
    pan: "",
    dob: "",
    bankName: "",
    accountHolder: "",
    accountNumber: "",
    ifsc: "",
    branch: "",
    address: "",
    altPhone1: "",
    altPhone2: "",
    referral: "",
    password: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const validate = () => {
    let newErrors = {};

    if (!/^[6-9]\d{9}$/.test(form.mobile))
      newErrors.mobile = "Enter valid 10-digit mobile number";

    if (!form.name) newErrors.name = "Name is required";

    if (!/^\d{12}$/.test(form.aadhaar))
      newErrors.aadhaar = "Aadhaar must be 12 digits";

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.pan))
      newErrors.pan = "Invalid PAN format";

    if (!form.dob) newErrors.dob = "Birth date required";

    if (!form.bankName) newErrors.bankName = "Bank name required";

    if (!form.accountHolder)
      newErrors.accountHolder = "Account holder name required";

    if (form.password.length < 6)
      newErrors.password = "Minimum 6 characters required";

    if (!form.terms)
      newErrors.terms = "You must accept terms & conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Submitted:", form);
      alert("Distributor account created successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center px-4 py-10">
      <div className="w-full max-w-5xl card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Vedavault Distributor Registration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* 1️⃣ Personal Details */}
            <section>
              <h3 className="text-lg font-medium mb-4 border-b pb-2">
                Personal Details
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    name="mobile"
                    placeholder="Mobile Number"
                    className="input input-bordered w-full"
                    onChange={handleChange}
                  />
                  <p className="text-error text-sm">{errors.mobile}</p>
                </div>

                <div>
                  <input
                    name="name"
                    placeholder="Full Name (as per PAN)"
                    className="input input-bordered w-full"
                    onChange={handleChange}
                  />
                  <p className="text-error text-sm">{errors.name}</p>
                </div>
              </div>
            </section>

            {/* 2️⃣ Identity Details */}
            <section>
              <h3 className="text-lg font-medium mb-4 border-b pb-2">
                Identity Details
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    name="aadhaar"
                    placeholder="Aadhaar Number"
                    className="input input-bordered w-full"
                    onChange={handleChange}
                  />
                  <p className="text-error text-sm">{errors.aadhaar}</p>
                </div>

                <div>
                  <input
                    name="pan"
                    placeholder="PAN Number"
                    className="input input-bordered uppercase w-full"
                    onChange={handleChange}
                  />
                  <p className="text-error text-sm">{errors.pan}</p>
                </div>

                <div>
                  <input
                    type="date"
                    name="dob"
                    className="input input-bordered w-full"
                    onChange={handleChange}
                  />
                  <p className="text-error text-sm">{errors.dob}</p>
                </div>

                <input
                  name="referral"
                  placeholder="Referral Code (Optional)"
                  className="input input-bordered w-full"
                  onChange={handleChange}
                />
              </div>
            </section>

            {/* 3️⃣ Bank Details */}
            <section>
              <h3 className="text-lg font-medium mb-4 border-b pb-2">
                Bank Details
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    name="bankName"
                    placeholder="Bank Name"
                    className="input input-bordered w-full"
                    onChange={handleChange}
                  />
                  <p className="text-error text-sm">{errors.bankName}</p>
                </div>

                <div>
                  <input
                    name="accountHolder"
                    placeholder="Account Holder Name"
                    className="input input-bordered w-full"
                    onChange={handleChange}
                  />
                  <p className="text-error text-sm">{errors.accountHolder}</p>
                </div>

                <input
                  name="accountNumber"
                  placeholder="Account Number (Optional)"
                  className="input input-bordered w-full"
                  onChange={handleChange}
                />

                <input
                  name="ifsc"
                  placeholder="IFSC Code (Optional)"
                  className="input input-bordered w-full"
                  onChange={handleChange}
                />

                <input
                  name="branch"
                  placeholder="Branch Name (Optional)"
                  className="input input-bordered w-full md:col-span-2"
                  onChange={handleChange}
                />
              </div>
            </section>

            {/* 4️⃣ Address & Contact */}
            <section>
              <h3 className="text-lg font-medium mb-4 border-b pb-2">
                Address & Contact
              </h3>

              <textarea
                name="address"
                placeholder="Full Address"
                className="textarea textarea-bordered w-full mb-4"
                rows={3}
                onChange={handleChange}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="altPhone1"
                  placeholder="Alternate Phone (Optional)"
                  className="input input-bordered w-full"
                  onChange={handleChange}
                />
                <input
                  name="altPhone2"
                  placeholder="Alternate Phone (Optional)"
                  className="input input-bordered w-full"
                  onChange={handleChange}
                />
              </div>
            </section>

            {/* 5️⃣ Security & Terms */}
            <section>
              <h3 className="text-lg font-medium mb-4 border-b pb-2">
                Security & Confirmation
              </h3>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Create Password"
                  className="input input-bordered w-full"
                  onChange={handleChange}
                />
                <p className="text-error text-sm">{errors.password}</p>
                <p className="text-xs opacity-60 mt-1">
                  Minimum 6 characters. ID auto-fetch with PAN & DOB.
                </p>
              </div>

              <label className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  name="terms"
                  className="checkbox checkbox-primary"
                  onChange={handleChange}
                />
                <span className="text-sm">
                  I agree to the Bazar Terms & Conditions
                </span>
              </label>
              <p className="text-error text-sm">{errors.terms}</p>
            </section>

            <button className="btn btn-secondary w-full">
              Create Distributor Account
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default DistributorRegistration;
