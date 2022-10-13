import Nav from "./Nav";

const Header = ({siteSeo, fbPageId, mainMenu, mobileMenu}) => {

	return (
		<div className="header">
			<Nav siteSeo={siteSeo} fbPageId={fbPageId} mainMenu={mainMenu} mobileMenu={mobileMenu} />
		</div>
	)
};

export default Header;
