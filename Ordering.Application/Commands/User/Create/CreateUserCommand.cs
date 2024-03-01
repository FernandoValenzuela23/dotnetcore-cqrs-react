using MediatR;
using Ordering.Application.Common.Interfaces;

namespace Ordering.Application.Commands.User.Create
{
    public class CreateUserCommand : IRequest<int>
    {
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmationPassword { get; set; }
        public List<string> Roles { get; set; }
    }

    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, int>
    {
        private readonly IIdentityService _identityService;
        public CreateUserCommandHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }
        public async Task<int> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            try
            {
                int count =  (from p in await  _identityService.GetAllUsersAsync() 
                                   select p.id).Count();

                // Sending a Role to the service 
                if(count == 0)
                {
                    if(request.Roles.Count == 0)
                    {
                        request.Roles.Add("Admin");
                    }
                    else
                    {
                        request.Roles.Add("User");
                    }
                    
                }
                else
                {
                    if (request.Roles.Count == 0)
                    {
                        request.Roles.Add("User");
                    }
                }


                var result = await _identityService.CreateUserAsync(request.UserName, request.Password, request.Email, request.FullName, request.Roles);
                return result.isSucceed ? 1 : 0;
            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}