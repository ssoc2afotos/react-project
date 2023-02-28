const Flex = ({ flexDirection, style, children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: flexDirection,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Flex;
