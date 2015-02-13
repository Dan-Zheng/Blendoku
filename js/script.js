$(document).ready(function(){
	var hex =  [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
	//var color = ['#69D2E7','#A7DBD8','#F38630','#FA6900','#fe4365','#fc9d9a','#f9cdad','#556270','#4ecdc4','#c7f464','#ff6b6b','#c44d58','#d1e751','#ffffff','#000000','#4dbce9','#26ade4','#d95b43','#c02942','#542437','#53777a','#cff09e','#a8dba8','#79bd9a','#3b8686','#0b486b','#00a0b0','#6a4a3c','#cc333f','#eb6841','#edc951'];
	
	var colorTriad = new Array(3); // creates array with three elements
	var origColor = "#274EBF";
	colorTriad = $.xcolor.triad(origColor);
	/*
	var colorA = "#556270";
	var colorB = "#FA6900";
	var colorC = "#3D911F";*/
	var color = [];
	var num = 1;

	for( var i=(100/num); i<=100; i+=(100/num) ){
		color.push(($.xcolor.gradientlevel(colorTriad[0],colorTriad[1],i,100).getHex()));
	}

	for( i=(100/num); i<=100; i+=(100/num) ){
		color.push(($.xcolor.gradientlevel(colorTriad[1],colorTriad[2],i,100).getHex()));
	}

	for( i=(100/num); i<=100; i+=(100/num) ){
		color.push(($.xcolor.gradientlevel(colorTriad[2],colorTriad[0],i,100).getHex()));
	}
	console.log(colorTriad);
	console.log(color);

	var i = 0;
	var k = 0;
	var a = function (n){
		return Math.floor(Math.random()*n)	;
	}

	var circsqu = function(){
		k++;
		if( parseInt((k/100)%2) == 0){

			$('.round').css('border-radius', k%200);
		}else{

			$('.round').css('border-radius',(100 - (k%100)));
		}
	}

	var b = function(){
		var n = 20;
		var width = $(window).width();
		var height = $(window).height();
		$("html").append("<div id='"+i+"' class = 'click round'></div>")
		$('#'+i).css("background-color",color[i%color.length]);
		$('#'+i).animate({ "left": "+="+(a(width)-width/2)+"px","top":"+="+(a(height)-height/2)+"px"},900);
		$('#'+i).addClass('click');
		i = i+1;
		if(i>n){
			$("#"+(i-n)).fadeOut(3000)
		}
	};

	//var circ = setInterval(function(){circsqu()},5);
	var clicker = setInterval(function(){b()},50);

	$(".fake").click(function(){
		b();
	});


	$("#lens").mousedown(function(){
		$(this).css("background-color","rgba(0,0,0,.1)");
	})

	$("html").click(function(){
		//clearInterval(circs)
		clearInterval(clicker);
	})

	$("#lens").mouseup(function(){
		$(this).css("background-color","rgba(0,0,0,0)");
	})
});