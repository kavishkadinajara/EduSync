using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class StudentAPIController : ControllerBase
	{
		private static readonly string[] Names = new[]
		{
			"Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hank", "Ivy", "Jack"
		};
		private readonly ILogger<StudentAPIController> _logger;
		public StudentAPIController(ILogger<StudentAPIController> logger)
		{
			_logger = logger;
		}
		[HttpGet(Name = "GetStudents")]
		public IEnumerable<Student> Get()
		{
			return Enumerable.Range(1, 5).Select(index => new Student
			{
				Id = index,
				Name = Names[Random.Shared.Next(Names.Length)],
				Age = Random.Shared.Next

			})
				.ToArray();
		}
	}
}
