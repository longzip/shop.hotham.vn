import Nav from "./Nav";

const Header = ({cmsName, fbPageId}) => {
	return (
		<div className="header">
			<Nav cmsName={cmsName} fbPageId={fbPageId} />
		</div>
	)
};

export default Header;
