try {
    setInterval(() => {
        fetch("/waterData")
            .then((response) => response.json())
            .then((json) => renderWaterData(json))
    }, 1000)
} catch (error) {
    console.error("Error fetching water data:", error);
    document.getElementById('content').innerHTML = `
                    <div class="error">
                        <p>Failed to load water quality data. Please try again later.</p>
                    </div>
                `;
}

// Global user state variables
const userState = {
    currentTab: 'quality', // Default tab is 'quality'
    currentLanguage: 'al',  // Default language is English
};

// Language translations
const translations = {
    en: {
        // Header and general UI
        "subtitle": "Water Quality Monitoring Dashboard",
        "loading": "Loading water quality data...",
        "footer": "© 2025 Oogway Water Monitoring System",

        // Quality indicator
        "quality_excellent": "Water Quality: Excellent",
        "quality_attention": "Water Quality: Needs Attention",
        "quality_critical": "Water Quality: Critical",

        // Tabs
        "tab_quality": "Water Quality",
        "tab_impact": "People & Pools",
        "tab_aquatic": "Aquatic Life",

        // Stats cards
        "ph_title": "pH Level",
        "ph_desc_highly_acidic": "Highly acidic - Harmful to swimmers",
        "ph_desc_highly_alkaline": "Highly alkaline - Harmful to swimmers",
        "ph_desc_mildly_acidic": "Mildly acidic - May cause eye irritation",
        "ph_desc_mildly_alkaline": "Mildly alkaline - May reduce chlorine effectiveness",
        "ph_desc_neutral": "Neutral - Optimal for swimming pools",

        "orp_title": "ORP Level",
        "orp_desc_low": "Low sanitization - Potential health risks",
        "orp_desc_over": "Over-sanitized - May be uncomfortable for swimmers",
        "orp_desc_low_reduced": "Low ORP - Reduced sanitizing capability",
        "orp_desc_high": "High ORP - Strong chemical environment",
        "orp_desc_ideal": "Ideal ORP - Optimal sanitization level",

        "temp_title": "Temperature",
        "temp_desc_cold": "Too cold - Uncomfortable for swimming",
        "temp_desc_hot": "Too hot - Risk of hyperthermia",
        "temp_desc_cool": "Cool - May be uncomfortable for some",
        "temp_desc_warm": "Warm - Monitor for potential issues",
        "temp_desc_ideal": "Ideal temperature for pool comfort",

        // Impact cards
        "ph_impact_title": "pH Level Impact",
        "ph_health_effects": "Health Effects",
        "ph_health_text1": "Pool water with a pH below 7.2 can cause eye and skin irritation, redness, and discomfort. Very low pH (below 6.0) can lead to burning eyes, damaged nasal passages, and itchy skin.",
        "ph_health_text2": "High pH values above 7.8 can lead to cloudy water, skin dryness, and reduced chlorine effectiveness. Values above 8.5 may cause scaling on pool surfaces and equipment.",
        "ph_rec_action": "Recommended Action",
        "ph_ideal_range": "Ideal range: 7.2 - 7.6 for swimming pools",
        "ph_too_low": "Too low: Add sodium carbonate (soda ash) to increase pH",
        "ph_too_high": "Too high: Add sodium bisulfate or muriatic acid to lower pH",

        "orp_impact_title": "ORP Level Impact",
        "orp_health_effects": "Health Effects",
        "orp_health_text1": "ORP (Oxidation-Reduction Potential) measures the water's ability to oxidize contaminants. Low ORP levels (below 300 mV) indicate insufficient sanitizing capability, which can lead to bacterial growth and potential infection risks.",
        "orp_health_text2": "Very high ORP levels (above 500 mV) indicate excessive chemical treatment, which may cause respiratory irritation, bleached swimwear, and dry skin and hair.",
        "orp_rec_action": "Recommended Action",
        "orp_ideal_range": "Ideal range: 300 - 500 mV for swimming pools",
        "orp_too_low": "Too low: Check chlorine levels and increase if necessary, ensure proper circulation",
        "orp_too_high": "Too high: Reduce sanitizing chemicals, check for over-chlorination",

        "temp_impact_title": "Temperature Impact",
        "temp_health_effects": "Health Effects",
        "temp_health_text1": "Water temperature affects both comfort and safety. Temperatures below 26°C can be uncomfortable for most swimmers, causing muscles to tense and increasing the risk of cramps, especially in children and the elderly.",
        "temp_health_text2": "High temperatures above 30°C reduce the body's ability to dissipate heat, potentially leading to hyperthermia, dehydration, and heat exhaustion. Warm water also accelerates chlorine consumption and can promote bacterial growth.",
        "temp_rec_action": "Recommended Action",
        "temp_ideal_range": "Ideal range: 26 - 30°C for recreational swimming pools",
        "temp_too_low": "Too cold: Increase heating, consider pool covers when not in use",
        "temp_too_high": "Too warm: Reduce heating, increase water circulation, ensure proper chemical balance as warm water requires more frequent monitoring",

        // Aquatic life impact cards
        "aquatic_life_tab": "Aquatic Life Impact",

        "ph_aquatic_title": "pH Impact on Aquatic Life",
        "ph_aquatic_effects": "Effects on Aquatic Organisms",
        "ph_aquatic_text1": "Most aquatic organisms thrive in a pH range of 6.5-8.5. pH levels below 6.0 can cause stress in fish populations, affecting reproduction and growth. Extremely acidic conditions (pH < 5.0) can be lethal to most fish species, particularly affecting their gill function and egg development.",
        "ph_aquatic_text2": "Alkaline conditions above pH 9.0 can damage gill tissues and external mucus layers that protect fish from infection. High pH can also increase the toxicity of ammonia in water, creating multiple stressors for aquatic life.",
        "ph_ecosystem_impact": "Ecosystem Considerations",
        "ph_sensitive_species": "Sensitive species: Trout, salmon, and many invertebrates are particularly sensitive to pH fluctuations",
        "ph_tolerant_species": "Tolerant species: Some catfish, carp, and certain aquatic plants can survive in wider pH ranges",

        "orp_aquatic_title": "ORP Impact on Aquatic Life",
        "orp_aquatic_effects": "Effects on Aquatic Organisms",
        "orp_aquatic_text1": "ORP levels below 200 mV indicate low oxygen conditions that stress most fish species and can promote harmful anaerobic bacteria. These conditions can lead to fish kills and ecosystem collapse in severe cases.",
        "orp_aquatic_text2": "Very high ORP levels (above 600 mV) can be toxic to aquatic life, damaging gill tissues and affecting enzyme systems within organisms. High ORP environments often contain excessive oxidizing agents that can harm sensitive aquatic species.",
        "orp_ecosystem_impact": "Ecosystem Considerations",
        "orp_ideal_aquatic": "Ideal ORP for natural aquatic ecosystems: 300-400 mV promotes healthy biological activity",
        "orp_monitoring": "Regular monitoring recommended when water contains aquatic life, as fish behavior often indicates ORP problems before instruments detect changes",

        "temp_aquatic_title": "Temperature Impact on Aquatic Life",
        "temp_aquatic_effects": "Effects on Aquatic Organisms",
        "temp_aquatic_text1": "Water temperature governs metabolic rates and oxygen consumption in aquatic organisms. Cold-water species like trout require temperatures below 20°C and become stressed at higher temperatures due to reduced dissolved oxygen capacity of warm water.",
        "temp_aquatic_text2": "Sudden temperature changes (thermal shock) of even 2-3°C can be fatal to fish, while gradual seasonal changes allow for adaptation. Warm water accelerates metabolic rates, increasing oxygen demand while simultaneously reducing available oxygen.",
        "temp_ecosystem_impact": "Ecosystem Considerations",
        "temp_ranges": "Species temperature ranges: Cold-water species (5-18°C), Cool-water species (18-24°C), Warm-water species (24-32°C)",
        "temp_breeding": "Many species have specific temperature requirements for breeding, with temperature serving as a trigger for spawning events"
    }, al: {
        // Header and general UI
        "subtitle": "Paneli i Monitorimit të Cilësisë së Ujit",
        "loading": "Duke ngarkuar të dhënat e cilësisë së ujit...",
        "footer": "© 2025 Sistemi i Monitorimit të Ujit Oogway",

        // Quality indicator
        "quality_excellent": "Cilësia e Ujit: E shkëlqyeshme",
        "quality_attention": "Cilësia e Ujit: Kërkon Vëmendje",
        "quality_critical": "Cilësia e Ujit: Kritike",

        // Tabs
        "tab_quality": "Cilësia e Ujit",
        "tab_impact": "Njerëzit & Pishinat",
        "tab_aquatic": "Bota Nënujore",

        // Stats cards
        "ph_title": "Niveli i pH",
        "ph_desc_highly_acidic": "Tepër acid - I dëmshëm për notarët",
        "ph_desc_highly_alkaline": "Tepër alkalin - I dëmshëm për notarët",
        "ph_desc_mildly_acidic": "Pak acid - Mund të shkaktojë irritim të syve",
        "ph_desc_mildly_alkaline": "Pak alkalin - Mund të reduktojë efektivitetin e klorit",
        "ph_desc_neutral": "Neutral - Optimal për pishina",

        "orp_title": "Niveli i ORP-së",
        "orp_desc_low": "Dezinfektim i ulët - Rreziqe të mundshme shëndetësore",
        "orp_desc_over": "Dezinfektim i tepërt - Mund të jetë i pakëndshëm për notarët",
        "orp_desc_low_reduced": "ORP e ulët - Aftësi e reduktuar dezinfektimi",
        "orp_desc_high": "ORP e lartë - Mjedis i fortë kimik, i dëmshëm për lëkurën",
        "orp_desc_ideal": "ORP ideale - Nivel optimal dezinfektimi",

        "temp_title": "Temperatura",
        "temp_desc_cold": "Shumë ftohtë - E pakëndshme për not",
        "temp_desc_hot": "Shumë nxehtë - Rrezik hipertermie",
        "temp_desc_cool": "Freskët - Mund të jetë e pakëndshme për disa",
        "temp_desc_warm": "E ngrohtë - Mund të jetë e pakëndshme për disa",
        "temp_desc_ideal": "Temperaturë ideale - E përsosur për not",

        // Impact cards
        "ph_impact_title": "Ndikimi i Nivelit të pH",
        "ph_health_effects": "Efektet Shëndetësore",
        "ph_health_text1": "Uji i pishinës me pH nën 7.2 mund të shkaktojë irritim të syve dhe lëkurës, skuqje dhe shqetësime. pH shumë i ulët (nën 6.0) mund të çojë në djegie të syve, dëmtim të kanaleve të hundës dhe kruajtje të lëkurës.",
        "ph_health_text2": "Vlerat e larta të pH mbi 7.8 mund të çojnë në ujë të turbullt, thatësi të lëkurës dhe efektivitet të reduktuar të klorit. Vlera mbi 8.5 mund të shkaktojë gërryerje në sipërfaqet e pishinës dhe pajisjet.",
        "ph_rec_action": "Veprimi i Rekomanduar",
        "ph_ideal_range": "Gama ideale: 7.2 - 7.6",
        "ph_too_low": "Shumë i ulët: Shtoni karbonat natriumi për të rritur pH",
        "ph_too_high": "Shumë i lartë: Shtoni bisulfat natriumi ose acid muriatik për të ulur pH",

        "orp_impact_title": "Ndikimi i Nivelit të ORP-së",
        "orp_health_effects": "Efektet Shëndetësore",
        "orp_health_text1": "ORP-ja (Potenciali i Oksido-Reduktimit) mat aftësinë e ujit për të oksiduar ndotësit. Nivelet e ulëta të ORP-së (nën 300 mV) tregojnë aftësi të pamjaftueshme dezinfektimi, e cila mund të çojë në rritjen e baktereve dhe rritjen e rrezikut për infeksionit.",
        "orp_health_text2": "Nivelet shumë të larta të ORP-së (mbi 500 mV) tregojnë trajtim të tepërt kimik, i cili mund të shkaktojë irritim të frymëmarrjes, zbardhje të rrobave të banjës, dhe lëkurë e flokë të thatë.",
        "orp_rec_action": "Veprimi i Rekomanduar",
        "orp_ideal_range": "Gama ideale: 300 - 500 mV për pishina noti",
        "orp_too_low": "Shumë i ulët: Kontrolloni nivelet e klorit dhe rritini nëse është e nevojshme, siguroni që ka qarkullim  të tij",
        "orp_too_high": "Shumë i lartë: Reduktoni kimikatet dezinfektuese, kontrolloni për klor të tepërt",

        "temp_impact_title": "Ndikimi i Temperaturës",
        "temp_health_effects": "Efektet Shëndetësore",
        "temp_health_text1": "Temperatura e ujit ndikon si në rehati ashtu edhe në siguri. Temperaturat nën 26°C mund të jenë të pakëndshme për shumicën e notarëve, duke shkaktuar tensionim të muskujve dhe rritje të rrezikut për spazma, veçanërisht te fëmijët dhe të moshuarit.",
        "temp_health_text2": "Temperaturat e larta mbi 30°C reduktojnë aftësinë e trupit për të shpërndarë nxehtësinë, duke çuar në dehidratim, rraskapitje dhe disa raste edhe hipertermi. Uji i ngrohtë gjithashtu përshpejton konsumin e klorit dhe mund të nxisë rritjen bakteriale.",
        "temp_rec_action": "Veprimi i Rekomanduar",
        "temp_ideal_range": "Gama ideale: 26 - 30°C",
        "temp_too_low": "Shumë i ftohtë: Rritni ngrohjen, konsideroni mbulesat e pishinës kur nuk përdoret",
        "temp_too_high": "Shumë i ngrohtë: Reduktoni ngrohjen, rritni qarkullimin e ujit, siguroni ekuilibrin e duhur kimik pasi uji i ngrohtë kërkon monitorim më të shpeshtë",

        // Aquatic life impact cards
        "aquatic_life_tab": "Ndikimi në Jetën Ujore",

        "ph_aquatic_title": "Ndikimi i pH në Jetën Ujore",
        "ph_aquatic_effects": "Efektet në Organizmat Ujorë",
        "ph_aquatic_text1": "Shumica e organizmave ujorë lulëzojnë në një gamë pH 6.5-8.5. Nivelet e pH nën 6.0 mund të shkaktojnë stres në popullatat e peshqve, duke ndikuar në riprodhimin dhe rritjen. Kushtet tepër acide (pH < 5.0) mund të jenë vdekjeprurëse për shumicën e llojeve të peshqve, duke ndikuar veçanërisht në funksionin e velëzave dhe zhvillimin e vezëve.",
        "ph_aquatic_text2": "Kushtet alkaline mbi pH 9.0 mund të dëmtojnë indet e velëzave dhe shtresat e jashtme të mukozës që mbrojnë peshqit nga infeksioni. pH i lartë gjithashtu mund të rrisë toksicitetin e amoniakut në ujë, duke krijuar strese të shumëfishta për jetën ujore.",
        "ph_ecosystem_impact": "Konsiderata për Ekosistemin",
        "ph_sensitive_species": "Llojet e ndjeshme: Troftat, salmonet dhe shumë jovertebrorë janë veçanërisht të ndjeshëm ndaj luhatjeve të pH",
        "ph_tolerant_species": "Llojet tolerante: Disa lloje peshqish si krap, dhe bimë të caktuara ujore mund të mbijetojnë në gama më të gjera të pH",

        "orp_aquatic_title": "Ndikimi i ORP-së në Jetën Ujore",
        "orp_aquatic_effects": "Efektet në Organizmat Ujorë",
        "orp_aquatic_text1": "Nivelet e ORP-së nën 200 mV tregojnë kushte me oksigjen të ulët që stresojnë shumicën e llojeve të peshqve dhe mund të nxisin baktere anaerobe të dëmshme. Këto kushte mund të çojnë në ngordhje masive të peshqve dhe në raste të rënda kolaps të ekosistemit.",
        "orp_aquatic_text2": "Nivelet shumë të larta të ORP-së (mbi 600 mV) mund të jenë toksike për jetën ujore, duke dëmtuar indet e velëzave dhe duke ndikuar në sistemet enzimatike brenda organizmave. Mjediset me ORP të lartë shpesh përmbajnë agjentë të tepërt oksidues që mund të dëmtojnë llojet e ndjeshme ujore.",
        "orp_ecosystem_impact": "Konsiderata për Ekosistemin",
        "orp_ideal_aquatic": "ORP-ja ideale për ekosistemet natyrore ujore: 300-400 mV nxit aktivitet të shëndetshëm biologjik",
        "orp_monitoring": "Monitorimi i rregullt rekomandohet kur uji përmban jetë ujore, pasi sjellja e peshqve shpesh tregon probleme të ORsëP përpara se pajisjet të zbulojnë ndryshimet",

        "temp_aquatic_title": "Ndikimi i Temperaturës në Jetën Ujore",
        "temp_aquatic_effects": "Efektet në Organizmat Ujorë",
        "temp_aquatic_text1": "Temperatura e ujit rregullon normat metabolike dhe konsumin e oksigjenit tek organizmat ujorë. Llojet që jetojnë në ujë të ftohtë si trofta kërkojnë temperatura nën 20°C dhe bëhen të stresuar në temperatura më të larta për shkak të kapacitetit të reduktuar të oksigjenit të tretur në ujin e ngrohtë.",
        "temp_aquatic_text2": "Ndryshimet e papritura të temperaturës (shoku termik) prej vetëm 2-3°C mund të jenë fatale për peshqit, ndërsa ndryshimet graduale stinore lejojnë përshtatjen. Uji i ngrohtë përshpejton normat metabolike, duke rritur kërkesën për oksigjen ndërsa redukton sasinë e oksigjenit të disponueshëm.",
        "temp_ecosystem_impact": "Konsiderata për Ekosistemin",
        "temp_ranges": "Gama e temperaturave sipas llojit: Llojet e ujërave të ftohta (5-18°C), Llojet e ujërave të freskëta (18-24°C), Llojet e ujërave të ngrohta (24-32°C)",
        "temp_breeding": "Shumë lloje kanë kërkesa specifike të temperaturës për shumim, me temperaturën si nxitës për ngjarjet e hedhjes së vezëve"
    }
};

