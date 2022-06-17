
import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import AddWorkShop from '../../components/global/AddWorkShop'

import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'


import toast from 'react-hot-toast'
import Loader from '../../components/global/Loader'


export default function VideoLecture() {

  
  const apiPrefix = process.env.REACT_APP_API_PREFIX
 
 
  let [isOpen, setIsOpen] = useState(false)

  // for reloading the table
  const [dataAdded, setDataAdded] = useState(false);

  // loader
  const [spinner, setSpinner] = useState(false);

  // overlay
  const [overlayOpen, setOverlayOpen] = useState(false)
  
  
  const [committeeMemData, setCommitteeMemData] = useState({
    name:"",
    designation:"",
    cc_id:"",
  })


  const handleSubmit = (e)=>{
    e.preventDefault();
    formSave();
  }
  

  // calling api for form submit
  const formSave = async()=>{

    if(committeeMemData.name === "" || committeeMemData.designation === "" || committeeMemData.cc_id===""){
      toast.error("All fields are required")
    }else{
      console.log(committeeMemData);
    try{
      const res = await axios({
       method: "post",
       url:`${apiPrefix}/committee_mem_add.php`,
       data: committeeMemData,
       headers: { "Content-Type": "multipart/form-data"}
      })

      console.log("Committee Member Add : ",res)
      toast.success(res.data.message)
      setDataAdded(!dataAdded)
      committeeMemData.name=''
      committeeMemData.designation=''
      committeeMemData.cc_id=''
      document.getElementById("my-form").reset()
          

    }catch(error){
      console.log(error)
    }
  }
  }
  


  // fetching branches
  const [viewCommittee, setViewCommittee] = useState([]);
  
  useEffect(() => {
    setSpinner(true);
    axios.get(`${apiPrefix}/committee_show.php`).then((data) => {
      console.log("Incoming data from committee req:", data);
      setViewCommittee(data.data);
      setSpinner(false);
    });
  }, [dataAdded]);





  // calling committee member api 
  const [viewCommitteeMem, setViewCommitteeMem] = useState([]);
  
  useEffect(() => {
    axios.get(`${apiPrefix}/committee_mem_show.php`).then((data) => {
      console.log("Incoming data from gallery req:", data);
      setViewCommitteeMem(data.data);
    });
  }, [dataAdded]);


  

  

  // Deleting data
  const confirmDelete = async (com_id) => {
    if(window.confirm("Are you sure you want to delete?")){
      try{
        const res = await axios({
          method:"post",
          url:`${apiPrefix}/committee_mem_del.php`,
          data:com_id
        })
        console.log("Committee Member delete response : ", res)
        toast.success(res.data.message)
        setDataAdded(!dataAdded)
      }catch(error){
        console.log(error)
      }
    }
  }








  // updating Data

  const [updateFormData, setUpdateFormData] = useState({
    mem_id:"",
    name:"",
    designation:"",
    cc_id:"",
  })


  const editNotification = (commem)=>{
    setOverlayOpen(true)
    setUpdateFormData({...updateFormData, mem_id:commem.mem_id, name:commem.mem_name, designation:commem.mem_deg, cc_id:commem.committee_id})
    // setUpdateFormData({...updateFormData, title:notification.notice})

    console.log("Committee Member Edit Request : ", commem)
  }

  const handleUpdate = (e)=>{
    // console.log("submit button clicked");
    e.preventDefault();
    updateFormSave();
  }

  const updateFormSave = async ()=>{

    if(updateFormData.mem_id === "" ||  updateFormData.name==="" || updateFormData.designation==="" || updateFormData.cc_id===""){
      toast("All fields are required")
    }else{
      console.log("Data to be send for updation : ", updateFormData)
      try {
        const res = await axios({
          method: "post",
          url: `${apiPrefix}/committee_mem_update.php`,
          data: updateFormData
          });

          console.log("Response from update query : ", res)
          toast.success(res.data.message)
          setDataAdded(!dataAdded)
          updateFormData.title = ""
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
          <h1 className="text-xl font-semibold text-gray-900">Committee Member</h1>        
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
                <label htmlFor="cc_id" className="block text-sm font-medium text-gray-700"> Department </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <select value={committeeMemData.cc_id} onChange={(e)=>{ setCommitteeMemData({...committeeMemData, cc_id:e.target.value}) }} name="cc_id" id="cc_id" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300">
                    <option value="" defaultChecked disabled>Select Committee</option>

                    {/* department fetching form database */}
                    {viewCommittee?viewCommittee.map((committee)=>{
                      return(
                        <option value={committee.cc_id}>{committee.committee_name}</option>
                      )
                    }):""}

                    </select>
                </div>
              </div>

            <div className="col-span-2 sm:col-span-1">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700"> Name </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> Title </span>
                  <input type="text" value={committeeMemData.name} onChange={(e)=>{ setCommitteeMemData({...committeeMemData, name:e.target.value}) }} name="name" id="name" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter Member Name"/>
                </div>
              </div>
         
            

          
              <div className="col-span-2 sm:col-span-2">
                <label htmlFor="designation" className="block text-sm font-medium text-gray-700"> Designation </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> Designation </span>
                  <input type="text" value={committeeMemData.designation} onChange={(e)=>{ setCommitteeMemData({...committeeMemData, designation:e.target.value}) }} name="designation" id="designation" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter Designation"/>
                </div>
              </div>

            
         
           
            </div>
          
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button type="submit" onClick={handleSubmit} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Committee Member</button>
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
                        <Dialog.Title className="text-lg font-medium text-gray-900"> Update Committee Member </Dialog.Title>
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
                                  <input type="hidden" name="mem_id" value={updateFormData.mem_id}/>

                                  <div className="col-span-1 sm:col-span-1">
                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700"> Committee </label>
                                    <select value={updateFormData.cc_id} onChange={(e)=>{ setUpdateFormData({...updateFormData, cc_id:e.target.value}) }} name="cc_id" id="cc_id" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300">
                                    <option value="" disabled>Select Committee</option>

                                    {/* department fetching form database */}
                                    {viewCommittee?viewCommittee.map((committee)=>{
                                      return(
                                        <option value={committee.cc_id}>{committee.committee_name}</option>
                                      )
                                    }):""}

                                    </select>
                                  </div>

                                <div className="col-span-1 sm:col-span-1">
                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">Member Name </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> Name </span>
                                      <input type="text" value={updateFormData.name} onChange={(e)=>{ setUpdateFormData({...updateFormData, name:e.target.value}) }}  name="name" id="company-website" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter Member Name"/>
                                    </div>
                                  </div>
                              
                          
                              
                                <div className="col-span-1 sm:col-span-1">
                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700"> Designation </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> Designation </span>
                                      <input type="text" value={updateFormData.designation} onChange={(e)=>{ setUpdateFormData({...updateFormData, designation:e.target.value}) }}  name="designation" id="company-website" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter Designation"/>
                                    </div>
                                  </div>

                             
                                </div>
                              
                              </div>
                              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit" onClick={handleUpdate} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Update Committee Member</button>
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
                      Committee Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Member Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Designation
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
                {viewCommitteeMem?viewCommitteeMem.map((commem, idx) => {
                  return (
                    <tr key={commem.mem_id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {idx+1}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {commem.committee_name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {commem.mem_name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {commem.mem_deg}
                      </td>
                    
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {commem.mem_addedon}
                      </td>

                       
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                    <a  href="#" className="text-indigo-600 hover:text-indigo-900" onClick={()=>{editNotification(commem)}}>Edit</a>
                    </td>

                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                        <a href="#" onClick={()=>{confirmDelete(commem.mem_id)}} className="text-indigo-600 hover:text-indigo-900">
                          Delete
                          <span className="sr-only">, {commem.mem_id}</span>
                        </a>
                      </td>
                    </tr>
                  );
                }):"Sorry, no data found!"}
                </tbody>:<tr><td colSpan={7}><Loader/></td></tr>}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>


  )
}


