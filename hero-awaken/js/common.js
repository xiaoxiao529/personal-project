var urlroot = "http://hd.7fgame.com:4014/";
var UserST = { srv_id: 0, st: "" }
//获取魂玉图片 第几条属性,属性值，type（大小图片1，2）
function GetHunYuImgSrc2(hunyuIndex, index, type) {
    if (hunyuIndex == 5)
        return "images/head" + index + ".png";
    else
        return "hunyuimg2/hunyu_" + hunyuIndex + "_" + index + "_" + type + ".png";
}

function GetData(type) {
    var result;
    var cmd;
    switch (type) {
        case 'reqherolist':
            cmd = 'QXexAttrTab';
            break;
        case 'reqitem':
            cmd = 'MySkinBag';
            break;
        case 'reqmyheroscorelist':
            cmd = 'MyHeroList';
            break;
    }
    $.ajaxSettings.async = false;
    $.getJSON("../Json/" + cmd + ".json", "", function (data) {
        result = data;
    });
    return result;
}
//根据forceid获取势力名
function getForceName(forceId) {
    return '<img src="../hero/img/pz-c' + forceId + '.png?v=1" class="s3 fl">';
}
//根据heroType数组 获取英雄类型 --类型说明: 1.射手，2.刺客，3.法师，4.战士，5.医生
function getHeroTypeName(heroids) {
    var img = '';
    if (heroids) {
        $.each(heroids, function (i, item) {
            img += '<img src="../hero/img/pz-zy' + item + '.png?v=1" class="s2 fl">';
        })
    }
    return img;
}
var pic_url = "https://pic2.7fgame.com/myheros";
//获取皮肤图片路径 pf_heroid_itemtypeid.png
function GetPic_pifu(heroid, itemtypeid) {
    return pic_url + "/pf_" + heroid + "_" + itemtypeid + ".png";
}
function GetPic_pifu2(heroid, itemtypeid, index) {
    if (index > 0)
        return pic_url + "/pf_" + heroid + "_" + itemtypeid + ".png";
    else
        return pic_url + "/yx_" + heroid + "_2.png";
}
//获取将星图片路径 jx_heroid_index.png
function GetPic_jiangxing(heroid, index) {
    return pic_url + "/jx_" + heroid + "_" + index + ".png";
}
//获取技能图片路径 jn_heroid_index.png
function GetPic_jineng(heroid, index) {
    return pic_url + "/jn_" + heroid + "_" + index + ".png";
}
//获取灵技能图片路径 ljn_heroid_index.png
function GetPic_lingjineng(heroid, index) {
    return pic_url + "/ljn_" + heroid + "_" + index + ".png";
}

//获取英雄头像图片路径 index： 1小 2中 3大  yx_heroid_index.png
function GetPic_yingxiong(heroid, index) {
    return pic_url + "/yx_" + heroid + "_" + index + ".png";
}

function GetLvs(array) {
    if (array == undefined || array == []) { return 0;}        
    var num = 0;  
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array[i].length; j++) {
            num += array[i][j].Level
        }
    }    
    return num;    
}
//计算完成度
function CaluPro(heroinfo, myskinlist, jiangxings, juexings) {
    var pro = 0;
    var starpro = 0;
    var awarkxpro = 60;
    var skincount = 0;
    if (heroinfo.pifu.pfCount != 0) {
        for (i = 0; i < heroinfo.pifu.pfCount; i++) {
            if ($.inArray(heroinfo.pifu.pfList[i].platId, myskinlist) != -1)
                skincount++;
        }
    }
    if (skincount == 0)
        awarkxpro += 20;
    else {
        if (skincount >= heroinfo.pifu.pfCount)
            pro += 20.0;
        else
            pro += 20.0 * (skincount / heroinfo.pifu.pfCount);     
    }
    //将星
    if (heroinfo.jiangxing.jxCount > 0) {
        var stars = GetLvs(jiangxings);
        if (stars >= (heroinfo.jiangxing.jxCount * 3)) {
            pro += 20.0;
        } else {
        if (heroinfo.jiangxing.jxCount != 0 && stars > 0) {
            pro += 20.0 * (stars / (heroinfo.jiangxing.jxCount * 3));
        } else
            awarkxpro += 20;
        }
    } else
        awarkxpro += 20;
    var jxs = GetLvs(juexings);
    if (jxs >= 170)
        jxs == 170;
    pro = pro + awarkxpro * (jxs / 170);
    if (pro > 100) pro = 100;   
    return pro.toFixed(2);
}
//获取json对象指定数据 GetJsonItem(json,"id","2").age
function GetJsonItem(arr, n, v) {
    if (arr) {
        for (var i = 0; i < arr.length; i++)
            if (arr[i][n] == v)
                return arr[i];
    } else return null;
}
//获取参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

window.myStorage = (new (function () {
    var storage;    //声明一个变量，用于确定使用哪个本地存储函数
    if (window.localStorage) {
        storage = localStorage;     //当localStorage存在，使用H5方式
    }
    else {
        storage = cookieStorage;    //当localStorage不存在，使用兼容方式
    }
    this.setItem = function (key, value) {
        storage.setItem(key, value);
    };
    this.getItem = function (name) {
        return storage.getItem(name);
    };
    this.removeItem = function (key) {
        storage.removeItem(key);
    };
    this.clear = function () {
        storage.clear();
    };
})());
