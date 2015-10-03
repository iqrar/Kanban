'use strict';

angular.module('kanbanApp')
  .controller('KanbanCtrl',['$scope', '$http',function ($scope,$http) {
   
   $scope.board = {
          
           Pending: [{type:"Pending"}],
           Backlog: [{type:"Backlog"}],
           Development:[{type:"Development"}],
           Test:[{type:"Test"}],
           Deploy: [{type:"Deploy"}]
    };

    // Get all stories
	$http.get('http://176.34.78.245/stories').success(function(data){
	         $scope.data = data;
	   	     $scope.data.forEach(function(item){
	             
	               if( item.state === "Pending"){
		                  $scope.board.Pending.push(item);
		            }else  if( item.state === "Backlog"){
	                      $scope.board. Backlog.push(item);
                    }else  if( item.state === "Development"){
	                      $scope.board.Development.push(item);
	                }else  if( item.state === "Test"){
	                      $scope.board.Test.push(item);
                    }else  if( item.state === "Deploy"){
	                      $scope.board.Deploy.push(item);
	                }
	   	     });
	   	   
	});

	$scope.story = {};

    // create new story
    $scope.createStory = function(){
       
       $http.post('http://176.34.78.245/stories' ,$scope.story)
        .success(function(data){

          if(data.state === 'Pending'){
            $scope.board.Pending.push(data);
          }else if(data.state === 'Development'){
            $scope.board.Development.push(data);
          }else if(data.state === 'Backlog'){
            $scope.board.Backlog.push(data);
          }else if(data.state === 'Test'){
            $scope.board.Test.push(data);
          }else if(data.state === 'Deploy'){
            $scope.board.Deploy.push(data);
          }
           $scope.story.title = "";
		   $scope.story.user_id = "";
		   $scope.story.state = "";

        }).error(function(){

          alert('Pleae create agian');

       });
    };

    // Delete story
	$scope.removeStroy = function(id ,state, index){
      
       alert('Are you sure to delete');
	   if(state === 'Pending'){
            $scope.board.Pending.splice(index,1);
          }else if(state === 'Development'){
            $scope.board.Development.splice(index,1);
          }else if(state === 'Backlog'){
            $scope.board.Backlog.splice(index, 1);
          }else if(state === 'Test'){
            $scope.board.Test.push(index, 1);
          }else if(state === 'Deploy'){
            $scope.board.Deploy.splice(index, 1);
        }

       $http.delete('http://176.34.78.245/stories/' +id).success(function(data){
          
        }).

       error(function(){
         alert('Please delete agian');
       });
	};

    // Upadte states and restricting columns
    $scope.sortableOptions = {

	    containment: '#sortable-container',
	    scrollableContainer: '#sortable-container',
        dragEnd :function(sourceItemScope,  destScope,  destSortableScope) {

           var story = sourceItemScope.source.itemScope.modelValue;
	       var id = story.id;
	       var currentState = sourceItemScope.dest.sortableScope.modelValue[0].type;
	       story.state = currentState;

	       $http.put('http://176.34.78.245/stories/'+id, story).success(function(data){
	       	
            });
	    },
	    
	     //restrict move across columns. move only within neighbour columns.
	    accept: function (sourceItemHandleScope, destSortableScope) {
		     
		       if( destSortableScope.modelValue[0].type === "Backlog" &&
		             sourceItemHandleScope.itemScope.modelValue.state === "Pending" || 
		             destSortableScope.modelValue[0].type === "Pending" &&  
		              sourceItemHandleScope.itemScope.modelValue.state === "Backlog"){
		       	      return true;

		       }else if( destSortableScope.modelValue[0].type === "Backlog" &&
		             sourceItemHandleScope.itemScope.modelValue.state === "Backlog" || 
		             destSortableScope.modelValue[0].type === "Pending" &&  
		              sourceItemHandleScope.itemScope.modelValue.state === "Pending") {
		       	      return true;

		       }else if( destSortableScope.modelValue[0].type === "Development" &&
		             sourceItemHandleScope.itemScope.modelValue.state === "Backlog" || 
		             destSortableScope.modelValue[0].type === "Backlog" &&  
		              sourceItemHandleScope.itemScope.modelValue.state === "Development"){
		       	      return true;

		       }else if( destSortableScope.modelValue[0].type === "Development" &&
		             sourceItemHandleScope.itemScope.modelValue.state === "Development" || 
		             destSortableScope.modelValue[0].type === "Backlog" &&  
		              sourceItemHandleScope.itemScope.modelValue.state === "Backlog"){
		       	      return true;
		       }else if( destSortableScope.modelValue[0].type === "Development" &&
		             sourceItemHandleScope.itemScope.modelValue.state === "Test" || 
		             destSortableScope.modelValue[0].type === "Test" &&  
		              sourceItemHandleScope.itemScope.modelValue.state === "Development"){
		       	      return true;

		       }else if( destSortableScope.modelValue[0].type === "Development" &&
		             sourceItemHandleScope.itemScope.modelValue.state === "Development" || 
		             destSortableScope.modelValue[0].type === "Test" &&  
		              sourceItemHandleScope.itemScope.modelValue.state === "Test"){
		       	      return true;

		       }else if( destSortableScope.modelValue[0].type === "Deploy" &&
		             sourceItemHandleScope.itemScope.modelValue.state === "Test" || 
		             destSortableScope.modelValue[0].type === "Test" &&  
		              sourceItemHandleScope.itemScope.modelValue.state === "Deploy"){
		       	      return true;

		       }else if( destSortableScope.modelValue[0].type === "Deploy" &&
		             sourceItemHandleScope.itemScope.modelValue.state === "Deploy" || 
		             destSortableScope.modelValue[0].type === "Test" &&  
		              sourceItemHandleScope.itemScope.modelValue.state === "Test"){
		       	      return true;

		       }
	    }
    };

    

}]);















