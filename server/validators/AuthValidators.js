

exports.isSuperAdmin = (req) => {
  if(req.user.role === 'superAdmin'){
    return true
  }
  return false
}

//access to user management and classroom creation 
exports.isCampusAdmin = (req) => {
  if(req.user.role === 'admin'){
    return true
  }
  return false
}

//Access to Courses CRUD && Classroom scheduling 
exports.isDepartmentAdmin = (req) => {
  if(req.user.role === 'departmentAdmin'){
    return true
  }
  return false
}