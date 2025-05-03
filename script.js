// Simulated client data (for demonstration)
const clients = [
  { username: "admin", password: "admin" },
  { username: "client2", password: "admin" },
];

// Check if user is already logged in
function checkLoginState() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn === 'true') {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
    document.getElementById('logout-button').classList.remove('hidden');
  }
}

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const client = clients.find(c => c.username === username && c.password === password);
  if (client) {
    localStorage.setItem('isLoggedIn', 'true');
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
    document.getElementById('logout-button').classList.remove('hidden');
  } else {
    alert('Invalid username or password.');
  }
});

// Handle logout
document.getElementById('logout-button').addEventListener('click', function () {
  localStorage.removeItem('isLoggedIn');
  document.getElementById('login-section').classList.remove('hidden');
  document.getElementById('main-content').classList.add('hidden');
  document.getElementById('logout-button').classList.add('hidden');
});

// Show dialog box with results
function showDialog(content) {
  const dialog = document.getElementById('result-dialog');
  const resultContent = document.getElementById('result-content');
  resultContent.innerHTML = content;
  dialog.style.display = 'flex';
}

// Close dialog box
function closeDialog() {
  const dialog = document.getElementById('result-dialog');
  dialog.style.display = 'none';
}

// Toggle accommodation details visibility
function toggleAccommodationDetails() {
  const accommodationDetails = document.getElementById('accommodation-details');
  const isChecked = document.getElementById('accommodation-checkbox').checked;
  accommodationDetails.style.display = isChecked ? 'flex' : 'none';
}

// Calculate rates based on Riyal and Room rates
function calculateRates() {
  const riyalRate = parseFloat(document.getElementById('riyal-rate').value) || 0;
  const makkahRoomRate = parseFloat(document.getElementById('makkah-room-rate').value) || 0;
  const medinaRoomRate = parseFloat(document.getElementById('medina-room-rate').value) || 0;
  
  // Calculate Makkah rates (Room Rate / people + Riyal Rate)
  document.getElementById('makkah-sharing-rate').value = ((makkahRoomRate / 5)).toFixed(2);
  document.getElementById('makkah-double-rate').value = ((makkahRoomRate / 2)).toFixed(2);
  document.getElementById('makkah-triple-rate').value = ((makkahRoomRate / 3)).toFixed(2);
  document.getElementById('makkah-quad-rate').value = ((makkahRoomRate / 4)).toFixed(2);

  // Calculate Medina rates (Room Rate / people + Riyal Rate)
  document.getElementById('medina-sharing-rate').value = ((medinaRoomRate / 5)).toFixed(2);
  document.getElementById('medina-double-rate').value = ((medinaRoomRate / 2)).toFixed(2);
  document.getElementById('medina-triple-rate').value = ((medinaRoomRate / 3)).toFixed(2);
  document.getElementById('medina-quad-rate').value = ((medinaRoomRate / 4)).toFixed(2);
}

// Setup rate change listeners
function setupRateChangeListeners() {
  document.getElementById('riyal-rate').addEventListener('change', calculateRates);
  document.getElementById('makkah-room-rate').addEventListener('change', calculateRates);
  document.getElementById('medina-room-rate').addEventListener('change', calculateRates);
}

// Calculate total cost
function calculateCost() {
  const riyalRate = parseFloat(document.getElementById('riyal-rate').value) || 0;
  
  // Get additional services cost
  const flightCost = document.getElementById('flight-checkbox').checked ? parseFloat(document.getElementById('flight-cost').value) || 0 : 0;
  const visaCost = document.getElementById('visa-checkbox').checked ? parseFloat(document.getElementById('visa-cost').value) * riyalRate || 0 : 0;

  // Check if accommodation is selected
  const isAccommodationChecked = document.getElementById('accommodation-checkbox').checked;

  let totalCost = flightCost + visaCost;
  let resultContent = '';

  if (isAccommodationChecked) {
    const makkahNights = parseInt(document.getElementById('makkah-nights').value) || 0;
    const medinaNights = parseInt(document.getElementById('medina-nights').value) || 0;

    // Get selected accommodation type
    const makkahAccommodation = document.querySelector('input[name="makkah-accommodation"]:checked').value;
    const makkahRate = parseFloat(document.getElementById(`makkah-${makkahAccommodation}-rate`).value);

    const medinaAccommodation = document.querySelector('input[name="medina-accommodation"]:checked').value;
    const medinaRate = parseFloat(document.getElementById(`medina-${medinaAccommodation}-rate`).value);

    // Calculate accommodation costs
    const makkahCost = makkahNights * makkahRate;
    const medinaCost = medinaNights * medinaRate;

    totalCost += makkahCost + medinaCost;

    resultContent += `
      <p>Makkah Accommodation Charges: ${makkahCost.toFixed(2)} PKR</p>
      <p>Medina Accommodation Charges: ${medinaCost.toFixed(2)} PKR</p>
    `;
  }

  if (flightCost > 0) resultContent += `<p>Flight Charges: ${flightCost.toFixed(2)} PKR</p>`;
  if (visaCost > 0) resultContent += `<p>Visa Charges: ${visaCost.toFixed(2)} PKR</p>`;

  resultContent += `<p><strong>Total Charges: ${totalCost.toFixed(2)} (PKR)</strong></p>`;

  // Show results in dialog box
  showDialog(resultContent);

  // Save to backend (simulated using localStorage)
  localStorage.setItem('totalCost', totalCost.toFixed(2));
  console.log('Total cost saved to backend:', totalCost.toFixed(2));
}

// Initialize on page load
window.onload = function() {
  checkLoginState();
  setupRateChangeListeners();
  calculateRates(); // Initial calculation
};

// Toggle accommodation details on checkbox change
document.getElementById('accommodation-checkbox').addEventListener('change', toggleAccommodationDetails);

// Initialize accommodation details visibility
toggleAccommodationDetails();