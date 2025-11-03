const authorize = (req, res, next) => {
    const {user} = req.query;
    if (user == 'juo'){
        req.user = {name:'juo',id:5}
    }else{
        res.status(401).send('Unauthorized')
    }
    console.log('authorize')
    next()
}

module.exports = authorize