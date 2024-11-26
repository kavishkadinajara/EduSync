using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentRegistrationAPI.Data;
using StudentRegistrationAPI.Models;

namespace StudentRegistrationAPI.Controllers {
	[ApiController]
	[Route("api/[controller]")]

	public class StudentController : ControolerBase {
		private readonly StudentDbContext _context;

		public StudentController(StudentDbContext context) {
			_context = context;
		}

		[HttpGet]
		public async Task<IActionResult> GetStudents() {
			var students = await _context.Students.ToListAsync();
			return Ok(students);
		}

        private IActionResult Ok(List<Student> students)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public async Task<IActionResult> AddStudent([FromBody] List<Student> students)
        {
            if (students == null || students.Count == 0)
            {
                return BadRequest("No student data received.");
            }

            await _context.Students.AddRangeAsync(students);
            await _context.SaveChangesAsync();

            return Ok("Students added successfully.");
        }

        private IActionResult Ok(string v)
        {
            throw new NotImplementedException();
        }

        private IActionResult BadRequest(string v)
        {
            throw new NotImplementedException();
        }
    }

    public class ControolerBase
    {
    }
}
