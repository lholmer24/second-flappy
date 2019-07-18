var highscore = 0;
function registerScore(score){
    highscore = score;
}
var mostRecent = 0;
var selectedTab = "none";
jQuery("#scrbtn").on("click", function() {
 jQuery("#content").empty();
 jQuery("#content").append(
 "<div>" + "Highscore: " + highscore + "</div>"
 );
 mostRecent = 1;
});
jQuery("#crdbtn").on("click", function() {
 jQuery("#content").empty();
 jQuery("#content").append(
 "<div>" + "A game by Laughlin!" + "</div>"
 );
 mostRecent = 0;
});
jQuery("#hlpbtn").on("click", function() {
 jQuery("#content").empty();
 jQuery("#content").append(
 "<ul>"
 + "<li>" + "Press SPACE to flap your wings" + "</li>"
 + "<li>" + "Avoid the incoming pipes" + "</li>"
 + "<li>" + "Dont fly too high or too low!" + "</li>"
 + "</ul>"
  );
  mostRecent = 0;
});
