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
  var left_index;
  var right_index;
  var datas;
  var left_ref;
  var right_ref;
  const K =32;
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

  imageGenerator();

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
    left_ref = database.ref(left_index.toString()).child('base');
    left_ref.once('value').then(function(gotData){
        var left_base = gotData.val();
        //left_base = left_base + 1;
        justl2(left_base);
    });
    //console.log(datas);
    //var left_base = datas;
  }

  function justl2(left_base){
    right_ref = database.ref(right_index.toString()).child('base');
    right_ref.once('value').then(function(gotData){
      var right_base = gotData.val();
      eloRankerLeft(left_base, right_base);
    });
    //console.log(right_base);
  }

    function justr1(){
    left_ref = database.ref(left_index.toString()).child('base');
    left_ref.once('value').then(function(gotData){
        var left_base = gotData.val();
        //left_base = left_base + 1;
        justr2(left_base);
    });
    //console.log(datas);
    //var left_base = datas;
  }

  function justr2(left_base){
    right_ref = database.ref(right_index.toString()).child('base');
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
    database.ref(left_index.toString()).set(left_data);
    database.ref(right_index.toString()).set(right_data);
    console.log(left_index);
    console.log(right_index);
    imageGenerator();
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
    database.ref(left_index.toString()).update(left_data);
    database.ref(right_index.toString()).update(right_data);
    console.log(left_index);
    console.log(right_index);
    imageGenerator();
  }

  function imageGenerator(){
  var generated = imageIndexGenerator(1, 404);
  left_index = generated[0];
  right_index = generated[1];
  var pathReference;
  var src, src2;
  pathReference = storage.ref('Instagram/' + generated[0] + '.jpg');
  pathReference.getDownloadURL().then(function(url){
    console.log(url);
    src = url;
    var img = document.getElementById('left');
    img.src = src;

  }).catch(function(error) {
    console.log("error occured");
  });

  pathReference = storage.ref('Instagram/' + generated[1] + '.jpg');
  pathReference.getDownloadURL().then(function(url){
    console.log(url);
    src2 = url;
    var img2 = document.getElementById('right');
    img2.src = src2;

  }).catch(function(error) {
    console.log("error occured");
  });
}