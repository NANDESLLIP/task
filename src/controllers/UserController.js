const knex = require("../database/knex")
const UserRepository = require("../repositories/userRepository/UserRepository")
const UserCreateService = require("../services/UserServices/UserCreateService")
const UserListIdService = require("../services/UserServices/UserListIdService")
const UserListService = require("../services/UserServices/UserListService")
const UserUpdateService = require("../services/UserServices/UserUpdateService")
const UserUpdateStatusService = require("../services/UserServices/UserUpdateStatusService")
const UserDeleteService = require("../services/UserServices/UserDeleteService")


const repository = new UserRepository()
const userCreateService = new UserCreateService(repository)
const userListService = new UserListService(repository)
const userListIdService = new UserListIdService(repository)
const userUpdateService = new UserUpdateService(repository)
const userUpdateStatusService = new UserUpdateStatusService(repository)
const userDeleteService = new UserDeleteService(repository)
class UserController{
  
    async createUser(req, res) {
        const{name, email, password} = req.body
        /*foi para o repositório
        const isAdmin = false
        await knex("users").insert({ name, email, password, isAdmin })*/

        await userCreateService.execute({name, email, password})
       
        res.status(201).json("usuario cadastrado com sucesso!")
            
    }

    async listUsers(req, res) {
        //const users = await knex("users")
        const users = await userListService.execute()

        res.status(200).json(users)
    }

    async listUserById(req, res){
        const {user_id} = req.params
        //const [user] =  await knex("users").where({id: user_id})
        const user = await userListIdService.execute({user_id})
        
        res.status(200).json(user)
    }


    async updateUser(req, res) {
        const {user_id} = req.params
        const {name, email} = req.body

        //await knex("users").where({id: user_id}).update({name, email})
        await userUpdateService.execute({user_id, name, email})

        return res.status(200).json("usuario atualizado com sucesso!")
        
    }

    async updateUserStatus(req, res){
        const {user_id} = req.params
        //await knex("users").where({id: user_id}).update({isAdmin: true})
        await userUpdateStatusService.execute({user_id})
        
        return res.status(200).json("Status alterado com sucesso!")
    }

    async deleteUser(req, res) {
    const {user_id} = req.params
    //await knex("users").where({id: user_id}).delete()
    await userDeleteService.execute({user_id})

    return res.status(200).json("Registro deletado com sucesso!")
    }
}

module.exports = UserController