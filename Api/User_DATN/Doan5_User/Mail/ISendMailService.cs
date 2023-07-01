using System.Threading.Tasks;
using User_DATN.Models;

namespace User_DATN.Mail
{
    public interface ISendMailService
    {
        Task SendMail(MailContent mailContent);

        Task SendEmailAsync(string email, string subject, string htmlMessage);
    }
}
