# DynamicForm

Create a form from JSON model dynamically that supports validation.

Angular dynamic reactive form with validation, using bootstrap 5. 

# Structure

JSON is used to present the structure of the form.
Example for creating an login form with user name and password 

```json
{    
    "fields": {    
        "username": {
            "label": "Username",
            "rules": {
                "minLength": 4,
                "required": true
            },
            "type": "text",
            "value": "phoenix"
        },
        "password": {
            "label": "Password",
            "rules": {
                "minLength": 8,
                "required": true
            },
            "type": "password",
            "value": ""
        }
    }
}
```

# Form Vaidation

Two types of validatons are available : field and crossfield validations:
Example of registration form with field and crossfield validaiton:

```json
{    
    "fields": {
      "username": {
            "label": "Username",
            "rules": {
                "minLength": 4,
                "required": true
            },
            "type": "text",
            "value": ""
        },
        "password": {
            "label": "Password",
            "rules": {
                "minLength": 8,
                "required": true
            },
            "type": "password",
            "value": ""
        },
       "confirmPassword": {
            "label": "Confirm Password",
            "rules": {
                "minLength": 8,
                "required": true
            },
            "type": "password",
            "value": ""
        }
        
    },
  "cross_field_validation": [
        {
            "errorMsg": "Passwords should match",
            "errorName": "mismatch",
            "function": "match",
            "inputs": [
                "password",
                "repassword"
            ],
            "parameters": [
                "password",
                "repassword",
                "mismatch"
            ]
        }
    ]
}
```

rules field are the validations on the field.
cross_field_validation is the validation cross multiple fileds.

NOTE: the custom validation function in cross_field_validation should be provided
      by the developer.


# Supported form fields

| HTML input  |
| ------------- | 
| text |
| email |
| password |
| radio |
| checkbox |
| select |
| date |
| file |
| number |
| time |
| range |
| textarea |


# i18n

field label can be used to display the form field name in the desired language.

