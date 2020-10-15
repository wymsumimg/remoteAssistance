function permissionButton(nowPath,btns){
    // 获取按钮权限
    var permissionBtn=JSON.parse(localStorage.getItem("permissionBtn"))
    var item=[];
    //多个按钮 [add,edit,...]
    for(let p=0; p<btns.length; p++){
       
        var _btn = btns[p];

        for(let i=0;i<permissionBtn.length;i++){
            if(nowPath==permissionBtn[i].MenuUrl){
                let perChild=permissionBtn[i]
                for(let j=0;j<perChild.child.length;j++){
                    if(perChild.child[j].Code== _btn ){
                        
                        var _ischeck=perChild.child[j].isCheck;
                      
                         var _item={
                             btn:_btn,
                             isCheck:_ischeck
                         }


                        item.push(_item);
                    }
                }
                
            }
        }
    }

    return item;

}

export default {permissionButton}

// var _exp = getPermission("list",["add","edit"]);

