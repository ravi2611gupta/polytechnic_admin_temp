import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
 
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XIcon,
} from "@heroicons/react/outline";
import {
  BellIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  OfficeBuildingIcon,
  SearchIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import MobileSiderbar from "../../components/global/MobileSiderbar";
import Sidebar from "../../components/global/Sidebar";
import Header from "../../components/global/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/global/Loader";



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


  
  

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [viewNoti, setViewNoti] = useState([])
  const [notiCount, setNotiCount] = useState([])
  const [teacherCount, setTeacherCount] = useState([])
  const [contactCount, setContactCount] = useState([])

  // loader
  const [spinner, setSpinner] = useState(false);

  useEffect(()=>{
    setSpinner(true);
    axios.get("http://localhost/mohammadi_api/latest_noti_show.php").then((data)=>{
      // console.table(date);
      setViewNoti(data.data)
      setSpinner(false);
    })
    }, [])

  useEffect(()=>{
    setSpinner(true);
    axios.get("http://localhost/mohammadi_api/noti_count.php").then((data1)=>{
      // console.table(date);
      setNotiCount(data1.data[0])
      setSpinner(false);
    })
    }, [])

  useEffect(()=>{
    setSpinner(true);
    axios.get("http://localhost/mohammadi_api/teacher_count.php").then((data2)=>{
      // console.table(data2);
      setTeacherCount(data2.data[0])
      setSpinner(false);
    })
    }, [])

  useEffect(()=>{
    setSpinner(true);
    axios.get("http://localhost/mohammadi_api/contact_count.php").then((data3)=>{
      // console.table("Contact No. : ", data3.data[0].contact_no);
      setContactCount(data3.data[0])
      setSpinner(false);
    })
    }, [])



    
    const cards = [
      { name: "Notification", href: "/notice", icon: BellIcon, amount: `${notiCount.notice_no}` },
      { name: "Teachers", href: "/teacherview", icon: UsersIcon, amount: `${teacherCount.teacher_no}` },
      { name: "Enquiries", href: "/contact", icon: UserGroupIcon, amount: `${contactCount.contact_no}` },
    ];




  return (
    <>
     

        <main className="flex-1 pb-8">
          {/* Page header */}
          <div className="bg-white shadow">
            <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                <div className="flex-1 min-w-0">
                  {/* Profile */}
                  <div className="flex items-center">
                    <img
                      className="hidden h-20 w-20 rounded-full sm:block"
                      src={require('../../gpm-logo-black.png')}
                      alt=""
                    />
                    <div>
                      <div className="flex items-center">
                        <img
                          className="h-20 w-20 rounded-full sm:hidden"
                          src={require('../../gpm-logo-black.png')}
                          alt=""
                        />
                        <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                           Welcome Back, Admin
                        </h1>
                      </div>
                      <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                        <dt className="sr-only">Company</dt>
                        <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                          <OfficeBuildingIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          Govt. Polytechnic Mohammadi, Kheri
                        </dd>
                        <dt className="sr-only">Account status</dt>
                        <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                          <CheckCircleIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                            aria-hidden="true"
                          />
                          Verified account
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                  
                  <a href="http://localhost" target="_blank"
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                  >
                    Visit Your Website
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Overview
              </h2>
              <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {/* Card */}
                {cards.map((card) => (
                  <div
                    key={card.name}
                    className="bg-white overflow-hidden shadow rounded-lg border-2 border-green-200"
                  >
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <card.icon
                            className="h-6 w-6 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              {card.name}
                            </dt>
                            <dd>
                              <div className="text-lg font-medium text-gray-900">
                                {card.amount}
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3">
                      <div className="text-sm">
                        <Link
                          to={card.href}
                          className="font-medium text-cyan-700 hover:text-cyan-900"
                        >
                          View all
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
              Latest Notification
            </h2>

          

            {/* Activity table (small breakpoint and up) */}
            <div className="sm:block">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col mt-2">
                  <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th
                            className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            scope="col"
                          >
                            Notification
                          </th>
                          <th
                            className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            scope="col"
                          >
                            Type
                          </th>
                          <th
                            className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                            scope="col"
                          >
                            File
                          </th>
                          
                          <th
                            className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                            scope="col"
                          >
                            Date
                          </th>
                        </tr>
                      </thead>
                      {!spinner?<tbody className="bg-white divide-y divide-gray-200">
                        {viewNoti.map((noti) => (
                          <tr key={noti.file_id} className="bg-white">
                            <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <div className="flex">
                                  <BellIcon
                                    className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                  <p className="text-gray-500 truncate group-hover:text-gray-900">
                                    {noti.notice}
                                  </p>
                                
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                              {noti.type}
                            </td>
                            <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                              <a href={`http://localhost/mohammadi_api/files/notice/${noti.file_name}`} target="_blank" className="text-indigo-600 font-medium">
                                Click here to view
                              </a>
                            </td>
                            <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                              <span className="bg-green-100 text-green-800 p-2 rounded-xl">
                                {noti.date}
                              </span>
                            </td>
                            
                          </tr>
                        ))}
                      </tbody>:<tr><td colSpan={4}><Loader/></td></tr>}
                    </table>
                    {/* Pagination */}
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
 
    </>
  );
}
