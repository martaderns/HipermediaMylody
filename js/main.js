var musicSearch;
var musicRecommend;
var myPlayList;
var musicDetails;

var info = '{"recent" :[';

//arrayData = new Data();
musicRecommender=new MusicRecommender();
data = new Data();
var element;

var playSong;
var esMeva;



window.onbeforeunload = clearScreen();

function clearScreen(){
	localStorage.clear();
}


document.onclick = function (e) {
	e = e || event
	var target = e.target || e.srcElement
	element = document.getElementById(target.id);
	console.log(target.id);

	if(target.id == "playButton"){
		console.log("Ara he apretat el butó de play de baix del menu");
	}else{
		if(target.name == "buttonAddPlaylist"){
			console.log("add to playlist");
			console.log(element.id);

			var estaActiu;
			if( $("#sectionA").hasClass("active") ){	
				estaActiu = 0;
			}
			if( $("#sectionB").hasClass("active") ){
				estaActiu = 1;
			}
			if( $("#sectionC").hasClass("active") ){
				estaActiu = 2;
			}

			switch(estaActiu){
				case 0:
					console.log('Section A esta actiu!    cas button ADD PLAYLIST');
					var id = target.id;
					console.log(id);

					var add = document.getElementById(target.id);
					add.id = "buttonAddPlaylist";

					Playlist.save(musicTop[id].title, musicTop[id].artist, musicTop[id].imageAlbum);
					console.log("ja esta guardat a playlist");
				break;

				case 1:
					console.log('Section B esta actiu     cas button ADD PLAYLIST');
					var id = target.id;
					console.log(id);

					var add = document.getElementById(target.id);
					add.id = "buttonAddPlaylist";

					Playlist.save(musicSearch[id].title, musicSearch[id].artist, musicSearch[id].imageAlbum);
				break;

				case 2:
					console.log('Section C esta actiu        cas button ADD PLAYLIST');
					var id = target.id;
					console.log(id);

					var add = document.getElementById(target.id);
					add.id = "buttonAddPlaylist";

					Playlist.save(musicRecommend[id].title, musicRecommend[id].artist, musicRecommend[id].imageAlbum);
				break;

			}

			console.log("Es el moment de refrescar la pantalla");
			
			var x = Playlist.get();
			console.log(x);
			musicRecommender.playlist(x);

		}else{

			//En cas d'apretar el boto PLAY 

			if(target.name=="pickPlay"){

				var estaActiu;
				if( $("#sectionA").hasClass("active") ){	
					estaActiu = 0;
				}
				if( $("#sectionB").hasClass("active") ){
					estaActiu = 1;
				}
				if( $("#sectionC").hasClass("active") ){
					estaActiu = 2;
				}


				switch(estaActiu){
					case 0:
						console.log('Section A esta actiu');
						var id = target.id;
						console.log(id);

					 	playSong = musicTop[id];
						
						console.log("Cas 0 quan ens apreten play - play song val    " + playSong);

						console.log(playSong);

						Player.play(playSong.title, playSong.artist);
						data.save(playSong.title, playSong.artist, playSong.imageAlbum);

						console.log("S'ha guardat correctament");

						console.log("GUARDO AL localStorage         " + localStorage);

					break;

					case 1:
						console.log('Section A esta actiu');
						var id = target.id;
						console.log(id);

						playSong = musicSearch[id];

						console.log("Cas 1 quan ens apreten play - play song val    " + playSong);

						Player.play(playSong.title, playSong.artist);
						data.save(playSong.title, playSong.artist, playSong.imageAlbum);
						console.log("S'ha guardat correctament");

						console.log("GUARDO AL localStorage         " + localStorage);

					break;

					case 2:
						console.log('Section C esta actiu');
						var id = target.id;
						console.log(id);

						playSong = musicRecommend[id];

						console.log("Cas 2 quan ens apreten play - play song val    " + playSong);

						Player.play(playSong.title, playSong.artist);

						data.save(playSong.title, playSong.artist, playSong.imageAlbum);
						console.log("S'ha guardat correctament");

						console.log("GUARDO AL localStorage         " + localStorage);

					break;
				}
			}else{
				if(target.name == "buttonRemovePlaylist"){

					var esborrar = document.getElementById(target.id);
					Playlist.removeSong(target.id, esborrar.title, esborrar.artist, esborrar.imageAlbum); 

				}else{
					if(target.name == "infoButton"){

						var estaActiu;
						if( $("#sectionA").hasClass("active") ){	
							estaActiu = 0;
						}
						if( $("#sectionB").hasClass("active") ){
							estaActiu = 1;
						}
						if( $("#sectionC").hasClass("active") ){
							estaActiu = 2;
						}
						if( $("#sectionD").hasClass("active") ){
							estaActiu = 2;
						}

						switch(estaActiu){
							case 0:
								console.log('Section A esta actiu');
								var id = target.id;
								console.log(id);

								info = musicRecommender.detail(musicTop[id].artist)
							break;

							case 1:
								console.log('Section B esta actiu');
								var id = target.id;
								console.log(id);

								info = musicRecommender.detail(musicSearch[id].artist)
							break;

							case 2:
								console.log('Section C esta actiu');
								var id = target.id;
								console.log(id);

								info = musicRecommender.detail(musicRecommend[id].artist)
							break;
						}

						alert("Artist Information");
						alert(info.details);
					}
				}
			}
		}
	}
}


