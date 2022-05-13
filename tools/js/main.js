(function($) {

    function makeTimer() {

        var endTime = new Date("20 August 2022 9:56:00 GMT+01:00");
        endTime = (Date.parse(endTime) / 1000);

        var now = new Date();
        now = (Date.parse(now) / 1000);

        var timeLeft = endTime - now;

        var days = Math.floor(timeLeft / 86400);
        var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
        var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

        if (hours < "10") { hours = "0" + hours; }
        if (minutes < "10") { minutes = "0" + minutes; }
        if (seconds < "10") { seconds = "0" + seconds; }

        $("#days1").html(days + "<span>天</span>");
        $("#hours1").html(hours + "<span>时</span>");
        $("#minutes1").html(minutes + "<span>分</span>");
        $("#seconds1").html(seconds + "<span>秒</span>");

    }

    setInterval(function() { makeTimer(); }, 1000);

})(jQuery);