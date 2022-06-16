import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import AddWorkShop from '../../components/global/AddWorkShop'
import Loader from '../../components/global/Loader';


export default function ViewRag() {

  let [isOpen, setIsOpen] = useState(false)

  // for reloading the table
  const [dataAdded,setDataAdded] = useState(false);

  // loader
  const [spinner, setSpinner] = useState(false);


  const [viewRag, setViewRag] = useState([])
  useEffect(()=>{
    setSpinner(true);
    axios.get("http://localhost/mohammadi_api/rag_show.php").then((data)=>{
      console.log("Fetching Anti Ragging Data : ",data)
      setViewRag(data.data)
      setSpinner(false);
    })
  }, [dataAdded])


  

  // Deleting data
  const confirmDelete = async (rag_id) => {
    if(window.confirm("Are you sure you want to delete?")){
      try{
        const res = await axios({
          method:"post",
          url:"http://localhost/mohammadi_api/rag_del.php",
          data:rag_id
        })
        console.log("Anti Ragging delete response : ", res)
        toast.success(res.data.message)
        setDataAdded(!dataAdded)
      }catch(error){
        console.log(error)
      }
    }
  }
  

  // Updation status
  const confirmUpdate = async (rag_id) => {
    if(window.confirm("Are you sure that this ragging request is resolved?")){
      try{
        const res = await axios({
          method:"post",
          url:"http://localhost/mohammadi_api/rag_update.php",
          data:rag_id
        })
        console.log("Anti Ragging update response : ", res)
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
          <h1 className="text-xl font-semibold text-gray-900">View Anti Ragging</h1>
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
                      Gender
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Parent's Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Mobile
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Parent's Mobile
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Course
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Year
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Address
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Complaints
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Delete
                    </th>
                    
                   
                  </tr>
                </thead>
                {!spinner? <tbody className="divide-y divide-gray-200 bg-white">
                  {viewRag?viewRag.map((rag, idx) => (
                    <tr key={rag.stu_email}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {idx+1}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{rag.stu_name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{rag.enroll_no}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{rag.gen}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{rag.parent_name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{rag.stu_email}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{rag.stu_mob}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{rag.parent_mob}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{rag.course}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{rag.year}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{rag.address}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{rag.complaint}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{rag.date}</td>
                      
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                        {rag.status=='N'?<a href="#" onClick={()=>{confirmUpdate(rag.rag_id)}} className="text-indigo-600 hover:text-indigo-900">
                          Pending<span className="sr-only">, {rag.tech_id}</span>
                        </a>:"Resolved"}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                        <a href="#" onClick={()=>{confirmDelete(rag.rag_id)}} className="text-indigo-600 hover:text-indigo-900">
                          Delete<span className="sr-only">, {rag.tech_id}</span>
                        </a>
                      </td>
                    </tr>
                  )):"Sorry, no data found!"}
                </tbody>:<tr><td colSpan={15}><Loader/></td></tr>}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>




  )
}

