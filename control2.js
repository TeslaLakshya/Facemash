var config = {
    apiKey: "AIzaSyDKATEMu6IK3_HvdGWZ4wVOvOnVaow1G3I",
    authDomain: "facemash-2c6bf.firebaseapp.com",
    databaseURL: "https://facemash-2c6bf.firebaseio.com",
    projectId: "facemash-2c6bf",
    storageBucket: "facemash-2c6bf.appspot.com",
    messagingSenderId: "980347510781"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var storage = firebase.storage();
  var left_index = new Array(8);
  var right_index = new Array(8);
  var datas;
  var left_ref;
  var right_ref;
  const K =32;
  var img1_ar = new Array(8);
  var img2_ar = new Array(8);
  var count = 1, count2 = 0;
  var pathReference, pathReference2;
  var generated;
  //console.log(JSON.stringify(greatref.orderByChild('base')));

     /*Data Creator
  var datafor = {
    base: 0
  }

  for(var i = 1; i <= 404; i++){
      ref = database.ref(i.toString());
      ref.set(datafor);
  }
  console.log("done");*/

  imageArrayGenerator();
    
    img1_ar[0].then(url => {
    var img1 = document.getElementById('left');
    img1.src = url;
    console.log(img1.src + " " + "left");
  });

  img2_ar[0].then(url => {
    var img2 = document.getElementById('right');
    img2.src = url;
    console.log(img2.src + " " + "right");
  });

function imageIndexGenerator(min,max) // min and max included
{
    var r1 =  Math.floor(Math.random()*(max-min+1)+min);
    var r2;
    do{
      r2 = Math.floor(Math.random()*(max-min+1)+min);
    }while(r1 === r2)

    return [r1, r2];
}

  function justl1(){
    left_ref = database.ref(left_index[count2].toString()).child('base');
    left_ref.once('value').then(function(gotData){
        var left_base = gotData.val();
        //left_base = left_base + 1;
        justl2(left_base);
    });
    //console.log(datas);
    //var left_base = datas;
  }

  function justl2(left_base){
    right_ref = database.ref(right_index[count2].toString()).child('base');
    right_ref.once('value').then(function(gotData){
      var right_base = gotData.val();
      eloRankerLeft(left_base, right_base);
    });
    //console.log(right_base);
  }

    function justr1(){
    left_ref = database.ref(left_index[count2].toString()).child('base');
    left_ref.once('value').then(function(gotData){
        var left_base = gotData.val();
        //left_base = left_base + 1;
        justr2(left_base);
    });
    //console.log(datas);
    //var left_base = datas;
  }

  function justr2(left_base){
    right_ref = database.ref(right_index[count2].toString()).child('base');
    right_ref.once('value').then(function(gotData){
      var right_base = gotData.val();
      eloRankerRight(left_base, right_base);
    });
    //console.log(right_base);
  }

  function eloRankerLeft(left_base, right_base){
    var p1 = (1.0 / (1.0 + Math.pow(10, ((right_base - left_base) / 400))));
    var p2 = (1.0 / (1.0 + Math.pow(10, ((left_base - right_base) / 400))));
    var left_data = {
      base: left_base + K*(1.0 - p1) 
    }
    var right_data = {
      base: right_base + K*(0.0 - p2)
    }
    database.ref(left_index[count2].toString()).set(left_data);
    database.ref(right_index[count2].toString()).set(right_data);
    console.log(left_index[count2]);
    console.log(right_index[count2]);
    count2 = (count2 + 1) % left_index.length;
    imageLoader();
  }

    function eloRankerRight(left_base, right_base){
    var p1 = (1.0 / (1.0 + Math.pow(10, ((right_base - left_base) / 400))));
    var p2 = (1.0 / (1.0 + Math.pow(10, ((left_base - right_base) / 400))));
    var left_data = {
      base: left_base + K*(0.0 - p1)
    }
    var right_data = {
      base: right_base + K*(1.0 - p2)
    }
    database.ref(left_index[count2].toString()).update(left_data);
    database.ref(right_index[count2].toString()).update(right_data);
    console.log(left_index[count2]);
    console.log(right_index[count2]);
    count2 = (count2 + 1) % left_index.length;
    imageLoader();
  }

  function imageArrayGenerator(){
  for(var i = 0; i < 8; i = i +1){
    promiseGenerator();
    left_index[i] = generated[0];
    right_index[i] = generated[1];  
    img1_ar[i] = pathReference.getDownloadURL();
    img2_ar[i] = pathReference2.getDownloadURL();
  }
}

 function imageLoader(){
  img1_ar[count].then(url => {
    var img1 = document.getElementById('left');
    img1.src = url;
    console.log(img1.src + " " + "left");
  });

  img2_ar[count].then(url => {
    var img2 = document.getElementById('right');
    img2.src = url;
    console.log(img2.src + " " + "right");
  });
  promiseGenerator();
  img1_ar[count] = pathReference.getDownloadURL();
  img2_ar[count] = pathReference2.getDownloadURL();
  left_index[count] = generated[0];
  right_index[count] = generated[1];
  count = (count + 1) % img1_ar.length;
 }

 function promiseGenerator(){
    generated = imageIndexGenerator(1, 404);
    //var src, src2;
    pathReference = storage.ref('Instagram/' + generated[0] + '.jpg');
    pathReference2 = storage.ref('Instagram/' + generated[1] + '.jpg');  
 }