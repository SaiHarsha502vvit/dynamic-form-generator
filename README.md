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

