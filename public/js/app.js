// CLIENT-SIDE JAVASCRIPT
// On page load
$(document).ready(function() {
    console.log("client js working");

    $('#newKitten').on('submit', function(e) {
        e.preventDefault();

        console.log(this); // the form
        var formData = $(this).serialize();
        console.log(formData)

        $.ajax({
            url: '/kittens',
            type: "POST",
            data: formData
        })
        .done(function(data) {
          console.log("made a cat successfully: ", data)
          //Object {__v: 0, name: "asdf", url: "asdfa", _id: "56214316bbacebd50f31
          var catHtml = "<li class='kitten list-group-item'>" + data.name + " at " + data.url + "<span data-id='" + data._id + "' class='close delete'>X</span></li>"
          $('.kittens').append(catHtml);
          $('#newKitten')[0].reset();
        })
        .fail(function(data) {
          console.log("Failed to make a cat!")
        })

    })

    $('.kittens').on('click', '.close', function(e) {
      e.preventDefault();
      console.log("delete me");

      var kittenId = $(this).data().id;
      console.log(kittenId);
      var cat = $(this).closest('li');

      $.ajax({
        type: "delete",
        url: '/kittens/' + kittenId
      })
      .done(function(data) {
        console.log(data);
        $(cat).remove();
      })
      .fail(function(data) {
        console.log("Failed to terminate a cat!")
      })

    })

});