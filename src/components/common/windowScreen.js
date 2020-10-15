
function winScreen(){
    // 获取屏幕分辨率
	var rows;
    var width=window.screen.width;
    var height=window.screen.height;
    width <= 1440? rows=7:rows=10
	return rows
}
export default {winScreen}

