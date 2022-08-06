import {Facebook, Instagram, Twitter, Youtube} from "./icons";

const Footer = () => (
	<div className="footer bg-gray-800 p-6 text-white">
		<div className="container mx-auto">
			<div className="footer-text flex-none md:flex items-center justify-between">
				<p>© Bưu điện huyện Mê Linh 2022</p>
				<p className="text-gray">Được thiết kế bởi <a href="https://lovanlong.ga/">Lỗ Văn Long</a></p>
				<span className="text-gray">Từ nhà bạn đến chúng tôi ngắn hơn đấy!</span>
			</div>
			<ul className="social-links mt-8 flex align-center">
				<li><a href="https://www.facebook.com/buudientulap" className="fa fa-facebook" target="_blank"><Facebook/></a></li>
				<li className="ml-2 mt-1"><a href="https://twitter.com/lovalong" target="_blank"><Twitter/></a></li>
				<li className="ml-2 mt-1"><a href="https://www.youtube.com/channel/UC8skczWH9dMoyzU0LPYQ4yA" className="fa fa-youtube" target="_blank"><Youtube/></a></li>
				<li className="ml-2"><a href="https://www.instagram.com/hoahaiha_86/" className="fa fa-instagram" target="_blank"><Instagram/></a></li>
			</ul>
		</div>
	</div>
);

export default Footer;
