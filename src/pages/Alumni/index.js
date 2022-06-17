import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import AddWorkShop from '../../components/global/AddWorkShop'
import Loader from '../../components/global/Loader'

 
export default function Workshops() {

  
  const apiPrefix = process.env.REACT_APP_API_PREFIX
 
  let [isOpen, setIsOpen] = useState(false)

  // for reloading the table
  const [dataAdded, setDataAdded] = useState(false);
  
  // loader
  const [spinner, setSpinner] = useState(false);


  // view_alumni api call
  const [viewAlumni, setViewAlumni] = useState([])
  useEffect(()=>{
    setSpinner(true);
    axios.get(`${apiPrefix}/alumni_show_all.php`).then((data)=>{
      console.log("Console from alumni page : ", data)
      setViewAlumni(data.data)
      setSpinner(false);
      // setViewAlumni(!viewAlumni.status)
    })
  }, [dataAdded])



  

  // Deleting data
  const confirmDelete = async (alumni_id) => {
    if(window.confirm("Are you sure you want to delete?")){
      try{
        const res = await axios({
          method:"post",
          url:`${apiPrefix}/alumni_del.php`,
          data:alumni_id
        })
        console.log("Alumni delete response : ", res)
        toast.success(res.data.message)
        setDataAdded(!dataAdded)
      }catch(error){
        console.log(error)
      }
    }
  }




  // Update data
  const alumniUpdate = async (alumni_id) => {
    if(window.confirm("Are you sure you want to update status?")){
      try{
        const res = await axios({
          method:"post",
          url:`${apiPrefix}/alumni_update.php`,
          data:alumni_id
        })
        console.log("Alumni Update response : ", res)
        toast.success(res.data.message)
        setDataAdded(!dataAdded)
      }catch(error){
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
          <h1 className="text-xl font-semibold text-gray-900">View Alumni</h1>
        
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
                      Student Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Enrollment No.
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Parent Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Branch
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Year
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Mobile
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Mark
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Company
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Designation
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Feedback
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      About
                    </th>
                   
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      CV
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Post Date &amp; Time
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Delete
                    </th>
                    
                   
                  </tr>
                </thead>
                {!spinner?<tbody className="divide-y divide-gray-200 bg-white">
                {viewAlumni?viewAlumni.map((alumni, idx) => {
                  return (
                    <tr key={alumni.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {idx+1}
                    </td>
                    <td className="whitespace-nowrap w-52 text-sm text-gray-500"><img src={`${apiPrefix}/files/alumni_pic/${alumni.pic}`} style={{width:"100px"}} alt="" /></td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{alumni.name}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{alumni.enrollment}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{alumni.fname}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{alumni.branch}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{alumni.year}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{alumni.mob}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{alumni.email}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{alumni.marks}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{alumni.company}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{alumni.designation}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{alumni.feedback}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{alumni.about}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><a className='text-indigo-600' href={`${apiPrefix}/files/alumni_cv/${alumni.cv}`} target="_blank">Click here to view</a></td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{alumni.date}</td>
                    
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                      <a href="#" onClick={()=>{alumniUpdate(alumni.id)}} className="text-indigo-600 hover:text-indigo-900">
                      {alumni.status=='N'?'Show':'Hide'}<span className="sr-only">, {alumni.name}</span>
                      </a>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                      <a href="#" onClick={()=>{confirmDelete(alumni.id)}} className="text-indigo-600 hover:text-indigo-900">
                        Delete<span className="sr-only">, {alumni.name}</span>
                      </a>
                    </td>
                  </tr>
                  );
                }):"Sorry, no data found!"}
                </tbody>:<tr><td colSpan={18}><Loader/></td></tr>}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>


  )
}


