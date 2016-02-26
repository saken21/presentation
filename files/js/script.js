$(document).ready(function() {
	
	var win      = $(window);
	var buttons  = $("#button").find("li").css("opacity",0);
	var all      = $("#all");
	var sections = all.find(".section");
	var length   = sections.length;
	var current  = 0;
	
	var program = $("#program").html(sections.eq(0).html());
	
	$(".navi").find("li").on("click",function() {
		
		move($(this).parent(".navi").find("li").index(this) + 1);
		return false;
		
	});

	buttons.on({
		
		mouseover : function() {
			
			$(this).stop().fadeTo(100,.1);
			return false;
			
		},
		
		mouseout : function() {
			
			$(this).stop().fadeTo(100,0);
			return false;
			
		},
		
		click : function() {
			
			move($(this).hasClass("left") ? current - 1 : current + 1);
			return false;
			
		}
		
	});
	
	win.on({
		
		keydown : function(event) {
			
			_.test(event.keyCode);
			
			switch (event.keyCode) {
				
				case 32 :
				case 78 : {

					more();
					break;

				}

				case 37 : {

					move(current - 1);
					break;

				}

				case 38 : {

					move(0);
					break;

				}

				case 39 : {

					move(current + 1);
					break;

				}

				case 40 : {

					move(length);
					break;

				}

			}
			
		},
		
		resize : function() {
			
			var w = win.width();

			sections.width(w);
			buttons.height(win.height());

			all.stop().css("left",-w * current);

			return false;
			
		},
		
		load : function() {
			
			all.delay(300).fadeIn(600);
			return false;
			
		}
		
	}).trigger("resize");

	function move(value) {
		
		if (value == current) return false;
		current = value;

		if (current < 0) current = 0;
		if (current > length - 1) current = length - 1;

		all.stop().animate({ left:-win.width() * current },300,function() {
			
			if (current) program.fadeIn(300);
			else program.fadeOut(300);
			
			program.find("li").removeClass("current").eq(current - 1).addClass("current");
			
			return false;
			
		});
		
		sections.eq(current).find(".more").hide();

		return false;

	}
	
	function more() {
		
		sections.eq(current).find(".more").filter(":hidden").eq(0).fadeIn(300);
		return false;
		
	}

	return false;
	
});