const UserRepositoryInMemory = require("../repositories/userRepository/UserRepositoryInMemory")
const UserCreateService = require("../services/UserServices/UserCreateService")
const UserUpdateService = require("../services/UserServices/UserUpdateService")


describe("userUpdateService", () => {
    let userRepository = null
    let userCreateService = null
    let userUpdateService = null


    userRepository = new UserRepositoryInMemory()
    userCreateService = new UserCreateService(userRepository)
    userUpdateService = new UserUpdateService(userRepository)
    it("user should be possible to update an user", async () =>{
        const user = {
            name: "user test",
            email: "user@test.com",
            password: "123"
        }
        
        const userCreated = await userCreateService.execute(user)
        

        

        userCreated.name = "User update"
        userCreated.email = "update@mail.com"

        const updateUser = await userUpdateService.execute(userCreated)

        expect(updateUser).toHaveProperty("email", updateUser.email)

    })
})