import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import AddWorkShop from "../../components/global/AddWorkShop";
import { useFormik } from "formik";


import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

import * as Yup from "yup";
import toast from "react-hot-toast";
import Loader from "../../components/global/Loader";

export default function Workshops() {
  let [isOpen, setIsOpen] = useState(false);

  // for reloading the table
  const [dataAdded, setDataAdded] = useState(false);
 
  // loader
  const [spinner, setSpinner] = useState(false);

  // overlay
  const [overlayOpen, setOverlayOpen] = useState(false)
  

  // step 1 : create initial values
  const initialValues = {
    committee: "",
  };

  // step 2 : create validation schema for form fields using yup
  const CommiteeFormSchema = Yup.object().shape({
    committee: Yup.string()
      .min(3, "Minimum 3 Letter")
      .required("Committee Is Required"),
  });

  // Initialize Formik Form
  const formik = useFormik({
    initialValues,
    validationSchema: CommiteeFormSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      console.log("Form Submited");
      formSave(values);
    },
  });

  const formSave = async (val) => {
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost/mohammadi_api/committee_add.php",
        data: val,
      });

      console.log(res);
      toast.success(res.data.message);
      setDataAdded(!dataAdded);
      val.committee = "";
    } catch (error) {
      console.log(error);
    }
  };





  
  // calling view branch api
  const [viewCommittee, setViewCommittee] = useState([]);
  useEffect(() => {
    setSpinner(true);
    axios.get("http://localhost/mohammadi_api/committee_show.php").then((res) => {
      console.log("Incoming data from Branch req:", res);
      setViewCommittee(res.data);
      setSpinner(false);
    });
  }, [dataAdded]);



  

  // Deleting data
  const confirmDelete = async (cc_id) => {
    if(window.confirm("Are you sure you want to delete?")){
      try{
        const res = await axios({
          method:"post",
          url:"http://localhost/mohammadi_api/committee_del.php",
          data:cc_id
        })
        console.log("Committee delete response : ", res)
        toast.success(res.data.message)
        setDataAdded(!dataAdded)
      }catch(error){
        console.log(error)
      }
    }
  }




  // updating data
  const [updateFormData, setUpdateFormData] = useState({
    cc_id:"",
    committee:""
  })

  
  const editBranch = (committee)=>{

    setOverlayOpen(true)
    setUpdateFormData({...updateFormData, cc_id:committee.cc_id,committee:committee.committee_name})
    
  }

  const handleUpdate = (e) =>{
    e.preventDefault()
    updateFormSave()
  }

  const updateFormSave = async () =>{
    if(updateFormData.committee === ""){
      toast("Committee is required")
    }else{
      // console.log("sending data for updation : ", updateFormData)
      try {
        const res = await axios({
          method: "post",
          url: "http://localhost/mohammadi_api/committee_update.php",
          data: updateFormData,
        });
  
        // console.log("Getting response form update query : ", res);
        toast.success(res.data.message);
        setDataAdded(!dataAdded);
        updateFormData.branch = "";
        document.getElementById("my-update-form").reset()
        setOverlayOpen(false)
      } catch (error) {
        console.log(error);
      }
  }

}

  

  return (
    <div className="flex flex-col flex-1">
      {/* <MyDialog isOpen={isOpen} setIsOpen={setIsOpen}/> */}
      <AddWorkShop isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Committee</h1>
          </div>
        </div>

        {/* form start */}
        <div>
          <div className="md:grid md:grid-cols-1 md:gap-6">
            <div className="mt-5 md:mt-0 md:col-span-1">
              <form onSubmit={formik.handleSubmit}>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="col-span-1 sm:col-span-1">
                        <label
                          htmlFor="company-website"
                          className="block text-sm font-medium text-gray-700"
                        >
                          {" "}
                          Committee Name{" "}
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            {" "}
                            Committee{" "}
                          </span>
                          <input
                            type="text"
                            {...formik.getFieldProps("committee")}
                            name="committee"
                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                            placeholder="Enter Your Committee Name"
                          />
                        </div>
                        {formik.touched.committee && formik.errors.committee ? (
                          <div className=" text-xs text-red-700">
                            {formik.errors.committee}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Add Committee
                    </button>
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
                        <Dialog.Title className="text-lg font-medium text-gray-900"> Update Committee </Dialog.Title>
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
                                  <input type="hidden" name="file_id" value={updateFormData.branch_id}/>
                                <div className="col-span-1 sm:col-span-1">
                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700"> Committee Name </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"> Committee </span>
                                      <input type="text" value={updateFormData.committee} onChange={(e)=>{ setUpdateFormData({...updateFormData, committee:e.target.value}) }}  name="branch" id="company-website" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Enter Committee Name"/>
                                    </div>
                                  </div>
                              
                                </div>
                              
                              </div>
                              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit" onClick={handleUpdate} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Update Committee</button>
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
                      Committee
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
              {viewCommittee?viewCommittee.map((committee, idx) => {
                return (
                  <tr key={committee.cc_id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {idx+1}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{committee.committee_name}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{committee.created_at}</td>
                    
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                      <a href="#" onClick={()=>{editBranch(committee)}} className="text-indigo-600 hover:text-indigo-900">
                        Edit<span className="sr-only">, {committee.cc_id}</span>
                      </a>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                      <a href="#" onClick={()=>{confirmDelete(committee.cc_id)}} className="text-indigo-600 hover:text-indigo-900">
                        Delete<span className="sr-only">, {committee.cc_id}</span>
                      </a>
                    </td>
                  </tr>
                );
              }):"Sorry, no data found!"}
                </tbody>:<tr><td colSpan={5}><Loader/></td></tr>}
              </table>
            </div>
          </div>
        </div>
      </div>

      </div>
    </div>
  );
}
