using User_DATN.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;
using User_DATN.Mail;

namespace User_DATN.Controllers
{
    [Route("api/mail")]
    public class MailController : Controller
    {
        private DATNContext db = new DATNContext();
     

        private readonly ISendMailService _sendMailService;
        public MailController(ISendMailService sendMailService)
        {
            _sendMailService = sendMailService;
        }
        //API Gửi Email
        [Route("sendemail")]
        [HttpPost]
        public async Task<IActionResult> SendEmail(MailContent model)
        {
            try
            {
                MailContent content = new MailContent
                {
                    To = model.To,
                    Subject = model.Subject,
                    Body = "<p><strong>" + model.Body + "</strong></p>"
                };

                await _sendMailService.SendMail(content);

                return Ok("Gửi thành công!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Failed to send email. Error: {ex.Message}");
            }
        }

    }
}
