using CustomerUI.Data;

namespace CustomerUI.Services
{

    public interface IAuthService
    {
        Task<UserDTO> Login(LoginDTO loginDto);
        Task Logout();
        Task<UserDTO> Register(RegisterDTO registerDto);
    }
}
