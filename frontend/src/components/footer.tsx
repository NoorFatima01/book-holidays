const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
        <span className="text-2xl sm:text-3xl text-white font-bold tracking-tight">
          BookHolidays.com
        </span>

        <span className="text-white font-bold tracking-tight flex flex-col lg:flex-row gap-2 lg:gap-4">
          <p className="cursor-pointer hover:underline">Privacy Policy</p>
          <p className="cursor-pointer hover:underline">Terms of Service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
