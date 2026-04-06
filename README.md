# Cattle Health API Backend

A FastAPI-based backend service for cattle health diagnosis and feed recommendations.

## Features

- **Image-based Disease Detection**: Upload cattle images for disease diagnosis
- **Symptom-based Diagnosis**: Input symptoms to get disease predictions
- **Feed Recommendations**: Get personalized feed plans based on cattle characteristics
- **Treatment Information**: Comprehensive treatment options (Ayurvedic, Medical, Home remedies)

## Setup

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Model Files**: Ensure the following model files are in the backend directory:
   - `cattle_disease_model.keras` - Image-based disease model
   - `cattle_feed_rf_model.pkl` - Feed recommendation model
   - `rf_cattle_model.pkl` - Symptoms-based disease model
   - `disease_label_encoder.pkl` - Label encoder for disease names
   - `training_columns.pkl` - Column names for symptoms (optional, defaults provided)

3. **Run the Server**:
   ```bash
   python main.py
   ```
   
   Or using uvicorn directly:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

## API Endpoints

### 1. Health Check
- **GET** `/` - Basic health check
- **GET** `/health` - Detailed health check with model status

### 2. Image-based Disease Prediction
- **POST** `/predict-image`
- **Input**: Image file (JPG, PNG, etc.)
- **Output**: Disease prediction with treatment recommendations

### 3. Symptom-based Disease Prediction
- **POST** `/predict-symptoms`
- **Input**: JSON string with symptom features
- **Output**: Disease prediction with treatment recommendations

### 4. Feed Recommendation
- **POST** `/recommend-feed`
- **Input**: Form data with age, weight, milk_yield
- **Output**: Personalized feed recommendation

### 5. Disease Information
- **GET** `/diseases` - List of available diseases with treatments

## Example Usage

### Image Prediction
```bash
curl -X POST "http://localhost:8000/predict-image" \
     -H "accept: application/json" \
     -H "Content-Type: multipart/form-data" \
     -F "file=@cattle_image.jpg"
```

### Symptoms Prediction
```bash
curl -X POST "http://localhost:8000/predict-symptoms" \
     -H "accept: application/json" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "symptoms_data={\"fever\": 1, \"loss_of_appetite\": 1, \"coughing\": 0}"
```

### Feed Recommendation
```bash
curl -X POST "http://localhost:8000/recommend-feed" \
     -H "accept: application/json" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "age=24&weight=450&milk_yield=15"
```

## Response Format

All endpoints return JSON responses:

```json
{
  "disease": "mastitis",
  "treatment": {
    "ayurvedic": "Apply turmeric paste mixed with ghee...",
    "medical": "Antibiotic treatment as prescribed...",
    "home": "Keep udder clean and dry..."
  }
}
```

## Supported Diseases

The API includes treatment information for:
- Mastitis
- Foot and Mouth Disease
- Bloat
- Diarrhea
- Respiratory Infections

## CORS

CORS is enabled for all origins to allow frontend integration.

## Error Handling

The API includes comprehensive error handling for:
- Missing model files
- Invalid image formats
- Malformed JSON data
- Model prediction errors

## Development

The server runs on `http://localhost:8000` by default. API documentation is available at `http://localhost:8000/docs` when the server is running.
