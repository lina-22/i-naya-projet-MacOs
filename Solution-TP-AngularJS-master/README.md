# Solution TP AngularJS de HN Institut

Attention, ceci n’est pas *la* solution, mais *un exemple* de solution.
Il n’y a jamais une seule solution possible à un problème informatique.

## Exercice 14

* Pas de tests pour le service *Contact* car cela reviendrait essentiellement
  à tester le service *$resource* fourni par AngularJS.
* Les modules sont testés un par un. Il faut donc commencer les tests par :
  `beforeEach(module('nomModule'));` et pas par :
  `beforeEach(module('contacts'));`.
* Les tests du filtre *relativeTime* ne doivent pas dépendre de l’heure système.
  Le paramètre `now` se voit donc affecter une date prédéfinie.
* Impossible de faire pareil pour le test de *ContactsDetailCtrl* car celui-ci
  appelle `new Date()` directement. Cela signifie qu’en cas de bug dans la
  gestion des dates, le test peux réussir à certaines heures et échouer à
  d’autres.
* Dans le test de *ContactsEditCtrl*, un objet `talon` est cloné grâce aux
  méthode [JSON.parse()][JSON.parse] et [JSON.stringify()][JSON.stringify].
  Cloner cet objet est très important pour que le test ait un sens.
* Le matcher *toEqualData* utilise la méthode
  [angular.equals()][angular.equals].
  Cela permet de ne pas comparer les méthodes,
  ni les propriétés dont le nom commence par ‘$’.
* Le matcher *toEqualNow* accepte un écart de 100ms pour tenir compte de la durée
  d’exécution du test.

[JSON.parse]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
[JSON.stringify]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
[angular.equals]: https://docs.angularjs.org/api/ng/function/angular.equals

## Exercice 13

* Il suffit d’enregistrer la valeur de retour de la requête dans le modèle
  en cas d’erreur. 
* Utilisation d’un simple paragraphe pour afficher les messages à destination
  de l’utilisateur.

## Exercice 12

* Dans un filtre, toujours gérer le cas où la donnée en entrée n’est pas
  définie. Renvoyer une chaîne vide est souvent le mieux dans ce cas.
* Un composant AngularJS peut dépendre d’un filtre comme si c’était un service
  en utilisant « *filterName*Filter » comme dépendance.
* Il est aussi possible de dépendre du service [$filter][$filter].
* Le filtre *relativeTime* accepte en entrée tous les format de date acceptés
  par [Date.parse()][Date.parse], y compris le format ISO 8601 renvoyé par le
  web-service.
* Le filtre *relativeTime* prend la date courrante en paramètre. Si
  `new Date()` était utilisé dans le filtre, celui-ci ne pourrait pas être
  réexécuté à intervalles réguliers.
* Le contrôleur *ContactsDetailCtrl* met à jour la variable du modèle `now`
  toutes les secondes. Comme celle-ci est utilisée en paramètre du filtre, ce
  dernier est réexécuté toutes les secondes.
  Bien sûr, il est possible de prendre un intervalle différent.
  C’est un choix à faire entre précision et performance.
* Il ne faut pas oublier de désactiver le timer une fois qu’il est inutile.
  Utiliser `$scope.$on('$destroy', …)` pour cela.

[$filter]: https://docs.angularjs.org/api/ng/service/$filter
[Date.parse]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse

## Exercice 11

* Ajout du champ `.delay` dans l’objet donné à *$resource* pour créer *Contact*.
  Cela ajoute « ?delay=3 » à chaque requète envoyée au web-service.
* Le premier paramètre de [scope.$watch()][scope.$watch] peut être une chaîne
  de caractère contenant une expression à évaluer. Ici, c’est simplement le
  nom d’une variable du modèle local à la directive.
* `scope: {loading: '=hnLoading'}` permet de créer un modèle local dans la
  directive, avec une seule variable. Cette variable est liée à une valeur
  du modèle du contrôleur via le paramètre de l’attribut `hn-loading`.
* Bien penser à supprimer le curseur avec `scope.$on('$destroy')`.
* Dans les différents modèles HTML, l’attribut `hn-loading` prends différentes
  valeurs, et nottament des expressions. Ça marche aussi !
* L’utilisation de la directive *ngShow* permet de ne pas afficher certaines
  parties de la page pendant le chargement.
