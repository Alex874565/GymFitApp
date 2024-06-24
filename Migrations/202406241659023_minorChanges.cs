namespace GymFit.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class minorChanges : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Client", "Subscription_ID", "dbo.Subscription");
            DropIndex("dbo.Client", new[] { "Subscription_ID" });
            AddColumn("dbo.Client", "Subscription", c => c.Int(nullable: false));
            DropColumn("dbo.Client", "Subscription_ID");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Client", "Subscription_ID", c => c.Int());
            DropColumn("dbo.Client", "Subscription");
            CreateIndex("dbo.Client", "Subscription_ID");
            AddForeignKey("dbo.Client", "Subscription_ID", "dbo.Subscription", "ID");
        }
    }
}
