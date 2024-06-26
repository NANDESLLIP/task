const TaskRepositoryInMemory = require("../repositories/taskRepository/TaskRepositoryInMemory")
const TaskCreateService = require("../services/TaskServices/TaskCreateService")
const UserRepositoryInMemory = require("../repositories/userRepository/UserRepositoryInMemory")
const UserCreateService = require("../services/UserServices/UserCreateService")


describe("taskCreateService", () =>{
    let taskRepository = null
    let taskService = null
    let userRepository = null
    let userCreateService = null

    it("task should be created", async () =>{

        userRepository = new UserRepositoryInMemory()
        userCreateService = new UserCreateService(userRepository)
        taskRepository = new TaskRepositoryInMemory()
        taskCreateService = new TaskCreateService(taskRepository)
        
        const user = {
            name: "user test",
            email: "user@test.com",
            password: "123"
        }

        const userCreate = await userCreateService.execute(user)

        const task = {
            name: "task test",
            description: "task aqui",
            user_id: userCreate.user_id    
        }

        
        const taskCreate = await taskCreateService.execute(task, userCreate.user_id)

        expect(taskCreate).toHaveProperty("user", userCreate.user_id)
    })
})