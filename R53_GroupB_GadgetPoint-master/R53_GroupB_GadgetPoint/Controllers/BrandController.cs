using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PdfSharpCore.Pdf;
using PdfSharpCore;
using TheArtOfDev.HtmlRenderer.PdfSharp;
using R53_GroupB_GadgetPoint.DAL.Interface;
using R53_GroupB_GadgetPoint.Models;
using R53_GroupB_GadgetPoint.Context;
using Microsoft.EntityFrameworkCore;
using System.Text;
using PdfSharpCore.Drawing;
using Microsoft.Data.SqlClient.Server;
using System.Linq;
using System.Reflection.Metadata;

namespace R53_GroubB_GadgetPoint.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private IBrandRepository rpBrand;
        private readonly StoreContext _context;
        public BrandController(IBrandRepository ripository, StoreContext context)
        {
            rpBrand = ripository;
            _context = context;

        }
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var entities = await rpBrand.ListAllAsync();
            return Ok(entities);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var entity = await rpBrand.GetByIdAsync(id);
            if (entity == null)
            {
                return NotFound();
            }
            return Ok(entity);
        }
        [HttpPost]
        public async Task<ActionResult> Create(Brand entity)
        {
            if (ModelState.IsValid)
            {
                var createdEntity = await rpBrand.CreateAsync(entity);
                return Ok(createdEntity);
            }
            return BadRequest();
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, Brand entity)
        {
            var updatedEntity = await rpBrand.UpdateAsync(id, entity);
            return Ok(updatedEntity);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var entity = await rpBrand.GetByIdAsync(id);
            if (entity != null)
            {
                await rpBrand.DeleteAsync(entity);
                return Ok();
            }
            return NotFound();
        }


        [HttpGet("generateallpdf")]
        public async Task<IActionResult> GenerateAllBrandsPDFReport()
        {
            var brands = await _context.Brands.ToListAsync();
            var html = new StringBuilder();
            html.AppendLine("<head>");
            html.AppendLine("<style>");
            html.AppendLine(".header { width:100%;   background-color: #fff;}");
            html.AppendLine("table { border-collapse: collapse; width: 100%; margin-top: 20px; }");
            html.AppendLine("th, td { font-weight: bold; border: 1px solid black; padding: 8px; text-align: center;  }");
            html.AppendLine(".footer { position: fixed; top: 95%; width: 100%;  text-align: left; padding-left: 30px}");
            html.AppendLine(".footer2 { position: fixed; top: 95%; width: 100%; text-align: center; padding-left: 55px}");
            html.AppendLine(".footer3 { position: fixed; top: 95%; width: 100%; text-align: right ; padding-left: 299px}");
            html.AppendLine(".content-container { border: 1px solid black; padding: 10px; }"); // for border
            html.AppendLine("</style>");
            html.AppendLine("</head>");
            html.AppendLine("<body>");

            var brandChunks = brands.Chunk(17);

            foreach (var brandChunk in brandChunks)
            {
                // Add header content for every page
                html.AppendLine("<div class='header'>");
                html.AppendLine("<div style='position:absolute; text-align:left;  left:5px; margin-top:30px; margin-left:6px'>");
                html.AppendLine("<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROnYPD5QO8ZJvPQt8ClnJNPXduCeX89dSOxA&usqp=CAU' alt='Company Logo' style='top:10px; left:7px; width:100px;'/>");
                html.AppendLine("</div>");
                html.AppendLine("<div style='position:absolute;text-align:center ' class='content'>");
                html.AppendLine("<h1>Gadget Point</h1>");
                html.AppendLine("<h2>Group_B: CS/NVIT-M/53/01</h2>");
                html.AppendLine("<h3>All Brand</h3>");
                html.AppendLine("</div>");
                html.AppendLine("</div>");

                html.AppendLine("<table>");

                html.AppendLine("<tr><th>Serial No</th><th>Brand Name</th></tr>");
                foreach (var brand in brandChunk)
                {
                    html.AppendLine("<tr>");
                    html.AppendLine($"<td>{brand.BrandId}</td>");
                    html.AppendLine($"<td>{brand.BrandName}</td>");
                    html.AppendLine("</tr>");
                }
                html.AppendLine("</table>");
                // Add page break
                html.AppendLine("<div style='page-break-before:always'></div>");
            }

            html.AppendLine("</body>");
            html.AppendLine("</html>");
            var pdfStream = GeneratePdfFromHtml(html.ToString());
            string FileName = "BrandReport.pdf";
            return File(pdfStream, "application/pdf", FileName);
        }

        private MemoryStream GeneratePdfFromHtml(string htmlContent)
        {
            var pdfDocument = new PdfDocument();
            PdfGenerator.AddPdfPages(pdfDocument, htmlContent, PageSize.A4);
            for (int i = 0; i < pdfDocument.Pages.Count; i++)
            {
                var page = pdfDocument.Pages[i];
                var gfx = XGraphics.FromPdfPage(page);
                var font = new XFont("Arial", 10);
                var xpage = page.Width / 2;
                var ypage = page.Height - 20;

                // Comment out the original page number drawing
                gfx.DrawString((i + 1).ToString(), font, XBrushes.Black, new XPoint(xpage, ypage));

                // Add "Printed On" information
                gfx.DrawString($"Printed On: {DateTime.Now}", font, XBrushes.Black, new XPoint(30, ypage));

                // Add "Prepared By" information
                gfx.DrawString("Prepared By: C#_Group_B", font, XBrushes.Black, new XPoint(page.Width - 200, ypage));
            }
            var pdfStream = new MemoryStream();
            pdfDocument.Save(pdfStream, false);
            pdfStream.Seek(0, SeekOrigin.Begin);
            return pdfStream;
        }
    }
}
