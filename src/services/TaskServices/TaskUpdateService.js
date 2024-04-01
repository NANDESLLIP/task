class TaskUpdateService{
    constructor(taskRepository) {
        this.taskRepository = taskRepository
    }

    async execute({task_id, name, description, user_id}){
      const update = await this.taskRepository.update({task_id, name, description, user_id})
      return update  
    }
}

module.exports = TaskUpdateService