// utils/validators.js
import { body, validationResult } from "express-validator";

export const userValidationRules = () => {
  return [
    body("email")
      .isEmail()
      .withMessage("Invalid email format")
      .normalizeEmail()
      .custom((value) => {
        if (!value.endsWith("@gmail.com") && !value.endsWith("@yahoo.com")) {
          throw new Error("Only Gmail and Yahoo email addresses are allowed.");
        }
        return true;
      }),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),

    body("dateOfBirth")
      .isISO8601()
      .withMessage("Invalid date of birth")
      .custom((value) => {
        const dob = new Date(value);
        const today = new Date();

        // Calculate age
        const age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        const dayDiff = today.getDate() - dob.getDate();

        // Adjust age if the birthday hasn't occurred yet this year
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
          age--;
        }

        if (dob > today) {
          throw new Error("Date of birth cannot be in the future.");
        }

        if (age < 18) {
          throw new Error("You must be at least 18 years old.");
        }

        return true;
      }),

    body("phoneNumber")
      .isMobilePhone("any")
      .withMessage("Invalid phone number")
      .custom((value) => {
        if (!/^\+\d{1,3}\s?\d{7,15}$/.test(value)) {
          throw new Error("Phone number must include country code (e.g., +1 1234567890).");
        }
        return true;
      }),
  ];
};

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = {};
  errors.array().forEach((err) => {
    extractedErrors[err.param] = err.msg;
  });
  return res.status(422).json({ errors: extractedErrors });
};
