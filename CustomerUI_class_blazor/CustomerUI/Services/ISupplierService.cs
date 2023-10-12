using CustomerUI.Data;

namespace CustomerUI.Services
{
    public interface ISupplierService
    {
            Task<IEnumerable<Supplier>> GetSuppliers();
            Task<Supplier> GetSupplierById(int id);
            Task CreateSupplier(Supplier supplier);
            Task UpdateSupplier(Supplier supplier);
            Task DeleteSupplier(int id);
       
    }
}
