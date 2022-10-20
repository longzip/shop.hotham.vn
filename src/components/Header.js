import Nav from "./Nav";

const Header = ({siteSeo, fbPageId, mainMenu, mobileMenu}) => {

	return (
		<>
			<Nav siteSeo={siteSeo} fbPageId={fbPageId} mainMenu={mainMenu} mobileMenu={mobileMenu} />
		</>
	)
};

export default Header;
