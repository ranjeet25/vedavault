import { useState } from "react";
// import api from "../api/axios";

/* Reusable Section Wrapper */
const Section = ({ title, children }) => (
  <div className="bg-base-200 p-4 rounded-lg space-y-4">
    <h2 className="text-lg font-semibold border-b pb-2">{title}</h2>
    <div className="grid gap-4 md:grid-cols-2">{children}</div>
  </div>
);

/* Boolean Dropdown */
const BooleanSelect = ({ name, value, onChange }) => (
  <select
    name={name}
    value={value ? "true" : "false"}
    onChange={(e) =>
      onChange({
        target: {
          name,
          value: e.target.value === "true",
          type: "checkbox",
        },
      })
    }
    className="select select-bordered w-full"
  >
    <option value="true">Yes</option>
    <option value="false">No</option>
  </select>
);

export default function AddNewProducts() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    shortDescription: "",
    description: "",
    category: "Sarees",
    subCategory: "",
    brand: "Vedavault",
    productCode: "",
    tags: "",

    mrp: "",
    sellingPrice: "",

    discountType: "percentage",
    discountValue: "",
    offerLabel: "",
    validTill: "",

    mainImage: "",
    hoverImage: "",
    galleryImages: "",

    fabric: "",
    weave: "",
    work: "",
    length: "",
    blousePiece: true,
    blouseFabric: "",
    color: "",
    occasion: "",
    care: "Dry Clean Only",
    origin: "India",

    inStock: true,
    stockCount: "",
    sku: "",

    codAvailable: true,
    estimatedDeliveryDays: "4-6",
    returnPolicyDays: 7,

    superCoinsEarned: "",
    superCoinsRedeemable: true,

    commissionPercentage: "",
    referralEligible: true,
    referralBonusCoins: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm({ ...form, [name]: type === "number" ? Number(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      slug: form.name.toLowerCase().replace(/\s+/g, "-"),

      basicInfo: {
        name: form.name,
        shortDescription: form.shortDescription,
        description: form.description,
        category: form.category,
        subCategory: form.subCategory,
        brand: form.brand,
        productCode: form.productCode,
        tags: form.tags.split(",").map((t) => t.trim()),
      },

      pricing: {
        mrp: Number(form.mrp),
        sellingPrice: Number(form.sellingPrice),
        currency: "INR",
        taxInclusive: true,
      },

      offers: {
        discountType: form.discountType,
        discountValue: Number(form.discountValue),
        offerLabel: form.offerLabel,
        validTill: form.validTill,
      },

      images: {
        main: form.mainImage,
        hover: form.hoverImage,
        gallery: form.galleryImages.split(",").map((i) => i.trim()),
      },

      sareeDetails: {
        fabric: form.fabric,
        weave: form.weave,
        work: form.work,
        length: form.length,
        blousePiece: form.blousePiece,
        blouseFabric: form.blouseFabric,
        color: form.color,
        occasion: form.occasion.split(",").map((o) => o.trim()),
        care: form.care,
        origin: form.origin,
      },

      availability: {
        inStock: form.inStock,
        stockCount: Number(form.stockCount),
        sku: form.sku,
      },

      delivery: {
        codAvailable: form.codAvailable,
        estimatedDeliveryDays: form.estimatedDeliveryDays,
        returnPolicyDays: Number(form.returnPolicyDays),
      },

      rewards: {
        superCoinsEarned: Number(form.superCoinsEarned),
        superCoinsRedeemable: form.superCoinsRedeemable,
      },

      distributor: {
        commissionPercentage: Number(form.commissionPercentage),
        referralEligible: form.referralEligible,
        referralBonusCoins: Number(form.referralBonusCoins),
      },

      timestamps: {
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };

    try {
      setLoading(true);
      console.log("Payload Ready:", payload);
      // await api.post("/products", payload);
      alert("Product payload ready (check console)");
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-semibold">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* BASIC INFO */}
        <Section title="Basic Information">
          <input name="name" placeholder="Product Name" className="input input-bordered w-full" onChange={handleChange} required />
          <input name="productCode" placeholder="Product Code" className="input input-bordered w-full" onChange={handleChange} />
          <input name="subCategory" placeholder="Sub Category" className="input input-bordered w-full" onChange={handleChange} />
          <input name="tags" placeholder="Tags (comma separated)" className="input input-bordered w-full" onChange={handleChange} />
          <textarea name="shortDescription" placeholder="Short Description" className="textarea textarea-bordered md:col-span-2" onChange={handleChange} />
          <textarea name="description" placeholder="Full Description" className="textarea textarea-bordered md:col-span-2" onChange={handleChange} />
        </Section>

        {/* PRICING */}
        <Section title="Pricing">
          <input name="mrp" type="number" placeholder="MRP" className="input input-bordered w-full" onChange={handleChange} />
          <input name="sellingPrice" type="number" placeholder="Selling Price" className="input input-bordered w-full" onChange={handleChange} required />
        </Section>

        {/* OFFERS */}
        <Section title="Offers">
          <input name="discountValue" type="number" placeholder="Discount %" className="input input-bordered w-full" onChange={handleChange} />
          <input name="offerLabel" placeholder="Offer Label" className="input input-bordered w-full" onChange={handleChange} />
          <input name="validTill" type="date" className="input input-bordered w-full" onChange={handleChange} />
        </Section>

        {/* IMAGES */}
        <Section title="Images">
          <input name="mainImage" placeholder="Main Image URL" className="input input-bordered w-full" onChange={handleChange} />
          <input name="hoverImage" placeholder="Hover Image URL" className="input input-bordered w-full" onChange={handleChange} />
          <input name="galleryImages" placeholder="Gallery Images (comma separated)" className="input input-bordered md:col-span-2" onChange={handleChange} />
        </Section>

        {/* SAREE DETAILS */}
        <Section title="Saree Details">
          <input name="fabric" placeholder="Fabric" className="input input-bordered w-full" onChange={handleChange} />
          <input name="weave" placeholder="Weave" className="input input-bordered w-full" onChange={handleChange} />
          <input name="work" placeholder="Work" className="input input-bordered w-full" onChange={handleChange} />
          <input name="length" placeholder="Length" className="input input-bordered w-full" onChange={handleChange} />
          <input name="blouseFabric" placeholder="Blouse Fabric" className="input input-bordered w-full" onChange={handleChange} />
          <input name="color" placeholder="Color" className="input input-bordered w-full" onChange={handleChange} />
          <input name="occasion" placeholder="Occasion (comma separated)" className="input input-bordered w-full" onChange={handleChange} />
          <input name="origin" placeholder="Origin" className="input input-bordered w-full" onChange={handleChange} />

          <div>
            <label className="text-sm">Blouse Piece</label>
            <BooleanSelect name="blousePiece" value={form.blousePiece} onChange={handleChange} />
          </div>
        </Section>

        {/* AVAILABILITY */}
        <Section title="Availability">
          <input name="stockCount" type="number" placeholder="Stock Count" className="input input-bordered w-full" onChange={handleChange} />
          <input name="sku" placeholder="SKU" className="input input-bordered w-full" onChange={handleChange} />

          <div>
            <label className="text-sm">In Stock</label>
            <BooleanSelect name="inStock" value={form.inStock} onChange={handleChange} />
          </div>
        </Section>

        {/* DELIVERY */}
        <Section title="Delivery">
          <input name="estimatedDeliveryDays" placeholder="Estimated Delivery Days" className="input input-bordered w-full" onChange={handleChange} />
          <input name="returnPolicyDays" type="number" placeholder="Return Policy Days" className="input input-bordered w-full" onChange={handleChange} />

          <div>
            <label className="text-sm">COD Available</label>
            <BooleanSelect name="codAvailable" value={form.codAvailable} onChange={handleChange} />
          </div>
        </Section>

        {/* REWARDS */}
        <Section title="Rewards">
          <input name="superCoinsEarned" type="number" placeholder="SuperCoins Earned" className="input input-bordered w-full" onChange={handleChange} />
          <div>
            <label className="text-sm">Redeemable</label>
            <BooleanSelect name="superCoinsRedeemable" value={form.superCoinsRedeemable} onChange={handleChange} />
          </div>
        </Section>

        {/* DISTRIBUTOR */}
        <Section title="Distributor">
          <input name="commissionPercentage" type="number" placeholder="Commission %" className="input input-bordered w-full" onChange={handleChange} />
          <input name="referralBonusCoins" type="number" placeholder="Referral Bonus Coins" className="input input-bordered w-full" onChange={handleChange} />
          <div>
            <label className="text-sm">Referral Eligible</label>
            <BooleanSelect name="referralEligible" value={form.referralEligible} onChange={handleChange} />
          </div>
        </Section>

        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? "Saving..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
