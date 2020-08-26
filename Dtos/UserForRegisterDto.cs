using System.ComponentModel.DataAnnotations;

namespace PortalRandkowy.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required (ErrorMessage="Nazwa użykownika jest wymagana")]
        public string Username { get; set; }
        [Required (ErrorMessage="Haslo jest wymagane")]
        [StringLength(12, MinimumLength = 6, ErrorMessage="Haslo musi sie skłdać z 6 do 12 znaków")]
        public string Password { get; set; }
    }
}