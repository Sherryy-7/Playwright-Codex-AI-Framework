# First browser session: PP-201 refill request

## Route

Opening `http://127.0.0.1:8096` lands at `http://127.0.0.1:8096/app#/login`, titled “Sign in to ParimiPractice · ParimiPractice.” The signed-out page describes the portal as supporting prescription refills, but does not expose a patient prescription list or a refill action. The only patient-facing route available from the login screen is account creation at `http://127.0.0.1:8096/app#/signup`; I did not submit that form. The authenticated route and location of the refill control could not be established without signing in.

## What a visitor can see without signing in

The login page offers EN/ES language buttons, email and password fields, a show-password checkbox, a sign-in button, and a link to create a patient account. It lists fictional demo account roles with “Use” buttons and notes that sign-in sends a one-time code to the test inbox. The shared information panel advertises appointments, care-team messaging, lab results, and prescription refills, and identifies the app as fictional training software.

The account-creation page has fields for invented patient details (name, date of birth, sex assigned at birth, state, insurance plan, email, and password), a terms/privacy checkbox, and a create-account button. No prescription or refill information is visible on either public page. No account was selected or created, and no sign-in was attempted.

## What is needed to test PP-201 end to end

PP-201 requires checking that only active prescriptions can be refilled; for an active prescription with refills remaining, the request reaches the pharmacy, the status becomes “Refill requested,” and the remaining count decreases by one; for an active prescription with no refills, the status becomes “Renewal requested” and the patient is told their provider was asked to renew it. Both request types must also appear in the audit log.

To cover those outcomes, an end-to-end test needs:

- An authorized patient test account and access to the test inbox for the one-time-code step.
- The authenticated route to that patient’s prescriptions and the refill request control.
- Synthetic records for active prescriptions with refills remaining, active prescriptions with zero refills, and inactive prescriptions.
- A way to observe the patient-facing result, pharmacy request, prescription status and refill count, and corresponding audit-log entry.
- A reset or isolated test data strategy so a request does not affect later runs.
