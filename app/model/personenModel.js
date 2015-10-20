(function () {

    "use strict";

   app.factory(
       "Personen",
       ['uuid2','$cookies',function(uuid2,$cookies) {

           var PersonenRepository;


           function Person() {
               this.id = uuid2.newuuid();
               this.name = 'unbekannt';
               this.toString = function () {
                   return this.name;
               }
               return this;
           }

           function Personen() {
               Object.defineProperties(this,{

                   'repository': {
                       get: function () {
                           return this;
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
               add: function(person) {
                   var p = new Person();
                   if (person) {
                       // preserve typeof
                       angular.forEach(person,function(value,key) {
                            if (p.hasOwnProperty(key)) p[key] = value;
                       })
                   }
                   this.repository[p.id] = p;
               },
               removePerson : function(p) {
                    if (p instanceof Person) {
                        delete this[p.id];
                    } else {
                        throw new Error("Param 'p' is not an instance of Person");
                    }
                   //
               },
               save : function() {
                   $cookies.putObject('_Personen',this.repository)
               }

           };

           // loads Personen from cookie object storage and returns the repository
           PersonenRepository = new Personen();
           angular.forEach($cookies.getObject('_Personen'),function(person) {
               PersonenRepository.add(person);
           });
           return PersonenRepository;



       }]
   );


}());