
using System.ComponentModel.DataAnnotations;


namespace CustomerUI.Data
{
    public class Brand
    {
        [Key]
        public int BrandId { get; set; }
        public string? BrandName { get; set; }

    }
}