// Function to get translation for a key
function translate(key) {
    return translations[userState.currentLanguage][key] || key;
}

// Function to update all translatable elements
function updateLanguage() {
    // Update elements with data-lang-key attribute
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        element.textContent = translate(key);
    });
}


// Function to determine pH status
function getPHStatus(pH) {
    if (pH < 6.0 || pH > 9.0) return "bad";
    if (pH < 6.5 || pH > 8.5) return "warning";
    return "good";
}

// Function to determine pH description key
function getPHDescriptionKey(pH) {
    if (pH < 6.0) return "ph_desc_highly_acidic";
    if (pH > 9.0) return "ph_desc_highly_alkaline";
    if (pH < 6.5) return "ph_desc_mildly_acidic";
    if (pH > 8.5) return "ph_desc_mildly_alkaline";
    return "ph_desc_neutral";
}

// Function to determine ORP status
function getORPStatus(orp) {
    if (orp < 200 || orp > 600) return "bad";
    if (orp < 300 || orp > 500) return "warning";
    return "good";
}

// Function to determine ORP description key
function getORPDescriptionKey(orp) {
    if (orp < 200) return "orp_desc_low";
    if (orp > 600) return "orp_desc_over";
    if (orp < 300) return "orp_desc_low_reduced";
    if (orp > 500) return "orp_desc_high";
    return "orp_desc_ideal";
}

