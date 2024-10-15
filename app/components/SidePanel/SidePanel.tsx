import { SignOutButton, useClerk, UserButton, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

interface NavItemProps {
  href?: any;
  icon?: any;
  text?: any;
}
const SidePanel = () => {
  const { user } = useUser();
  const router = useRouter();
  const { signOut } = useClerk();

  const handleOnClick = async () => {
    await signOut();
    window.location.reload();
    router.push('/');
  };

  return (
    <aside className="flex flex-col h-full bg-gray-900 text-gray-100">
      <div className="flex flex-col flex-grow overflow-y-auto">
        <nav className="flex-grow">
          <NavItem href="/dashboard" icon={<DashboardIcon />} text="Home" />
          <NavItem
            href="/journals"
            icon={<JournalIcon />}
            text="Journal History"
          />
          <NavItem href="/stats" icon={<GraphIcon />} text="Stats" />
          <NavItem href="/goals" icon={<SettingsIcon />} text="Goals" />
          <hr className="my-6 border-gray-700" />
          <NavItem href="#" icon={<TicketIcon />} text="Resources" />
        </nav>
      </div>
      <div className="p-4">
        <SignOutButton>
          <button
            onClick={handleOnClick}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            <LogoutIcon />
            <span className="ml-2">Sign Out</span>
          </button>
        </SignOutButton>
      </div>
    </aside>
  );
};

const NavItem: React.FC<NavItemProps> = ({ href, icon, text }) => (
  <a
    href={href}
    className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-800 hover:text-gray-200 transition-colors duration-300 rounded-md"
  >
    {icon}
    <span className="mx-4 font-medium">{text}</span>
  </a>
);

// Icon components
const DashboardIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const JournalIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const GraphIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TicketIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LogoutIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 3V5H17C18.1046 5 19 5.89543 19 7V17C19 18.1046 18.1046 19 17 19H15V21H17C19.2091 21 21 19.2091 21 17V7C21 4.79086 19.2091 3 17 3H15ZM9 3H11V5H9C7.89543 5 7 5.89543 7 7V17C7 18.1046 7.89543 19 9 19H11V21H9C7.79086 21 6.5 20.2091 6.5 19V5C6.5 3.79086 7.79086 3 9 3Z"
      fill="currentColor"
    />
  </svg>
);

export default SidePanel;
