using System.ComponentModel.DataAnnotations.Schema;

namespace GymFit.Models
{
    public class CourseSchedule
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public int ScheduledCourse { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public List<int> Client_Ids { get; set; }

        public int ClientNo { get; set; }
    }
}
