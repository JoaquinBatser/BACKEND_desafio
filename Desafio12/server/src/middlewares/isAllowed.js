export default isAllowed = (permissions) => (req,res,next) => {
  if(permissions,includes("guest")) {
    return res.status(401).json({success:false, message:"Unathorized", redirectUrl: "/home"})
  }

 if(permissions.includes("user")){
    return res.status(401).json({success:false, message:"Unathorized", redirectUrl: "/error"})
  }
  
  if(permissions.includes("premium") || permissions.includes("admin")) {
    return res.status(403).json({success:false, message:"Forbidden", redirectUrl: "/error"})
  }
  next()  
}

