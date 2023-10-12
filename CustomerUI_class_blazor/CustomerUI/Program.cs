using CustomerUI.Data;
using CustomerUI.Services;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();
builder.Services.AddSingleton<WeatherForecastService>();

builder.Services.AddScoped<SupplierService>(); ///add


/*builder.Services.AddHttpClient<IBrandService, BrandService>
    
    (client => {client.BaseAddress = new Uri("http://localhost:5250/");

});*/

var baseAddress = new Uri("http://localhost:5250/");

builder.Services.AddHttpClient<IBrandService, BrandService>(client =>
{
    client.BaseAddress = baseAddress;
});

builder.Services.AddHttpClient<IProductService, ProductService >(client =>
{
    client.BaseAddress = baseAddress;
});

builder.Services.AddHttpClient<ISubCategoryService, SubCategoryService>(client =>
{
    client.BaseAddress = baseAddress;
});

builder.Services.AddHttpClient<ICategoryService, CategoryService>(client =>
{
    client.BaseAddress = baseAddress;
});

builder.Services.AddHttpClient<ISupplierService, SupplierService>(client =>
{
    client.BaseAddress = baseAddress;
});

// Configure the HttpClient for AuthService
builder.Services.AddScoped<IAuthService, AuthService>();

builder.Services.AddHttpClient<AuthService>((services, client) =>
{
    client.BaseAddress = baseAddress;
});




var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}


app.UseStaticFiles();

app.UseRouting();

app.MapBlazorHub();
app.MapFallbackToPage("/_Host");

app.Run();
