;var GooglePlusSearchInterface = function() {

    this._clientId = '217890034574-0smms3rs5iu156muakncuhdncbjfh6v2.apps.googleusercontent.com';
    this._apiKey = 'AIzaSyDUAClYmjQoPfFDvnUZVTn3W5TonOzapsE';
    this._scopes = ['https://www.googleapis.com/auth/plus.me'];

    this._nextPageToken = null;

    var _this = this;

    /**
    * Runs on every new search request
    */
    this._reset = function() {
        this._nextPageToken = null;
    }

    /**
    * Returns results of a search into callback function
    * @param {String} query
    * @param {Function} callback
    */
    this._getNext = function(query, callback) {
        var g = gapi;

        g.client.load('plus', 'v1', function() {

            var request = gapi.client.plus.activities.search({
                'query' : '#' + query
            });

            request.execute(function(resp) {
                
                if (resp.error) {
                    return callback({'status': false, 'error': resp.error});
                }
                
                if (resp.nextPageToken) {
                    // 
                }

                return callback({'status': true,  'results': resp.items});
            });
       });
    }

    /**
    * Initialize Google+ API client
    * @param {Object} gapi
    */
    this.onLoad = function() {
        gapi.client.setApiKey(this._apiKey);
        window.setTimeout(this._handleAuth(false), 2);
    }

    /**
    * Makes check for authorization of an user
    * @param {String} searchQuery
    */
    this._handleAuth = function (immediateSt) {
        gapi.auth.authorize({client_id: _this._clientId, scope: _this._scopes, immediate: true}, function(authResult) {
            console.log(authResult);
        });
    }

    document.addEventListener('ON_GOOGLE_PLUS_LOAD', function() {
        _this.onLoad();
    });
}
