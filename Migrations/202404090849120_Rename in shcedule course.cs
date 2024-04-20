namespace GymFit.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Renameinshcedulecourse : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.CourseSchedule", name: "ScheduledClass_ID", newName: "ScheduledCourse_ID");
            RenameIndex(table: "dbo.CourseSchedule", name: "IX_ScheduledClass_ID", newName: "IX_ScheduledCourse_ID");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.CourseSchedule", name: "IX_ScheduledCourse_ID", newName: "IX_ScheduledClass_ID");
            RenameColumn(table: "dbo.CourseSchedule", name: "ScheduledCourse_ID", newName: "ScheduledClass_ID");
        }
    }
}
