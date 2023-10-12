using CustomerUI.Data;
namespace CustomerUI.Services
{
    public class SubCategoryService : ISubCategoryService
    {
        private readonly HttpClient _httpClient;

        public SubCategoryService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<IEnumerable<SubCategory>> GetSubCategories()
        {
            return await _httpClient.GetFromJsonAsync<SubCategory[]>("api/SubCategory");
        }

        public async Task<SubCategory> GetSubCategoryById(int id)
        {
            return await _httpClient.GetFromJsonAsync<SubCategory>("api/SubCategory/" + id);
        }

        public async Task CreateSubCategory(SubCategory subCategory)
        {
            await _httpClient.PostAsJsonAsync("api/SubCategory", subCategory);
        }

        public async Task UpdateSubCategory(SubCategory subCategory)
        {
            await _httpClient.PutAsJsonAsync($"api/SubCategory/{subCategory.SubCategoryId}", subCategory);
        }

        public async Task DeleteSubCategory(int id)
        {
            await _httpClient.DeleteAsync("api/SubCategory/" + id);
        }
    }
}
