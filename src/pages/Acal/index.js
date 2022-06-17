
import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import AddWorkShop from '../../components/global/AddWorkShop'

import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'


import toast from 'react-hot-toast'
import Loader from '../../components/global/Loader'


export default function Index() {

  const apiPrefix = process.env.REACT_APP_API_PREFIX
 
  let [isOpen, setIsOpen] = useState(false)

  // for reloading the table
  const [dataAdded, setDataAdded] = useState(false);

  // loader
  const [spinner, setSpinner] = useState(false);

  // overlay
  const [overlayOpen, setOverlayOpen] = useState(false)
  
  
  const [formData, setFormData] = useState({
    file:"",
    session:""
  })


  
  const handleFile = (e)=>{
    setFormData({ ...formData, file: e.target.files[0] });
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    formSave();
  }
  


  // Deleting Data
  const confirmDelete = async (acal_id)=>{
  if(  window.confirm("Are you sure you want to delete?")){
    console.log("Delete Now",acal_id)
    try{
      const res = await axios({
       method: "post",
       url:`${apiPrefix}/acal_del.php`,
       data: acal_id,
      })

      console.log("Acal delete response : ", res)
      toast.success(res.data.message)
      setDataAdded(!dataAdded)
    }catch(error){
      console.log(error)
    }
  }
  }


  // calling api for form submit
  // ${apiPrefix}/acal_add.php
  const formSave = async()=>{

    if(formData.session === "" || formData.file === ""){
      toast.error("All fields are required")
    }else{
    try{
      const res = await axios({
       method: "post",
       url:`${apiPrefix}/acal_add.php`,
       data: formData,
       headers: { "Content-Type": "multipart/form-data"}
      })

      console.log(res)
      toast.success(res.data.message)
      setDataAdded(!dataAdded)
      formData.session=''
      document.getElementById("my-form").reset()
          

    }catch(error){
      console.log(error)
    }
  }
  }
  







  // calling acal_show api 
  const [viewAcal, setViewAcal] = useState([]);
  
  useEffect(() => {
    setSpinner(true);
    axios.get(`${apiPrefix}/acal_show.php`).then((data) => {
      console.log("Incoming data from acal req:", data);
      setViewAcal(data.data);
      setSpinner(false);
      // setViewBranch((viewBranch.status = data.status));
      // console.log(viewBranch.status);
      //
    });
  }, [dataAdded]);

  


  


  // editing data
  const [updateFormData, setUpdateFormData] = useState({
    acal_id:"",
    session:"", 
    file:"",
  })

  
  const handleUpdateFile = (e)=>{
    setUpdateFormData({ ...updateFormData, file: e.target.files[0] });
  }
  

  const editAcal = (acal)=>{
    setOverlayOpen(true)
    setUpdateFormData({...updateFormData, acal_id:acal.acal_id, session:acal.session})
    // setUpdateFormData({...updateFormData, title:notification.notice})

    console.log("Academic Calendar Edit Request : ", acal)
  }

  const handleUpdate = (e)=>{
    // console.log("submit button clicked");
    e.preventDefault();
    updateFormSave();
  }

  const updateFormSave = async ()=>{

    if(updateFormData.session === ""){
      toast("Session is required")
    }else{
      console.log(updateFormData)
      try {
        const res = await axios({
          method: "post",
          url: `${apiPrefix}/acal_update.php`,
          data: updateFormData,
          headers: { "Content-Type": "multipart/form-data"},
          });

          console.log(res)
          toast.success(res.data.message)
          setDataAdded(!dataAdded)
          updateFormData.session = ""
          document.getElementById("my-update-form").reset()
          setOverlayOpen(false)
        } catch (error) {
          console.log(error)
        }
    }
  

  }






 return (
    <div className="flex flex-col flex-1">
      {/* <MyDialog isOpen={isOpen} setIsOpen={setIsOpen}/> */}

      <AddWorkShop isOpen={isOpen} setIsOpen={setIsOpen}/>

    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Academic Calendar</h1>
        
        </div>
      </div>



      {/* form start */}
      <div>
  <div className="md:grid md:grid-cols-1 md:gap-6">

    <div className="mt-5 md:mt-0 md:col-span-1">
      <form id="my-form">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 sm:col-span-1">
                <label htmlFor="company-website" className="block text-sm font-medium text-gray-700"> Session </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> Session </span>
                  <input type="text" value={formData.session} onChange={(e)=>{ setFormData({...formData, session:e.target.value}) }} name="session" id="company-website" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter Session"/>
                </div>
              

              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="company-website" className="block text-sm font-medium text-gray-700"> File </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input type="file" name="file" onChange={handleFile} id="company-website" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"/>
                </div>
              
              </div>
           
            </div>
          
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button type="submit" onClick={handleSubmit} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Academic Calendar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
      {/* form end */}







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
                        <Dialog.Title className="text-lg font-medium text-gray-900"> Update Academic Calendar </Dialog.Title>
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
                                  <input type="hidden" name="acal_id" value={updateFormData.acal_id}/>
                                <div className="col-span-1 sm:col-span-1">
                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700"> Title </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> Title </span>
                                      <input type="text" value={updateFormData.session} onChange={(e)=>{ setUpdateFormData({...updateFormData, session:e.target.value}) }}  name="title" id="company-website" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter Session"/>
                                    </div>
                                  </div>
                                  <div className="col-span-1 sm:col-span-1">
                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700"> File </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <input type="file" name="file" onChange={handleUpdateFile} id="company-website" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"/>
                                    
                                    </div>
                                  </div>
                              
                                </div>
                              
                              </div>
                              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit" onClick={handleUpdate} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Update Academic Calendar</button>
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








      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      S.No.
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Session
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      File
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Post Date &amp; Time
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Edit
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Delete
                    </th>
                   
                   
                  </tr>
                </thead>
                {!spinner?<tbody className="divide-y divide-gray-200 bg-white">
                {viewAcal?viewAcal.map((acal, idx) => {
                  return (
                    <tr key={acal.acal_id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {idx+1}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {acal.session}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <a className='text-indigo-600' href={`${apiPrefix}/files/acal/${acal.acal_file}`} target="_blank">Click here to view</a>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {acal.added_on}
                      </td>

                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                    <a  href="#" className="text-indigo-600 hover:text-indigo-900" onClick={()=>{editAcal(acal)}}>Edit</a>
                    </td>
                   
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                        <a href="#" onClick={()=>{confirmDelete(acal.acal_id)}} className="text-indigo-600 hover:text-indigo-900">
                          Delete
                          <span className="sr-only">, {acal.acal_id}</span>
                        </a>
                      </td>
                    </tr>
                  );
                }):"Sorry, no data found!"}
                </tbody>:<tr><td colSpan={6}><Loader/></td></tr>}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>


  )
}


