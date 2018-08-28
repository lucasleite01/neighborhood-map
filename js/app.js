var List = function() {
  this.fixedLocations = [
      {id: ko.observable("loc-0"), name: 'Bar Abertura', info: 'Ótimo lugar para tomar uma cerveja com os amigos.', location: {lat: -20.2797305, lng: -40.3001556}, show: ko.observable(true)},
      {id: ko.observable("loc-1"), name: 'King Kone', info: 'Ótimo lugar para comer uma pizza em formato de cone.', location: {lat: -20.2805255, lng: -40.2999477}, show: ko.observable(true)},
      {id: ko.observable("loc-2"), name: 'Restaurante Cantinho do Sabor', info: 'Restaurante com boa comida. Apenas para almoço.', location: {lat: -20.279860, lng: -40.299923}, show: ko.observable(true)},
      {id: ko.observable("loc-3"), name: 'Sfiheria', info: 'Lugar de comer uma boa sphirra.', location: {lat: -20.2804123, lng: -40.2996171}, show: ko.observable(true)},
      {id: ko.observable("loc-4"), name: 'Restaurante Cicho Bento', info: 'Restaurante caro. Vale à pena se for comer apenas churrasco.', location: {lat: -20.281035, lng: -40.299086}, show: ko.observable(true)},
      {id: ko.observable("loc-5"), name: 'Papelaria Grafite', info: 'Papelaria onde você pode encontrar tudo o que precisa de artigos escolares.', location: {lat: -20.2796449, lng: -40.3008456}, show: ko.observable(true)}
    ];
  this.myLocations = ko.observableArray(this.fixedLocations);
  this.inputSearch = ko.observable("");
};

function AppViewModel() {
    var self = this;
    self.currentList = ko.observable(new List());

    self.filteredLocations = ko.computed(function() {
      var filter = self.currentList().inputSearch();

      if (filter === null || filter === "") {
        var locations = self.currentList().myLocations();

        //Seta todos os marcadores como visíveis apenas se os marcadores já
        //tiverem sido criados
        if (markers !== null) {
          for (var i = 0; i < markers.length; i++) {
              markers[i].setVisible(true);
          }
        }

        return locations;
      }
      else {
        //Todos os marcadores estão invisíveis antes de serem filtrados
        for (var j = 0; j < markers.length; j++) {
            markers[j].setVisible(false);
        }
        return ko.utils.arrayFilter(self.currentList().myLocations(), function(location) {
          var result = location.name.toLowerCase().search(filter.toLowerCase());

          //Para cada localicação já verifica se vai ser visualizada no mapa ou não
          if (result != -1)
          {
            //Se for ser visualizada atualiza o marcador no mapa para ser mostrado, ou não
            for (var k = 0; k < markers.length; k++) {
              if (markers[k].id == location.id())
                markers[k].setVisible(true);
            }
          }

          return result != -1;
        });
      }
    });

    //Function for marker's animation
    self.markerAnimation = function(id) {
      //Procura o marker associado ao id e executa a animação
      for (var i = 0; i < markers.length; i++) {
        //Se o marcador é o associado ao markers[i], pois tem o mesmo id
        if (markers[i].id == id)
        {
          //Se está animado, desanima o marcador e fecha informação
          if (markers[i].getAnimation() !== null) {
              markers[i].setAnimation(null);
              largeInfowindow.close();
          }else {
              //Se não está animadao, anima o marcador e mostra informação
              populateInfoWindow(markers[i], largeInfowindow);
              markers[i].setAnimation(google.maps.Animation.BOUNCE);
          }
        }else {
          markers[i].setAnimation(null);
        }
      }
    };
}

// Create a new blank array for all the listing markers.
var markers = [];
//Criando o viewModel para poder acessário no arquivo maps.js
var viewModel = new AppViewModel();
ko.applyBindings(viewModel);

//this is for the css template
$(".button-collapse").sideNav();
