/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


export default function StudentRegister() {

    const navigate = useNavigate();
    const [studentList, setStudentList] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        full_name: "",
        address: "",
        date_of_birth: "",
        gender: "",
        email: "",
        telephone: "",
        status: "pending",
    });
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [checkFields, setCheckFields] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState({
        id: "",
        full_name: "",
        address: "",
        date_of_birth: "",
        gender: "",
        email: "",
        telephone: "",
        status: "pending",
    });

    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: light)");
        setDarkMode(darkModeMediaQuery.matches);

        const handleChange = (e) => {
            setDarkMode(e.matches);
        };

        darkModeMediaQuery.addEventListener("change", handleChange);

        return () => {
            darkModeMediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    const temporyId = () => {
        const id = Math.floor(Math.random() * 1000000);
        return id;
    }

    const handleChange = (e) => {
        setCheckFields(true);

        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

    // const addStudent = () => {
    //    if(formData.full_name && formData.email) {
    //        setStudentList([...studentList, formData]);
    //        setFormData({
    //          id: temporyId(),
    //          full_name: "",
    //          address: "",
    //          date_of_birth: "",
    //          gender: "",
    //          email: "",
    //          telephone: "",
    //        });
    //     }        
    //     console.log(studentList);
    // };

    const addStudent = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/student/AddStudent", formData);
            if (response.ok) {
              console.log("Data submitted successfully");
            } else {
                console.error("Error submitting data");
            }
        } catch (error) {
            console.error(error);
        }
        if(formData.full_name && formData.email) {
           setStudentList([...studentList, formData]);
           setFormData({
             id: {temporyId},
             full_name: "",
             address: "",
             date_of_birth: "",
             gender: "",
             email: "",
             telephone: "",
           });
        }
    }

    const handleDelete = (id) => {
        setStudentList(studentList.filter((student) => student.id !== id));
    };
    

    const updateData = async (id) => {
        const student = studentList.find((student) => student.id === id);
        setEditData({
            id: student.id,
            full_name: student.full_name,
            address: student.address,
            date_of_birth: student.date_of_birth,
            gender: student.gender,
            email: student.email,
            telephone: student.telephone,
        });
        setEditMode(true);

    }
    
    const handleSubmit = async (e) => {
        // e.preventDefault();
        // try {
        //     const response = await axios.post("http://localhost:5000/api/student/AddStudents", studentList);
        //     if (response.ok) {
        //       console.log("Data submitted successfully");
        //     //   alert(response.data);
        //     } else {
        //       console.error("Error submitting data");
        //       console.log(studentList);
        //     //   alert(response.data);
        //     }
        // } catch (error) {
        //     console.error("Error: ", error);
        // }
        const timer = setTimeout(() => {
            navigate("/");
          }, 10);

    };

    const generateAlertMsg = (message, time) => {
        setAlert(true);
        setAlertMessage(message);
        setTimeout(() => {
            setAlertMessage("");
        }
        , time || 4000);
    };
    
    const checkEmail = (e) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(e.target.value)) {
            handleChange(e);
        } else {
            generateAlertMsg("Invalid email format", 4000);
        }
    }

    const telephoneValidation = (e) => {
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{2})[-. ]?([0-9]{3})$/;
        if (phoneRegex.test(e.target.value)) {
            handleChange(e);
        } else {
            generateAlertMsg("Invalid phone number format", 4000);
        }
    }
        

    return (
        <div className={`min-h-screen w-screen flex justify-center items-center ${darkMode ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}>
            <div className={`shadow-md rounded-md p-6 min-h-screen w-screen ${
          darkMode ? 'bg-gray-900' : 'bg-white'
        }`}>
                {/* theme toggle button */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Student Registration</h1>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Toggle {darkMode ? 'Light' : 'Dark'} Mode
                    </button>
                </div>

                <form action="" className="px-4 sm:px-8 md:px-20 lg:px-36 mt-7 md:mt-12 lg:mt-20" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 gap-4 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            {/* full name */}
                            <label className="block mb-2 font-medium  w-full">Full Name</label>
                            <input
                                type="text"
                                name="full_name"
                                value={editMode? editData.full_name : formData.full_name}
                                onChange={handleChange}
                                className="border rounded-md col-span-3 w-full px-4 py-2"
                            />
                        </div>
                        {/* address */}
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            <label className="block mb-2 font-medium">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className={`border rounded-md col-span-3 w-full px-4 py-2`}
                                readOnly={!formData.full_name}
                                onClick={() => generateAlertMsg(!formData.full_name ? `Please fill the Full Name field first` : "", 4000)}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 justify-between gap-x-5">
                            {/* Date of Birth */}
                            <div className="grid grid-cols-1 md:grid-cols-2 items-start justify-start">
                                <label className="block mb-2 font-medium">
                                Date of Birth
                                </label>
                                <input
                                type="date"
                                name="date_of_birth"
                                value={formData.date_of_birth}
                                onChange={handleChange}
                                readOnly={!formData.full_name || !formData.address}
                                onClick={() => generateAlertMsg(
                                    !formData.full_name ? `Please fill the Full Name field first` :
                                    !formData.address ? `Please fill the Address field first` : "", 4000)}
                                className="border border-gray-300 rounded-lg w-full text-black bg-black dark:text-white  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                />
                            </div>

                            {/* Gender */}
                            <div className="flex flex-col md:flex-row gap-4 w-full gap-x-20 items-end justify-end"
                            onClick={() => generateAlertMsg(
                                    !formData.full_name ? `Please fill the Full Name field first` :
                                    !formData.address ? `Please fill the Address field first` :
                                    !formData.date_of_birth ? `Please fill the Date of Birth field first` : "", 4000
                                )
                            }>
                                <label className="block mb-2 font-medium">
                                Gender
                                </label>
                                <div className="flex gap-6 md:w-3/4">
                                <label className="flex items-center gap-2">
                                    <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={formData.gender === "male"}
                                    onChange={handleChange}
                                    disabled={!formData.full_name || !formData.address || !formData.date_of_birth}
                                    />
                                    <span className="text-gray-700">Male</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={formData.gender === "female"}
                                    onChange={handleChange}
                                    className="accent-blue-500 focus:ring-2 focus:ring-blue-400"
                                    disabled={!formData.full_name || !formData.address || !formData.date_of_birth}
                                    />
                                    <span className="text-gray-700">Female</span>
                                </label>
                                </div>
                            </div>
                        </div>
                            {/* email */}
                            <div className="grid grid-cols-1 md:grid-cols-4">
                                <label className="block mb-2 font-medium">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    readOnly={!formData.full_name || !formData.address || !formData.date_of_birth || !formData.gender}
                                    onClick={(e) => {generateAlertMsg(
                                                !formData.full_name ? `Please fill the Full Name field first` :
                                                !formData.address ? `Please fill the Address field first` :
                                                !formData.date_of_birth ? `Please fill the Date of Birth field first` :
                                                !formData.gender ? `Please select the Gender first` : "", 4000
                                            );
                                            
                                        }
                                    }
                                    className="border rounded-md col-span-3 w-full px-4 py-2"
                                />
                            </div>
                            {/* phone */}
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            <label className="block mb-2 font-medium">Telephone</label>
                            <input
                                type="tel"
                                name="telephone"
                                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                value={formData.telephone}
                                onChange={handleChange}
                                // onChange={handleChange}
                                placeholder="ex: +94 712 345 678"
                                readOnly={!formData.full_name || !formData.address || !formData.date_of_birth || !formData.gender || !formData.email }
                                onClick={() => generateAlertMsg(
                                    !formData.full_name ? `Please fill the Full Name field first` :
                                    !formData.address ? `Please fill the Address field first` :
                                    !formData.date_of_birth ? `Please fill the Date of Birth field first` :
                                    !formData.gender ? `Please select the Gender first` :
                                    !formData.email ? `Please fill the Email field first` : "", 4000
                                )}
                                className="border rounded-md col-span-3 w-full px-4 py-2"
                            />
                        </div>
                    <div className="flex justify-end gap-x-5">
                        <button
                            onClick={addStudent}
                            disabled={!formData.full_name || !formData.address || !formData.date_of_birth || !formData.gender || !formData.email || !formData.telephone}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-end justify-end"
                        >
                            {editMode ? "Update" : "Add"}
                        </button>
                        <button className={`bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-end justify-end ${editMode? 'block' : 'hidden'}`}>
                                cancle
                        </button>
                    </div>


                    {/* student data preview table */}
                    <table className="w-full mt-6 border-collapse border">
                        <thead>
                            <tr className="bg-gray-300  text-gray-800">
                                <th className="text-left px-4 py-2 border">Name</th>
                                <th className="text-left px-4 py-2 border">Date of Birth</th>
                                <th className="text-left px-4 py-2 border">Email</th>
                                <th className="text-left px-4 py-2 border">Telephone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentList.map((student, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 border">{student.full_name}</td>
                                    <td className="px-4 py-2 border">{student.date_of_birth}</td>
                                    <td className="px-4 py-2 border">{student.email}</td>
                                    <td className="px-4 py-2 border">{student.telephone}</td>
                                    <td className="px-4 py-2 border">
                                        <div className="flex gap-4">
                                        <button className="text-gray-500 hover:text-gray-700" onClick={() => updateData(student.id)}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(student.id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* submit sutdent data */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleSubmit}
                            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                    </div>
                </form>
            </div>

            <div className={`fixed flex top-12 justify-center ${alertMessage? 'block' : 'hidden'}`}>
                <Alert severity="warning">{alertMessage}</Alert>
            </div>
        </div>
    );
}
