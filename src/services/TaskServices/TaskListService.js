class TaskListService{
    constructor(taskRepository) {
        this.taskRepository = taskRepository
    }

    async execute({user_id}){
      const tasks = await this.taskRepository.list({user_id})
      return tasks  
    }
}

module.exports = TaskListService