var globalLogin = function() {
  this.init()
};
globalLogin.prototype = {
  init: function() {
    var o = this;
    if (!this._setVars())
      return;
    o._loginWrap = $(".globLoginWrap");
    o._loginButton = $(".globLoginButton");
    o._logoutButton = $(".globLogoutButton");
    o._avatar = $(".globAvatar span");
    o._loginHidden = $(".globShowOnlyLogged");
    o._url = window.location.href;
    o._loginUrl = o._loginWrap.data("esso-login-url") + "/login-from-service?client_id=" + o._loginWrap.data("esso-client-id") + "&redirect_uri=" + o._url;
    o._apiUrl = o._loginWrap.data("esso-api-url");
    o._setEvents();
    o._getUserDataUsingCookie();
  },
  _setVars: function() {
    var o = this;
    return true
  },
  _setEvents: function() {
    var o = this;
    o._loginButton.attr("href", o._loginUrl);
    o._readToken();
    o._getUserData();
    o._logoutButton.click(function(e) {
      e.preventDefault();
      localStorage.user910accessToken = "";
      o._loginWrap.removeClass("globHeaderNav__item--hasSubNav");
      o._loginWrap.find(".globHeaderSubNav").slideUp();
      window.location.href = $(this).attr("href")
    })
  },
  _readToken: function() {
    var o = this;
    o._token = o._getTokenFromUrl("token");
    if (!o._token)
      return;
    o._removeTokenFromUrl();
    localStorage.user910accessToken = o._token;
    o._getUserData()
  },
  _getTokenFromUrl: function(o) {
    var e = this;
    o = o.replace(/[\[\]]/g, "\\$&");
    var t = new RegExp("[?&]" + o + "(=([^&#]*)|&|#|$)");
    var n = t.exec(e._url);
    if (!n)
      return null;
    if (!n[2])
      return "";
    return decodeURIComponent(n[2].replace(/\+/g, " "))
  },
  _removeTokenFromUrl: function() {
    var o = window.location.pathname;
    history.pushState("", document.title, o)
  },
  _getUserData: function() {
    var o = this;
    if (localStorage.user910accessToken) {
      $.ajax({
        url: o._apiUrl + "/user/info",
        method: "GET",
        dataType: "json",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.user910accessToken
        },
        error: function(o) {
          console.log(o)
        },
        success: function(e) {
          o._loginWrap.addClass("globHeaderNav__item--hasSubNav");
          o._avatar.css("background-image", "url(" + o._apiUrl + "/user/image?r=" + e.id + ")");
          o._loginHidden.hide()
        }
      })
    }
  },
  _getUserDataUsingCookie: function() {
    var o = this;
    $.ajax({
      url: o._apiUrl + "/service/g-t",
      method: "POST",
      dataType: "json",
      data: JSON.stringify({
        client_id: o._loginWrap.data("esso-client-id")
      }),
      xhrFields: {
        withCredentials: true
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      success: function(data) {
        o._token = data.access_token;
        localStorage.user910accessToken = o._token;
        o._getUserData();
      }
    })
  }
};
var globalNav = function() {
  this.init()
};
globalNav.prototype = {
  init: function() {
    var e = this;
    if (!this._setVars())
      return;
    e._body = $("body");
    e._nav = $(".globHeaderNav");
    e._navToggle = $(".globHeader__toggle");
    e._subNavToggle = $(".globHeaderNav__item > a");
    e._setEvents()
  },
  _setVars: function() {
    var e = this;
    return true
  },
  _setEvents: function() {
    var e = this;
    e._navToggle.click(function() {
      $(this).toggleClass("active");
      e._nav.fadeToggle("open");
      if ($(this).hasClass("active")) {
        setTimeout(function() {
          e._lockScroll()
        }, 500)
      } else {
        e._unlockScroll()
      }
    });
    e._subNavToggle.click(function(o) {
      if (!$(this).parent().hasClass("globHeaderNav__item--hasSubNav"))
        return;
      o.preventDefault();
      e._toogleCurrentSubNav($(this).parent())
    });
    $(document).click(function(o) {
      if (o.target.closest(".globHeaderNav") == null) {
        e._hideAnotherSubNav()
      }
    });
    $(window).resize(function() {
      if (e._navToggle.css("display") == "none") {
        e._navToggle.removeClass("active");
        e._nav.fadeOut("open");
        e._unlockScroll()
      }
    })
  },
  _hideAnotherSubNav: function(e) {
    var o = this;
    o._nav.find(".globHeaderNav__item.open").each(function() {
      var o = $(this);
      if (o.index() == e)
        return;
      o.addClass("removing");
      setTimeout(function() {
        o.removeClass("removing")
      }, 300);
      o.removeClass("open").find(".globHeaderSubNav").slideUp()
    })
  },
  _toogleCurrentSubNav: function(e) {
    var o = this;
    o._hideAnotherSubNav(e.index());
    if (e.hasClass("open")) {
      e.addClass("removing");
      setTimeout(function() {
        e.removeClass("removing")
      }, 300)
    }
    e.toggleClass("open");
    e.find(".globHeaderSubNav").slideToggle()
  },
  _lockScroll: function() {
    var e = this;
    if (e._body.css("position") == "fixed")
      return;
    var o = $(window).scrollTop();
    e._body.css({
      top: -o,
      position: "fixed"
    })
  },
  _unlockScroll: function() {
    var e = this;
    if (e._body.css("position") != "fixed")
      return;
    var o = -parseInt(e._body.css("top"));
    e._body.css({top: 0, position: "static"});
    $("html, body").scrollTop(o)
  }
};
var globalCore = function() {
  this.init()
};
globalCore.prototype = {
  init: function() {
    this._run()
  },
  _run: function() {
    document.globalLogin = new globalLogin;
    document.globalNav = new globalNav
  }
};
var $ = jQuery;
$(document).ready(function() {
  new globalCore
});
