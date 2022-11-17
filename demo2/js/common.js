$(function(){
//var
	var $w = $(window);
	var ua = navigator.userAgent;
	var $wrapper = $('#wrapper');
	var $header = $('#header');
	var $footer = $('#footer');
//function
	/*.hoverを追加する関数*/
	function addHover(element) {
		element.on('touchstart mouseenter', function(){
		  $(this).addClass( '_hover' );
		}).on('touchend mouseleave click', function(){
		  $(this).removeClass( '_hover' );
		});
	}
	/*
		hoverArr = [] の [] に.hoverをつけたい要素を$('.aaa')の形でいれてください
	*/
	var hoverArr = [ $('a'),$('button'),$('input') ]
	for ( var i=0; i < hoverArr.length; i++ ) {
		addHover(hoverArr[i]);
	}
//effects
	//固定ヘッダーがある場合のページ内アンカー
	//a[href^="#"]:not(".bbb")と書けば.bbbのクラスを持つものは除外されます。
	$(document).on('click', 'a[href^="#"]',function(){
        var $this = $(this);
        var target = $($this.attr('href')).offset().top;
    	if ( window.innerWidth <= 768 ) {
    		$('html,body').animate({ scrollTop:target - 60 },400);
    	} else {
			$('html,body').animate({ scrollTop:target },400);
    	}
        return false;
    });
    //固定ヘッダーがある場合のページ内アンカー（ロード時）
    $(window).on('load',function(){
		if ( location.hash ) {
			var hashTarget = location.hash;
			var target = $(hashTarget).offset().top;
			if ( window.innerWidth <= 768 ) {
				$('html,body').animate({ scrollTop: target - 60 },100);
			} else {
				$('html,body').animate({ scrollTop: target },100);
			}
		}
		return false;
	});
	//追従メニューON/OFF
	function setAas($aas,$aslla,aasLength) {
		var WC = $w.scrollTop(); 
		$aas.each(function(i){
			var $this = $(this);
			var $target = $('.all_under_sec .all_under_menu_menu li a[href="#' + $this.attr('id') + '"]');
			var thisFire = $this.offset().top - $w.height()/2;
			function addAnchorClass() {
				$aslla.removeClass('_on')
				$target.addClass('_on')
			}
			//最初でありかつ最後ではない
			if ( i == 0 && !( i == (aasLength - 1) ) ) {
				var thisFireNext = $aas.eq(i+1).offset().top - $w.height()/2;
				if ( WC < thisFireNext ) {
					addAnchorClass();
				}
			}
			//最初ではなく、かつ最後である
			if ( i != 0 && i == (aasLength - 1 ) ) {
				if ( WC >= thisFire ) {
					addAnchorClass();
				}
			}
			//最初でもなく、最後でもない
			if ( i != 0 && i != (aasLength - 1 ) ) {
				var thisFireNext = $aas.eq(i+1).offset().top - $w.height()/2;
				if ( WC >= thisFire && WC < thisFireNext ) {
					addAnchorClass();
				}
			}
		});
	}
	if ( $('.all_stalker').length ) {
		var $allStalker = $(".all_stalker");
		if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0 || ua.indexOf('iPad') > 0) {
			$allStalker.hide();
		} else {
			$(document).on("mousemove",function(e){
				var x=e.clientX;
				var y=e.clientY;
				$allStalker.css({
					"transform":"translate("+x+"px,"+y+"px)"
				});
				
			});
			$('.all_stalker_target').on({
				"mouseenter": function() {
					$allStalker.addClass("_active");
				},
				"mouseleave": function() {
					$allStalker.removeClass("_active");
				}
			});

		}
	}
	if ( $('.footer_stalker').length ) {
		var $footerStalker = $(".footer_stalker");
		if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0 || ua.indexOf('iPad') > 0) {
			$footerStalker.hide();
		} else {
			$(document).on("mousemove",function(e){
				var x=e.clientX;
				var y=e.clientY;
				$footerStalker.css({
					"transform":"translate("+x+"px,"+y+"px)"
				});
				
			});
			$('.footer_stalker_target').on({
				"mouseenter": function() {
					$footerStalker.addClass("_active");
				},
				"mouseleave": function() {
					$footerStalker.removeClass("_active");
				}
			});

		}
	}
	if ( $('.all_mv_rainbow_sec').length ) {
		if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0 || ua.indexOf('iPad') > 0) {
			
		} else {
			var $allMvRrainbowStalker = $(".all_mv_rainbow_sec ._circle");
			if ( window.innerWidth > 1150 ) {
				$(document).on("mousemove",function(e){
					var x=e.clientX;
					var y=e.clientY;
					$allMvRrainbowStalker.css({
						"transform":"translate("+x+"px,"+y+"px)"
					});
					
				});
			}
		}
	}
	if ( $('.all_obj_sec').length ) {
		var $allObj = $('.all_obj_sec ._obj');
		$w.on('load scroll',function(){
			$allObj.each(function(i){
				var $this = $(this);
				var winSc = $w.scrollTop();
				$this.css('transform','translate3d(0,' + winSc/((i+1) * 3) + 'px,0)' );
			})
		});
	}
	if ( $('.all_under_menu_menu').length ) {
		var $menuMenu =　$('.all_under_menu_menu');
		var $menuSec = $('.all_under_menu_sec');
		var $menuMenuA = $menuMenu.find('a');
		var menuLength = $menuSec.length;
		$w.on('load resize scroll',function(){
			if ( window.innerWidth > 1024 ) {
				setAas($menuSec,$menuMenuA,menuLength);
				if ( $('._menu_reverse').length ) {
					if ( $w.scrollTop() > $('._menu_reverse').offset().top - $w.height()/5*2 - $menuMenu.height()/2 ) {
						$menuMenu.addClass('_reverse');
					} else {
						$menuMenu.removeClass('_reverse');
					}
				}
			}
		});
	}
	/*header*/
	$('.header_ham').on('click',function(){
		if ( !( $header.hasClass('_open') ) ) {
			$header.addClass('_open')
		} else {
			$header.removeClass('_open')
		}
		
	});
	/*top*/
	if ( $('.top').length ) {
		var $cookie = $.cookie('cookie');
		if ( $cookie == 1) {
			$('body').addClass('_anime_none')
			$cookie = $.cookie('cookie','1',{expires:1, path: "/"});
		} else {
			$cookie = $.cookie('cookie','1',{expires:1, path: "/"});
		}
		$w.on('load scroll',function(){
			var winSc = $w.scrollTop();
			if ( winSc >= $footer.offset().top ) {
				$wrapper.addClass('_scroll_end');
			} else {
				$wrapper.removeClass('_scroll_end');
			}
		});
		if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0 || ua.indexOf('iPad') > 0) {
			
		} else {
			var $topIntroStalker = $(".top_intro ._copy ._circle");
			if ( window.innerWidth > 1150 ) {
				$(document).on("mousemove",function(e){
					var x=e.clientX;
					var y=e.clientY;
					$topIntroStalker.css({
						"transform":"translate("+x+"px,"+y+"px)"
					});
					
				});
			}
		}
		var $topMvObj = $('.top_mv ._obj');
		var $topMvObjRightTopImg = $('.top_mv ._obj_top_right div');
		var $topMvObjLeftBottomImg = $('.top_mv ._obj_bottom_left div');
		var $topIntoObjTop = $('.top_intro ._obj_right_top');
		var $topIntoObjTopImg = $('.top_intro ._obj_right_top img');
		var $topCon = $('.top_contents');
		var $topConBg = $('.top_contents ._bg');
		var $topConCon = $('.top_contents ._container');
		var $topConMessageRT = $('.top_contents ._message_obj_right_top');
		var $topConMessageRTImg = $('.top_contents ._message_obj_right_top img');
		var $topConCompanyRT = $('.top_contents ._company_obj_right_top');
		var $topConCompanyRTImg = $('.top_contents ._company_obj_right_top img');
		var $topNewsCon = $('.top_news .content');
		var $topNewsPick = $('.top_news ._pickup');
		var $topNewsHead = $('.top_news .all_head');
		var $topNewsObj = $('.top_news ._obj');
		var $topNewsObjImg = $('.top_news ._obj img');
		$('.top_loading').delay(3000).fadeOut(1000)
		$w.on('load scroll',function(){
			var wW = window.innerWidth;
			var wH = $(window).height();
			var winSc = $w.scrollTop();
			//mv
			if ( winSc >= 0 && winSc <= $(window).height()/2*3 ) {
				$topMvObjRightTopImg.each(function(i){
					var $this = $(this);
					$this.css('transform','translate3d(0,' + winSc/((i+1) * 6) + 'px,0)' );
				})
				$topMvObjLeftBottomImg.each(function(i){
					var $this = $(this);
					$this.css('transform','translate3d(0,' + winSc/((i+1) * 6) + 'px,0)' );
				})
			}
			//intro
			if ( window.innerWidth > 1150 ) {
				var intoObjTopStart = $topIntoObjTop.offset().top - wH;
				if ( winSc >= intoObjTopStart && winSc <= intoObjTopStart + $topIntoObjTop.height() + wH*1.5 ) {
					$topIntoObjTopImg.each(function(i){
						var $this = $(this);
						$this.css('transform','translate3d(0,' + (winSc - intoObjTopStart)/((i+1) * 6) + 'px,0)' );
					})
				}
			}
			
			//contents
			var moveConBgBase = $topCon.offset().top - wH - 345;
			var topConTop = $topCon.offset().top;
			var moveConBg = winSc - moveConBgBase;
			var $overFlowCon = $('.top_mv,.top_intro');
			var overFlowConStart  = topConTop  - 500;
			if ( window.innerWidth > 600 ) {
				var moveConBgLastBase = moveConBgBase + $topCon.height() + 600;
			} else {
				var moveConBgLastBase = moveConBgBase + $topCon.height() + 300;
			}
			var moveConBgLast = winSc - moveConBgLastBase;
			//contents_背景の丸
			if ( winSc <= moveConBgBase ) {
				$topConBg.css({
					"top":"",
					"transform":""
				})
			}
			if ( winSc > moveConBgBase && winSc <= moveConBgLastBase ) {
				$topConBg.css({
					"top":10 - moveConBg/16 + "%",
					"transform":"translateX(-50%) scale(" + moveConBg/800 + ")"
				})
			}
			if ( winSc > moveConBgLastBase ) {
				if ( moveConBgLast/800 <= 1 ) {
					$topConBg.css({
						"top":0 + "%",
						"transform":"translate(-50%,-50%) scale(" + (1 - moveConBgLast/800) + ")"
					})
				}
				if ( moveConBgLast/800 > 1 ) {
					$topConBg.css({
						"top":0 + "%",
						"transform":"translate(-50%,-50%) scale(0)"
					})
				}
			}
			//contents_要素切り替え
			if ( wW > 960 ) {
				
				if ( winSc >= topConTop && winSc < topConTop + wH*2 ) {
					$topConCon.addClass('_fixed');
					$topConCon.removeClass('_off_bottom')
				}
				if ( winSc < topConTop ) {
					$topConCon.removeClass('_fixed');
					$topConCon.removeClass('_off_bottom')
				}
				if ( winSc >= topConTop + wH*2 ) {
					$topConCon.removeClass('_fixed');
					$topConCon.addClass('_off_bottom')
					$header.removeClass('_top_contents')
				}
				if ( winSc >= topConTop + wH ) {
					$topConCon.addClass('_on2')
				} else {
					$topConCon.removeClass('_on2')
				}
				if ( winSc >= topConTop && winSc < topConTop + wH*3 ) {
					$header.addClass('_top_contents')
				} else {
					$header.removeClass('_top_contents')
				}
				var topConMessageRTStart = $topConMessageRT.offset().top - wH;
				if ( winSc >= topConMessageRTStart && winSc <= topConMessageRTStart + $topConMessageRTImg.height() + wH*1.5 ) {
					$topConMessageRTImg.each(function(i){
						var $this = $(this);
						$this.css('transform','translate3d(0,' + (winSc - topConMessageRTStart)/((i+1) * 3) + 'px,0)' );
					})
				}
				var topConCompanyRTStart = $topConCompanyRT.offset().top - wH;
				if ( winSc >= topConCompanyRTStart && winSc <= topConCompanyRTStart + $topConCompanyRTImg.height() + wH*1.5 ) {
					$topConCompanyRTImg.each(function(i){
						var $this = $(this);
						$this.css('transform','translate3d(0,' + (winSc - topConCompanyRTStart)/((i+1) * 3) + 'px,0)' );
					})
				}
				if ( winSc >= overFlowConStart ) {
					$wrapper.css('overflow','visible')
					$overFlowCon.css('overflow','hidden')
					$topCon.css('overflow','visible')
				}
				if ( winSc < overFlowConStart ) {
					$wrapper.css('overflow','hidden')
					$topCon.css('overflow','visible')
					$overFlowCon.css('overflow','visible')
				}
			} else {
				$wrapper.css('overflow','hidden')
				$topCon.css('overflow','visible')
				$overFlowCon.css('overflow','visible')
				$topConCon.removeClass('_fixed');
				$topConCon.removeClass('_off_bottom')
				$header.removeClass('_top_contents')
				$topConCon.removeClass('_on2')
			}

			
			
			
			//news
			var start = $topNewsCon.offset().top - 150;
			var endMove = $topNewsCon.outerHeight() - $topNewsPick.outerHeight();
			var end = start + endMove;
			var $overFlowNews = $('.top_mv,.top_intro,.top_contents');
			var overFlowNewsStart = start - 300;
			if ( wW > 1150 ) {
				if ( winSc >= start && winSc <= end ) {
					//head
					$topNewsHead.addClass('_fixed')
					$topNewsHead.css('top','' );
				}
				if ( winSc < start ) {
					//head
					$topNewsHead.removeClass('_fixed')
					$topNewsHead.css('top','' );
				}
				if ( winSc > end ) {
					//head
					$topNewsHead.removeClass('_fixed')
					$topNewsHead.css('top',endMove + 'px' );
				}
			} else {
				//head
				$topNewsHead.removeClass('_fixed')
				$topNewsHead.css('top','' );
			}
			if ( window.innerWidth > 1150 ) {
				var topNewsObjStart = $topNewsObj.offset().top - wH;
				if ( winSc >= topNewsObjStart && winSc <= topNewsObjStart + $topNewsObjImg.height() + wH*1.5 ) {
					$topNewsObjImg.each(function(i){
						var $this = $(this);
						$this.css('transform','translate3d(0,' + (winSc - topNewsObjStart)/((i+1) * 6) + 'px,0)' );
					})
				}
			}
		});
	}
	if ( $('.message').length ) {
		var $messageBuildings = $('.message_building');
		var $messageBuildingsBg = $('.message_building ._bg');
		$w.on('load scroll',function(){
			if ( $w.scrollTop() >= $messageBuildings.offset().top ) {
				$messageBuildingsBg.addClass('_fixed')
			} else {
				$messageBuildingsBg.removeClass('_fixed')
			}
		});
		var $messageMission = $('.message_mission');
		var $messageFoot = $('.message_foot');
		var $messageObjSec = $('.message_mission_obj');
		var $messageObj = $('.message_mission_obj ._obj');
		var $messageCeoImg = $('.message_mission_sec ._ceo_img')
		var $messageCeoImg2 = $('.message_mission_sec ._ceo_img2')
		var $messagePhiObjSec = $('.message_philosophy_obj')
		var $messagePhiObj = $('.message_philosophy_obj ._obj')
		$w.on('load scroll',function(){
			var wH = $w.height();
			var winSc = $w.scrollTop();
			var messageObJStart = $messageObjSec.offset().top - wH;
			if ( winSc > messageObJStart ) {
				$messageObj.each(function(i){
					var $this = $(this);
					if ( window.innerWidth > 768) {
						$this.css('transform','translate3d(0,' + (winSc - messageObJStart )/((i+1) * 5) + 'px,0)' );
					} else {
						$this.css('transform','translate3d(0,' + (winSc - messageObJStart )/((i+1) * 10) + 'px,0)' );
					}
					
				})
			}
			var messagePhiStart = $messagePhiObjSec.offset().top - wH;
			if ( winSc >messagePhiStart ) {
				$messagePhiObj.each(function(i){
					var $this = $(this);
					$this.css('transform','translate3d(0,' + (winSc -messagePhiStart )/((i+1) * 5) + 'px,0)' );
				})
			}
		});
		
	}
	if ( $('.business').length ) {
		if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0 || ua.indexOf('iPad') > 0) {
			
		} else {
			var $businessIntroStalker = $(".business_intro ._copy ._circle");
			if ( window.innerWidth > 1150 ) {
				$(document).on("mousemove",function(e){
					var x=e.clientX;
					var y=e.clientY;
					$businessIntroStalker.css({
						"transform":"translate("+x+"px,"+y+"px)"
					});
					
				});
			}
		}
		var $businessObjSec = $('.business_group_vision_obj');
		var $businessObj = $('.business_group_vision_obj ._obj');
		var $businessFullObjSec = $('.business_full_img_obj');
		var $businessFullObj = $('.business_full_img_obj ._obj');
		$w.on('load scroll',function(){
			var wH = $w.height();
			var winSc = $w.scrollTop();
			var businessObJStart = $businessObjSec.offset().top - wH;
			if ( winSc > businessObJStart ) {
				$businessObj.each(function(i){
					var $this = $(this);
					if ( window.innerWidth > 1024) {
						$this.css('transform','translate3d(0,' + (winSc - businessObJStart )/((i+1) * 5) + 'px,0)' );
					}
					
				})
			}
			var businessFullObJStart = $businessFullObjSec.offset().top - wH;
			if ( winSc > businessFullObJStart ) {
				$businessFullObj.each(function(i){
					var $this = $(this);
					if ( window.innerWidth > 1024) {
						$this.css('transform','translate3d(0,' + (winSc - businessFullObJStart )/((i+1) * 5) + 'px,0)' );
					}
					
				})
			}
		});
	}
	if ( $('.company').length ) {
		var $companySwitch = $('.company_profile_switch_map');
		$('.company_profile_switch_map ._switch button:nth-child(1)').on('click',function(){
			$companySwitch.removeClass('_tokyo');
		});
		$('.company_profile_switch_map ._switch button:nth-child(2)').on('click',function(){
			$companySwitch.addClass('_tokyo');
		});
		var historySwiper = new Swiper('.company_history_slide', {
			loop: false,
			speed: 400,
			slidesPerView: 'auto',
			navigation: {
	        	prevEl: ".company_history_slide_controls ._prev",
	            nextEl: ".company_history_slide_controls ._next",
	        },
		});
		historySwiper.on('slideChange', function () {
		  if ( historySwiper.isBeginning ) {
			$(".company_history_slide_controls ._prev").addClass("swiper-button-disabled");
			}
			if ( historySwiper.isEnd ) {
			$(".company_history_slide_controls ._next").addClass("swiper-button-disabled");
			}
		});
		var $companyObjSec = $('.company_profile_obj');
		var $companyObj = $('.company_profile_obj ._obj');
		var $companyOutlineLeftObjSec = $('.company_outline_obj_left');
		var $companyOutlineLeftObj = $('.company_outline_obj_left ._obj');
		var $companyOutlineRightObjSec = $('.company_outline_obj_right');
		var $companyOutlineRightObj = $('.company_outline_obj_right ._obj');
		$w.on('load scroll',function(){
			var wH = $w.height();
			var winSc = $w.scrollTop();
			var companyObJStart = $companyObjSec.offset().top - wH;
			if ( winSc > companyObJStart ) {
				$companyObj.each(function(i){
					var $this = $(this);
					if ( window.innerWidth > 1024) {
						$this.css('transform','translate3d(0,' + (winSc - companyObJStart )/((i+1) * 5) + 'px,0)' );
					}
					
				})
			}
			var companyOutlineLeftObJStart = $companyOutlineLeftObjSec.offset().top - wH;
			if ( winSc > companyOutlineLeftObJStart ) {
				$companyOutlineLeftObj.each(function(i){
					var $this = $(this);
					if ( window.innerWidth > 1024) {
						$this.css('transform','translate3d(0,' + (winSc - companyOutlineLeftObJStart )/((i+1) * 5) + 'px,0)' );
					}
				})
			}
			var companyOutlineRightObJStart = $companyOutlineRightObjSec.offset().top - wH;
			if ( winSc > companyOutlineRightObJStart ) {
				$companyOutlineRightObj.each(function(i){
					var $this = $(this);
					if ( window.innerWidth > 600) {
						$this.css('transform','translate3d(0,' + (winSc - companyOutlineRightObJStart )/((i+1) * 5) + 'px,0)' );
					} else {
						$this.css('transform','translate3d(0,' + (winSc - companyOutlineRightObJStart )/((i+1) * 10) + 'px,0)' );
					}
					
				})
			}
		});
	}
	if ( $('.news').length ) {
		$('.news_more a').on('click',function(){
			$('.news_main ._list li').fadeIn(400);
			$(this).hide();
			return false;
		});
		if ( $('.news_slide').length ) {
			$w.on('load',function(){
				var newsSwiper = new Swiper('.news_slide', {
					loop: false,
					speed: 400,
					slidesPerView: 'auto',
					spaceBetween: 28,
					scrollbar: {
					    el: '.news_slide_controls ._bar',
					    draggable: true,
				    },
					navigation: {
			        	prevEl: ".news_slide_controls ._prev",
			            nextEl: ".news_slide_controls ._next",
			        },
				});
			});
		}
		
	}
	if ( $('.single').length ) {
		var $singleLeftObjSec = $('.single_obj_left');
		var $singleLeftObj = $('.single_obj_left ._obj');
		var $singleRightObjSec = $('.single_obj_right');
		var $singleRightObj = $('.single_obj_right ._obj');
		$w.on('load scroll',function(){
			var wH = $w.height();
			var winSc = $w.scrollTop();
			var singleLeftObJStart = $singleLeftObjSec.offset().top - wH;
			if ( winSc > singleLeftObJStart ) {
				$singleLeftObj.each(function(i){
					var $this = $(this);
					if ( window.innerWidth > 1024) {
						$this.css('transform','translate3d(0,' + (winSc - singleLeftObJStart )/((i+1) * 5) + 'px,0)' );
					}
				})
			}
			var singleRightObJStart = $singleRightObjSec.offset().top - wH;
			if ( winSc > singleRightObJStart ) {
				$singleRightObj.each(function(i){
					var $this = $(this);
					if ( window.innerWidth > 1024) {
						$this.css('transform','translate3d(0,' + (winSc - singleRightObJStart )/((i+1) * 5) + 'px,0)' );
					}
				})
			}
		});
	}
});
