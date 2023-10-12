using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using PdfSharpCore;
using PdfSharpCore.Drawing;
using PdfSharpCore.Pdf;
using R53_GroupB_GadgetPoint.Context;
using R53_GroupB_GadgetPoint.DAL.Interface;
using R53_GroupB_GadgetPoint.Models;
using System.Drawing;
using System.Linq;
using System.Reflection.Metadata;
using System.Security.Policy;
using System.Text;
using TheArtOfDev.HtmlRenderer.PdfSharp;

namespace R53_GroubB_GadgetPoint.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierController : ControllerBase
    {

        private readonly StoreContext _context;
        private ISupplierRepository rpSupplier;


        public SupplierController(ISupplierRepository ripository, StoreContext context)
        {
            rpSupplier = ripository;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var entities = await rpSupplier.ListAllAsync();
            return Ok(entities);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var entity = await rpSupplier.GetByIdAsync(id);
            if (entity == null)
            {
                return NotFound();
            }
            return Ok(entity);
        }

        [HttpPost]
        public async Task<ActionResult> Create(Supplier entity)
        {
            if (ModelState.IsValid)
            {
                var createdEntity = await rpSupplier.CreateAsync(entity);
                return Ok(createdEntity);
            }
            return BadRequest();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, Supplier entity)
        {

            var updatedEntity = await rpSupplier.UpdateAsync(id, entity);
            return Ok(updatedEntity);

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var entity = await rpSupplier.GetByIdAsync(id);
            if (entity != null)
            {
                await rpSupplier.DeleteAsync(entity);
                return Ok();
            }

            return NotFound();
        }




        //[HttpGet("generateallpdff")]
        //public async Task<IActionResult> GenerateAllSuppliersPDFReport()
        //{
        //    var suppliers = await _context.Suppliers.ToListAsync();

        //    // Create an HTML string for the report
        //    var html = new StringBuilder();

        //    html.AppendLine("<html>");
        //    html.AppendLine("<head>");
        //    html.AppendLine("<style>");
        //    html.AppendLine(".header { width:100%; position:relative; background-color: #fff; margin: 17px;}");
        //    html.AppendLine("table { border-collapse: collapse;page-break-before: auto; width: 100%; }");
        //    html.AppendLine("thead { display: table-header-group;}"); // Define a CSS class for center alignment
        //    html.AppendLine("th, td { border: 1px solid black; padding: 8px; text-align: center; }");
        //    html.AppendLine(".centered { text-align: center; }"); // Define a CSS class for center alignment
        //    html.AppendLine(".content-container { border: 1px solid black; padding: 10px; }");

        //    html.AppendLine(".left { text-align: left; }");
        //    html.AppendLine(".footer { position: fixed; bottom: 0; left: 0; right: 0; text-align: center; font-size: 10px; color: #555; }"); // Define a CSS class for the footer
        //    html.AppendLine("</style>");
        //    html.AppendLine("</head>");
        //    html.AppendLine("<body>");
        //    // Center-align the title

        //    html.AppendLine("<div class='content-container'>");
        //    // Center-align the title
        //    html.AppendLine("<div class='header'>");
        //    html.AppendLine("<div style='position:absolute; text-align:left; top:10px; left:5px; margin-top:7px; margin-left:6px'>");
        //    html.AppendLine("<img src='images\\logo.png' alt='Company Logo' style='top:10px; left:7px; width:100px;'/>");
        //    html.AppendLine("</div>");

        //    html.AppendLine("<div style='position:absolute;text-align:center ' class='content'>");
        //    html.AppendLine("<h1>Gadget Point</h1>");
        //    html.AppendLine("<h2>Group_B:CS/NVIT-M/53/01</h2>");
        //    html.AppendLine("<h3>Supplier Information</h3>");
        //    html.AppendLine("</div>");
        //    html.AppendLine("</div>");

        //    html.AppendLine("</div>");

        //    html.AppendLine("<table>");

        //    // Add a thead element for the table header row
        //    html.AppendLine("<thead>");
        //    html.AppendLine("<tr><th>Supplier ID</th><th>Supplier Name</th><th>Email</th><th>Contact No</th><th>Address</th></tr>");
        //    html.AppendLine("</thead>");

        //    // Add supplier data to the table body
        //    html.AppendLine("<tbody>");
        //    foreach (var supplier in suppliers)
        //    {
        //        html.AppendLine("<tr>");
        //        html.AppendLine($"<td>{supplier.SupplierId}</td>");
        //        html.AppendLine($"<td>{supplier.SupplierName}</td>");
        //        html.AppendLine($"<td>{supplier.Email}</td>");
        //        html.AppendLine($"<td>{supplier.ContactNo}</td>");
        //        html.AppendLine($"<td>{supplier.Address}</td>");
        //        html.AppendLine("</tr>");
        //    }
        //    html.AppendLine("</tbody>");

        //    html.AppendLine("</table>");
        //    html.AppendLine("</body>");
        //    html.AppendLine("</html>");



        //    // Convert HTML to PDF
        //    var pdfStream = GeneratePdfFromHtml(html.ToString());

        //    // Specify the file name
        //    string FileName = "SupplierReport.pdf";

        //    // Return the PDF as a file
        //    return File(pdfStream, "application/pdf", FileName);
        //}


        //private MemoryStream GeneratePdfFromHtml(string htmlContent)
        //{
        //    var pdfDocument = new PdfDocument();
        //    PdfGenerator.AddPdfPages(pdfDocument, htmlContent, PageSize.A4);

        //    // Add the date to each page
        //    for (int i = 0; i < pdfDocument.PageCount; i++)
        //    {
        //        var page = pdfDocument.Pages[i];
        //        var gfx = XGraphics.FromPdfPage(page);
        //        var format = new XStringFormat
        //        {
        //            Alignment = XStringAlignment.Center,
        //            LineAlignment = XLineAlignment.Near
        //        };
        //        var font = new XFont("Arial", 10);
        //        var currentDate = DateTime.Now.ToString("dd-MM-yyyy HH:mm");


        //        // Calculate the position to place the date at the bottom
        //        var xPos = page.Width / 2;
        //        var yPos = page.Height - 20; // Adjust this value as needed

        //        gfx.DrawString(currentDate, font, XBrushes.Gray, new XPoint(xPos, yPos), format);
        //    }

        //    var pdfStream = new MemoryStream();
        //    pdfDocument.Save(pdfStream, false);

        //    pdfStream.Seek(0, SeekOrigin.Begin);
        //    return pdfStream;
        //}
        //====================================================================






        [HttpGet("generateallpdff")]
        public async Task<IActionResult> GenerateAllSuppliersPDFReport()
        {
            var suppliers = await _context.Suppliers.ToListAsync();

            // Create an HTML string for the report
            var html = new StringBuilder();

            html.AppendLine("<html>");
            html.AppendLine("<head>");
            html.AppendLine("<style>");
            //html.AppendLine("table { border-collapse: collapse;page-break-before: auto; width: 100%; }");
            html.AppendLine("table { border-collapse: collapse;page-break-before: auto; width: 100%; margin-top: 20px; }");
            html.AppendLine("th, td { border: 1px solid black; padding: 8px; text-align: center; }");
            html.AppendLine(".content-container { border: 1px solid black; padding: 10px; }");
            html.AppendLine(".footer { position: fixed; bottom: 0; left: 0; right: 0; text-align: center; font-size: 10px; color: #555; }"); // Define a CSS class for the footer
            html.AppendLine("</style>");
            html.AppendLine("</head>");
            html.AppendLine("<body>");
            html.AppendLine("<div class='content-container'>");
            html.AppendLine("<div style='position:absolute; text-align:left; top:10px; left:5px; margin-top:7px; margin-left:6px'>");
            html.AppendLine("<img src='images\\logo.png' alt='Company Logo' style='top:10px; left:7px; width:100px;'/>");
            html.AppendLine("</div>");
            html.AppendLine("<div style='position:absolute;text-align:center ' class='content'>");
            html.AppendLine("<h1>Gadget Point</h1>");
            html.AppendLine("<h2>Group_B:CS/NVIT-M/53/01</h2>");
            html.AppendLine("<h3>Supplier Information</h3>");
            html.AppendLine("</div>");
            html.AppendLine("</div>");
            html.AppendLine("<table>");
            // Add a thead element for the table header row
            html.AppendLine("<thead>");
            html.AppendLine("<tr><th>Supplier ID</th><th>Supplier Name</th><th>Email</th><th>Contact No</th><th>Address</th></tr>");
            html.AppendLine("</thead>");
            // Add supplier data to the table body
            html.AppendLine("<tbody>");
            foreach (var supplier in suppliers)
            {
                html.AppendLine("<tr>");
                html.AppendLine($"<td>{supplier.SupplierId}</td>");
                html.AppendLine($"<td>{supplier.SupplierName}</td>");
                html.AppendLine($"<td>{supplier.Email}</td>");
                html.AppendLine($"<td>{supplier.ContactNo}</td>");
                html.AppendLine($"<td>{supplier.Address}</td>");
                html.AppendLine("</tr>");
            }
            html.AppendLine("</tbody>");
            html.AppendLine("</table>");
            html.AppendLine("</body>");


            html.AppendLine("</html>");

            // Convert HTML to PDF
            var pdfStream = GeneratePdfFromHtml(html.ToString());

            // Specify the file name
            string FileName = "SupplierReport.pdf";

            // Return the PDF as a file
            return File(pdfStream, "application/pdf", FileName);
        }


        //private MemoryStream GeneratePdfFromHtml(string htmlContent)
        //{
        //    var pdfDocument = new PdfDocument();
        //    PdfGenerator.AddPdfPages(pdfDocument, htmlContent, PageSize.A4);
        //    var pdfStream = new MemoryStream();
        //    pdfDocument.Save(pdfStream, false);
        //    pdfStream.Seek(0, SeekOrigin.Begin);
        //    return pdfStream;
        //}



        private MemoryStream GeneratePdfFromHtml(string htmlContent)
        {
            var pdfDocument = new PdfDocument();
            PdfGenerator.AddPdfPages(pdfDocument, htmlContent, PageSize.A4);

            // Define the border color and thickness
            var borderColor = XPens.Red;
            // var borderWidth = 2; // Adjust this value as needed

            // Iterate through each page
            for (int i = 0; i < pdfDocument.PageCount; i++)
            {
                var page = pdfDocument.Pages[i];
                var gfx = XGraphics.FromPdfPage(page);
                var format = new XStringFormat
                {
                    Alignment = XStringAlignment.Center,
                    LineAlignment = XLineAlignment.Near
                };
                var font = new XFont("Arial", 10);

                // Calculate the position to place the date at the bottom
                var xPosDate = page.Width / 2;
                var yPosDate = page.Height - 20; // Adjust this value as needed

                // Calculate the position to place the page number at the bottom
                var xPosPage = page.Width - 40;
                var yPosPage = page.Height - 20; // Adjust this value as needed

                // Draw the red border around all sides of the page
                var pageWidth = page.Width;
                var pageHeight = page.Height;

                // Draw top border
                gfx.DrawLine(borderColor, 0, 0, pageWidth, 0);

                // Draw bottom border
                gfx.DrawLine(borderColor, 0, pageHeight, pageWidth, pageHeight);

                // Draw left border
                gfx.DrawLine(borderColor, 0, 0, 0, pageHeight);

                // Draw right border
                gfx.DrawLine(borderColor, pageWidth, 0, pageWidth, pageHeight);

                // Draw the current date and page number at the bottom of the page
                gfx.DrawString($"Printed On: {DateTime.Now.ToString("dd-MM-yyyy hh:mm tt")}", font, XBrushes.Black, new XPoint(xPosDate, yPosDate), format);

                gfx.DrawString((i + 1).ToString(), font, XBrushes.Black, new XPoint(xPosPage, yPosPage), format);

                if (i > 0)
                {
                    // Draw the logo, title, and table header on each page
                    DrawLogo(gfx, page);
                    DrawTitle(gfx, page);
                    DrawTableHeader(gfx, page);
                }
            }

            var pdfStream = new MemoryStream();
            pdfDocument.Save(pdfStream, false);

            pdfStream.Seek(0, SeekOrigin.Begin);
            return pdfStream;
        }


        private void DrawLogo(XGraphics gfx, PdfPage page)
        {
            // Add code to draw the logo at a specific position on the page
            var image = XImage.FromFile("images\\logo.png");
            var xPosition = 40; // Adjust this value as needed
            var yPosition = 10; // Adjust this value as needed
            gfx.DrawImage(image, xPosition, yPosition, image.PixelWidth, image.PixelHeight);
        }

        private void DrawTitle(XGraphics gfx, PdfPage page)
        {
            // Add code to draw the title at a specific position on the page
            var font = new XFont("Arial", 16, XFontStyle.Bold);
            var title = "Gadget Point";
            var xPosition = 200; // Adjust this value as needed
            var yPosition = 40; // Adjust this value as needed
            gfx.DrawString(title, font, XBrushes.Black, new XPoint(xPosition, yPosition));
        }

        private void DrawTableHeader(XGraphics gfx, PdfPage page)
        {
            // Add code to draw the table header at a specific position on the page
            var font = new XFont("Arial", 10, XFontStyle.Bold);
            var xPosition = 40; // Adjust this value as needed
            var yPosition = 100; // Adjust this value as needed
            var tableHeaderRect = new XRect(xPosition, yPosition, page.Width - 80, 20); // Adjust margins and height as needed
            gfx.DrawRectangle(XBrushes.LightGray, tableHeaderRect);
            gfx.DrawString("Supplier ID", font, XBrushes.Black, tableHeaderRect.Left + 10, tableHeaderRect.Top + 3);
            gfx.DrawString("Supplier Name", font, XBrushes.Black, tableHeaderRect.Left + 100, tableHeaderRect.Top + 3);
            gfx.DrawString("Email", font, XBrushes.Black, tableHeaderRect.Left + 250, tableHeaderRect.Top + 3);
            gfx.DrawString("Contact No", font, XBrushes.Black, tableHeaderRect.Left + 350, tableHeaderRect.Top + 3);
            gfx.DrawString("Address", font, XBrushes.Black, tableHeaderRect.Left + 450, tableHeaderRect.Top + 3);
        }









    }
}