function botonRecomendado(){
}

function botonReciente(){

}

function botonMusica(){
	console.log("MUSICA");
}
function botonBusqueda(){
	console.log("BUSQUEDA");
}


function buscaBusca()
{	
	$("#sectionB").addClass("active"); 
	$("#sectionC").removeClass("active");  
	$("#sectionA").removeClass("active"); 
	$("#sectionD").removeClass("active");   

	var x=document.getElementById("areabuscador").value;
	var resultsSearched=musicRecommender.search(x);

	var b = document.getElementById("sectionB");
	b.innerHTML = "";
	document.getElementById("sectionC").innerHTML = "";
	document.getElementById("sectionA").innerHTML = "";
	document.getElementById("sectionD").innerHTML = "";

	var espaiArtista = document.createElement('div');
	espaiArtista.id = "espaiArtista";

	for (var i = 0; i < resultsSearched.length; i++){
	   	
	   	var artista = document.createElement('div');
		artista.id = "artista";

	    var img_album = document.createElement("img");
		img_album.src = resultsSearched[i].imageAlbum;
		

		var text = document.createElement("h4");
		text.id="text";
		text.appendChild(document.createTextNode(resultsSearched[i].artist));
		var text2 = document.createElement("h5");
		text2.id="text2";
		text2.appendChild(document.createTextNode(resultsSearched[i].title));

		var btn = document.createElement("button");
		btn.id = i;
		btn.name = "pickPlay";
		var t = document.createTextNode("PLAY");       
		btn.appendChild(t);      

		var btn2 = document.createElement("button");
		btn2.name = "buttonAddPlaylist";
		btn2.id = i;
		var t2 = document.createTextNode("ADD TO PLAYLIST");       
		btn2.appendChild(t2);    


		var btinfo = document.createElement("button");
		btinfo.name = "infoButton";
		btinfo.id = i;
		var t2 = document.createTextNode("+");       
		btinfo.appendChild(t2);    


	    artista.appendChild(img_album);
	    artista.appendChild(text);
	    artista.appendChild(text2);
	    artista.appendChild(btn);
	    artista.appendChild(btn2);
	    artista.appendChild(btinfo);

	    espaiArtista.appendChild(artista);
	}
	b.appendChild(espaiArtista);
}


