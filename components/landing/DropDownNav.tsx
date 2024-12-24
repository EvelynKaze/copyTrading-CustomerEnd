import { closeNav, selectMenu } from "@/store/navSlice";
import { motion } from "framer-motion";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

const DropDownNav = () => {
  const dispatch = useDispatch();

  const menu = useSelector(selectMenu);
  console.log(menu);
  return (
    menu && (
      <motion.div
        initial={{ opacity: 0, translateX: 50 }}
        whileInView={{ opacity: 1, translateX: 0 }}
        transition={{ ease: "easeInOut" }}
        className="absolute z-50 right-4 shadow border top-24 bg-white dark:bg-appDarkCard w-44 sm:w-40 overflow-hidden rounded-md"
      >
        <ul className="grid text-sm">
          <li
            onClick={() => dispatch(closeNav())}
            className="hover:bg-gray-300 dark:hover:bg-appDark sm:py-2 p-2 sm:px-4 cursor-pointer"
          >
            Solutions
          </li>
          <li
            onClick={() => dispatch(closeNav())}
            className="hover:bg-gray-300 dark:hover:bg-appDark sm:py-2 p-2 sm:px-4 cursor-pointer"
          >
            Company
          </li>
          <li
            onClick={() => {
              dispatch(closeNav());
            }}
            className="hover:bg-gray-300 dark:hover:bg-appDark sm:py-2 p-2 sm:px-4 cursor-pointer"
          >
            Resources
          </li>
          <Link
            href={"/login"}
            onClick={() => dispatch(closeNav())}
            className="hover:bg-gray-300 dark:hover:bg-appDark sm:py-2 p-2 sm:px-4 cursor-pointer"
          >
            Log in
          </Link>
          <Link
            href={"/signup"}
            onClick={() => dispatch(closeNav())}
            className="hover:bg-gray-300 dark:hover:bg-appDark sm:py-2 p-2 sm:px-4 cursor-pointer"
          >
            Sign up
          </Link>
        </ul>
      </motion.div>
    )
  );
};

export default DropDownNav;
