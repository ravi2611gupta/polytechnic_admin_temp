
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AddWorkShop from '../../components/global/AddWorkShop'

import toast from 'react-hot-toast'


export default function AddTeacher() {

 
  let [isOpen, setIsOpen] = useState(false)

  // for reloading the table
  const [dataAdded, setDataAdded] = useState(false);

  
  const [teacherFormData, setTeacherFormData] = useState({
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
    pic:"",
  })


  
  const handleFile = (e)=>{
    setTeacherFormData({ ...teacherFormData, pic: e.target.files[0] });
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    formSave();
  }
  

  // calling api for form submit
  const formSave = async()=>{

    if(teacherFormData.name === "" || teacherFormData.dob === "" || teacherFormData.gen==="" || teacherFormData.fname==="" || teacherFormData.mob==="" || teacherFormData.email==="" || teacherFormData.branch==="" || teacherFormData.deg==="" || teacherFormData.quali==="" || teacherFormData.address==="" || teacherFormData.pic===""){
      toast.error("All fields are required")
    }else{
      console.log(teacherFormData);
    try{
      const res = await axios({
       method: "post",
       url:"http://localhost/mohammadi_api/teacher_add.php",
       data: teacherFormData,
       headers: { "Content-Type": "multipart/form-data"}
      })

      console.log("Gallery Add : ",res)
      toast.success(res.data.message)
      setDataAdded(!dataAdded)
      teacherFormData.name=''
      teacherFormData.dob=''
      teacherFormData.gen=''
      teacherFormData.fname=''
      teacherFormData.mob=''
      teacherFormData.email=''
      teacherFormData.branch=''
      teacherFormData.deg=''
      teacherFormData.quali=''
      teacherFormData.address=''
      teacherFormData.pic=''
      document.getElementById("my-form").reset()
          

    }catch(error){
      console.log(error)
    }
  }
  }
  







  // fetching department 
  const [viewBranch, setViewBranch] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost/mohammadi_api/branch_show.php").then((data) => {
      console.log("Incoming data from branch req:", data);
      setViewBranch(data.data);
    });
  }, [dataAdded]);

  


 return (
    <div className="flex flex-col flex-1">
      {/* <MyDialog isOpen={isOpen} setIsOpen={setIsOpen}/> */}

      <AddWorkShop isOpen={isOpen} setIsOpen={setIsOpen}/>

    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Add Teacher</h1>        
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
                <label htmlFor="name" className="block text-sm font-medium text-gray-700"> Teacher Name </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> Name </span>
                  <input type="text" value={teacherFormData.name} onChange={(e)=>{ setTeacherFormData({...teacherFormData, name:e.target.value}) }} name="name" id="name" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter Name"/>
                </div>
              </div>
         
            <div className="col-span-2 sm:col-span-1">
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700"> Date of Birth </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> dob </span>
                  <input type="date" value={teacherFormData.dob} onChange={(e)=>{ setTeacherFormData({...teacherFormData, dob:e.target.value}) }} name="dob" id="dob" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter dob"/>
                </div>
              </div>

            <div className="col-span-2 sm:col-span-1">
                <label htmlFor="gen" className="block text-sm font-medium text-gray-700"> Gender </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <select value={teacherFormData.gen} onChange={(e)=>{ setTeacherFormData({...teacherFormData, gen:e.target.value}) }} name="type" id="type" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300">
                    <option value="" defaultChecked disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    </select>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="fname" className="block text-sm font-medium text-gray-700"> Father's Name </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input type="text" value={teacherFormData.fname} onChange={(e)=>{ setTeacherFormData({...teacherFormData, fname:e.target.value}) }} name="fname" id="fname" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter Father's Name"/>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="mob" className="block text-sm font-medium text-gray-700"> Mobile Number  </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input type="text" value={teacherFormData.mob} onChange={(e)=>{ setTeacherFormData({...teacherFormData, mob:e.target.value}) }} name="mob" id="mob" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter Mobile Number"/>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700"> Email  </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input type="email" value={teacherFormData.email} onChange={(e)=>{ setTeacherFormData({...teacherFormData, email:e.target.value}) }} name="email" id="email" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter Email"/>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="branch" className="block text-sm font-medium text-gray-700"> Department </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <select value={teacherFormData.branch} onChange={(e)=>{ setTeacherFormData({...teacherFormData, branch:e.target.value}) }} name="branch" id="branch" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300">
                    <option value="" defaultChecked disabled>Select Department</option>

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
                <label htmlFor="deg" className="block text-sm font-medium text-gray-700"> Designation </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input type="text" value={teacherFormData.deg} onChange={(e)=>{ setTeacherFormData({...teacherFormData, deg:e.target.value}) }} name="deg" id="deg" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter Designation"/>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="quali" className="block text-sm font-medium text-gray-700"> Highest Qualification </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input type="text" value={teacherFormData.quali} onChange={(e)=>{ setTeacherFormData({...teacherFormData, quali:e.target.value}) }} name="quali" id="quali" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter Qualification"/>
                </div>
              </div>



              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="pic" className="block text-sm font-medium text-gray-700"> Select Image </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input type="file" name="pic" onChange={handleFile} id="pic" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"/>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700"> Address </label>
              <div className="mt-1">
                <textarea id="address" name="address" value={teacherFormData.address} onChange={(e)=>{ setTeacherFormData({...teacherFormData, address:e.target.value}) }} rows="3" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"></textarea>
              </div>
            </div>





           
            </div>
          
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button type="submit" onClick={handleSubmit} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Teacher</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>


      {/* form end */}


     
    </div>

    </div>


  )
}


