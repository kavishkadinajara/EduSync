using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentRegistrationAPI.Data;
using StudentRegistrationAPI.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase{
		private readonly StudentDbContext _context;

		public StudentController(StudentDbContext context) {
			_context = context;
		}

		// Get all students
        [HttpGet("GetAllStudents")]
        public async Task<IActionResult> GetAllStudents(){
            try{
                var students = await _context.Students.ToListAsync();
                return Ok(students);
            } catch (Exception ex){
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

		// Add students
		[HttpPost("AddStudents")]
		public async Task<IActionResult> AddStudents([FromBody] List<Student> students){
			if (students == null || students.Count == 0){
				return BadRequest("No student data received.");
			}

			// Students with unique telephone numbers
			var validStudents = new List<Student>();
			var invalidStudents = new List<Student>();
			foreach (var student in students){
				if (IsUniqueTelephone(student.telephone)){
					student.id = GenerateStudentId();
					validStudents.Add(student);
				}
				if (!IsUniqueTelephone(student.telephone)){
					invalidStudents.Add(student);
				}
			}
//return BadRequest($"Student with telephone number {student.telephone} already exists.");
			// No valid students to add
			if (validStudents.Count == 0){
				return BadRequest("No valid students to add.");
			}
			// if (validStudents.Count < students.Count){
			// 	return BadRequest("Some students were not added because their telephone numbers are not unique.");
			// }
			// if (validStudents.Count == students.Count){
			// 	return BadRequest("All students were not added because their telephone numbers are not unique.");
			// }


			// Add valid students to database
			try{
				await _context.Students.AddRangeAsync(validStudents);
				await _context.SaveChangesAsync();
				var validTelephones = string.Join(", ", validStudents.Select(s => s.telephone));
				var invalidTelephones = string.Join(", ", invalidStudents.Select(s => s.telephone));
				return Ok($"Students with telephone numbers {validTelephones} added successfully. {invalidTelephones} already exists.");
			} catch (Exception ex){
				return StatusCode(500, $"Internal server error: {ex.Message}");
			}
			
		}

		//check if telephone number is unique
		private bool IsUniqueTelephone(string telephone) {
			var student = _context.Students.FirstOrDefault(s => s.telephone == telephone);
			return student == null;
		}

		// Generate student ID
		private string GenerateStudentId(){
			var random = new Random();
			string id;
			do{
			id = "st" + random.Next(100000, 999999).ToString();
			} while (_context.Students.Any(s => s.id == id));
			return id;
		}

		// Add student
		[HttpPost("AddStudent")]
		public async Task<IActionResult> AddStudent([FromBody] Student student){
			if (student == null){
			return BadRequest("No student data received.");
			}

			try{
				student.id = GenerateStudentId();
				await _context.Students.AddAsync(student);
				await _context.SaveChangesAsync();
				return Ok("Student added successfully.");
			}
			catch (Exception ex)
			{
			return StatusCode(500, $"Internal server error: {ex.Message}");
			}
		}

		// Get student by ID
		[HttpGet("GetStudentByPhone/{phoneNumber}")]
		public async Task<IActionResult> GetStudentByPhone(string phoneNumber){
			if (string.IsNullOrEmpty(phoneNumber)){
			return BadRequest("Phone number is required.");
			}

			try{
				var student = await _context.Students.FirstOrDefaultAsync(s => s.telephone == phoneNumber);
				if (student == null){
					return NotFound("Student not found.");
				}
				return Ok(student);
			}catch (Exception ex){
				return StatusCode(500, $"Internal server error: {ex.Message}");
			}
		}

		// Update student
		[HttpPut("UpdateStudent/{id}")]
		public async Task<IActionResult> UpdateStudent(string id, [FromBody] Student student){
			if (string.IsNullOrEmpty(id)){
				return BadRequest("Student ID is required.");
			}

			try {
				var existingStudent = await _context.Students.FindAsync(id);
				if (existingStudent == null){
					return NotFound("Student not found.");
				} else {
					existingStudent.full_name = student.full_name;
                    existingStudent.date_of_birth = student.date_of_birth;
                    existingStudent.telephone = student.telephone;
                    existingStudent.email = student.email;
					existingStudent.date_of_birth = student.date_of_birth;
					existingStudent.address = student.address;
					await _context.SaveChangesAsync();
					return Ok("Student updated successfully.");
				}
			} catch (Exception ex){
				return StatusCode(500, $"Internal server error: {ex.Message}");
			}
		}

		// Delete student
		[HttpDelete("DeleteStudent/{id}")]
		public async Task<IActionResult> DeleteStudent(string id){
			if (string.IsNullOrEmpty(id)){
				return BadRequest("Student ID is required.");
			}

			try {
				var existingStudent = await _context.Students.FindAsync(id);
				if (existingStudent == null){
					return NotFound("Student not found.");
				} else {
					_context.Students.Remove(existingStudent);
					await _context.SaveChangesAsync();
					return Ok("Student deleted successfully.");
				}
			} catch (Exception ex){
				return StatusCode(500, $"Internal server error: {ex.Message}");
				
			}
		}
    }
}
