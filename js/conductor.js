/*
This file is the orchestral conductor for the animation, coordinating what plays when.

For each <section> (with class="step") in the index.html file, this file contains:
   (1) an "activate" function, which is called when the scrolled position switches sections, and
   (2) an "update" function, which is called when the scrolled position changes within a section

Note that the "update" functions are functions of "progress", which is the relative position
within the section
*/

var activateFunctions = []
var updateFunctions = []

// to keep track of the page's state
var page_state = {
  sun_angle: 0,
}

// to keep track of running animations
var animation_state = {
  rotating_sun: false,
}

// values that are read from the as-drawn svg
var svg_vals = {
  sun_center: "" + d3.select("#sun").select("circle").attr("cx") + " " +
              d3.select("#sun").select("circle").attr("cy"),
}

// All set. Enter action! ...


/* Title Section */

activateFunctions.push( function(){

  // start by showing just the landscape svg group
  highlight_svg_groups(['landscape'])

})

updateFunctions.push(function(progress) {})


/* Section 1 text... */

activateFunctions.push( function(){

  highlight_svg_groups(['landscape'])

})

updateFunctions.push(function(progress) {

  // rising sun
  d3.select("#sun")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", 1)
      .attr("transform", "translate(0," + (260 * (1-progress)) + ") " +
                         "rotate(" + page_state.sun_angle + " " + svg_vals.sun_center + ")")


})


/* Section 2 text... */

activateFunctions.push( function(){

  highlight_svg_groups(['landscape','sun'])

  // for upward scrollers - turn off the rotating sun animation
  stop_animation_timer('rotating_sun')

  // make sure that the sun has reached its fully risen position
  d3.select("#sun")
    .transition().duration(0)
      .attr("transform", "translate(0,0) " +
                         "rotate(" + page_state.sun_angle + " " + svg_vals.sun_center + ")")

})

updateFunctions.push(function(progress) {

  // fade out the math on scroll
/*
  d3.select("#hello-world-math")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", Math.max(0, 1 - 2 * progress))
*/

  // and fade in the "hello world" text
   d3.select("#hello-world-text")
    .transition().duration(0)
      .attr("display", "block")
      .style("opacity", Math.max(0, -1 + 2 * progress))

})


/* Section 3 text... */

activateFunctions.push( function(){

  highlight_svg_groups(['landscape','sun','hello-world-text'])

  // rotating sun animation
  var previous_t = 0
  animation_state.rotating_sun = d3.timer(function(t){
    page_state.sun_angle += (t - previous_t) / 50
    d3.select("#sun")
      .transition().duration(0)
        .attr("transform", "rotate(" + page_state.sun_angle + " " + svg_vals.sun_center + ")")
    previous_t = t
  })

})

updateFunctions.push(function(progress) {

    //fade out the sun, landscape and text

    d3.select("#hello-world-text")
     .transition().duration(0)
       .attr("display", "block")
       .style("opacity", Math.max(0, 1 - 2 * progress))

    d3.select("#landscape")
         .transition().duration(0)
           .attr("display", "block")
           .style("opacity", Math.max(0, 1 - 2 * progress))

     d3.select("#sun")
             .transition().duration(0)
               .attr("display", "block")
               .style("opacity", Math.max(0, 1 - 2 * progress))

})

/* Section 4 text... */

activateFunctions.push( function(){
//fade in merkle tree
    d3.select("#merkle-tree")
     .transition().duration(0)
       .attr("display", "block")
       .style("opacity", Math.max(0, 1))

})

updateFunctions.push(function(progress) {
//fade out merkel tree
    d3.select("#merkle-tree")
     .transition().duration(0)
       .attr("display", "block")
       .style("opacity", Math.max(0, 1 - 2 * progress))

})


/* Section 4 text... */

activateFunctions.push( function(){

    d3.select("#hyperledger-picture")
     .transition().duration(0)
       .attr("display", "block")
       .style("opacity", Math.max(0, 1))

})

updateFunctions.push(function(progress) {

       d3.select("#hyperledger-picture")
         .transition().duration(0)
           .attr("display", "block")
           .style("opacity", Math.max(0, 1 - 2 * progress))


        d3.select("#current-settlement")
            .transition().duration(0)
              .attr("display", "block")
              .style("opacity", Math.max(0, -1 + 2 * progress))

})


/* Section 5 text... */

activateFunctions.push( function(){

    highlight_svg_groups(['current-settlement'])

    d3.select("#current-settlement")
     .transition().duration(0)
       .attr("display", "block")
       .style("opacity", Math.max(0, 1))

})

updateFunctions.push(function(progress) {

 d3.select("#current-settlement")
         .transition().duration(20)
           .attr("display", "block")
           .style("opacity", Math.max(0, 1 - 2 * progress))


})


/* Section 5 text... */

activateFunctions.push( function(){

    highlight_svg_groups(['new-settlement'])
/*
    d3.select("#new-settlement")
     .transition().duration(20)
       .attr("display", "block")
       .style("opacity", Math.max(0, 1))*/

})

updateFunctions.push(function(progress) {

 /*d3.select("#new-settlement")
         .transition().duration(0)
           .attr("display", "block")
           .style("opacity", Math.max(0, 1 - 2 * progress))*/


})


// Make it happen!
scrollerDisplay(d3.select('#graphic'), 'step', activateFunctions, updateFunctions)
