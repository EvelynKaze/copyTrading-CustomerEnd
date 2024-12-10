import FooterLogo from "../FooterLogo";
import FooterLinksSet from "./FooterLinks";

const linksArray = [
  {
    setofLinks: "Solutions",
    links: [
      {
        name: "Smmart Bot",
        href: "/",
      },
      { name: "Premium Indicator", href: "/" },
      { name: "Pricing", href: "/" },
    ],
  },
  {
    setofLinks: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Help Desk", href: "/contact" },
      { name: "Affiliate Program", href: "/careers" },
    ],
  },
  {
    setofLinks: "Follow Us",
    links: [
      { name: "Facebook", href: "https://www.facebook.com" },
      { name: "Instagram", href: "https://www.instagram.com" },
      { name: "Twitter", href: "https://www.twitter.com" },
      { name: "Youtube", href: "https://www.youtube.com" },
    ],
  },
  {
    setofLinks: "Download The App",
    links: [
      { name: "Get it on Google Play", href: "https://play.google.com" },
      {
        name: "Download on the App Store",
        href: "https://www.apple.com/app-store",
      },
    ],
  },
];

const Footer = () => {
  return (
    <div className="bg-appCardGold text-appDarkCard py-12 relative">
      <div className="absolute w-full h-full top-0 left-0 bg-appDarkGradient opacity-25"></div>
      <div className="inner relative z-10 grid items-start grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {linksArray.map((linkSet, index) => (
          <FooterLinksSet
            key={index}
            linksName={linkSet.setofLinks}
            links={linkSet.links}
          />
        ))}
        <FooterLogo />
      </div>
    </div>
  );
};

export default Footer;
