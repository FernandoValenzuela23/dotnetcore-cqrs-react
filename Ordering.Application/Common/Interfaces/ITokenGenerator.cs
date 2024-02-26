namespace Ordering.Application.Common.Interfaces
{
    public interface ITokenGenerator
    {
        //public string GenerateJWTToken((string userId, string userName, IList<string> roles) userDetails);
        public string GenerateJWTToken(string userId, string userName, IList<string> roles);
    }
}