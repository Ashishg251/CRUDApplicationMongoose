var myApp = angular.module('myApp', []);

myApp.controller('myController', function($scope, $http, $log) {
    
    var refresh = function() {
        $http.get('/students')
             .success(function(response) {
            $scope.studentList = response;
            });    
    }
    refresh();
    
    $scope.addStudent = function() {
        $log.log($scope.student);
        $http.put('/students', $scope.student)
             .success(function(response) {
            $log.debug("response is "+response);
            $log.info("Data is sent from angluar to node");
        })
             .error(function(err, status) {
            $log.error("Error is "+err);
            $log.error("Status is "+status);
        });
        refresh();
        $scope.student = {};
    };
    
    $scope.deleteStudent = function(id) {
        $log.warn(id+" is to be deleted");
        $http.delete('/students/' + id)
             .success(function(response) {
            $log.log("student record is sent for deletion");
        })
             .error(function(err, status) {
            $log.error("Error is "+err);
            $log.error("Status is "+status);
        });
        refresh();
    }
    
    $scope.editStudent = function(id) {
        $http.get('/students/' + id)
             .success(function(response) {
            $scope.student = response;
        })
             .error(function(err, status) {
            $log.error("Error is "+err);
            $log.error("Status is "+status);
        });
        refresh();
    };
    
    $scope.updateStudent = function(id) {
        $http.put('/students/' + id, $scope.student)
             .success(function(response) {
            console.log("gone for updation");
        })
             .error(function(err, status) {
            $log.error("Error is "+err);
            $log.error("Status is "+status);
        });
        refresh();
        $scope.student = {};
    };
    
});