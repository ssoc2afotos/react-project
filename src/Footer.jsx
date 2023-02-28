import Flex from "./helpers/components/Flex";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Footer = () => {
  return (
    <Flex
      flexDirection={"row"}
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "1rem",
      }}
    >
      <p>{"Made with "}</p>
      <FavoriteIcon style={{ color: "red", margin: "0 5" }} />
      <p>{" in Athens, Greece "}</p>
    </Flex>
  );
};

export default Footer;
