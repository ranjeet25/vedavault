import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductAPI } from "../../../api/product.api";

const Section = ({ title, children }) => (
  <div className="card bg-base-100 shadow mb-6">
    <div className="card-body">
      <h3 className="font-semibold text-lg mb-4">{title}</h3>
      {children}
    </div>
  </div>
);

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs font-mono text-gray-500">{label}</span>
    {children}
  </div>
);

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [original, setOriginal] = useState(null);
  const [form, setForm] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await ProductAPI.getById(id);
    setOriginal(res.data);
    setForm(JSON.parse(JSON.stringify(res.data))); // deep copy
    setLoading(false);
  };

  const updateNested = (section, key, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const getChanges = () => {
    const changes = {};
    Object.keys(form).forEach((key) => {
      if (JSON.stringify(form[key]) !== JSON.stringify(original[key])) {
        changes[key] = form[key];
      }
    });
    return changes;
  };

  const handleSubmit = () => {
    const changes = getChanges();
    if (!Object.keys(changes).length) {
      alert("No changes made");
      return;
    }
    setShowConfirm(true);
  };

  const confirmUpdate = async () => {
    const changes = getChanges();
    console.log(changes, id);
    var res = await ProductAPI.update(id, changes);
console.log(res);
    alert("Product updated successfully");
    navigate("/admin/stockmanagment");
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Edit Product
      </h2>

      {/* BASIC INFO */}
      <Section title="Basic Info">
        <div className="grid grid-cols-2 gap-4">
          <Field label="basicInfo.name">
            <input
              className="input input-bordered"
              value={form.basicInfo.name}
              onChange={(e) =>
                updateNested("basicInfo", "name", e.target.value)
              }
            />
          </Field>

          <Field label="basicInfo.productCode">
            <input
              className="input input-bordered"
              value={form.basicInfo.productCode}
              onChange={(e) =>
                updateNested("basicInfo", "productCode", e.target.value)
              }
            />
          </Field>

          <Field label="basicInfo.shortDescription">
            <textarea
              className="textarea textarea-bordered"
              value={form.basicInfo.shortDescription}
              onChange={(e) =>
                updateNested(
                  "basicInfo",
                  "shortDescription",
                  e.target.value
                )
              }
            />
          </Field>

          <Field label="basicInfo.description">
            <textarea
              className="textarea textarea-bordered"
              value={form.basicInfo.description}
              onChange={(e) =>
                updateNested("basicInfo", "description", e.target.value)
              }
            />
          </Field>
        </div>
      </Section>

      {/* PRICING */}
      <Section title="Pricing">
        <div className="grid grid-cols-3 gap-4">
          <Field label="pricing.mrp">
            <input
              type="number"
              className="input input-bordered"
              value={form.pricing.mrp}
              onChange={(e) =>
                updateNested("pricing", "mrp", e.target.value)
              }
            />
          </Field>

          <Field label="pricing.sellingPrice">
            <input
              type="number"
              className="input input-bordered"
              value={form.pricing.sellingPrice}
              onChange={(e) =>
                updateNested(
                  "pricing",
                  "sellingPrice",
                  e.target.value
                )
              }
            />
          </Field>
        </div>
      </Section>

      {/* IMAGES */}
      <Section title="Images">
        <div className="grid grid-cols-2 gap-4">
          <Field label="images.main">
            <input
              className="input input-bordered"
              value={form.images.main}
              onChange={(e) =>
                updateNested("images", "main", e.target.value)
              }
            />
          </Field>

          <Field label="images.hover">
            <input
              className="input input-bordered"
              value={form.images.hover}
              onChange={(e) =>
                updateNested("images", "hover", e.target.value)
              }
            />
          </Field>
        </div>
      </Section>

      {/* AVAILABILITY */}
      <Section title="Availability">
        <div className="grid grid-cols-3 gap-4">
          <Field label="availability.stockCount">
            <input
              type="number"
              className="input input-bordered"
              value={form.availability.stockCount}
              onChange={(e) =>
                updateNested(
                  "availability",
                  "stockCount",
                  e.target.value
                )
              }
            />
          </Field>

          <Field label="availability.sku">
            <input
              className="input input-bordered"
              value={form.availability.sku}
              onChange={(e) =>
                updateNested("availability", "sku", e.target.value)
              }
            />
          </Field>
        </div>
      </Section>

      {/* ACTIONS */}
      <div className="flex gap-4 mt-6">
        <button
          className="btn btn-outline"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Review Changes
        </button>
      </div>

      {/* CONFIRMATION */}
      {showConfirm && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-semibold text-lg mb-3">
              Confirm Update
            </h3>

            <pre className="bg-base-200 p-3 rounded text-xs overflow-auto">
{JSON.stringify(getChanges(), null, 2)}
            </pre>

            <div className="modal-action">
              <button
                className="btn btn-outline"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={confirmUpdate}
              >
                Yes, Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
