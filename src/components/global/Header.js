
import { Dialog, Menu, Transition } from '@headlessui/react'
import { BellIcon, ChevronDownIcon, MenuAlt1Icon, SearchIcon } from '@heroicons/react/outline'
import React, { Fragment, useEffect, useState } from 'react'
import classNames from './../../utils/classnames'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";

import { XIcon } from '@heroicons/react/outline'


import { signOut } from '../../pages/Login/Redux/login.redux'
import { getAuth, updatePassword } from "firebase/auth";
import toast from 'react-hot-toast'

export default function Header({setSidebarOpen}) {

  const [passwordOne,setPasswordOne] = React.useState('');
  const [passwordTwo,setPasswordTwo] = React.useState('');

  const dispatch = useDispatch()
  let navigate = useNavigate();
  
  const auth = getAuth();
  const user = auth.currentUser;

  const logOutUser = ()=>{
    console.log("Loggin Out User");
    dispatch(signOut(navigate))
  }

  
  // overlay
  const [overlayOpen, setOverlayOpen] = useState(false)

  const changePass = (tt)=>{
    setOverlayOpen(true)
  }

  const handlePasswordChange = (e)=>{
    e.preventDefault();
    console.log(passwordOne,passwordTwo)
    if(passwordOne===passwordTwo){
      updatePassword(user, passwordOne).then(() => {
        // Update successful.
        logOutUser()
      }).catch((error) => {
        // An error ocurred
        console.log(error);
      });
    }else{
      toast.error("New password and confirm new password are not same!");
    }
  }


  return (
    <div>
         <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          {/* Search bar */}
          <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div className="flex-1 flex">
             
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              

              {/* Profile dropdown */}
              <Menu as="div" className="ml-3 relative">
                <div>
                  <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={require('../../gpm-logo-black.png')}
                      alt=""
                    />
                    <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                      <span className="sr-only">Open user menu for </span>
                      Admin
                    </span>
                    <ChevronDownIcon
                      className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#" onClick={()=>{changePass()}}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Change Password
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          onClick={logOutUser}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Logout
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>

               {/* side overlay start */}
    <Transition.Root show={overlayOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOverlayOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900"> Update Time Table &amp; Holiday </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => setOverlayOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {/* Replace with your content */}
                      <div className="absolute inset-0 px-4 sm:px-6">
                        <div className="h-full border-2 border-solid border-gray-200" aria-hidden="true" >
                        <form id='my-update-form'>
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                <div className="grid grid-cols-1 gap-6">

                                <div className="col-span-1 sm:col-span-1">
                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700"> New Password </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <input type="password"  name="newpass" id="company-website" value={passwordOne}     onChange={(e)=>{setPasswordOne(e.target.value)}}className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter Session"/>
                                    </div>
                                  </div>
                           
                            
                                <div className="col-span-1 sm:col-span-1">
                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">Confirm New Password </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <input type="password"  name="connewpass" id="company-website" value={passwordTwo} onChange={(e)=>{setPasswordTwo(e.target.value)}} className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter Session"/>
                                    </div>
                                  </div>
                                </div>
                              
                              </div>
                              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit" onClick={handlePasswordChange} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Change Password</button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      {/* /End replace */}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    {/* side overlay end */}


            </div>
          </div>
        </div>
    </div>
  )
}
