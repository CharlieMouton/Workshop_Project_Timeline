function preload() {
  table = loadTable("project_data.csv", "csv", "header")
}


function setup() {
  cnv = createCanvas(800,600); //vars (wdith, height)
  background(255);
  console.log("Canvas size: " + width + ", " + height);
  drawTimeline();
  drawBeads();
  popup = createDiv("");
  popupLabels = createDiv("");
  createDiv("<h2> Work-Shop's Project Timeline </h2> Hover over a project to learn more")
    .position(30,10)
    .class("title")
  // ellipse(300,300,100,100)
}


function draw() {
  background(255);
  removeDivs();
  drawTimeline();
  drawBeads();

  noCircle = true;
  activeBead = null;

  activeBead = inBead();
  beadLocation = beadSize(activeBead+1);

  if (!noCircle) {
    fillHsluv(140+30*(activeBead+1),100,70, 100);
    strokeWeight(5);
    // circ = ellipse(beadLocation[0]+beadLocation[1]/2,height/2,beadLocation[1],table.getRow(activeBead+3).get("Hours Worked")/1.5);
    circ = arc(beadLocation[0]+beadLocation[1]/2,height/2,beadLocation[1],table.getRow(activeBead+1).get("Hours Worked")/PI/beadLocation[1]*250,PI,2*PI);
    popupLabels = createDiv(
      "<h3> Project: " + "</h3>" +
      "Duration (months): " + "<br>" +
      "Hours Worked: " + "<br>" +
      "Revenue per Month: " + "<br>" +
      "Net Income: " + "<br>" +
      "Net Income per Hour Worked: " + "<br>"
    )
    .position(200, height/2+100)
    .class("popup-labels");

    popup = createDiv(
      "<h3>" + table.getRow(activeBead+1).get("PROJECT") + "</h3>" +
      table.getRow(activeBead+1).get("Actual Duration (Months)") + "<br>" +
      table.getRow(activeBead+1).get("Hours Worked") + "<br>" +
      table.getRow(activeBead+1).get("Revenue per month") + "<br>" +
      table.getRow(activeBead+1).get("Net Income") + "<br>" +
      "$" + floor((table.getRow(activeBead+1).get("Net Income").substr(1).slice(0,-4)+table.getRow(activeBead+1).get("Net Income").slice(-3))/table.getRow(activeBead+1).get("Hours Worked")) + "<br>"
    )
    .position(450,height/2+100)
    .class("popup");
  };
};

function inBead(){
  // checks to see which bead you are closest too, and returns that table index value
  hoverBead = [];
  for (var j = 1; j < 8; j++) {
    beadLocation = beadSize(j);
    a = beadLocation[0]+beadLocation[1]/2;
    b = height/2;
    w = beadLocation[1]/2;
    h = table.getRow(j).get("Hours Worked")/PI/beadLocation[1]*250/2


    // console.log(((sq(mouseX-a)/sq(w))+sq(mouseY-b)/sq(w)))
    if ((sq(mouseX-a)/sq(w))+sq(mouseY-b)/sq(h) < 1 && mouseY < height/2) {
      console.log("a: " + a + ", mouseX: " + mouseX)
      console.log("b: " + b + ", mouseY: " + mouseY)
      // console.log("w: " + w + ", h: " + h)
      console.log((sq(mouseX-a)/sq(w))+sq(mouseY-b)/sq(w))
      noCircle = false;
      hoverBead[j-1] = (sq(mouseX-a)/sq(w))+sq(mouseY-b)/sq(a);
    } else {
      hoverBead[j-1] = 1000;
    }

    // if(abs(mouseX-(beadLocation[0]+beadLocation[1]/2)) < table.getRow(j).get("Hours Worked")/PI/beadLocation[1]*250/2) {
    //   if(abs(mouseY-height/2) < beadLocation[1]/2) {
    //     if(abs(mouseX-(beadLocation[0]+beadLocation[1]/2))+abs(mouseY-height/2) < beadLocation[1]*.8) {
    //       noCircle = false;
    //       hoverBead[j-1] = abs(mouseX-(beadLocation[0]+beadLocation[1]/2))+abs(mouseY-height/2);
    //     }
    //   }
    // }


  };
  return indexOfMin(hoverBead);
}

function drawTimeline() {
  fill(255, 154, 59);
  strokeWeight(0);
  timeline = rect(30, height/2-2, width, 5);
  timeline.color(0);
  timelineDiv1 = createDiv("Q3 '15")
    .position(10,height/2+20)
    .class("timeline-label");
  timelineDiv2 = createDiv("Q4 '15")
    .position(100,height/2+20)
    .class("timeline-label");
  timelineDiv3 = createDiv("Q1 '16")
    .position(190,height/2+20)
    .class("timeline-label");
  timelineDiv4 = createDiv("Q2 '16")
    .position(280,height/2+20)
    .class("timeline-label");
  timelineDiv5 = createDiv("Q3 '16")
    .position(370,height/2+20)
    .class("timeline-label");
  timelineDiv6 = createDiv("Q4 '16")
    .position(460,height/2+20)
    .class("timeline-label");
  timelineDiv7 = createDiv("Q1 '17")
    .position(550,height/2+20)
    .class("timeline-label");
  timelineDiv8 = createDiv("Q2 '17")
    .position(640,height/2+20)
    .class("timeline-label");
  timelineDiv9 = createDiv("Q3 '17")
    .position(730,height/2+20)
    .class("timeline-label");
}

function drawBeads() {
  strokeWeight(1);
  for (var i = 1; i < 8; i++) {
    // print(table.getRow(i).get("PROJECT"));
    beadLocation = beadSize(i);
    fillHsluv(140+30*i,100,70, 50);
    // circ = ellipse(beadLocation[0]+beadLocation[1]/2,height/2,beadLocation[1],table.getRow(i).get("Hours Worked")/1.5);
    circ = arc(beadLocation[0]+beadLocation[1]/2,height/2,beadLocation[1],table.getRow(i).get("Hours Worked")/PI/beadLocation[1]*250,PI,2*PI);
  }
}

function removeDivs() {
  timelineDiv1.remove();
  timelineDiv2.remove();
  timelineDiv3.remove();
  timelineDiv4.remove();
  timelineDiv5.remove();
  timelineDiv6.remove();
  timelineDiv7.remove();
  timelineDiv8.remove();
  timelineDiv9.remove();
  popup.remove();
  popupLabels.remove();
}

function beadSize(row) {
  strtMnth = table.getRow(row).get("Start Month");
  strtYr = table.getRow(row).get("Start Year");
  endMnth = table.getRow(row).get("End Month");
  endYr = table.getRow(row).get("End Year");
  leftSide = monthDuration(6,2015,strtMnth, strtYr);
  rightSide = monthDuration(strtMnth, strtYr, endMnth, endYr);
  return [leftSide*30, rightSide*30]
}

function monthDuration(startMonth, startYear, endMonth, endYear) {
  yearDifference = endYear-startYear;
  return endMonth-startMonth+(yearDifference*12)
}

function hi() {
  print("hi")
}

function indexOfMin(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var min = arr[0];
    var minIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            minIndex = i;
            min = arr[i];
        }
    }

    return minIndex;
}

function fillHsluv(h, s, l, a) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  fill(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255,a);
}

function strokeHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  stroke(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}
