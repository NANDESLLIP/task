const TaskRepositoryInMemory = require("../repositories/taskRepository/TaskRepositoryInMemory")
const TaskCreateService = require("../services/TaskServices/TaskCreateService")
const UserRepositoryInMemory = require("../repositories/userRepository/UserRepositoryInMemory")
const UserCreateService = require("../services/UserServices/UserCreateService")
const TaskDeleteService = require("../services/TaskServices/TaskDeleteService")
const TaskListService = require("../services/TaskServices/TaskListService")


describe("taskDeleteService", () =>{
    let taskRepository = null
    let taskCreateService = null
    let userRepository = null
    let userCreateService = null
    let taskDeleteService = null
    let taskListService = null

    beforeEach(()=>{
        userRepository = new UserRepositoryInMemory()
        userCreateService = new UserCreateService(userRepository)
        taskRepository = new TaskRepositoryInMemory()
        taskCreateService = new TaskCreateService(taskRepository)
        taskListService = new TaskListService(taskRepository)
        taskDeleteService = new TaskDeleteService(taskRepository)
        
    })

    it("task should be created", async () =>{

        
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

        console.log(taskCreate);

        const deleteTask = await taskDeleteService.execute(taskCreate)


        const list = await taskListService.execute()

        console.log(list);

        expect(list).not.toHaveProperty("name", "task test")
    })
})