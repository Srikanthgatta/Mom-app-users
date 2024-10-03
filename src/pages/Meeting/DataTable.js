import React from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PlaceIcon from "@mui/icons-material/Place";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useDispatch } from "react-redux";
import { confirmMeet, notConfirmMeet } from "../../api/meeting";


function DataTable({ data, userId }) {
  const dispatch = useDispatch()
  return (
    <div>
      <div>
      {data?.map((item, i) => {
        return (
          <div class="flex border items-center justify-center w-full">
            <div class="text-center w-full">
              <div class=" py-10 md:mb-4 lg:py-10 w-full lg:h-auto bg-white">
                <div class="relative  px-4 md:px-4 mx-auto">
                  <div class="w-full px-4 mb-3 xl:mb-0">
                    <div class="max-w-md md:max-w-lg mx-auto  text-left">
                      <h1 class="font-bold text-4xl md:text-5xl text-indigo-900 mb-6 w-full">
                        {item?.title}
                      </h1>
                      <div class="w-full border-b border-coolGray-100">
                        <div class="w-full">
                          <div class="flex flex-wrap items-center justify-between py-4 -m-2">
                            <div class="w-auto p-2">
                              <div class="flex flex-wrap items-center -m-2">
                                <div class="w-auto p-2">
                                  <h2 class="text-lg font-medium text-gray-900">
                                    <b>
                                      <CalendarTodayIcon />
                                    </b>
                                    <span className="ml-6 font-bold text-gray-600">
                                      {item?.date}
                                    </span>
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="w-full border-b border-coolGray-100">
                        <div class="w-full">
                          <div class="flex flex-wrap items-center justify-between py-4 -m-2">
                            <div class="w-auto p-2">
                              <div class="flex flex-wrap items-center -m-2">
                                <div class="w-auto p-2">
                                  <h2 class="text-lg font-medium text-gray-900">
                                    <b>
                                      <AccessTimeIcon />
                                    </b>
                                    <span className="ml-5 font-bold text-gray-600">
                                      {item?.time}
                                    </span>
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="w-full border-b border-coolGray-100">
                        <div class="w-full">
                          <div class="flex flex-wrap items-center justify-between py-4 -m-2">
                            <div class="w-auto p-2">
                              <div class="flex flex-wrap items-center -m-2">
                                <div class="w-auto p-2">
                                  <h2 class="text-lg font-medium text-gray-900">
                                    <b>
                                      <LocalMallIcon />
                                    </b>
                                    <span className="ml-5 font-bold text-gray-600">
                                      {item?.department?.department_name}
                                    </span>
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="w-full border-b border-coolGray-100 ">
                        <div class="w-full ">
                          <div class="flex flex-wrap items-center justify-between py-4 -m-2 ">
                            <div class="w-auto p-2">
                              <div class="flex flex-wrap items-center -m-2">
                                <div class="w-auto p-2">
                                  <h2 class="text-lg font-medium text-gray-900">
                                    <b>
                                      <PersonOutlineIcon />
                                    </b>
                                    {item?.attendees?.map((attendee, i) => {
                                      return (
                                        <span
                                          key={i}
                                          className="ml-5 font-bold text-gray-600"
                                        >
                                          {attendee?.emp_name}
                                        </span>
                                      );
                                    })}
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="w-full border-b border-coolGray-100">
                        <div class="w-full">
                          <div class="flex flex-wrap items-center justify-between py-4 -m-2">
                            <div class="w-auto p-2">
                              <div class="flex flex-wrap items-center -m-2">
                                <div class="w-auto p-2">
                                  <h2 class="text-lg font-medium text-gray-900">
                                    <b>
                                      <PlaceIcon />
                                    </b>
                                    <span className="ml-6 font-bold text-gray-600">
                                      {item?.location}
                                    </span>
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="relative flex flex-wrap items-center justify-between">
                        <div class="w-1/2 sm:w-1/2">
                          {/* <p class=" mt-4 mb-5 sm:mt-5 sm:mb-10 sm:text-2xl text-md  text-indigo-900 font-bold">
                            Design your Future with new features.
                          </p> */}
                        </div>
                        {
                          item?.complition_status == true ? (<div className='border-green-500 border-2 mt-2 flex justify-center rounded-lg text-green-500 h-10 w-full'>
                          <h1 className='text-lg'> Meeting Completed!</h1>
                        </div>) : item?.cancled_status == true ? (<div className='border-red-500 border-2 mt-2 flex justify-center rounded-lg text-red-500 h-10 w-full'>
                          <h1 className='text-lg'> Meeting has been cancled!</h1>
                        </div>) : (<div >
                          {!item?.available_attendee?.includes(userId) &&
                          !item?.notavailable_attendee?.includes(userId) ? (
                            <div>
                              <h2>Confire your presence</h2>
                            <div className="flex mt-4 gap-3" >
                              <button onClick={()=>dispatch(confirmMeet(item?._id, userId))} class="block sm:mt-4 sm:px-10 sm:py-2 px-5 py-2  font-semibold sm:text-2xl text-sm  text-white bg-green-600 rounded-lg sm:rounded-md">
                                Yes
                              </button>
                              <button onClick={()=>dispatch(notConfirmMeet(item?._id, userId))} class="block sm:mt-4 sm:px-10 sm:py-2 px-5 py-2  font-semibold sm:text-2xl text-sm  text-white bg-red-600 rounded-lg sm:rounded-md">
                                No
                              </button>
                            </div>
                            </div>
                          ) : (
                            item?.available_attendee?.includes(userId) ? (<h3 className="mt-4 text-green-600">You confirmed to attend meeting</h3>) : item?.notavailable_attendee?.includes(userId) ? (<h3 className="mt-4 text-red-500">You have confirmed that you are not attend meeting</h3>) : <></>
                          )}
                        </div>)
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
}

export default DataTable;
