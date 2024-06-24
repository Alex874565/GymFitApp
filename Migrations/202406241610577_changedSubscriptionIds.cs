namespace GymFit.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changedSubscriptionIds : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Course", "Subscription_ID", "dbo.Subscription");
            DropIndex("dbo.Course", new[] { "Subscription_ID" });
            DropColumn("dbo.Course", "Subscription_ID");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Course", "Subscription_ID", c => c.Int());
            CreateIndex("dbo.Course", "Subscription_ID");
            AddForeignKey("dbo.Course", "Subscription_ID", "dbo.Subscription", "ID");
        }
    }
}
