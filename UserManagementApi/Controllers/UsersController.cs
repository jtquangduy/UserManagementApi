using Microsoft.AspNetCore.Mvc;
using UserManagementApi.Api.Models;
using UserManagementApi.Domain.Entities;
using UserManagementApi.Infrastructure.Repositories;

namespace UserManagementApi.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _repository;
        private readonly ILogger<UsersController> _logger;

        public UsersController(IUserRepository repository, ILogger<UsersController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            var users = await _repository.GetAllAsync();
            var dtos = users.Select(u => MapToDto(u));
            return Ok(dtos);
        }

        // GET: api/users/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<UserDto>> GetUser(int id)
        {
            var user = await _repository.GetByIdAsync(id);
            if (user == null)
                return NotFound();

            return Ok(MapToDto(user));
        }

        // POST: api/users
        [HttpPost]
        public async Task<ActionResult<UserDto>> CreateUser([FromBody] UserDto userDto)
        {
            if (!ModelState.IsValid)
                return ValidationProblem(ModelState);

            // Check for existing email
            var existingUser = await _repository.GetByEmailAsync(userDto.Email);
            if (existingUser != null)
                return Conflict(new { message = "Email already exists." });

            var user = MapToEntity(userDto);

            await _repository.AddAsync(user);

            var createdDto = MapToDto(user);

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, createdDto);
        }

        // PUT: api/users/5
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserDto userDto)
        {
            if (id != userDto.Id)
                return BadRequest(new { message = "Id mismatch." });

            if (!ModelState.IsValid)
                return ValidationProblem(ModelState);

            var existingUser = await _repository.GetByIdAsync(id);
            if (existingUser == null)
                return NotFound();

            // If email is changed, check uniqueness
            if (!string.Equals(existingUser.Email, userDto.Email, StringComparison.OrdinalIgnoreCase))
            {
                var emailExists = await _repository.GetByEmailAsync(userDto.Email);
                if (emailExists != null)
                    return Conflict(new { message = "Email already exists." });
            }

            existingUser.FirstName = userDto.FirstName;
            existingUser.LastName = userDto.LastName;
            existingUser.Email = userDto.Email;
            existingUser.PhoneNumber = userDto.PhoneNumber;
            existingUser.ZipCode = userDto.ZipCode;

            await _repository.UpdateAsync(existingUser);

            return NoContent();
        }

        // DELETE: api/users/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _repository.GetByIdAsync(id);
            if (user == null)
                return NotFound();

            await _repository.DeleteAsync(user);

            return NoContent();
        }

        // Mapping helpers
        private static UserDto MapToDto(User user)
        {
            return new UserDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                ZipCode = user.ZipCode
            };
        }

        private static User MapToEntity(UserDto dto)
        {
            return new User
            {
                Id = dto.Id,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                ZipCode = dto.ZipCode
            };
        }
    }
}