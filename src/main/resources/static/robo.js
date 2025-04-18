let data;

try {
    const socket = new SockJS('http://localhost:8080/ws'); // backend endpoint
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);

        stompClient.subscribe('/topic/dashboard', function (message) {
            data = JSON.parse(message.body)
            console.log("#######");
            console.log(data);
            console.log("#######")
        });
    });
} catch (error) {
    console.error("Error fetching water data:", error);
    document.getElementById('content').innerHTML = `
                    <div class="error">
                        <p>Failed to load water quality data. Please try again later.</p>
                    </div>
                `;
}

// Function to determine pH status
function getPHStatus(pH) {
    if (pH < 6.0 || pH > 9.0) return "bad";
    if (pH < 6.5 || pH > 8.5) return "warning";
    return "good";
}

// Function to determine pH description
function getPHDescription(pH) {
    if (pH < 6.0) return "Highly acidic - Harmful to aquatic life";
    if (pH > 9.0) return "Highly alkaline - Harmful to aquatic life";
    if (pH < 6.5) return "Mildly acidic - May stress some species";
    if (pH > 8.5) return "Mildly alkaline - May stress some species";
    return "Neutral - Optimal for aquatic life";
}

// Function to determine salt level status
function getSaltStatus(salt) {
    if (salt < 25 || salt > 45) return "bad";
    if (salt < 30 || salt > 40) return "warning";
    return "good";
}

// Function to determine salt level description
function getSaltDescription(salt) {
    if (salt < 25) return "Very low salinity - Unsuitable for marine life";
    if (salt > 45) return "Very high salinity - Stressful for marine life";
    if (salt < 30) return "Low salinity - Suitable for brackish species only";
    if (salt > 40) return "High salinity - May stress some marine species";
    return "Normal ocean salinity - Ideal for marine ecosystems";
}

// Function to determine temperature status
function getTempStatus(temp) {
    if (temp < 15 || temp > 28) return "bad";
    if (temp < 18 || temp > 25) return "warning";
    return "good";
}

// Function to determine temperature description
function getTempDescription(temp) {
    if (temp < 15) return "Critically cold - Harmful to many species";
    if (temp > 28) return "Critically warm - Risk of harmful algal blooms";
    if (temp < 18) return "Cold - May slow biological activity";
    if (temp > 25) return "Warm - Monitor for potential issues";
    return "Moderate - Optimal for diverse aquatic life";
}

// Function to determine overall water quality
function getOverallQuality(pH, salt, temp) {
    const phStatus = getPHStatus(pH);
    const saltStatus = getSaltStatus(salt);
    const tempStatus = getTempStatus(temp);

    if (phStatus === "bad" || saltStatus === "bad" || tempStatus === "bad") {
        return "bad";
    }

    if (phStatus === "warning" || saltStatus === "warning" || tempStatus === "warning") {
        return "warning";
    }

    return "good";
}

// Function to get status indicator icon
function getStatusIcon(status) {
    if (status === "good") return "✓";
    if (status === "warning") return "!";
    if (status === "bad") return "!!";
    return "";
}

// Function to render the data
function renderWaterData() {
    const content = document.getElementById('content');
    const phStatus = getPHStatus(data.pH);
    const saltStatus = getSaltStatus(data.saltLevel);
    const tempStatus = getTempStatus(data.temperature);
    const overallQuality = getOverallQuality(data.pH, data.saltLevel, data.temperature);

    let qualityBadge = '';
    if (overallQuality === "good") {
        qualityBadge = `
                    <div class="quality-badge quality-good">
                        <span class="quality-icon">✓</span>
                        Water Quality: Excellent
                    </div>
                `;
    } else if (overallQuality === "warning") {
        qualityBadge = `
                    <div class="quality-badge quality-warning">
                        <span class="quality-icon">!</span>
                        Water Quality: Needs Attention
                    </div>
                `;
    } else {
        qualityBadge = `
                    <div class="quality-badge quality-bad">
                        <span class="quality-icon">!!</span>
                        Water Quality: Critical
                    </div>
                `;
    }

    content.innerHTML = `
                <div class="quality-indicator">
                    ${qualityBadge}
                </div>

                <div class="stats-container">
                    <div class="stat-card ph">
                        <div class="stat-status status-${phStatus}">${getStatusIcon(phStatus)}</div>
                        <div class="icon">💧</div>
                        <h2 class="stat-title">pH Level</h2>
                        <div class="stat-value">${data.pH}</div>
                        <p class="stat-description">${getPHDescription(data.pH)}</p>
                    </div>

                    <div class="stat-card salt">
                        <div class="stat-status status-${saltStatus}">${getStatusIcon(saltStatus)}</div>
                        <div class="icon">🧂</div>
                        <h2 class="stat-title">Salt Level</h2>
                        <div class="stat-value">${data.saltLevel} ppt</div>
                        <p class="stat-description">${getSaltDescription(data.saltLevel)}</p>
                    </div>

                    <div class="stat-card temperature">
                        <div class="stat-status status-${tempStatus}">${getStatusIcon(tempStatus)}</div>
                        <div class="icon">🌡️</div>
                        <h2 class="stat-title">Temperature</h2>
                        <div class="stat-value">${data.temperature}°C</div>
                        <p class="stat-description">${getTempDescription(data.temperature)}</p>
                    </div>
                </div>
            `;
}

// Initialize the app
function initApp() {
    if (data) {
        renderWaterData(data);
    }
}

// Start the app when the page loads
window.addEventListener('load', initApp);
