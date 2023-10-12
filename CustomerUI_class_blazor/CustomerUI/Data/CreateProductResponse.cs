namespace CustomerUI.Data
{
    public class CreateProductResponse
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public string? ProductImage { get; set; }
        public string Category { get; set; }
        public string CategoryId { get; set; }
        public string CategoryName { get; set; }

        public string SubCategoryId { get; set; }
        public string SubCategoryName { get; set; }


        public string SubCategory { get; set; }
        public string Brand { get; set; }
        public string BrandId { get; set; }
        public string BrandName { get; set; }


        public bool IsActive { get; set; }
        public IFormFile? ImageFile { get; set; }

    }
}
