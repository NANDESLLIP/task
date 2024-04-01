const TaskRepositoryInMemory = require("../repositories/taskRepository/TaskRepositoryInMemory")
const TaskCreateService = require("../services/TaskServices/TaskCreateService")
const TaskListService = require("../services/TaskServices/TaskListService")
const UserRepositoryInMemory = require("../repositories/userRepository/UserRepositoryInMemory")
const UserCreateService = require("../services/UserServices/UserCreateService")


describe("taskCreateService", () =>{
    let taskRepository = null
    let taskServiceCreate = null
    let taskServiceList = null
    let userRepository = null
    let userCreateService = null

    it("task list", async () =>{

        userRepository = new UserRepositoryInMemory()
        userCreateService = new UserCreateService(userRepository)
        taskRepository = new TaskRepositoryInMemory()
        taskServiceCreate = new TaskCreateService(taskRepository)
        taskServiceList = new TaskListService(taskRepository)

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
        const task2 = {
            name: "task2 test",
            description: "task2 aqui",
            user_id: userCreate.user_id
        }
        const task3 = {
            name: "task3 test",
            description: "task2 aqui",
            user_id: 123
        }
        await taskServiceCreate.execute(task, userCreate.user_id)
        await taskServiceCreate.execute(task2, userCreate.user_id)
        await taskServiceCreate.execute(task3, userCreate.user_id)

        const listTasks = await taskServiceList.execute(userCreate.user_id)

        console.log(listTasks);

        expect(listTasks).toEqual(expect.arrayContaining(listTasks))
    })
})