
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PortalRandkowy.API.Data;
using PortalRandkowy.API.Dtos;
using PortalRandkowy.API.Models;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System;
using System.IdentityModel.Tokens.Jwt;
using AutoMapper;

namespace PortalRandkowy.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repository;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        public AuthController(IAuthRepository repository, IConfiguration config, IMapper mapper)
        {
            _repository = repository;
            _config = config;
            _mapper = mapper;

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {


            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

            if(await _repository.UserExist(userForRegisterDto.Username))
            {
                return BadRequest("Użytkownik o takiej nazwie już istnieje");
            }

            var userToCreate = new User
            {
                Username = userForRegisterDto.Username,

                 Gender = userForRegisterDto.Gender,

                DateOfBirth = userForRegisterDto.DateOfBirth,

                ZodiacSign = userForRegisterDto.ZodiacSign,
                
                Created = userForRegisterDto.Created,

                 LastActive = userForRegisterDto.LastActive,

                City = userForRegisterDto.City,

                Country = userForRegisterDto.Country
            };

            

            var cretedUser = await _repository.Register(userToCreate, userForRegisterDto.Password);

            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var userFromRepo = await _repository.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);
            
            if(userFromRepo == null)
                return Unauthorized();

            //create Token

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Username)
            };

           var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

           var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

           var tokenDescriptor = new SecurityTokenDescriptor
           {
               Subject = new ClaimsIdentity(claims),
               Expires = DateTime.Now.AddHours(12), //Tu ustawia sie czas jak dlugo ma byc token przewaznie duzo krocej
               SigningCredentials = creds
           };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            var user = _mapper.Map<UserForListDto>(userFromRepo);


            return Ok(new 
            { 
                token = tokenHandler.WriteToken(token),
                user
            });
           


        }

    }
}