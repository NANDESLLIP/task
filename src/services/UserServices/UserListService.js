class UserListService{
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async execute(){
      const users = await this.userRepository.list()
      return users  
    }
}

module.exports = UserListService