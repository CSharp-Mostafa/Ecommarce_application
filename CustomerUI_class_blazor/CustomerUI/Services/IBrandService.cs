using CustomerUI.Data;


namespace CustomerUI.Services
{
    public interface IBrandService
    {
        Task<IEnumerable<Brand>> GetBrands();
        Task<Brand> GetBrandById(int id);
        Task CreateBrand(Brand brand);
        Task UpdateBrand(Brand brand);
        Task DeleteBrand(int id);
    }
}
