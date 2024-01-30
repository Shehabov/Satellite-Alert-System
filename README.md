# Satellite Alert System

Welcome to the Satellite Alert System repository! This project provides a real-time satellite tracking system with features to visualize satellite orbits and generate pass tables. Below is an in-depth guide on how to use, deploy, and set up the system.

## Components

1. **Home Page (`index.js`):**
   - The main webpage of the Satellite Alert System.
   - Provides a user interface to interact with the satellite tracking system.
   - Displays a map with satellite markers and pass information.

2. **Style Sheet (`orbtrak.css`):**
   - Contains the styles and layout configurations for the user interface.
   - Enhances the visual presentation of the Satellite Alert System.

3. **Functionality (`orbtrak.js`):**
   - Implements the core functionality of the satellite tracking system.
   - Includes features such as starting tracking, updating satellite positions, and generating pass tables.
   - Utilizes the PredictLib.js library for satellite tracking computations.

4. **Satellite Tracking Library (`predictlib.js`):**
   - The SGP4 library used for satellite tracking predictions.
   - Powers the computation of satellite positions based on Two-Line Element (TLE) data.

5. **TLE Data (`tle.js`):**
   - Contains saved Two-Line Element (TLE) data for satellites.
   - Provides essential orbital parameters required for satellite tracking.


### Prerequisites

- Web browser with JavaScript support

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Shehabov/Satellite-Alert-System.git

### Getting Started

- Open the index.html file in your web browser
- Upon opening the home page (index.html), the Satellite Alert System will be displayed
- Explore the interactive map with satellite markers representing real-time positions
- Click on the information icons or markers for detailed satellite pass information
- The pass table provides a list of upcoming satellite passes with relevant details

### Acknowledgments
Special thanks to John A. Magliacane (KD2BD) for the PredictLib.js library.
