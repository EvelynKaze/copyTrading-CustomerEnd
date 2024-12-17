import { motion } from "framer-motion";
import Link from "next/link";

interface FooterLinkProps {
  linksName: string;
  links: { name: string; href: string }[];
}

const FooterLinksSet = ({ linksName, links }: FooterLinkProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 50 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ul className="text-sm">
        <li className="font-semibold mb-3">{linksName}</li>
        {links.map((link, index) => (
          <li className="opacity-75 mb-1 font-light" key={index}>
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default FooterLinksSet;
