using CustomerUI.Data;

namespace CustomerUI.Services
{
    public interface ISubCategoryService
    {
        Task<IEnumerable<SubCategory>> GetSubCategories();
        Task<SubCategory> GetSubCategoryById(int id);
        Task CreateSubCategory(SubCategory subCategory);
        Task UpdateSubCategory(SubCategory subCategory);
        Task DeleteSubCategory(int id);
    }
}
