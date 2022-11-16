const User = require('../model/User');
const jwt = require('jsonwebtoken');


const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({refreshToken}).exec();
  if (!foundUser) return res.sendStatus(403); //Forbidden
  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
    const roles = Object.values(foundUser.roles);
      //try to find userID
      const userID = foundUser._id
   
    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username": decoded.username,
                "roles": roles,
                //  //try to find userID
                 "userID": userID
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '10s' }
    );
    res.json({ roles, accessToken, userID });
  });
};

module.exports = { handleRefreshToken };
