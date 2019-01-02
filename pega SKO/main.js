(function (a) {
    function b(d) {
        if (c[d]) return c[d].exports;
        var e = c[d] = {
            i: d,
            l: !1,
            exports: {}
        };
        return a[d].call(e.exports, e, e.exports, b), e.l = !0, e.exports
    }
    var c = {};
    return b.m = a, b.c = c, b.d = function (a, c, d) {
        b.o(a, c) || Object.defineProperty(a, c, {
            configurable: !1,
            enumerable: !0,
            get: d
        })
    }, b.n = function (a) {
        var c = a && a.__esModule ? function () {
            return a['default']
        } : function () {
            return a
        };
        return b.d(c, 'a', c), c
    }, b.o = function (a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }, b.p = '', b(b.s = 0)
})([function (a, b, c) {
    'use strict';
    Object.defineProperty(b, '__esModule', {
        value: !0
    });
    var d = c(1),
        e = c.n(d),
        f = c(2),
        g = c.n(f),
        h = c(3),
        i = c.n(h),
        j = c(4),
        k = c.n(j),
        l = c(5),
        m = c.n(l)
}, function () {}, function () {
    $.fn.isInViewport = function () {
        var a = $(this).offset().top,
            b = a + $(this).outerHeight(),
            c = $(window).scrollTop(),
            d = c + $(window).height();
        return a < c && a < d
    };
    var a = $('#wrap');
    a.on('scroll', function () {
        $('.day').each(function () {
            var a = $(this).attr('id');
            $(this).isInViewport() ? $('.js-head-' + a).addClass('-u-fixed') : $('.js-head-' + a).removeClass('-u-fixed')
        })
    })
}, function () {
    $.fn.sessionFilter = function (a) {
        'all' === a ? $('.agenda').removeClass('js-filter-session-active') : $('.agenda').addClass('js-filter-session-active').addClass('js-session-' + a)
    };
    var a = $('.js-session-filter');
    a.on('click', function () {
        $(this).hasClass('js-btn-filter--active') ? ($(this).removeClass('js-btn-filter--active'), $(this).attr('aria-pressed', 'false'), $('.agenda').removeClass('js-session-' + $(this).data('session')), -1 === $('.agenda').attr('class').indexOf('js-session-') && $('.agenda').removeClass('js-filter-session-active')) : ($(this).sessionFilter($(this).data('session')), $(this).addClass('js-btn-filter--active'), $(this).attr('aria-pressed', 'true'))
    })
}, function () {
    $.fn.changeDay = function (a) {
        $('.agenda').removeClass('js-sunday').removeClass('js-monday').removeClass('js-tuesday').removeClass('js-wednesday').removeClass('js-thursday'), 'all' === a ? $('.agenda').removeClass('js-dayview') : ($('.agenda').addClass('js-dayview').addClass('js-' + a), $('#wrap').animate({
            scrollTop: 0
        }, 'slow'))
    };
    var a = $('.js-day-selector');
    a.on('change', function () {
        $(this).changeDay(this.value)
    });
    var b = $('.js-day-filter');
    b.on('click', function () {
        $(this).changeDay($(this).data('day')), a.val($(this).data('day'))
    });
    var c = $('.icon--close');
    c.on('click', function () {
        $(this).changeDay('all'), $('#switch_3_left').prop('checked', true);
    })
}, function () {
    $.fn.highlightTrack = function (a) {
        $('.multi-track').removeClass('js-track-grow').removeClass('js-track-default').addClass('js-track-shrink'), $('.js-track-' + a).addClass('js-track-grow').removeClass('js-track-shrink')
    };
    var a = $('.track-head');
    a.on('click', function () {
        if ($(this).hasClass('js-btn-track--active'));
        else {
            var a = $(this).data('track');
            $(this).highlightTrack(a), $('.track-head').removeClass('js-btn-track--active');
            var b = $('.track-head[data-track=\'' + a + '\']');
            b.each(function () {
                $(this).addClass('js-btn-track--active')
            })
        }
    });
    var b = $('#track-default');
    b.click()
}]);



/* Get Cookie from Browser */
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = document.cookie;
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

/* Move User to Index */
function redirectUserToLogin(){
	window.location.href = '/index.html';
}


$( document ).ready(function() {
  /* If a valid email exists, move forward, else do move to Login. */
  if(getCookie("email") != ""){
	  loadSession(getCookie("email"));
  }else{
	  redirectUserToLogin();
  }
});


