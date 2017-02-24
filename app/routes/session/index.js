var express = require('express');
var path = require('path');

var router =express.Router();



//获取sessino信息
router.get('/getsessioninfo' , getsessioninfo);



//获取sessino信息
function getsessioninfo(req,res) {
    var result = {}, datas={};

    datas.info = req.session.userdatas.info;
    datas.selectprj = req.session.userdatas.selectprj;
    datas.prjs =  req.session.userdatas.prjs;

    return res.send({code:201 , datas : datas  });

}

module.exports = router;


