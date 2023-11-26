'use strict';

var services = angular.module('services', ['ngResource']);

services.factory('uriGenerator', [function() {
    return {
        tel: function(number) {
            number = number.replace(/[\s\-._]/g, '');
            if (number.length > 2 && number[0] == '0' && number[1] == '0') {
                /* Numéro international. */
                return 'tel:+' + number.substring(2);
            } else if (number.length == 10 && number[0] == '0') {
                /* Numéro français */
                return 'tel:+33-' + number.substring(1);
            } else {
                /* Format non reconnu, on laisse le numéro tel quel. */
                return 'tel:' + number;
            }
        }
    }
}]);

services.factory('Contact', ['$resource', function($resource) {
    return $resource('http://vip46.groupehn.com:20003/angularjs/tpangularjs.php/:id', {id:'@id'});
}]);

services.factory('contactEditor', ['$location', function($location) {
    return {
        addBehavior: function($scope) {
            $scope.save = function() {
                $scope.saving = true;
                $scope.contact.$save({}, function() {
                    $location.path('/' + $scope.contact.id);
                }, function(response) {
                    $scope.saving = false;
                    $scope.msg = response.data;
                    console.warn(response);
                });
            };
            $scope.remove = function(field) {
                var fields = $scope.contact.fields;
                fields.splice(fields.indexOf(field), 1);
                for (var i = 0; i < fields.length; i++) {
                    if (fields[i].order > field.order) {
                        fields[i].order--;
                    }
                }
            };
            $scope.addField = function(type) {
                var fields = $scope.contact.fields;
                fields.push({name:'', value:'', order:fields.length, type:type});
            };
            $scope.title = function(field) {
                switch(field.type) {
                case 'TEXT':
                    return 'Texte libre';
                case 'TEL':
                    return 'Numéro de téléphone';
                case 'URL':
                    return 'URL';
                case 'EMAIL':
                    return 'Adresse email';
                case 'DATE':
                    return 'Date';
                case 'TIME':
                    return 'Heure';
                case 'DATETIME':
                    return 'Date et heure';
                default:
                    return '';
                }
            };
            $scope.$watch('contact.fields.length', function() {
                $scope.$evalAsync(function() {
                    $('[data-toggle="tooltip"]').tooltip({placement:'right'});
                });
            });
            $('dl').sortable({
                items: '> dt.additional',
                handle: '.handle',
                start: function(event, ui) {
                    for (var dd = ui.item.next(); dd && (dd.is('dd') || dd.is(ui.placeholder)); dd = dd.next()) {
                        if (!dd.is(ui.placeholder)) {
                            dd.data('helper', true);
                        }
                    }
                },
                sort: function(event, ui) {
                    var height = ui.item.height();
                    for (var dd = ui.item.next(); dd && (dd.is('dd') || dd.is(ui.placeholder)); dd = dd.next()) {
                        if (!dd.is('.ui-sortable-placeholder')) {
                            dd.css('position', 'absolute');
                            dd.css('top', (ui.position.top + height) + 'px');
                            dd.css('left', ui.position.left + 'px');
                            height += dd.height();
                        }
                    }
                },
                change: function(event, ui) {
                    while(ui.placeholder.next().is('dd') && !ui.placeholder.next().data('helper')) {
                        ui.placeholder.next().after(ui.placeholder);
                    }
                },
                stop: function(event, ui) {
                    $scope.$apply(function() {
                        $('dl > dd').css('position', 'static');
                        $('dl > dd').data('helper', false);
                        $('dl > dt.additional').each(function (index) {
                            $(this).scope().field.order = index;
                        });
                    });
                }
            });
        }
    };
}]);
