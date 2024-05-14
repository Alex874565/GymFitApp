namespace GymFit.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class testacum : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Client", "Role", c => c.String());
            AlterColumn("dbo.Trainer", "Role", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Trainer", "Role", c => c.Int(nullable: false));
            AlterColumn("dbo.Client", "Role", c => c.Int(nullable: false));
        }
    }
}
