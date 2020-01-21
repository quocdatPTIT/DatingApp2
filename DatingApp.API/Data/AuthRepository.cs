using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        
        /// <summary>
        /// constructor injection DataContext
        /// </summary>
        /// <param name="context">link to database</param>
        public AuthRepository(DataContext context)
        {
            _context = context;
        }
        
        /// <summary>
        /// register new user
        /// </summary>
        /// <param name="user">object new user</param>
        /// <param name="password">password's user register</param>
        /// <returns>user register</returns>
        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);
            
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            
            return user;
        }
        
        /// <summary>
        /// password type text convert password type hash 
        /// </summary>
        /// <param name="password">password user input</param>
        /// <param name="passwordHash">password hash convert from password</param>
        /// <param name="passwordSalt">password salt convert from password</param>
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
        
        /// <summary>
        /// login from user
        /// </summary>
        /// <param name="username">name's user input</param>
        /// <param name="password">password's user input</param>
        /// <returns>user has registered in db</returns>
        public async Task<User> Login(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Username == username);

            if (user == null)
            {
                return null;
            }

            return !VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt) ? null : user;
        }
        
        /// <summary>
        /// check password hash when user login
        /// </summary>
        /// <param name="password">password checked</param>
        /// <param name="userPasswordHash">password hash 's user in database</param>
        /// <param name="userPasswordSalt">password salt 's user in database</param>
        /// <returns>true if same password</returns>
        private bool VerifyPasswordHash(string password, byte[] userPasswordHash, byte[] userPasswordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(userPasswordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (var i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != userPasswordHash[i])
                    {
                        return false;
                    }
                }
            }

            return true;
        }
        
        /// <summary>
        /// check user exists in database
        /// </summary>
        /// <param name="username">user name checked</param>
        /// <returns>true if user exists</returns>
        public async Task<bool> UserExists(string username)
        {
            if (await _context.Users.AnyAsync(x => x.Username == username))
            {
                return true;
            }

            return false;
        }
    }
}