import { useState, useEffect } from "react";

export default function StudentRegister() {
    const [formData, setFormData] = useState({
        fullName: "",
        address: "",
        dob: "",
        gender: "male",
        email: "",
        telephone: "",
    });

    const [studentList, setStudentList] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

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
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const addStudent = () => {
        setStudentList((prev) => [...prev, formData]);
        setFormData({
            fullName: "",
            address: "",
            dob: "",
            gender: "male",
            email: "",
            telephone: "",
        });
    };

    const handleSubmit = () => {
        console.log("Submitted Students: ", studentList);
    };

    return (
        <div className={`min-h-screen w-screen flex justify-center items-center ${darkMode ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}>
            <div className={`shadow-md rounded-md p-6 min-h-screen w-screen ${darkMode ? 'bg-black' : 'bg-white'}`}>
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
                            <label className="block mb-2 font-medium  w-full">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="border rounded-md col-span-3 w-full px-4 py-2"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            <label className="block mb-2 font-medium">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="border rounded-md col-span-3 w-full px-4 py-2"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 ">
                            {/* Date of Birth */}
                            <div className="grid grid-cols-1 md:grid-cols-2 items-start justify-start">
                                <label className="block mb-2 font-medium">
                                Date of Birth
                                </label>
                                <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-lg w-full text-black dark:text-white  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                />
                            </div>

                            {/* Gender */}
                            <div className="flex flex-col md:flex-row gap-4 w-full gap-x-20 items-end justify-end">
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
                                    className="accent-blue-500 focus:ring-2 focus:ring-blue-400"
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
                                    />
                                    <span className="text-gray-700">Female</span>
                                </label>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4">
                            <label className="block mb-2 font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border rounded-md col-span-3 w-full px-4 py-2"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4">
                            <label className="block mb-2 font-medium">Telephone</label>
                            <input
                                type="text"
                                name="telephone"
                                value={formData.telephone}
                                onChange={handleChange}
                                placeholder="ex: +94 712 345 678"
                                className="border rounded-md col-span-3 w-full px-4 py-2"
                            />
                        </div>
                    </div>
                    
                    <div className="flex justify-end">
                        <button
                            onClick={addStudent}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-end justify-end"
                        >
                            Add
                        </button>
                    </div>

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
                                    <td className="px-4 py-2 border">{student.fullName}</td>
                                    <td className="px-4 py-2 border">{student.dob}</td>
                                    <td className="px-4 py-2 border">{student.email}</td>
                                    <td className="px-4 py-2 border">{student.telephone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

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
        </div>
    );
}
