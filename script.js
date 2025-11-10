(function($) { "use strict";
		
	// Optimized Page cursors with throttling
    var t = document.getElementById("cursor"),
        e = document.getElementById("cursor2"),
        i = document.getElementById("cursor3");

    let lastX = 0, lastY = 0;
    let throttleTimer;
    const throttle = (func, delay) => {
        if (throttleTimer) return;
        throttleTimer = setTimeout(() => {
            func();
            throttleTimer = null;
        }, delay);
    };

    document.body.addEventListener("mousemove", function(n) {
        throttle(() => {
            lastX = n.clientX;
            lastY = n.clientY;
            updateCursorPosition();
        }, 16); // ~60fps
    });

    function updateCursorPosition() {
        t.style.left = lastX + "px";
        t.style.top = lastY + "px";
        e.style.left = lastX + "px";
        e.style.top = lastY + "px";
        i.style.left = lastX + "px";
        i.style.top = lastY + "px";
    }

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
	
	// Background animation moved to CSS
	
	$(document).ready(function() {			
		
		// Rooms hover/click with animation
		$('.case-study-name').each(function(index) {
			$(this).css('--index', index + 1);
		});

		$('.case-study-name:nth-child(1)').on('mouseenter click', function(e) {
			e.preventDefault();
			updateRoom(1);
		})
		$('.case-study-name:nth-child(2)').on('mouseenter click', function(e) {
			e.preventDefault();
			updateRoom(2);
		})
		$('.case-study-name:nth-child(3)').on('mouseenter click', function(e) {
			e.preventDefault();
			updateRoom(3);
		})
		$('.case-study-name:nth-child(4)').on('mouseenter click', function(e) {
			e.preventDefault();
			updateRoom(4);
		})
		function updateRoom(index) {
			$('.case-study-name.active').removeClass('active');
			$('.case-study-name:nth-child(' + index + ')').addClass('active');
			$('.case-study-images li.show').animate({opacity: 0}, 300, function() {
				$(this).removeClass('show');
			});
			$('.case-study-images li:nth-child(' + index + ')').addClass('show').css('opacity', 0).animate({opacity: 1}, 300);
		}
		$('.case-study-name:nth-child(1)').trigger('mouseenter');

		// Optimized Parallax on room images with throttling
		let tiltTimer;
		$('.case-study-images li').on('mousemove', function(e) {
			throttle(() => {
				const $this = $(this);
				const rect = $this[0].getBoundingClientRect();
				const mouseX = e.clientX - rect.left;
				const mouseY = e.clientY - rect.top;
				const percentX = (mouseX / rect.width) * 2 - 1;
				const percentY = (mouseY / rect.height) * 2 - 1;
				const tiltX = percentY * 5;
				const tiltY = -percentX * 5;
				$this.css('transform', `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`);
			}, 50); // Less frequent updates
		}).on('mouseleave', function() {
			$(this).css('transform', 'perspective(1000px) rotateX(0deg) rotateY(0deg)');
		});

		// Modal for full info with fade animation
		$('body').append('<div id="info-modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100vh; background:rgba(0,0,0,0.8); z-index:10000; display:flex; justify-content:center; align-items:center; opacity:0; transition: opacity 0.3s ease;"><div style="background:#fff; padding:30px; border-radius:10px; max-width:500px; text-align:center; color:#000; transform: scale(0.9); transition: transform 0.3s ease;"><h3>Suite Details</h3><p id="modal-content">This is placeholder info for the suite. Add real content here.</p><button id="close-modal" class="btn btn-secondary">Close</button></div></div>');
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
			$('#info-modal').css('display', 'flex').animate({opacity: 1}, 300);
			$('#info-modal > div').animate({transform: 'scale(1)'}, 300);
		});
		$(document).on('click', '#close-modal', function() {
			$('#info-modal').animate({opacity: 0}, 300, function() { $(this).css('display', 'none'); });
			$('#info-modal > div').animate({transform: 'scale(0.9)'}, 300);
		});

		// Smooth scroll for navigation
		$('a.nav-link, .footer-links a, a.btn[href^="#"]').on('click', function(e) {
			e.preventDefault();
			const target = $(this.hash);
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top - 70
				}, 800, 'swing');
			}
		});

		// Header scroll animation
		$(window).scroll(function() {
			if ($(this).scrollTop() > 100) {
				$('.header').addClass('scrolled');
			} else {
				$('.header').removeClass('scrolled');
			}
		});

		// Section fade-in on scroll
		function checkVisibility() {
			$('.section').each(function() {
				const top = $(this).offset().top;
				const bottom = top + $(this).outerHeight();
				const viewportTop = $(window).scrollTop();
				const viewportBottom = viewportTop + $(window).height();
				if (bottom > viewportTop && top < viewportBottom) {
					$(this).addClass('visible');
				}
			});
		}
		$(window).on('scroll resize load', checkVisibility);

		// Service cards animation index
		$('.service-card').each(function(index) {
			$(this).css('--index', index + 1);
		});

		// Contact form fields animation index
		$('.form-group').each(function(index) {
			$(this).css('--index', index + 1);
		});

		// Contact form submission (placeholder)
		$('.contact-form').on('submit', function(e) {
			e.preventDefault();
			alert('Message sent! (This is a placeholder)');
		});
	});
	
})(jQuery);