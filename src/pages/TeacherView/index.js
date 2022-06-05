import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import AddWorkShop from '../../components/global/AddWorkShop'


import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'


export default function ViewTeacher() {

  let [isOpen, setIsOpen] = useState(false)

  // for reloading the table
  const [dataAdded, setDataAdded] = useState(false);

  // overlay
  const [overlayOpen, setOverlayOpen] = useState(false)


  const [viewTeacher, setViewTeacher] = useState([])
  useEffect(()=>{
    axios.get("http://localhost/mohammadi_api/teacher_show.php").then((data)=>{
      console.log("Fetching Teacher Data : ",data)
      setViewTeacher(data.data)
    })
  }, [dataAdded])





  
  // fetching department 
  const [viewBranch, setViewBranch] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost/mohammadi_api/branch_show.php").then((data) => {
      console.log("Incoming data from branch req:", data);
      setViewBranch(data.data);
    });
  }, [dataAdded]);

  
  

  // Deleting data
  const confirmDelete = async (tech_id) => {
    if(window.confirm("Are you sure you want to delete?")){
      try{
        const res = await axios({
          method:"post",
          url:"http://localhost/mohammadi_api/teacher_del.php",
          data:tech_id
        })
        console.log("Teacher delete response : ", res)
        toast.success(res.data.message)
        setDataAdded(!dataAdded)
      }catch(error){
        console.log(error)
      }
    }
  }





  


  

  

  // editing data
  const [updateFormData, setUpdateFormData] = useState({
    tech_id:"",
    name:"",
    dob:"",
    gen:"",
    fname:"",
    mob:"",
    email:"",
    branch:"",
    deg:"",
    quali:"",
    address:"",
    file:"",
  })

  
  const handleUpdateFile = (e)=>{
    setUpdateFormData({ ...updateFormData, file: e.target.files[0] });
  }
  

  const editTeacher = (tech)=>{
    setOverlayOpen(true)
    setUpdateFormData({...updateFormData, tech_id:tech.tech_id, name:tech.name, dob:tech.dob, gen:tech.gender, fname:tech.fname, mob:tech.mobile, email:tech.email, branch:tech.dept_id, deg:tech.designation, quali:tech.qualification, address:tech.address})
    // setUpdateFormData({...updateFormData, title:notification.notice})
    console.log("Teacher Edit Request : ",tech)
  }

  const handleUpdate = (e)=>{
    // console.log("submit button clicked");
    e.preventDefault();
    updateFormSave();
  }

  const updateFormSave = async ()=>{

    if(updateFormData.tech_id === "" || updateFormData.name === "" || updateFormData.dob === "" || updateFormData.gen === "" || updateFormData.fname === "" || updateFormData.mob === "" || updateFormData.email === "" || updateFormData.branch === "" || updateFormData.deg === "" || updateFormData.quali === "" || updateFormData.address === ""){
      toast("All fields are required")
    }else{
      console.log(updateFormData)
      try {
        const res = await axios({
          method: "post",
          url: "http://localhost/mohammadi_api/teacher_update.php",
          data: updateFormData,
          headers: { "Content-Type": "multipart/form-data"},
          });

          console.log(res)
          toast.success(res.data.message)
          setDataAdded(!dataAdded)
          updateFormData.tech_id = ""
          updateFormData.name = ""
          updateFormData.dob = ""
          updateFormData.gen = ""
          updateFormData.fname = ""
          updateFormData.mob = ""
          updateFormData.email = ""
          updateFormData.branch = ""
          updateFormData.deg = ""
          updateFormData.quali = ""
          updateFormData.address = ""
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
          <h1 className="text-xl font-semibold text-gray-900">View Teachers</h1>
        </div>
      </div>




      <div className="mt-16 flex flex-col">
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
                      Pic
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Reg.Date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      DOB
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Gender
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Father's Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Mobile No.
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Department
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Designation
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Qualification
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Address
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
                  {viewTeacher?viewTeacher.map((teacher, idx) => (
                    <tr key={teacher.email}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {idx+1}
                      </td>
                      <td className="whitespace-nowrap text-sm text-gray-500"><img src={`http://localhost/mohammadi_api/files/teacher/${teacher.pic}`} alt="" /></td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{teacher.dor}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{teacher.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{teacher.dob}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{teacher.gender}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{teacher.fname}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{teacher.mobile}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{teacher.email}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{teacher.dept_name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{teacher.designation}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{teacher.qualification}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{teacher.address}</td>
                      
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                        <a href="#"  onClick={()=>{editTeacher(teacher)}} className="text-indigo-600 hover:text-indigo-900">
                          Edit<span className="sr-only">, {teacher.tech_id}</span>
                        </a>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                        <a href="#" onClick={()=>{confirmDelete(teacher.tech_id)}} className="text-indigo-600 hover:text-indigo-900">
                          Delete<span className="sr-only">, {teacher.tech_id}</span>
                        </a>
                      </td>
                    </tr>
                  )):"Sorry, no data found!"}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>




      

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
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900"> Update Teacher </Dialog.Title>
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
                                  <input type="hidden" name="file_id" value={updateFormData.tech_id}/>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700"> Title </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> Name </span>
                                      <input type="text" value={updateFormData.name} onChange={(e)=>{ setUpdateFormData({...updateFormData, name:e.target.value}) }}  name="name" id="company-website" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter Name"/>
                                    </div>
                                  </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700"> Date of Birth </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> dob </span>
                                      <input type="date" value={updateFormData.dob} onChange={(e)=>{ setUpdateFormData({...updateFormData, dob:e.target.value}) }}  name="company" id="company-website" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter DOB"/>
                                    </div>
                                  </div>

                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700"> Gender </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <select value={updateFormData.gen} onChange={(e)=>{ setUpdateFormData({...updateFormData, gen:e.target.value}) }} name="gen" id="gen" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300">
                                        <option value="" disabled>Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        </select>
                                    </div>
                                  </div>

                                  <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700"> Father's Name </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <input type="text" value={updateFormData.fname} onChange={(e)=>{ setUpdateFormData({...updateFormData, fname:e.target.value}) }}  name="fname" id="company-website" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter Father's Name"/>
                                    </div>
                                  </div>


                                  <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700"> Mobile Number </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <input type="text" value={updateFormData.mob} onChange={(e)=>{ setUpdateFormData({...updateFormData, mob:e.target.value}) }}  name="mob" id="company-website" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter Mobile Number"/>
                                    </div>
                                  </div>


                                  <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700"> Email </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <input type="email" value={updateFormData.email} onChange={(e)=>{ setUpdateFormData({...updateFormData, email:e.target.value}) }}  name="mob" id="company-website" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter Email"/>
                                    </div>
                                  </div>

                                  
                                  <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="branch" className="block text-sm font-medium text-gray-700"> Department </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <select value={updateFormData.branch} onChange={(e)=>{ setUpdateFormData({...updateFormData, branch:e.target.value}) }} name="branch" id="branch" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300">
                                        <option value="" disabled>Select Department</option>

                                        {/* department fetching form database */}
                                        {viewBranch?viewBranch.map((branch)=>{
                                          return(
                                            <option key={branch.dept_id} value={branch.dept_id}>{branch.dept_name}</option>
                                          )
                                        }):""}

                                        </select>
                                    </div>
                                  </div>


                                  <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700"> Designation </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <input type="text" value={updateFormData.deg} onChange={(e)=>{ setUpdateFormData({...updateFormData, deg:e.target.value}) }}  name="deg" id="company-website" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter Designation"/>
                                    </div>
                                  </div>



                                  <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700"> Qualification </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <input type="text" value={updateFormData.quali} onChange={(e)=>{ setUpdateFormData({...updateFormData, quali:e.target.value}) }}  name="quali" id="company-website" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter Qualification"/>
                                    </div>
                                  </div>

                                  <div className="col-span-1 sm:col-span-1">
                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700"> File </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <input type="file" name="file" onChange={handleUpdateFile} id="file" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"/>
                                    
                                    </div>
                                  </div>


                                  <div className="col-span-2 sm:col-span-2">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700"> Address </label>
                                    <div className="mt-1">
                                      <textarea id="address" name="address" value={updateFormData.address} onChange={(e)=>{ setUpdateFormData({...updateFormData, address:e.target.value}) }} rows="3" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"></textarea>
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








    </div>




  )
}

