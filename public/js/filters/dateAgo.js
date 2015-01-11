app.filter('dateAgo', function() {
    return function(input) {
        if(!input) return;
		return moment( new Date(input) ).add(30, 'seconds').add(1, 'minutes').utc().fromNow();
    };
});