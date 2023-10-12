using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using R53_GroupB_GadgetPoint.DAL.Interface;
using R53_GroupB_GadgetPoint.DTOs;
using R53_GroupB_GadgetPoint.Models;
using System.Security.Claims;

using PdfSharpCore;
using PdfSharpCore.Pdf;
using TheArtOfDev.HtmlRenderer.PdfSharp;
using R53_GroupB_GadgetPoint.Context;
using Microsoft.EntityFrameworkCore.Infrastructure;
using R53_GroubB_GadgetPoint.Models;
using Microsoft.EntityFrameworkCore;
using Stripe;

namespace R53_GroupB_GadgetPoint.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderService;
        private readonly IMapper _mapper;
        private readonly StoreContext _context;

        public OrderController(IOrderRepository orderservice, IMapper mapper,StoreContext context)
        {
            this._orderService = orderservice;
            this._mapper = mapper;
            this._context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x=>x.Type==ClaimTypes.Email)?.Value;

            var address = _mapper.Map<AddressDTO, ShippingAddress>(orderDto.ShipToAddress);

            var order = await _orderService.CreateOrderAsync(email, orderDto.DeliveryMethodId, orderDto.BasketId, address);
            if (order==null)
            {
                return BadRequest();
            }
            return Ok(order);
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrderDto>>> GetOrderForUser()
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            var order = await _orderService.GetOrdersForUserAsync(email);

            return Ok(_mapper.Map<IReadOnlyList<Order>, IReadOnlyList<OrderToReturnDto>>(order));

        }

        [HttpGet("confirmed/{id}")]
        public async Task<ActionResult<OrderToReturnDto>> GetOrderByIdForUser(int id)
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            var order = await _orderService.GetOrderByIdAsync(id, email);

            if (order == null)
            {
                return NotFound();
            }
            return _mapper.Map<Order, OrderToReturnDto>(order);
        }

        [HttpGet("{delivery-Methods}")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
        {
            return Ok(await _orderService.GetDelivaryMethodAsync());
        }



        //====================================





        //[HttpGet("generatepdf")]
        //public async Task<IActionResult> GeneratePDF()
        //{
        //    var document = new PdfDocument();
        //    //  string imgeurl = "data:image/png;base64, " + Getbase64string() + "";

        //    string[] copies = { "Customer copy", "Comapny Copy" };
        //    for (int i = 0; i < copies.Length; i++)
        //    {
        //        Invoice header = await _context.Invoices.FindAsync();
        //        List<Order> detail = await _context.FindAsync(InvoiceName);
        //        // List<Order> details = await this._context.GetAllInvoicebyCode(InvoiceNo);
        //        // List<OrderItem> detailss = await this._context.GetAllInvoicebyCode(InvoiceNo);
        //        string htmlcontent = "<div style='width:100%; text-align:center'>";
        //        // htmlcontent += "<img style='width:80px;height:80%' src='" + imgeurl + "'   />";
        //        htmlcontent += "<h2>" + copies[i] + "</h2>";
        //        htmlcontent += "<h2>Welcome to Nihira Techiees</h2>";



        //        if (header != null)
        //        {
        //            htmlcontent += "<h2> Invoice No:" + header.InvoiceId + " & Invoice Date:" + header.InvoiceDate + "</h2>";
        //            htmlcontent += "<h3> Customer : " + header.TotalPrice + "</h3>";
        //            // htmlcontent += "<p>" + header.OrderId + "</p>";
        //            // htmlcontent += "<h3> Contact : 9898989898 & Email :ts@in.com </h3>";
        //            htmlcontent += "<div>";
        //        }



        //        htmlcontent += "<table style ='width:100%; border: 1px solid #000'>";
        //        htmlcontent += "<thead style='font-weight:bold'>";
        //        htmlcontent += "<tr>";
        //        htmlcontent += "<td style='border:1px solid #000'> Product Code </td>";
        //        htmlcontent += "<td style='border:1px solid #000'> Description </td>";
        //        htmlcontent += "<td style='border:1px solid #000'>Qty</td>";
        //        htmlcontent += "<td style='border:1px solid #000'>Price</td >";
        //        htmlcontent += "<td style='border:1px solid #000'>Total</td>";
        //        htmlcontent += "</tr>";
        //        htmlcontent += "</thead >";

        //        htmlcontent += "<tbody>";
        //        if (detail != null && detail.Count > 0)
        //        {
        //            detail.ForEach(item =>
        //            {
        //                htmlcontent += "<tr>";
        //                htmlcontent += "<td>" + item.OrderId + "</td>";
        //                htmlcontent += "<td>" + item.OrderDate + "</td>";
        //                htmlcontent += "<td>" + item.CustomerEmail + "</td >";

        //                htmlcontent += "<td> " + item.Subtotal + "</td >";
        //                htmlcontent += "</tr>";
        //            });
        //        }
        //        htmlcontent += "</tbody>";

        //        htmlcontent += "</table>";
        //        htmlcontent += "</div>";

        //        htmlcontent += "<div style='text-align:right'>";
        //        htmlcontent += "<h1> Summary Info </h1>";
        //        htmlcontent += "<table style='border:1px solid #000;float:right' >";
        //        htmlcontent += "<tr>";
        //        htmlcontent += "<td style='border:1px solid #000'> Summary Total </td>";
        //        htmlcontent += "<td style='border:1px solid #000'> Summary Tax </td>";
        //        htmlcontent += "<td style='border:1px solid #000'> Summary NetTotal </td>";
        //        htmlcontent += "</tr>";
        //        if (header != null)
        //        {
        //            htmlcontent += "<tr>";
        //            htmlcontent += "<td style='border: 1px solid #000'> " + header.TotalPrice + " </td>";
        //            // htmlcontent += "<td style='border: 1px solid #000'>" + header.t + "</td>";
        //            //   htmlcontent += "<td style='border: 1px solid #000'> " + header.NetTotal + "</td>";
        //            htmlcontent += "</tr>";
        //        }
        //        htmlcontent += "</table>";
        //        htmlcontent += "</div>";

        //        htmlcontent += "</div>";

        //        PdfGenerator.AddPdfPages(document, htmlcontent, PageSize.A4);
        //    }
        //    byte[]? response = null;
        //    using (MemoryStream ms = new MemoryStream())
        //    {
        //        document.Save(ms);
        //        response = ms.ToArray();
        //    }
        //    string Filename = "Invoice_" + InvoiceNo + ".pdf";
        //    return File(response, "application/pdf", Filename);
        //}





    }
}
