const form = document.getElementById('registrationForm');
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const selectedEvents = form.querySelectorAll('input[name="events"]:checked');
      if (selectedEvents.length === 0) {
        alert('Please select at least one event category.');
        return;
      }
      document.getElementById('confirmation').style.display = 'block';
      document.getElementById('confirmation').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    form.addEventListener('reset', function () {
      document.getElementById('confirmation').style.display = 'none';
    });
