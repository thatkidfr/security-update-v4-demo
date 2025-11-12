// HMAC SHA 256 hash function
async function hmacSHA256(message, secret) {
  const enc = new TextEncoder();
  const keyData = enc.encode(secret);
  const msgData = enc.encode(message);
  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, msgData);
  const hashArray = Array.from(new Uint8Array(signature));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
// UUIDv4
function generateUUIDv4() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  return (
    hex.slice(0, 8) + '-' +
    hex.slice(8, 12) + '-' +
    hex.slice(12, 16) + '-' +
    hex.slice(16, 20) + '-' +
    hex.slice(20)
  );
}

uuid = prompt("UUID", generateUUIDv4());
hmacSHA256(uuid, 'SECRET').then(result => {
  localStorage.setItem("verify", result);
});
alert(uuid);


// NOTES
// Replace "SECRET" with a secret key that is impossible to guess
// This is a placeholder for the js code in the payload
// The real site will remain secret to prevent the secret key from being leaked
