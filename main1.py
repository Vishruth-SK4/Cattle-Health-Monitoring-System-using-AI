
from fastapi import FastAPI, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import numpy as np
import pandas as pd
import joblib
import json
from tensorflow.keras.models import load_model
from PIL import Image
import io
import os

# ------------------- App Setup -------------------
app = FastAPI(title="Cattle Health Monitoring System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------- Safe Load Functions -------------------
def safe_load_joblib(file_path):
    if os.path.exists(file_path):
        return joblib.load(file_path)
    else:
        print(f"⚠️ Warning: {file_path} not found!")
        return None

def safe_load_keras(file_path):
    if os.path.exists(file_path):
        return load_model(file_path)
    else:
        print(f"⚠️ Warning: {file_path} not found!")
        return None

# ------------------- Load Models -------------------
cnn_model = safe_load_keras("cattle_disease_model.keras")
class_labels = ['FMD', 'Healthy', 'Lumpy']

log_reg = safe_load_joblib("logreg_cattle_model.pkl")
xgb = safe_load_joblib("xgboost_cattle_model.pkl")
rf = safe_load_joblib("rf_cattle_model.pkl")
label_encoder = safe_load_joblib("disease_label_encoder.pkl")
training_columns = safe_load_joblib("training_columns.pkl")
feed_rf_model = safe_load_joblib("cattle_feed_rf_model.pkl")

categorical_cols = ["cow_breed", "feed_type", "housing_type", "lactation_stage"]

# ------------------- Treatment Database -------------------
cattle_treatments = {
     "Lameness": {
        "ayurvedic": "Massage with Mahanarayan oil, Ashwagandha powder",
        "medical": "NSAIDs, Anti-inflammatory drugs",
        "home": "Warm water soak, local turmeric paste"
    },
    "Acute Mastitis": {
        "ayurvedic": "Neem and Turmeric paste on udder",
        "medical": "Antibiotics (Penicillin, Oxytocin injections)",
        "home": "Udder massage, warm compress, clean with saline"
    },
    "Chronic Mastitis": {
        "ayurvedic": "Ashwagandha, Guduchi decoction",
        "medical": "Antibiotics, supportive therapy",
        "home": "Proper milking hygiene, warm compress"
    },
    "Anestrus": {
        "ayurvedic": "Shatavari, Ashwagandha, Gokshura powder",
        "medical": "Hormonal therapy (GnRH, Progesterone)",
        "home": "Nutritional improvement, leafy greens, jaggery"
    },
    "Ovarian Cysts": {
        "ayurvedic": "Shatavari, Ashoka bark powder",
        "medical": "Hormonal therapy (Prostaglandins)",
        "home": "Warm compress, improved feed and nutrition"
    },
    "Periparturient Hypocalcemia": {
        "ayurvedic": "Cow’s milk with Ashwagandha, Guduchi",
        "medical": "Calcium gluconate IV",
        "home": "Feeding calcium-rich greens (drumstick leaves, spinach)"
    },
    "Ketosis": {
        "ayurvedic": "Fenugreek, Ashwagandha decoction",
        "medical": "Glucose IV, Propylene glycol",
        "home": "Sugarcane juice, jaggery feed, molasses"
    },
    "Metritis": {
        "ayurvedic": "Neem decoction, Triphala powder orally",
        "medical": "Antibiotics (Oxytetracycline), anti-inflammatories",
        "home": "Clean the vagina with warm saline, turmeric powder"
    },
    "Diarrhea": {
        "ayurvedic": "Triphala churna, Neem leaf powder",
        "medical": "Electrolytes, antibiotics if infectious",
        "home": "ORS (sugar + salt solution), banana or rice water"
    },
    "ROP": {
        "ayurvedic": "Triphala, Ashwagandha powder",
        "medical": "Oxytocin injection, prostaglandins",
        "home": "Manual removal by vet, herbal uterine tonics"
    },
    "FMD - Wounds": {
        "ayurvedic": "Turmeric paste, Neem extract",
        "medical": "Symptomatic treatment, antibiotics for secondary infection",
        "home": "Clean with warm saline, turmeric paste"
    },
    "FMD - Mouth Lesions": {
        "ayurvedic": "Neem paste, Aloe vera",
        "medical": "Supportive care, antibiotics for infection",
        "home": "Soft feed, turmeric and honey paste"
    },
    "Warts": {
        "ayurvedic": "Neem paste, Turmeric powder",
        "medical": "Cryotherapy or surgical removal",
        "home": "Apply garlic paste or turmeric paste on warts"
    },
    "Bloat / Indigestion": {
        "ayurvedic": "Hing (Asafoetida) powder, Triphala decoction",
        "medical": "Anti-bloat medicine, rumenotomy in severe cases",
        "home": "Massage on left flank, feed dry fodder or cumin water"
    },
    "Prolapse of Uterus": {
        "ayurvedic": "Ashwagandha, Triphala internally",
        "medical": "Surgical replacement, antibiotics",
        "home": "Keep clean, gently push back under vet guidance"
    },
    "Ecto Parasites": {
        "ayurvedic": "Neem oil, Turmeric powder",
        "medical": "Ivermectin, insecticidal dips",
        "home": "Neem leaves decoction, turmeric powder dusting"
    },
    "Udder Oedema": {
        "ayurvedic": "Gokshura decoction, Ashwagandha",
        "medical": "Diuretics, supportive therapy",
        "home": "Warm water massage, reduce salt intake"
    },
    "Fever": {
        "ayurvedic": "Guduchi decoction, Tulsi leaves",
        "medical": "Paracetamol, antibiotics if infection",
        "home": "Cool water bath, herbal decoctions"
    },
    "Teat Block": {
        "ayurvedic": "Warm Ashwagandha oil massage",
        "medical": "Oxytocin, milking manually",
        "home": "Warm water massage, gentle milking"
    },
    "Deworming": {
        "ayurvedic": "Neem, Areca nut powder",
        "medical": "Albendazole, Fenbendazole",
        "home": "Pumpkin seeds, garlic paste, papaya seeds"
    },
    "FMD": {
        "ayurvedic": "Neem leaves + turmeric paste applied to ulcers.",
        "medical": "Vaccinate and provide pain relief; isolate affected cattle.",
        "home": "Apply coconut oil to mouth and feet lesions."
    },
    "Lumpy": {
        "ayurvedic": "Tulsi, neem, and turmeric water; herbal anti-inflammatory mix.",
        "medical": "Use antibiotics to prevent secondary infections.",
        "home": "Cool compress and neem bath to reduce lesions."
    },
    "Healthy": {
        "ayurvedic": "Feed amla and neem-based tonics.",
        "medical": "No treatment required.",
        "home": "Provide clean water and balanced diet."
    }
}
# Add rest of diseases as in original code...

# ------------------- Kannada Translations -------------------
disease_kn = {
    "Lameness": "ಕಾಲು ನೋವು (ಲಾಮ್ನೆಸ್)",
    "Acute Mastitis": "ತೀವ್ರ ಉಬ್ಬುವ ಉಡ್ಡಿನ ರೋಗ",
    "Chronic Mastitis": "ದೀರ್ಘಕಾಲದ ಉಡ್ಡಿನ ರೋಗ",
    "Anestrus": "ಹೀಟ್ ಕಾಣಿಸದಿರುವುದು",
    "Ovarian Cysts": "ಡಿಂಬಕೋಶದ ಗಡ್ಡೆಗಳು",
    "Periparturient Hypocalcemia": "ಹಸು ಹಾಲು ಬಿಡುವ ಮೊದಲು ಕ್ಯಾಲ್ಸಿಯಂ ಕೊರತೆ",
    "Ketosis": "ಕೀಟೋಸಿಸ್ (ಹಾಲಿನ ನಂತರ ದುರ್ಬಲತೆ)",
    "Metritis": "ಗರ್ಭಕೋಶದ ಸೋಂಕು",
    "Diarrhea": "ಜಲದೋಷ",
    "ROP": "ಪ್ಲಾಸೆಂಟಾ ಹೊರಬಾರದ ರೋಗ",
    "FMD":  "ಕಾಲು ಮತ್ತು ಬಾಯಿ ರೋಗ (FMD)" ,
    "Warts": "ಚರ್ಮದ ಗುಳ್ಳೆಗಳು",
    "Bloat / Indigestion": "ಗ್ಯಾಸು / ಅಜೀರ್ಣ",
    "Prolapse of Uterus": "ಗರ್ಭಕೋಶ ಬಿದ್ದುಹೋಗುವುದು",
    "Ecto Parasites": "ಹೊರಗಿನ ಪರೋಪಜೀವಿಗಳು (ಟಿಕ್, ಜುಳುಕು)",
    "Udder Oedema": "ಉಡ್ಡಿನ ಉಬ್ಬು",
    "Fever": "ಜ್ವರ",
    "Teat Block": "ಹಾಲು ಬಾಯಲ್ಲಿ ತಡೆ",
    "Deworming": "ಹುಳು ನಿವಾರಣೆ",
    "Lumpy": "ಲಂಪಿ ಸ್ಕಿನ್ ರೋಗ",
    "Healthy": "ಆರೋಗ್ಯಕರ"
}
cattle_treatments_kn = {
    "Lameness": {
        "ayurvedic": "ಮಹಾನಾರಾಯಣ ಎಣ್ಣೆ ಮಸಾಜ್, ಅಶ್ವಗಂಧಾ ಪುಡಿ",
        "medical": "ನೋವು ನಿವಾರಕ ಮತ್ತು ಆಂಟಿ-ಇನ್ಫ್ಲಮೇಟರಿ ಔಷಧಿಗಳು",
        "home": "ಬಿಸಿ ನೀರಿನಲ್ಲಿ ಕಾಲು ಮುಳುಗಿಸುವುದು, ಸ್ಥಳೀಯ ಅರಿಶಿನ ಪುಡಿ ಹಚ್ಚುವುದು"
    },
    "Acute Mastitis": {
        "ayurvedic": "ನೀಮ್ ಮತ್ತು ಅರಿಶಿನ ಪೇಸ್ಟ್ ಉಡ್ಡಿನ ಮೇಲೆ ಹಚ್ಚುವುದು",
        "medical": "ಆಂಟಿಬಯಾಟಿಕ್ಸ್ (ಪೆನಿಸಿಲಿನ್, ಆಕ್ಸಿಟೊಸಿನ್ ಇಂಜೆಕ್ಷನ್ಸ್)",
        "home": "ಉಡ್ಡಿನ ಮಸಾಜ್, ಬಿಸಿ ಕಾಂಪ್ರೆಸ್, ಉದ್ದಿನ ಸ್ವಚ್ಛತೆಗೆ ಸೋಲ್ಯೂಶನ್ ಬಳಸಿ ತೊಳೆಯುವುದು"
    },
    "Chronic Mastitis": {
        "ayurvedic": "ಅಶ್ವಗಂಧಾ, ಗುಡುಚಿ ದ್ರಾಕ್ಷಾರಸ",
        "medical": "ಆಂಟಿಬಯಾಟಿಕ್ಸ್, ಸಹಾಯಕ ಚಿಕಿತ್ಸೆ",
        "home": "ಸರಿಯಾದ ಹಾಲು ಕಾಳಜಿ, ಬಿಸಿ ಕಾಂಪ್ರೆಸ್"
    },
    "Anestrus": {
        "ayurvedic": "ಶತಾವರಿ, ಅಶ್ವಗಂಧಾ, ಗೋಷುರ ಪುಡಿ",
        "medical": "ಹಾರ್ಮೋನಲ್ ಥೆರಪಿ (GnRH, ಪ್ರೋಗೆಸ್ಟೆರೋನ್)",
        "home": "ಆಹಾರ ಸುಧಾರಣೆ, ಹಸಿರು ಸೊಪ್ಪುಗಳು, ಬೆಲ್ಲ"
    },
    "Ovarian Cysts": {
        "ayurvedic": "ಶತಾವರಿ, ಅಶೋಕ ಚಿಲ್ಲೆ ಪುಡಿ",
        "medical": "ಹಾರ್ಮೋನಲ್ ಥೆರಪಿ (ಪ್ರೋಸ್ಟಾಗ್ಲ್ಯಾಂಡಿನ್ಸ್)",
        "home": "ಬಿಸಿ ಕಾಂಪ್ರೆಸ್, ಆಹಾರ ಮತ್ತು ಪೋಷಣೆಯನ್ನು ಸುಧಾರಿಸು"
    },
    "Periparturient Hypocalcemia": {
        "ayurvedic": "ಹಸುವಿನ ಹಾಲಿನಲ್ಲಿ ಅಶ್ವಗಂಧಾ, ಗುಡುಚಿ",
        "medical": "ಕ್ಯಾಲ್ಸಿಯಮ್ ಗ್ಲೂಕೋನೇಟ್ IV",
        "home": "ಕ್ಯಾಲ್ಸಿಯಂ-ಸಂಪನ್ನ ಸೊಪ್ಪುಗಳನ್ನು ನೀಡುವುದು (ಸಿಂಘದ ಸೊಪ್ಪು, ಪಲಕ್)"
    },
    "Ketosis": {
        "ayurvedic": "ಮೆಂತ್ಯೆ, ಅಶ್ವಗಂಧಾ ದ್ರಾಕ್ಷಾರಸ",
        "medical": "ಗ್ಲೂಕೋಸ್ IV, ಪ್ರೊಪಿಲೀನ್ ಗ್ಲೈಕಾಲ್",
        "home": "ನೆಲ್ಲಿಕಾಯಿ ರಸ, ಬೆಲ್ಲದ ಆಹಾರ, ಮೊಲೆಸಸ್"
    },
    "Metritis": {
        "ayurvedic": "ನೀಮ್ ದ್ರಾಕ್ಷಾರಸ, ತ್ರಿಫಲ ಪುಡಿ ಮೌಖಿಕವಾಗಿ",
        "medical": "ಆಂಟಿಬಯಾಟಿಕ್ಸ್ (ಆಕ್ಸಿಟೆಟ್ರಾಸೈಕ್ಲಿನ್), ಆಂಟಿ-ಇನ್ಫ್ಲಮೇಟರಿ ಔಷಧಿಗಳು",
        "home": "ಬಿಸಿ ಸೋಲ್ಯೂಶನ್‌ನಿಂದ ಯೋನಿ ತೊಳೆಯುವುದು, ಅರಿಶಿನ ಪುಡಿ"
    },
    "Diarrhea": {
        "ayurvedic": "ತ್ರಿಫಲ ಪುಡಿ, ನೀಮ್ ಎಲೆ ಪುಡಿ",
        "medical": "ಇಲೆಕ್ಟ್ರೋಲೈಟ್ಸ್, ಸೋಂಕಾದರೆ ಆಂಟಿಬಯಾಟಿಕ್ಸ್",
        "home": "ORS (ಸಕ್ಕರೆ + ಉಪ್ಪಿನ ದ್ರಾವಣ), ಬಾಳೆಹಣ್ಣು ಅಥವಾ ಅಕ್ಕಿ ನೀರು"
    },
    "ROP": {
        "ayurvedic": "ತ್ರಿಫಲ, ಅಶ್ವಗಂಧಾ ಪುಡಿ",
        "medical": "ಆಕ್ಸಿಟೊಸಿನ್ ಇಂಜೆಕ್ಷನ್, ಪ್ರೋಸ್ಟಾಗ್ಲ್ಯಾಂಡಿನ್ಸ್",
        "home": "ಪಶು ವೈದ್ಯರಿಂದ ಕೈಯಿಂದ ತೆಗೆದುಹಾಕುವುದು, ಹುಲ್ಲಿನ ಗರ್ಭಕೋಶ ಟೋನಿಕ್"
    },
    "FMD - Wounds": {
        "ayurvedic": "ಅರಿಶಿನ ಪೇಸ್ಟ್, ನೀಮ್ ಸುತ್ತು",
        "medical": "ಲಕ್ಷಣಾತ್ಮಕ ಚಿಕಿತ್ಸೆ, ಎರಡನೆಯ ಸೋಂಕು ತಡೆಗಾಗಿ ಆಂಟಿಬಯಾಟಿಕ್ಸ್",
        "home": "ಬಿಸಿ ಸೋಲ್ಯೂಶನ್‌ನಿಂದ ತೊಳೆಯುವುದು, ಅರಿಶಿನ ಹಚ್ಚುವುದು"
    },
    "FMD - Mouth Lesions": {
        "ayurvedic": "ನೀಮ್ ಪೇಸ್ಟ್, ಅಲೋವೆರೆ",
        "medical": "ಸಹಾಯಕ ಕಾಳಜಿ, ಸೋಂಕಿನ ತಡೆಗೆ ಆಂಟಿಬಯಾಟಿಕ್ಸ್",
        "home": "ಮೃದುವಾದ ಆಹಾರ, ಅರಿಶಿನ ಮತ್ತು ತೇನಿಹಣ್ಣು ಪೇಸ್ಟ್"
    },
    "Warts": {
        "ayurvedic": "ನೀಮ್ ಪೇಸ್ಟ್, ಅರಿಶಿನ ಪುಡಿ",
        "medical": "ಕ್ರಿಯೋಥೆರಪಿ ಅಥವಾ ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ",
        "home": "ಬೆಳ್ಳುಳ್ಳಿ ಪೇಸ್ಟ್ ಅಥವಾ ಅರಿಶಿನ ಪೇಸ್ಟ್ ಹಚ್ಚುವುದು"
    },
    "Bloat / Indigestion": {
        "ayurvedic": "ಹಿಂಗು ಪುಡಿ, ತ್ರಿಫಲ ದ್ರಾಕ್ಷಾರಸ",
        "medical": "ಆಂಟಿ-ಬ್ಲಾಟ್ ಔಷಧಿ, ತೀವ್ರ ಸಂದರ್ಭದಲ್ಲಿ ರೂಮೆನೋಟಮಿ",
        "home": "ಎಡ ಬದಿಯ ಹತ್ತಿ ಮಸಾಜ್, ಒಣ ಹಸಿರು ಆಹಾರ ಅಥವಾ ಜೀರಿಗೆ ನೀರು"
    },
    "Prolapse of Uterus": {
        "ayurvedic": "ಅಶ್ವಗಂಧಾ, ತ್ರಿಫಲ ಒಳಗೆ ಹಚ್ಚುವುದು",
        "medical": "ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ, ಆಂಟಿಬಯಾಟಿಕ್ಸ್",
        "home": "ಸ್ವಚ್ಛತೆ ಕಾಯ್ದುಕೊಳ್ಳಿ, ನಯವಾಗಿ ಹಿಂಪಡೆಯುವುದು (ಪಶು ವೈದ್ಯರ ಮಾರ್ಗದರ್ಶನ)"
    },
    "Ecto Parasites": {
        "ayurvedic": "ನೀಮ್ ಎಣ್ಣೆ, ಅರಿಶಿನ ಪುಡಿ",
        "medical": "ಐವರ್ಮೆಕ್ಟಿನ್, ಕೀಟನಾಶಕ ಸ್ನಾನ",
        "home": "ನೀಮ್ ಎಲೆ ದ್ರಾಕ್ಷಾರಸ, ಅರಿಶಿನ ಪುಡಿ ಪುಡಿ ಹಾಕುವುದು"
    },
    "Udder Oedema": {
        "ayurvedic": "ಗೋಷುರ ದ್ರಾಕ್ಷಾರಸ, ಅಶ್ವಗಂಧಾ",
        "medical": "ಡೈಯೂರೆಟಿಕ್, ಸಹಾಯಕ ಚಿಕಿತ್ಸೆ",
        "home": "ಬಿಸಿ ನೀರಿನ ಮಸಾಜ್, ಉಪ್ಪು ಕಡಿಮೆ ಮಾಡಿ"
    },
    "Fever": {
        "ayurvedic": "ಗುಡುಚಿ ದ್ರಾಕ್ಷಾರಸ, ತುಳಸಿ ಎಲೆಗಳು",
        "medical": "ಪ್ಯಾರಾಸೆಟಾಮೋಲ್, ಸೋಂಕಾದರೆ ಆಂಟಿಬಯಾಟಿಕ್ಸ್",
        "home": "ತಣ್ಣನೆಯ ನೀರಿನ ಸ್ನಾನ, ಹುಲ್ಲಿನ ದ್ರಾಕ್ಷಾರಸ"
    },
    "Teat Block": {
        "ayurvedic": "ಬಿಸಿ ಅಶ್ವಗಂಧಾ ಎಣ್ಣೆ ಮಸಾಜ್",
        "medical": "ಆಕ್ಸಿಟೊಸಿನ್, ಕೈಯಿಂದ ಹಾಲು ಹಚ್ಚುವುದು",
        "home": "ಬಿಸಿ ನೀರಿನ ಮಸಾಜ್, ನಯವಾಗಿ ಹಾಲು ಹಚ್ಚುವುದು"
    },
    "Deworming": {
        "ayurvedic": "ನೀಮ್, ಅರೆಕಾ ನಟ್ ಪುಡಿ",
        "medical": "ಅಲ್ಬೆಂಡಾಜೋಲ್, ಫೆನ್‌ಬೆಂಡಾಜೋಲ್",
        "home": "ಕುಂಬಳಕಾಯಿ ಬೀಜ, ಬೆಳ್ಳುಳ್ಳಿ ಪೇಸ್ಟ್, ಪಪಾಯಾ ಬೀಜ"
    },
    "FMD": {
        "ayurvedic": "ಗಾಯಗಳಿಗೆ ನೀಮ್ ಎಲೆ + ಅರಿಶಿನ ಪೇಸ್ಟ್ ಹಚ್ಚುವುದು",
        "medical": "ಟೀಕಾಕರಣ ಮತ್ತು ನೋವು ನಿವಾರಣೆ; ಸೋಂಕಿತ ಹಸುಗಳನ್ನು ವಿಭಜಿಸಿ",
        "home": "ಮುಖ ಮತ್ತು ಕಾಲು ಗಾಯಗಳಿಗೆ ತೆಂಗಿನ ಎಣ್ಣೆ ಹಚ್ಚುವುದು"
    },
    "Lumpy": {
        "ayurvedic": "ತುಳಸಿ, ನೀಮ್, ಅರಿಶಿನ ನೀರು; ಹರ್ಬಲ್ ಆಂಟಿ-ಇನ್ಫ್ಲಮೇಟರಿ ಮಿಶ್ರಣ",
        "medical": "ಎರಡನೆಯ ಸೋಂಕು ತಡೆಯಲು ಆಂಟಿಬಯಾಟಿಕ್ ಬಳಸಿ",
        "home": "ತಪ್ಪು ಹೀಗೆ ಕುಂದಿಸಲು ನೀಮ್ ಸ್ನಾನ ಮತ್ತು ತಣ್ಣನೆಯ ಕಾಂಪ್ರೆಸ್"
    },
    "Healthy": {
        "ayurvedic": "ಆಮ್ಲ ಮತ್ತು ನೀಮ್ ಆಧಾರಿತ ಟೋನಿಕ್",
        "medical": "ಯಾವುದೇ ಚಿಕಿತ್ಸೆ ಅಗತ್ಯವಿಲ್ಲ",
        "home": "ಶುದ್ಧ ನೀರು ಮತ್ತು ಸಮತೋಲನ ಆಹಾರ ನೀಡುವುದು"
    }
}



# ------------------- Helper Function -------------------
# ------------------- Helper Function -------------------
def get_treatment(disease_name: str, language: str = "en", confidence: float = None):
    if not disease_name:
        disease_name_clean = "Unknown"
    else:
        disease_name_clean = disease_name.strip()

    # Normalize case for consistent lookups
    disease_key_upper = disease_name_clean.upper()
    disease_key_title = disease_name_clean.title()

    # Default fallback treatments
    default_en = {
        "ayurvedic": "Consult a veterinarian.",
        "medical": "Consult a veterinarian.",
        "home": "Maintain hygiene and proper feeding."
    }

    default_kn = {
        "ayurvedic": "ಔಷಧಿ ಸಲಹೆಗಾಗಿ ಪಶು ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
        "medical": "ಸೂಕ್ತ ಚಿಕಿತ್ಸೆಗಾಗಿ ಪಶು ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
        "home": "ಹಸುಗೆ ಸ್ವಚ್ಛತೆ ಮತ್ತು ಉತ್ತಮ ಆಹಾರ ನೀಡಿ."
    }

    # ✅ Language-based disease name + treatment mapping
    if language == "kn":
        disease_display = disease_kn.get(disease_key_upper, disease_kn.get(disease_key_title, disease_name_clean))
        treatment = cattle_treatments_kn.get(disease_key_upper, cattle_treatments_kn.get(disease_key_title, default_kn))
    else:
        disease_display = disease_key_title
        treatment = cattle_treatments.get(disease_key_upper, cattle_treatments.get(disease_key_title, default_en))

    # ✅ Rename “FMD” → “Foot and Mouth Disease” for English
    # ✅ Rename Kannada accordingly
    if disease_name_clean.upper() == "FMD":
        if language == "kn":
            disease_display = " ಕಾಲು ಮತ್ತು ಬಾಯಿ ರೋಗ (FMD)"
        else:
            disease_display = "Foot and Mouth Disease"

    return {
        "disease": disease_display,
        "treatment": treatment
    }




# ------------------- Image Prediction -------------------
def predict_image(file: UploadFile, language="en"):
    if cnn_model is None:
        raise HTTPException(status_code=500, detail="CNN model not loaded.")

    img = Image.open(io.BytesIO(file.file.read())).convert("RGB")
    img = img.resize((224, 224))
    img_array = np.expand_dims(np.array(img) / 255.0, axis=0)

    preds = cnn_model.predict(img_array)
    pred_class = class_labels[np.argmax(preds)].strip()
    result = get_treatment(pred_class, language)
    return result

# ------------------- Symptom Prediction -------------------
def predict_symptoms(symptoms_input, language="en"):
    if rf is None or label_encoder is None or training_columns is None:
        raise HTTPException(status_code=500, detail="Symptom models not loaded.")

    # Rule-based text match
    additional_text = str(symptoms_input.get("additional_symptoms", "")).lower()
    keyword_rules = {
    "Lameness": [
        "lameness", "limp", "leg pain", "walking problem", "cannot walk",
        "walking difficulty", "leg injury", "hoof pain", "stiff leg",
        "not bearing weight", "dragging leg", "slow walking", "uneven walk"
    ],

    "Acute Mastitis": [
        "swollen udder", "painful udder", "bloody milk", "clotted milk",
        "hot udder", "red udder", "milk flakes", "pus in milk", "sudden mastitis",
        "udder infection", "sudden milk drop", "pain while milking"
    ],

    "Chronic Mastitis": [
        "abnormal milk", "recurring udder infection", "long term mastitis",
        "milk clots", "repeated mastitis", "hard udder", "lumpy udder",
        "low milk for long time"
    ],

    "Anestrus": [
        "no heat", "not showing heat", "no estrus", "failure to conceive",
        "not coming to heat", "no signs of heat", "silent heat", "not cycling"
    ],

    "Ovarian Cysts": [
        "irregular cycle", "repeated heat", "prolonged estrus", "frequent heat",
        "cow coming heat again and again", "cycle not normal", "cyst"
    ],

    "Periparturient Hypocalcemia": [
        "cannot stand", "downer cow", "weak after calving", "milk fever",
        "shivering", "cold ears", "muscle tremors", "cow lying down", "weak muscles"
    ],

    "Ketosis": [
        "acetone smell", "loss of appetite after calving", "milk drop",
        "sweet smell breath", "low energy", "reduced feeding", "ketone smell",
        "weight loss", "cow dull", "low glucose", "no feeding"
    ],

    "Metritis": [
        "vaginal discharge", "uterine infection", "foul smell after calving",
        "dirty discharge", "pus discharge", "infection after delivery",
        "brown discharge", "smelly discharge"
    ],

    "Diarrhea": [
        "loose motion", "watery stool", "frequent defecation", "scours",
        "runny poop", "loose stool", "cow passing water stool", "diarrhoea",
        "green stool", "smelly stool"
    ],

    "ROP": [
        "retained placenta", "afterbirth not expelled", "placenta stuck",
        "membrane hanging", "cow not cleaning", "afterbirth hanging"
    ],

    "FMD": [
        "foot and mouth", "mouth wound", "blisters", "ulcer",
        "mouth lesion", "foot wound", "drooling", "excess saliva",
        "blister on mouth", "hooves wound", "foot ulcer"
    ],

    "Warts": [
        "wart", "skin lump", "growth on skin", "skin tumour",
        "skin bump", "hard lump", "viral growth"
    ],

    "Bloat / Indigestion": [
        "swollen belly", "gas", "distended abdomen", "bloat",
        "stomach full", "not eating", "rumen gas", "left side swollen",
        "stomach tight", "indigestion", "cow not burping"
    ],

    "Prolapse of Uterus": [
        "uterus out", "vaginal prolapse", "something coming out",
        "mass outside vagina", "red mass outside", "uterus hanging"
    ],

    "Ecto Parasites": [
        "ticks", "lice", "mites", "scratching skin",
        "itching", "external parasites", "skin biting", "hair loss",
        "tick infestation", "skin irritation"
    ],

    "Udder Oedema": [
        "swelling under udder", "swollen udder before calving",
        "udder filled with fluid", "udder soft swelling", "puffy udder",
        "fluid retention in udder"
    ],

    "Fever": [
        "fever", "hot body", "high temperature",
        "cow warm", "high temp", "body hot", "temperature raised",
        "cow shivering", "body heat increased"
    ],

    "Teat Block": [
        "milk not coming", "blocked teat", "no milk flow",
        "teat blockage", "clogged teat", "teat obstruction",
        "cannot milk", "milk stuck"
    ],

    "Deworming": [
        "worms", "deworming needed", "parasite in stool",
        "worm infection", "worm load", "thin cattle", "hair rough",
        "worms in dung"
    ]
    }

    detected_rule_disease = next((d for d, kws in keyword_rules.items() if any(k in additional_text for k in kws)), None)

    # Checkbox-based detection
    checkbox_symptoms = [k.lower().replace(" ", "_") for k, v in symptoms_input.items() if str(v).lower() in ["1", "true", "yes", "on"]]
    checkbox_rules = {
        "Lameness": ["lameness"],
        "Acute Mastitis": ["swollen_udder", "abnormal_milk"],
        "Chronic Mastitis": ["chronic_mastitis"],
        "Anestrus": ["failure_to_conceive"],
        "Ovarian Cysts": ["irregular_cycle"],
        "Periparturient Hypocalcemia": ["weakness", "cannot_stand"],
        "Ketosis": ["reduced_appetite", "weakness_after_calving"],
        "Metritis": ["vaginal_discharge"],
        "Diarrhea": ["diarrhea"],
        "ROP": ["retained_placenta"],
        "FMD": ["fmd"],
        "Warts": ["warts"],
        "Bloat / Indigestion": ["bloat", "indigestion"],
        "Prolapse of Uterus": ["prolapse"],
        "Ecto Parasites": ["parasite", "ecto_parasites"],
        "Udder Oedema": ["udder_oedema"],
        "Fever": ["fever"],
        "Teat Block": ["teat_block"],
        "Deworming": ["deworming"]
        }
    detected_checkbox_disease = next((d for d, keys in checkbox_rules.items() if any(k in checkbox_symptoms for k in keys)), None)

    # Final disease decision
    disease_name = detected_rule_disease or detected_checkbox_disease
    if disease_name:
        return get_treatment(disease_name, language)

    # Fallback to ML model
    df = pd.DataFrame([symptoms_input])
    df = pd.get_dummies(df, columns=categorical_cols, drop_first=True)
    for col in training_columns:
        if col not in df.columns:
            df[col] = 0
    df = df[training_columns]
    pred_rf = rf.predict(df)[0]
    disease_name = label_encoder.inverse_transform([pred_rf])[0]

    return get_treatment(disease_name, language)

# ------------------- Feed Recommendation -------------------
def recommend_feed(age, weight, breed, milk_yield, health_status):
    if feed_rf_model is None:
        raise HTTPException(status_code=500, detail="Feed model not loaded.")

    age_years = (age) 
    weight = float(weight)
    milk = float(milk_yield)

    green = round(weight * 0.03, 1)
    dry = round(weight * 0.01, 1)
    total_conc = round(milk * 0.5, 1)
    groundnut_cake = round(total_conc * 0.4, 1)
    soybean_meal = round(total_conc * 0.35, 1)
    maize = round(total_conc * 0.25, 1)
    minerals = 0.2

    sample = pd.DataFrame([{
        "Age_years": age_years,
        "Weight_kg": weight,
        "Milk_yield_liters": milk,
        **{f"Breed_{b}": 1 if b == breed else 0 for b in ['Holstein', 'Jersey', 'Gir', 'Sahiwal', 'Tharparkar']},
        **{f"Health_Status_{h}": 1 if h == health_status else 0 for h in ['Healthy', 'Underweight', 'Sick']}
    }])

    ml_pred = feed_rf_model.predict(sample)[0]
    ml_pred = {name: round(val, 1) for name, val in zip(
        ['Green_Fodder', 'Dry_Fodder', 'Groundnut_Cake', 'Soybean_Meal', 'Maize', 'Minerals'], ml_pred)}

    final_feed = {k: round((ml_pred[k] + v) / 2, 1) for k, v in {
        "Green_Fodder": green, "Dry_Fodder": dry,
        "Groundnut_Cake": groundnut_cake, "Soybean_Meal": soybean_meal,
        "Maize": maize, "Minerals": minerals
    }.items()}

    # Return feed plan along with input parameters
    return {
        "feed_plan": {
            "recommended_feed": final_feed,
            "input_parameters": {
                "age_years": age_years,
                "weight_kg": weight,
                "breed": breed,
                "milk_yield_liters": milk,
                "health_status": health_status
            }
        }
    }

# ------------------- API Endpoints -------------------
from fastapi import FastAPI, UploadFile, Form, HTTPException
import json

@app.post("/predict-image")
async def predict_image_endpoint(file: UploadFile, language: str = Form("en")):
    # Ensure 'language' is lowercase and defaults correctly
    language = language.lower().strip() if language else "en"
    return predict_image(file, language)


@app.post("/predict-symptoms")
async def predict_symptoms_endpoint(
    symptoms_data: str = Form(None),
    symptoms_json: dict = None,
    language: str = Form("en")
):
    # Normalize and validate language input
    language = language.lower().strip() if language else "en"

    # Parse symptoms input from form or JSON
    try:
        data = symptoms_json or (json.loads(symptoms_data) if symptoms_data else {})
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON format for symptoms_data.")

    if not data:
        raise HTTPException(status_code=400, detail="No symptoms data provided.")

    # Call prediction function
    result = predict_symptoms(data, language)

    # ✅ Ensure consistent structure
    return {
        "disease": result.get("disease", "Unknown"),
        "treatment": result.get("treatment", {
            "ayurvedic": "-",
            "medical": "-",
            "home": "-"
        })
    }



@app.post("/recommend-feed")
async def recommend_feed_endpoint(
    age: float = Form(...), weight: float = Form(...), breed: str = Form(...),
    milk_yield: float = Form(...), health_status: str = Form(...), language: str = Form("en")
):
    return recommend_feed(age, weight, breed, milk_yield, health_status)

# ------------------- Run -------------------
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

##cd "/Users/ravipatel/Desktop/cattle website copy 2/backend"
##uvicorn main1:app --reload

