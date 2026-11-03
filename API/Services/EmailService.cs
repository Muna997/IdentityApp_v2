using API.DTOs;
using API.Services.IServices;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using MimeKit;
using System;
using System.Threading.Tasks;

namespace API.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task<bool> SendEmailAsync(EmailSendDto model)
        {
            try
            {
                var username = _config["Email:Username"];
                var password = _config["Email:Password"];
                var host = _config["Email:Host"] ?? "smtp-mail.outlook.com";
                var port = int.Parse(_config["Email:Port"] ?? "587");
                var useAuth = !string.IsNullOrEmpty(password);

                var message = new MimeMessage();
                message.From.Add(MailboxAddress.Parse(username));
                message.To.Add(MailboxAddress.Parse(model.To));
                message.Subject = model.Subject;
                message.Body = new TextPart("html") { Text = model.Body };

                using var client = new SmtpClient();
                var socketOptions = useAuth ? SecureSocketOptions.StartTls : SecureSocketOptions.None;
                await client.ConnectAsync(host, port, socketOptions);
                if (useAuth)
                {
                    await client.AuthenticateAsync(username, password);
                }
                await client.SendAsync(message);
                await client.DisconnectAsync(true);

                return true;
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}
