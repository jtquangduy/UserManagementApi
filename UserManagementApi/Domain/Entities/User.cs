using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace UserManagementApi.Domain.Entities
{
    public class User
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

        // For ZipCode validation, we'll implement a custom attribute later
        [ZipCodeValidation]
        public string? ZipCode { get; set; }
    }

    /// <summary>
    /// Custom validation attribute for ZipCode (supports US and generic formats)
    /// </summary>
    public class ZipCodeValidationAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value == null)
                return ValidationResult.Success;

            var zipCode = value.ToString()!;

            // US ZIP code (5 digits or 5+4 digits)
            var usRegex = new Regex(@"^\d{5}(-\d{4})?$");

            // Generic postal code (alphanumeric, 3-10 chars)
            var genericRegex = new Regex(@"^[A-Za-z0-9\s\-]{3,10}$");

            if (usRegex.IsMatch(zipCode) || genericRegex.IsMatch(zipCode))
                return ValidationResult.Success;

            return new ValidationResult("Invalid zip code format.");
        }
    }
}