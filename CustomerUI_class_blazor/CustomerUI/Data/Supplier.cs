
using System.ComponentModel.DataAnnotations;


namespace CustomerUI.Data
{
    public class Supplier
    {
        [Key]
        public int SupplierId { get; set; }
        public string? SupplierName { get; set; }
        public string? Email { get; set; }
        public int ContactNo { get; set; }
        public string? Address { get; set; }

    }
}