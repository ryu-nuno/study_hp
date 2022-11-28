/* global $, google */


// ハンバーガーメニュー
  $('.hamburger-button').click(function(){
    if ($('.hamburger-navi-menu').is(':visible')) {
      $('.hamburger-navi-menu').slideUp();
    } else {
      $('.hamburger-navi-menu').slideDown();
    }
  });