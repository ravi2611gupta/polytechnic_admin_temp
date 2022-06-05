
import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import AddWorkShop from '../../components/global/AddWorkShop'

import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'


import toast from 'react-hot-toast'


export default function Index() {

 
  let [isOpen, setIsOpen] = useState(false)

  // for reloading the table
  const [dataAdded, setDataAdded] = useState(false);
 
  // overlay
  const [overlayOpen, setOverlayOpen] = useState(false)
  
  
  const [formData, setFormData] = useState({
    texta:"",
    textb:"",
    file:"",
    type:""
  })


  
  const handleFile = (e)=>{
    setFormData({ ...formData, file: e.target.files[0] });
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    formSave();
  }
  

  // calling api for form submit
  const formSave = async()=>{

    if(formData.texta === "" || formData.textb === "" || formData.file==="" || formData.type===""){
      toast.error("All fields are required")
    }else{
      console.log(formData);
    try{
      const res = await axios({
       method: "post",
       url:"http://localhost/mohammadi_api/gallery_add.php",
       data: formData,
       headers: { "Content-Type": "multipart/form-data"}
      })

      console.log("Gallery Add : ",res)
      toast.success(res.data.message)
      setDataAdded(!dataAdded)
      formData.texta=''
      formData.textb=''
      formData.type=''
      formData.file=''
      document.getElementById("my-form").reset()
          

    }catch(error){
      console.log(error)
    }
  }
  }
  







  // calling acal_show api 
  const [viewGallery, setViewGallery] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost/mohammadi_api/gallery_show_all.php").then((data) => {
      console.log("Incoming data from gallery req:", data);
      setViewGallery(data.data);
    });
  }, [dataAdded]);




  
  
  // Deleting data
  const confirmDelete = async (gallery_id) => {
    if(window.confirm("Are you sure you want to delete?")){
      try{
        const res = await axios({
          method:"post",
          url:"http://localhost/mohammadi_api/gallery_del.php",
          data:gallery_id
        })
        console.log("Gallery delete response : ", res)
        toast.success(res.data.message)
        setDataAdded(!dataAdded)
      }catch(error){
        console.log(error)
      }
    }
  }

  


  
  // editing data
  const [updateFormData, setUpdateFormData] = useState({
    gal_id:"",
    text1:"",
    text2:"", 
    type:"", 
    file:"",
  })

  
  const handleUpdateFile = (e)=>{
    setUpdateFormData({ ...updateFormData, file: e.target.files[0] });
  }
  

  const editGallery = (gal)=>{
    setOverlayOpen(true)
    setUpdateFormData({...updateFormData, gal_id:gal.gal_id, text1:gal.text1, text2:gal.text2, type:gal.type})
    // setUpdateFormData({...updateFormData, title:notification.notice})
    // console.log("Slider Edit Request : ",slider)
  }

  const handleUpdate = (e)=>{
    // console.log("submit button clicked");
    e.preventDefault();
    updateFormSave();
  }

  const updateFormSave = async ()=>{

    if(updateFormData.gal_id === "" || updateFormData.text1 === "" || updateFormData.text2 === "" || updateFormData.type === ""){
      toast("All fields are required!")
    }else{
      console.log(updateFormData)
      try {
        const res = await axios({
          method: "post",
          url: "http://localhost/mohammadi_api/gallery_update.php",
          data: updateFormData,
          headers: { "Content-Type": "multipart/form-data"},
          });

          console.log(res)
          toast.success(res.data.message)
          setDataAdded(!dataAdded)
          updateFormData.gal_id = ""
          updateFormData.text1 = ""
          updateFormData.text2 = ""
          updateFormData.type = ""
          updateFormData.file = ""
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
          <h1 className="text-xl font-semibold text-gray-900">Gallery</h1>        
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
                <label htmlFor="texta" className="block text-sm font-medium text-gray-700"> Text1 </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> Text1 </span>
                  <input type="text" value={formData.texta} onChange={(e)=>{ setFormData({...formData, texta:e.target.value}) }} name="texta" id="texta" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter text"/>
                </div>
              </div>
         
            <div className="col-span-2 sm:col-span-1">
                <label htmlFor="textb" className="block text-sm font-medium text-gray-700"> Text2 </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> Text2 </span>
                  <input type="text" value={formData.textb} onChange={(e)=>{ setFormData({...formData, textb:e.target.value}) }} name="textb" id="textb" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter text"/>
                </div>
              </div>

            <div className="col-span-2 sm:col-span-1">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700"> Type </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <select value={formData.type} onChange={(e)=>{ setFormData({...formData, type:e.target.value}) }} name="type" id="type" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300">
                    <option value="" defaultChecked disabled>Select Type</option>
                    <option value="gallery">Gallery</option>
                    <option value="sports">Sports</option>
                    <option value="seminar">Seminar</option>
                    <option value="annual">Annual</option>
                    </select>
                </div>
              </div>


              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="file" className="block text-sm font-medium text-gray-700"> Select Image </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input type="file" name="file" onChange={handleFile} id="file" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"/>
                </div>
              
              </div>
           
            </div>
          
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button type="submit" onClick={handleSubmit} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Gallery Image</button>
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
                        <Dialog.Title className="text-lg font-medium text-gray-900"> Update Gallery </Dialog.Title>
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
                                  <input type="hidden" name="gal_id" value={updateFormData.gal_id}/>
                                <div className="col-span-1 sm:col-span-1">
                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700"> Text 1 </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> Text 1 </span>
                                      <input type="text" value={updateFormData.text1} onChange={(e)=>{ setUpdateFormData({...updateFormData, text1:e.target.value}) }}  name="text1" id="company-website" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter Text 1"/>
                                    </div>
                                  </div>
                                <div className="col-span-1 sm:col-span-1">
                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700"> Text 2 </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> Text 2 </span>
                                      <input type="text" value={updateFormData.text2} onChange={(e)=>{ setUpdateFormData({...updateFormData, text2:e.target.value}) }}  name="text2" id="company-website" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter text 2"/>
                                    </div>
                                  </div>

                                  <div className="col-span-1 sm:col-span-1">
                                    <label htmlFor="type" className="block text-sm font-medium text-gray-700"> Type </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <select value={updateFormData.type} onChange={(e)=>{ setUpdateFormData({...updateFormData, type:e.target.value}) }} name="type" id="type" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300">
                                        <option value="" disabled>Select Type</option>
                                        <option value="gallery">Gallery</option>
                                        <option value="sports">Sports</option>
                                        <option value="seminar">Seminar</option>
                                        <option value="annual">Annual</option>
                                        </select>
                                    </div>
                                  </div>

                                  <div className="col-span-1 sm:col-span-1">
                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700"> Upload Image </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <input type="file" name="file" onChange={handleUpdateFile} id="company-website" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"/>
                                    </div>
                                  </div>
                              
                                </div>
                              
                              </div>
                              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit" onClick={handleUpdate} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Update Gallery</button>
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
                      Image
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Text1
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Text2
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Type
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
                <tbody className="divide-y divide-gray-200 bg-white">
                {viewGallery?viewGallery.map((gal, idx) => {
                  return (
                    <tr key={gal.gal_id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {idx+1}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <img src={`http://localhost/mohammadi_api/files/gallery/${gal.pic}`} style={{height:"100px"}} alt="" />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {gal.text1}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {gal.text2}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {gal.type}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {gal.date}
                      </td>
                      
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900" onClick={()=>{editGallery(gal)}}>Edit</a>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                        <a href="#" onClick={()=>{confirmDelete(gal.gal_id)}} className="text-indigo-600 hover:text-indigo-900">
                          Delete
                          <span className="sr-only">, {gal.gal_id}</span>
                        </a>
                      </td>
                    </tr>
                  );
                }):"Sorry, no data found!"}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>


  )
}