function musicaTop(){

	$("#sectionA").addClass("active"); 
	$("#sectionC").removeClass("active");  
	$("#sectionB").removeClass("active"); 
	$("#sectionD").removeClass("active");  

	var resultsSearched= musicRecommender.topSongs();
	console.log(resultsSearched);

	document.getElementById("sectionB").innerHTML = "";
	document.getElementById("sectionD").innerHTML = "";
	document.getElementById("sectionC").innerHTML = "";
	var a = document.getElementById("sectionA");
	a.innerHTML = "";

	var espaiArtista = document.createElement('div');
	espaiArtista.id = "espaiArtista";

	for (var i = 0; i < resultsSearched.length; i++){
	   	
	   	var artista = document.createElement('div');
		artista.id = "artista";

	    var img_album = document.createElement("img");
		img_album.src = resultsSearched[i].imageAlbum;

		var text = document.createElement("h4");
		text.id="text";
		text.appendChild(document.createTextNode(resultsSearched[i].artist));
		var text2 = document.createElement("h5");
		text2.id="text2";
		text2.appendChild(document.createTextNode(resultsSearched[i].title));

		var btn = document.createElement("button");
		btn.id = i;
		btn.name = "pickPlay";
		var t = document.createTextNode("PLAY");       
		btn.appendChild(t);      

		var btn2 = document.createElement("button");
		btn2.name = "buttonAddPlaylist";
		btn2.id = i;
		var t2 = document.createTextNode("ADD TO PLAYLIST");       
		btn2.appendChild(t2);                           
		
		var btinfo = document.createElement("button");
		btinfo.name = "infoButton";
		btinfo.id = i;
		var t2 = document.createTextNode("+");       
		btinfo.appendChild(t2);  

	    artista.appendChild(img_album);
	    artista.appendChild(text);
	    artista.appendChild(text2);
	    artista.appendChild(btn);
	    artista.appendChild(btn2);

	    artista.appendChild(btinfo);

	    espaiArtista.appendChild(artista);
	}
	a.appendChild(espaiArtista);
}


function musicaRecomended(){
	$("#sectionC").addClass("active"); 
	$("#sectionB").removeClass("active");  
	$("#sectionA").removeClass("active");
	$("#sectionD").removeClass("active");   

	var resultsSearched= musicRecommender.recommend();

	console.log(resultsSearched);

	document.getElementById("sectionB").innerHTML = "";
	var c = document.getElementById("sectionC");
	c.innerHTML = "";
	document.getElementById("sectionA").innerHTML = "";
	document.getElementById("sectionD").innerHTML = "";

	var espaiArtista = document.createElement('div');
	espaiArtista.id = "espaiArtista";

	for (var i = 0; i < resultsSearched.length; i++){
	   	
	   	var artista = document.createElement('div');
		artista.id = "artista";

	    var img_album = document.createElement("img");
		img_album.src = resultsSearched[i].imageAlbum;

		var text = document.createElement("h4");
		text.id="text";
		text.appendChild(document.createTextNode(resultsSearched[i].artist));
		var text2 = document.createElement("h5");
		text2.id="text2";
		text2.appendChild(document.createTextNode(resultsSearched[i].title));

		var btn = document.createElement("button");
		btn.id = i;
		btn.name = "pickPlay";
		var t = document.createTextNode("PLAY");       
		btn.appendChild(t);      

		if(esMeva == 1){
			var btn2 = document.createElement("button");
			btn2.name = "buttonRemovePlaylist";
			btn2.id = i;
			var t2 = document.createTextNode("REMOVE SONG");       
			btn2.appendChild(t2);   

		}else{
			var btn2 = document.createElement("button");
			btn2.name = "buttonAddPlaylist";
			btn2.id = i;
			var t2 = document.createTextNode("ADD TO PLAYLIST");       
			btn2.appendChild(t2);             
		}

		var btinfo = document.createElement("button");
		btinfo.name = "infoButton";
		btinfo.id = i;
		var t2 = document.createTextNode("+");       
		btinfo.appendChild(t2);  
		            
	    artista.appendChild(img_album);
	    artista.appendChild(text);
	    artista.appendChild(text2);
	    artista.appendChild(btn);
	    artista.appendChild(btn2);
	    artista.appendChild(btinfo);

	    espaiArtista.appendChild(artista);
	}
	c.appendChild(espaiArtista);
}


