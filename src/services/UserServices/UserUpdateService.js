class UserUpdateService{
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async execute({user_id, name, email}){
      const update = await this.userRepository.updateUser({user_id, name, email})
      return update  
    }
}

module.exports = UserUpdateService