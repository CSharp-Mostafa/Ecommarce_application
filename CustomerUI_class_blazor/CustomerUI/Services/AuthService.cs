using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using CustomerUI.Data;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.JSInterop;

namespace CustomerUI.Services
{
    public class AuthService : IAuthService
    {
        private readonly HttpClient _httpClient;
        private readonly IJSRuntime _jsRuntime;

        public AuthService(HttpClient httpClient, IJSRuntime jsRuntime)
        {
            _httpClient = httpClient;
            _jsRuntime = jsRuntime;

            // Set the BaseAddress to your API base URL
            _httpClient.BaseAddress = new Uri("http://localhost:5250/");

        }

        public async Task<UserDTO> Login(LoginDTO loginDto)
        {
            var response = await _httpClient.PostAsJsonAsync("api/Account/login", loginDto);

            if (response.IsSuccessStatusCode)
            {
                var user = await response.Content.ReadFromJsonAsync<UserDTO>();
                if (user != null)
                {
                    // Store the user's display name and token in local storage
                    await _jsRuntime.InvokeVoidAsync("localStorage.setItem", "userDisplayName", user.DisplayName);
                    await _jsRuntime.InvokeVoidAsync("localStorage.setItem", "userToken", user.Token);
                }
                return user;
            }
            else
            {
                // Handle error here
                return null;
            }
        }

        public async Task Logout()
        {
            // Clear user authentication data from local storage
            await _jsRuntime.InvokeVoidAsync("localStorage.removeItem", "userDisplayName");
            await _jsRuntime.InvokeVoidAsync("localStorage.removeItem", "userToken");
        }

        public async Task<UserDTO> Register(RegisterDTO registerDto)
        {
            var response = await _httpClient.PostAsJsonAsync("api/Account/register", registerDto);

            if (response.IsSuccessStatusCode)
            {
                var user = await response.Content.ReadFromJsonAsync<UserDTO>();
                if (user != null)
                {
                    // Store the user's display name and token in local storage
                    await _jsRuntime.InvokeVoidAsync("localStorage.setItem", "userDisplayName", user.DisplayName);
                    await _jsRuntime.InvokeVoidAsync("localStorage.setItem", "userToken", user.Token);
                }
                return user;
            }
            else
            {
                // Handle error here
                return null;
            }
        }
        public string UserDisplayName { get; set; }
    }
}
