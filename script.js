(function($) { "use strict";
		
	// Page cursors
    document.getElementsByTagName("body")[0].addEventListener("mousemove", function(n) {
        t.style.left = n.clientX + "px", 
		t.style.top = n.clientY + "px", 
		e.style.left = n.clientX + "px", 
		e.style.top = n.clientY + "px", 
		i.style.left = n.clientX + "px", 
		i.style.top = n.clientY + "px"
    });
    var t = document.getElementById("cursor"),
        e = document.getElementById("cursor2"),
        i = document.getElementById("cursor3");
    function n(t) {
        e.classList.add("hover"), i.classList.add("hover")
    }
    function s(t) {
        e.classList.remove("hover"), i.classList.remove("hover")
    }
    s();
    for (var r = document.querySelectorAll(".hover-target"), a = r.length - 1; a >= 0; a--) {
        o(r[a])
    }
    function o(t) {
        t.addEventListener("mouseover", n), t.addEventListener("mouseout", s)
    }
	
	// Improved moving background with requestAnimationFrame for better performance and smoothness
	let pos = 0;
	function animateBackground() {
		pos += 1; // Adjust speed as needed
		document.getElementsByClassName('moving-image')[0].style.backgroundPosition = pos + "px 0px";
		requestAnimationFrame(animateBackground);
	}
	animateBackground();
	
	$(document).ready(function() {			
		
		$('.case-study-name:nth-child(1)').on('mouseenter', function() {
			$('.case-study-name.active').removeClass('active');
			$('.case-study-images li.show').removeClass('show');
			$('.case-study-images li:nth-child(1)').addClass('show');
			$('.case-study-name:nth-child(1)').addClass('active');
		})
		$('.case-study-name:nth-child(2)').on('mouseenter', function() {
			$('.case-study-name.active').removeClass('active');
			$('.case-study-images li.show').removeClass('show');
			$('.case-study-images li:nth-child(2)').addClass('show');
			$('.case-study-name:nth-child(2)').addClass('active');
		})
		$('.case-study-name:nth-child(3)').on('mouseenter', function() {
			$('.case-study-name.active').removeClass('active');
			$('.case-study-images li.show').removeClass('show');
			$('.case-study-images li:nth-child(3)').addClass('show');
			$('.case-study-name:nth-child(3)').addClass('active');
		})
		$('.case-study-name:nth-child(4)').on('mouseenter', function() {
			$('.case-study-name.active').removeClass('active');
			$('.case-study-images li.show').removeClass('show');
			$('.case-study-images li:nth-child(4)').addClass('show');
			$('.case-study-name:nth-child(4)').addClass('active');
		})
		$('.case-study-name:nth-child(1)').trigger('mouseenter');

		// Added interesting JS: Simple parallax effect on the room images when hovering over names
		// This creates a subtle 3D-like tilt based on mouse position relative to the image
		$('.case-study-name').on('mousemove', function(e) {
			const $image = $('.case-study-images li.show');
			if ($image.length) {
				const rect = $image[0].getBoundingClientRect();
				const mouseX = e.clientX - rect.left;
				const mouseY = e.clientY - rect.top;
				const percentX = (mouseX / rect.width) * 2 - 1;
				const percentY = (mouseY / rect.height) * 2 - 1;
				const tiltX = percentY * 5; // Max 5deg tilt
				const tiltY = -percentX * 5;
				$image.css('transform', `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-50%)`);
			}
		}).on('mouseleave', function() {
			const $image = $('.case-study-images li.show');
			$image.css('transform', 'translateY(-50%)'); // Reset
		});

		// Added interesting JS: Click on "full info" opens a simple modal with placeholder details (fade in/out animation)
		// This enhances interactivity without external libs
		$('body').append('<div id="info-modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:10000; justify-content:center; align-items:center;"><div style="background:#fff; padding:20px; border-radius:10px; max-width:400px; text-align:center;"><h3>Suite Details</h3><p>This is placeholder info for the suite. Add real content here.</p><button id="close-modal">Close</button></div></div>');
		$('.full-info-link').on('click', function(e) {
			e.preventDefault();
			const suiteName = $(this).closest('li').find('p').text();
			$('#info-modal h3').text(suiteName + ' Details');
			$('#info-modal').fadeIn(300);
		});
		$('#close-modal').on('click', function() {
			$('#info-modal').fadeOut(300);
		});
	});
	
})(jQuery);