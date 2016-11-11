
angular.module('myApp', ['ngMessages', 'ngAnimate'])
.config(function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	})
    .controller('FlickrController', function($http, $sce){
    	var vm = this;
    	vm.loader=0;
    	this.searchterm=null

    	this.trustSrc = function(src) {
	  		return $sce.trustAsResourceUrl(src);
		};

    	this.searchFlickr = function(searchterm){
    		vm.searchterm = searchterm;
    		var url = 'https://api.flickr.com/services/rest';
    		vm.loader=1;
    		var request = {
    			method: 'flickr.photos.search',
    			api_key: '51568f03e2feb491fbdd430d556251ef',
    			tags: searchterm,
    			format: 'json',
    			nojsoncallback: 1,
    			per_page: 9
			}

    		$http({
    			url: 'https://api.flickr.com/services/rest',
    			method: 'GET',
    			params: request
  			}).then(function(response) {
    			vm.results = response.data.photos.photo;
    			//V stops loading bar after search is done
    			vm.loader=2;
                vm.searchterm = null

  			},
  			function(response) {
    			console.log('Failure :(');
                vm.searchterm = null
    			vm.loader=3;
  			});
  		}
  	});







// angular.module("myApp").config(["$provide",function(n){n.decorator("$http",["$delegate","$timeout",function(n,t){return n.put=function(n){var e,o,r={then:function(n,t){return e=n,o=t,this}};return t(function(){n.indexOf("broken")<1?e():o()},3e3),r},n}])}]);



