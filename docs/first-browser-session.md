# First browser session: PP-201 refill request

## Route

Opening `http://127.0.0.1:8096` redirects to `http://127.0.0.1:8096/app#/login`, titled “Sign in to ParimiPractice · ParimiPractice.” The patient refill route is not exposed to a signed-out visitor, so I could not confirm its authenticated URL or the location of the refill control without signing in.

## What a visitor can see without signing in

The login page has EN and ES language buttons, email and password fields, a “Show password” checkbox, a “Sign in” button, and a link to create a new patient account. It also displays fictional demo-account roles (Patient, Doctor, Nurse, Front desk, Admin, and Locked) with their test credentials and “Use” buttons. A note says each sign-in sends a one-time code to the test inbox (top right). No patient prescriptions or refill controls are visible while signed out.

## What is needed to test PP-201 end to end

PP-201 requires verifying that only an active prescription can be requested; a prescription with refills remaining sends a request to the pharmacy, changes status to “Refill requested,” and decrements the remaining count; a prescription with no refills changes status to “Renewal requested” and tells the patient the provider was asked to renew it; and both request types are written to the audit log.

To test this end to end, I would need:

- An authorized patient test account and the ability to complete the one-time-code step using the test inbox.
- Authenticated navigation details to the patient’s prescriptions and refill request action.
- Synthetic test prescriptions covering active with refills remaining, active with zero refills, and inactive status.
- Access to the pharmacy request outcome and audit log so delivery, status/count changes, and audit entries can be checked.
- A way to reset or isolate the test records so repeated requests do not affect other test runs.

No sign-in or account selection was performed during this session.
