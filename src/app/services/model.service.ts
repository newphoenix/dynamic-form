import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor() { }


  getModel() {

    return of({
      fields: {
        username: {
          value: 'phoenix', label: 'Username', type: 'text',
          rules: {
            required: true,
            minLength: 4,
          }
        },
        email: {
          value: 'phoenix@mail.com', label: 'Email', type: 'email',
          rules: {
            required: true,
            email: 'email',
          }
        },
        password: {
          value: '', label: 'Password', type: 'password',
          rules: {
            required: true,
            minLength: 8,
          }
        },
        repassword: {
          value: '', label: 'Confirm Password', type: 'password',
          rules: {
            required: true,
            minLength: 8,
          }
        },
        typeBussines: {
          value: "6",
          label: "Bussines Type",
          type: "radio",
          options: [
            { label: "Enterprise", value: "1500" },
            { label: "Home", value: "6" },
            { label: "Personal", value: "1" }],
          rules: {
            required: true,
          }
        },
        newsletterIn: {
          value: null,
          label: "Subscribe to newsletter",
          type: "checkbox",
          options: [
            { label: "Enterprise", value: false, id: "Enterprise" },
            { label: "Home", value: true, id: "Home" },
            { label: "Personal", value: false, id: "Personal" }],
          rules: {
            required: true,
          }

        },
        subscriptionType: {
          label: "Subscription Type",
          value: 'basic',
          type: "select",
          options: [
            { label: "Pick one", value: "" },
            { label: "Premium", value: "premium" },
            { label: "Basic", value: "basic" }
          ],
          rules: {
            required: true
          }
        },
        start_date: {
          value: '2024-06-23', label: 'Starting date', type: 'date',
          rules: {
            required: true
          }
        },
        cv: {
          value: 'cv.pdf', label: 'CV', type: 'file',
          rules: {
            required: true
          }
        },
        notice_period: {
          value: '2', label: 'Notice period (Weeks)', type: 'number',
          rules: {
            required: true
          }
        },
        meeting_time: {
          value: '11:12', label: 'Meeting time', type: 'time',
          rules: {
            required: true
          }
        },
        volume: {
          value: '20', label: 'Volume', type: 'range',
          rules: {
            required: true
          }
        },
        reward: {
          array: true, value: ['aa', 'bb'], label: 'Rewards', type: 'text'
        },
        contact: {
          value: 'abc cba', label: 'Contact', type: 'textarea',
          rules: {
            required: true
          }
        }
      },
      cross_field_validation:
        [{ function: "match", parameters: ['password', 'repassword', 'mismatch'], inputs: ['password', 'repassword'], errorName: 'mismatch', errorMsg: "Passwords should match" }]



    });

  }


}
