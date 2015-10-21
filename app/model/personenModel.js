(function () {

    "use strict";

    app.constant(
        'PersonenConfig',
        {
            'url': 'http://localhost:63342/angular-seed/data/personen.json'

        }
    )


    app.factory(
        "Personen",
        ['uuid2', '$cookies', '$http', 'PersonenConfig', function (uuid2, $cookies, $http, PersonenConfig) {

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


                Object.defineProperties(this, {

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

                getName: function () {
                    return this.name;
                },
                setName: function (name) {
                    this.name = name;
                }


            };


            Personen.prototype = {

                getAll: function () {
                    return this.repository;
                },
                getById: function (id) {
                    return this.repository[id];
                },
                add: function (person) {
                    var p = new Person();
                    if (person) {
                        // preserve typeof
                        angular.forEach(person, function (value, key) {
                            if (p.hasOwnProperty(key)) p[key] = value;
                        })
                    }
                    this.repository[p.id] = p;
                    return p;

                },
                removeAll: function () {
                    angular.forEach(PersonenRepository, function (person) {
                        delete PersonenRepository[person.id];
                    });
                    return this;
                },
                removePerson: function (p) {
                    if (p instanceof Person) {
                        delete this[p.id];
                    } else {
                        throw new Error("Param 'p' is not an instance of Person");
                    }

                    return this;

                },
                reload: function () {
                    this.removeAll().load();
                    return this;
                },

                refresh: function () {
                    this.removeAll().load();
                    return this;
                },


                save: function () {
                    $cookies.putObject('_Personen', this.repository);
                    return this;
                },


                load: function () {


                     // loads Personen from cookie object storage and returns the repository
                     angular.forEach($cookies.getObject('_Personen'),function(person) {
                     PersonenRepository.add(person);
                     });



                    /*
                    // GET request json data:
                    $http({
                        method: 'GET',
                        url: PersonenConfig.url,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    }).then(function successCallback(response) {

                        if (typeof response.data === 'object') {
                            angular.forEach(response.data, function (person) {
                                PersonenRepository.add(person);
                            });
                        } else {
                            throw new Error("error loading json personen is type of "+typeof response.data);
                        }

                    }, function errorCallback(response) {
                        throw new Error("error loading json personen");
                    });


                     */



                    return this;


                }


            };


            PersonenRepository = new Personen();
            PersonenRepository.load();


            return PersonenRepository;


        }]
    );


}());