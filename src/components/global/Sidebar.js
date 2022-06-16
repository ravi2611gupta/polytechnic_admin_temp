
import {
  
  HomeIcon,
  UserGroupIcon,
  BookOpenIcon,
  UserAddIcon,
  PhotographIcon,
  DocumentAddIcon,
} from "@heroicons/react/outline";
import {
  BellIcon,
  CalendarIcon,
  ExternalLinkIcon,
  TableIcon,
  UserIcon,
  UsersIcon,
  VideoCameraIcon,
} from "@heroicons/react/solid";

import { Link } from "react-router-dom";


function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  


const navigation = [
    { name: "Dashboad", href: "/dashboard", icon: HomeIcon, current: true },
    { name: "Notification", href: "/notice", icon: BellIcon, current: false },
    { name: "Branch", href: "/branch", icon: BookOpenIcon, current: false },
    { name: "Video Lecture", href: "/videolec", icon: VideoCameraIcon, current: false },
    { name: "AICTE", href: "/aicte", icon: DocumentAddIcon, current: false },
    { name: "MOU", href: "/mou", icon: DocumentAddIcon, current: false },
    { name: "Add Teacher", href: "/teacheradd", icon: UserAddIcon, current: false },
    { name: "View Teacher", href: "/teacherview", icon: UserIcon, current: false },
    { name: "Committee", href: "/committee", icon: UserIcon, current: false },
    { name: "Committee Member", href: "/committeemem", icon: UserIcon, current: false },
    { name: "Slider", href: "/slider", icon: PhotographIcon, current: false },
    { name: "Gallery", href: "/gallery", icon: PhotographIcon, current: false },
    { name: "Academic Calendar", href: "/acal", icon: CalendarIcon, current: false },
    { name: "Time Table and Holiday", href: "/timetable", icon: TableIcon, current: false },
    { name: "Result", href: "/result", icon: ExternalLinkIcon, current: false },
    { name: "Grievance", href: "/grievance", icon: UsersIcon, current: false },
    { name: "Anti Ragging", href: "/rag", icon: UsersIcon, current: false },
    { name: "Alumni", href: "/alumni", icon: UsersIcon, current: false },
    { name: "Contact", href: "/contact", icon: UserGroupIcon, current: false },
  ];
  const secondaryNavigation = [
    // { name: "Settings", href: "#", icon: CogIcon },
    // { name: "Help", href: "#", icon: QuestionMarkCircleIcon },
    // { name: "Privacy", href: "#", icon: ShieldCheckIcon },
  ];


export default function Sidebar({sidebarOpen,setSidebarOpen}) {
  return (
    <div>
          <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow bg-cyan-700 pt-5 pb-4 overflow-y-auto">
            {/* <div className="flex items-center flex-shrink-0 px-4">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/easywire-logo-cyan-300-mark-white-text.svg"
                alt="Easywire logo"
              />
            </div> */}
            <nav className="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto" aria-label="Sidebar">
              <div className="px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                      'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200" aria-hidden="true" />
                    {item.name}
                  </Link>
                ))}
              </div>



              <div className="mt-6 pt-6">
                <div className="px-2 space-y-1">
                  {secondaryNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                    >
                      <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
    </div>
  )
}
