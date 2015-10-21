(function () {

    "use strict";

    app.factory(
        "Personen",
        ['uuid2', '$cookies', '$http', function (uuid2, $cookies, $http) {


            var PersonenRepository, config = {};

            function Person(id) {
                this.id = id || uuid2.newuuid();
                this.name = '';
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

                    if (this.repository[id] === undefined) {
                        this.repository[id] = new Person(id);
                    }

                    return this.repository[id];

                },

                add: function (person) {


                    if (person && person.id) {
                        var id = person.id;
                    } else {
                        var id =  uuid2.newuuid();
                    }

                    var p = this.repository[id] || new Person(id);
                    this.repository[id] = p;

                    if (person) {
                        // preserve typeof
                        angular.forEach(person, function (value, key) {
                            if (p.hasOwnProperty(key)) p[key] = value;
                        })
                    }

                    return this;

                },
                removeAll: function () {

                    angular.forEach(this.repository, function (person,id) {

                       delete PersonenRepository[id];

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
                reload: function (url) {

                    this.removeAll().load(url,true);

                    return this;
                },

               save: function () {
                    $cookies.putObject('_Personen', this.repository);
                    return this;
                },


                load: function (url,forceload) {

                    if (url === config.url && !forceload) {
                        return this;
                    } else { }



                    url = url || config.url || false;

                    if (url) {
                        // GET request json data:
                        $http({
                            method: 'GET',
                            url: url,
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        }).then(function successCallback(response) {

                            console.log(response.data);

                            if (typeof response.data === 'object') {
                                angular.forEach(response.data, function (person) {
                                    PersonenRepository.add(person);
                                });
                            } else {
                                throw new Error("error loading json personen is type of " + typeof response.data);
                            }

                        }, function errorCallback(response) {
                            throw new Error("error loading json personen");
                        });

                        config.url = url;

                    } else {
                        if (!forceload) throw new Error("no personen url provided");
                    }


                    /*
                    // loads Personen from cookie object storage and returns the repository
                     angular.forEach($cookies.getObject('_Personen'),function(person) {
                        PersonenRepository.add(person);
                    });
                    */



                    return this;


                }


            };


            PersonenRepository = new Personen();
           // PersonenRepository.load();

            return PersonenRepository;


        }]
    );


}());