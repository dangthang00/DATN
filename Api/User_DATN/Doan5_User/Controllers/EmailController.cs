//using Microsoft.AspNetCore.Mvc;
//using System.Threading.Tasks;
//using System;
//using User_DATN.Mail;
//using User_DATN.Models;


//namespace User_DATN.Controllers
//{
//    [Route("api/email")]
//    public class EmailController
//    {
//        private readonly ISendMailService _sendMailService;
//        public EmailController(ISendMailService sendMailService)
//        {
//            _sendMailService = sendMailService;
//        }
//        //API Gửi Email
//        [Route("sendemail")]
//        [HttpPost]
//        public async Task<IActionResult> SendEmail(MailContent model)
//        {
//            try
//            {
//                MailContent content = new MailContent
//                {
//                    To = model.To,
//                    Subject = model.Subject,
//                    Body = "<p><strong>" + model.Body + "</strong></p>"
//                };

//                await _sendMailService.SendMail(content);

//                return Ok("Gửi thành công!");
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, $"Failed to send email. Error: {ex.Message}");
//            }
//        }
//    }
//}