/**
 * https://gist.github.com/jherax/f11d669ba286f21b7a2dcff69621eb72
 * Filters an array of objects with multiple criteria.
 *
 * @param  {Array}  array: the array to filter
 * @param  {Object} filters: an object with the filter criteria as the property names
 * @return {Array}
 */
function multiFilter(array, filters) {
	const filterKeys = Object.keys(filters);
	// filters all elements passing the criteria
	return array.filter((item) => {
		// dynamically validate all filter criteria
		return filterKeys.every(key => !!~filters[key].indexOf(item[key]));
	});
}

function filterSessions(roleTest, industryTest, regionTest) {
	var filters = {},
		results = [],
		role = roleTest,
		industry = industryTest,
		region = regionTest,
		allEvents = '';
		sunEvents = '';
		monEvents = '';
		tueEvents = '';
		wedEvents = '';

	if (role !== 'All') {
		filters.Role = role;
	}

	if (industry !== 'All') {
		filters.Industry = industry;
	}

	if (region !== 'All') {
		filters.Region = region;
	}

	results = multiFilter(obj.sessions, filters);

	results.forEach(function (name) {

		allEvents +=
			'<li  class="day_sessions-session day_sessions-session--user">' +
			'<h3>' +
			'<time>' + name.TimeStart + '</time>' + '-' + '<time>' + name.TimeEnd + '</time>' + ' ' +
			name.Session +
			'<ul><li>' + name.Speaker + ' ' + name.Day + '</li></ul>' +
			'<div class="room">' + name.Location + '</div>' +
			'</h3>' +
			'</li>';

		if (name.Day == "Sunday") {
			sunEvents +=
				'<li  class="day_sessions-session day_sessions-session--user">' +
				'<h3>' +
				'<time>' + name.TimeStart + '</time>' + '-' + '<time>' + name.TimeEnd + '</time>' + ' ' +
				name.Session +
				'<ul><li>' + name.Speaker + ' ' + name.Day + '</li></ul>' +
				'<div class="room">' + name.Location + '</div>' +
				'</h3>' +
				'</li>';
		}

		if (name.Day == "Monday") {
			monEvents +=
				'<li  class="day_sessions-session day_sessions-session--user">' +
				'<h3>' +
				'<time>' + name.TimeStart + '</time>' + '-' + '<time>' + name.TimeEnd + '</time>' + ' ' +
				name.Session +
				'<ul><li>' + name.Speaker + ' ' + name.Day + '</li></ul>' +
				'<div class="room">' + name.Location + '</div>' +
				'</h3>' +
				'</li>';
		}

		if (name.Day == "Tuesday") {
			tueEvents +=
				'<li  class="day_sessions-session day_sessions-session--user">' +
				'<h3>' +
				'<time>' + name.TimeStart + '</time>' + '-' + '<time>' + name.TimeEnd + '</time>' + ' ' +
				name.Session +
				'<ul><li>' + name.Speaker + ' ' + name.Day + '</li></ul>' +
				'<div class="room">' + name.Location + '</div>' +
				'</h3>' +
				'</li>';
		}

		if (name.Day == "Wednesday") {
			wedEvents +=
				'<li  class="day_sessions-session day_sessions-session--user">' +
				'<h3>' +
				'<time>' + name.TimeStart + '</time>' + '-' + '<time>' + name.TimeEnd + '</time>' + ' ' +
				name.Session +
				'<ul><li>' + name.Speaker + ' ' + name.Day + '</li></ul>' +
				'<div class="room">' + name.Location + '</div>' +
				'</h3>' +
				'</li>';
		}


	});

	document.getElementById('sessionListSun').innerHTML = sunEvents;
	document.getElementById('sessionListMon').innerHTML = monEvents;
	document.getElementById('sessionListTue').innerHTML = tueEvents;
	document.getElementById('sessionListWed').innerHTML = wedEvents;
}


function loadSession(emailFind){
	var filtered = sko_obj.filter(function (el) {
        return el['Email Address'] === emailFind;
    })


    if (filtered.length == 0) {
        alert("No Registration found for email address: " + emailFind);
    } else {
		
        var regionTest = (filtered[0]['Region']);
        var industryTest = (filtered[0]['Industry']);
        var roleTest = (filtered[0]['Roletest']);
        var dept = (filtered[0]['Role'])
        var Name = (filtered[0]['First Name'] + " " + filtered[0]['Last Name']);
        alert(emailFind + " :: " + regionTest + " " + dept + " " + industryTest + " " + roleTest + " " + Name);

        filterSessions(roleTest, industryTest, regionTest);
		
    }

}








