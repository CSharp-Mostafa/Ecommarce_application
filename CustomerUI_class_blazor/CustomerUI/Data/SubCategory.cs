using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CustomerUI.Data
{
    public class SubCategory
    {
        [Key]
        public int SubCategoryId { get; set; }
        public string? SubCategoryName { get; set; }

    }
}