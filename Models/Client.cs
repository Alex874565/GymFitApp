namespace GymFit.Models
{
    public class Client : User
    {
        
        public string Name { get; set; }

        public virtual Subscription? Subscription { get; set; }

       
    }
}