function musicaReciente(){

	var resultsSearched = data.get();


	console.log(resultsSearched);

	document.getElementById("sectionB").innerHTML = "";
	document.getElementById("sectionA").innerHTML = "";
	document.getElementById("sectionC").innerHTML = "";
	var d = document.getElementById("sectionD");
	d.innerHTML = "";

	var espaiArtista = document.createElement('div');
	espaiArtista.id = "espaiArtista";

	for (var i = 0; i < resultsSearched.length; i++){
	   	
	   	var artista = document.createElement('div');
		artista.id = "artista";

	    var img_album = document.createElement("img");
		img_album.src = resultsSearched[i].imageAlbum;

		var text = document.createElement("h4");
		text.id="text";
		text.appendChild(document.createTextNode(resultsSearched[i].artist));
		var text2 = document.createElement("h5");
		text2.id="text2";
		text2.appendChild(document.createTextNode(resultsSearched[i].title));

		var btn = document.createElement("button");
		btn.id = i;
		btn.name = "pickPlay";
		var t = document.createTextNode("PLAY");       
		btn.appendChild(t);      
		
		var btn2 = document.createElement("button");
		btn2.name = "buttonAddPlaylist";
		btn2.id = i;
		var t2 = document.createTextNode("ADD TO PLAYLIST");       
		btn2.appendChild(t2);             

		var btinfo = document.createElement("button");
		btinfo.name = "infoButton";
		btinfo.id = i;
		var t2 = document.createTextNode("+");       
		btinfo.appendChild(t2);  
		            
	    artista.appendChild(img_album);
	    artista.appendChild(text);
	    artista.appendChild(text2);
	    artista.appendChild(btn);
	    artista.appendChild(btn2);
	    artista.appendChild(btinfo);

	    espaiArtista.appendChild(artista);
	}
	d.appendChild(espaiArtista);
	console.log("Ho pinto tot!!");
}






