import {
  Button,
  FormControl,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchOnemeeting,
  meetingSelector,
  updatemeeting,
} from "../../api/meeting";
import ReactQuill from "react-quill";

function AddMom() {
  const [formData, setFormData] = useState("");
  const [value, setValue] = useState('')
  const nav = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentmeeting } = useSelector(meetingSelector);

  const editorStyle = {
    height: '90%', // Adjust the height as needed
  };

  useEffect(() => {
    dispatch(fetchOnemeeting(id));
  }, [id]);

  useEffect(() => {
    setValue(currentmeeting?.mom ? currentmeeting?.mom : "");
  }, [currentmeeting]);

  const onFinish = (e) => {
    e.preventDefault();
    dispatch(updatemeeting(id, { mom: formData }));
    nav(-1);
  };

  const saveHandel = (e) => {
    e.preventDefault();
    dispatch(updatemeeting(id, { mom: formData, complition_status:true}));
    nav(-1);        
  }

  return (
    <div className="m-4">
      <div className=" w-full md:flex hidden">
        <div className="text-left w-1/2">
          <tr sx={{ fontSize: "24px" }}>
            <td style={{ fontSize: "24px", width: "200px" }}>Title :-</td>
            <td style={{ fontSize: "24px" }}>{currentmeeting?.title}</td>
          </tr>
          <tr>
            <td style={{ fontSize: "24px", width: "200px" }}>Department :-</td>
            <td style={{ fontSize: "24px" }}>
              {currentmeeting?.department?.department_name}
            </td>
          </tr>
          <tr>
            <td>{currentmeeting?.date}</td>
            <td>{currentmeeting?.time}</td>
          </tr>
        </div>
        <div className="w-1/2">
          <h1 style={{ fontSize: "24px",textAlign:'left' }}>Participents</h1>
          <div className="flex flex-wrap w-full">
            {currentmeeting?.attendees?.map((item, i) => {
              return (
                <div className="border my-1 p-2 rounded-md mr-2" key={i}>
                  {item?.emp_name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div  >
        <div className="h-[60vh]">
        <ReactQuill className="text-left " style={editorStyle}
                          theme="snow"
                          value={value}
                          onChange={setValue}
                        />
                        </div>
        <FormControl sx={{ marginTop: "20px" }}>
          <Button size="large" variant="contained" onClick={onFinish}>
            Submit
          </Button>
        </FormControl>
        <Button
        onClick={saveHandel}
          sx={{ marginTop: "20px", marginLeft: "20px" }}
          size="large"
          variant="contained"
          type="submit"
        >
          Complete Meeting
        </Button>
      </div>
    </div>
  );
}

export default AddMom;
