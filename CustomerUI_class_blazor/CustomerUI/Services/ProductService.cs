using CustomerUI.Data;
using System.Text.Json;

namespace CustomerUI.Services
{
    public class ProductService : IProductService
    {
        private readonly HttpClient _httpClient;

        public ProductService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<Product>> GetAllProducts()
        {
            try
            {
                var response = await _httpClient.GetFromJsonAsync<Pagination<List<Product>>>("api/Product");

                if (response != null && response.Data != null)
                {
                    return response.Data;
                }
                else
                {
                    // Handle the case where the response or data is null
                    return new List<Product>();
                }
            }
            catch (JsonException ex)
            {
                // Handle the JSON deserialization exception (e.g., log the error)
                // Return an empty list or throw a custom exception as needed.
                // For example: return new List<ProductClass>();
                throw;
            }
        }

        public async Task<Product> GetProductById(int id)
        {
            return await _httpClient.GetFromJsonAsync<Product>($"api/Product/{id}");
        }


        public async Task<Product> CreateProductAsync(MultipartFormDataContent formData)
        {
            try
            {
                // Send an HTTP POST request to the API with the form data
                var response = await _httpClient.PostAsync("api/Product", formData);

                if (response.IsSuccessStatusCode)
                {
                    // Product created successfully, read and return the response as a Product
                    return await response.Content.ReadFromJsonAsync<Product>();
                }
                else
                {
                    // If the response is not successful, handle the error
                    throw new Exception("Failed to create the product. HTTP Status Code: " + response.StatusCode);
                }
            }
            catch (HttpRequestException ex)
            {
                // Handle any network or HTTP-related errors and log the error if needed.
                throw new Exception("Failed to create the product. Error: " + ex.Message, ex);
            }
        }


        //public async Task<Product> UpdateProduct(int id, Product product)
        //{
        //    var response = await _httpClient.PutAsJsonAsync($"api/Product/{id}", product);
        //    if (response.IsSuccessStatusCode)
        //    {
        //        return await response.Content.ReadFromJsonAsync<Product>();
        //    }
        //    else
        //    {
        //        throw new Exception("Failed to update the product.");
        //    }
        //}


        public async Task<Product> UpdateProductAsync(int id, MultipartFormDataContent formData)
        {
            try
            {
                // Send an HTTP PUT request to update the product with the given ID
                var response = await _httpClient.PutAsync($"api/Product/{id}", formData);

                if (response.IsSuccessStatusCode)
                {
                    // Product updated successfully, read and return the response as a Product
                    return await response.Content.ReadFromJsonAsync<Product>();
                }
                else
                {
                    // If the response is not successful, handle the error
                    throw new Exception("Failed to update the product. HTTP Status Code: " + response.StatusCode);
                }
            }
            catch (HttpRequestException ex)
            {
                // Handle any network or HTTP-related errors and log the error if needed.
                throw new Exception("Failed to update the product. Error: " + ex.Message, ex);
            }
        }


        public async Task DeleteProduct(int id)
        {
            var response = await _httpClient.DeleteAsync($"api/Product/{id}");
            if (!response.IsSuccessStatusCode)
            {
                throw new Exception("Failed to delete the product.");
            }
        }
    }
}
