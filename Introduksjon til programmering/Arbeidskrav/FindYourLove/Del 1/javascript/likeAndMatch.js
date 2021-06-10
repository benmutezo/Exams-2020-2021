/*BASE CLASS FOR ALL USERS */
class User {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;

    }
    getName() {
        return this.name;
    }
    getAge() {
        return this.getAge;
    }

    getGender() {
        return this.gender;
    }

}

/*CHILD CLASS FOR THE CLIENT THAT INHERITS FROM THE BASE CLASS */
class ClientProfile extends User {
    constructor(name, age, gender) {
        super(name, age, gender);
    
    }


}

/*CLASS FOR THE PEOPLE IN THE "DATABASE" THAT INHERITS FROM THE BASE CLASS USER AND INCLUDES ADDITONAL PROPERTIES AND METHODS*/
class DatabaseProfile extends User {
    constructor(id, name, age, gender, profileImg, bio, match) {
        super(name, age, gender);
        this.userID = id;
        this.profileImg = profileImg;
        this.bio = bio;
        this.isMatch = match;
    }

    getisMatch() {
        return this.isMatch;
    }

    getInfo(cls = "main-matches-view", imgcls = "img") {
        return `
            <section class=${cls}>
            <img class=${imgcls} src="../images/${this.profileImg}.jpg" alt="${this.gender}">
            <h4>Name: ${this.name}</h4>
            <p>Age: ${this.age}</p>
            <p>Gender: ${this.gender} <p/>
            <article>${this.bio} </article>
            </br>
            </section>
        `;
    }
    getInfoHidden(cls, imgcls) {
        return `
            <section class=${cls}>
            <img class=${imgcls} src="../images/${this.profileImg}.jpg" alt="${this.gender}">
            <h4>${this.name}, ${this.age}</h4>
            </br>
            </section>
        `;
    }

}

