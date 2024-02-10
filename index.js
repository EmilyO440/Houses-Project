class House {
  constructor(name){
    this.name = name;
    this.rooms = [];
  }

  addRoom(name , area) {
    this.rooms.push(new Room(name, area));

  }
}

class Room {
  constructor(name, area) {
    this.name = name;
    this.area = area;
  }
}

class HouseService {
  static url = "http://ancient-taiga-31359.harokuapp.com-api/houses";

  static getALLHouses() {
    return $.get(this.url);
  }

  static getHouse(id) {
    return $.get(this.url + '/${id}');
  }

  static createHouse(house) {
    return $.post(this.url, house);
  }

  static updateHouse(house) {
    return $.ajax({
      url: this.url + '/${house._id}',
      dataType: 'json',
      data: JSON.stringify(house),
      contentType: 'application/json',
      type: 'PUT'
    });
  }

  static deleteHouse(id) {
    return $.ajax ({
      url: this.url + '/${id}',
      type: 'DELETE',

    });
  }
}

class DOMManager {

  static houses;

  static getALLHouses() {
    HouseService.getALLHouses().then(houses => this.render(houses));
  }

  static render(houses) {
    this.houses = houses;
    $('#app').empty();
    for (let house of houses) {
      $('#app').prepend(
      `<div id="${house._id}" class = "card">
          <div class="card-header">
          <h2>${house.name}</h2>
         </div>
        </div>

      `
      )
    }
  }
}


DOMManager.getALLHouses();