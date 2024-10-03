import React from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PlaceIcon from "@mui/icons-material/Place";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AddIcon from '@mui/icons-material/Add';
import '../../index.css';
import PropTypes from "prop-types";
import { Box, Collapse, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { deletemeeting, updatemeeting } from "../../api/meeting";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";



function Row({ row }) {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch()

  const handleClose = () => setOpen1(false);
  const handleClose1 = () => setOpen2(false);

  const handelDelete = (id) => {
    dispatch(deletemeeting(id));
    setOpen1(false);
  };

  // const cancelMeeting = (id) => {
  //   dispatch(updatemeeting(id, { cancled_status: true }));
  // }

  const handelCandel = (id) => {
    dispatch(updatemeeting(id, { cancled_status: true }));
  }

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell >{row?.title}</TableCell>
        <TableCell>{row?.date}</TableCell>
        <TableCell>{row?.time}</TableCell>
        <TableCell>{row?.department?.department_name}</TableCell>
        <TableCell>{row?.complition_status ? "Completed" : "Yet to be conducted" }</TableCell>
        <TableCell align="center">
          <IconButton
            sx={{ marginRight: "10px" }}
            onClick={() => nav(`/editMeeting/${row?._id}`)}
          >
            <EditIcon />
          </IconButton>
          <IconButton onClick={()=>setOpen1(true)} >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <Modal
        open={open1}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <section class="z-40 fixed top-0 left-0 flex items-center justify-center w-full h-full bg-white bg-opacity-10">
          <div class="p-4">
            <div class="relative p-6 py-11 bg-blueGray-900 bg-opacity-30 max-w-lg text-center w-full rounded-5xl">
              <p class="mb-8 text-white text-2xl">
                Do you want to delete this broadcast?
              </p>
              <div class="flex flex-wrap justify-center -m-2">
                <div class="w-auto p-2">
                  <a
                    class="inline-block px-14 py-4 text-white font-semibold text-lg tracking-2xl hover:bg-gray-600 hover:text-white border rounded-full transition duration-300 cursor-pointer"
                    onClick={handleClose}
                  >
                    Cancel
                  </a>
                </div>
                <div class="w-auto p-2">
                  <a
                    class="inline-block px-14 py-4 font-semibold text-lg border bg-gray-100 hover:bg-red-800 text-indigo-800 hover:text-white rounded-full transition duration-300 cursor-pointer"
                    onClick={() => handelDelete(row?._id)}
                  >
                    Delete
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Modal>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="medium" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: "16px", fontWeight: "bold" }}>
                      Participents
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px", fontWeight: "bold" }}>
                      Location
                    </TableCell> 
                    <TableCell sx={{ fontSize: "16px", fontWeight: "bold" }}>
                    </TableCell>                    
                  </TableRow>
                </TableHead>
                <TableBody sx={{ width: "100%" }}>
                  <TableRow>
                    <TableCell component="th" scope="row">
                    <div className="flex flex-wrap line w-[400px]">
                      {row?.attendees?.map((item,i) => {
                        return(
                          <div className="border my-1 p-2 rounded-md mr-2" key={i}>{item?.emp_name}</div>
                        )
                      })}
                      </div>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.location}
                    </TableCell>
                    <TableCell component="th" scope="row">
                    <button onClick={()=>nav(`/addMom/${row?._id}`)} className="bg-gray-200 py-1 px-2   rounded-xl cursor-pointer"> <AddIcon/>Add MOM</button>
                    {
                      row?.complition_status ? (<></>) : (<button onClick={()=>setOpen2(true)} className="bg-red-500 text-white py-1 px-2 ml-2 rounded-xl cursor-pointer">Cancel Meeting </button>)
                    }
                    </TableCell>
                    <Modal
        open={open2}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <section class="z-40 fixed top-0 left-0 flex items-center justify-center w-full h-full bg-white bg-opacity-10">
          <div class="p-4">
            <div class="relative p-6 py-11 bg-blueGray-900 bg-opacity-30 max-w-lg text-center w-full rounded-5xl">
              <p class="mb-8 text-white text-2xl">
                Do you want to cancel this meeting?
              </p>
              <div class="flex flex-wrap justify-center -m-2">
                <div class="w-auto p-2">
                  <a
                    class="inline-block px-14 py-4 text-white font-semibold text-lg tracking-2xl hover:bg-gray-600 hover:text-white border rounded-full transition duration-300 cursor-pointer"
                    onClick={handleClose1}
                  >
                    No
                  </a>
                </div>
                <div class="w-auto p-2">
                  <a
                    class="inline-block px-14 py-4 font-semibold text-lg border bg-gray-100 hover:bg-red-800 text-indigo-800 hover:text-white rounded-full transition duration-300 cursor-pointer"
                    onClick={() => handelCandel(row?._id)}
                  >
                    Yes
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Modal>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};




