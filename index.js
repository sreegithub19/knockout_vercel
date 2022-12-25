
//<!-- This is called "viewmodel". This javascript section defines the data and behavior of UI -->
// Class to represent a row in the seat reservations grid
function SeatReservation(name, initialMeal) {
  var self = this;
  self.name = name;
  self.meal = ko.observable(initialMeal);
  self.formattedPrice = ko.computed(function() {
      var price = self.meal().price;
      return price ? "$" + price.toFixed(2) : "00.00";        
  });
}

// Overall viewmodel for this screen, along with initial state
function ReservationsViewModel() {
  var self = this;

  // Non-editable catalog data - would come from the server
  self.availableMeals = [
      { mealName: "Select Meal", price: 0.0 },
      { mealName: "Standard (sandwich)", price: 20.25 },
      { mealName: "Premium (lobster)", price: 34.95 },
      { mealName: "Ultimate (whole zebra)", price: 290 }
  ];    

  // Editable data
  self.seats = ko.observableArray([
      new SeatReservation("Steve", self.availableMeals[0]),
      new SeatReservation("Bert", self.availableMeals[0])
  ]);
  
  // Operations
  self.addSeat = function() {
      self.seats.push(new SeatReservation("", self.availableMeals[0]));
  }
  self.removeSeat = function(seat) { self.seats.remove(seat) }
  self.totalSurcharge = ko.computed(function() {
     var total = 0;
     for (var i = 0; i < self.seats().length; i++)
         total += self.seats()[i].meal().price;
     return total;
  });
}

ko.applyBindings(new ReservationsViewModel());
