/**
 *
 *@Project:					jQuery Utils
 *@Scope:					shortHands for simple functionality
 *@Dependencies:			jQuery
 *
 *@Last change:		 [ Setting up Base grid]
 *
 *
**/
 (function ($) {

	/*
	 * LINK HELPERS
	 */
                    
	$.smoothScroll = function() {
		$("a[href^=#][href!=#]").live('click',function(e){
		    $('html,body').animate({'scrollTop': $($(this).attr('href')).offset().top+'px'}, 1000); 
		    e.preventDefault();
		});
	};

	/* 
	 * INPUT HELPERS
	 */
    $.fn.disable = function () {
        return this.each(function () {
            $(this).attr('disabled', 'disabled');
        });
    };
    $.fn.enable = function () {
        return this.each(function () {
            $(this).removeAttr('disabled');
        });
    };

    $.fn.maxLength = function (max) {
        this.each(function () {
            var type = this.tagName.toLowerCase();
            var inputType = this.type ? this.type.toLowerCase() : null;
            // if its a input field, we can just set its maxLength to max
            if (type == "input" && inputType == "text" || inputType == "password") {
                this.maxLength = max;
                // if however its a textarea, we need a bit of extra magic
            } else if (type == "textarea") {
                this.onkeypress = function (e) {
                    var ob = e | window.event;
                    var keyCode = ob.keyCode;
                    var hasSelection = document.selection ? document.selection.createRange().text.length > 0 : this.selectionStart != this.selectionEnd;
                    return ! (this.value.length >= max && (keyCode > 50 || keyCode == 32 || keyCode === 0 || keyCode == 13) && !ob.ctrlKey && !ob.altKey && !hasSelection);
                };
                this.onkeyup = function () {
                    if (this.value.length > max) {
                        this.value = this.value.substring(0, max);
                    }
                };
            }
        });
    };
    $.fn.alphanumeric = function (p) {
        p = $.extend({
            ichars: "!@#$%^&*()+=[]\\\';,/{}|\":<>?~`.- ",
            nchars: "",
            allow: ""
        },
        p);
        return this.each(

        function () {
            if (p.nocaps) {
                p.nchars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            }
            if (p.allcaps) {
                p.nchars += "abcdefghijklmnopqrstuvwxyz";
            }
            var s = p.allow.split('');
            for (i = 0; i < s.length; i++) {
                if (p.ichars.indexOf(s[i]) != -1) {
                    s[i] = "\\" + s[i];
                }
            }
            p.allow = s.join('|');
            var reg = new RegExp(p.allow, 'gi');
            var ch = p.ichars + p.nchars;
            ch = ch.replace(reg, '');
            $(this).keypress(

            function (e) {
                if (!e.charCode) {
                    k = String.fromCharCode(e.which);
                } else {
                    k = String.fromCharCode(e.charCode);
                }
                if (ch.indexOf(k) != -1) {
                    e.preventDefault();
                }
                if (e.ctrlKey && k == 'v') {
                    e.preventDefault();
                }
            });
            $(this).bind('contextmenu', function () {
                return false;
            });
        });
    };
    $.fn.numeric = function (p) {
        var az = "abcdefghijklmnopqrstuvwxyz";
        az += az.toUpperCase();
        p = $.extend({
            nchars: az
        },
        p);
        return this.each(function () {
            $(this).alphanumeric(p);
        });
    };
    $.fn.alpha = function (p) {
        var nm = "1234567890";
        p = $.extend({
            nchars: nm
        },
        p);
        return this.each(function () {
            $(this).alphanumeric(p);
        });
    };  
})(jQuery);
