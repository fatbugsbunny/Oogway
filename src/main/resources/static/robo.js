try {
    const socket = new SockJS('http://localhost:8080/ws'); // backend endpoint
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
        console.log('Connectedddd: ' + frame);

        stompClient.subscribe('/topic/dashboard', function (message) {
            renderWaterData(JSON.parse(message.body));
            console.log("#######");
        });

        console.log('📡 Subscribed to /topic/dashboard');
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

// Function to determine ORP status
function getORPStatus(orp) {
    if (orp < 200 || orp > 750) return "bad";
    if (orp < 300 || orp > 500) return "warning";
    return "good";
}

// Function to determine ORP description
function getORPDescription(orp) {
    if (orp < 200) return "ORP shumë e ulët - Oksidim i dobët, mund të tregojë ndotës";
    if (orp > 600) return "ORP shumë e lartë - Oksidim i larte, mjedis shume i paster";
    if (orp < 300) return "Low ORP - Reduced sanitizing capability";
    if (orp > 500) return "High ORP - Strong oxidizing environment";
    return "Ideal ORP - Optimal sanitizing capability";
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

// Update in the getOverallQuality function:
function getOverallQuality(pH, orp, temp) {
    const phStatus = getPHStatus(pH);
    const orpStatus = getORPStatus(orp);  // Changed from saltStatus
    const tempStatus = getTempStatus(temp);

    if (phStatus === "bad" || orpStatus === "bad" || tempStatus === "bad") {
        return "bad";
    }

    if (phStatus === "warning" || orpStatus === "warning" || tempStatus === "warning") {
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
function renderWaterData(data) {
    const content = document.getElementById('content');
    const phStatus = getPHStatus(data.pH);
    const orpStatus = getORPStatus(data.orp);
    const tempStatus = getTempStatus(data.temperature);
    const overallQuality = getOverallQuality(data.pH, data.orp, data.temperature);

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
                        <div class="stat-status status-${orpStatus}">${getStatusIcon(orpStatus)}</div>
                        <div class="icon">⚡</div>  
                        <h2 class="stat-title">ORP Level</h2>
                        <div class="stat-value">${data.orp} mV</div>  
                        <p class="stat-description">${getORPDescription(data.orp)}</p>
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
