const TaskRepositoryInMemory = require("../repositories/taskRepository/TaskRepositoryInMemory")
const TaskCreateService = require("../services/TaskServices/TaskCreateService")
const TaskUpdateService = require("../services/TaskServices/TaskUpdateService")
const UserRepository = require("../repositories/userRepository/UserRepositoryInMemory")
const UserCreateService = require("../services/UserServices/UserCreateService")


describe("taskCreateService", () =>{
    let taskRepository = null
    let taskService = null
    let taskUpdateService = null

    
    it("user should be possible to update an user", async () =>{
        const userRepository = new UserRepository()
        const userCreateService = new UserCreateService(userRepository)
        taskRepository = new TaskRepositoryInMemory()
        taskService = new TaskCreateService(taskRepository)
        taskUpdateService = new TaskUpdateService(taskRepository) 

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
        const taskCreate = await taskService.execute(task)

        //console.log(taskCreate);

        taskCreate.name = "Update"
        taskCreate.description = "Update description"

        const updateTask = await taskUpdateService.execute(taskCreate, userCreate.user_id)
        console.log(updateTask);

        expect(updateTask).toHaveProperty("name", updateTask.name)
    })
})