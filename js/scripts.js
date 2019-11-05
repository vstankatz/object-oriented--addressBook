// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.addresses = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact, address) {
  contact.id = this.assignId();
  this.contacts.push(contact);
  this.addresses.push(address);
  console.log(this.addresses);
  console.log(this.contacts);
}


AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, emailAddress, addressType) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.emailAddress = emailAddress,
  this.addressType = addressType

}

  function Address(streetAddress, city, state, zipCode, workAddress, mailAddress) {
    this.streetAddress = streetAddress,
    this.city = city,
    this.state = state,
    this.zipCode = zipCode,
    this.workAddress = workAddress,
    this.mailAddress = mailAddress
  }


Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact (contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(contact.emailAddress);
  $(".street-address").html(contact.streetAddress);
  $(".city").html(contact.city);
  $(".state").html(contact.state);
  $(".zip-code").html(contact.zipCode);

  $(".work-address").html(contact.workAddress);
  $(".mail-address").html(contact.mailAddress);

  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
    // console.log("The id of this <li> is " + this.id + ".");
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmailAddress = $("input#new-email-address").val();
    var inputtedStreetAddress = $("input#new-street-address").val();
    var inputtedCity = $("input#new-city").val();
    var inputtedState = $("input#new-state").val();
    var inputtedZipCode = $("input#new-zip-code").val();
    var inputtedWorkAddress = $("input#new-work-address").val();
    var inputtedMailAddress = $("input#new-mail-address").val();

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-address").val("");
    $("input#new-street-address").val("");
    $("input#new-city").val("");
    $("input#new-state").val("");
    $("input#new-zip-code").val("");

    $("input#new-work-address").val("");
    $("input#new-mail-address").val("");

    var newAddress = new Address(inputtedStreetAddress, inputtedCity, inputtedState, inputtedZipCode, inputtedWorkAddress, inputtedMailAddress);

    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailAddress);

    const merge = Object.assign(newContact, newAddress);
    console.log(merge);

    addressBook.addContact(newContact, newAddress);
    displayContactDetails(addressBook);
  })
})































//USER LOGIC GOES HERE//