function MusicRecommender(){

	var API_key = '9c0b61b65a89322422c7fc06942e154f';

	//busca les cançons corresponents al buscador. 
	this.topSongs= function(){
			//busca la cançó que ha entrat l'usuari. 
		
		var artist_url = 'http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key='+API_key+'&format=json'
		console.log(artist_url);

		var searchSongs = new AJAX;
		var json_object=searchSongs.connect(artist_url);
		musicTop= new Array();

		console.log(json_object);

		//obtenim els artistes més populars del moment - fent un TOP 20
	 	for (var i=0; i<20; i++){
	 		musicTop[i]= new track();
	 		musicTop[i].setArtist(json_object.tracks.track[i].artist.name);
	 		musicTop[i].setTitle(json_object.tracks.track[i].name);
	 		musicTop[i].setId('a'+ i)
	 		//console.log(json_object.tracks.track[i].image[2]['#text']);

	 		if(json_object.tracks.track[i].image[2]['#text']==null){
				musicTop[i].setImageAlbum("./images/no-image-icon-md.png");
				musicTop[i].setAlbum("No Album name");
			}else{

				//console.log(json_object.tracks.track[i].image[2]['#text']);
				musicTop[i].setImageAlbum(json_object.tracks.track[i].image[2]['#text']);
			}
		}

		return musicTop;
	}


	this.search= function(inputBuscador){
		//busca la cançó que ha entrat l'usuari. 
		var apiKey = "&api_key=5c248b3dd36c4ed7a5e641af6567b156&format=json";
		//console.log(apiKey);
		var api_url = "https://api.spotify.com/v1/search?q="+inputBuscador+"&type=track";
		//console.log(api_url);
		var search= new AJAX;
		var json_object=search.connect(api_url);
		musicSearch = new Array();
		
		//console.log(json_object);
		//console.log(json_object.tracks.items.length);

	 	//obtenim els artistes i el titol de la cançó
	 	for (var i=0; i<json_object.tracks.items.length; i++){

	 		musicSearch[i]= new track();
	 		musicSearch[i].setArtist(json_object.tracks.items[i].artists[0].name);
	 		musicSearch[i].setTitle(json_object.tracks.items[i].name);

	 		if(json_object.tracks.items[i].album==null){
				musicSearch[i].setImageAlbum("./images/no-image-icon-md.png");
				musicSearch[i].setAlbum("No Album name");
			}else{
				musicSearch[i].setAlbum(json_object.tracks.items[i].album.name);
 				musicSearch[i].setImageAlbum(json_object.tracks.items[i].album.images[2].url);
			}
		}

	 	return musicSearch;
	}

	this.recommend= function(){
		var apiKey = "&api_key=9c0b61b65a89322422c7fc06942e154f&limit=20&format=json";
		var search= new AJAX;
		musicRecommend = new Array();

		if(Playlist.musicPlayList.length == 0){

			var api_url = "http://ws.audioscrobbler.com/2.0/?method=geo.getTopTracks&country=Spain"+apiKey;
			var json_object=search.connect(api_url);

			console.log(json_object);
			
			for(var i=0; i<json_object.tracks.track.length; i++){
				musicRecommend[i]= new track();
				musicRecommend[i].setTitle(json_object.tracks.track[i].name);
				musicRecommend[i].setArtist(json_object.tracks.track[i].artist.name);

				var api_url1 = "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&track="+musicRecommend[i].getTitle()+"&artist="+musicRecommend[i].getArtist()+apiKey;
				var json_object1=search.connect(api_url1);

				if(json_object.tracks.track[i].image[2]['#text']==null){
					musicRecommend[i].setImageAlbum("./images/no-image-icon-md.png");
					musicRecommend[i].setAlbum("No Album name");
				}else{
					//console.log(json_object.tracks.track[i].image[2]['#text']);
					musicRecommend[i].setImageAlbum(json_object.tracks.track[i].image[2]['#text']);
				}
				
			}
		}else{
			esMeva = 1;
			musicRecommend= Playlist.get();
		}
		return musicRecommend;
	}

	this.playlist=function(llista){

		console.log("Soc dins del this.playlist");

		//document.getElementById("sectionB").innerHTML = "";
		var c = document.getElementById("sectionC");
		//c.innerHTML = "";
		//document.getElementById("sectionA").innerHTML = "";

		var espaiArtista = document.createElement('div');
		espaiArtista.id = "espaiArtista";

		for (var i = 0; i < llista.length; i++){
		   	
		   	var artista = document.createElement('div');
			artista.id = "artista";

		    var img_album = document.createElement("img");
			img_album.src = llista[i].imageAlbum;

			var text = document.createElement("h4");
			text.id="text";
			text.appendChild(document.createTextNode(llista[i].artist));
			var text2 = document.createElement("h5");
			text2.id="text2";
			text2.appendChild(document.createTextNode(llista[i].title));

			var btn = document.createElement("button");
			btn.id = i;
			var t = document.createTextNode("PLAY");       
			btn.appendChild(t);                         
			
			if(esMeva == 1){
				var btn2 = document.createElement("button");
				btn2.name = "buttonRemovePlaylist";
				btn2.id = i;
				var t2 = document.createTextNode("REMOVE SONG");       
				btn2.appendChild(t2);   

			}else{
				var btn2 = document.createElement("button");
				btn2.name = "buttonAddPlaylist";
				btn2.id = i;
				var t2 = document.createTextNode("ADD TO PLAYLIST");       
				btn2.appendChild(t2);             
			}                     

		    artista.appendChild(img_album);
		    artista.appendChild(text);
		    artista.appendChild(text2);
		    artista.appendChild(btn);
		    artista.appendChild(btn2);

		    espaiArtista.appendChild(artista);
		}
		c.appendChild(espaiArtista);
	}

	this.detail = function(artist){
		var details_url = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&api_key='+API_key+'&artist='+artist+'&format=json'
		console.log(details_url);

		var searchSongs = new AJAX;
		var json_object=searchSongs.connect(details_url);
		musicDetails= new track();

		console.log(json_object);

		musicDetails.setDetail(json_object.artist.bio.content);

		return musicDetails;
	}
	
}


