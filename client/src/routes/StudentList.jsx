/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function StudentList() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    fetchStudentList();
  }, []);

  const fetchStudentList = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/student/GetAllStudents');
      if (response.ok) {
        const data = await response.json();
        setFilteredStudents(data);
      } else {
        console.error('Error fetching student list');
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  // Search by telephone number
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchStudentList(); // Reset to all students if the search term is empty
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5000/api/student/GetStudentByPhone/${searchTerm.trim()}`
      );
      if (response.ok) {
        const data = await response.json();
        setFilteredStudents([data]);
      } else {
        console.error('No student found with the given telephone number');
        setFilteredStudents([]); // Clear the list if no match
      }
    } catch (error) {
      console.error('Error: ', error);
      setFilteredStudents([]); // Clear the list on error
    }
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen w-screen ${
        darkMode ? 'bg-black text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <div
        className={`rounded-lg shadow-lg w-screen min-h-screen p-6 ${
          darkMode ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        {/* Theme toggle button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Student List</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Toggle {darkMode ? 'Light' : 'Dark'} Mode
          </button>
        </div>

        <div className="px-4 sm:px-8 md:px-20 lg:px-36 mt-7 md:mt-12 lg:mt-20">
          {/* Search bar */}
          <label htmlFor="telephone" className="pb-5">
            Telephone
          </label>
          <div className="flex items-center gap-4 mb-6">
            <input
              id="telephone"
              type="text"
              placeholder="ex: +94 712 345 678"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`border rounded-md px-4 py-2 w-full max-w-md ${
                darkMode
                  ? 'border-gray-600 bg-gray-700 text-white'
                  : 'border-gray-300 bg-white text-black'
              }`}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              Search
            </button>
          </div>

          {/* Student list */}
          {filteredStudents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-md">
                <thead>
                  <tr
                    className={`${
                      darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}
                  >
                    <th className="text-left px-4 py-2 border">Name</th>
                    <th className="text-left px-4 py-2 border">Date of Birth</th>
                    <th className="text-left px-4 py-2 border">Email</th>
                    <th className="text-left px-4 py-2 border">Telephone</th>
                    <th className="text-left px-4 py-2 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((data, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border">{data.full_name}</td>
                      <td className="px-4 py-2 border">{data.date_of_birth}</td>
                      <td className="px-4 py-2 border">
                        <a
                          href={`mailto:${data.email}`}
                          className="text-blue-500 underline"
                        >
                          {data.email}
                        </a>
                      </td>
                      <td className="px-4 py-2 border">{data.telephone}</td>
                      <td className="px-4 py-2 border">
                        <div className="flex gap-4">
                          <button className="text-gray-500 hover:text-gray-700">
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button className="text-red-500 hover:text-red-700">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-6">
              No students found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