function DataTable({data}) {
  const [open1, setOpen1] = React.useState(false);
  const nav = useNavigate()
  const dispatch = useDispatch()
  const [filteredData, setFilteredData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(()=>{
    setFilteredData(data)
  },[data])

  console.log(data)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  

  const handleClose = () => setOpen1(false);

  const handelDelete = (id) => {
    dispatch(deletemeeting(id));
    setOpen1(false);
  };


  return (
    <div>
      <div className="md:block hidden">
      <TableContainer component={Paper} >
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell
              sx={{ fontSize: "16px", fontWeight: "bold" }}
            
            >
              Title
            </TableCell>
            <TableCell
              sx={{ fontSize: "16px", fontWeight: "bold" }}
            
            >
              Date
            </TableCell>
            <TableCell
              sx={{ fontSize: "16px", fontWeight: "bold" }}
            
            >
              Time
            </TableCell>
            <TableCell
              sx={{ fontSize: "16px", fontWeight: "bold" }}
            
            >
              Department
            </TableCell>
            <TableCell
              sx={{ fontSize: "16px", fontWeight: "bold" }}
            
            >
              Status
            </TableCell>
            <TableCell
              sx={{ fontSize: "16px", fontWeight: "bold" }}
              align="center"
            >
              Action
            </TableCell>
            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
        {filteredData
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row) => (
            <Row key={row?._id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
    component="div"
    count={filteredData?.length}
    page={page}
    onPageChange={handleChangePage}
    rowsPerPage={rowsPerPage}
    onRowsPerPageChange={handleChangeRowsPerPage}
  />
      </div>
      <div className="md:hidden block">
      {
        data?.map((item,i)=>{
          return(
            <div class="flex border items-center justify-center">
            <div class="text-center">
              <div class=" py-10 md:mb-4 lg:py-10 lg:w-full lg:h-auto bg-white">
                <div class="relative  px-4 md:px-4 mx-auto">
                  <div class="w-full px-4 mb-3 xl:mb-0">
                    <div class="max-w-md md:max-w-lg mx-auto  text-left">
                      <h1 class="font-bold text-4xl md:text-5xl text-indigo-900 mb-6">
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
                                      < LocalMallIcon/>
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
                                    {
                                      item?.attendees?.map((attendee,i)=>{
                                        return(
                                          <span key={i} className="ml-5 font-bold text-gray-600" >
                                      {attendee?.emp_name}
                                    </span>
                                        )
                                      })
                                    }
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
                        <div class="text-sm mb-2 font-semibold text-indigo-900 w-full">
                          <div className="flex justify-between w-full mt-4">
                            <div>
                        <button onClick={()=>nav(`/addMom/${item?._id}`)} className="bg-gray-200 py-1 px-2   rounded-xl cursor-pointer"> <AddIcon/>Add MOM</button>
                        </div>
                        <div>
                        <span className="float-right cursor-pointer" onClick={() => setOpen1(true)}><DeleteIcon/></span>
                        <span className="float-right mr-10 cursor-pointer" onClick={()=>nav(`/editMeeting/${item?._id}`)}><EditIcon/></span>
                        </div>
                        </div>
        
        
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
                <>
                <Modal
                        open={open1}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <section class="z-40 fixed top-0 left-0 flex items-center justify-center w-full h-full bg-white bg-opacity-10">
                          <div class="p-4">
                            <div class="relative p-6 py-11 bg-blueGray-900 bg-opacity-30 max-w-lg text-center w-full rounded-5xl">
                              <p class="mb-8 text-white text-2xl">
                                Do you want to delete this user?
                              </p>
                              <div class="flex flex-wrap justify-center -m-2">
                                <div class="w-auto p-2">
                                  <a
                                    class="inline-block px-14 py-4 text-white font-semibold text-lg tracking-2xl hover:bg-gray-600 hover:text-white border rounded-full transition duration-300 cursor-pointer"
                                    onClick={handleClose}
                                  >
                                    Cancel
                                  </a>
                                </div>
                                <div class="w-auto p-2">
                                  <a
                                    class="inline-block px-14 py-4 font-semibold text-lg border bg-gray-100 hover:bg-red-800 text-indigo-800 hover:text-white rounded-full transition duration-300 cursor-pointer"
                                    onClick={() => handelDelete(item?._id)}
                                  >
                                    Delete
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </Modal>
                </>
              </div>
            </div>
          </div>
          )
        })
      }
      </div>
  </div>
  )
}

export default DataTable