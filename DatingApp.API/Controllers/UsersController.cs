using System;
using System.Security.Claims;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DatingApp.API.helpers;

namespace DatingApp.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/[Controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="repo"></param>
        /// <param name="mapper"></param>
        public UsersController(IDatingRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        
        /// <summary>
        /// Get all users
        /// </summary>
        /// <returns>list user</returns>
        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery] UserParams userParams)
        {
            try
            {
                var currentUserId =  int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

                var userFromRepo = _repo.GetUser(currentUserId);

                userParams.UserId = currentUserId;

                if (string.IsNullOrEmpty(userParams.Gender)) {
                    userParams.Gender = userParams.Gender == "male" ? "female" : "male";
                }

                var users = await _repo.GetUsers(userParams);

                var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

                Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

                return Ok(usersToReturn);                
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        /// <summary>
        /// Get user follow id
        /// </summary>
        /// <param name="id">id user</param>
        /// <returns>user</returns>
        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            try
            {
                var user = await _repo.GetUser(id);

                var userToReturn = _mapper.Map<UserForDetailedDto>(user);

                return Ok(userToReturn);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Update user
        /// </summary>
        /// <param name="id">id user</param>
        /// <param name="userForUpdate">Information user need update</param>
        /// <returns>true/false</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdate)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var userFromRepo = await _repo.GetUser(id);

            _mapper.Map(userForUpdate, userFromRepo);

            if(await _repo.SaveAll()) 
            {
                return NoContent();
            }
            throw new Exception($"Updating user {id} failed on save");
        }
    }
}