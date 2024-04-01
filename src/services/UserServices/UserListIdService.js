class UserListIdService{
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async execute({user_id}){
      const user = await this.userRepository.listUserId({user_id})
      return user  
    }
}

module.exports = UserListIdService