angular.module("MyApp",["ngRoute","satellizer"]).config(["$routeProvider","$locationProvider","$authProvider",function(t,e,r){function a(t,e){e.isAuthenticated()&&t.path("/")}function o(t,e){e.isAuthenticated()||t.path("/login")}a.$inject=["$location","$auth"],o.$inject=["$location","$auth"],e.html5Mode(!0),t.when("/",{templateUrl:"partials/home.html"}).when("/contact",{templateUrl:"partials/contact.html",controller:"ContactCtrl"}).when("/login",{templateUrl:"partials/login.html",controller:"LoginCtrl",resolve:{skipIfAuthenticated:a}}).when("/signup",{templateUrl:"partials/signup.html",controller:"SignupCtrl",resolve:{skipIfAuthenticated:a}}).when("/account",{templateUrl:"partials/profile.html",controller:"ProfileCtrl",resolve:{loginRequired:o}}).when("/forgot",{templateUrl:"partials/forgot.html",controller:"ForgotCtrl",resolve:{skipIfAuthenticated:a}}).when("/reset/:token",{templateUrl:"partials/reset.html",controller:"ResetCtrl",resolve:{skipIfAuthenticated:a}}).otherwise({templateUrl:"partials/404.html"}),r.loginUrl="/login",r.signupUrl="/signup",r.facebook({url:"/auth/facebook",clientId:"980220002068787",redirectUri:"http://localhost:3000/auth/facebook/callback"}),r.google({url:"/auth/google",clientId:"631036554609-v5hm2amv4pvico3asfi97f54sc51ji4o.apps.googleusercontent.com"})}]).run(["$rootScope","$window",function(t,e){e.localStorage.user&&(t.currentUser=JSON.parse(e.localStorage.user))}]),angular.module("MyApp").controller("ContactCtrl",["$scope","Contact",function(t,e){t.sendContactForm=function(){e.send(t.contact).then(function(e){t.messages={success:[e.data]}})["catch"](function(e){t.messages={error:Array.isArray(e.data)?e.data:[e.data]}})}}]),angular.module("MyApp").controller("ForgotCtrl",["$scope","Account",function(t,e){t.forgotPassword=function(){e.forgotPassword(t.user).then(function(e){t.messages={success:[e.data]}})["catch"](function(e){t.messages={error:Array.isArray(e.data)?e.data:[e.data]}})}}]),angular.module("MyApp").controller("HeaderCtrl",["$scope","$location","$window","$auth",function(t,e,r,a){t.isActive=function(t){return t===e.path()},t.isAuthenticated=function(){return a.isAuthenticated()},t.logout=function(){a.logout(),delete r.localStorage.user,e.path("/")}}]),angular.module("MyApp").controller("LoginCtrl",["$scope","$rootScope","$location","$window","$auth",function(t,e,r,a,o){t.login=function(){o.login(t.user).then(function(t){e.currentUser=t.data.user,a.localStorage.user=JSON.stringify(t.data.user),r.path("/account")})["catch"](function(e){t.messages={error:Array.isArray(e.data)?e.data:[e.data]}})},t.authenticate=function(n){o.authenticate(n).then(function(t){e.currentUser=t.data.user,a.localStorage.user=JSON.stringify(t.data.user),r.path("/")})["catch"](function(e){e.error?t.messages={error:[{msg:e.error}]}:e.data&&(t.messages={error:[e.data]})})}}]),angular.module("MyApp").controller("ProfileCtrl",["$scope","$rootScope","$location","$window","$auth","Account",function(t,e,r,a,o,n){t.profile=e.currentUser,t.updateProfile=function(){n.updateProfile(t.profile).then(function(r){e.currentUser=r.data.user,a.localStorage.user=JSON.stringify(r.data.user),t.messages={success:[r.data]}})["catch"](function(e){t.messages={error:Array.isArray(e.data)?e.data:[e.data]}})},t.changePassword=function(){n.changePassword(t.profile).then(function(e){t.messages={success:[e.data]}})["catch"](function(e){t.messages={error:Array.isArray(e.data)?e.data:[e.data]}})},t.link=function(e){o.link(e).then(function(e){t.messages={success:[e.data]}})["catch"](function(e){a.scrollTo(0,0),t.messages={error:[e.data]}})},t.unlink=function(e){o.unlink(e).then(function(){t.messages={success:[response.data]}})["catch"](function(e){t.messages={error:[e.data]}})},t.deleteAccount=function(){n.deleteAccount().then(function(){o.logout(),delete a.localStorage.user,r.path("/")})["catch"](function(e){t.messages={error:[e.data]}})}}]),angular.module("MyApp").controller("ResetCtrl",["$scope","Account",function(t,e){t.resetPassword=function(){e.resetPassword(t.user).then(function(e){t.messages={success:[e.data]}})["catch"](function(e){t.messages={error:Array.isArray(e.data)?e.data:[e.data]}})}}]),angular.module("MyApp").controller("SignupCtrl",["$scope","$rootScope","$location","$window","$auth",function(t,e,r,a,o){t.signup=function(){o.signup(t.user).then(function(t){o.setToken(t),e.currentUser=t.data.user,a.localStorage.user=JSON.stringify(t.data.user),r.path("/")})["catch"](function(e){t.messages={error:Array.isArray(e.data)?e.data:[e.data]}})},t.authenticate=function(n){o.authenticate(n).then(function(t){e.currentUser=t.data.user,a.localStorage.user=JSON.stringify(t.data.user),r.path("/")})["catch"](function(e){e.error?t.messages={error:[{msg:e.error}]}:e.data&&(t.messages={error:[e.data]})})}}]),angular.module("MyApp").factory("Account",["$http",function(t){return{updateProfile:function(e){return t.put("/account",e)},changePassword:function(e){return t.put("/account",e)},deleteAccount:function(){return t["delete"]("/account")},forgotPassword:function(e){return t.post("/forgot",e)},resetPassword:function(e){return t.post("/reset",e)}}}]),angular.module("MyApp").factory("Contact",["$http",function(t){return{send:function(e){return t.post("/contact",e)}}}]);