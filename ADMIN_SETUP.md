# Admin Authentication Setup Guide

Since we disabled open registration to secure your platform, you need to manually create the owner account once in the Firebase Console. 

Follow these simple steps:

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Select your project for **Jai Ganesh Catering**.
3. In the left sidebar, go to **Authentication**.
4. Click on the **Users** tab.
5. Click the **Add user** button.
6. Enter the email address: **`jaiganeshcatering@gmail.com`**
   *(Note: This exact email is hardcoded in your security rules to ensure only you have admin rights. If you use a different email, you must update `NEXT_PUBLIC_ADMIN_EMAIL` in `.env.local` and your Firebase rules).*
7. Enter a strong, secure password of your choice.
8. Click **Add user**.

You're done! You can now log in securely at `http://localhost:3000/admin/login` (or your production URL).

---

### Forgot Password?
Since this uses standard Firebase Auth, you can reset your password directly from the Firebase Console (in the Users tab, click the three dots next to your account -> "Reset password"), or we can add a "Forgot Password" button to the login page later if you'd prefer.
