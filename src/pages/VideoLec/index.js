
import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import AddWorkShop from '../../components/global/AddWorkShop'

import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'


import toast from 'react-hot-toast'
import Loader from '../../components/global/Loader'


export default function VideoLecture() {

 
  let [isOpen, setIsOpen] = useState(false)

  // for reloading the table
  const [dataAdded, setDataAdded] = useState(false);

  // loader
  const [spinner, setSpinner] = useState(false);
  
  // overlay
  const [overlayOpen, setOverlayOpen] = useState(false)
  
  
  const [videoFormData, setVideoFormData] = useState({
    title:"",
    branch:"",
    url:"",
    year:"",
    sub:""
  })


  const handleSubmit = (e)=>{
    e.preventDefault();
    formSave();
  }
  

  // calling api for form submit
  const formSave = async()=>{

    if(videoFormData.title === "" || videoFormData.branch === "" || videoFormData.url==="" || videoFormData.year==="" || videoFormData.sub===""){
      toast.error("All fields are required")
    }else{
      console.log(videoFormData);
    try{
      const res = await axios({
       method: "post",
       url:"http://localhost/mohammadi_api/video_add.php",
       data: videoFormData,
       headers: { "Content-Type": "multipart/form-data"}
      })

      console.log("Gallery Add : ",res)
      toast.success(res.data.message)
      setDataAdded(!dataAdded)
      videoFormData.title=''
      videoFormData.branch=''
      videoFormData.year=''
      videoFormData.url=''
      videoFormData.sub=''
      document.getElementById("my-form").reset()
          

    }catch(error){
      console.log(error)
    }
  }
  }
  


  // fetching branches
  const [viewBranch, setViewBranch] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost/mohammadi_api/branch_show.php").then((data) => {
      console.log("Incoming data from branch req:", data);
      setViewBranch(data.data);
    });
  }, [dataAdded]);





  // calling acal_show api 
  const [viewVideo, setViewVideo] = useState([]);
  
  useEffect(() => {
    setSpinner(true);
    axios.get("http://localhost/mohammadi_api/video_show.php").then((data) => {
      console.log("Incoming data from gallery req:", data);
      setViewVideo(data.data);
      setSpinner(false);
    });
  }, [dataAdded]);


  

  

  // Deleting data
  const confirmDelete = async (v_id) => {
    if(window.confirm("Are you sure you want to delete?")){
      try{
        const res = await axios({
          method:"post",
          url:"http://localhost/mohammadi_api/video_del.php",
          data:v_id
        })
        console.log("Video delete response : ", res)
        toast.success(res.data.message)
        setDataAdded(!dataAdded)
      }catch(error){
        console.log(error)
      }
    }
  }








  // updating Data

  const [updateFormData, setUpdateFormData] = useState({
    title:"",
    url:"",
    branch:"",
    year:"",
    sub:""
  })


  const editNotification = (video)=>{
    setOverlayOpen(true)
    setUpdateFormData({...updateFormData, v_id:video.v_id, title:video.title, branch:video.branch, year:video.year, sub:video.subject, url:video.url})
    // setUpdateFormData({...updateFormData, title:notification.notice})

    console.log("Notice Edit Request : ", video)
  }

  const handleUpdate = (e)=>{
    // console.log("submit button clicked");
    e.preventDefault();
    updateFormSave();
  }

  const updateFormSave = async ()=>{

    if(updateFormData.title === "" ||  updateFormData.branch==="" || updateFormData.url==="" || updateFormData.year==="" || updateFormData.sub===""){
      toast("All fields are required")
    }else{
      console.log("Data to be send for updation : ", updateFormData)
      try {
        const res = await axios({
          method: "post",
          url: "http://localhost/mohammadi_api/video_update.php",
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
          <h1 className="text-xl font-semibold text-gray-900">Video Lecture</h1>        
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
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> Title </span>
                  <input type="text" value={videoFormData.title} onChange={(e)=>{ setVideoFormData({...videoFormData, title:e.target.value}) }} name="title" id="title" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter title"/>
                </div>
              </div>
         
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="branch" className="block text-sm font-medium text-gray-700"> Department </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <select value={videoFormData.branch} onChange={(e)=>{ setVideoFormData({...videoFormData, branch:e.target.value}) }} name="branch" id="branch" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300">
                    <option value="" defaultChecked disabled>Select Department</option>

                    {/* department fetching form database */}
                    {viewBranch?viewBranch.map((branch)=>{
                      return(
                        <option value={branch.dept_id}>{branch.dept_name}</option>
                      )
                    }):""}

                    </select>
                </div>
              </div>


            <div className="col-span-2 sm:col-span-1">
                <label htmlFor="year" className="block text-sm font-medium text-gray-700"> Year </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <select value={videoFormData.year} onChange={(e)=>{ setVideoFormData({...videoFormData, year:e.target.value}) }} name="year" id="year" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300">
                    <option value="" defaultChecked disabled>Select Year</option>
                    <option value="first">First Year</option>
                    <option value="second">Second Year</option>
                    <option value="third">Third Year</option>
                    </select>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="url" className="block text-sm font-medium text-gray-700"> Link </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> Link </span>
                  <input type="text" value={videoFormData.url} onChange={(e)=>{ setVideoFormData({...videoFormData, url:e.target.value}) }} name="url" id="url" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter Link"/>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-2">
                <label htmlFor="sub" className="block text-sm font-medium text-gray-700"> Subject </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> Subject </span>
                  <input type="text" value={videoFormData.sub} onChange={(e)=>{ setVideoFormData({...videoFormData, sub:e.target.value}) }} name="sub" id="sub" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter Subject"/>
                </div>
              </div>


         
           
            </div>
          
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button type="submit" onClick={handleSubmit} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Video Lecture</button>
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
                        <Dialog.Title className="text-lg font-medium text-gray-900"> Update Branch </Dialog.Title>
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
                                  <input type="hidden" name="file_id" value={updateFormData.v_id}/>
                                <div className="col-span-1 sm:col-span-1">
                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700"> Title </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> Title </span>
                                      <input type="text" value={updateFormData.title} onChange={(e)=>{ setUpdateFormData({...updateFormData, title:e.target.value}) }}  name="title" id="company-website" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter Title"/>
                                    </div>
                                  </div>
                              
                                <div className="col-span-1 sm:col-span-1">
                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700"> Department </label>
                                    <select value={updateFormData.branch} onChange={(e)=>{ setVideoFormData({...updateFormData, branch:e.target.value}) }} name="branch" id="branch" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300">
                                    <option value="" disabled>Select Department</option>

                                    {/* department fetching form database */}
                                    {viewBranch?viewBranch.map((branch)=>{
                                      return(
                                        <option value={branch.dept_id}>{branch.dept_name}</option>
                                      )
                                    }):""}

                                    </select>
                                  </div>
                              
                                <div className="col-span-1 sm:col-span-1">
                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700"> Subject </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> Subject </span>
                                      <input type="text" value={updateFormData.sub} onChange={(e)=>{ setUpdateFormData({...updateFormData, sub:e.target.value}) }}  name="sub" id="company-website" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter Subject"/>
                                    </div>
                                  </div>

                                  <div className="col-span-1 sm:col-span-1">
                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700"> Year </label>
                                    <select value={updateFormData.year} onChange={(e)=>{ setVideoFormData({...updateFormData, year:e.target.value}) }} name="year" id="year" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300">
                                      <option value="" disabled>Select Year</option>
                                      <option value="first">First Year</option>
                                      <option value="second">Second Year</option>
                                      <option value="third">Third Year</option>
                                      </select>
                                  </div>
                              
                                <div className="col-span-1 sm:col-span-1">
                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700"> URL </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> URL </span>
                                      <input type="text" value={updateFormData.url} onChange={(e)=>{ setUpdateFormData({...updateFormData, url:e.target.value}) }}  name="url" id="company-website" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter URL"/>
                                    </div>
                                  </div>
                              
                                </div>
                              
                              </div>
                              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit" onClick={handleUpdate} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Update Video Lecture</button>
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
                      Branch
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Year
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Subject
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Link
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
                {viewVideo?viewVideo.map((video, idx) => {
                  return (
                    <tr key={video.v_id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {idx+1}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {video.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {video.dept_name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {video.year}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {video.subject}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <a href={`${video.url}`} target="_blank" className='text-indigo-600' rel="noopener noreferrer">Click here to view</a>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {video.date}
                      </td>

                       
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                    <a  href="#" className="text-indigo-600 hover:text-indigo-900" onClick={()=>{editNotification(video)}}>Edit</a>
                    </td>

                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                        <a href="#" onClick={()=>{confirmDelete(video.v_id)}} className="text-indigo-600 hover:text-indigo-900">
                          Delete
                          <span className="sr-only">, {video.v_id}</span>
                        </a>
                      </td>
                    </tr>
                  );
                }):"Sorry, no data found!"}
                </tbody>:<tr><td colSpan={9}><Loader/></td></tr>}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>


  )
}


