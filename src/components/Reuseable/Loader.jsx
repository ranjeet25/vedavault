function Loader() {
  return (
    <div className="loader-wrapper">
      <div className="traditional-loader"></div>

      <style jsx>{`
        .loader-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .traditional-loader {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 3px solid rgba(165, 42, 42, 0.2); /* soft brown */
          border-top-color: #a52a2a; /* traditional earthy tone */
          animation: spin 0.9s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default Loader;
