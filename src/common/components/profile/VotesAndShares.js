const VotesAndShares = ({ text, val = 0 }) => {
  return (
    <div
      style={{
        margin: "0px 45px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <p
        style={{
          fontSize: 32,
          fontWeight: "600",
          color: "rgba(58, 33, 16, 1)",
          marginBottom: 16,
        }}
      >
        {val}
      </p>
      <p style={{ fontSize: 12, color: "rgba(159, 135, 114, 1)" }}>{text}</p>
    </div>
  );
};

export default VotesAndShares;
