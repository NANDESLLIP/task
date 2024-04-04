
class UserRepositoryInMemory{

    users = []

    async createUser({name, email, password}){
        const user = {
            user_id: Math.floor(Math.random() * 1000) + 1,
            name,
            email,
            password
        }
        this.users.push(user)
        return user
    }

    async list(){
        return this.users
    }

    async listUserId({user_id}){
        const user = this.users.find(user => user.user_id === user_id)
        return user
    }

    async updateUser({user_id, name, email}){
        const user = this.listUserId({user_id})

        user.name = name ?? user.name
        user.email = email ?? user.email
        
        return user
    }

    async updateStatusUser({user_id}){

        const updateStatus =  await knex("users").where({id: user_id}).update({isAdmin: true})
        return updateStatus
    }

    async deleteUser({user_id}){
        const index = this.users.findIndex(user => user.user_id === user_id)
        return this.users.splice(index)
    }

}

module.exports = UserRepositoryInMemory