/*TASK #2: FILTER A PROFILE BASED ON USER PREFERENCIES */

/*GET VALUES GIVEN BY USER */
var givenAge = document.getElementById("given-age");
var givenGender = document.getElementById("given-gender");

var submit = document.getElementById("submit-btn");

var profileSection = document.getElementById("profile-section");

/*ARRAY OF ALL THE USER OBJECTS FROM THE "DATABASE" */
var profilesArray = [{
    name: "Daniel",
    age: 24,
    gender: "mann",
    img: "../images/man1.jpg",
    bio: "Liker å danse"
  },
  {
    name: "Ben",
    age: 22,
    gender: "mann",
    img: "../images/man2.jpg",
    bio: "Glad i å trene"
  },
  {
    name: "Alex",
    age: 28,
    gender: "mann",
    img: "../images/man3.jpg",
    bio: "Liker fotball"
  },
  {
    name: "Danielle",
    age: 23,
    gender: "kvinne",
    img: "../images/woman1.jpg",
    bio: "Elsker håndball og å treffe nye folk"
  },
  {
    name: "Bailey",
    age: 19,
    gender: "kvinne",
    img: "../images/woman2.jpg",
    bio: "Glad i å lese bøker"
  },

  {
    name: "Alexandra",
    age: 27,
    gender: "kvinne",
    img: "../images/woman3.jpg",
    bio: "Glad i å reise på nye eventy!"
  }
];

/* FUNCTION FOR FINDING A MATCH BASED ON USERS INPUT*/
function findMatch() {
  var wantedAge = parseInt(givenAge.value);
  var wantedGender = givenGender.value.toLowerCase();


  var matchesFound = []; // ARRAY TO STORE ALL THE MATCHES THAT SUITE THE USERS REQUIREMENTS
  var ageLimit = 25;

  for (var i = 0; i < profilesArray.length; i++) {

    // EXTRACT ALL THE PROFILES TO DEFINED VARIABLES SO THAT IT IS EASER TO WORK WITH
    var profile = profilesArray[i];
    var profileAge = profile.age;
    var profileGender = profile.gender;


    // PUTS ALL THE PROFILES WHO MATCHES WITH THE USER REQUIREMENTS TO THE PREDIFINED ARRAY "MATCHES FOUND"
    if (
      wantedAge >= ageLimit &&
      profileAge >= ageLimit &&
      profileGender === wantedGender
    ) {

      matchesFound.push(profile);
    } else if (
      wantedAge < ageLimit &&
      profileAge < ageLimit &&
      profileGender === wantedGender
    ) {
      matchesFound.push(profile);
    }
  }

  // AFTER PUTTING ALL THE INVOKE THE FUNCTION "displayMatch" WITH THE MATCHES FOUND ARRAY AS THE ARGUEMENT

  displayMatch(matchesFound);
  clearInput();
}


/*FUNTION RESPONSIBLE FOR DISPLAY ONE MATCH TO THE USER*/
function displayMatch(matches) {

  var randomMatch = Math.floor(Math.random() * matches.length); // GENERATING A RANDOM NUMBER NOT GREATER THAN THE LENGTH OF THE ARRAY PASSED AS AN ARGUEMENT


  var match = matches[randomMatch]; // CHOOSE A SINGLE PROFILE BASED AT THE INDEX GENARATED BY THE "randomMatch" VARIABLE.

  /*ASSIGN ALL OF THE OBJECT PROPERTIES TO APPROPRIATE NAMED VARIABLES*/
  var name = match.name;
  var age = match.age;
  var gender = match.gender;
  var profileImg = match.img;
  var bio = match.bio;

  /*SHOW THE PROFILE TO THE USER */
  profileSection.innerHTML = `
        <section class="profile">
            <img src="${profileImg}" alt="${gender}">
            <h4>Navn: ${name}</h4> 
            <p>Alder: ${age}</p> 
            <p>Kjønn: ${gender} <p/>
            <article>${bio} </article> 
        </section>
        `;
}

/*SIMPLE FUNCTION FOR CLEARNING THE USER INPUT*/

function clearInput() {
  givenAge.value = "";
  givenGender.value = "";
}

submit.onclick = findMatch;