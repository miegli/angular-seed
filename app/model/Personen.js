(function () {

    "use strict";

    app.factory(
        "Personen",
        ['uuid2', '$cookies', '$http', function (uuid2, $cookies, $http) {

            var Repository, config = {};


            // define Model
            function Model(id) {

                // add properties
                this.name = '';
                this.vorname = '';

                // return this sealed model width uuid
                this.id = id || uuid2.newuuid();
                return Object.seal(this);

            }

            // extend some custom prototype functions
            Model.prototype = {

                getFullname: function () {
                    return this.name + " " + this.vorname;
                }

            };


            // define Repository Repository, don't change it
            function Repository() {
                Object.defineProperties(this, {
                    'repository': {
                        get: function () {
                            return this;
                        },
                        configurable: false,
                        enumerable: false
                    }
                });


                return this;
            }


            // extend repository prototype functions
            Repository.prototype = {

                // get all instance of model (dont'change)
                getAll: function () {

                    return this.repository;


                },

                countAll: function () {

                    return Object.keys(this.repository).length;

                },

                // get instance by model id (dont'change)
                getById: function (id) {
                    if (this.repository[id] === undefined) {
                        this.repository[id] = new Model(id);
                    }

                    return this.repository[id];
                },

                // add new instance of model (dont'change)
                add: function (person) {

                    var id, p;

                    if (person && person.id) {
                        id = person.id;
                    } else {
                        id = uuid2.newuuid();
                    }

                    p = this.repository[id] || new Model(id);
                    this.repository[id] = p;

                    if (person) {
                        // preserve typeof
                        angular.forEach(person, function (value, key) {
                            if (p.hasOwnProperty(key)) p[key] = value;
                        })
                    }

                    return this;

                },

                // remove all instances of model (dont'change)
                removeAll: function () {
                    angular.forEach(this.repository, function (person, id) {
                        delete Repository[id];

                    });
                    return this;
                },

                // remove an instance of model (dont'change)
                remove: function (p) {
                    if (p instanceof Model) {
                        delete this[p.id];
                    } else {
                        throw new Error("Param 'p' is not an instance of Model");
                    }
                    return this;

                },
                // reload repository (dont'change)
                reload: function (url) {
                    if (config.reloader) eval(config.reloader);
                    return this;
                },


                loadJson: function (url, forceload) {

                    // register last loading function for later reload
                    config.reloader = 'this.loadJson("' + url + '",true)';

                    if (url === config.url && !forceload) {
                        return this;
                    }

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

                            // clear repository
                            Repository.removeAll();

                            console.log(response);

                            // fill repository
                            if (typeof response.data === 'object') {
                                angular.forEach(response.data, function (person) {
                                    Repository.add(person);
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


                    return this;


                },

                loadFromCookie: function (cookieName) {

                    // register last loading function for later reload
                    config.reloader = 'this.loadFromCookie("' + cookieName + '")';

                    if (cookieName === config.cookieName && !forceload) {
                        return this;
                    }

                    cookieName = cookieName || config.cookieName || false;

                    // clear repository
                    Repository.removeAll();

                    // loads Repository from cookie object storage and returns the repository
                    angular.forEach($cookies.getObject(cookieName), function (person) {
                        Repository.add(person);
                    });

                    return this;

                },

                saveToCookie: function (cookieName) {
                    $cookies.putObject(cookieName, this.repository);
                    return this;
                },

                serialize: function () {
                    return JSON.stringify(this.repository);
                }


            };


            Repository = new Repository();
            return Repository;


        }]
    );


}());