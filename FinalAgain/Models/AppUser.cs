using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalAgain.Models
{
    public class AppUser:IdentityUser
    {
        public string ConnectionId { get; set; }

    }
}
