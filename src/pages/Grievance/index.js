import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import AddWorkShop from '../../components/global/AddWorkShop'


export default function ViewGrievance() {

  let [isOpen, setIsOpen] = useState(false)

  // for reloading the table
  const [dataAdded, setDataAdded] = useState(false);


  const [viewGrievance, setViewGrievance] = useState([])
  useEffect(()=>{
    axios.get("http://localhost/mohammadi_api/grievance_show.php").then((data)=>{
      console.log("Fetching griv Data : ",data)
      setViewGrievance(data.data)
    })
  }, [dataAdded])


  

  
  
  // Deleting data
  const confirmDelete = async (griv_id) => {
    if(window.confirm("Are you sure you want to delete?")){
      try{
        const res = await axios({
          method:"post",
          url:"http://localhost/mohammadi_api/grievance_del.php",
          data:griv_id
        })
        console.log("Grievance delete response : ", res)
        toast.success(res.data.message)
        setDataAdded(!dataAdded)
      }catch(error){
        console.log(error)
      }
    }
  }


  

  
  
  // Updating Status data
  const confirmUpdate = async (griv_id) => {
    if(window.confirm("Are you sure that this grievance is resolved?")){
      try{
        const res = await axios({
          method:"post",
          url:"http://localhost/mohammadi_api/grievance_update.php",
          data:griv_id
        })
        console.log("Grievance updated response : ", res)
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
          <h1 className="text-xl font-semibold text-gray-900">View Grievance</h1>
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
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Enrollment No.
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Mobile
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Subject
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Message
                    </th>
                   
                  
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Date &amp; time
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Delete
                    </th>
                    
                   
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {viewGrievance?viewGrievance.map((griv, idx) => (
                    <tr key={griv.g_id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {idx+1}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{griv.stu_name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{griv.enroll_no}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{griv.mobile}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{griv.email}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{griv.subject}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{griv.msg}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{griv.date}</td>
                      
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                        {griv.status=='N'?<a href="#" onClick={()=>{confirmUpdate(griv.g_id)}} className="text-indigo-600 hover:text-indigo-900">
                          Pending<span className="sr-only">, {griv.tech_id}</span>
                        </a>:"Resolved"}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                        <a href="#" onClick={()=>{confirmDelete(griv.g_id)}} className="text-indigo-600 hover:text-indigo-900">
                          Delete<span className="sr-only">, {griv.tech_id}</span>
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

    </div>




  )
}