/*ONE "MAIN" FUNCTION TO RUN THE WHOLE APP*/
function start() {

    /*CREATES A NEW ID FOR EACH PROFILE, TO SIMULATE "REAL LIFE".*/

    function profileID() {
        var id = 1;
        return id++;
    }

    /* CREATES NEW INSTANCES OF EACH PROFILE IN THE "DATABASE" */
    var daniel = new DatabaseProfile(profileID(), "Daniel", 24, "man", "man1", "Liker å danse", true);
    var ben = new DatabaseProfile(profileID(), "Ben", 22, "man", "man2", "Glad i å trene", false);
    var alex = new DatabaseProfile(profileID(), "Alex", 27, "man", "man3", "Liker fotball", true);
    var danielle = new DatabaseProfile(profileID(), "Danielle", 25, "woman", "woman1", "Elsker håndball og å treffe nye folk", false);
    var bailey = new DatabaseProfile(profileID(), "Bailey", 19, "woman", "woman2", "Glad i å lese bøker", true);
    var alexandra = new DatabaseProfile(profileID(), "Alexandra", 27, "woman", "woman3", "Glad i å reise på nye eventy!", "false");

    var checkedIsMan = getID("man");
    var checkedIsWoman = getID("woman");
    var checkedIsBoth = document.querySelectorAll(".hide");
    var proceedBtn = getID("proceed-btn");
    var client;

    /*FUNCTION TO RETRIVE ALL NECCECARY DETAILS OF A NEW USER*/
    function getClientInfo() {
        var clientForm = getID("client-form");
        var clientName = getID("client-name").value;
        var clientAge = parseNumber(getID("client-age").value)
        var clientLabel = getID("client-label");

        checkedIsBoth[0].className = "show";
        checkedIsBoth[1].className = "show";

        /*GET PREFERED AGE HERE */

        clientLabel.innerHTML = "Hvilket kjønn ønkser du å se?";
        client = new ClientProfile(clientName, clientAge);
        resetCheck();
        clearInnerHTML(clientForm);

        proceedBtn.onclick = filterGenders;

    }


    /*GREETS THE USER APPROPRIATELY BASED ON THE TIME OF THE DAY*/
    function greetByTime() {
        var dt = new Date();
        var tm = dt.getHours();
        var greeting =
            tm = 0 && tm < 6 ? "God natt" :
            tm >= 6 && tm < 9 ? "God morgen" :
            tm >= 9 && tm < 12 ? "God formiddag" :
            tm >= 12 && tm < 18 ? "God ettermiddag" :
            "God Kveld";

        return greeting;
    }


    function resetCheck() {
        checkedIsMan.checked = false;
        checkedIsWoman.checked = false;
    }


    function parseNumber(number) {
        return parseInt(number);
    }


    function filterGenders() {

        var checkArray = [checkedIsBoth[0], checkedIsMan, checkedIsWoman];
        for (let i = 0; i < checkArray.length; i++) {
            const checkValue = checkArray[i];
            if (checkValue.checked) {
                displayGender(checkValue.value);
            }
        }

    }

    function displayGender(gender) {

        /*ALL AVAILABLE PROFILES FROM THE PREVIOUS INSTANCIATION IN ONE ARRAY */
        var users = [daniel, ben, alex, danielle, bailey, alexandra];

        var profileSection = getClass("hide");
        profileSection[0].className = "show";
        var innerProfile = getID("profile");

        var liked = getID("like");
        var unliked = getID("unlike");

        var index = 0;
        var matchCounter = 0;
        matchStatus(matchCounter);

        var allProfiles = [];
        var matches = [];


        if (gender === "woman" || gender === "man") { //PUTS ALL THE GENDERS THAT THE USERS WANTS TO ONE ARRAY. 
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                if (user.getGender() === gender) {
                    allProfiles.push(user);
                }
            }
        } else {
            //THIS PUTS ALL GENDERS TO ONE ARRAY THIS ONLY HAPPENS WHEN USER CHECKS "BOTH" GENDERS.
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                allProfiles.push(user);
            }
        }

        /*DISPLAYS THE FIRST PROFILE */
        innerProfile.innerHTML = allProfiles[0].getInfo();

        /* STEPS THATS HAPPENS WHEN USER LIKES A PROFILE */
        function userLiked() {

            var profile = allProfiles[index];
            innerProfile.style.animationName = "liked";

            if (profile.getisMatch()) { //STEPS WHEN USER LIKE IS MUTUAL 
                matchCounter++; //INCREASE MATCHES
                matchStatus(matchCounter); // KEEP USER INFORMATED OF CURRENT STREAK

                if (matchCounter === 1) {
                    alert(`Gratulerer med din første match ${profile.getName()}!`);
                } else {
                    alert(`Gratulerer du og ${profile.getName()} har matchet!`);
                }
                matches.push(profile); // ADD MATCH TO AN ARRAY
            }

            setTimeout(showNextProfile, 2000) // WAIT 2 SEC FOR ANIMATION TO FINISH BEFORE SHOWING NEXT USER
        }

        /* STEPS THATS HAPPENS WHEN USER LIKES A PROFILE */
        function userUnliked() {
            var profile = allProfiles[index]
            if (profile.getisMatch() && confirm("Der går du glipp av en match! Vil du ombestemme deg?")) { // CHECK IF USER IS ABOUT TO "MISS" A MATCH IF SO, INFORM IF USER CHANGES MIND RUN "userliked()"
                userLiked();
            } else {
                innerProfile.style.animationName = "unLiked";
                setTimeout(showNextProfile, 2000)

            }
        }

        /*SHOWS NEXT AVAILABLE USER WHEN USER LIKES/UNLIKES */
        function showNextProfile() {
            index++;
            if (index < allProfiles.length) { //CHECK IF THERE MORE PROFILES AVAILABLE FOR THE USER TO SEE, IF SO SHOW THE NEXT PROFILE
                profile.innerHTML = allProfiles[index].getInfo();
                profile.style.animationName = "smooth";
            } else { // INFORMS THE USER IF THERE NOR MORE PROFILES TO SHOW
                profileSection = getClass("show")[0];
                profileSection.innerHTML = "<p>Ingen flere profiler å vise!</p> ";
            }
        }


        /* ALLWAY KEEPS THE USER INFORMED OF CURRENT MATCHES*/
        function matchStatus(matchCounter) {
            var statusBar = getID("status-bar");
            statusBar.innerHTML = `<label id ="match-record">Du har ingen matcher enda, begynn å like!</label> <a class="hide"></a>`;
            var viewMatchesBtn = getClass("hide")[0];

            if (matchCounter > 0) {
                var matchLabel = getID("match-record").innerHTML = "";
                viewMatchesBtn.className = "view-matches"
                if (matchCounter === 1) {
                    viewMatchesBtn.innerHTML = `Vis min match`;
                } else {
                    viewMatchesBtn.innerHTML = `Vis matchene mine: ${matchCounter}`;

                }
            }
            viewMatchesBtn.onclick = viewMatches
        }

        /*WHAT HAPPENS WHEN USER WANTS TO VIEW THE MATCHES THIS IS ONLY AVAILABLE WHEN USER HAS ONE OR MORE MATCHES */
        function viewMatches() {
            var profiles = getClass("hide")[0];
            var h = getID("hidden-profile");
            var btn = getID("close");
            var clientStatus = getID("client-status");
            profiles.className = "maches-container";
            btn.onclick = hide

            for (var i = 0; i < matches.length; i++) {
                var match = matches[i];
                h.innerHTML += match.getInfoHidden("hidden-matches-view", "img2");
                clientStatus.innerHTML = `${greetByTime()} ${client.getName()}! Du har ${matchCounter} match så langt.`;
            }

            function hide() {
                profiles.className = "hide";
                clearInnerHTML(h);
            }
        }


        liked.onclick = userLiked;
        unliked.onclick = userUnliked;

    }


    function getID(id) {
        return document.getElementById(id);
    }

    function getClass(cls) {
        return document.getElementsByClassName(cls);
    }

    function clearInnerHTML(element) {
        element.innerHTML = "";
    }

    proceedBtn.onclick = getClientInfo;

}

start();