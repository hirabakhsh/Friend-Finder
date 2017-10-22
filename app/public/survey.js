$(document).ready(function() {
    $('#submit').on('click', function(e) {
        e.preventDefault();
        var info = $('form').serialize();
        $.ajax({
            type: "POST",
            url: "../data/friends.js",
            data: info
        }).done(function(match) {
            $('.modal').css("display", "block");
            $('.modal-content > span').on("click", function() {
                $('.modal').css("display", "none");
                $('#submit').text("View Results");
            });
            var modal = document.getElementById('modal');
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                    $('#submit').text("View Results");
                }
            }
        });
    });
});