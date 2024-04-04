class TaskListService{
    constructor(taskRepository) {
        this.taskRepository = taskRepository
    }

    async execute(){
      const tasks = await this.taskRepository.list()
      return tasks  
    }
}

module.exports = TaskListService