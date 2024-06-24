namespace GymFit.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changedIds : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Course", "Trainer_ID", "dbo.Trainer");
            DropForeignKey("dbo.Client", "CourseSchedule_ID", "dbo.CourseSchedule");
            DropForeignKey("dbo.CourseSchedule", "ScheduledCourse_ID", "dbo.Course");
            DropIndex("dbo.Client", new[] { "CourseSchedule_ID" });
            DropIndex("dbo.Course", new[] { "Trainer_ID" });
            DropIndex("dbo.CourseSchedule", new[] { "ScheduledCourse_ID" });
            AddColumn("dbo.CourseSchedule", "ScheduledCourse", c => c.Int(nullable: false));
            AlterColumn("dbo.Course", "Trainer_Id", c => c.Int(nullable: false));
            DropColumn("dbo.Client", "CourseSchedule_ID");
            DropColumn("dbo.CourseSchedule", "ScheduledCourse_ID");
        }
        
        public override void Down()
        {
            AddColumn("dbo.CourseSchedule", "ScheduledCourse_ID", c => c.Int());
            AddColumn("dbo.Client", "CourseSchedule_ID", c => c.Int());
            AlterColumn("dbo.Course", "Trainer_Id", c => c.Int());
            DropColumn("dbo.CourseSchedule", "ScheduledCourse");
            CreateIndex("dbo.CourseSchedule", "ScheduledCourse_ID");
            CreateIndex("dbo.Course", "Trainer_ID");
            CreateIndex("dbo.Client", "CourseSchedule_ID");
            AddForeignKey("dbo.CourseSchedule", "ScheduledCourse_ID", "dbo.Course", "ID");
            AddForeignKey("dbo.Client", "CourseSchedule_ID", "dbo.CourseSchedule", "ID");
            AddForeignKey("dbo.Course", "Trainer_ID", "dbo.Trainer", "ID");
        }
    }
}
