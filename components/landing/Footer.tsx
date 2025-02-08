import FooterLogo from "../FooterLogo";
import FooterLinksSet from "./FooterLinks";

const linksArray = [
  {
    setofLinks: "Company",
    links: [
      { name: "About Us", href: "#" },
      { name: "Help Desk", href: "#" },
      { name: "Affiliate Program", href: "#" },
    ],
  },
  {
    setofLinks: "Follow Us",
    links: [
      { name: "Facebook", href: "#" },
      { name: "Instagram", href: "#" },
      { name: "Twitter", href: "#" },
      { name: "Youtube", href: "#" },
    ],
  },
  {
    setofLinks: "Download The App",
    links: [
      { name: "Get it on Google Play", href: "#" },
      {
        name: "Download on the App Store",
        href: "#",
      },
    ],
  },
];

const Footer = () => {
  return (
    <div className="bg-appCardGold text-appDarkCard py-12 relative">
      <div className="absolute w-full h-full top-0 left-0 bg-appDarkGradient opacity-25"></div>
      <div className="inner relative flex justify-between gap-3 flex-col sm:flex-row items-start z-10">
        <div className=" grid items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {linksArray.map((linkSet, index) => (
            <FooterLinksSet
              key={index}
              linksName={linkSet.setofLinks}
              links={linkSet.links}
            />
          ))}
        </div>
        <FooterLogo />
      </div>
    </div>
  );
};

export default Footer;
