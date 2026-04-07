import { useState } from "react";

const reviews = [
  {
    id: 1,
    name: "Shreya Patil",
    role: "Customer",
    verified: true,
    rating: 5,
    message:
      "Its good I can say after using it for a month",
  },
  {
    id: 2,
    name: "Soham Bhonde",
    role: "Customer",
    verified: true,
    rating: 5,
    message:
      "Purchased via friend's recommendation, Good quality and effective",
  },
  {
    id: 3,
    name: "Meera Iyer",
    role: "Customer",
    verified: true,
    rating: 4,
    message:
      "Nice Hairoil can be used regularly",
  },

  {
    id: 4,
    name: "Devyani Rao",
    role: "Customer",
    verified: true,
    rating: 4,
    message:
      "Good for reguar use. I noticed less dandruff and healthier scalp after using the anti-dandruff shampoo",
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
    <section className="py-16 bg-base-100">
      <div className="max-w-2xl mx-auto text-center px-4">

        {/* Heading */}
        <h2 className="text-3xl font-bold mb-2">
          What Our Customers Say 💬
        </h2>
        <p className="text-gray-500 mb-8">
          Real results from real people using our herbal hair care products
        </p>

        {/* Review Card */}
        <div className="card bg-base-200 shadow-xl p-8 transition-all duration-300">

         

          {/* Stars */}
          <div className="flex justify-center mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-xl ${
                  i < review.rating ? "text-yellow-500" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>

          {/* Message */}
          <p className="italic text-gray-600 mb-6 text-lg">
            “{review.message}”
          </p>

          {/* Name */}
          <h3 className="font-semibold text-lg">{review.name}</h3>

          {/* Role + Verified */}
          <div className="flex justify-center items-center gap-2 text-sm text-gray-500">
            <span>{review.role}</span>
            {review.verified && (
              <span className="badge badge-success badge-sm">
                ✔ Verified
              </span>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={prev}
            className="btn btn-outline btn-sm rounded-full px-5"
          >
            ← Prev
          </button>
          <button
            onClick={next}
            className="btn btn-primary btn-sm rounded-full px-5"
          >
            Next →
          </button>
        </div>

      </div>
    </section>
  );
}

export default Reviews;