* *ngShow* est inutile sur la liste des contacts, car dans cette page,
  `$scope.contacts` vaut `[]` pendant toute la durée du chargement.

[scope.$watch]: https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$watch

## Exercice 10

* L’API du web-service *tpangularjs.php* a été soigneusement choisie pour
  correspondre à l’API interrogée par défaut par le service *$resource*.
  Il est toutefois possible de configurer *$resource* pour interroger d’autres
  API.
* L’API imposée au service *Contact* dans l’énoncé de l’exercice 7 a été
  soigneusement choisie pour correspondre à l’API fournie par défaut par le
  service *$resource*. Il est toutefois possible de fournir des API légèrement
  différentes.
* Lorsque le paramètre `.id` n’est pas fourni (dans les appels à `.query()` par
  exemple), le paramètre « :id » de l’URL est supprimé.

## Exercice 9

* Dans la méthode `$save()`,
  penser à mettre à jour `self` après le succès de l’appel à `$http.post()`.
* Attention, les callbacks doivent être appelées tout à la fin de chaque
  méthode, une fois le modèle mis à jour.

## Exercice 8

* Création d’un contrôleur et d’un modèle HTML pour chaque type de page.
* Les pages d’édition d’un contact et de création d’un nouveau contact
  sont très semblables. Elles partagent le même modèle HTML et leurs
  contrôleurs se ressemblent beaucoup.
* Le service *$location* permet de modifier la partie de l’URL sur laquelle
  travaille *ngRoute*.
* Le module des contrôleurs dépend de *ngRoute* à cause de l’utilisation du
  service *$routeParams*.
* Le contenu de l’élément *body* s’affiche lorsqu’il y a eu un problème au
  lancement d’AngularJS. Il est donc possible d’y mettre un message d’erreur.

## Exercice 7b

* `success && success();` est un racourci pour tester que `success`
  est définie avant de l’appeler.
* Tout ce qui doit s’exécuter après la fin d’une méthode asynchrone
  doit être mis dans une méthode callback.
* Le module principal ne dépend que du module des contrôleurs,
  en effet les services ne sont pas appelés directement par la page HTML.
* Le module des contrôleurs dépends du module des service
  puisque le contrôleur utilise le service.
* Si on indique que le module principal dépend des deux autres
  et qu’eux-mêmes n’ont aucunes dépendances ça marche,
  mais ce n’est pas propre et ça pose des problèmes pour les tests unitaires.

## Exercice 7a

* La base de données est une variable privée du service, il n’y a pas
  moyen d’y accéder sans passer par le service.
* Les objets renvoyés par le service (instances de `Contact`) ont
  deux attributs considérés comme privés (`.$new` et `.$c`). Le
  controlleur ne doit pas y toucher.
* Dans le contrôleur, il faut penser à mettre à jour `$scope.contacts`
  après chaque modification de la base de données via `.$save()` et
  `.$delete()`.

## Exercice 6

* Si l’exemple du sujet montrait un filtrage sur une chaîne statique,
  il est évidement possible d’utiliser n’importe quelle expression
  comme paramètre de `filterBy:`. En particulier, un élément du modèle.
* Noter que la recherche fonctionne sur tous les champs des contacts.

## Exercice 5

Utilisation de la méthode [.factory()][Module.factory] pour enregistrer
le service.
C’est la solution la plus simple, mais `.provider()` et `.service()`
auraient aussi été possibles.

[Module.factory]: https://docs.angularjs.org/api/ng/type/angular.Module#factory

## Exercice 4

* On utilise la directive [ngSubmit][ngSubmit] pour ajouter un contact.
  *ngClick* sur le bouton « Ajouter » aurait aussi pu convenir,
  mais avec ngSubmit l’action est également déclenchée lorsque
  l’utilisateur appuie sur « Entrée ».
* Les éléments `input` pour les champs « email » et « téléphone »
  ont le type approprié dans l’attribut `type`.
* La directive *ngClick* sur les boutons de suppressions
  a accès au contact du contexte.
  Cela permet de coder très simplement la fonction `remove()`.
* La fonction `addTelUri()` pour avoir des URI sur les numéros de
  téléphone n’était pas demandée pour cet exercice,
  mais sera utile pour les suivants.  
* On ajoute pas de contact si tous les champs ne sont pas renseignés.
  On aurait pu mettre seulement certains champs obligatoires.

[ngSubmit]: https://docs.angularjs.org/api/ng/directive/ngSubmit
