const knex = require("../database/knex")
class TaskController{
  
    async createTask(req, res) {
        const {user_id} = req.params
        const{title, description} = req.body
        const task = {
            title, 
            description, 
            isComplete: false,
            user_id
        }

        await knex("task").insert({title: task.title, description: task.description, isComplete: task.isComplete, user_id: task.user_id })
       
        return res.status(201).json("tarefa criada com sucesso.")
    }

    async listTasks(req, res) {
        const tasks = await knex("task")
        
        res.status(200).json(tasks)
    }

    async listTaskById(req, res){
        const {id} = req.params
        const task = await knex("task").where({id})
        
        res.status(200).json(task)
    }

    async updateTask(req, res) {
        const {id} = req.params
        const {title, description} = req.body
        await knex("task").where({id}).update({title, description})
        return res.status(200).json("Registro atualizado com sucesso!")
    }
    async updateTaskStatus(req, res){
        const {id} = req.params

        await knex("task").where({id}).update({isComplete:true})
        
        return res.status(200).json("Status alterado com sucesso!")
    }

    async deleteTask(req, res) {
    const {id} = req.params
    await knex("task").where({id}).delete()
    return res.status(200).json("Registro deletado com sucesso!")
    }
}

module.exports = TaskController