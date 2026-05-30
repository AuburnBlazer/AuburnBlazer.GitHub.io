let teamsData = {};

window.addEventListener("DOMContentLoaded", async () => {

    try {

        const response = await fetch("teams.json");
        teamsData = await response.json();

        populateDropdowns();
        initializeComparison();

    } catch (error) {

        console.error("Failed to load teams.json", error);

    }

});

function populateDropdowns() {

    const team1Select =
        document.getElementById("team1Select");

    const team2Select =
        document.getElementById("team2Select");

    const teamNames =
        Object.keys(teamsData).sort();

    teamNames.forEach(teamName => {

        const option1 =
            document.createElement("option");

        option1.value = teamName;
        option1.textContent = teamName;

        team1Select.appendChild(option1);

        const option2 =
            document.createElement("option");

        option2.value = teamName;
        option2.textContent = teamName;

        team2Select.appendChild(option2);

    });

    team1Select.addEventListener(
        "change",
        updateComparison
    );

    team2Select.addEventListener(
        "change",
        updateComparison
    );

}

function initializeComparison() {

    const params =
        new URLSearchParams(window.location.search);

    const allTeams =
        Object.keys(teamsData);

    let team1 =
        params.get("team1");

    let team2 =
        params.get("team2");

    if (!team1 || !teamsData[team1]) {

        team1 = allTeams[0];

    }

    if (!team2 || !teamsData[team2]) {

        team2 = allTeams[1];

    }

    document.getElementById("team1Select").value =
        team1;

    document.getElementById("team2Select").value =
        team2;

    renderComparison(team1, team2);

}

function updateComparison() {

    const team1 =
        document.getElementById("team1Select").value;

    const team2 =
        document.getElementById("team2Select").value;

    const newUrl =
        `?team1=${encodeURIComponent(team1)}&team2=${encodeURIComponent(team2)}`;

    window.history.replaceState(
        {},
        "",
        newUrl
    );

    renderComparison(team1, team2);

}

function renderComparison(team1Name, team2Name) {

    const team1 =
        teamsData[team1Name];

    const team2 =
        teamsData[team2Name];

    populateTeam(team1, "team1");
    populateTeam(team2, "team2");

}

function populateTeam(team, prefix) {

    const fieldMappings = {

        Name: "name",
        Record: "record",
        Conference: "conference",

        Rank: "rank",
        Rating: "rating",

        Q1: "q1",
        Q2: "q2",
        Q3: "q3",
        Q4: "q4",

        SOS: "sos",
        SOSRank: "sosRank",

        RPI: "rpi",
        RPIRank: "rpiRank",

        BestWin: "bestWin",
        WorstLoss: "worstLoss"

    };

    Object.entries(fieldMappings).forEach(([htmlField, jsonField]) => {

        const element =
            document.getElementById(prefix + htmlField);

        if (element) {

            element.textContent =
                team[jsonField];

        }

    });

    const logo =
        document.getElementById(prefix + "Logo");

    if (logo) {

        logo.src = team.logo;
        logo.alt = team.name + " Logo";

    }

}
