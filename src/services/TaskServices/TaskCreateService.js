
class TaskCreateService{
    constructor(taskRepository) {
        this.taskRepository = taskRepository
    }

    async execute({name, description, user_id}){
        const taskCreated = await this.taskRepository.createTask({name, description, user_id})
        return taskCreated;
    }
}

module.exports = TaskCreateService