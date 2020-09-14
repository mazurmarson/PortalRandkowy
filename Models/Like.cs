namespace PortalRandkowy.API.Models
{
    public class Like
    {
        public int userLikesId { get; set; }
        public int UserIsLikedId { get; set; }

        public User UserLikes { get; set; }
        public User UserIsLiked { get; set; }

        
    }
}