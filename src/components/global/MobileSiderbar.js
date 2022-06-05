import { Fragment, useState } from "react";

import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  BookOpenIcon,
  CalendarIcon,
  DocumentAddIcon,
  ExternalLinkIcon,
  HomeIcon,
  PhotographIcon,
  TableIcon,
  UserAddIcon,
  UserGroupIcon,
  UserIcon,
  UsersIcon,
  VideoCameraIcon,
  XIcon,
} from "@heroicons/react/outline";
import {

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
export default function MobileSiderbar({sidebarOpen,setSidebarOpen}) {
  return (
    <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 flex z-40">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-cyan-700">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-shrink-0 flex items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/easywire-logo-cyan-300-mark-white-text.svg"
                      alt="Easywire logo"
                    />
                  </div>
                  <nav
                    className="mt-5 flex-shrink-0 h-full divide-y divide-cyan-800 overflow-y-auto"
                    aria-label="Sidebar"
                  >
                    <div className="px-2 space-y-1">
                      {navigation.map((item) => (
                        <Link
                          onClick={() => setSidebarOpen(false)}
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-cyan-800 text-white'
                              : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
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
                          <Link
                            key={item.name}
                            to={item.href}
                            onClick={() => setSidebarOpen(false)}
                            className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600"
                          >
                            <item.icon className="mr-4 h-6 w-6 text-cyan-200" aria-hidden="true" />
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </nav>
                </Dialog.Panel>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>
    </div>
  )
}
