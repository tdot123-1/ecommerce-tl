import NavLinks from "./nav-links";

const Navbar = () => {
  return (
    <nav className="bg-zinc-900 flex justify-between items-center px-5 py-5">
      <div>
        <span>Logo</span>
      </div>
      <div className="flex justify-evenly items-baseline w-60 text-zinc-400">
        <NavLinks />
      </div>
    </nav>
  );
};

export default Navbar;
