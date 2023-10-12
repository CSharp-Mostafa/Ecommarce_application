using CustomerUI.Data;
using System.Threading.Tasks;

namespace CustomerUI.Services
{
    public interface IProductService
    {
        Task<List<Product>> GetAllProducts();
        Task<Product> GetProductById(int id);
        //Task CreateProduct(Product product);
        Task<Product> CreateProductAsync(MultipartFormDataContent formData);
        //Task<Product> UpdateProduct(int id, Product product);
        Task<Product> UpdateProductAsync(int id, MultipartFormDataContent formData);
        Task DeleteProduct(int id);

    }
}
