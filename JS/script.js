
// Set up time frame and activate controls.
function init(lengthOfPeriodInSeconds) {
	$('.timeline').attr('data-time', lengthOfPeriodInSeconds).fadeIn();
	$('button:disabled').prop('disabled', false);
	$('.init_btn').prop('disabled', true);
	$('input').val('');
	$('input').attr('placeholder','Enter Time Position')
}


// Add new action
function add_action(timeInSeconds, team) {

	var initialTime = $('.timeline').attr('data-time');
	var lineWidth = $('.timeline').width();

	// Callculating distance based on percentage of initalTime to the Full length
	var timePosition = (timeInSeconds/initialTime) * 100;

	// Changing position for left/right edges
	if(timePosition >= 100 - 1.3) {
		timePosition = 100 - 1.3 + (4/lineWidth)*100 ;
	}
	if(timePosition <= 1.3 ) {
		timePosition = 0 +  (4/lineWidth)*100 ;
	}

	// Checking for overlapping before. Returns true / false. False = overlapped
	if(check_near(timePosition,lineWidth,team)){
		var marker = "<div class='" + team.toLowerCase() +"' style='left: " + timePosition + "%;'><i></i></div>";
		$(".markers").append(marker);
	}
}

function check_near(timePosition,lineWidth,team){
	var number = 0;
	var newlocation = 0;
	var cnt = 0;

	//Checking for overlapping by comparing current elemnt left value and new position with a range of possible values.
	//Merging marks and adding a number.
	$('.markers div.' + team.toLowerCase()).each(function(){
		var elPosition = parseFloat(this.style.left);
		var range = 1.3 ;

		if(elPosition > timePosition - range  && timePosition + (range*2) > elPosition + range) {
			cnt++;
			number = number + (($(this).find("i").text().length > 0) ? parseInt($(this).find("i").text()) : 1);
			newlocation = (cnt > 1) ? ((newlocation + ((timePosition + elPosition)/2))/2) : ((timePosition + elPosition)/2);
			$(this).remove();
		}

	});

	if(number > 0){
		var count = "<div class='" + team.toLowerCase() +" count' style='left: " + newlocation + "%;'><i>" + (number + 1) + "</i></div>";
		$(".markers").append(count);
		return false;
	} else {
		return true;
	}
}
