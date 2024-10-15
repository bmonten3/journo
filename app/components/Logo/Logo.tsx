const Logo = () => {
  return (
    <a
      href="https://flowbite.com/"
      className="flex items-center ps-2.5 h-full pl-7 bg-gray-900"
    >
      <img
        src="https://flowbite.com/docs/images/logo.svg"
        className="h-6 me-3 sm:h-7"
        alt="Logo"
      />
      <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white bg-gray-900"></span>
    </a>
  );
};

export default Logo;
