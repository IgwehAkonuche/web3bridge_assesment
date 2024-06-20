// script.js

document.addEventListener('DOMContentLoaded', function() {
    const desks = {
        individual: Array(10).fill(true), // 10 desks for individual work
        team: Array(5).fill(true) // 5 desks for team collaboration
    };

    const deskBookingForm = document.getElementById('deskBookingForm');
    const deskTypeSelect = document.getElementById('deskType');
    const membershipTypeSelect = document.getElementById('membershipType');
    const bookingTimeInput = document.getElementById('bookingTime');
    const revenueDetails = document.getElementById('revenueDetails');

    deskBookingForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const deskType = deskTypeSelect.value;
        const membershipType = membershipTypeSelect.value;
        const bookingTime = bookingTimeInput.value;

        if (deskType === '' || membershipType === '' || bookingTime === '') {
            alert('Please fill out all fields.');
            return;
        }

        // Calculate booking price based on desk type and membership type
        let pricePerHour = 0;
        if (deskType === 'individual') {
            switch (membershipType) {
                case 'basic':
                    pricePerHour = 10;
                    break;
                case 'premium':
                    pricePerHour = 15;
                    break;
                case 'executive':
                    pricePerHour = 20;
                    break;
            }
        } else if (deskType === 'team') {
            pricePerHour = 25;
        }

        // Calculate booking duration in hours
        const bookingDateTime = new Date(bookingTime);
        const currentDateTime = new Date();
        const bookingHours = (bookingDateTime - currentDateTime) / (1000 * 60 * 60);

        if (bookingHours <= 0) {
            alert('Booking time must be in the future.');
            return;
        }

        // Calculate total price
        let totalPrice = pricePerHour * bookingHours;

        // Apply discount if booking is more than 3 hours
        if (bookingHours > 3) {
            totalPrice *= 0.9; // 10% discount
        }

        totalPrice = totalPrice.toFixed(2); // Round to 2 decimal places

        // Find the first available desk of the selected type
        let deskIndex = desks[deskType].findIndex(desk => desk);
        if (deskIndex !== -1) {
            desks[deskType][deskIndex] = false; // Mark desk as booked

            // Update UI to show booking confirmation and total charged
            updateDeskUI(deskType, deskIndex, bookingTime);
            updateRevenueDashboard(membershipType, totalPrice);
        } else {
            alert('No desks available for booking.');
        }
    });

    function updateDeskUI(type, index, dateTime) {
        const deskElement = document.createElement('div');
        deskElement.classList.add('desk');
        deskElement.innerHTML = `Desk ${type === 'individual' ? index + 1 : index + 11} booked for ${dateTime}`;

        document.getElementById('desks').appendChild(deskElement);
    }

    function updateRevenueDashboard(membershipType, totalPrice) {
        const revenueDetailElement = document.createElement('div');
        revenueDetailElement.classList.add('revenue-detail');
        revenueDetailElement.innerHTML = `Membership: ${membershipType.toUpperCase()} - Total Charged: $${totalPrice}`;

        revenueDetails.appendChild(revenueDetailElement);
    }
});
