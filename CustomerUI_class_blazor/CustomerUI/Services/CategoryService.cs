using CustomerUI.Data;
namespace CustomerUI.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly HttpClient _httpClient;

        public CategoryService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<IEnumerable<Category>> GetCategories()
        {
            return await _httpClient.GetFromJsonAsync<Category[]>("api/Category");
        }

        public async Task<Category> GetCategoryById(int id)
        {
            return await _httpClient.GetFromJsonAsync<Category>("api/Category/" + id);
        }

        public async Task CreateCategory(Category category)
        {
            await _httpClient.PostAsJsonAsync("api/Category", category);
        }

        public async Task UpdateCategory(Category category)
        {
            await _httpClient.PutAsJsonAsync($"api/Category/{category.CategoryId}", category);
        }

        public async Task DeleteCategory(int id)
        {
            await _httpClient.DeleteAsync("api/Category/" + id);
        }
    }
}
