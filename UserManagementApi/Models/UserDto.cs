using System.ComponentModel.DataAnnotations;
using UserManagementApi.Domain.Entities;

namespace UserManagementApi.Api.Models
{
    public class UserDto
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 1)]
        public string FirstName { get; set; } = null!;

        [Required]
        [StringLength(50, MinimumLength = 1)]
        public string LastName { get; set; } = null!;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Phone]
        public string? PhoneNumber { get; set; }

        [ZipCodeValidation]
        public string? ZipCode { get; set; }
    }
}