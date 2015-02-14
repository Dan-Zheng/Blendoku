$(document).ready(function(){
	//var color = ['#69D2E7','#A7DBD8','#F38630','#FA6900','#fe4365','#fc9d9a','#f9cdad','#556270','#4ecdc4','#c7f464','#ff6b6b','#c44d58','#d1e751','#ffffff','#000000','#4dbce9','#26ade4','#d95b43','#c02942','#542437','#53777a','#cff09e','#a8dba8','#79bd9a','#3b8686','#0b486b','#00a0b0','#6a4a3c','#cc333f','#eb6841','#edc951'];
	
	var A = "#ff8800";//First color stop
	var C = "#aa00b0";//Second Color stop
	var bordrad = 0;
	var num = 80; //number of discrete points selected from the gradation between A&C
	var id = 0;//iterator used to define html id for spawned divs
	var currentMousePos = { x: $(window).width()/2, y: $(window).height()/2}; //x is horizontal, y is veritcal. Initilized in center
	var color = [A]; //Initialized the array that holds those points, beginning with the first color stop
	for( var i=1; i<=num; i++ ){
		/*
		Iterates through percentages between 0 & 100
		Uses those percentages to select colors 
		push works on the gradient from a to c
		unshift works on the gradient from c to a
		they meet in the middle, thus, a-c-c-a
		*/
		color.push($.xcolor.gradientlevel(A,C,i,num));
		color.unshift($.xcolor.gradientlevel(A,C,i,num));
	}

	var rand = function (n){ //returns random int between 0 and n
		return Math.floor(Math.random()*n)	;
	}

	var circsqu = function(){
		bordrad++;
		if( parseInt((bordrad/100)%6) == 0){

			$('.round').css('border-radius', bordrad%200);
		}else{

			$('.round').css('border-radius',(100 - (bordrad%200)));
		}
	}

	var mousecoord = function() {
       return currentMousePos;
    }

	var b = function(){
		var n = 100;
		var width = $(window).width();
		var height = $(window).height();
		$("html").append("<div id='"+id+"' class = 'click round'></div>");
		$('#'+id).css("background-color",color[id%color.length]);
		$('#'+id).css("margin-left",currentMousePos.x-94);
		$('#'+id).css("margin-top",currentMousePos.y-94);
		$('#'+id).animate({ "left": "+="+(rand(width)-width/2)+"px","top":"+="+((rand(height)-height/2))+"px"},900);
		$('#'+id).addClass('click');
		id = id+1;
		if(id>=n){
			$("#"+(id-n)).fadeOut(3000)
		}
	}


	var circ = setInterval(function(){circsqu()},5);
	var clicker = setInterval(function(){b()},10);

	$(".fake").click(function(){
		b();
	});


	$(document).mousemove(function(event) {
   		currentMousePos.x = event.pageX;
    	currentMousePos.y = event.pageY;
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