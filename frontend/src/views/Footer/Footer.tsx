import "./Footer.css";

interface FooterProps {
  project?: string;
  owner?: string;
  year?: number;
  supervisor?: string;
}

const Footer: React.FC<FooterProps> = ({
  project = "Event Planner",
  owner = "Sami Moqbel",
  year = 2024,
  supervisor = "George Khoury",
}) => {
  return (
    <footer>
      {`${project}© ${year} ${owner} ${
        supervisor ? `supervised by ${supervisor}` : ""
      } `}
    </footer>
  );
};

export default Footer;
