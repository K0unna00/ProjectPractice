namespace FinalAgain.Models
{
    public class Channel
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public AppUser User { get; set; }

    }
}