var Playlist = {
  musicPlayList : new Array(),

  estaLlista : function (name) {
    var existeix = 0;
    for (i = 0; i < this.musicPlayList.length; i ++) {
      if (this.musicPlayList[i]["name"] == name) {
        //La cançó existeix
        existeix = existeix + 1;
      }
    }
    if (existeix == 0) {
      return false;
    }
    else {
      return true;
    }
  },

    save : function (title, artist, image) {
    //Comprovem que les cançons no estiguin duplicades
    console.log("On saveeee         "+ title, artist, image);

    esMeva = 1;

    if ( !Playlist.estaLlista(title) ) {
      this.musicPlayList.push({ title: title, artist: artist, imageAlbum: image });  
    }

    console.log(this.musicPlayList);
    console.log("no hi ha cançons repetides");
  },

  removeSong : function (id, title, artist , image) {
	this.musicPlayList.splice(id,1);	
	var llista = this.get();
	
	var c = document.getElementById("sectionC");
	c.innerHTML = "";
	//document.getElementById("sectionA").innerHTML = "";

	var espaiArtista = document.createElement('div');
	espaiArtista.id = "espaiArtista";

		for (var i = 0; i < llista.length; i++){
		   	
		   	var artista = document.createElement('div');
			artista.id = "artista";

		    var img_album = document.createElement("img");
			img_album.src = llista[i].imageAlbum;

			var text = document.createElement("h4");
			text.id="text";
			text.appendChild(document.createTextNode(llista[i].artist));
			var text2 = document.createElement("h5");
			text2.id="text2";
			text2.appendChild(document.createTextNode(llista[i].title));

			var btn = document.createElement("button");
			btn.id = i;
			var t = document.createTextNode("PLAY");       
			btn.appendChild(t);                         
			
			if(esMeva == 1){
				var btn2 = document.createElement("button");
				btn2.name = "buttonRemovePlaylist";
				btn2.id = i;
				var t2 = document.createTextNode("REMOVE SONG");       
				btn2.appendChild(t2);   

			}else{
				var btn2 = document.createElement("button");
				btn2.name = "buttonAddPlaylist";
				btn2.id = i;
				var t2 = document.createTextNode("ADD TO PLAYLIST");       
				btn2.appendChild(t2);             
			}                     

		    artista.appendChild(img_album);
		    artista.appendChild(text);
		    artista.appendChild(text2);
		    artista.appendChild(btn);
		    artista.appendChild(btn2);

		    espaiArtista.appendChild(artista);
		}
		c.appendChild(espaiArtista);
	
  },

  get : function () {
    return this.musicPlayList;
  },
}


function track(){
	
	this.id;
	this.title;
	this.artist;
	this.album;
	this.imageAlbum;
	this.details;

	this.getId=function(){
		return this.id;
	}
	this.getTitle=function(){
		return this.title;
	}
	this.getArtist=function(){
		return this.artist;
	}
	this.getAlbum=function(){
		return this.album;
	}
	this.getImageAlbum=function(){
		return this.imageAlbum;
	}
	this.getDetail=function(){
		return this.details;
	}
	this.setId=function(id){
		this.id=id;
	}
	this.setTitle=function(title){
		this.title=title;
	}
	this.setArtist=function(artist){
		this.artist=artist;
	}
	this.setAlbum=function(album){
		this.album=album;
	}
	this.setImageAlbum=function(image){
		this.imageAlbum=image;
	}
	this.setDetail = function(details){
		this.details=details;
	}
}


