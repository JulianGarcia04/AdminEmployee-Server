const validatePath = (path:string, pathValidator:string):boolean=>{
    return path.includes(pathValidator)
}

export default validatePath;