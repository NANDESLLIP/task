const UserRepositoryInMemory = require("../repositories/userRepository/UserRepositoryInMemory")
const UserCreateService = require("../services/UserServices/UserCreateService")
const UserDeleteService = require("../services/UserServices/UserDeleteService")
const UserListService = require("../services/UserServices/UserListService")

describe("UserDeleteService", () => {
    let userRepository = null
    let userCreateService = null
    let userDeleteService = null
    let userListService = null

    it("user should be possible to update an user", async () =>{
        userRepository = new UserRepositoryInMemory()
        userCreateService = new UserCreateService(userRepository)
        userListService = new UserListService(userRepository)

        const user = {
            name: "user test",
            email: "user@test.com",
            password: "123"
        }

        const user2 = {
            name: "user test",
            email: "user@test.com",
            password: "123",
            user_id: 123
        }
        await userCreateService.execute(user)
        const userCreate = await userCreateService.execute(user2)

        const listUser = await userListService.execute()

        console.log(listUser);

        userDeleteService = new UserDeleteService(userRepository)
        const userDelete = await userDeleteService.execute(userCreate.user_id)

        const listUser2 = await userListService.execute()

        expect(userDelete).not.toBeUndefined();


        console.log(listUser2);
    })
})