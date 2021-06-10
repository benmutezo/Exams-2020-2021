/*TASK 2: STORE ALL PROFILES TO MAIN PAGE*/

/*GET ELEMENT TO STORE PROFILE*/
var profileSection = document.getElementById("profile");

/*STORE EACH PROFILE AS AN ARRAY INSIDE A PROFILES ARRAY */
var profilesArray = [
  ["Daniel", 24, "man", "../images/man1.jpg", "Liker å danse"],
  ["Ben", 22, "man", "../images/man2.jpg", "Glad i å trene"],
  ["Alex", 27, "man", "../images/man3.jpg", "Liker fotball"],
  ["Danielle", 25, "woman", "../images/woman1.jpg", "Elsker håndball og å treffe nye folk"],
  ["Bailey", 19, "woman", "../images/woman2.jpg", "Glad i å lese bøker"],
  ["Alexandra", 27, "woman", "../images/woman3.jpg", "Glad i å reise på nye eventy!"],
];

/*LIST ALL PROFILES ON MAIN PAGE */
for (var i = 0; i < profilesArray.length; i++) {
  var profile = profilesArray[i]; //EACH PROFILE IN A CLEAR DEFINED VARIABLE

  /* EXTRACT EACH PROFILE PROPERTY */
  var name = profile[0];
  var age = profile[1];
  var gender = profile[2];
  var profileImg = profile[3];
  var bio = profile[4];

  /*PRINT TO SECTION ELEMENT*/
  profileSection.innerHTML += `
    <section class="profile">
    <img src="${profileImg}" alt="${gender}">
    <h4>Name: ${name}</h4> 
    <p>Age: ${age}</p> 
    <p>Gender: ${gender} <p/>
    <article>${bio} </article> 
    </section>`;
}