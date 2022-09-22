const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401);
        //console.log(req.roles);
        const rolesArray = [...allowedRoles];
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        //For single role
        // if(rolesArray.includes(req.roles)){
        //     result= true;
        // }
        //console.log(result);
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles