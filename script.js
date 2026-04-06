
// API Base URL
const API_BASE_URL = 'http://127.0.0.1:8000';

// ---------------- Language Setup ----------------
let currentLang = localStorage.getItem('lang') || 'en';

const translations = {
    en: {
        home: "Home",
        imageAnalysis: "Image Analysis",
        symptoms: "Symptoms",
        feedPlan: "Feed Plan",
        title: "Cattle Health Monitoring System",
        subtitle: "AI-powered disease detection and feed recommendations for healthy cattle",
        start: "Start Monitoring",
        uploadLabel: "Upload Cattle Image for AI Analysis",
        predictBtn: "Predict Disease",
        feedTitle: "Feed Recommendation",
        feedSubtitle: "Get Personalized Feed Recommendations",
        heroTitle: "Cattle Health Monitoring System",
        heroSubtitle: "AI-powered disease detection and feed recommendations for healthy cattle",
        welcomeTitle: "🐄 Welcome to the Cattle Health & Feed Assistant",
        welcomeIntro: "This platform is designed to help farmers and cattle owners take better care of their animals.",
        aiIntro: "With the help of Artificial Intelligence (AI), the system can:",
        feature1: "Check cattle diseases using images – upload a photo of your cow to detect possible health issues early.",
        feature2: "Predict disease from symptoms – enter the symptoms you notice, and get instant diagnosis suggestions.",
        feature3: "Get smart feed recommendations – know exactly how much green fodder, dry fodder, and supplements your cattle need.",
        feature4: "Find suitable treatments – Ayurvedic, home remedies, and veterinary medical options all in one place.",
        goal: "Our goal is to make cattle health monitoring simple, affordable, and accessible for every farmer.",
        terminalText: "Welcome to AI-powered cattle health monitoring",
        start: "Start Monitoring",
        terminalText: "Welcome to AI-powered cattle health monitoring",
        imageTitle: "Image-based Disease Prediction",
        symptomTitle: "Symptoms-based Disease Prediction",
        feedTitle: "Feed Recommendation",
        footerTitle: "Cattle Health Monitor",
        footerAbout: "AI-powered disease detection and feed recommendations for healthy cattle",
        quickLinks: "Quick Links",
        footerRights: "© 2025 Cattle Health Monitoring System. Powered by AI Technology.",
        predictBtn: "Predict Disease",
        selectImageError: "Please select an image file.",
        error: "Error",
        feedIntro: "Enter cattle details for AI-powered feed planning",
        ageLabel: "Age (years)",
        agePlaceholder: "e.g., 2.5",
        ageTooltip: "Age of your cattle in years (0.1-25)",
        weightLabel: "Weight (kg)",
        weightPlaceholder: "e.g., 450",
        weightTooltip: "Current weight of your cattle in kilograms",
        breedLabel: "Breed",
        selectBreed: "Select breed",
        breedTooltip: "Breed of the cattle",
        milkLabel: "Daily Milk Yield (liters)",
        milkPlaceholder: "e.g., 15.5",
        milkTooltip: "Average daily milk production in liters",
        healthLabel: "Health Status",
        selectHealth: "Select health status",
        healthyOption: "Healthy",
        underweightOption: "Underweight",
        sickOption: "Sick",
        healthTooltip: "Current health status of the cattle",
        feedBtn: "Get Feed Recommendation",
        feedLoadingText: "Calculating feed recommendation...",
        // 🧩 Symptoms Section
        majorSymptoms: "Major Symptoms",
        additionalSymptoms: "Additional Symptoms / Description",
        cattleInfo: "Cattle Information",
        managementDetails: "Management Details",
        cowAge: "Cow Age (years)",
        dailyMilk: "Daily Milk Yield (liters)",
        physicalCondition: "Physical Condition Score (1-5)",
        breed: "Cow Breed",
        feedType: "Feed Type",
        housingType: "Housing Type",
        lactationStage: "Lactation Stage",
        symptomHelpText: "Select all symptoms observed in your cattle.",
    
        // Individual Symptoms
        lameness: "Lameness",
        swollenUdder: "Swollen Udder",
        abnormalMilk: "Abnormal Milk",
        failureToConceive: "Failure to Conceive",
        irregularCycle: "Irregular Cycle",
        weakness: "Weakness",
        reducedAppetite: "Reduced Appetite",
        diarrhea: "Diarrhea",
        fever: "Fever",
        fmd: "FMD (Foot and Mouth Disease)",

        // Tooltips
        tooltip_lameness: "Animal limps or favors one leg",
        tooltip_swollenUdder: "Udder appears larger, red, or painful",
        tooltip_abnormalMilk: "Milk appears watery, bloody, or clotted",
        tooltip_failureToConceive: "No signs of estrus or breeding behavior",
        tooltip_irregularCycle: "Irregular or prolonged estrus cycles",
        tooltip_weakness: "Muscle weakness or inability to stand",
        tooltip_reducedAppetite: "Loss of appetite and lethargy",
        tooltip_diarrhea: "Frequent loose bowel movements",
        tooltip_fever: "Body temperature above normal",
        tooltip_fmd: "Blisters on mouth, feet, or udder",
        cattleInfo: "Cattle Information",
        cowAgeLabel: "Cow Age (years)",
        cowAgeTip: "Age of the cow in years",
        milkYieldLabel: "Daily Milk Yield (liters)",
        milkYieldTip: "Average daily milk production",
        conditionLabel: "Physical Condition Score (1-5)",
        conditionTip: "Overall physical condition of the cow",
        managementInfo: "Management Details",
        breedLabel: "Cow Breed",
        breedTip: "Breed of the cattle",
        feedLabel: "Feed Type",
        feedTip: "Type of feed being provided",
        housingLabel: "Housing Type",
        housingTip: "Type of housing facility",
        lactationLabel: "Lactation Stage",
        lactationTip: "Current lactation stage",
        predictbtn: "Predict Disease from Symptoms",
        additionalSymptom: "Additional Symptom / Description",
        additionalTip: "Describe any extra symptoms noticed",
        OH: "Holstein",
        OJ: "Jersey",
        OG: "Gir",
        OS: "Sahiwal",
        OT: "Tharparkar",
        selectlac: "Select lactation stage",
        SE: "Early",
        SM: "Mid",
        SL: "Late",
        SD: "Dry",
        selecthouse: "Select housing type",
        HO: "Open",
        HS: "Semi-closed",
        HC: "Closed",
        selectfeed: "Select feed type",
        GF: "Green fodder",
        CF: "Concentrates",
        MF: "Mixed",
        OK: "Kangayam",
        selectcondition: "Select condition score",
        1: "1 - Very Poor",
        2: "2 - Poor",
        3: "3 - Fair",
        4: "4 - Good",
        5: "5 - Excellent",

        // New bilingual labels used by updated display functions
        predictionResults: "Prediction Results",
        diagnosisResults: "Diagnosis Results",
        predictedDisease: "Predicted Disease",
        treatmentRecommendations: "Treatment Recommendations",
        additionalSymptomsDescription: "Additional Symptoms/Description",
        feedRecommendation: "Feed Recommendation",
        recommendedFeedComposition: "Recommended Feed Composition",
        greenFodder: "Green Fodder",
        dryFodder: "Dry Fodder",
        groundnutCake: "Groundnut Cake",
        soybeanMeal: "Soybean Meal",
        maize: "Maize",
        minerals: "Minerals",
        inputParameters: "Input Parameters",
        age: "Age",
        years: "years",
        weight: "Weight",
        milkYield: "Milk Yield",
        healthStatus: "Health Status",
        feedCompositionBreakdown: "Feed Composition Breakdown",
        ayurvedicTreatment: "Ayurvedic Treatment",
        medicalTreatment: "Medical Treatment",
        homeRemedies: "Home Remedies",
        Holstein: "Holstein",
        Jersey: "Jersey",
        Gir: "Gir",
        Sahiwal: "Sahiwal",
        Tharparkar: "Tharparkar",
        Healthy: "Healthy",
        Underweight: "Underweight",
        Sick: "Sick",
        confidence: "Confidence",
        descriptionPlaceholder: "Enter any other symptoms or notes here..., else null (Kannada or English supported)"
    },
    kn: {
        home: "ಮುಖಪುಟ",
        imageAnalysis: "ಚಿತ್ರ ವಿಶ್ಲೇಷಣೆ",
        symptoms: "ಲಕ್ಷಣಗಳು",
        feedPlan: "ಆಹಾರ ಯೋಜನೆ",
        title: "ಪಶು ಆರೋಗ್ಯ ನಿಗಾವಳಿ ವ್ಯವಸ್ಥೆ",
        subtitle: "ಕೃತಕ ಬುದ್ಧಿವಂತಿಕೆಯ ಆಧಾರದ ಮೇಲೆ ರೋಗ ಪತ್ತೆ ಮತ್ತು ಆಹಾರ ಶಿಫಾರಸುಗಳು",
        start: "ನಿಗಾವಳಿ ಪ್ರಾರಂಭಿಸಿ",
        uploadLabel: "ಪಶು ಚಿತ್ರದ ಎಐ ವಿಶ್ಲೇಷಣೆಗಾಗಿ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
        predictBtn: "ರೋಗವನ್ನು ಊಹಿಸಿ",
        feedTitle: "ಆಹಾರ ಶಿಫಾರಸು",
        feedSubtitle: "ವೈಯಕ್ತಿಕ ಆಹಾರ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ",
        heroTitle: "ಪಶು ಆರೋಗ್ಯ ನಿಗಾವಳಿ ವ್ಯವಸ್ಥೆ",
        heroSubtitle: "ಕೃತಕ ಬುದ್ಧಿವಂತಿಕೆಯ ಆಧಾರದ ಮೇಲೆ ಪಶುಗಳ ರೋಗ ಪತ್ತೆ ಮತ್ತು ಆಹಾರ ಶಿಫಾರಸುಗಳು",
        welcomeTitle: "🐄 ಪಶು ಆರೋಗ್ಯ ಮತ್ತು ಆಹಾರ ಸಹಾಯಕರಿಗೆ ಸ್ವಾಗತ",
        welcomeIntro: "ಈ ವೇದಿಕೆ ರೈতರು ಮತ್ತು ಪಶುಪಾಲಕರು ತಮ್ಮ ಪ್ರಾಣಿಗಳನ್ನು ಉತ್ತಮವಾಗಿ ನೋಡಿಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.",
        aiIntro: "ಕೃತಕ ಬುದ್ಧಿವಂತಿಕೆಯ (AI) ಸಹಾಯದಿಂದ, ಈ ವ್ಯವಸ್ಥೆ ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ:",
        feature1: "ಚಿತ್ರಗಳ ಮೂಲಕ ಪಶು ರೋಗ ಪತ್ತೆ – ನಿಮ್ಮ ಎಮ್ಮೆ ಅಥವಾ ಎತ್ತುಗಳ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ಸಾಧ್ಯವಾದಷ್ಟು ಬೇಗ ಆರೋಗ್ಯ ಸಮಸ್ಯೆಗಳನ್ನು ಗುರುತಿಸಿ.",
        feature2: "ಲಕ್ಷಣಗಳ ಆಧಾರದ ಮೇಲೆ ರೋಗ ಊಹೆ – ನೀವು ಗಮನಿಸಿದ ಲಕ್ಷಣಗಳನ್ನು ನಮೂದಿಸಿ, ತಕ್ಷಣದ ರೋಗ ನಿರ್ಧಾರ ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ.",
        feature3: "ಬುದ್ಧಿವಂತ ಆಹಾರ ಶಿಫಾರಸು – ನಿಮ್ಮ ಪಶುಗಳಿಗೆ ಎಷ್ಟು ಹಸಿರು ಹುಲ್ಲು, ಒಣ ಆಹಾರ ಮತ್ತು ಪೂರಕಾಂಶ ಬೇಕು ಎಂಬುದನ್ನು ತಿಳಿಯಿರಿ.",
        feature4: "ಸೂಕ್ತ ಚಿಕಿತ್ಸೆ ಹುಡುಕಿ – ಆಯುರ್ವೇದ, ಮನೆ ಚಿಕಿತ್ಸೆಗಳು ಮತ್ತು ಪಶು ವೈದ್ಯಕೀಯ ಆಯ್ಕೆಗಳು ಎಲ್ಲವೂ ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ ಲಭ್ಯ.",
        goal: "ನಮ್ಮ ಉದ್ದೇಶ – ಪಶು ಆರೋಗ್ಯ ನಿಗಾವಳಿಯನ್ನು ಸರಳ, ಅಗ್ಗದ ಮತ್ತು ಪ್ರತಿ ರೈತನಿಗೂ ಸುಲಭವಾಗಿ ಲಭ್ಯವಾಗುವಂತೆ ಮಾಡುವುದು.",
        terminalText: "ಕೃತಕ ಬುದ್ದಿವಂತಿಕೆಯ ಆಧಾರಿತ ಪಶು ಆರೋಗ್ಯ ನಿಗಾವಳಿ ವ್ಯವಸ್ಥೆಗೆ ಸ್ವಾಗತ",
        start: "ನಿಗಾವಳಿ ಪ್ರಾರಂಭಿಸಿ",
        terminalText: "AI ಆಧಾರಿತ ಪಶು ಆರೋಗ್ಯ ಮೇಲ್ವಿಚಾರಣೆಗೆ ಸ್ವಾಗತ",
        imageTitle: "ಚಿತ್ರ ಆಧಾರಿತ ರೋಗ ಗುರುತಿಸುವಿಕೆ",
        symptomTitle: "ಲಕ್ಷಣ ಆಧಾರಿತ ರೋಗ ಗುರುತಿಸುವಿಕೆ",
        feedTitle: "ಆಹಾರ ಶಿಫಾರಸು",
        footerTitle: "ಪಶು ಆರೋಗ್ಯ ಮಾನಿಟರ್",
        footerAbout: "AI ಆಧಾರಿತ ರೋಗ ಪತ್ತೆ ಮತ್ತು ಪೋಷಕ ಆಹಾರ ಶಿಫಾರಸುಗಳು ಆರೋಗ್ಯಕರ ಪಶುಗಳಿಗಾಗಿ",
        quickLinks: "ವೇಗದ ಲಿಂಕುಗಳು",
        footerRights: "© 2025 ಪಶು ಆರೋಗ್ಯ ನಿಗಾವಳಿ ವ್ಯವಸ್ಥೆ. AI ತಂತ್ರಜ್ಞಾನದಿಂದ ಚಾಲಿತವಾಗಿದೆ.",
        predictBtn: "ರೋಗವನ್ನು ಊಹಿಸಿ",
        selectImageError: "ದಯವಿಟ್ಟು ಚಿತ್ರ ಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ.",
        error: "ದೋಷ",
        feedIntro: "AI ಆಧಾರಿತ ಆಹಾರ ಯೋಜನೆಗಾಗಿ ಪಶು ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ",
        ageLabel: "ವಯಸ್ಸು (ವರ್ಷ)",
        agePlaceholder: "ಉದಾಹರಣೆಗೆ 2.5",
        ageTooltip: "ನಿಮ್ಮ ಪಶುವಿನ ವಯಸ್ಸು ವರ್ಷಗಳಲ್ಲಿ (0.1-25)",
        weightLabel: "ತೂಕ (ಕೆಜಿ)",
        weightPlaceholder: "ಉದಾಹರಣೆಗೆ 450",
        weightTooltip: "ನಿಮ್ಮ ಪಶುವಿನ ಪ್ರಸ್ತುತ ತೂಕ ಕಿಲೋಗ್ರಾಮ್‌ನಲ್ಲಿ",
        breedLabel: "ಜಾತಿ",
        selectBreed: "ಜಾತಿ ಆಯ್ಕೆಮಾಡಿ",
        breedTooltip: "ಪಶುವಿನ ಜಾತಿ",
        milkLabel: "ದೈನಂದಿನ ಹಾಲಿನ ಉತ್ಪಾದನೆ (ಲೀಟರ್)",
        milkPlaceholder: "ಉದಾಹರಣೆಗೆ 15.5",
        milkTooltip: "ಸರಾಸರಿ ದಿನನಿತ್ಯದ ಹಾಲಿನ ಉತ್ಪಾದನೆ ಲೀಟರ್‌ನಲ್ಲಿ",
        healthLabel: "ಆರೋಗ್ಯ ಸ್ಥಿತಿ",
        selectHealth: "ಆರೋಗ್ಯ ಸ್ಥಿತಿ ಆಯ್ಕೆಮಾಡಿ",
        healthyOption: "ಆರೋಗ್ಯವಂತ",
        underweightOption: "ತೂಕ ಕಡಿಮೆ",
        sickOption: "ರೋಗಿಯಾದ",
        healthTooltip: "ಪಶುವಿನ ಪ್ರಸ್ತುತ ಆರೋಗ್ಯ ಸ್ಥಿತಿ",
        feedBtn: "ಆಹಾರ ಶಿಫಾರಸು ಪಡೆಯಿರಿ",
        feedLoadingText: "ಆಹಾರ ಶಿಫಾರಸು ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತಿದೆ...",
        // 🧩 ಲಕ್ಷಣ ವಿಭಾಗ
        majorSymptoms: "ಮುಖ್ಯ ಲಕ್ಷಣಗಳು",
        additionalSymptoms: "ಹೆಚ್ಚುವರಿ ಲಕ್ಷಣಗಳು ಅಥವಾ ವಿವರಣೆ",
        cattleInfo: "ಪಶು ಮಾಹಿತಿ",
        managementDetails: "ನಿರ್ವಹಣಾ ವಿವರಗಳು",
        cowAge: "ಹಸುವಿನ ವಯಸ್ಸು (ವರ್ಷಗಳಲ್ಲಿ)",
        dailyMilk: "ದೈನಂದಿನ ಹಾಲಿನ ಉತ್ಪಾದನೆ (ಲೀಟರ್)",
        physicalCondition: "ದೈಹಿಕ ಸ್ಥಿತಿ ಅಂಕೆ (1-5)",
        breed: "ಹಸುವಿನ ಜಾತಿ",
        feedType: "ಆಹಾರ ಪ್ರಕಾರ",
        housingType: "ವಾಸದ ಪ್ರಕಾರ",
        lactationStage: "ಹಾಲು ಕೊಡುವ ಹಂತ",
        symptomHelpText: "ನಿಮ್ಮ ಪಶುವಿನಲ್ಲಿ ಕಾಣುವ ಲಕ್ಷಣಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ.",

        // ಪ್ರತ್ಯೇಕ ಲಕ್ಷಣಗಳು
        lameness: "ಕುಂಟುತನ",
        swollenUdder: "ಉಬ್ಬಿದ ಸ್ತನಗ್ರಂಥಿ",
        abnormalMilk: "ಅಸಾಮಾನ್ಯ ಹಾಲು",
        failureToConceive: "ಗರ್ಭಧಾರಣೆಯಲ್ಲಿ ವಿಫಲ",
        irregularCycle: "ಅನಿಯಮಿತ ಉತ್ಸರ್ಗ ಚಕ್ರ",
        weakness: "ದೌರ್ಬಲ್ಯ",
        reducedAppetite: "ಆಹಾರದ ಆಸಕ್ತಿ ಕಡಿಮೆ",
        diarrhea: "ಅತಿಸಾರ",
        fever: "ಜ್ವರ",
        fmd: "ಎಫ್‌ಎಮ್‌ಡಿ (ಕಾಲು ಮತ್ತು ಬಾಯಿ ರೋಗ)",

        // ಟೂಲ್‌ಟಿಪ್‌ಗಳು
        tooltip_lameness: "ಪ್ರಾಣಿ ಒಂದು ಕಾಲಿನಲ್ಲಿ ಕುಂಟಾಗಿ ನಡೆಯುತ್ತದೆ",
        tooltip_swollenUdder: "ಸ್ತನ ಉಬ್ಬಿದ, ಕೆಂಪಾದ ಅಥವಾ ನೋವು ಕಾಣುತ್ತದೆ",
        tooltip_abnormalMilk: "ಹಾಲು ನೀರಿನಂಥದು, ರಕ್ತದ ಚಿಹ್ನೆ ಅಥವಾ ಗಟ್ಟಿ ಕಾಣುತ್ತದೆ",
        tooltip_failureToConceive: "ಗರ್ಭಧಾರಣೆಯ ಲಕ್ಷಣಗಳು ಕಾಣುವುದಿಲ್ಲ",
        tooltip_irregularCycle: "ಉತ್ಸರ್ಗ ಚಕ್ರ ಅನಿಯಮಿತ ಅಥವಾ ದೀರ್ಘವಾಗಿರುತ್ತದೆ",
        tooltip_weakness: "ದೌರ್ಬಲ್ಯ ಅಥವಾ ನಿಲ್ಲಲು ಸಾಧ್ಯವಿಲ್ಲ",
        tooltip_reducedAppetite: "ಆಹಾರದ ಆಸಕ್ತಿ ಕಡಿಮೆಯಾಗಿದೆ, ಉತ್ಸಾಹ ಇಲ್ಲ",
        tooltip_diarrhea: "ಅತಿಯಾದ ಸಡಿಲ ಮಲವಿಸರ್ಜನೆ",
        tooltip_fever: "ದೇಹದ ತಾಪಮಾನ ಸಾಮಾನ್ಯಕ್ಕಿಂತ ಹೆಚ್ಚು",
        tooltip_fmd: "ಬಾಯಿ, ಕಾಲು ಅಥವಾ ಸ್ತನದ ಮೇಲೆ ಪುಟ್ಟೆಗಳು ಕಾಣುತ್ತವೆ",
        cattleInfo: "ಪಶು ಮಾಹಿತಿ",
        cowAgeLabel: "ಗೋವು ವಯಸ್ಸು (ವರ್ಷಗಳಲ್ಲಿ)",
        cowAgeTip: "ಗೋವು ಎಷ್ಟು ವರ್ಷದದು ಎಂಬುದನ್ನು ನಮೂದಿಸಿ",
        milkYieldLabel: "ದಿನದ ಹಾಲಿನ ಉತ್ಪಾದನೆ (ಲೀಟರ್‌ಗಳಲ್ಲಿ)",
        milkYieldTip: "ಸರಾಸರಿ ದಿನದ ಹಾಲಿನ ಉತ್ಪಾದನೆ",
        conditionLabel: "ದೇಹದ ಸ್ಥಿತಿ ಅಂಕ (1-5)",
        conditionTip: "ಗೋವುಗಳ ದೇಹದ ಒಟ್ಟು ಸ್ಥಿತಿಯ ಅಂಕ",
        managementInfo: "ನಿರ್ವಹಣಾ ವಿವರಗಳು",
        breedLabel: "ಗೋವು ಜಾತಿ",
        breedTip: "ಗೋವು ಯಾವ ಜಾತಿಯದು ಎಂಬುದನ್ನು ಆಯ್ಕೆಮಾಡಿ",
        feedLabel: "ಆಹಾರ ಪ್ರಕಾರ",
        feedTip: "ಗೋವುಗೆ ನೀಡಲಾಗುತ್ತಿರುವ ಆಹಾರದ ಪ್ರಕಾರ",
        housingLabel: "ಗೋಶಾಲೆಯ ಪ್ರಕಾರ",
        housingTip: "ಗೋವು ಉಳಿಯುವ ಸ್ಥಳದ ಪ್ರಕಾರ",
        lactationLabel: "ಹಾಲು ಉತ್ಪಾದನಾ ಹಂತ",
        lactationTip: "ಪ್ರಸ್ತುತ ಹಾಲು ಉತ್ಪಾದನಾ ಹಂತ",
        predictbtn: "ಲಕ್ಷಣಗಳಿಂದ ರೋಗವನ್ನು ಊಹಿಸಿ",
        additionalSymptom: "ಹೆಚ್ಚುವರಿ ಲಕ್ಷಣ / ವಿವರಣೆ",
        additionalTip: "ಗೋವುಗಳಲ್ಲಿ ಗಮನಿಸಿದ ಹೆಚ್ಚುವರಿ ಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ",
        OH: "ಹೋಲ್ಸ್ಟೈನ್",
        OJ: "ಜೆರ್ಸಿ",
        OG: "ಗಿರ್",
        OS: "ಸಾಹಿವಾಲ್",
        OT: "ಥಾರ್ಪರ್ಕರ್",
        Holstein: "ಹೋಲ್ಸ್ಟೈನ್",
        Jersey: "ಜೆರ್ಸಿ",
        Gir: "ಗಿರ್",
        Sahiwal: "ಸಾಹಿವಾಲ್",
        Tharparkar: "ಥಾರ್ಪರ್ಕರ್",
        selectlac: "ಹಾಲು ಉತ್ಪಾದನಾ ಹಂತ ಆಯ್ಕೆಮಾಡಿ",
        SE: "ಆರಂಭಿಕ",
        SM: "ಮಧ್ಯ",
        SL: "ಮುಗಿಯುವ",
        SD: "ಬಿಸು",
        selecthouse: "ಗೋಶಾಲೆಯ ಪ್ರಕಾರ ಆಯ್ಕೆಮಾಡಿ",
        HO: "ತೆಳೆದ",
        HS: "ಅರ್ಧ-ಮುಚ್ಚಿದ",
        HC: "ಮುಚ್ಚಿದ",
        selectfeed: "ಆಹಾರ ಪ್ರಕಾರ ಆಯ್ಕೆಮಾಡಿ",
        GF: "ಹಸಿರು ಹುಲ್ಲು",
        CF: "ಕೇಂದ್ರಿತ",
        MF: "ಮಿಶ್ರಿತ",
        OK: "ಕಂಗಾಯಂ",
        selectcondition: "ಸ್ಥಿತಿ ಅಂಕ ಆಯ್ಕೆಮಾಡಿ",
        1: "1 - ಬಹಳ ಕೆಟ್ಟ",
        2: "2 - ಕೆಟ್ಟ",
        3: "3 - ಸರಾಸರಿ",
        4: "4 - ಉತ್ತಮ",
        5: "5 - ಅತ್ಯುತ್ತಮ",

        // New bilingual labels used by updated display functions
        predictionResults: "ಊಹೆ ಫಲಿತಾಂಶಗಳು",
        diagnosisResults: "ರೋಗ ನಿರ್ಧಾರ ಫಲಿತಾಂಶಗಳು",
        predictedDisease: "ಊಹಿಸಲಾದ ರೋಗ",
        treatmentRecommendations: "ಚಿಕಿತ್ಸಾ ಶಿಫಾರಸುಗಳು",
        additionalSymptomsDescription: "ಹೆಚ್ಚುವರಿ ಲಕ್ಷಣಗಳು / ವಿವರಣೆ",
        feedRecommendation: "ಆಹಾರ ಶಿಫಾರಸು",
        recommendedFeedComposition: "ಶಿಫಾರಸು ಮಾಡಿದ ಆಹಾರ ಸಂಯೋಜನೆ",
        greenFodder: "ಹಸಿರು ಹುಲ್ಲು",
        dryFodder: "ಒಣ ಹುಲ್ಲು",
        groundnutCake: "ಕಡಲೆಕಾಯಿ ಕೇಕ್",
        soybeanMeal: "ಸಾಯ್‌ಬೀನ್ ಮೀಲ್",
        maize: "ಜೋಳ",
        minerals: "ಖನಿಜಗಳು",
        inputParameters: "ಇನ್ಪುಟ್ ಮಾನದಂಡಗಳು",
        age: "ವಯಸ್ಸು",
        years: "ವರ್ಷಗಳು",
        weight: "ತೂಕ",
        milkYield: "ಹಾಲಿನ ಉತ್ಪಾದನೆ",
        healthStatus: "ಆರೋಗ್ಯ ಸ್ಥಿತಿ",
        feedCompositionBreakdown: "ಆಹಾರದ ಸಂಯೋಜನೆ ವಿಭಜನೆ",
        ayurvedicTreatment: "ಆಯುರ್ವೇದ ಚಿಕಿತ್ಸೆ",
        medicalTreatment: "ವೈದ್ಯಕೀಯ ಚಿಕಿತ್ಸೆ",
        confidence: "ನಿಖರತೆ",
        Healthy: "ಆರೋಗ್ಯವಂತ",
        Underweight: "ತೂಕ ಕಡಿಮೆ",
        Sick: "ರೋಗಿಯಾದ",
        descriptionPlaceholder: "ಇಲ್ಲಿ ಯಾವುದೇ ಇತರ ಲಕ್ಷಣಗಳು ಅಥವಾ ಟಿಪ್ಪಣಿಗಳನ್ನು ನಮೂದಿಸಿ..., ಇಲ್ಲದಿದ್ದರೆ null (Kannada or English supported)",
        homeRemedies:"ಮನೆಯಲ್ಲೇ ಮಾಡಬಹುದಾದ ಚಿಕಿತ್ಸೆ"
    }
};

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    applyTranslations();
    
    const dropdownButton = document.getElementById('languageDropdown');
    dropdownButton.textContent = lang === 'en' ? "🌐 English" : "🌐 ಕನ್ನಡ";
}

function applyTranslations() {
    // Update placeholders
    document.querySelectorAll('[data-placeholder]').forEach(el => {
        const key = el.getAttribute('data-placeholder');
        if (translations[currentLang][key]) {
            el.placeholder = translations[currentLang][key];
        }
    });

    // Update text translations
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (!translations[currentLang][key]) return;

        // If element contains an icon (<i>), keep it
        const icon = el.querySelector('i');
        if (icon) {
            el.innerHTML = '';
            const newIcon = document.createElement('i');
            newIcon.className = icon.className;
            el.appendChild(newIcon);
            el.appendChild(document.createTextNode(' ' + translations[currentLang][key]));
        } else {
            el.textContent = translations[currentLang][key];
        }
    });

    // Update dropdown button label
    const dropdownButton = document.getElementById('languageDropdown');
    if (dropdownButton) {
        dropdownButton.textContent = currentLang === 'en' ? "🌐 English" : "🌐 ಕನ್ನಡ";
    }
}



// Apply translation when page loads
document.addEventListener('DOMContentLoaded', applyTranslations);


// Multi-page Navigation
let currentSection = 'home';

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
        initializeCustomCursor();
        initializeNavigation();
        initializeScrollAnimations();
        initializePageTransitions();
        console.log('Cattle Health Monitoring System initialized');
});

function initializeCustomCursor() {
                        document.addEventListener('mousemove', (e) => {
                                cursor.style.left = e.clientX + 'px';
                                cursor.style.top = e.clientY + 'px';
                        });
                        
                        // Add hover effects
                        const interactiveElements = document.querySelectorAll('a, button, input, .form-check-farmer');
                        interactiveElements.forEach(el => {
                                el.addEventListener('mouseenter', () => {
                                        cursor.style.transform = 'scale(1.5)';
                                        
                                });
                                el.addEventListener('mouseleave', () => {
                                        cursor.style.transform = 'scale(1)';
                                        
                                });
                        });
                }
                // Navigation Functionality
                function initializeNavigation() {
                        const navLinks = document.querySelectorAll('.nav-link-custom');
                        const sections = document.querySelectorAll('.page-section');
                        
                        navLinks.forEach(link => {
                                link.addEventListener('click', (e) => {
                                        e.preventDefault();
                                        const targetSection = link.getAttribute('data-section');
                                        scrollToSection(targetSection);
                                        updateActiveNavLink(link);
                                });
                        });
                        
                        // Update active nav link on scroll
                        window.addEventListener('scroll', () => {
                                let current = '';
                                sections.forEach(section => {
                                        const sectionTop = section.offsetTop;
                                        const sectionHeight = section.clientHeight;
                                        if (window.scrollY >= (sectionTop - 120)) { // adjust offset for navbar height
                                                current = section.getAttribute('id');
                                        }
                                });

                                if (current && current !== currentSection) {
                                        currentSection = current;
                                        updateActiveNavLinkBySection(current);
                                }
                        });
                }
                
                function scrollToSection(sectionId) {
                        const section = document.getElementById(sectionId);
                        if (section) {
                                section.scrollIntoView({ 
                                        behavior: 'smooth',
                                        block: 'start'
                                });
                                
                                // Activate section with animation
                                setTimeout(() => {
                                        section.classList.add('active');
                                }, 300);
                        }
                }
                
                function updateActiveNavLink(activeLink) {
                        document.querySelectorAll('.nav-link-custom').forEach(link => {
                                link.classList.remove('active');
                        });
                        activeLink.classList.add('active');
                }
                
                function updateActiveNavLinkBySection(sectionId) {
                        document.querySelectorAll('.nav-link-custom').forEach(link => {
                                link.classList.remove('active');
                                if (link.getAttribute('data-section') === sectionId) {
                                        link.classList.add('active');
                                }
                        });
                }
                
                // Scroll Animations
                function initializeScrollAnimations() {
                        const observerOptions = {
                                threshold: 0.1,
                                rootMargin: '0px 0px -50px 0px'
                        };
                        
                        const observer = new IntersectionObserver((entries) => {
                                entries.forEach(entry => {
                                        if (entry.isIntersecting) {
                                                entry.target.classList.add('active');
                                                
                                                // Animate elements within the section
                                                const animatedElements = entry.target.querySelectorAll('.card, .form-check-farmer, .input-group-farmer');
                                                animatedElements.forEach((el, index) => {
                                                        setTimeout(() => {
                                                                el.style.opacity = '1';
                                                                el.style.transform = 'translateY(0)';
                                                        }, index * 100);
                                                });
                                        }
                                });
                        }, observerOptions);
                        
                        document.querySelectorAll('.page-section').forEach(section => {
                                observer.observe(section);
                        });
                }
                
                // Page Transitions
                function initializePageTransitions() {
                        // Add initial styles for animated elements
                        const animatedElements = document.querySelectorAll('.card, .form-check-farmer, .input-group-farmer');
                        animatedElements.forEach(el => {
                                el.style.opacity = '0';
                                el.style.transform = 'translateY(30px)';
                                el.style.transition = 'all 0.6s ease';
                        });
                }
                
                // DOM Elements
                const fileUploadArea = document.getElementById('fileUploadArea');
                const imageFile = document.getElementById('imageFile');
                const predictImageBtn = document.getElementById('predictImageBtn');
                const imagePreview = document.getElementById('imagePreview');
                const previewImg = document.getElementById('previewImg');
                const fileName = document.getElementById('fileName');
                
                const symptomsForm = document.getElementById('symptomsForm');
                const feedForm = document.getElementById('feedForm');
                
                // File Upload Handling
                fileUploadArea.addEventListener('click', () => imageFile.click());
                fileUploadArea.addEventListener('dragover', handleDragOver);
                fileUploadArea.addEventListener('dragleave', handleDragLeave);
                fileUploadArea.addEventListener('drop', handleDrop);
                
                imageFile.addEventListener('change', handleFileSelect);
                
                // Form Submissions
                symptomsForm.addEventListener('submit', handleSymptomsSubmit);
                feedForm.addEventListener('submit', handleFeedSubmit);
                
                // File Upload Functions
                function handleDragOver(e) {
                        e.preventDefault();
                        fileUploadArea.classList.add('dragover');
                }
                
                function handleDragLeave(e) {
                        e.preventDefault();
                        fileUploadArea.classList.remove('dragover');
                }
                
                function handleDrop(e) {
                        e.preventDefault();
                        fileUploadArea.classList.remove('dragover');
                        const files = e.dataTransfer.files;
                        if (files.length > 0) {
                                handleFile(files[0]);
                        }
                }
                
                function handleFileSelect(e) {
                        const file = e.target.files[0];
                        if (file) {
                                handleFile(file);
                        }
                }
                
                function handleFile(file) {
                        if (!file.type.startsWith('image/')) {
                                showError('imageResults', 'Please select a valid image file.');
                                return;
                        }
                        
                        // Show preview
                        const reader = new FileReader();
                        reader.onload = function(e) {
                                previewImg.src = e.target.result;
                                fileName.textContent = file.name;
                                imagePreview.style.display = 'block';
                                predictImageBtn.disabled = false;
                        };
                        reader.readAsDataURL(file);
                }
                
                // 🌐 Image Prediction with Language Support
                predictImageBtn.addEventListener('click', async () => {
                    const file = imageFile.files[0];
                    if (!file) {
                        showError('imageResults', translations[currentLang].selectImageError || 'Please select an image file.');
                        return;
                    }
                    showLoading('imageLoading');
                    hideResults('imageResults');
                    try {
                        const formData = new FormData();
                        formData.append('file', file);
                        // ✅ send language from toggle
                        formData.append('language', currentLang || 'en');
                        const response = await fetch(`${API_BASE_URL}/predict-image`, {
                            method: 'POST',
                            body: formData
                        });
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        const result = await response.json();
                        displayImageResults(result);    
                    } catch (error) {
                        console.error('Error:', error);
                        showError('imageResults', `${translations[currentLang].error || 'Error'}: ${error.message}`);
                    } finally {
                        hideLoading('imageLoading');
                        }
                    });

                
               // Symptoms Prediction
               async function handleSymptomsSubmit(e) {
                e.preventDefault();
                const formData = new FormData(symptomsForm);
                const symptoms = {};
                // Convert checkboxes to binary values
                const checkboxes = symptomsForm.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach(checkbox => {
                    symptoms[checkbox.name] = checkbox.checked ? 1 : 0;
                });
                // Add additional fields from form
                symptoms.cow_age = formData.get('cow_age');
                symptoms.daily_milk_yield = formData.get('daily_milk_yield');
                symptoms.physical_condition = formData.get('physical_condition');
                symptoms.breed = formData.get('cow_breed');
                symptoms.feed = formData.get('feed_type');
                symptoms.housing = formData.get('housing_type');
                symptoms.lactation_stage = formData.get('lactation_stage');
                symptoms.additional_symptoms = formData.get('additional_symptoms') || null;
    
                // Validate required fields
                if (!symptoms.cow_age || !symptoms.daily_milk_yield || !symptoms.physical_condition || 
                    !symptoms.breed || !symptoms.feed || !symptoms.housing || !symptoms.lactation_stage) {
                        showError('symptomsResults', 'Please fill in all required fields.');
                        return;
                    }
                    showLoading('symptomsLoading');
                    hideResults('symptomsResults');
                    try {
                        formData.append("symptoms_data", JSON.stringify(symptoms));
                        formData.append("language", currentLang || 'en'); // ✅ send Kannada when selected

                        const response = await fetch(`${API_BASE_URL}/predict-symptoms`, {
                            method: 'POST',
                            body: formData 
                        });

                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        const result = await response.json();
                        displaySymptomsResults(result);
                    } catch (error) {
                        console.error('Error:', error);
                        showError('symptomsResults', `${translations[currentLang].error || 'Error'}: ${error.message}`);
                    } finally {
                        hideLoading('symptomsLoading');
                    }
                }   

                // Feed Recommendation
                async function handleFeedSubmit(e) {
                    e.preventDefault();

                    const formData = new FormData(feedForm);
                    const age_years = formData.get('age');
                    const weight = formData.get('weight');
                    const breed = formData.get('breed');
                    const milk_yield = formData.get('milk_yield');
                    const health_status = formData.get('health_status');

                    // Validate inputs
                    if (!age_years || !weight || !breed || !milk_yield || !health_status) {
                        showError('feedResults', 'Please fill in all required fields.');
                        return;
                    }

                    showLoading('feedLoading');
                    hideResults('feedResults');

                    try {
                        // Backend expects age in years, so send as is
                        const bodyData = new URLSearchParams();
                        bodyData.append('age', age_years);
                        bodyData.append('weight', weight);
                        bodyData.append('breed', breed);
                        bodyData.append('milk_yield', milk_yield);
                        bodyData.append('health_status', health_status);

                        const response = await fetch(`${API_BASE_URL}/recommend-feed`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            body: bodyData.toString()
                        });

                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }

                        const result = await response.json();

                        // Normalize backend result to the shape displayFeedResults expects
                        const backendPlan = result.feed_plan || {};
                        const recommendedFeed = backendPlan.recommended_feed || result.recommended_feed || {};

                        const inputParams = backendPlan.input_parameters || {
                            // displayFeedResults expects age in months -> age_months
                            age_months: Number(age_years) * 12,
                            weight_kg: Number(weight),
                            breed: breed,
                            milk_yield_liters: Number(milk_yield),
                            health_status: health_status
                        };

                        const feedPlan = {
                            ...backendPlan,
                            recommended_feed: recommendedFeed,
                            input_parameters: inputParams,
                            notes: backendPlan.notes || result.notes || ''
                        };

                        // Pass object shaped as { feed_plan: { ... } } to displayFeedResults
                        displayFeedResults({ feed_plan: feedPlan });

                    } catch (error) {
                        console.error('Error:', error);
                        showError('feedResults', `Error: ${error.message}`);
                    } finally {
                        hideLoading('feedLoading');
                    }
                }

                // Updated displayTreatments function (bilingual)
                function displayTreatments(treatment) {
                        const trans = translations[currentLang];
                        return `
                                <div class="treatment-section">
                                        <div class="treatment-type text-success">
                                                <i class="bi bi-leaf me-2"></i>${trans.ayurvedicTreatment}
                                        </div>
                                        <p class="mb-2">${treatment.ayurvedic}</p>
                                </div>
                                <div class="treatment-section">
                                        <div class="treatment-type text-primary">
                                                <i class="bi bi-hospital me-2"></i>${trans.medicalTreatment}
                                        </div>
                                        <p class="mb-2">${treatment.medical}</p>
                                </div>
                                <div class="treatment-section">
                                        <div class="treatment-type text-warning">
                                                <i class="bi bi-house me-2"></i>${trans.homeRemedies}
                                        </div>
                                        <p class="mb-0">${treatment.home}</p>
                                </div>
                        `;
                }

                // Updated displayImageResults function (bilingual)
                function displayImageResults(result) {
                        const resultsDiv = document.getElementById('imageResults');
                        const confidence = result.confidence ? (result.confidence * 100).toFixed(1) : 'N/A';
                        const trans = translations[currentLang];

                        resultsDiv.innerHTML = `
                                <div class="result-card">
                                        <h4 class="text-success mb-3">
                                                <i class="bi bi-check-circle-fill me-2"></i>
                                                ${trans.predictionResults}
                                        </h4>
                                        <div class="row">
                                                <div class="col-md-6">
                                                        <h5>${trans.predictedDisease}</h5>
                                                        <p class="h4 text-primary">${formatDiseaseName(result.disease)}</p>
                                                        
                                                </div>
                                                <div class="col-md-6">
                                                        <h5>${trans.treatmentRecommendations}</h5>
                                                        ${displayTreatments(result.treatment)}
                                                </div>
                                        </div>
                                </div>
                        `;
                }

                // Updated displaySymptomsResults function (bilingual)
                // Updated displaySymptomsResults function (bilingual, safe, and clean)
                function displaySymptomsResults(result) {
                    const resultsDiv = document.getElementById('symptomsResults');
                    const trans = translations[currentLang] || translations["en"];

                    const disease = result?.disease || trans.unknownDisease || "Unknown";
                    const treatment = result?.treatment || {};
                    const additionalSymptoms = result?.additional_symptoms || null;

                    let additionalSymptomsHtml = '';
                    if (additionalSymptoms) {
                        additionalSymptomsHtml = `
                            <div class="mt-4">
                                <h5 class="text-info">
                                    <i class="bi bi-chat-dots me-2"></i>${trans.additionalSymptomsDescription}
                                </h5>
                                <div class="alert alert-info">
                                    <p class="mb-0">${additionalSymptoms}</p>
                                </div>
                            </div>  
                            
                        `;
                    }
                 

                    resultsDiv.innerHTML = `
                        <div class="result-card">
                            <h4 class="text-success mb-3">
                                <i class="bi bi-check-circle-fill me-2"></i>
                                ${trans.diagnosisResults}
                            </h4>
                            <div class="row">
                                <div class="col-md-6">
                                    <h5>${trans.predictedDisease}</h5>
                                    <p class="h4 text-primary">${formatDiseaseName(disease)}</p>
                                </div>
                                <div class="col-md-6">
                                    <h5>${trans.treatmentRecommendations}</h5>
                                    ${displayTreatments(treatment)}
                                </div>
                            </div>
                        
                            ${additionalSymptomsHtml}
                        </div>
                   `;
             }

                // Updated displayFeedResults function (bilingual)
                function displayFeedResults(result) {
                        const resultsDiv = document.getElementById('feedResults');
                        const feedPlan = result.feed_plan;
                        const recommendedFeed = feedPlan.recommended_feed;
                        const feedBreakdown = generateFeedBreakdownFromBackend(recommendedFeed);
                        const trans = translations[currentLang];

                        resultsDiv.innerHTML = `
                                <div class="result-card">
                                        <h4 class="text-success mb-3">
                                                <i class="bi bi-check-circle-fill me-2"></i>
                                                ${trans.feedRecommendation}
                                        </h4>
                                        <div class="row">
                                                <div class="col-md-6">
                                                        <h5>${trans.recommendedFeedComposition}</h5>
                                                        <div class="feed-details">
                                                                <div class="feed-item"><span class="feed-label">🌿 ${trans.greenFodder}:</span> <span class="feed-value">${recommendedFeed.Green_Fodder} kg</span></div>
                                                                <div class="feed-item"><span class="feed-label">🌾 ${trans.dryFodder}:</span> <span class="feed-value">${recommendedFeed.Dry_Fodder} kg</span></div>
                                                                <div class="feed-item"><span class="feed-label">🥜 ${trans.groundnutCake}:</span> <span class="feed-value">${recommendedFeed.Groundnut_Cake} kg</span></div>
                                                                <div class="feed-item"><span class="feed-label">🌱 ${trans.soybeanMeal}:</span> <span class="feed-value">${recommendedFeed.Soybean_Meal} kg</span></div>
                                                                <div class="feed-item"><span class="feed-label">🌽 ${trans.maize}:</span> <span class="feed-value">${recommendedFeed.Maize} kg</span></div>
                                                                <div class="feed-item"><span class="feed-label">💊 ${trans.minerals}:</span> <span class="feed-value">${recommendedFeed.Minerals} kg</span></div>
                                                        </div>
                                                        <p class="text-muted mt-3">${feedPlan.notes}</p>

                                                        <h5 class="mt-4">${trans.inputParameters}</h5>
                                                        <ul class="list-unstyled">
                                                                <li><strong>${trans.age}:</strong> ${parseFloat(feedPlan.input_parameters.age_years).toFixed(1)} ${trans.years}</li>
                                                                <li><strong>${trans.weight}:</strong> ${feedPlan.input_parameters.weight_kg} kg</li>
                                                                <li><strong>${trans.breed}:</strong> ${trans[feedPlan.input_parameters.breed]}</li>
                                                                <li><strong>${trans.milkYield}:</strong> ${feedPlan.input_parameters.milk_yield_liters} L/day</li>
                                                                <li><strong>${trans.healthStatus}:</strong> ${trans[feedPlan.input_parameters.health_status]}</li>
                                                        </ul>
                                                </div>
                                                <div class="col-md-6">
                                                        <div class="chart-wrapper">
                                                                <h5>${trans.feedCompositionBreakdown}</h5>
                                                                <div class="chart-container">
                                                                        <canvas id="feedChart"></canvas>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        `;

                        createFeedChart(feedBreakdown);
                }
                
                function generateFeedBreakdownFromBackend(recommendedFeed) {
                        // Generate feed breakdown from your backend data
                        const total = Object.values(recommendedFeed).reduce((sum, val) => sum + val, 0);
                        const labels =
                            currentLang === 'kn'
                                ? ['ಹಸಿರು ಮೇವು', 'ಒಣ ಮೇವು', 'ಕಡಲೆಕಾಯಿ ಕೇಕ್', 'ಸೋಯಾಬೀನ್ ಆಹಾರ', 'ಜೋಳ', 'ಖನಿಜಗಳು']
                                : ['Green Fodder', 'Dry Fodder', 'Groundnut Cake', 'Soybean Meal', 'Maize', 'Minerals'];

                        return {
                                labels: labels,
                                data: [
                                        Math.round((recommendedFeed.Green_Fodder / total) * 100),
                                        Math.round((recommendedFeed.Dry_Fodder / total) * 100),
                                        Math.round((recommendedFeed.Groundnut_Cake / total) * 100),
                                        Math.round((recommendedFeed.Soybean_Meal / total) * 100),
                                        Math.round((recommendedFeed.Maize / total) * 100),
                                        Math.round((recommendedFeed.Minerals / total) * 100)
                                ],
                                colors: ['#4CAF50', '#8BC34A', '#FF9800', '#FF5722', '#FFC107', '#9C27B0']
                        };
                }

                function generateFeedBreakdown(recommendedFeed) {
                        // Generate sample feed breakdown based on feed type
                        const feedType = recommendedFeed.toLowerCase();

                        const labels_en = ['Concentrate Feed', 'Green Fodder', 'Dry Fodder', 'Mineral Mix', 'Water'];
                        const labels_kn = ['ಕಾಂಸಂಟ್ರೇಟ್ ಆಹಾರ', 'ಹಸಿರು ಮೇವು', 'ಒಣ ಮೇವು', 'ಖನಿಜ ಮಿಶ್ರಣ', 'ನೀರು'];
                        const labels = currentLang === 'kn' ? labels_kn : labels_en;
                        
                        if (feedType.includes('high') || feedType.includes('production')) {
                                return {
                                        labels: labels,
                                        data: [35, 30, 25, 5, 5],
                                        colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
                                };
                        } else if (feedType.includes('maintenance') || feedType.includes('low')) {
                                return {
                                        labels: labels,
                                        data: [20, 40, 30, 5, 5],
                                        colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
                                };
                        } else {
                                return {
                                        labels: labels,
                                        data: [25, 35, 28, 7, 5],
                                        colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
                                };
                        }
                }
                
                function createFeedChart(feedData) {
                        const ctx = document.getElementById('feedChart').getContext('2d');
                        
                        new Chart(ctx, {
                                type: 'pie',
                                data: {
                                        labels: feedData.labels,
                                        datasets: [{
                                                data: feedData.data,
                                                backgroundColor: feedData.colors,
                                                borderWidth: 2,
                                                borderColor: '#fff'
                                        }]
                                },
                                options: {
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                                legend: {
                                                        position: 'bottom',
                                                        labels: {
                                                                padding: 20,
                                                                usePointStyle: true,
                                                                font: {
                                                                        size: 12
                                                                }
                                                        }
                                                },
                                                tooltip: {
                                                        callbacks: {
                                                                label: function(context) {
                                                                        return context.label + ': ' + context.parsed + '%';
                                                                }
                                                        }
                                                }
                                        },
                                        animation: {
                                                animateRotate: true,
                                                animateScale: true,
                                                duration: 2000
                                        }
                                }
                        });
                }
                
                function formatDiseaseName(disease) {
                        return disease.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                }
                
                // Utility Functions
                function showLoading(elementId) {
                        document.getElementById(elementId).style.display = 'block';
                }
                
                function hideLoading(elementId) {
                        document.getElementById(elementId).style.display = 'none';
                }
                
                function hideResults(elementId) {
                        document.getElementById(elementId).innerHTML = '';
                }
                
                function showError(elementId, message) {
                        const resultsDiv = document.getElementById(elementId);
                        resultsDiv.innerHTML = `
                                <div class="error-alert">
                                        <i class="bi bi-exclamation-triangle-fill me-2"></i>
                                        ${message}
                                </div>
                        `;
                }
                
                // Initialize Bootstrap tooltips (runs immediately if DOM already loaded)
                function initTooltips() {
                        const tooltipTriggerList = Array.prototype.slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
                        tooltipTriggerList.forEach(function (el) {
                                new bootstrap.Tooltip(el, { container: 'body' });
                        });
                }

                if (document.readyState === 'loading') {
                        document.addEventListener('DOMContentLoaded', initTooltips);
                } else {
                        initTooltips();
                }
