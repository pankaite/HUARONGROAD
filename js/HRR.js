function draw(param){
	bx = param - 1;
	by = param - 1;
	p = param;
	clickCount = 0;
	$("span").html("移动次数：0");
	var arr = new Array();	
	for(var i = 0; i < p*p-1; i++){
		arr[i] = i + 1;
	}
	for(var i = 0; i < 16; i++){
		arr.sort(shuffle);
	}
	var hasAnswer = countInversions(arr) % 2 == 0;
	while(!hasAnswer){
		arr.sort(shuffle);					
		hasAnswer = countInversions(arr) % 2 == 0;
	}
	arr[param * param - 1] = " ";
	$("#canvas").empty();
	for(var i = 0; i < p; i++){
		for(var j = 0; j < p; j++){
			var content = '<div class="btn btn-info grid"' + 'onclick="move('+i+','+j+');">' + arr[p*i+j] + '</div>';
			$("#canvas").append(content);
		}
		$("#canvas").append('</br>');
	}
}
		
function shuffle() {
	return Math.random()>.5 ? -1 : 1;
}

function countInversions(arr){
	var count = 0;
	for(var i = 0; i < arr.length; i++){
		for(var j = i+1; j < arr.length; j++){
			if(arr[i] > arr[j]){
				count++;
			}
		}
	}
	return count;
}

function move(x,y) {
	var gameOver = false;
	ax=Math.abs(bx-x);
	ay=Math.abs(by-y);
	if (((ax*ay) == 0)&&((ax+ay) == 1)) {
		var valueIndex = p*x+y;
		var spaceIndex = p*bx+by;
		var temp = $("div#canvas div:eq("+valueIndex+")").html();
		$("div#canvas div:eq("+spaceIndex+")").html(temp);
		$("div#canvas div:eq("+valueIndex+")").html(" ");
		bx=x; 
		by=y; 
		$("span").html("移动次数："+(++clickCount));
	}	
	gameOver = checkGameOver();
	if(gameOver){
		swal({
			title: "Good job!",
			text: "恭喜您，成功通过！",
			showCancelButton: true,
			imageUrl: "./imgs/thumbup.jpg",
			confirmButtonText: "再玩一次",
			cancelButtonText: "返回",
			reverseButtons: true,
			imageWidth: "100px",
			imageHeight: "100px",
			width: "350px",
		}).then((result) => {
			if (result.value) {
				$("span").html("移动次数：0");
				clickCount = 0;
				draw(p);			
			} 
			else {
				// result.dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
			}
		});					
	}
}

function checkGameOver(){
	var flag = true;
	for(var i = 0; i < p*p-1; i++){
		var value = $("div#canvas div:eq("+i+")").html();
		if(value != i+1){
			flag = false;
			break;
		}
	}
	return flag;
}

draw(4);
$("#restart").append('</br><button type="button" class="btn btn-info" onclick = draw(p)>重新开始</button>');