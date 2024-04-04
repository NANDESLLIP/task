class TaskDeleteService{
    constructor(taskRepository) {
        this.taskRepository = taskRepository
    }

    async execute({task_id}){
      const deleteTask = await this.taskRepository.deleteTask({task_id})
      return deleteTask   
    }
}

module.exports = TaskDeleteService