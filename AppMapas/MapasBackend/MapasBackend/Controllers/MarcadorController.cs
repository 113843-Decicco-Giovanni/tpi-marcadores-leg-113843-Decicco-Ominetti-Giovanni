using MapasBackend.Domain;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;

namespace MapasBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarcadorController : ControllerBase
    {
        private HttpClient _httpClient;
        public MarcadorController(HttpClient httpClient)
        {
            _httpClient = httpClient;
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", TokenClass.Instance().Token);
        }

        [HttpGet]
        [Route("getMarcadores")]
        public async Task<IActionResult> GetMarcadores()
        {
            string url = "https://prog3.nhorenstein.com/api/marcador/GetMarcadores";

            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();

            return Content(content, "application/json");
        }
    }
}
