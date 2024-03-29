geostationary_sats = [
    [14, 'TURKSAT 5B'],
    [15, 'TURKSAT 5A'],
    [16, 'TURKSAT 4B'],
    [17, 'TURKSAT 4A'],
    [18, 'TURKSAT 3A'],
    [19, 'TURKSAT 2A'],
    [20, 'TURKSAT 1C'],
    [21, 'TURKSAT 1B']
];
var Orb = {
	
    satelliteMarkers: new Array(),
    isInitialized: false, // New flag to track initialization status

    startTracking: function(map, homeLat, homeLng) {
        Orb.map = map;

        // Check if OrbTrak is already initialized
        if (!Orb.isInitialized) {
            Orb.crossBrowserSetStyle(map, "background-image: url(orbimages/world.jpg); overflow: hidden;", true);

            var frag = document.createDocumentFragment();
            var div = document.createElement("div");
            div.id = "home";

            Orb.crossBrowserSetStyle(div, "position:relative; width: 17px; height: 24px; background-image: url(orbimages/home.png);", false);
            frag.appendChild(div);
            Orb.map.appendChild(frag);
            Orb.home = document.getElementById("home");

            PLib.InitializeData();
            Orb.setHomeCoordinates(homeLat, homeLng);
            Orb.createSatelliteMarkers();
            Orb.updateSatellites();

            Orb.isInitialized = true; // Set OrbTrak as initialized
        } else {
            // OrbTrak is already initialized, update home coordinates only
            Orb.setHomeCoordinates(homeLat, homeLng);
        }
    },

		setHomeCoordinates: function(homeLat, homeLng)
		{
			PLib.configureGroundStation(homeLat, homeLng);
			console.log("Setting Home Coordinates:", homeLat, homeLng);
			Orb.home.style.top = ((-homeLat + 90) * 1.5 - 12.0) + "px";
			Orb.home.style.left =  ((parseInt(homeLng) + 180) * 1.5 - 12.0) + "px";
		},

		crossBrowserSetStyle: function(element, css, append)
		{
			var obj, attributeName;
			var useStyleObject = element.style.setAttribute;

			obj = useStyleObject ? element.style : element;
			attributeName = useStyleObject ? "cssText" : "style";

			if (append)
				css += obj.getAttribute(attributeName);

			obj.setAttribute(attributeName, css);
		},

		createOneMarker: function(txt)
		{
			var frag = document.createDocumentFragment();
			var markerCount = Orb.satelliteMarkers.length;

			var div = document.createElement("div");
			div.id = "satelliteMarker" + markerCount;
			Orb.crossBrowserSetStyle(div, "position:absolute; width: 24px; height: 24px; background-image: url(orbimages/sas.png);", false);
			var innerDiv = document.createElement("div");
			Orb.crossBrowserSetStyle(innerDiv, "position:absolute; left: 7px; top: 5px; font-size: 12px;");
			var txt = document.createTextNode(txt);

			innerDiv.appendChild(txt);
			div.appendChild(innerDiv);
			frag.appendChild(div);
			Orb.map.appendChild(frag);

			Orb.satelliteMarkers[markerCount] = document.getElementById(div.id)
		},

		createSatelliteMarkers: function()
		{
			for (var i = 1; i <= PLib.sat.length; i++)
				Orb.createOneMarker(i);
		},

		updateSatellites: function()
		{
			var satInfo;

			for (var i = 0; i < PLib.sat.length; i++)
			{
				satInfo = PLib.QuickFind(PLib.sat[i].name);
				
				//console.log("Satellite Name:", PLib.sat[i].name);
				
				Orb.satelliteMarkers[i].style.top = ((-satInfo.latitude + 90) * 1.5 - 12.0) + "px";
				Orb.satelliteMarkers[i].style.left =  ((satInfo.longitude + 180) * 1.5 - 12.0) + "px";
			}

			setTimeout("Orb.updateSatellites()", 5000);
		},

		createCell: function(tr, className, txt)
		{
			var td = document.createElement("td");
			td.className = className;
			txt = document.createTextNode(txt);
			td.appendChild(txt);
			tr.appendChild(td);
		},

		createHeaderColumn: function(tr, txt)
		{
			var th = document.createElement("th");
			th.className = "orb-header";
			txt = document.createTextNode(txt);
			th.appendChild(txt);
			tr.appendChild(th);
		},

		generateTable: function(divTable) {
			var tr, visibilityText, detailClassName;
			var frag = document.createDocumentFragment();
			var satInfoColl = PLib.getTodaysPasses();

			while (divTable.childNodes.length > 0) {
				divTable.removeChild(divTable.firstChild);
			}

			var tbl = document.createElement("table");
			Orb.crossBrowserSetStyle(tbl, "border-collapse: collapse; margin-left: auto; margin-right: auto;", false);

			var thead = document.createElement("thead");
			tr = document.createElement("tr");

			Orb.createHeaderColumn(tr, '# on Map');
			Orb.createHeaderColumn(tr, 'Name');
			Orb.createHeaderColumn(tr, 'Pass #');
			Orb.createHeaderColumn(tr, 'Date');
			Orb.createHeaderColumn(tr, 'Local Time');
			Orb.createHeaderColumn(tr, 'Peak Elev.');
			Orb.createHeaderColumn(tr, 'Azimuth');
			Orb.createHeaderColumn(tr, 'Range (km)');
			Orb.createHeaderColumn(tr, 'Visibility');

			thead.appendChild(tr);
			tbl.appendChild(thead);

			var tbody = document.createElement("tbody");

			for (var i = 0; i < satInfoColl.length; i++) {
				tr = document.createElement("tr");

				detailClassName = satInfoColl[i].visibility == "+" ? "orb-detailVisible" : "orb-detail";

				Orb.createCell(tr, detailClassName, satInfoColl[i].number);
				Orb.createCell(tr, detailClassName, satInfoColl[i].name);
				Orb.createCell(tr, detailClassName, satInfoColl[i].passNo);
				Orb.createCell(tr, detailClassName, PLib.formatDateOnly(satInfoColl[i].dateTimeStart));
				Orb.createCell(tr, detailClassName, PLib.formatTimeOnly(satInfoColl[i].dateTimeStart) + "  to  " + PLib.formatTimeOnly(satInfoColl[i].dateTimeEnd));
				Orb.createCell(tr, detailClassName, satInfoColl[i].peakElevation + "\u00B0");
				Orb.createCell(tr, detailClassName, satInfoColl[i].riseAzimuth + ", " + satInfoColl[i].peakAzimuth + ", " + satInfoColl[i].decayAzimuth);
				Orb.createCell(tr, detailClassName, satInfoColl[i].riseRange + ", " + satInfoColl[i].peakRange + ", " + satInfoColl[i].decayRange);

				switch (satInfoColl[i].visibility) {
					case "+":
						visibilityText = 'Visible';
						break;
					case "*":
						visibilityText = 'Not Visible';
						break;
					default:
						visibilityText = 'Eclipsed';
				}

				Orb.createCell(tr, detailClassName, visibilityText);

				tbody.appendChild(tr);
				}
				
			    // Handle geostationary satellites separately
				for (var i = 0; i < geostationary_sats.length; i++) {
					tr = document.createElement("tr");
					detailClassName = "orb-detail";
					console.log("geostationary_sats[" + i + "][0]:", geostationary_sats[i][0]);

					// Use geostationary_sats[i][0] and geostationary_sats[i][1] for the number and name
					Orb.createCell(tr, detailClassName, geostationary_sats[i][0].toString());
					Orb.createCell(tr, detailClassName, geostationary_sats[i][1].toString());

					// Add placeholders ("-") for the remaining columns
					for (var j = 0; j < 7; j++) {
						Orb.createCell(tr, detailClassName, "-");
					}

					tbody.appendChild(tr);
				}

			tbl.appendChild(tbody);
			frag.appendChild(tbl);
			divTable.appendChild(frag);

		}

}