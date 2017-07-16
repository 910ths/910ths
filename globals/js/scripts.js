var GlobalLogin = function(apiUrl, essoClientId, onLoginSuccess) {
  this._onLoginSuccess = onLoginSuccess;
  this._apiUrl = apiUrl;
  this._essoClientId = essoClientId;
  this.init()
};
GlobalLogin.prototype = {
  init: function() {
    var o = this;
    o._setEvents()
  },
  _setEvents: function() {
    var o = this;
    o._readToken();
    o._getUserData();
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
        error: function(e) {
          o._getUserDataUsingCookie();
        },
        success: function(userData) {
          o._onLoginSuccess(userData);
        }
      })
    } else {
      o._getUserDataUsingCookie();
    }
  },
  _getUserDataUsingCookie: function() {
    var o = this;
    $.ajax({
      url: o._apiUrl + "/service/g-t",
      method: "POST",
      dataType: "json",
      data: JSON.stringify({
        client_id: o._essoClientId
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
