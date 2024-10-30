import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-zinc-400 border-zinc-500 dark:bg-zinc-800 dark:border-zinc-300 border-t p-8">
      <ul className="flex flex-col md:flex-row gap-4 md:gap-8 text-zinc-700 dark:text-zinc-300">
        <li>
          <Link href="/docs/contact">Contact</Link>
        </li>
        <li>
          <Link href="/docs/privacy">Privacy</Link>
        </li>
        <li>FAQ</li>
        <li>
          <Link href="/docs/return-policy">Return policy</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
