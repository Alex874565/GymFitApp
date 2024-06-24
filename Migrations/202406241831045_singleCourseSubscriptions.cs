namespace GymFit.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class singleCourseSubscriptions : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Subscription", "Course_Id", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Subscription", "Course_Id");
        }
    }
}
