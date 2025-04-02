# AgroPrice Forecast 🌾

An intelligent agricultural commodity price prediction system with AI-powered chat assistance.

## Features 🚀

- **Price Prediction**: Machine learning-based price forecasting for agricultural commodities
- **AI Assistant**: Multi-lingual chatbot for agricultural queries (English, Hindi, Marathi)
- **Interactive UI**: Modern, responsive interface with glassmorphism design
- **Location-based**: State, district and market-specific predictions
- **Commodity Coverage**: Support for multiple commodities and varieties

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript, jQuery
- **Backend**: Python, Flask
- **ML Models**: 
  - Random Forest
  - XGBoost
  - Stacking Ensemble
- **AI Integration**: Groq API with LLaMa 3.3 70B model
- **Data Processing**: Pandas, NumPy
- **Visualization**: Custom CSS animations

## Project Structure

```
capstone/
├── data/
│   └── Price_Agriculture_commodities_Week.csv
├── models/
│   └── stacking_ensemble_model.pkl
├── static/
│   ├── images/
│   ├── script.js
│   └── styles.css
├── templates/
│   └── index.html
├── app.py
├── requirements.txt
└── README.md
```

## Setup Instructions

1. Clone the repository:
```bash
git clone [repository-url]
cd capstone
```

2. Download required files:
   - Download [Price_Agriculture_commodities_Week.csv](your-data-link) and place in `data/` folder
   - Download [stacking_ensemble_model.pkl](your-model-link) and place in `models/` folder

3. Create and activate virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Set up environment variables:
- Create a `.env` file
- Add your Groq API key:
```
GROQ_API_KEY=your_api_key_here
```

6. Run the application:
```bash
python app.py
```

7. Access the application at `http://localhost:5000`

## Large Files Download

Due to GitHub's file size limitations, the following files need to be downloaded separately:

1. Download model file:
   - File: `stacking_ensemble_model.pkl` 
   - Size: ~200MB
   - Download from: [Google Drive Link]
   - Place in: `models/` directory

2. Download dataset:
   - File: `Price_Agriculture_commodities_Week.csv`
   - Size: ~150MB
   - Download from: [Google Drive Link]
   - Place in: `data/` directory

## Model Information

- **Ensemble Model**: Combines Random Forest and XGBoost using stacking
- **Features**: State, District, Market, Commodity, Variety, Grade, Year, Month, DayOfWeek
- **Target**: Modal Price per 100kg
- **Validation**: Cross-validation with time-series split
- **Metrics**: RMSE, MAE, R² Score

## Model Performance Metrics 📊

### Individual Models

**Random Forest**
- R² Score: 0.8592 (85.92% accuracy)
- Mean Absolute Error: ₹510.86
- Root Mean Square Error: ₹873.03

**XGBoost**
- R² Score: 0.8758 (87.58% accuracy)
- Mean Absolute Error: ₹509.74
- Root Mean Square Error: ₹820.07

### Ensemble Models

**Simple Averaging Ensemble**
- R² Score: 0.8764 (87.64% accuracy)
- Mean Absolute Error: ₹489.17
- Root Mean Square Error: ₹818.11

**Weighted Averaging Ensemble**
- R² Score: 0.8777 (87.77% accuracy)
- Mean Absolute Error: ₹489.75
- Root Mean Square Error: ₹813.79

**Stacking Ensemble (Production Model)**
- R² Score: 0.8790 (87.90% accuracy)
- Mean Absolute Error: ₹489.53
- Root Mean Square Error: ₹809.30

### Model Architecture

Our final production model uses a stacking ensemble approach:
1. **Base Models**: Random Forest and XGBoost
2. **Meta-Model**: Linear Regression for optimal predictions
3. **Feature Engineering**: Custom feature selection and encoding
4. **Data Processing**: IQR-based outlier removal and normalization

### Performance Analysis

- Stacking ensemble shows consistent superior performance
- 87.90% accuracy in price predictions
- Average error margin of ₹489.53 per 100kg
- Robust against market volatility
- Validated across multiple commodities and regions

## Model Training Infrastructure

- Training Data: 5+ years of historical price data
- Validation Method: Time-series cross-validation
- Infrastructure: Python 3.8+ with scikit-learn
- Memory Optimization: Incremental learning techniques
- Preprocessing: Automated pipeline with categorical encoding

## Real-time Capabilities

- Dynamic price updates
- Automated retraining pipeline
- Market trend analysis
- Seasonal pattern recognition
- Multi-commodity support

## AI Assistant Capabilities

- Agricultural best practices
- Crop disease identification
- Weather impact analysis
- Market trends
- Government schemes
- Multi-lingual support
- Sustainable farming practices
- Pest control guidance

## Data Processing

- Outlier removal using IQR method
- Feature encoding for categorical variables
- Data normalization
- Minimum data threshold for commodities (≥50 records)

## API Endpoints

- `/`: Main application interface
- `/predict`: Price prediction endpoint
- `/chat`: AI assistant endpoint
- `/get_districts/<state>`: Dynamic district options
- `/get_markets/<district>`: Dynamic market options
- `/get_varieties/<commodity>`: Dynamic variety options

## Contact Information 📧

For questions, suggestions, or collaborations:

**Abdullah Mater**  
Senior Developer  
Email: abdullahmater2434@gmail.com  
Project Link: [GitHub Repository]

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License and Attribution 📄

This project is licensed under the MIT License.  
See the LICENSE file for details.

---
<p align="center">Made with ❤️ by Abdullah Mater</p>
<p align="center">© 2024 AgroPrice Forecast. All rights reserved.</p>