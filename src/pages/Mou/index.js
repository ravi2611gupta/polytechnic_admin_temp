import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import AddWorkShop from '../../components/global/AddWorkShop'

import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

import toast from 'react-hot-toast'
import Loader from '../../components/global/Loader'


export default function Mou() {

 
  const apiPrefix = process.env.REACT_APP_API_PREFIX
 
  let [isOpen, setIsOpen] = useState(false)

  // for reloading the table
  const [dataAdded, setDataAdded] = useState(false);

  // loader
  const [spinner, setSpinner] = useState(false);

  // overlay
  const [overlayOpen, setOverlayOpen] = useState(false)
  
  
  const [mouFormData, setMouFormData] = useState({
    title:"",
    company:"",
    file:"",
  })


  
  const handleFile = (e)=>{
    setMouFormData({ ...mouFormData, file: e.target.files[0] });
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    formSave();
  }
  

  // calling api for form submit
  const formSave = async()=>{

    if(mouFormData.title === "" || mouFormData.company === "" || mouFormData.file === ""){
      toast.error("All fields are required")
    }else{
    try{
      const res = await axios({
       method: "post",
       url:`${apiPrefix}/mou_add.php`,
       data: mouFormData,
       headers: { "Content-Type": "multipart/form-data"}
      })

      console.log("Gallery Add : ",res)
      toast.success(res.data.message)
      setDataAdded(!dataAdded)
      mouFormData.title=''
      mouFormData.company=''
      mouFormData.file=''
      document.getElementById("my-form").reset()
          

    }catch(error){
      console.log(error)
    }
  }
  }
  




  // calling acal_show api 
  const [viewMou, setViewMou] = useState([]);
  
  useEffect(() => {
    setSpinner(true);
    axios.get(`${apiPrefix}/mou_show.php`).then((data) => {
      console.log("Incoming data from gallery req:", data);
      setViewMou(data.data);
      setSpinner(false);
    });
  }, [dataAdded]);






  
  
  // Deleting data
  const confirmDelete = async (mou_id) => {
    if(window.confirm("Are you sure you want to delete?")){
      try{
        const res = await axios({
          method:"post",
          url:`${apiPrefix}/mou_del.php`,
          data:mou_id
        })
        console.log("MOU delete response : ", res)
        toast.success(res.data.message)
        setDataAdded(!dataAdded)
      }catch(error){
        console.log(error)
      }
    }
  }









  

  

  // editing data
  const [updateFormData, setUpdateFormData] = useState({
    doc_id:"",
    title:"",
    company:"", 
    file:"",
  })

  
  const handleUpdateFile = (e)=>{
    setUpdateFormData({ ...updateFormData, file: e.target.files[0] });
  }
  

  const editMou = (mou)=>{
    setOverlayOpen(true)
    setUpdateFormData({...updateFormData, doc_id:mou.doc_id, title:mou.title, company:mou.company})
    // setUpdateFormData({...updateFormData, title:notification.notice})
    // console.log("AICTE Edit Request : ",notification)
  }

  const handleUpdate = (e)=>{
    // console.log("submit button clicked");
    e.preventDefault();
    updateFormSave();
  }

  const updateFormSave = async ()=>{

    if(updateFormData.title === "" || updateFormData.company === ""){
      toast("Title and Company are required")
    }else{
      console.log(updateFormData)
      try {
        const res = await axios({
          method: "post",
          url: `${apiPrefix}/mou_update.php`,
          data: updateFormData,
          headers: { "Content-Type": "multipart/form-data"},
          });

          console.log(res)
          toast.success(res.data.message)
          setDataAdded(!dataAdded)
          updateFormData.title = ""
          updateFormData.company = ""
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
          <h1 className="text-xl font-semibold text-gray-900">MOU</h1>        
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
                <label htmlFor="title" className="block text-sm font-medium text-gray-700"> Title </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> Text1 </span>
                  <input type="text" value={mouFormData.title} onChange={(e)=>{ setMouFormData({...mouFormData, title:e.target.value}) }} name="title" id="title" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter Title"/>
                </div>
              </div>
         
            <div className="col-span-2 sm:col-span-1">
                <label htmlFor="company" className="block text-sm font-medium text-gray-700"> Company </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> Company </span>
                  <input type="text" value={mouFormData.company} onChange={(e)=>{ setMouFormData({...mouFormData, company:e.target.value}) }} name="company" id="company" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter Company Name"/>
                </div>
              </div>



              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="file" className="block text-sm font-medium text-gray-700"> Select File </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input type="file" name="file" onChange={handleFile} id="file" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"/>
                </div>
              
              </div>
           
            </div>
          
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button type="submit" onClick={handleSubmit} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add MOU</button>
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
                        <Dialog.Title className="text-lg font-medium text-gray-900"> Update MOU </Dialog.Title>
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
                                  <input type="hidden" name="file_id" value={updateFormData.doc_id}/>
                                <div className="col-span-1 sm:col-span-1">
                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700"> Title </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> Title </span>
                                      <input type="text" value={updateFormData.title} onChange={(e)=>{ setUpdateFormData({...updateFormData, title:e.target.value}) }}  name="title" id="company-website" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter Your Title"/>
                                    </div>
                                  </div>
                                <div className="col-span-1 sm:col-span-1">
                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700"> Company </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> company </span>
                                      <input type="text" value={updateFormData.company} onChange={(e)=>{ setUpdateFormData({...updateFormData, company:e.target.value}) }}  name="company" id="company-website" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter Company Name"/>
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
                                <button type="submit" onClick={handleUpdate} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Update MOU</button>
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
                      Title
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Company
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
               {!spinner? <tbody className="divide-y divide-gray-200 bg-white">
                {viewMou?viewMou.map((mou, idx) => {
                  return (
                    <tr key={mou.doc_id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {idx+1}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {mou.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {mou.company}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <a href={`${apiPrefix}/files/mou/${mou.file}`} className="text-indigo-600" target="_blank">Click here to view</a>
                      </td>
                     
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {mou.date}
                      </td>

                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                    <a  href="#" className="text-indigo-600 hover:text-indigo-900" onClick={()=>{editMou(mou)}}>Edit</a>
                    </td>

                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                        <a href="#" onClick={()=>{confirmDelete(mou.doc_id)}} className="text-indigo-600 hover:text-indigo-900">
                          Delete
                          <span className="sr-only">, {mou.doc_id}</span>
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


