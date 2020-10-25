
let constants = require('../constants')

exports.isSuperAdmin = (req) => {
  if(req.user.role === constants.superAdmin){
    return true
  }
  return false
}

//access to user management and classroom creation 
exports.isCampusAdmin = (req) => {
  if(req.user.role === constants.campusAdmin){
    return true
  }
  return false
}

//Access to Courses CRUD && Classroom scheduling 
exports.isDepartmentAdmin = (req) => {
  if(req.user.role === constants.depAdmin){
    return true
  }
  return false
}

exports.isStudent = (req) => {
  if(req.user.role === constants.student){
    return true
  }
  return false
}


exports.isProfessor = (req) => {
  if(req.user.role === constants.professor){
    return true
  }
  return false
}