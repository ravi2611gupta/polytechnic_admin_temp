import React, { useEffect, useState } from 'react'
import { Col, Input, Form, Label, Row } from "reactstrap";
import AddWorkShop from '../../components/global/AddWorkShop'
import Select from "react-select";
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../../components/global/Loader';

const people = [
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    // More people...
  ]





export default function Workshops() {

  let [isOpen, setIsOpen] = useState(false)


    // for reloading the table
    const [dataAdded, setDataAdded] = useState(false);

  // loader
  const [spinner, setSpinner] = useState(false);


  // fetching data from contact_show api add
  const [viewContact, setViewContact] = useState([])

  useEffect(()=>{
    setSpinner(true);
    axios.get("http://localhost/mohammadi_api/contact_show.php").then((data)=>{
      console.log("Getting Data from contact_show api : ", data)
      setViewContact(data.data)
      setSpinner(false);
    })
  }, [dataAdded])
  // fetching data from contact_show api end




  
  // Deleting data
  const confirmDelete = async (contact_id) => {
    if(window.confirm("Are you sure you want to delete?")){
      try{
        const res = await axios({
          method:"post",
          url:"http://localhost/mohammadi_api/contact_del.php",
          data:contact_id
        })
        console.log("Contact delete response : ", res)
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
          <h1 className="text-xl font-semibold text-gray-900">View Enquiries</h1>
        
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
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Mobile
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Message
                    </th>
                   
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Post Date &amp; Time
                    </th>
                   
                    
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Delete
                    </th>
                    
                   
                  </tr>
                </thead>
               {!spinner? <tbody className="divide-y divide-gray-200 bg-white">
                  {viewContact?viewContact.map((contact, idx) => (
                    <tr key={contact.con_id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {idx+1}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{contact.fname} {contact.lname}  </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{contact.email}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{contact.mobile}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{contact.message}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{contact.date}</td>
                 
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                        <a href="#" onClick={()=>{confirmDelete(contact.con_id)}} className="text-indigo-600 hover:text-indigo-900">
                          Delete<span className="sr-only">, {contact.name}</span>
                        </a>
                      </td>
                    </tr>
                  )):"Sorry, no data found!"}
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

