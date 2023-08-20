# Click-n-Split (CRR Project Readme)

The Click-n-Split App is a web application that simplifies the process of splitting bills after a group purchase.  It's perfect for scenarios such as group outings, shared expenses, or any situation where you need to divide costs among multiple individuals.
It takes a photo of the receipt as input, processes the receipt through optical character recognition (OCR) to extract purchase details, and then allows users to individually select items and split the bill accordingly among the contributors.

## How To Use

1.  Users enter participant names and upload a receipt photo.
2.  Backend processes photo via OCR for data extraction.
3.  Extracted data (item names, quantities, prices) displayed for review.
4.  Users select items they contributed to for accurate expense tracking.
5.  App calculates individual shares based on selections.
6.  Users can receive share breakdown via email by providing their email addresses.

## How To Run

1. Clone this repository to your local machine.
   ```
   git clone https://github.com/harshita-jaiswal/crr-project.git
   ```

2. Install the required dependencies for the frontend and backend parts of the app.
   ```
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Add `APIKEY, QUEUEID, DEFAULT_IMAGE_PATH` to the environment variable. Guide to obtain API Keys can be found [here](https://docs.butlerlabs.ai/reference/welcome).

4. Run the Application:
    - Start the backend server:
      ```
      npm start
      ```
    - Start the frontend server:
      ```
      cd ../frontend
      npm start
      ```

5. Open a web browser and navigate to `http://localhost:3000` to access the App.

## Technologies Used

- ReactJS
- Node.js
- Butler Receipt OCR API

## Contributors
- Sarvesh Biradar
- Harshita Jaiswal
- Chitradevi Maruthavanan