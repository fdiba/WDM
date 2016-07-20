var mode;
var pMode;
var threshold = 790;

var width, height;

var pWidth = 400; //+40*2 padding
var pHeight = 260; //+40*2 padding + 20top
var paddingPanel = 40*2;
var addedTopPanning = 20;

var panNumber = 3;

var navWidth = 150;
var displayS0 = false;

var panelPos = [];
var idSlPanel = 0;

$(document).ready(function(){
    
	$('#btn1').on('click', goBack).css('cursor', 'pointer');

    $(window).scroll(showS0BasedOnScrollPosition);

    $('header').css("position", "fixed");

    $('#navS0 li').each(function(index){
    	$(this).on("click", index, selectAnotherPanel);
    });

    width = $(window).width();
    height = $(window).height();

    setMode();
    pMode = mode;

    // console.log("mode: "+ mode);

    // console.log($(window).scrollTop());

    if ( $(window).scrollTop() === 0) displayS0 = true;

    if(mode === 0){

	    if (displayS0){
	    	$('#navS0').css({"display": "block"});
	    } else {
	    	$("#panel").hide();
	    	$('footer').hide();
	    }

	    $('.panel').css({"width": pWidth+"px", "height": pHeight+"px", "position":"fixed"});
    	$('.panel:not(:first)').children().hide();
    	setPanelsPosition();

    } else {

    	$("body").css("padding-top", "35px");

    	// console.log("mode 1");

    	$('#navS0').hide();
    	$("#scene0 h1").css("display", "block");
    	$('#scene0').css("overflow-y", "visible");

    	$('footer').css("display", "none");
    }

    setHeightScenes();

    setFooter();

    //------ set next scenes ------//
    setSceneTitles();

    $(window).resize(reinitElementPosition);

    //only for screenschots
    // $('.scene:not(:first)').css('background-attachment', 'scroll');

});
function setMode(){
	if(width >= threshold) mode = 0;
    else mode = 1;
}
function setSceneTitles(){
	$('section:not(:first) h1').css({"margin": (height-50)/2 + "px auto"});
}
function goBack(){
	$('body').scrollView();
}
$.fn.scrollView = function () {
  return this.each(function () {
    $('html, body').animate({scrollTop: $(this).offset().top}, 400);
  });
}
function showS0BasedOnScrollPosition(){


	var $window = $(window);

	// var foo = $('#panel0');
	// var offset = foo.offset();
	// console.log(offset.top);
  
    if ($window.scrollTop() === 0){
    	// alert('Scroll en haut de page');

    	if(mode===0){
    		$('#navS0').fadeIn(400);
	    	$('#panel').fadeIn(400);
	    	$('footer').fadeIn(400);
    	}
    	
    	displayS0 = true;

    } else if($window.scrollTop() > 1 && displayS0){

    	if(mode===0){
	    	$('#navS0').fadeOut(200);
	    	$('#panel').fadeOut(200);
	    	$('footer').hide();
	    }
    	
    	displayS0 = false;
    
    } else if ($window.height() + $window.scrollTop() == $(document).height()) {
    	// alert('Scroll en bas de page');
	}
 

}
function fadeAllPanels(){

	$('.panel').each(function(index){
		$(this).delay(400-400/panelPos.length*index).fadeOut(400, sortAndDisplay);
	});

}
function sortAndDisplay(){

	var id = $('.panel').first().attr('id');

	if(id === $(this).attr('id')){

		sortPanels();
		
		$('.panel').each(function(index){

			$(this).css({"left": panelPos[index][0]+"px", "top": panelPos[index][1]+"px", "z-index": 10-index});
			$(this).delay(1200/panelPos.length*index).fadeIn();
		// .delay(2000*index).show();
		});
	}

}
function sortPanels(){

	var tId = idSlPanel;

	tId--;
	if(tId<0)tId=panelPos.length-1;

	for(var i=0; i<panelPos.length; i++){

		var idFirstPanel =  '#panel'+ tId;
		$(idFirstPanel).prependTo('#panel');

		tId--;
		if(tId<0)tId=panelPos.length-1;

		if(i === panelPos.length-1) $(idFirstPanel).children(':not(:first)').show();
		else $(idFirstPanel).children().hide();

	}

}
function selectAnotherPanel(data){

	// console.log(data);

	idSlPanel = data.data;

	var className = $(this).attr('class');

	if(className !== 'selected'){

		$('.selected').removeClass();
		$(this).attr('class', 'selected');
		
		//fadeAllPanels();
		$('.panel').hide();
		$('.panel').each(sortAndDisplay);
	
	}
}
function reinitElementPosition(){

	width = $(window).width();
    height = $(window).height();

    setHeightScenes();

    setMode();

    // console.log(width);

    if(mode !== pMode){

    	// console.log("change of mode : "+ mode);

    	if(mode === 0){

    		$("body").css("padding-top", "0");

    		$('#navS0').css({"display": "block"});

    		$('.panel').css({"width": pWidth+"px", "height": pHeight+"px", "position":"fixed"});
    		
    		$('.panel:not(:first)').children().hide();

			if(!displayS0){

				$('#navS0').hide();
		    	$('#panel').hide();
		    	$('footer').hide();

	    	}

	    	$('#scene0').css("overflow-y", "hidden");

	    	$("#scene0 h1").css("display", "none");

    	} else {

    		$("body").css("padding-top", "35px");

    		$('#navS0').hide();

    		$('.panel').css({"width": "100%", "height": "100%", "position":"relative"});
    		$('.panel').css({"left": "auto", "top": "auto"});
    		$('.panel').children().show();
    		
    		
    		$("#panel").show();
    		
    		$('#scene0').css({"overflow-y": "visible", "height": "100%"});
    		//$('#scene0').css({"overflow-y": "visible"});

    		$("#scene0 h1").css("display", "block");

    		$('footer').css("display", "none");

    	}
    }

	if(mode === 0) {
		setPanelsPosition();
		setFooter();
	} else {
		$('.panel').css({"width": (width-100)+"px"});
	}
    
    
    setSceneTitles();

    pMode = mode;

}
function setHeightScenes(){
    $('.scene').css('height', height);
    if(mode === 1) $("#scene0").css({"height": "100%", "min-height": height});
}
function setFooter(){
	$('footer').css({"position": "fixed", "top": (height-30)+"px"})
}

function setPanelsPosition(){

	//var mWidth = $('#panel0').css("width");
	// console.log(mWidth);

	var offsetX = 20;
	var offsetY = 20;
	var offX = offsetX*panNumber/2;
	var offY = offsetY*panNumber/4;

	var tl = width/2-pWidth/2+navWidth/2-paddingPanel/2;
	var yPos = height/2-pHeight/2+offY-paddingPanel/2-addedTopPanning/2;

	$('#navS0').css({"left": (tl-offX-navWidth-offsetX*2)+"px", "top": yPos+"px"});

	panelPos[0] = [tl-offX, yPos];
	panelPos[1] = [tl+offsetX-offX, yPos-offsetY]; 
	panelPos[2] = [tl+offsetX*2-offX, yPos-offsetY*2];
	panelPos[3] = [tl+offsetX*3-offX, yPos-offsetY*3];

	$('.panel').each(function(index){
		$(this).css({"left": panelPos[index][0]+"px", "top": panelPos[index][1]+"px"});
	});

}