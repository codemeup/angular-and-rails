var rafflerApp = angular.module("raffler", ["rails"]);
//note Raffler above is capitalized - it doesn't need to be BUT in the html file it does need to be lowercase - here <html ng-app="raffler" > because html takes lower case

rafflerApp.factory("Player", function(railsResourceFactory){
  var resource = railsResourceFactory({
    url: '/players',
    name: 'player'});
  return resource;
});
//this is a relly powerful tool.
//this rails gem gives us the railsResourceFactory - a factory is like a super object or a service.
//re create this factory and return it and by doing that we can do in our controller things like name.query (see notes)
//it's restful methods in angular - there's a bunch of AJAX going on under the hood but we dont have to bother writing it.
//then we have to add "rails" to the array brackets [] above in line 1.

//now we have to require "Player"
rafflerApp.controller("RafflerController", ["$scope", "Player", function($scope, Player){
 Player.query().then(function(results){
    $scope.players = results;
  });

 $scope.addPlayer = function(){
  console.log($scope.newName);
  var newPlayer = new Player({
    name: $scope.newName,
  });
  newPlayer.create().then(function(newPlayerInRailsCreatedIHope){
    console.log("From rails:" + newPlayerInRailsCreatedIHope);
    $scope.players.push(newPlayerInRailsCreatedIHope);
});
//see the players controller for params.permit! lines - this is the last part in allowing us to add a player
};

}]);

//the below replaced with the ebove
// rafflerApp.controller("RaffleController", ["$scope", function($scope){

// }]);

//the addPlayer function for the form on the index page:
