module.exports = {
  // DB Messages
  DB_CONNECTED: "MongoDB connected successfully",
  DB_ERROR: "MongoDB connection failed",
  MONGO_URI_MISSING: "MONGO_URI is not defined in environment variables",

  // Validation
  NAME_REQUIRED: "Name is required",
  EMAIL_REQUIRED: "Email is required",
  PASSWORD_REQUIRED: "Password is required",
  INVALID_EMAIL: "Enter a valid email address",
  USER_EXISTS: "User already exists",
  USER_NOT_FOUND: "User not found",
  WRONG_PASSWORD: "Incorrect password",
  REGISTER_SUCCESS: "Registration successful",
  ALL_FIELDS_REQUIRED: "All fields are required",
  INVALID_EMAIL_OR_PASSWORD: "Invalid email or password",

  // Password rules
  PASSWORD_MIN_LENGTH: "Password must be at least 6 characters",
  PASSWORD_UPPERCASE_REQUIRED: "Password must contain 1 uppercase letter",
  PASSWORD_NUMBER_REQUIRED: "Password must contain 1 number",
  PASSWORD_NO_SPACES: "Password cannot contain spaces",
  PASSWORD_SPECIAL_REQUIRED: "Password must contain 1 special character",

  // Server
  SERVER_ERROR: "Server error",
  LOGIN_SUCCESS: "Login successful",
};
