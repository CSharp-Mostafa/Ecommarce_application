namespace CustomerUI.Data
{
    public class Pagination<T>
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int Count { get; set; }
        public List<Product> Data { get; set; }
    }
}
