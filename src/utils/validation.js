// Input validation and sanitization utilities

// Sanitize string for safe use in URLs
export function sanitizeForUrl(input) {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/[<>\"'`]/g, '') // Remove potential XSS chars
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, ''); // Remove event handlers
}

// Sanitize string for safe display (prevent XSS in text content)
export function sanitizeForDisplay(input) {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/[<>]/g, char => ({ '<': '<', '>': '>' }[char]));
}

// Validate and sanitize WhatsApp message text
export function sanitizeWhatsAppMessage(message) {
  if (typeof message !== 'string') return '';
  return message
    .trim()
    .slice(0, 2000) // WhatsApp message length limit
    .replace(/[\x00-\x1F\x7F]/g, ''); // Remove control characters
}

// Validate image URL - only allow https and approved domains
export function validateImageUrl(url) {
  if (typeof url !== 'string') return null;
  
  try {
    const parsed = new URL(url);
    
    // Only allow HTTPS
    if (parsed.protocol !== 'https:') return null;
    
    // Allow only specific domains for security
    const allowedDomains = [
      'izzyautobridge.vercel.app',
      'images.unsplash.com',
      // Add your CDN domains here
    ];
    
    if (!allowedDomains.includes(parsed.hostname)) return null;
    
    // Only allow image paths
    if (!/\.(webp|jpg|jpeg|png|svg|avif)$/i.test(parsed.pathname)) return null;
    
    return url;
  } catch {
    return null;
  }
}

// Validate WhatsApp number format (Ghana format: 233XXXXXXXXX)
export function validateWhatsAppNumber(number) {
  if (typeof number !== 'string') return false;
  return /^233\d{9}$/.test(number.replace(/\D/g, ''));
}

// Sanitize form input - remove dangerous characters
export function sanitizeFormInput(input, options = {}) {
  if (typeof input !== 'string') return '';
  
  const { maxLength = 1000, allowHtml = false } = options;
  
  let sanitized = input.trim().slice(0, maxLength);
  
  if (!allowHtml) {
    // Remove HTML tags and potential XSS vectors
    sanitized = sanitized
      .replace(/<[^>]*>/g, '')
      .replace(/[<>]/g, char => ({ '<': '<', '>': '>' }[char]))
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .replace(/data:/gi, '')
      .replace(/vbscript:/gi, '');
  }
  
  return sanitized;
}

// Validate price range - ensure low <= high and within bounds
export function validatePriceRange(low, high, min = 0, max = 10000000) {
  const lowNum = parseInt(low, 10);
  const highNum = parseInt(high, 10);
  
  if (isNaN(lowNum) || isNaN(highNum)) return null;
  if (lowNum < min) return null;
  if (highNum > max) return null;
  if (lowNum > highNum) return null;
  
  return { low: lowNum, high: highNum };
}

// Validate year range
export function validateYearRange(low, high, min = 1990, max = new Date().getFullYear() + 2) {
  const lowNum = parseInt(low, 10);
  const highNum = parseInt(high, 10);
  
  if (isNaN(lowNum) || isNaN(highNum)) return null;
  if (lowNum < min || lowNum > max) return null;
  if (highNum < min || highNum > max) return null;
  if (lowNum > highNum) return null;
  
  return { low: lowNum, high: highNum };
}

// Validate vehicle data integrity
export function validateVehicle(vehicle) {
  const required = ['ID', 'Brand', 'Model', 'Year', 'Price_GHS', 'Price_USD'];
  
  for (const field of required) {
    if (!vehicle[field]) {
      return { valid: false, error: `Missing required field: ${field}` };
    }
  }
  
  if (typeof vehicle.Price_GHS !== 'number' || vehicle.Price_GHS < 0) {
    return { valid: false, error: 'Invalid Price_GHS' };
  }
  
  if (typeof vehicle.Year !== 'number' || vehicle.Year < 1990 || vehicle.Year > new Date().getFullYear() + 2) {
    return { valid: false, error: 'Invalid Year' };
  }
  
  return { valid: true };
}