function AJAX(){

	this.connect= function(url){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, false);
        xhr.send(); //enviem les dades de petició
        
        var json_response=xhr.responseText;
        var response= JSON.parse(json_response);
        return response;
	}
}


var Player = {
  play : function (name, artist) {
    var button = document.createElement("button");
    button.id = "playlist_button";

    var url = new AJAX;
    var url_track = url.connect('https://api.spotify.com/v1/search?q=track:'+name+'%20artist:'+artist+'&type=track');
    
    if (document.getElementById("playButton") != null)
      document.getElementById("playButton").parentNode.removeChild(document.getElementById("playButton"));

    //Es crearà una zona de reproducció
    var div = document.createElement("div");
    div.id = "playButton";

    var i = document.createElement("i");

    var audio = document.createElement("audio");
    audio.controls = true;
    audio.autoplay = true;

    var source = document.createElement("source");
    source.id = "source_song";
    source.src = url_track.tracks.items[0].preview_url;
    source.type = "audio/mpeg";

    audio.appendChild(source);
    
    var info = document.createElement("div");
    info.id = "info_song_play";
    //Es controlarà que spotify no pugui reproduir la cançó i per tant es mostrarà un missatge d'error
    if (url_track != "null")
      info.appendChild(document.createTextNode(name));
    else 
      info.appendChild(document.createTextNode("Unable to play"));

    div.appendChild(info);
    button.appendChild(i);
    //div.appendChild(button);
    if (url_track != "null")
      div.appendChild(audio);

    document.body.appendChild(div);
  },
}



//Objecte per treballar amb localStorage. 

function Data(){

	musicaRecent = new Array();

	this.save = function(title, artist, image){
	
		infoNova =  '{ "title" : "' + title + '", "artist" : "' + artist + '", "image" : "'+ image + '"}';

		if (info == '{"recent" :['){

			info = info + infoNova;

		}else{

			info = info + "," + infoNova;

		}
		
		//var JSON = info + "]};";
		localStorage.setItem("info", info);
		console.log(info);
	}

	this.get = function(){


		var stringJSON = localStorage.getItem("info") + "]}";        
		var json_response=stringJSON;
        var response= JSON.parse(json_response);
       
		musicaRecent = new Array();
		
		//console.log(json_object);
		//console.log(json_object.tracks.items.length);

	 	//obtenim els artistes i el titol de la cançó

	 		//console.log("FOOOOOOOOOOOOOOOOOOOR");

	 	for (var i=0; i<response.recent.length; i++){

	 		//console.log("FOOOOOOOOOOOOOOOOOOOR");

	 		musicaRecent[i]= new track();
	 		musicaRecent[i].setArtist(response.recent[i].artist);
	 		musicaRecent[i].setTitle(response.recent[i].title);
	 		musicaRecent[i].setImageAlbum(response.recent[i].image);



	 		//musicaRecent[i]= new track();
	 		//musicaRecent[i].setArtist(response.artist);
	 		//musicaRecent[i].setTitle(response.title);
			//musicaRecent[i].setImageAlbum(response.image);
		}

		//console.log("ARTISTAAAAAAAAAAAA:  " + musicaRecent.artist);
		//console.log("TITOOOOOOOLLLLL" + musicaRecent.title);
		//console.log("IMAAAAAAAATGE" + musicaRecent.imageAlbum);


	 	return musicaRecent;

	}

	this.remove = function(){

		console.log("LOCAL STORAGE"+localStorage);

		var musicaRecent = new Array();

		for (var i = 0; i < localStorage.length; i++){

			musicaRecent[i] = new track;

		   	localStorage.removeItem(title);
   			localStorage.removeItem(artist);
   			localStorage.removeItem(imageAlbum);
    	
       	}
       	return musicaRecent;
	}
}

