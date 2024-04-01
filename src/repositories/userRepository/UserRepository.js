const knex = require('../../database/knex')

class UserRepository{
    async createUser({name, email, password}){
        const isAdmin = false
        const userId = await knex("users").insert({name, email, password, isAdmin})

        return {id: userId}
    }

    async list(){
        const list = await knex("users")
        return list
    }

    async listUserId({user_id}){
        const [listId] =  await knex("users").where({id: user_id})
        return listId
    }

    async updateUser({user_id, name, email}){

        const user = await knex("users").where({id:user_id})

        user.name = name ?? user.name
        user.email = email ?? user.email

        const update = await knex("users").where({id: user_id}).update({name: user.name, email: user.email})
        return user
    }

    async updateStatusUser({user_id}){

        const updateStatus =  await knex("users").where({id: user_id}).update({isAdmin: true})
        return updateStatus
    }

    async deleteUser({user_id}){
        return await knex("users").where({id: user_id}).delete()
    }

}

module.exports = UserRepository