// Function to determine temperature status
function getTempStatus(temp) {
    if (temp < 24 || temp > 32) return "bad";
    if (temp < 26 || temp > 30) return "warning";
    return "good";
}

// Function to determine temperature description key
function getTempDescriptionKey(temp) {
    if (temp < 24) return "temp_desc_cold";
    if (temp > 32) return "temp_desc_hot";
    if (temp < 26) return "temp_desc_cool";
    if (temp > 30) return "temp_desc_warm";
    return "temp_desc_ideal";
}

// Function to determine overall water quality
function getOverallQuality(pH, orp, temp) {
    const phStatus = getPHStatus(pH);
    const orpStatus = getORPStatus(orp);
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

// Function to get quality text key
function getQualityTextKey(quality) {
    if (quality === "good") return "quality_excellent";
    if (quality === "warning") return "quality_attention";
    return "quality_critical";
}

// Function to render the data
function renderWaterData(data) {
    const content = document.getElementById('content');
    const phStatus = getPHStatus(data.pH);
    const orpStatus = getORPStatus(data.orp);
    const tempStatus = getTempStatus(data.temperature);
    const overallQuality = getOverallQuality(data.pH, data.orp, data.temperature);

    let qualityBadge = '';
    const qualityTextKey = getQualityTextKey(overallQuality);

    if (overallQuality === "good") {
        qualityBadge = `
                    <div class="quality-badge quality-good">
                        <span class="quality-icon">✓</span>
                        <span data-lang-key="${qualityTextKey}">${translate(qualityTextKey)}</span>
                    </div>
                `;
    } else if (overallQuality === "warning") {
        qualityBadge = `
                    <div class="quality-badge quality-warning">
                        <span class="quality-icon">!</span>
                        <span data-lang-key="${qualityTextKey}">${translate(qualityTextKey)}</span>
                    </div>
                `;
    } else {
        qualityBadge = `
                    <div class="quality-badge quality-bad">
                        <span class="quality-icon">!!</span>
                        <span data-lang-key="${qualityTextKey}">${translate(qualityTextKey)}</span>
                    </div>
                `;
    }

    const phDescKey = getPHDescriptionKey(data.pH);
    const orpDescKey = getORPDescriptionKey(data.orp);
    const tempDescKey = getTempDescriptionKey(data.temperature);

    content.innerHTML = `
                <div class="language-toggle">
                    <button class="language-btn ${userState.currentLanguage === 'en' ? 'active' : ''}" data-lang="en">English</button>
                    <button class="language-btn ${userState.currentLanguage === 'al' ? 'active' : ''}" data-lang="al">Albanian</button>
                </div>
                
                <div class="quality-indicator">
                    ${qualityBadge}
                </div>
                
                <div class="tabs">
    <div class="tab ${userState.currentTab === 'quality' ? 'active' : ''}" data-tab="quality">
        <span data-lang-key="tab_quality">${translate('tab_quality')}</span>
    </div>
    <div class="tab ${userState.currentTab === 'impact' ? 'active' : ''}" data-tab="impact">
        <span data-lang-key="tab_impact">${translate('tab_impact')}</span>
    </div>
    <div class="tab ${userState.currentTab === 'aquatic' ? 'active' : ''}" data-tab="aquatic">
        <span data-lang-key="tab_aquatic">${translate('tab_aquatic')}</span>
    </div>
</div>
                
                <div id="quality-tab" class="tab-content ${userState.currentTab === 'quality' ? 'active' : ''}">
                    <div class="stats-container">
                        <div class="stat-card ph">
                            <div class="stat-status status-${phStatus}">${getStatusIcon(phStatus)}</div>
                            <div class="icon">💧</div>
                            <h2 class="stat-title" data-lang-key="ph_title">${translate('ph_title')}</h2>
                            <div class="stat-value">${data.pH}</div>
                            <p class="stat-description" data-lang-key="${phDescKey}">${translate(phDescKey)}</p>
                        </div>
                        
                        <div class="stat-card orp">
                            <div class="stat-status status-${orpStatus}">${getStatusIcon(orpStatus)}</div>
                            <div class="icon">⚡</div>
<h2 class="stat-title" data-lang-key="orp_title">${translate('orp_title')}</h2>
                            <div class="stat-value">${data.orp} mV</div>
                            <p class="stat-description" data-lang-key="${orpDescKey}">${translate(orpDescKey)}</p>
                        </div>
                        
                        <div class="stat-card temperature">
                            <div class="stat-status status-${tempStatus}">${getStatusIcon(tempStatus)}</div>
                            <div class="icon">🌡️</div>
                            <h2 class="stat-title" data-lang-key="temp_title">${translate('temp_title')}</h2>
                            <div class="stat-value">${data.temperature}°C</div>
                            <p class="stat-description" data-lang-key="${tempDescKey}">${translate(tempDescKey)}</p>
                        </div>
                    </div>
                </div>
                
                <div id="impact-tab" class="tab-content ${userState.currentTab === 'impact' ? 'active' : ''}">
                    <div class="impact-container">
                        <div class="impact-card">
                            <div class="impact-header">
                                <div class="impact-icon">💧</div>
                                <div class="impact-title" data-lang-key="ph_impact_title">${translate('ph_impact_title')}</div>
                            </div>
                            <div class="impact-content">
                                <div class="impact-section">
                                    <h4 data-lang-key="ph_health_effects">${translate('ph_health_effects')}</h4>
                                    <p data-lang-key="ph_health_text1">${translate('ph_health_text1')}</p>
                                    <p data-lang-key="ph_health_text2">${translate('ph_health_text2')}</p>
                                    
                                    <h4 data-lang-key="ph_rec_action">${translate('ph_rec_action')}</h4>
                                    <p data-lang-key="ph_ideal_range"><strong>${translate('ph_ideal_range')}</strong></p>
                                    <p data-lang-key="ph_too_low"><strong>${translate('ph_too_low')}</strong></p>
                                    <p data-lang-key="ph_too_high"><strong>${translate('ph_too_high')}</strong></p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="impact-card">
                            <div class="impact-header">
                                <div class="impact-icon">⚡</div>
                                <div class="impact-title" data-lang-key="orp_impact_title">${translate('orp_impact_title')}</div>
                            </div>
                            <div class="impact-content">
                                <div class="impact-section">
                                    <h4 data-lang-key="orp_health_effects">${translate('orp_health_effects')}</h4>
                                    <p data-lang-key="orp_health_text1">${translate('orp_health_text1')}</p>
                                    <p data-lang-key="orp_health_text2">${translate('orp_health_text2')}</p>
                                    
                                    <h4 data-lang-key="orp_rec_action">${translate('orp_rec_action')}</h4>
                                    <p data-lang-key="orp_ideal_range"><strong>${translate('orp_ideal_range')}</strong></p>
                                    <p data-lang-key="orp_too_low"><strong>${translate('orp_too_low')}</strong></p>
                                    <p data-lang-key="orp_too_high"><strong>${translate('orp_too_high')}</strong></p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="impact-card">
                            <div class="impact-header">
                                <div class="impact-icon">🌡️</div>
                                <div class="impact-title" data-lang-key="temp_impact_title">${translate('temp_impact_title')}</div>
                            </div>
                            <div class="impact-content">
                                <div class="impact-section">
                                    <h4 data-lang-key="temp_health_effects">${translate('temp_health_effects')}</h4>
                                    <p data-lang-key="temp_health_text1">${translate('temp_health_text1')}</p>
                                    <p data-lang-key="temp_health_text2">${translate('temp_health_text2')}</p>
                                    
                                    <h4 data-lang-key="temp_rec_action">${translate('temp_rec_action')}</h4>
                                    <p data-lang-key="temp_ideal_range"><strong>${translate('temp_ideal_range')}</strong></p>
                                    <p data-lang-key="temp_too_low"><strong>${translate('temp_too_low')}</strong></p>
                                    <p data-lang-key="temp_too_high"><strong>${translate('temp_too_high')}</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="aquatic-tab" class="tab-content ${userState.currentTab === 'aquatic' ? 'active' : ''}">
    <div class="impact-container">
        <div class="impact-card">
            <div class="impact-header">
                <div class="impact-icon">💧</div>
                <div class="impact-title" data-lang-key="ph_aquatic_title">${translate('ph_aquatic_title')}</div>
            </div>
            <div class="impact-content">
                <div class="impact-section">
                    <h4 data-lang-key="ph_aquatic_effects">${translate('ph_aquatic_effects')}</h4>
                    <p data-lang-key="ph_aquatic_text1">${translate('ph_aquatic_text1')}</p>
                    <p data-lang-key="ph_aquatic_text2">${translate('ph_aquatic_text2')}</p>
                    
                    <h4 data-lang-key="ph_ecosystem_impact">${translate('ph_ecosystem_impact')}</h4>
                    <p data-lang-key="ph_sensitive_species"><strong>${translate('ph_sensitive_species')}</strong></p>
                    <p data-lang-key="ph_tolerant_species"><strong>${translate('ph_tolerant_species')}</strong></p>
                </div>
            </div>
        </div>
        
        <div class="impact-card">
            <div class="impact-header">
                <div class="impact-icon">⚡</div>
                <div class="impact-title" data-lang-key="orp_aquatic_title">${translate('orp_aquatic_title')}</div>
            </div>
            <div class="impact-content">
                <div class="impact-section">
                    <h4 data-lang-key="orp_aquatic_effects">${translate('orp_aquatic_effects')}</h4>
                    <p data-lang-key="orp_aquatic_text1">${translate('orp_aquatic_text1')}</p>
                    <p data-lang-key="orp_aquatic_text2">${translate('orp_aquatic_text2')}</p>
                    
                    <h4 data-lang-key="orp_ecosystem_impact">${translate('orp_ecosystem_impact')}</h4>
                    <p data-lang-key="orp_ideal_aquatic"><strong>${translate('orp_ideal_aquatic')}</strong></p>
                    <p data-lang-key="orp_monitoring"><strong>${translate('orp_monitoring')}</strong></p>
                </div>
            </div>
        </div>
        
        <div class="impact-card">
            <div class="impact-header">
                <div class="impact-icon">🌡️</div>
                <div class="impact-title" data-lang-key="temp_aquatic_title">${translate('temp_aquatic_title')}</div>
            </div>
            <div class="impact-content">
                <div class="impact-section">
                    <h4 data-lang-key="temp_aquatic_effects">${translate('temp_aquatic_effects')}</h4>
                    <p data-lang-key="temp_aquatic_text1">${translate('temp_aquatic_text1')}</p>
                    <p data-lang-key="temp_aquatic_text2">${translate('temp_aquatic_text2')}</p>
                    
                    <h4 data-lang-key="temp_ecosystem_impact">${translate('temp_ecosystem_impact')}</h4>
                    <p data-lang-key="temp_ranges"><strong>${translate('temp_ranges')}</strong></p>
                    <p data-lang-key="temp_breeding"><strong>${translate('temp_breeding')}</strong></p>
                </div>
            </div>
        </div>
    </div>
</div>
            `;

    // Set up tab switching
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and content
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            // Update user state
            userState.currentTab = tab.dataset.tab;

            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(`${tab.dataset.tab}-tab`).classList.add('active');
        });
    });

    // Set up language switching
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all language buttons
            document.querySelectorAll('.language-btn').forEach(b => b.classList.remove('active'));

            // Update user state
            userState.currentLanguage = btn.dataset.lang;

            // Add active class to clicked button
            btn.classList.add('active');

            // Update all translations
            updateLanguage();
        });
    });

    // Apply initial translations
    updateLanguage();
}
