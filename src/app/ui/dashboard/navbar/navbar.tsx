import NavLinks from "./nav-links";

const Navbar = () => {
  return (
    <nav className="py-2 flex justify-center items-center gap-4 md:gap-8 bg-zinc-800 dark:bg-zinc-200">
      <NavLinks />
    </nav>
  );
};

export default Navbar;
