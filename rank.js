var config = {
    apiKey: "AIzaSyDKATEMu6IK3_HvdGWZ4wVOvOnVaow1G3I",
    authDomain: "facemash-2c6bf.firebaseapp.com",
    databaseURL: "https://facemash-2c6bf.firebaseio.com",
    projectId: "facemash-2c6bf",
    storageBucket: "facemash-2c6bf.appspot.com",
    messagingSenderId: "980347510781"
  };
  firebase.initializeApp(config);var count = 7;

var database = firebase.database();
var storage = firebase.storage();
var greatref = database.ref();
var linkar = new Array(8);
var gogo = 0;

  greatref.orderByChild('base').limitToLast(8).once('value', function(data){
    //console.log(data.val());
    data.forEach(function(child){
      var pathReference = storage.ref('Instagram/' + child.key + '.jpg');
      linkar[count] = pathReference.getDownloadURL();
      /*pathReference.getDownloadURL().then(function(url){
        var img = document.getElementById('rank' + count);
        //console.log(url + " " + count);
        img.src = url;
        count = count - 1;
      });
    });*/
    count = count - 1;
  });
    var s = linkar[gogo].then(iter)
    for(var i = 1; i < 8; i = i+1)
      s = s.then(iter);
  });

    function iter(url){
    var img = document.getElementById('rank' + (gogo + 1));
    img.src = url;
    gogo = gogo + 1;
    return linkar[gogo];
  }