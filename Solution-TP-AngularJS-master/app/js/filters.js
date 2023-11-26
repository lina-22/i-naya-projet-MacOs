'use strict';

var filters = angular.module('filters', ['services']);

filters.filter('relativeTime', [function() {
    return function(input, now) {
        var result;
        if (input) {
            var date = moment(input);
            var difference = Math.abs(now.getTime() - date); // Écart en millisecondes.
            var tomorrow = moment(now).add(1, 'day');
            var yesterday = moment(now).subtract(1, 'day');
            if (difference < 2000) { // Moins de 2 secondes.
                result = date.isBefore(now) ? '\u00c0 l\u2019instant.' : 'Dans un instant.';
            } else if (difference < 60 * 1000) { // Moins d’une minute.
                result = (date.isBefore(now) ? 'Il y a ' : 'Dans ') + Math.floor(difference / 1000) + ' secondes.';
            } else if (difference < 120 * 1000) { // Moins de deux minutes.
                result = date.isBefore(now) ? 'Il y a une minute.' : 'Dans une minute.';
            } else if (difference < 3600 * 1000) { // Moins d’une heure.
                result = (date.isBefore(now) ? 'Il y a ' : 'Dans ') + Math.floor(difference / 60000) + ' minutes.';
            } else if (now.getFullYear() == date.year() && now.getMonth() == date.month() && now.getDate() == date.date()) { // Aujourd’hui.
                result = 'Aujourd\u2019hui \u00e0 ' + date.format('HH[h]mm.');
            } else if (tomorrow.year() == date.year() && tomorrow.month() == date.month() && tomorrow.date() == date.date()) { // Demain
                result = 'Demain \u00e0 ' + date.format('HH[h]mm.');
            } else if (yesterday.year() == date.year() && yesterday.month() == date.month() && yesterday.date() == date.date()) { // Demain
                result = 'Hier \u00e0 ' + date.format('HH[h]mm.');
            } else {
                result = date.format('[Le] DD/MM/YYYY \u00e0 HH[h]mm.');
            }
        } else {
            result = '';
        }
        return result;
    }
}]);

filters.filter('telUri', ['uriGenerator', function(uriGenerator) {
    return function(input) {
        if (input) {
            return uriGenerator.tel(input);
        } else {
            return '';
        }
    };
}]);
