const UserRepositoryInMemory = require("../userRepository/UserRepositoryInMemory")

class TaskRepositoryInMemory{
    userRepository = new UserRepositoryInMemory()
    users = []
    tasks = []
    async createTask({name, description, user_id}){
        const user = this.userRepository.listUserId({user_id})
        
        const task = {
            task_id : Math.floor(Math.random() * 1000) + 1,
            name,
            description,
            user:user_id
        }
        this.users.push(user)
        this.tasks.push(task)
        return task
    }

    async list(){
     return this.tasks
       
    }

    async listById({task_id}){
        const task = this.tasks.find(task => task.task_id === task_id)
        return task
    }

    async update({task_id, name, description}, user_id){
        const user = this.userRepository.listUserId({user_id})
        if(user){
            const task = this.listById({task_id})

            task.name = name ?? name
            task.description = description ?? task.description

            return task
        }
        return "ERRO"
    }

    async deleteTask({task_id}){
        const index = this.tasks.findIndex(task => task.task_id === task_id)

        return this.tasks.slice(index, 1)
    }
}

module.exports = TaskRepositoryInMemory