let vid;
let reflectionField;
let dateField;
let img = [];
let valueS;
let w = 480;
let h = 1000;
let scale = 0.7;
let min;
let time = 0;
let slider;
let heatSlider;
let xLocOfCircle;
let comfortmultiplier = [0, 1, 2, 3, 4];
let backgroundColor = ["#69E2FA", "#6ECBC2", "#8DC473", "#E5C839", "#F3A578"];
let comfortability = ["freezing", "chilly", "comfortable", "warm", "sweltering"];
let heatSourceStatus = ["forehead", "face", "throat", "chest", "torso"];


let bodySegmentation;
let segmentation;

const options = {
  maskType: "person",
};

function preload() {
  img[0] = loadImage('/heatSources/freezing.png');
  img[1] = loadImage('/heatSources/chilly.png');
  img[2] = loadImage('/heatSources/comfortable.png');
  img[3] = loadImage('/heatSources/warm.png');
  img[4] = loadImage('/heatSources/sweltering.png');
  bodySegmentation = ml5.bodySegmentation("SelfieSegmentation", options);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  vid = createCapture(VIDEO);
  vid.size(windowWidth/2, windowHeight*0.75);
  vid.hide();
  
  reflectionField = createInput('');
  reflectionField.attribute('placeholder', 'reflect on the temp');
  reflectionField.position(windowWidth/2+100, 300);
  reflectionField.size(300, 50);
  
  dateField = createInput('');
  dateField.attribute('placeholder', 'date/time');
  dateField.position(windowWidth/2+100, 250);
  dateField.size(100);
  
  slider = createSlider(0, 4, 0, 1);
  fill(0);
  slider.position(windowWidth/2+100, 420);
  
  slider.size(300);
  
  heatSlider = createSlider(0, 4, 0, 1);
  fill(0);
  heatSlider.position(windowWidth/2+100, 500);
  heatSlider.size(300);
  
  bodySegmentation.detectStart(vid, gotResults);
}

function draw() {
  background(255);
  fill(0);
  textSize(24);
  textAlign(LEFT);
  text("My Heat Journal", windowWidth/2+100, 75);
  textSize(16);
  textWidth(100);
  textWrap(WORD);
  text("The goal of My Heat Journal to illustrate the somatic experiences one has with urban heat on a day to day basis. To participate, take a walk that you already do on regular basis. Maybe thats your daily commute, getting groceries, walking to a friends house, etc. Then after your walk, document your somatic experience using this website.", windowWidth/2+100, 110, windowWidth/3+50, 200);
  
  valueS = slider.value();
  heatValue = heatSlider.value();
  text('Comfortability: ' + comfortability[valueS], windowWidth/2+100, 395);
  text('Heat Source: ' + heatSourceStatus[heatValue], windowWidth/2+100, 475);
  
  

  let reflection = reflectionField.value()
  let date = dateField.value()
  
  // background for image
  fill(backgroundColor[valueS]);
  noStroke();
  rect(0, 0, width/2, windowHeight*0.75);

  //heat gradient bubble
  image(img[valueS], 0, (heatValue-(740/3)) + (heatValue*(740/5)), 640, 480);

  fill(255);
  rect(0, windowHeight - (windowHeight*0.25), width/2, windowHeight*0.75);
  
  valueS = slider.value();
  
  tint(255, 100);
  
  if (segmentation) {
    vid.mask(segmentation.mask);
    image(vid, 0, 0, windowWidth/2, windowHeight*0.75);
  }
  tint(255, 255);

  textAlign(CENTER, TOP);
  fill(0, 255);
  textSize(16);
  text(date + "\n\n" + reflection, 80, windowHeight-150, (width/3));

}

function gotResults(result) {
  segmentation = result;
}