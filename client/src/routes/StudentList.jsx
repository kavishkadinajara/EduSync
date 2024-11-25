import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function StudentList() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);

  const students = [
    {
      name: 'Smith',
      dob: '2004-12-24',
      email: 'smithwilson@abd.com',
      telephone: '+66 568 998 789',
    },
    {
      name: 'Jane Doe',
      dob: '2002-05-15',
      email: 'janedoe@email.com',
      telephone: '+94 712 345 678',
    },
    {
      name: 'John Wick',
      dob: '1998-11-01',
      email: 'johnwick@continental.com',
      telephone: '+94 711 123 456',
    },
  ];

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredStudents(students); 
    } else {
      const results = students.filter((student) =>
        student.telephone.includes(searchTerm.trim())
      );
      setFilteredStudents(results);
    }
  };

  if (filteredStudents.length === 0 && searchTerm === '') {
    setFilteredStudents(students);
  }

  return (
    <div
      className={`flex justify-center items-center min-h-screen w-screen ${
        darkMode ? 'bg-black text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <div
        className={`rounded-lg shadow-lg w-screen min-h-screen p-6 ${
          darkMode ? 'bg-black' : 'bg-white'
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Student List</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Toggle {darkMode ? 'Light' : 'Dark'} Mode
          </button>
        </div>

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
              {filteredStudents.map((student, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{student.name}</td>
                  <td className="px-4 py-2 border">{student.dob}</td>
                  <td className="px-4 py-2 border">
                    <a
                      href={`mailto:${student.email}`}
                      className="text-blue-500 underline"
                    >
                      {student.email}
                    </a>
                  </td>
                  <td className="px-4 py-2 border">{student.telephone}</td>
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
      </div>
    </div>
  );
}
