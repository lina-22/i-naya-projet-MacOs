'use strict';

describe('The service', function() {

    beforeEach(module('services'));

    describe('uriGenerator', function() {
        var uriGenerator;

        beforeEach(inject(function(_uriGenerator_) {
            uriGenerator = _uriGenerator_;
        }));

        it('should convert French tel numbers to URIs', function() {
            expect(uriGenerator.tel('01 23 45 67 89')).toBe('tel:+33-123456789');
            expect(uriGenerator.tel('01.23.45.67.89')).toBe('tel:+33-123456789');
            expect(uriGenerator.tel('01-23-45-67-89')).toBe('tel:+33-123456789');
            expect(uriGenerator.tel('0123456789')).toBe('tel:+33-123456789');
        });

        it('should convert international tel numbers to URIs', function() {
            expect(uriGenerator.tel('00 1 123 456')).toBe('tel:+1123456');
            expect(uriGenerator.tel('00 42 AZERTY')).toBe('tel:+42AZERTY');
            expect(uriGenerator.tel('0032123456')).toBe('tel:+32123456');
        });

        it('should left unparsable tel numbers as is', function() {
            expect(uriGenerator.tel('18')).toBe('tel:18');
            expect(uriGenerator.tel('3615')).toBe('tel:3615');
        });

    });

    describe('contactEditor', function() {
        var scope;
        var a, b, c;

        beforeEach(inject(function(contactEditor) {
            a = {order: 0};
            b = {order: 1};
            c = {order: 2};
            scope = {contact: {fields:[b, a, c]}};
            contactEditor.addBehavior(scope);
        }));

        it('should add behavior to $scope objects', function() {
            expect(scope.save).toEqual(jasmine.any(Function));
            expect(scope.remove).toEqual(jasmine.any(Function));
            expect(scope.addField).toEqual(jasmine.any(Function));
        });

        describe('remove method', function() {

            it('should remove the given field', function() {
                expect(scope.contact.fields.length).toBe(3);
                expect(scope.contact.fields.indexOf(a)).not.toBe(-1);
                expect(scope.contact.fields.indexOf(b)).not.toBe(-1);
                expect(scope.contact.fields.indexOf(c)).not.toBe(-1);

                scope.remove(a);

                expect(scope.contact.fields.length).toBe(2);
                expect(scope.contact.fields.indexOf(a)).toBe(-1);
                expect(scope.contact.fields.indexOf(b)).not.toBe(-1);
                expect(scope.contact.fields.indexOf(c)).not.toBe(-1);

                scope.remove(b);

                expect(scope.contact.fields.length).toBe(1);
                expect(scope.contact.fields.indexOf(a)).toBe(-1);
                expect(scope.contact.fields.indexOf(b)).toBe(-1);
                expect(scope.contact.fields.indexOf(c)).not.toBe(-1);

                scope.remove(c);

                expect(scope.contact.fields.length).toBe(0);
            });

            it('should reorder remaining fields', function() {
                expect(a.order).toBe(0);
                expect(b.order).toBe(1);
                expect(c.order).toBe(2);

                scope.remove(b);

                expect(a.order).toBe(0);
                expect(c.order).toBe(1);

                scope.remove(a);

                expect(c.order).toBe(0);
            });

            it('should reorder *all* remaining fields', function() {
                expect(a.order).toBe(0);
                expect(b.order).toBe(1);
                expect(c.order).toBe(2);

                scope.remove(a);

                expect(b.order).toBe(0);
                expect(c.order).toBe(1);
            });

        });

        describe('addField method', function() {
            var fields;

            beforeEach(function() {
                fields = scope.contact.fields;
            });

            it ('should create a new field', function() {
                var oldLength = fields.length;
                scope.addField('foo');
                expect(fields.length).toBe(oldLength + 1);
                scope.addField('bar');
                expect(fields.length).toBe(oldLength + 2);
            });

            it ('should add a field of correct type', function() {
                scope.addField('foo');
                expect(fields[fields.length - 1].type).toBe('foo');
                scope.addField('bar');
                expect(fields[fields.length - 1].type).toBe('bar');
            });

            it('should set the new field order to be the highest order + 1', function() {
                var highestOrder = -1;
                for (var i = 0; i < fields.length; i++) {
                    if (fields[i].order > highestOrder) {
                        highestOrder = fields[i].order;
                    }
                }

                scope.addField('foo');
                expect(fields[fields.length - 1].order).toBe(highestOrder + 1);

                scope.addField('bar');
                expect(fields[fields.length - 1].order).toBe(highestOrder + 2);
            });

            it('should set the new field order to 0 if no fields exists', function() {
                while(fields.length > 0) {
                    fields.shift();
                }

                scope.addField('foo');

                expect(fields.length).toBe(1);
                expect(fields[0].order).toBe(0);
            });

        });

    });

});
