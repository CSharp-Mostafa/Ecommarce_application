using CustomerUI.Data;

namespace CustomerUI.Services
{
    public class SupplierService : ISupplierService
    {
        private readonly HttpClient _httpClient;

        public SupplierService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<IEnumerable<Supplier>> GetSuppliers()
        {
            return await _httpClient.GetFromJsonAsync<Supplier[]>("api/Supplier");
        }
        public async Task<Supplier> GetSupplierById(int id)
        {
            return await _httpClient.GetFromJsonAsync<Supplier>("api/Supplier/" + id);

        }
     
        public async Task CreateSupplier(Supplier supplier)
        {
            await _httpClient.PostAsJsonAsync("api/Supplier", supplier);

        }
        public async Task UpdateSupplier(Supplier supplier)
        {
            await _httpClient.PutAsJsonAsync($"api/Supplier/{supplier.SupplierId}", supplier);

        }
        public async Task DeleteSupplier(int id)
        {
            await _httpClient.DeleteAsync("api/Supplier/" + id);
        }
    }
}
