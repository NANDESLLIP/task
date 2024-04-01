class UserDeleteService{
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async execute({user_id}){
      return await this.userRepository.deleteUser({user_id})  
    }
}

module.exports = UserDeleteService