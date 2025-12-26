import { useState } from "react";

const reviews = [
  {
    id: 1,
    name: "Ananya Sharma",
    role: "Customer",
    verified: true,
    rating: 5,
    message: "Beautiful Banarasi saree. Fabric quality is excellent.",
  },
  {
    id: 2,
    name: "Ramesh Kumar",
    role: "Distributor",
    verified: false,
    rating: 5,
    message: "Reliable partner with consistent quality and timely delivery.",
  },
  {
    id: 3,
    name: "Meera Iyer",
    role: "Customer",
    verified: true,
    rating: 4,
    message: "Chiffon sarees are lightweight and elegant. Loved it!",
  },
];

function Reviews() {
  const [index, setIndex] = useState(0);
  const review = reviews[index];

  const prev = () =>
    setIndex(index === 0 ? reviews.length - 1 : index - 1);

  const next = () =>
    setIndex(index === reviews.length - 1 ? 0 : index + 1);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-xl mx-auto text-center">

        <h2 className="text-2xl font-bold mb-6">
          Customer & Distributor Reviews
        </h2>

        {/* Review Card */}
        <div className="bg-white p-6 shadow rounded border border-gray-200">

          {/* Stars */}
          <div className="flex justify-center mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-lg ${
                  i < review.rating ? "text-yellow-500" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>

          {/* Message */}
          <p className="italic text-gray-600 mb-4">
            “{review.message}”
          </p>

          {/* Name */}
          <p className="font-semibold">{review.name}</p>

          {/* Role + Verified */}
          <p className="text-sm text-gray-500 flex justify-center gap-2">
            <span>{review.role}</span>
            {review.verified && (
              <span className="text-green-600 font-medium">✔ Verified</span>
            )}
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mt-4">
          <button onClick={prev} className="btn btn-sm">
            Prev
          </button>
          <button onClick={next} className="btn btn-sm">
            Next
          </button>
        </div>

      </div>
    </section>
  );
}

export default Reviews;
    