exports.saveUser = function(user){
    localStorage.setItem("uid",user._id);
    localStorage.setItem("name",user.name);
    localStorage.setItem("beizhu",user.beizhu);
    localStorage.setItem("logined",true);
}

exports.saveHeadimg = function(imgurl){
    localStorage.setItem("headimg",imgurl);
}

exports.exit = function(){
    localStorage.removeItem("logined");
    localStorage.removeItem("uid");
}