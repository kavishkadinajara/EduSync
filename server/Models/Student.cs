namespace StudentRegistrationAPI.Models
{
    public class Student
    {
        public string id { get; set; }
        public string full_name { get; set; }
        public string address { get; set; }
        public string date_of_birth { get; set; }
        public string gender { get; set; }
        public string email { get; set; }
        public string telephone { get; set; }
        public string status { get; set; }
        public DateTime created_at { get; set; }
    }
}