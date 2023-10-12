using CustomerUI.Data;

namespace CustomerUI.Services
{
    public class BrandService : IBrandService
    {
        private readonly HttpClient _httpClient;

        public BrandService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<IEnumerable<Brand>> GetBrands()
        {
            return await _httpClient.GetFromJsonAsync<Brand[]>("api/Brand");
        }

        public async Task<Brand> GetBrandById(int id)
        {
            return await _httpClient.GetFromJsonAsync<Brand>("api/Brand/" + id);
        }

        public async Task CreateBrand(Brand brand)
        {
            await _httpClient.PostAsJsonAsync("api/Brand", brand);

        }

        public async Task UpdateBrand(Brand brand)
        {
            await _httpClient.PutAsJsonAsync($"api/Brand/{brand.BrandId}", brand);
        }

        public async Task DeleteBrand(int id)
        {
            await _httpClient.DeleteAsync("api/Brand/" + id);
        }
    }
}
