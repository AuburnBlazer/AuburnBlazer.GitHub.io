// =========================
// CONFERENCE FILTER
// =========================
function filterConference()
{
    let filter =
        document.getElementById("conferenceFilter").value;

    let table =
        document.getElementById("rankings");

    let rows =
        table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++)
    {
        let conf =
            rows[i].getAttribute("data-conference");

        if (filter === "All" || conf === filter)
        {
            rows[i].style.display = "";
        }
        else
        {
            rows[i].style.display = "none";
        }
    }
}

// =========================
// TABLE SORT
// =========================
function sortTable(n)
{
    var table, rows, switching,
        i, x, y, shouldSwitch,
        dir, switchcount = 0;

    table = document.getElementById("rankings");

    switching = true;

    dir = "asc";

    while (switching)
    {
        switching = false;

        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++)
        {
            shouldSwitch = false;

            x = rows[i]
                .getElementsByTagName("TD")[n];

            y = rows[i + 1]
                .getElementsByTagName("TD")[n];

            if (dir == "asc")
            {
                if (Number(x.innerHTML.toLowerCase()) >
                    Number(y.innerHTML.toLowerCase()))
                {
                    shouldSwitch = true;
                    break;
                }
            }
            else if (dir == "desc")
            {
                if (Number(x.innerHTML.toLowerCase()) <
                    Number(y.innerHTML.toLowerCase()))
                {
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if (shouldSwitch)
        {
            rows[i].parentNode.insertBefore(
                rows[i + 1],
                rows[i]
            );

            switching = true;

            switchcount++;
        }
        else
        {
            if (switchcount == 0 &&
                dir == "asc")
            {
                dir = "desc";
                switching = true;
            }
        }
    }
}