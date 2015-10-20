(function () {

    "use strict";

   app.factory(
       "Personen",
       ['$rootScope','uuid2','$cookies',function($rootScope,uuid2,$cookies) {

           $rootScope._Personen = $cookies.getObject('_Personen') || {};

           function Person() {
               this.id = uuid2.newuuid();
               this.name = 'unbekannt';
               return this;
           }

           function Personen() {
               Object.defineProperties(this,{

                   'repository': {
                       get: function () {
                           return $rootScope._Personen;
                       },
                       configurable: false,
                       enumerable: false

                   }
               });
           }

           Person.prototype = {

               getName : function() {
                   return this.name;
               },
               setName : function(name) {
                   this.name = name;
               }

           };


           Personen.prototype = {

               getAll : function() {
                   return this.repository;
               },
               getById : function(id) {
                   return this.repository[id];
               },
               addPerson : function() {

                   var p = new Person();
                   this.repository[p.id] = p;
               },
               save : function() {
                   $cookies.putObject('_Personen',this.repository)
               }

           };



         return new Personen;



       }]
   );


}());