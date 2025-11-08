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
	
	// Background animation
	let pos = 0;
	function animateBackground() {
		pos += 1;
		document.querySelector('.moving-image').style.backgroundPosition = pos + "px 0px";
		requestAnimationFrame(animateBackground);
	}
	animateBackground();
	
	$(document).ready(function() {			
		
		// Rooms hover
		$('.case-study-name:nth-child(1)').on('mouseenter click', function() {
			$('.case-study-name.active').removeClass('active');
			$('.case-study-images li.show').removeClass('show');
			$('.case-study-images li:nth-child(1)').addClass('show');
			$('.case-study-name:nth-child(1)').addClass('active');
		})
		$('.case-study-name:nth-child(2)').on('mouseenter click', function() {
			$('.case-study-name.active').removeClass('active');
			$('.case-study-images li.show').removeClass('show');
			$('.case-study-images li:nth-child(2)').addClass('show');
			$('.case-study-name:nth-child(2)').addClass('active');
		})
		$('.case-study-name:nth-child(3)').on('mouseenter click', function() {
			$('.case-study-name.active').removeClass('active');
			$('.case-study-images li.show').removeClass('show');
			$('.case-study-images li:nth-child(3)').addClass('show');
			$('.case-study-name:nth-child(3)').addClass('active');
		})
		$('.case-study-name:nth-child(4)').on('mouseenter click', function() {
			$('.case-study-name.active').removeClass('active');
			$('.case-study-images li.show').removeClass('show');
			$('.case-study-images li:nth-child(4)').addClass('show');
			$('.case-study-name:nth-child(4)').addClass('active');
		})
		$('.case-study-name:nth-child(1)').trigger('mouseenter');

		// Parallax on room images
		$('.case-study-images li').on('mousemove', function(e) {
			const $this = $(this);
			const rect = $this[0].getBoundingClientRect();
			const mouseX = e.clientX - rect.left;
			const mouseY = e.clientY - rect.top;
			const percentX = (mouseX / rect.width) * 2 - 1;
			const percentY = (mouseY / rect.height) * 2 - 1;
			const tiltX = percentY * 5;
			const tiltY = -percentX * 5;
			$this.css('transform', `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`);
		}).on('mouseleave', function() {
			$(this).css('transform', 'perspective(1000px) rotateX(0deg) rotateY(0deg)');
		});

		// Modal for full info
		$('body').append('<div id="info-modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100vh; background:rgba(0,0,0,0.8); z-index:10000; display:flex; justify-content:center; align-items:center;"><div style="background:#fff; padding:30px; border-radius:10px; max-width:500px; text-align:center; color:#000;"><h3>Suite Details</h3><p id="modal-content">This is placeholder info for the suite. Add real content here.</p><button id="close-modal" class="btn btn-secondary">Close</button></div></div>');
		$('.full-info-link').on('click', function(e) {
			e.preventDefault();
			const suiteName = $(this).closest('li').find('p').text();
			const placeholderDetails = {
				'suite tanya': 'Luxury suite with ocean view, king bed, and private balcony.',
				'suite helen': 'Cozy suite with city view, queen bed, and modern amenities.',
				'suite andrea': 'Spacious suite with garden access, two beds, and spa bath.',
				'suite diana': 'Premium suite with rooftop terrace, king bed, and jacuzzi.'
			};
			$('#info-modal h3').text(suiteName.charAt(0).toUpperCase() + suiteName.slice(1) + ' Details');
			$('#modal-content').text(placeholderDetails[suiteName] || 'Details not available.');
			$('#info-modal').fadeIn(300);
		});
		$('#close-modal').on('click', function() {
			$('#info-modal').fadeOut(300);
		});

		// Smooth scroll for navigation
		$('a.nav-link, a[href="#rooms"]').on('click', function(e) {
			e.preventDefault();
			const target = $(this.hash);
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top - 70
				}, 800);
			}
		});

		// Contact form submission (placeholder)
		$('.contact-form').on('submit', function(e) {
			e.preventDefault();
			alert('Message sent! (This is a placeholder)');
		});
	});
	
})(jQuery);