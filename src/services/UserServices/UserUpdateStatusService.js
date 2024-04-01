class UserUpdateStatusService{
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async execute({user_id}){
      const update = await this.userRepository.updateStatusUser({user_id})
      return update  
    }
}

module.exports = UserUpdateStatusService