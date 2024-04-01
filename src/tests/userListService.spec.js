const UserRepositoryInMemory = require("../repositories/userRepository/UserRepositoryInMemory")
const UserCreateService = require("../services/UserServices/UserCreateService")
const UserListService = require('../services/UserServices/UserListService')


describe("userCreateService", () => {
    let userRepository = null
    let userCreateService = null
    let userListService = null

    it("user list", async () =>{
        const user2 = {
            name: "user test2",
            email: "user@test.com",
            password: "123"
        }
        const user = {
            name: "user test",
            email: "user@test.com",
            password: "123"
        }
        
        const user3 = {
            name: "user test",
            email: "user@test.com",
            password: "123"
        }

        userRepository = new UserRepositoryInMemory()
        userCreateService = new UserCreateService(userRepository)
        userListService = new UserListService(userRepository)
        
        await userCreateService.execute(user)
        await userCreateService.execute(user2)
        await userCreateService.execute(user3)

        const listUser = await userListService.execute()

        //console.log(listUser);

        expect(listUser).toEqual(expect.arrayContaining(listUser))
    })
})
