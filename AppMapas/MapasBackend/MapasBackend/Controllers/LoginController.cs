using MapasBackend.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http;
using System.Text;

namespace MapasBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        public LoginController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpPost]
        [Route("login")]
        public async Task<HttpResponseMessage> postToken(Login login)
        {
            string url = "https://prog3.nhorenstein.com/api/usuario/LoginUsuarioWeb";

            var body = JsonConvert.SerializeObject(login);
            var content = new StringContent(body, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync(url, content);
            response.EnsureSuccessStatusCode();

            var content2 = await response.Content.ReadAsStringAsync();

            dynamic obj = JsonConvert.DeserializeObject(content2);
            string token = obj.token;
            TokenClass.Instance().Token = token;

            return response;
        }
    }
}
