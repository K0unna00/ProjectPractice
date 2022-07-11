using FinalAgain.DAL;
using FinalAgain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace FinalAgain.Hubs
{
    public class UserHub:Hub
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly AppDBContext _context;

        public UserHub(UserManager<AppUser> userManager , AppDBContext context)
        {
            _userManager = userManager;
            _context = context;
        }
        public override Task OnConnectedAsync()
        {
            if (Context.User.Identity.IsAuthenticated)
            {
                AppUser user = _userManager.FindByNameAsync(Context.User.Identity.Name).Result;
                user.ConnectionId = Context.ConnectionId;
                var result = _userManager.UpdateAsync(user).Result;
                Clients.All.SendAsync("showCamera", user);
            }
            return base.OnConnectedAsync();
        }
        public override Task OnDisconnectedAsync(Exception exception)
        {
            if (Context.User.Identity.IsAuthenticated)
            {
                AppUser user = _userManager.FindByNameAsync(Context.User.Identity.Name).Result;
                user.ConnectionId = null;
                var result = _userManager.UpdateAsync(user).Result;
                Clients.All.SendAsync("closeCamera", user);
            }
            return base.OnDisconnectedAsync(exception);
        }
        public async Task SendMessage(string text)
        {
            var name = Context.User.Identity.Name;
            await Clients.All.SendAsync("ReceiveMessage", name, text);
            
        }
    }
}
