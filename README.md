# Dynamic Form Generator

## Setup Instructions

1. **Clone the repository:**
    ```sh
    git clone https://github.com/SaiHarsha502vvit/dynamic-form-generator.git
    cd dynamic-form-generator
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Run the application:**
    ```sh
    npm start
    ```

## Example JSON Schemas

### Simple Form
```json
{
  "title": "Simple Form",
  "type": "object",
  "properties": {
     "name": {
        "type": "string",
        "title": "Name"
     },
     "age": {
        "type": "integer",
        "title": "Age"
     }
  },
  "required": ["name", "age"]
}
```

### Complex Form
```json
{
  "title": "Complex Form",
  "type": "object",
  "properties": {
     "personalInfo": {
        "type": "object",
        "title": "Personal Information",
        "properties": {
          "firstName": {
             "type": "string",
             "title": "First Name"
          },
          "lastName": {
             "type": "string",
             "title": "Last Name"
          }
        },
        "required": ["firstName", "lastName"]
     },
     "contactInfo": {
        "type": "object",
        "title": "Contact Information",
        "properties": {
          "email": {
             "type": "string",
             "title": "Email"
          },
          "phone": {
             "type": "string",
             "title": "Phone Number"
          }
        }
     }
  }
}
```

## Local Development Guide

1. **Run tests:**
    ```sh
    npm test
    ```

2. **Build the project:**
    ```sh
    npm run build
    ```

3. **Run in development mode:**
    ```sh
    npm run dev
    ```

4. **Lint the code:**
    ```sh
    npm run lint
    ```

5. **Format the code:**
    ```sh
    npm run format
    ```

## Deployment

The application is deployed on Vercel and can be accessed [here](https://dynamic-form-generator-roan.vercel.app/).

## Bonus Points

- **Add a "Copy Form JSON" button:** Implement a button that allows users to copy the JSON schema of the form to their clipboard.
- **Implement form field validation preview:** Provide a preview of form field validations to ensure users can see the validation rules in action.
- **Add dark mode support:** Introduce a dark mode option for the application to enhance user experience in low-light environments.
- **Add ability to download form submissions as JSON:** Enable users to download their form submissions as a JSON file for easy data handling and storage.