export function validateEmail(v: string): string | undefined {
  if (!v.trim()) return "Email address is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Please enter a valid email address";
}

export function validateMobile(v: string): string | undefined {
  if (!v.trim()) return "Mobile number is required";
  if (!/^[6-9]\d{9}$/.test(v)) return "Please enter a valid 10-digit mobile number";
}

export function validatePassword(v: string): string | undefined {
  if (!v) return "Password is required";
  if (v.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Z]/.test(v)) return "Must contain at least one uppercase letter";
  if (!/[a-z]/.test(v)) return "Must contain at least one lowercase letter";
  if (!/\d/.test(v)) return "Must contain at least one number";
  if (!/[!@#$%^&*(),.?":{}|<>_\-]/.test(v)) return "Must contain at least one special character";
}

export function validateConfirmPassword(v: string, password: string): string | undefined {
  if (!v) return "Please confirm your password";
  if (v !== password) return "Passwords do not match";
}

export function validateName(v: string, label: string): string | undefined {
  if (!v.trim()) return `${label} is required`;
  if (v.trim().length < 2) return `${label} must be at least 2 characters`;
  if (!/^[a-zA-Z\s]+$/.test(v)) return `${label} must contain only letters`;
}

export function validateIdType(v: string): string | undefined {
  if (!v) return "Please select an ID type";
}

export function validateIdNumber(v: string, idType: string): string | undefined {
  if (!v.trim()) return "ID number is required";
  if (idType === "aadhaar" && !/^\d{12}$/.test(v))
    return "Aadhaar number must be exactly 12 digits";
  if (idType === "pan" && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(v.toUpperCase()))
    return "PAN must be in format: AAAAA9999A";
  if (idType === "passport" && !/^[A-Z][0-9]{7}$/.test(v.toUpperCase()))
    return "Passport must be in format: A1234567";
  if (idType === "voter-id" && !/^[A-Z]{3}[0-9]{7}$/.test(v.toUpperCase()))
    return "Voter ID must be in format: ABC1234567";
}

export function validateDob(v: string): string | undefined {
  if (!v) return "Date of birth is required";
  const dob = new Date(v);
  if (isNaN(dob.getTime())) return "Please enter a valid date";
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  if (age < 18) return "You must be at least 18 years old";
  if (age > 100) return "Please enter a valid date of birth";
}

export function validatePincode(v: string): string | undefined {
  if (!v.trim()) return "Pincode is required";
  if (!/^\d{6}$/.test(v)) return "Pincode must be exactly 6 digits";
}

export function validateAgreed(v: boolean): string | undefined {
  if (!v) return "You must agree to the Terms and Conditions";
}
