/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import Alert from '@mui/material/Alert';


export default function StudentRegister() {

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
    });
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [checkFields, setCheckFields] = useState(false);

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

    const handleChange = (e) => {
        setCheckFields(true);

        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

    const addStudent = () => {
       if(formData.full_name && formData.email) {
           setStudentList([...studentList, formData]);
           setFormData({
             id: "",
             full_name: "",
             address: "",
             date_of_birth: "",
             gender: "",
             email: "",
             telephone: "",
           });
        }        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/student/AddStudents", studentList);
            if (response.ok) {
              console.log("Data submitted successfully");
            //   alert(response.data);
            } else {
              console.error("Error submitting data");
              console.log(studentList);
            //   alert(response.data);
            }
        } catch (error) {
            console.error("Error: ", error);
          }
    };

    const generateAlertMsg = (message, time) => {
        setAlert(true);
        setAlertMessage(message);
        setTimeout(() => {
            setAlertMessage("");
        }
        , time || 4000);
    };
        // const handleDelete = (id) => {
        //     setStudentList(studentList.filter((student) => student.id !== id)); 
        // }
        

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
                                value={formData.full_name}
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
                                onClick={() => generateAlertMsg((!formData.full_name && !formData.address) ? `Please fill the Full Name and Address fields first` : (!formData.full_name ? `Please fill the Full Name field first` : (!formData.address? `Please fill the Address field first`: "")), 4000)}
                                className="border border-gray-300 rounded-lg w-full text-black bg-black dark:text-white  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                />
                            </div>

                            {/* Gender */}
                            <div className="flex flex-col md:flex-row gap-4 w-full gap-x-20 items-end justify-end"
                            onClick={() => generateAlertMsg((!formData.full_name && !formData.address && !formData.date_of_birth) ? `Please fill the Full Name, Address and Date of Birth fields first` : (!formData.full_name && !formData.address ? `Please fill the Full Name and Address fields first` : (!formData.full_name ? `Please fill the Full Name field first` : `Please fill the Address field first and Birth fields first`)) , 4000)}>
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
                                onClick={() => generateAlertMsg((!formData.full_name && !formData.address && !formData.date_of_birth && !formData.gender) ? `Please fill the Full Name, Address, Date of Birth and select gender first` : (!formData.full_name && !formData.address && !formData.date_of_birth ? `Please fill the Full Name, Address and Date of Birth fields first` : (!formData.full_name && !formData.address ? `Please fill the Full Name and Address fields first` : (!formData.full_name ? `Please fill the Full Name field first` : (!formData.address? `Please fill the Address field first`: "")))), 4000)}
                                className="border rounded-md col-span-3 w-full px-4 py-2"
                            />
                        </div>
                        {/* phone */}
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            <label className="block mb-2 font-medium">Telephone</label>
                            <input
                                type="text"
                                name="telephone"
                                value={formData.telephone}
                                onChange={handleChange}
                                placeholder="ex: +94 712 345 678"
                                disabled={!formData.full_name || !formData.address || !formData.date_of_birth || !formData.gender || !formData.email}
                                className="border rounded-md col-span-3 w-full px-4 py-2"
                            />
                        </div>
                    </div>
                    {/* add student button */}
                    <div className="flex justify-end">
                        <button
                            onClick={addStudent}
                            disabled={!formData.full_name || !formData.address || !formData.date_of_birth || !formData.gender || !formData.email || !formData.telephone}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-end justify-end"
                        >
                            Add
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
                </form>
            </div>

            <div className={`fixed flex top-12 justify-center ${alertMessage? 'block' : 'hidden'}`}>
                <Alert severity="warning">{alertMessage}</Alert>
            </div>
        </div>
    );
}
