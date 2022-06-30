export const controllers = {
  members: {
    root: '/members',
    photo: (username: String) => `${controllers.members.root}/${username}/photo`
  }
}
