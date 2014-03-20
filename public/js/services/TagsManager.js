'use strict';

// TagsManager. The class to controll all the social interfaces
angular.module('mean.system').service('TagsManager', function() {
   
    this._searchQuery = '';

    this._handles = [];
    this._results = {};

    this._isLocked = false;
    this.responseHandle = null;

    /**
    * Makes an initialization all of search interfaces, if it's needed to
    */
    this.initialize = function () {

        for (index in this._handles) {
            if (this._handles[index]._initialize) {
                this._handles[index]._initialize();
            }
        }

        return true;
    }

    /**
    * Makes registration of new search interface to work with
    * @param {Object} handle
    */
    this.registerSearchInterface = function(handle) {
        
        this._handles.push(handle);

        return true;
    }

    /**
    * Returns current search query string (tag)
    */
    this.getSearchQuery = function() {
        return this._searchQuery;
    }

    /**
    * Applies new search query string (tag) to making searches by
    * @param {String} searchQuery
    */
    this.search = function(searchQuery) {

        if (searchQuery.length == 0) {
            return false;
        }

        for (var i = 0; i < this._handles.length; i++) {
            if (this._handles[i]._reset) {
                this._handles[i]._reset();
            }
        }

        this._searchQuery = searchQuery;

        return true;
    }

    /**
    * Returns few next search results base of search query
    */
    this.getNext = function() {

        if (!this.responseHandle) {
            return false;
        }

        var callback = this.responseHandle;

        var request = {
            'results': [],
            'handles': {
                'active': 0
            }
        };

        for (var i = 0; i < this._handles.length; i++) {
            
            request.handles.active++;

            this._handles[i]._getNext(this._searchQuery, function(response) {

                request.handles.active--;

                if (response.status == true) {
                    for (i in response.results) {
                        request.results.push(response.results[i]);
                    }
                }

                document.dispatchEvent(new Event('ON_REQUEST_COMPLETE'));
            });
        }


        document.addEventListener('ON_REQUEST_COMPLETE', function(e) {

            if (request.handles.active == 0) {
                // Make an order by timestamp

                return callback({'status': true, 'results': request.results});
            }
        });
    }
});
