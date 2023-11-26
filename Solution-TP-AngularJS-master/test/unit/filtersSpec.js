'use strict';

describe('The filter ', function() {

    beforeEach(module('filters'));

    describe('telUri', function() {
        var filter;

        beforeEach(inject(function(telUriFilter) {
            filter = telUriFilter;
        }));

        it('should not fail with no input', function() {
            expect(filter()).toBe('');
        });

        it('should convert tel numbers', function() {
            expect(filter('01 23 45 67 89')).toBe('tel:+33-123456789');
            expect(filter('3117')).toBe('tel:3117');
            expect(filter('0032123456')).toBe('tel:+32123456');
        });

    });

    describe('relativeTime', function() {
        var filter, now;
        var before = function(seconds) {
            return (new Date(now.getTime() - seconds * 1000)).toJSON();
        };
        var after = function(seconds) {
            return before(-seconds);
        };
        var todayAt = function(hours, minutes) {
            return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes).toJSON();
        };
        var yesterdayAt = function(hours, minutes) {
            return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, hours, minutes).toJSON();
        };
        var tomorrowAt = function(hours, minutes) {
            return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, hours, minutes).toJSON();
        }

        beforeEach(inject(function(relativeTimeFilter) {
            filter = relativeTimeFilter;
            now = new Date(2015, 6, 28, 16, 31);
        }));

        it('should not fail with no input', function() {
            expect(filter()).toBe('');
            expect(filter(undefined, now)).toBe('');
        });

        it('should display relative time for recent instants', function() {
            expect(filter(before(1), now)).toBe('À l’instant.');
            expect(filter(before(4), now)).toBe('Il y a 4 secondes.');
            expect(filter(before(60), now)).toBe('Il y a une minute.');
            expect(filter(before(5 * 60), now)).toBe('Il y a 5 minutes.');
        });

        it('should display only time for today', function() {
            expect(filter(todayAt(0, 12), now)).toBe('Aujourd’hui à 00h12.');
            expect(filter(todayAt(0, 36), now)).toBe('Aujourd’hui à 00h36.');
            expect(filter(todayAt(15, 0), now)).toBe('Aujourd’hui à 15h00.');
            expect(filter(todayAt(18, 0), now)).toBe('Aujourd’hui à 18h00.');
            expect(filter(todayAt(22, 33), now)).toBe('Aujourd’hui à 22h33.');
        });

        it('should display only time for tomorrow and yesterday', function() {
            expect(filter(tomorrowAt(1, 25), now)).toBe('Demain à 01h25.');
            expect(filter(tomorrowAt(14, 32), now)).toBe('Demain à 14h32.');

            expect(filter(yesterdayAt(5, 12), now)).toBe('Hier à 05h12.');
            expect(filter(yesterdayAt(18, 6), now)).toBe('Hier à 18h06.');
        });

        it ('should display absolute time for old instants', function() {
            expect(filter(new Date(2005, 11, 25, 14, 32).toJSON(), now)).toBe('Le 25/12/2005 à 14h32.');
            expect(filter(new Date(1935, 1, 5, 8, 26).toJSON(), now)).toBe('Le 05/02/1935 à 08h26.');
        });

        it('should display relative time for near future instants', function() {
            expect(filter(after(1), now)).toBe('Dans un instant.');
            expect(filter(after(3), now)).toBe('Dans 3 secondes.');
            expect(filter(after(60), now)).toBe('Dans une minute.');
            expect(filter(after(12 * 60), now)).toBe('Dans 12 minutes.');
        });

        it('should display absolute time for far future instants', function() {
            expect(filter(new Date(2025, 5, 23, 17, 52).toJSON(), now)).toBe('Le 23/06/2025 à 17h52.');
            expect(filter(new Date(2253, 0, 1, 0, 0).toJSON(), now)).toBe('Le 01/01/2253 à 00h00.');
        });

    });

});
