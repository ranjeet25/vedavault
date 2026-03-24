function AboutProduct() {
  return (
    <section className="bg-base-100 py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Trust Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="card bg-base-200 shadow-md p-6 text-center">
            <h4 className="text-xl font-semibold mb-2">🌿 Herbal Ingredients</h4>
            <p className="text-sm text-gray-500">
              Carefully selected natural herbs for safe and effective hair care.
            </p>
          </div>

          <div className="card bg-base-200 shadow-md p-6 text-center">
            <h4 className="text-xl font-semibold mb-2">🔬 Tested & Trusted</h4>
            <p className="text-sm text-gray-500">
              Formulated with proven ingredients trusted by generations.
            </p>
          </div>

          <div className="card bg-base-200 shadow-md p-6 text-center">
            <h4 className="text-xl font-semibold mb-2">💯 Customer Loved</h4>
            <p className="text-sm text-gray-500">
              Thousands of happy customers experiencing visible results.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default AboutProduct;